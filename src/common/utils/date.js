// format date
export const formatHour = (date) => {
	const dateObj = new Date(date);
	const hour = dateObj.getHours();
	const min = dateObj.getMinutes();

	return `${formatNumber(hour)}:${formatNumber(min)}`;
};

const formatNumber = (num) => {
	if (num < 10) return `0${num}`;
	return num;
};

export const getCurrentDay = () => {
	const today = new Date();
	const dd = String(today.getDate()).padStart(2, "0");
	const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
	const yyyy = today.getFullYear();
	return `${dd}/${mm}/${yyyy}`;
};
