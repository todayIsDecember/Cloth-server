import { ModuleMetadata } from '@nestjs/common';

export interface ITelegramOptions {
	token: string;
	chat_id: string;
}

export interface ITelegramModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
	useFactory: (...args: any[]) => Promise<ITelegramOptions> | ITelegramOptions;
	inject?: any[];
}
