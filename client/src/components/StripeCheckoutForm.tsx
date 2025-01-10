import { useState } from 'react';
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';
import "../styles/StripeCheckoutForm.css";
import paymentService from '../services/PaymentService';
import localStorageWorker from '../utils/LocalStorageWorker';
interface StripeCheckoutFormProps {
  totalAmount: number;
  onSuccess: () => void;
  onError: (errorMessage: string) => void;
  onClose: () => void;
}

function StripeCheckoutForm ({ totalAmount, onSuccess, onError, onClose }: StripeCheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage("Payment processing...");
    if (!stripe || !elements) {
      return;
    }
  
    const cardNumberElement = elements.getElement(CardNumberElement);
    const cardExpiryElement = elements.getElement(CardExpiryElement);
    const cardCvcElement = elements.getElement(CardCvcElement);
  
    if (!cardNumberElement || !cardExpiryElement || !cardCvcElement) {
      onError("One or more card elements are missing.");
      return;
    }
  
    try {
      const firstName = localStorageWorker.getUser().firstName; 
      const lastName = localStorageWorker.getUser().lastName;
      const clientSecret = await paymentService.completePayment(totalAmount);
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardNumberElement,
          billing_details: {
            name: `${firstName} ${lastName}`,
          },
        },
      });
  
      if (result.error) {
        onError(result.error.message || 'Payment failed');
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          onSuccess();
          onClose();
        }
      }
    } catch (error) {
      onError('Payment process failed');
    }
  };
  

  return (
    <div className="checkout-modal">
      <div className="modal-content">
        <button className="close-modal-btn" onClick={onClose}>×</button>
        <h3>Complete Your Payment</h3>
        <form onSubmit={handleSubmit}>
          <div className="StripeElementsContainer">
            <div className="StripeElement">
              <label>Card Number</label>
              <CardNumberElement />
            </div>
            <div className="StripeElement">
              <label>Expiration Date</label>
              <CardExpiryElement />
            </div>
            <div className="StripeElement">
              <label>CVC</label>
              <CardCvcElement />
            </div>
          </div>
          <button className="success-modal-btn" type="submit" disabled={!stripe}>
            Pay Now
          </button>
          <span className="message">{message}</span>
        </form>
      </div>
    </div>
  );
};

export default StripeCheckoutForm;
