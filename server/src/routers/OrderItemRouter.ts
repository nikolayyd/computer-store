import { Router } from 'express';
import orderItemController from '../controllers/OrderItemController';
export const orderItemRouter = Router();

orderItemRouter.get('/get-items-by-orderId/:id', orderItemController.getItemsByOrderId);