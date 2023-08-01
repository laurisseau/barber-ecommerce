import express from 'express';
import { isAuth } from '../utils.js';
import {
  updateDeliverey,
  allOrders,
  getOrder,
  payedOrder,
  myOrder,
  largetSalesInDay,
  totalIncome,
} from '../controller/orderController.js';

const orderRouter = express.Router();

orderRouter.post('/payedOrder', isAuth, payedOrder);

orderRouter.get('/', isAuth, allOrders); //admin

orderRouter.get('/largetSalesInDay', isAuth, largetSalesInDay); // //admin

orderRouter.get('/totalIncome', isAuth, totalIncome); // //admin

orderRouter.put('/updateDeliverey', isAuth, updateDeliverey); // //admin

orderRouter.get('/mine', isAuth, myOrder);

orderRouter.get('/:id', isAuth, getOrder);

export default orderRouter;
