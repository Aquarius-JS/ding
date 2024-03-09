export const format = date => {
	date = new Date(date * 1000); // 将秒数转换为毫秒数

	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();
	let hours = date.getHours();
	let minutes = date.getMinutes();
	let seconds = date.getSeconds();

	return (
		year +
		"-" +
		addZero(month) +
		"-" +
		addZero(day) +
		" " +
		addZero(hours) +
		":" +
		addZero(minutes) +
		":" +
		addZero(seconds)
	);
};
function addZero(num) {
	return num < 10 ? "0" + num : num;
}
