import { Router } from 'express';
import orderController from '../controllers/OrderController';
export const orderRouter = Router(); 

orderRouter.get('/get-orders/:id', orderController.getOrdersByUserId);
orderRouter.post('/create-order/:id', orderController.createOrder);
orderRouter.patch('/reject-order/:id', orderController.rejectOrder);