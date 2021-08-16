export default function convertDate(ISO_string) {
	const date = new Date(ISO_string);
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const hour = date.getHours();
	const minute = date.getMinutes();

	return `${hour}:${minute}   ${day}-${month}-${year}`;
}
