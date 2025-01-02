import { Request, Response } from 'express';
import { createPaymentIntent } from '../utils/StripeUtils';

interface PaymentRequestBody {
  totalAmount: number;
}

class StripeController {
  async createPayment(req: Request, res: Response): Promise<void> {
    const { totalAmount }: PaymentRequestBody = req.body;
    if (!totalAmount || isNaN(totalAmount)) {
      res.status(400).send("Invalid amount");
    }

    try {
      const clientSecret = await createPaymentIntent(Math.round(totalAmount));
      res.json({ clientSecret });
    } catch (error) {
      console.error("Error creating payment intent:", error);
      res.status(500).send("Error creating payment intent");
    }
  }
}

export default new StripeController();
