import express from 'express';
import cors from 'cors';
import canonize from './canonize';

const app = express();
app.use(cors());
app.get('/task2B', (req, res) => {
  const username = canonize(req.query.fullname);
  var shortname;
	if (username[1] == undefined) {
			if (username[2] == undefined) {
				username[1] = registerCheck(username[3]);
	  			username[2] = '';
	  			username[3] = '';
	  		} else {
	  			username[1] = registerCheck(username[2]);
	  			username[2] = '';
	  			username[3] = firstLetter(username[3]);
	  		}

		} else {
			username[1] = registerCheck(username[1]);
	  		username[2] = firstLetter(username[2]);
	  		username[3] = firstLetter(username[3]);
		}

    if (username[4] == undefined && username[1] != undefined && username[2] != undefined && username[3] != undefined && req.query.fullname != '') {
      	shortname = `${username[1]} ${username[3]} ${username[2]}`;
    	shortname = shortname.replace(/\s+/, ' ').trim();
    } else {
    	shortname = 'Invalid fullname';
    }
      
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
	  'Tinna Gunnlaugsdóttir',
	  'Steave Jobes',
	  'Steave Paul Jobes',
	  'Василий Иванович Чапаев',
	  'Vladimir27  Vladimirovich Putin',
	  'Vladimir V. Putin',
	  'иГоРь аЛексАндРовиЧ сУвороВ',
	  'Ваня Грозный',
	  'Billy',
	  'Сто сорок четыре абизяны',
	  '2pac',
	  'Steave_Jobes'
];


function registerCheck(badName) {
  const re = /\d|\_|\//g;
  var normalName, validate;
  validate = re.test(badName);
  if (!validate) {
  	normalName = badName.charAt(0).toUpperCase() + badName.slice(1).toLowerCase();
  }

  return normalName;
}

function firstLetter(badName) {
  const re = /\d|\_|\//g;
  var normalName, validate;
  validate = re.test(badName);
  if (!validate) {
  	normalName = badName.charAt(0).toUpperCase() + '.';
  }

  return normalName;
}

names.forEach((fullName) => {
	const username = canonize(fullName);
	var shortname;

		if (username[1] == undefined) {
			if (username[2] == undefined) {
				username[1] = registerCheck(username[3]);
	  			username[2] = '';
	  			username[3] = '';
	  		} else {
	  			username[1] = registerCheck(username[2]);
	  			username[2] = '';
	  			username[3] = firstLetter(username[3]);
	  		}

		} else {
			username[1] = registerCheck(username[1]);
	  		username[2] = firstLetter(username[2]);
	  		username[3] = firstLetter(username[3]);
		}

    if (username[4] == undefined && username[1] != undefined && username[2] != undefined && username[3] != undefined) {
      	shortname =  username[1] + ' ' + username[3] + ' ' + username[2];
    	shortname = shortname.replace(/  /, ' ');
    } else {
    	shortname = 'Invalid fullname';
    }

	console.log(shortname);
})