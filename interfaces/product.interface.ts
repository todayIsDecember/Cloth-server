import { IPrices } from './prices.interface';

export interface IProduct {
	id: number;
	name: string;
	description: string;
	width: number;
	height: number | null;
	type: string;
	color: string;
	category: string;
	price: number;
	photo: string[];
	discontinued: boolean | null;
}
