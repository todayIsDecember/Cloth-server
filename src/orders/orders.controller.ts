import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/createOrderDto';
import { TelegramService } from '../telegram/telegram.service';
import { message, messageTwilio } from './createMessage';
import { TwilioService } from 'src/twilio/twilio.service';
import { generateNumber } from './generateNumber';

@Controller('orders')
export class OrdersController {
	constructor(
		private readonly ordersService: OrdersService,
		private readonly telegramService: TelegramService,
		private readonly twilioSerive: TwilioService,
	) {}

	@HttpCode(201)
	@Post('create')
	@UsePipes(new ValidationPipe())
	async create(@Body() dto: CreateOrderDto) {
		const order = await this.ordersService.createOrder(dto);
		for (const product of dto.products) {
			const order_details = await this.ordersService.createOrderDetails(order.id, product);
			await this.telegramService.sendImage(order_details.products.photo[0]);
			order.order_details.push(order_details);
		}
		const messageTemplate = message(order);
		await this.telegramService.sendMessage(messageTemplate);
		await this.twilioSerive.sendSMS(generateNumber(order.phone), messageTwilio(order));
		return { success: true, order_info: order };
	}

	//GetAll
	@HttpCode(200)
	@Get('all')
	async getAll() {
		return this.ordersService.getAllOrders();
	}

	//GetById
	@HttpCode(200)
	@Get('getById/:id')
	async getById(@Param('id') id: number) {
		return this.ordersService.getOrderById(id);
	}

	//Пошук за ім'ям
	@HttpCode(200)
	@Post('getByName')
	async getByName(@Body() { name }: { name: string }) {
		return this.ordersService.getOrderByCustomerName(name);
	}
}
