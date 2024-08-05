export function extractTime(dateString) {
	const date = new Date(dateString);
	const hours = padZero(date.getHours());
	const minutes = padZero(date.getMinutes());
	if(hours>=12 ){
		const hour = (hours - 12);
		return `${hour}:${minutes} PM`;
	}else{
		return `${hours}:${minutes}	AM	`;
	}
}

// Helper function to pad single-digit numbers with a leading zero
function padZero(number) {
	return number.toString().padStart(2, "0");
}