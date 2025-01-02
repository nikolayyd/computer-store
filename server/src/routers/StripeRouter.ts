import { Router } from 'express';
import stripeController from '../controllers/StripeController';
export const stripeRouter = Router();

stripeRouter.post('/complete-payment', stripeController.createPayment);