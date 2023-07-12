import express from 'express';
import { paymentIntent } from '../controller/paymentController.js';
import { isAuth } from '../utils.js';

const paymentRouter = express.Router();

paymentRouter.post('/create-payment-intent', isAuth, paymentIntent);

export default paymentRouter;
