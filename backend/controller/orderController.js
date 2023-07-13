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
