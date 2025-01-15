import Knex from 'knex';
import express from 'express';
import { Model } from 'objection';
import { authRouter } from './routers/AuthRouter';
import { categoryRouter } from './routers/CategoryRouter';
import { orderRouter } from './routers/OrderRouter';
import { authMiddleware } from './middlewares/AuthMiddleware';
import { productRouter } from './routers/ProductRouter';
import { departmentRouter } from './routers/DepartmentRouter';
import { stripeRouter } from './routers/StripeRouter';

import { config } from '../knexfile';
import { productAttributeRouter } from './routers/ProductAttributeRouter';
import { userRouter } from './routers/UserRouter';
import { orderItemRouter } from './routers/OrderItemRouter';

const cors = require('cors');
const knex = Knex(config.development);
Model.knex(knex); 

const app = express();
const PORT = 3001;
const IP_ADDRESS = '127.0.0.1';
app.use(cors());
app.use(express.json());

app.use('/auth',authRouter);
app.use('/users', authMiddleware, userRouter);
app.use('/categories', authMiddleware, categoryRouter);
app.use('/products', authMiddleware, productRouter);
app.use('/departments', authMiddleware, departmentRouter);
app.use('/payments', authMiddleware, stripeRouter);
app.use('/product-attribute', authMiddleware, productAttributeRouter);
app.use('/orders', authMiddleware, orderRouter);
app.use('/items', authMiddleware, orderItemRouter);


app.listen(PORT, IP_ADDRESS, () => {
  console.log(`listening on ${IP_ADDRESS}:${PORT}`);
});