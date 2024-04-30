export interface IOrderDetails {
	id: number;
	product_id: number;
	order_id: number;
	height: number | null;
	width: number;
	isfinished: boolean | null;
	price: number;
	products?: {
		color: string;
		name: string;
		photo: string;
	};
}
