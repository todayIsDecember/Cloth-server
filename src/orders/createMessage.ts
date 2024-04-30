import { IOrder } from 'interfaces/order.interface';

export const message = (dto: IOrder): string => {
	return (
		`⚡ У вас 1 нове замовлення \n` +
		`\n` +
		`Замовлення # ${dto.id}\n` +
		`👨 ім'я: ${dto.customer_name}\n` +
		`📱 телефон: ${dto.phone} \n` +
		`🌍 місто: ${dto.city} \n` +
		`📮 відділення: ${dto.department}\n` +
		`\n` +
		`📦 Дані замовлення:\n` +
		dto.order_details
			.map((item) => {
				return (
					`   ➖ назва: ${item.products?.name}\n` +
					`   ➖ колір: ${item.products?.color}\n` +
					`   ➖ ширина: ${item.width}м\n` +
					`   ➖ висота: ${item.height}м\n` +
					`   ➖ чи готовий продукт?: ${item.isfinished ? 'так' : 'ні'}\n` +
					`   💰 ціна: ${item.price}\n` +
					`\n`
				);
			})
			.join('') +
		`\n` +
		`💬 коментар: ${dto.comment}\n` +
		`💵 Загальна сума: ${dto.price}\n`
	);
};

export const messageTwilio = (dto: IOrder) => {
	return (
		`Ваше замовлення номер ${dto.id} на суму ${dto.price} грн.` +
		'\n' +
		`Ближчим часом з вами зв'яжеться наш менеджер` +
		'\n' +
		`Всього найкращого! 😘`
	);
};
