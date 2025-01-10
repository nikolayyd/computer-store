import { IOrder } from "../pages/Orders";
import { IProduct } from "../pages/Products";
import localStorageWorker from "../utils/LocalStorageWorker";


class OrderService {
    async getOrders(userId: number) : Promise<IOrder[]> {
        const response = await fetch(`http://localhost:3001/orders/get-orders/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorageWorker.getToken()}`
            }
        });

        if (!response.ok) {
            throw new Error('Error fetching orders');
        }        
        
        return await response.json();
    }

    async createOrder(products: IProduct[], totalAmount: number, userId: string) : Promise<void> {
        const response = await fetch(`http://localhost:3001/orders/create-order/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorageWorker.getToken()}`
            },
            body: JSON.stringify({products, totalAmount})
        })

        if (!response.ok) {
            throw new Error('Error posting orders');
        }        

        return await response.json();
    }

    async rejectOrder(orderId: number): Promise<void> {
        const response = await fetch(`http://localhost:3001/orders/reject-order/${orderId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorageWorker.getToken()}`
            },
        })

        if (!response.ok) {
            throw new Error('Error posting orders');
        }        

        return await response.json();
    }
}

const orderService = new OrderService();
export default orderService;