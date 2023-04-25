import Category from '../models/categoryModel.js';
import Product from '../models/productModel.js';
import expressAsyncHandler from 'express-async-handler';

export const getCategories = expressAsyncHandler(async (req, res) => {
  const categories = await Category.find();
  res.send(categories);
});

export const getProductFromCategory = expressAsyncHandler(async (req, res) => {
  const findProducts = await Product.find({ category: req.params.slug });
  res.send(findProducts);
});
