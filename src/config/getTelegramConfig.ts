import { ConfigService } from '@nestjs/config';
import { ITelegramOptions } from 'src/telegram/telegram.interface';

export const getTelegramConfig = (configService: ConfigService): ITelegramOptions => {
	const token = configService.get('TELEGRAM_BOT_TOKEN');
	if (!token) {
		throw new Error('TELEGRAM_TOKEN не вказаний');
	}
	return {
		token,
		chat_id: configService.get('CHANEL_ID') ?? '',
	};
};
