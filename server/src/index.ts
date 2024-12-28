import Knex from 'knex';
import express from 'express';
import { Model } from 'objection';
import { authRouter } from './routers/AuthRouter';
import { catalogRouter } from './routers/CatalogRouter';
import { orderRouter } from './routers/OrderRouter';
import { authMiddleware } from './middlewares/AuthMiddleware';

import { config } from '../knexfile';

const cors = require('cors');
const knex = Knex(config.development);
Model.knex(knex); 

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.use('/auth',authRouter);
app.use('/catalogs',catalogRouter);
// app.use('/orders', authMiddleware, orderRouter);

app.listen(port, () => {
  console.log(`listening on ${port}`);
});