import { useState } from 'react';
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';
import '../styles/StripeCheckoutForm.css';
import paymentService from '../services/PaymentService';
import userService from '../services/UserService';
interface StripeCheckoutFormProps {
  totalAmount: number;
  onSuccess: () => void;
  onError: (errorMessage: string) => void;
  onClose: () => void;
}

interface UserNames {
  firstName: string,
  lastName: string
}

function StripeCheckoutForm ({ totalAmount, onSuccess, onError, onClose }: StripeCheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string | null>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsButtonDisabled(true);
    setMessage('Payment processing...');
    if (!stripe || !elements) {
      setMessage('Stripe is not loaded!');
      setIsButtonDisabled(false);
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);
    const cardExpiryElement = elements.getElement(CardExpiryElement);
    const cardCvcElement = elements.getElement(CardCvcElement);
  
    if (!cardNumberElement || !cardExpiryElement || !cardCvcElement) {
      onError('One or more card elements are missing.');
      return;
    }
  
    try {
      const userInfo: UserNames = await userService.getUser();

      const firstName = userInfo.firstName;
      const lastName = userInfo.lastName;

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
        setIsButtonDisabled(false);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          onSuccess();
          onClose();
        }
      }
    } catch (error) {
      setIsButtonDisabled(false);
      onError('Payment process failed');
    }
  };
  

  return (
    <div className='checkout-modal'>
      <div className='modal-content'>
        <button className='close-modal-btn' onClick={onClose}>×</button>
        <h3>Complete Your Payment</h3>
        <form onSubmit={handleSubmit}>
          <div className='StripeElementsContainer'>
            <div className='StripeElement'>
              <label>Card Number</label>
              <CardNumberElement />
            </div>
            <div className='StripeElement'>
              <label>Expiration Date</label>
              <CardExpiryElement />
            </div>
            <div className='StripeElement'>
              <label>CVC</label>
              <CardCvcElement />
            </div>
          </div>
          <button className='success-modal-btn' type='submit' disabled={!stripe || isButtonDisabled}>
            Pay Now
          </button>
          <div className='message-container'>
            <span className='message'>{message}</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StripeCheckoutForm;
