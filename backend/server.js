import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productRouter from './routes/productRoutes.js';
import categoryRouter from './routes/categoryRoutes.js';
import paymentRouter from './routes/paymentRoutes.js';
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js';

dotenv.config({ path: 'config.env' });

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/categories', categoryRouter);
app.use('/api/products', productRouter);
app.use('/api/payment', paymentRouter);
app.use('/api/orders', orderRouter);
app.use('/api/users', userRouter);

/*
const __dirname = path.resolve()

app.use(express.static(path.join(__dirname, '/frontend/build')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
})
*/
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.stack });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
