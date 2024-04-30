import { Inject, Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { ITelegramOptions } from './telegram.interface';
import { TELEGRAM_MODULE_PROVIDER } from './telegram.constants';
import * as fs from 'fs-extra';
import { path } from 'app-root-path';

@Injectable()
export class TelegramService {
	bot: Telegraf;
	options: ITelegramOptions;
	constructor(@Inject(TELEGRAM_MODULE_PROVIDER) options: ITelegramOptions) {
		this.bot = new Telegraf(options.token, {});
		this.options = options;
	}

	async sendMessage(message: string, chatId: string = this.options.chat_id) {
		await this.bot.telegram.sendMessage(chatId, message);
	}

	async sendImage(imagePath: string, chatId: string = this.options.chat_id) {
		const uploadFolder = `${path}/images/${imagePath}`;
		const image = await fs.createReadStream(uploadFolder);
		await this.bot.telegram.sendPhoto(chatId, { source: image });
	}
}
