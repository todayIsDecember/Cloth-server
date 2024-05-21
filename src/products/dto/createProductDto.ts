import { IsArray, IsNumber, IsString, max } from 'class-validator';
import { IsArrayOfStringArrays } from './IsArrayOfStringArrays';

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

	@IsArrayOfStringArrays({
		message: 'значення повинно бути масив масивів рядків',
	})
	value: any;
}
