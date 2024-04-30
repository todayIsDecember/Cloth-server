import { IsNumber, IsString, Max, Min, min } from 'class-validator';
import { RAITING_LARGER_THEN_5_ERROR, RAITING_SMALLER_THEN_1_ERROR } from '../reviews.constants';

export class CreateReviewDto {
	@IsString()
	name: string;

	@IsString()
	description: string;

	@Max(5, { message: RAITING_LARGER_THEN_5_ERROR })
	@Min(1, { message: RAITING_SMALLER_THEN_1_ERROR })
	@IsNumber()
	raiting: number;
}
