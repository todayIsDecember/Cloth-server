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
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/createReview.dto';
import { messageReview } from './createMessage';
import { TelegramService } from '../telegram/telegram.service';

@Controller('reviews')
export class ReviewsController {
	constructor(
		private readonly reviewsService: ReviewsService,
		private readonly telegramService: TelegramService,
	) {}

	//стоврити відгук
	@HttpCode(201)
	@UsePipes(new ValidationPipe())
	@Post('create')
	async create(@Body() dto: CreateReviewDto) {
		const review = await this.reviewsService.create(dto);
		const templateMessage = messageReview(review);
		await this.telegramService.sendMessage(templateMessage);
		return { success: true };
	}

	//Отримати всі відгуки
	@HttpCode(200)
	@Get('getAll')
	async getAll() {
		return this.reviewsService.getAll();
	}

	//отриати топ 3 відгука
	@HttpCode(200)
	@Get('getTop')
	async getTop() {
		return this.reviewsService.getTop();
	}

	//видалити відгук
	@HttpCode(200)
	@Delete('delete/:id')
	async delete(@Param('id') id: number) {
		return this.reviewsService.delete(id);
	}
}
