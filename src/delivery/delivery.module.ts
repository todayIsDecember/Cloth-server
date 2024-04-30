import { Module } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { DeliveryController } from './delivery.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [HttpModule, ConfigModule],
	providers: [DeliveryService],
	controllers: [DeliveryController],
})
export class DeliveryModule {}
