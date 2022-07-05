
import dotenv from 'dotenv';

import { Request, Response } from 'express';
import { Stripe } from 'stripe';

let SUPER_SECRET_KEY: string;
if(process.env.SECRET_KEY) {
  SUPER_SECRET_KEY = process.env.SECRET_KEY;
} else {
  throw new Error('SECRET_KEY not found');
}

const stripe = new Stripe(SUPER_SECRET_KEY, {
  apiVersion: '2020-08-27',
});

export async function createPayment(req: Request, res: Response): Promise<void> {
  if (req.method === "POST") {
    try {
      const { amount } = req.body;
      // Psst. For production-ready applications we recommend not using the
      // amount directly from the client without verifying it first. This is to
      // prevent bad actors from changing the total amount on the client before
      // it gets sent to the server. A good approach is to send the quantity of
      // a uniquely identifiable product and calculate the total price server-side.
      // Then, you would only fulfill orders using the quantity you charged for.

      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "eur"
      });

      res.status(200).send(paymentIntent.client_secret);
      console.log('Payment intent succeeded: ');
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err });
      console.log('Payment intent failed: ', err)
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};