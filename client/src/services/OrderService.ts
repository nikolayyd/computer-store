import localStorageWorker from "../utils/LocalStorageWorker";

export interface Order {

}

class OrderService {
    async getOrder(userId: number) : Promise<Order> {
        const response = await fetch(`http://0.0.0.0:3001/orders/get-orders}`, {
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
}

const orderService = new OrderService();
export default orderService;