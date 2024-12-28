import { getTokenFromLocalStorage } from "../utils/LocalStorage";

export interface Order {

}

class OrderService {
    async getOrder(userId: number) : Promise<Order> {
        const response = await fetch(`http://0.0.0.0:3001/orders/get-orders}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getTokenFromLocalStorage()}`     
            }
        });

        if (!response.ok) {
            throw new Error('Error fetching orders');
        }        
        
        return await response.json();
    }
}

const orderService = new OrderService();
export default orderService;