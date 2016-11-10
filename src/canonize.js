export default function canonize(url) {
	const re = new RegExp('@?(https?:)?\/?\/?([a-zA-Z0-9\.\-]*\/)?([a-zA-Z0-9\.\@\_]*)', 'i');
	const username = url.match(re);

	return username;
}