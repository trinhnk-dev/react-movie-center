export const formatDateString = (str) => {
	const day = str.substr(8, 2);
	const month = str.substr(5, 2);
	const year = str.substr(0, 4);
	return `${day}/${month}/${year}`;
};
