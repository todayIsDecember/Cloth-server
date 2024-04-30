import { IsBoolean, IsNumber, Max } from 'class-validator';

export class ProductDto {
	@IsNumber()
	id: number;

	@IsNumber()
	price: number;

	@Max(2.9, { message: 'максимальна висота 2.9 метра' })
	@IsNumber()
	height: number;

	@IsNumber()
	width: number;

	@IsBoolean()
	isfinished: boolean;
}
