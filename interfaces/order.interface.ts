import { IOrderDetails } from './order_details';

export interface IOrder {
	id: number;
	customer_name: string;
	phone: string;
	created_at: string;
	usedelivery: boolean | null;
	city: string | null;
	department: string | null;
	price: number;
	comment: string | null;
	order_details: IOrderDetails[];
}
