import { Router } from 'express';
import orderController from '../controllers/OrderController';
export const orderRouter = Router(); 

orderRouter.get('/get-orders/:id', orderController.getOrdersByUserId);
orderRouter.post('/create-order/:id', orderController.createOrder);