import { IProduct } from "../pages/Products";
import localStorageWorker from "../utils/LocalStorageWorker";

export interface Order {

}

class OrderService {
    async getOrder(userId: number) : Promise<Order> {
        const response = await fetch(`http://localhost:3001/orders/get-orders}`, {
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
    async setOrder(cart: IProduct[]) : Promise<void> {
        const response = await fetch(`http://localhost:3001/orders/set-orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorageWorker.getToken()}`
            },
            body: JSON.stringify(cart) 
        })

        if (!response.ok) {
            throw new Error('Error posting orders');
        }        
    }
}

const orderService = new OrderService();
export default orderService;