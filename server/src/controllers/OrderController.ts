import { Request, Response } from 'express';
import OrderService from "../services/OrderService";

export interface IOrder {
    id: number;
    user_id: number;
    order_date: string;
    status: string;
    total_amount: number;
}

export interface OrderItem {
    id: number;
    order_id: number;
    product_id: number;
    quantity: number;
    price: number;
}

class OrderController {
    async getOrdersByUserId(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.params.id;
            const orders = await OrderService.getOrdersByUserId(Number(userId));

            res.status(200).json(orders);
        }
        catch(err) {

        }
    }
    async createOrder(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.params.id;
            const {products, totalAmount} = req.body;
            const orderId = await OrderService.createOrder(Number(userId), totalAmount);

            await OrderService.addOrderItems(orderId, products);

            res.status(200).json({ message: 'Order created successfully' });

        }
        catch(err) {
            res.status(500).json({error: 'Server error!' });
        }
    }
}

export default new OrderController();