import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { TwilioModule } from 'src/twilio/twilio.module';

@Module({
	imports: [PrismaModule, TwilioModule],
	providers: [OrdersService],
	controllers: [OrdersController],
})
export class OrdersModule {}
