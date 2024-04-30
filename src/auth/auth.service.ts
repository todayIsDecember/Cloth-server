import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TelegramService } from 'src/telegram/telegram.service';
import { message } from './generateMessage';

@Injectable()
export class AuthService {
	num: string;
	constructor(private readonly telegramService: TelegramService) {
		this.num = '';
	}

	async register() {
		const number = Math.floor(Math.random() * 10000);
		this.num = number.toString(2);
		this.telegramService.sendMessage(message(number));
	}

	async login(dto: { number: number }) {
		if (this.num === dto.number.toString(2)) {
			this.num = '';
			return { success: true, token: dto.number.toString(2) };
		} else {
			throw new HttpException('Невірний код', HttpStatus.BAD_REQUEST);
		}
	}
}
