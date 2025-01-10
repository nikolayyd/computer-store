import React, { useEffect, useState } from 'react';
import '../styles/Orders.css';
import orderService from '../services/OrderService';
import localStorageWorker from '../utils/LocalStorageWorker';

export interface IOrder {
    id: number;
    orderDate: string;
    status: string;
    totalAmount: number;
}

function Orders() {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const handleDetails = () => {
    };

    const handleReject = async (orderId: number) => {
        await orderService.rejectOrder(orderId);
        await fetchOrders();
    };

    const fetchOrders= async () => {
        try {
            const ordersData = await orderService.getOrders(localStorageWorker.getUserId());
            console.log(ordersData);
            setOrders(ordersData);
        }
        catch(err) {
            console.error('Error fetching orders', err);
        }
    }
    useEffect(() => {
        fetchOrders();
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('bg-BG', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    return (
        <div className='orders-container'>
            <h2>My Orders</h2>
            <div className='orders-grid'>
                {orders.map((order) => (
                    <div className='order-card' key={order.id}>
                        <h3>Order number: {order.id}</h3>
                        <p><strong>Date created: </strong> {formatDate(order.orderDate)}</p>
                        <p><strong>Status: </strong> {order.status}</p>
                        <p><strong>Total amount: </strong> {order.totalAmount} лв.</p>
                        {order.status !== 'Rejected' && (
                            <div className='order-buttons'>
                                <button className='order-btn' onClick={handleDetails}>Details</button>
                                <button className='order-btn reject' onClick={() => handleReject(order.id)}>Reject Order</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders;
