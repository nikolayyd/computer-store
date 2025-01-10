import { Order } from '../models/Order';
import { OrderItem } from '../models/OrderItem';
import { IOrder } from '../controllers/OrderController';
import { IProduct } from '../controllers/ProductController';

class OrderService {
    async getOrdersByUserId(userId: number): Promise<Order[]> {
        try {
            const orders = await Order.query().where('user_id', userId); 
            return orders;
        }
        catch(err) {
            throw new Error('Error while getting orders!');
        }
    }

    async createOrder(userId: number, totalAmount: number): Promise<number> {
        try {
            const orderData = {
                user_id: userId,
                order_date: new Date().toISOString(),
                status: 'Created',
                total_amount: totalAmount,
            }
            const newOrder: IOrder = await Order.query().insert(orderData);

            return newOrder.id;
        }
        catch(err) {
            throw new Error('Error while creating order!');
        }
    }

    async rejectOrder(orderId: number): Promise<void> {
        try {
            await Order.query().findById(orderId).patch({ status: 'Rejected' });
        }
        catch(err) {
            throw new Error('Error while rejecting order!');
        }
    }

    async addOrderItems(orderId: number, products: IProduct[]): Promise<void> {
        try {
            const orderItems = products.map(product => ({
                order_id: orderId,
                product_id: product.id,
                quantity: product.quantity,
                price: product.price,
            }));

            await OrderItem.query().insert(orderItems);
        } catch (err) {
            throw new Error('Error while adding order items.');
        }
    }
}

export default new OrderService();
