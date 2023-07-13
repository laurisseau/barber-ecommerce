import express from 'express';
import { paymentIntent } from '../controller/paymentController.js';
import { isAuth } from '../utils.js';

const paymentRouter = express.Router();

paymentRouter.post('/create-payment-intent',  paymentIntent);//isAuth,

export default paymentRouter;
