import stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config({ path: 'config.env' });

export const paymentIntent = async (req, res) => {
  try {
    const secretKey = process.env.STRIPE_SK;

    const amount = req.body.amount;

    const pennyAmount = amount * 100;

    const paymentIntent = await stripe(secretKey).paymentIntents.create({
      amount: pennyAmount,
      currency: 'usd',
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    console.log(err);
  }
};
