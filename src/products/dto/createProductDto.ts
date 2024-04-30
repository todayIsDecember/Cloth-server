import { IsArray, IsNumber, IsString, max } from 'class-validator';

export class CreateProductDto {
	@IsString()
	name: string;

	@IsString()
	description: string;

	@IsArray()
	photo: string[];

	@IsString()
	category: string;

	@IsNumber()
	width: number;

	@IsNumber()
	height: number;

	@IsString()
	type: string;

	@IsString()
	color: string;

	@IsNumber()
	price: number;
}
