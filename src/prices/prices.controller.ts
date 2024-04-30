import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpException,
	HttpStatus,
	Param,
	Patch,
	Post,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { PricesService } from './prices.service';
import { CreatePricesDto } from './dto/createPrices.dto';
import { PRICES_NOT_FOUND } from './prices.constants';

@Controller('prices')
export class PricesController {
	constructor(private readonly pricesService: PricesService) {}

	// створити ціну
	@UsePipes(new ValidationPipe())
	@HttpCode(201)
	@Post('create')
	async create(@Body() dto: CreatePricesDto) {
		return this.pricesService.create(dto);
	}

	// отримати всі ціни
	@HttpCode(200)
	@Get('getAll')
	async getAll() {
		return this.pricesService.getAll();
	}

	//отримати ціну по id
	@HttpCode(200)
	@Get('getById/:id')
	async getById(@Param('id') id: number) {
		return this.pricesService.getById(id);
	}

	//змінити ціну

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Patch('edit/:id')
	async edit(@Body() dto: Pick<CreatePricesDto, 'price'>, @Param('id') id: number) {
		const price = await this.pricesService.getById(id);
		if (!price) {
			throw new HttpException(PRICES_NOT_FOUND, HttpStatus.NOT_FOUND);
		}
		return this.pricesService.edit(id, dto);
	}

	//видалити ціну
	@HttpCode(200)
	@Delete('delete/:id')
	async delete(@Param('id') id: number) {
		const price = await this.pricesService.getById(id);
		if (!price) {
			throw new HttpException(PRICES_NOT_FOUND, HttpStatus.NOT_FOUND);
		}
		return this.pricesService.delete(id);
	}
}
