import express from 'express';
import { isAuth } from '../utils.js';
import {
  pay,
  getOrder,
  saveOrder,
  myOrder,
} from '../controller/orderController.js';

const orderRouter = express.Router();

orderRouter.post('/', isAuth, saveOrder);

orderRouter.get('/mine', isAuth ,myOrder);

orderRouter.get('/:id', isAuth ,getOrder);

orderRouter.put('/:id/pay', isAuth ,pay);

export default orderRouter;
