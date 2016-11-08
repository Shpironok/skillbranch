export default function canonize(fullName) {
	const re = new RegExp('(\\S*\w*)?[ |\/]?(\\S*\w*)?[ |\/]?(\\S*\w*)');
	const username = fullName.match(re);


	return username;
}