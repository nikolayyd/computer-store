import {Request, Response} from 'express';
import orderItemService from '../services/OrderItemService';

class OrderItemController {
    async getItemsByOrderId(req: Request, res: Response): Promise<void> {
        try {
            const orderId = req.params.id;
            const orderItems = await orderItemService.getOrderItemsByOrderId(Number(orderId));
            
            res.status(200).json(orderItems);
        }
        catch(error) {
            res.status(500).json({error: 'Server error!' });
        }
    }
}

export default new OrderItemController();