import express from 'express';
//import { isAuth } from '../utils.js';
import {
  pay,
  getOrder,
  saveOrder,
  myOrder,
} from '../controller/orderController.js';

const orderRouter = express.Router();

orderRouter.post('/', saveOrder);

orderRouter.get('/mine', myOrder);

orderRouter.get('/:id', getOrder);

orderRouter.put('/:id/pay', pay);

export default orderRouter;
