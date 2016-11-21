import express from 'express'
import cors from 'cors';
import canonize from './canonize';

const app = express();
app.use(cors());
app.get('/task2D', async (req, res) => {
	try {
		const color = req.query.color || false;
		if (!color) {return res.send('Invalid color');}
    return res.send(canonize(unescape(color)));
	} catch (err) {
		console.log(err);
		return res.send('Invalid color');
	}
});

app.listen(3000, () => {
	console.log('Example app listening on port 3000!');
});