import localStorageWorker from '../utils/LocalStorageWorker';

class PaymentService {
  async completePayment (totalAmount: number): Promise<string> {
    try {
      const response = await fetch('http://localhost:3001/payments/complete-payment', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorageWorker.getToken()}`,
        },
        body: JSON.stringify({ totalAmount: (totalAmount * 100) }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch payment intent');
      }

      const { clientSecret } = await response.json();
      return clientSecret;
    } catch (error) {
      console.error('Error fetching payment intent:', error);
      throw error;
    }
  };
}

const paymentService = new PaymentService();
export default paymentService; 