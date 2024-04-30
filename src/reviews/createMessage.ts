import { IReview } from 'interfaces/review.interface';

export const messageReview = (dto: IReview): string => {
	switch (dto.raiting) {
		case 1:
			return (
				`💯 У вас 1 новий відгук \n` +
				`\n` +
				`👨 ${dto.name}\n` +
				`\n` +
				`загальне враження: 😡 Дуже погано\n` +
				`\n` +
				`📝 ${dto.description}\n`
			);
		case 2:
			return (
				`💯 У вас 1 новий відгук \n` +
				`\n` +
				`👨 ${dto.name}\n` +
				`\n` +
				`загальне враження: 😕 Погано\n` +
				`\n` +
				`📝 ${dto.description}\n`
			);
		case 3:
			return (
				`💯 У вас 1 новий відгук \n` +
				`\n` +
				`👨 ${dto.name}\n` +
				`\n` +
				`загальне враження: 😐 Нормально\n` +
				`\n` +
				`📝 ${dto.description}\n`
			);
		case 4:
			return (
				`💯 У вас 1 новий відгук \n` +
				`\n` +
				`👨 ${dto.name}\n` +
				`\n` +
				`загальне враження: 😊 Добре\n` +
				`\n` +
				`📝 ${dto.description}\n`
			);
		case 5:
			return (
				`💯 У вас 1 новий відгук \n` +
				`\n` +
				`👨 ${dto.name}\n` +
				`\n` +
				`загальне враження: 😍 Чудово\n` +
				`\n` +
				`📝 ${dto.description}\n`
			);
		default:
			return '';
	}
};
