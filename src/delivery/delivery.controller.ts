import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { DeliveryService } from './delivery.service';

@Controller('delivery')
export class DeliveryController {
	constructor(private readonly deliveryService: DeliveryService) {}

	// Отримати адреси доставки по ключових буках
	@HttpCode(200)
	@Post('getAdresses')
	async getAdresses(@Body('keywords') keywords: string) {
		return await this.deliveryService.getAdresses(keywords);
	}

	@HttpCode(200)
	@Post('getWarehouses')
	async getWarehouses(@Body('CityName') CityName: string, @Body('keywords') keywords: string) {
		return await this.deliveryService.getWarehouses(CityName, keywords);
	}
}
