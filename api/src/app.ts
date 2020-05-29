import { settings } from './config';
import { Controller } from './controller';
import express from 'express';

const controller = new Controller(settings)
const app = express();
const port = 3000;
app.get('/', (req, res) => {
  res.send('The he antelope!');
});
app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on ${port}`);
});
