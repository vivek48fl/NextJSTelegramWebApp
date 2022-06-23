const getTimeStamp = (datetime) => {
	console.log("time in createDate function", datetime);
	const newDates = new Date(datetime);
	console.log("newDates createDate", newDates);
	const date = newDates.getDate();
	const month = newDates.getMonth() + 1;
	const year = newDates.getFullYear();
	const hour = newDates.getHours();
	const minutes = newDates.getMinutes();
	let finalDate = new Date(year, month, date, hour, minutes);
	//convert date to timestam
	const timeStamp = finalDate.getTime();

	return timeStamp;
};
module.exports = { getTimeStamp };
