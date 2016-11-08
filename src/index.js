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
  res.send(shortname);
});

app.get('/task2A', (req, res) => {
	const sum = (+req.query.a || 0) + (+req.query.b || 0);
	res.send(sum.toString());
});

app.listen(3000, () => {
  //console.log('Your app listening on port 3000!');
});

const names = [
     'Vladimir/Vladimirovich/Putin',
	  'Tinna Gunnlaugsdottir',
	  'Steave Jobes',
	  'Steave Paul Jobes',
	  'Василий Иванович Чапаев',
	  'Vladimir27 Vladimirovich Putin',
	  'Vladimir V. Putin',
	  'иГоРь аЛексАндРовиЧ сУвороВ',
	  'Ваня Грозный',
	  'Billy',
	  'Сто сорок четыре абизяны'
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
      username[3] = registerCheck(username[3]);
      username[2] = firstLetter(username[2]);
      username[1] = firstLetter(username[1]);

	console.log(username[3] + ' ' + username[1] + ' ' + username[2]);
	//console.log(username);
	//console.log(username);
})

