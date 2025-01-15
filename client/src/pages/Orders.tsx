import { useEffect, useState } from 'react';
import '../styles/Orders.css';
import orderService from '../services/OrderService';
import localStorageWorker from '../utils/LocalStorageWorker';
import { IProduct } from './Products';
import productService from '../services/ProductService';

export interface IOrder {
    id: number;
    orderDate: string;
    status: string;
    totalAmount: number;
}

export interface IOrderItem {
    createdAt: string;
    id: number;
    orderId: number;
    price: number;
    productId: number;
    quantity: number;
}

function Orders() {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);
    const [currentProducts, setCurrentProducts] = useState<IProduct[] | null>(null);

    const handleReject = async (orderId: number) => {
        await orderService.rejectOrder(orderId);
        await fetchOrders();
    };

    const fetchOrderItemsByOrderId = async (orderId: number) => {
        try {
            const orderItems = await orderService.getOrderItemsById(orderId);
            if (!orderItems || orderItems.length === 0) {
                throw new Error('No order items found');
            }
            const products: IProduct[] = await Promise.all(
                orderItems.map(async (item: IOrderItem) => {
                    const product = await productService.getProductById(String(item.productId));
                    return { ...product, quantity: item.quantity }; 
                })
            );
    
            return products;
        } catch (err) {
            console.error('Error fetching order items', err);
        }
    }
    
    const fetchProducts = async (orderId: number) => {
        try {
            const products = await fetchOrderItemsByOrderId(orderId);
            if (products) {
                setCurrentProducts(products);
            }
        } catch (err) {
            console.error('Error fetching products', err);
        }
    };

    const fetchOrders = async () => {
        try {
            const ordersData = await orderService.getOrders(localStorageWorker.getUserId());
            setOrders(ordersData);
        } catch (err) {
            console.error('Error fetching orders', err);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-EN', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    const handleOrderClick = (order: IOrder) => {
        setSelectedOrder(order);
        fetchProducts(order.id);
    };

    const closeModal = () => {
        setSelectedOrder(null);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className='orders-container'>
            <h2>My Orders</h2>
            <div className='orders-grid'>
                {orders.map((order) => (
                    <div
                        className='order-card'
                        key={order.id}
                        onClick={() => {handleOrderClick(order);fetchOrderItemsByOrderId(order.id);}}
                    >
                        <h3>Order number: {order.id}</h3>
                        <p>
                            <strong>Date created: </strong> {formatDate(order.orderDate)}
                        </p>
                        <p>
                            <strong>Status: </strong> {order.status}
                        </p>
                        <p>
                            <strong>Total amount: </strong> {order.totalAmount} лв.
                        </p>
                    </div>
                ))}
            </div>

            {selectedOrder && (
                <div className='modal-overlay' onClick={closeModal}>
                    <div className='modal-content' onClick={(e) => e.stopPropagation()}>
                        <button className='close-modal-btn' onClick={closeModal}>
                            ×
                        </button>
                        <h3>Order Details</h3>
                        <p>
                            <strong>Order ID:</strong> {selectedOrder.id}
                        </p>
                        <h4>Products:</h4>
                        <div className='products-list'>
                            {currentProducts && currentProducts.map((product) => (
                                <div key={product.id} className='product-item'>
                                    <p>
                                        <strong>{product.name}</strong> - {product.quantity} x {product.price} лв.
                                    </p>
                                </div>
                            ))}
                        </div>
                        <p>
                            <strong>Total Amount:</strong> {selectedOrder.totalAmount} лв.
                        </p>
                        {selectedOrder.status !== 'Rejected' && (
                            <button
                                className='order-btn reject'
                                onClick={() => {
                                    handleReject(selectedOrder.id);
                                    closeModal();
                                }}
                            >
                                Reject Order
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Orders;
