import express from 'express';
import cors from 'cors';
import canonize from './canonize';

const app = express();
app.use(cors());
app.get('/task2B', (req, res) => {
  const username = canonize(req.query.fullname);
      username[3] = registerCheck(username[3]);
      username[2] = firstLetter(username[2]);
      username[1] = firstLetter(username[1]);
      var shortname = `${username[3]} ${username[1]} ${username[2]}`;
  res.json({
  	fullname: req.query.fullname,
  	shortname,
  });
});

app.get('/task2A', (req, res) => {
	const sum = (+req.query.a || 0) + (+req.query.b || 0);
	res.send(sum.toString());
});

app.listen(3000, () => {
  //console.log('Your app listening on port 3000!');
});

const names = [
    'test test test',
    'Test2 test2 test2',
    'test3 Test3 test3',
    'test4 test4 Test4'
];


function registerCheck(badName) {
  const normalName = badName.charAt(0).toUpperCase() + badName.slice(1).toLowerCase();

  return normalName;
}

function firstLetter(badName) {
  const normalName = badName.charAt(0).toUpperCase() + '.';

  return normalName;
}

names.forEach((fullName) => {
	const username = canonize(fullName);
      username[1] = registerCheck(username[1]);
      username[2] = firstLetter(username[2]);
      username[3] = firstLetter(username[3]);

	console.log(username[1] + ' ' + username[2] + ' ' + username[3]);
})

