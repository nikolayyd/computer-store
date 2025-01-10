import Stripe from 'stripe';
import { STRIPE_SECRET_KEY } from './stripeKey';
const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2024-12-18.acacia',
});

export const createPaymentIntent = async (amount: number): Promise<string> => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'BGN', 
      metadata: { integration_check: 'accept_a_payment' },
    });
    return paymentIntent.client_secret!;
  } catch (error) {
    console.error('Error creating payment intent', error);
    throw error;
  }
};
