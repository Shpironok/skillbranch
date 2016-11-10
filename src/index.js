import express from 'express';
import cors from 'cors';
import canonize from './canonize';

const app = express();
app.use(cors());
app.get('/task2C', (req, res) => {
  const username = canonize(req.query.username);
  username[3] = username[3].replace(/\@/g, '');
      
  res.send(`@${username[3]}`);
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
