import Order from '../models/orderModel.js';
import expressAsyncHandler from 'express-async-handler';

export const payedOrder = expressAsyncHandler(async (req, res) => {
  const newOrder = new Order({
    orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
    shippingAddress: req.body.shippingAddress,
    paymentMethod: req.body.paymentMethod,
    isPaid: true,
    paidAt: Date.now(),
    paymentResult: {
      id: req.body.id,
      status: req.body.status,
      email_address: req.body.email_address,
    },
    itemsPrice: req.body.itemsPrice,
    shippingPrice: req.body.shippingPrice,
    taxPrice: req.body.taxPrice,
    totalPrice: req.body.totalPrice,
    user: req.user.sub,
  });

  const order = await newOrder.save();
  res.status(201).send({ message: 'New Order Created', order });
});

export const getOrder = expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    res.send(order);
  } else {
    res.status(404).send({ message: 'Order Not Found' });
  }
});

export const myOrder = expressAsyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user.sub });
  res.send(orders);
});

export const allOrders = expressAsyncHandler(async (req, res) => {
  const orders = await Order.find();
  res.send(orders);
});

export const updateDeliverey = expressAsyncHandler(async (req, res) => {
  const { id } = req.body;

  const order = await Order.findById(id);

  if (order) {
    const orderItemToUpdate = order.orderItems.find(
      (item) => item.name === req.body.orderItemName
    );

    if (orderItemToUpdate) {
      if (req.body.status === 'Delivered') {
        orderItemToUpdate.isDelivered = true;
      } else if (req.body.status === 'Undelivered') {
        orderItemToUpdate.isDelivered = false;
      }
      await order.save();
      res.send(order);
    } else {
      res.status(404).send({ message: 'No undelivered order items found.' });
    }
  } else {
    res.status(404).send({ message: 'Order not found.' });
  }
});

export const largetSalesInDay = expressAsyncHandler(async (req, res) => {
  const orders = await Order.find().select('_id paidAt totalPrice');

  let modifiedPaidAt = {};
  let newOrders = [];

  for (let i = 0; i < orders.length; i++) {
    const stringOrder = orders[i].paidAt.toISOString().split('T')[0];
    modifiedPaidAt['paidAt'] = stringOrder;
    modifiedPaidAt['totalPrice'] = orders[i].totalPrice;
    newOrders.push(modifiedPaidAt);
    modifiedPaidAt = {};
  }

  const groupAndSumOrders = (data) => {
    const groupedOrders = {};

    data.forEach((order) => {
      const { paidAt, totalPrice } = order;

      if (groupedOrders[paidAt]) {
        groupedOrders[paidAt].totalPrice += totalPrice;
      } else {
        groupedOrders[paidAt] = { paidAt, totalPrice };
      }
    });

    return Object.values(groupedOrders);
  };

  const daySales = groupAndSumOrders(newOrders);
  const allPricesArr = [];

  for (let i = 0; i < daySales.length; i++) {
    allPricesArr.push(daySales[i].totalPrice);
  }

  const highestSalesInDay = Math.max(...allPricesArr);

  res.send({ goal: highestSalesInDay });
});

export const totalIncome = expressAsyncHandler(async (req, res) => {
  const orders = await Order.find();

  let sum = 0;

  orders.forEach((order) => {
    sum += order.totalPrice;
  });

  res.send({ totalIncome: sum.toFixed(2) });
});
