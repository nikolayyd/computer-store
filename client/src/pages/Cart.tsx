// Cart.tsx
import { useEffect, useState } from "react";
import localStorageWorker from "../utils/LocalStorageWorker";
import StripeCheckoutForm from "../components/StripeCheckoutForm"; 
import { useNavigate } from "react-router-dom";
import { IProduct } from "./Products";
import "../styles/Cart.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import orderService from "../services/OrderService";

const stripePromise = loadStripe('pk_test_51QcnmzIKfJnl68JcC92SyyOppshzWj2MiUc7Av2bDbl9rBHt2bIWFM4AwAOwHXNt9EHNFezvDuEcSmYLMGphlYr2002jqXTjES');

function Cart() {
    const [cart, setCart] = useState<IProduct[]>([]);
    const [message, setMessage] = useState<string | null>(null);
    const [messageClass, setMessageClass] = useState<string | null>(null);
    const [showCheckoutForm, setShowCheckoutForm] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedCart = localStorageWorker.getProducts();
        setCart(storedCart);
    }, []);

    const handleRemoveProduct = (productId: number) => {
        const updatedCart = cart.filter((product) => Number(product.id) !== productId);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const handlePayment = () => {
        setShowCheckoutForm(true);
    };

    const handlePaymentSuccess = () => {
        setShowCheckoutForm(false);
        // orderService.setOrder(cart);
        localStorageWorker.removeProducts();
        setMessageClass("success");
        setMessage("Payment successful!");
        setTimeout(() => {
            navigate('/');
          }, 5000);
    };

    const handlePaymentError = (errorMessage: string) => {
        setShowCheckoutForm(false);
        setMessageClass("error");
        setMessage(errorMessage);
    };

    const handleIncreaseQuantity = (product: IProduct) => {
        localStorageWorker.addProduct(product);
        const updatedCart = JSON.parse(localStorage.getItem("cart") || "[]");
        setCart(updatedCart);
    };
    
    const handleDecreaseQuantity = (product: IProduct) => {
        if (product.quantity === 1) {
            return;
        }
        localStorageWorker.removeProduct(product);
        const updatedCart = JSON.parse(localStorage.getItem("cart") || "[]");
        setCart(updatedCart);
    };

    const totalPrice = cart.reduce((total, product) => {
        const price = product.price; 
        const quantity = product.quantity || 1;
        return total + price * quantity;
    }, 0);

    return (
        <div className="cart-container">
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
                <p className="payment-message empty">Your cart is empty.</p>
            ) : (
                <div className="cart-grid">
                    {cart.map((product) => (
                        <div key={product.id} className="cart-card">
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <p className="price">Price: {product.price} лв.</p>
                            <div className="quantity-controls">
                                <button onClick={() => handleDecreaseQuantity(product)} className="quantity-btn">
                                    -
                                </button>
                                <span>{product.quantity}</span>
                                <button onClick={() => handleIncreaseQuantity(product)} className="quantity-btn">
                                    +
                                </button>
                            </div>
                            <button onClick={() => handleRemoveProduct(Number(product.id))} className="remove-btn">
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
            {cart.length > 0 && (
                <div className="total-price">
                    <h3>Total Price: {totalPrice.toFixed(2)} лв.</h3>
                </div>
            )}
            {(cart.length > 0) && 
                <button className="pay-btn" onClick={handlePayment}>
                    Complete Order
                </button>
            }
            
            {message && <p className={`payment-message ${messageClass}`}>{message}</p>}
            {showCheckoutForm && (
                <Elements stripe={stripePromise}>
                    <StripeCheckoutForm
                        totalAmount={totalPrice}
                        onClose={() => setShowCheckoutForm(false)}
                        onSuccess={handlePaymentSuccess}
                        onError={handlePaymentError}
                    />
                </Elements>
            )}
        </div>
    );
};

export default Cart;