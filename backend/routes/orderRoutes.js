import express from 'express';
import { isAuth } from '../utils.js';
import {
  updateDeliverey,
  allOrders,
  getOrder,
  payedOrder,
  myOrder,
} from '../controller/orderController.js';

const orderRouter = express.Router();

orderRouter.post('/payedOrder', isAuth, payedOrder);

orderRouter.get('/', allOrders);//, isAuth //admin

orderRouter.put('/updateDeliverey', updateDeliverey);//, isAuth //admin

orderRouter.get('/mine', isAuth , myOrder);

orderRouter.get('/:id', isAuth ,getOrder);

export default orderRouter;
