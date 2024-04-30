export const generateNumber = (phone: string) => {
	const arr = phone.split('');
	if (arr[0] === '0') {
		return `+38${arr.join()}`;
	} else if (arr[0] == '3') {
		return `+${arr.join()}`;
	} else {
		return arr.join();
	}
};
