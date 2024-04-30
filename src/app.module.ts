import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsModule } from './products/products.module';
import { PricesModule } from './prices/prices.module';
import { TelegramModule } from './telegram/telegram.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getTelegramConfig } from './config/getTelegramConfig';
import { OrdersModule } from './orders/orders.module';
import { ReviewsModule } from './reviews/reviews.module';
import { FilesModule } from './files/files.module';
import { DeliveryModule } from './delivery/delivery.module';
import { AuthModule } from './auth/auth.module';
import { TwilioModule } from './twilio/twilio.module';

@Module({
	imports: [
		PrismaModule,
		ProductsModule,
		PricesModule,
		TelegramModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getTelegramConfig,
		}),
		ConfigModule.forRoot(),
		OrdersModule,
		ReviewsModule,
		FilesModule,
		DeliveryModule,
		AuthModule,
		TwilioModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
