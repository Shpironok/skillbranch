export default function canonize(fullName) {
	const re = new RegExp('(\\S*)? ?(\\S*)? ?(\\S*) ?(\\S*)?');
	const username = fullName.trim().replace(/\s+/g, ' ').replace(re, '$3 $2 $1 $4').match(re);

	return username;
}