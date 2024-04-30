import { IsNumber, IsString } from 'class-validator';

export class CreatePricesDto {
	@IsString()
	type: string;

	@IsNumber()
	price: number;
}
