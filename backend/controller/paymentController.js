import stripe from "stripe";
import dotenv from "dotenv";
dotenv.config({ path: "config.env" });

export const paymentIntent = async (req, res) => {
  try {
    const secretKey = process.env.STRIPE_SK;

    const paymentIntent = await stripe(secretKey).paymentIntents.create({
      amount: req.body.amount,
      currency: "usd",
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    console.log(err);
  }
};