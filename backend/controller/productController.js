import Product from '../models/productModel.js';
import expressAsyncHandler from 'express-async-handler';

export const getProductId = expressAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  res.send(product);
});

export const getProductSlug = expressAsyncHandler(async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });

  res.send(product);
});

export const getAllProducts = expressAsyncHandler(async (req, res) => {
  const product = await Product.find();

  res.send(product);
});