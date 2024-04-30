import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { API_URL } from './delivery.constants';
import { Root } from './delivery.model';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class DeliveryService {
	api_key: string;
	constructor(
		private readonly httpService: HttpService,
		private readonly configService: ConfigService,
	) {
		this.api_key = this.configService.get('API_KEY');
	}

	// Отримати адреси доставки по ключових буках
	async getAdresses(keywords: string) {
		const res = await lastValueFrom(
			this.httpService.post(API_URL, {
				apiKey: this.api_key,
				modelName: 'AddressGeneral',
				calledMethod: 'getSettlements',
				methodProperties: {
					Warehouse: 1,
					FindByString: keywords,
				},
			}),
		);
		return this.parseAdresses(res.data.data);
	}

	async getWarehouses(CityName: string, keywords: string) {
		const res = await lastValueFrom(
			this.httpService.post(API_URL, {
				apiKey: this.api_key,
				modelName: 'Address',
				calledMethod: 'getWarehouses',
				methodProperties: {
					CityName,
					FindByString: keywords,
				},
			}),
		);
		return this.parseAdresses(res.data.data);
	}

	private parseAdresses(response) {
		const adressess = [];
		for (const address of response) {
			adressess.push(address.Description);
		}
		return adressess;
	}
}
