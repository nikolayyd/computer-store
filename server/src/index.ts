import Knex from 'knex';
import { config } from '../knexfile';
import express from 'express';
import { Model } from 'objection';


const cors = require('cors');
const knex = Knex(config.development);
Model.knex(knex);

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// app.use('/auth',authRouter);


app.listen(port, () => {
  console.log(`listening on ${port}`);
});