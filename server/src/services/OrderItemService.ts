import { OrderItem } from "../models/OrderItem";

class OrderItemService {
    async getOrderItemsByOrderId(orderId: number): Promise<OrderItem[]> {
        try {
            const orderItems =  await OrderItem.query().where('order_id', orderId);
            if (!orderItems) {
                throw new Error(`Items from order ID ${orderId} not found`);
            }

            return orderItems;
        }
        catch(err) {
            throw new Error('Error while getting products by category.');
        }
    }
}

export default new OrderItemService();