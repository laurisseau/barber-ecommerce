import express from 'express';
import {
  updateProductById,
  deleteProductById,
  uploadUserPhoto,
  resizeUserPhoto,
  resizeUpdatedUserPhotoWithDB,
  CreatProduct,
  getAllProducts,
  getProductId,
  getProductSlug,
} from '../controller/productController.js';
import Product from '../models/productModel.js';

const productRouter = express.Router();

productRouter.post(
  '/createProduct',
  uploadUserPhoto,
  resizeUserPhoto,
  CreatProduct
);

productRouter.get('/', getAllProducts);

productRouter.get('/:id', getProductId);

productRouter.delete('/deleteProduct/:id', deleteProductById); //admin

productRouter.put(
  '/updateProduct/:id',
  uploadUserPhoto,
  resizeUpdatedUserPhotoWithDB(Product),
  updateProductById
); //admin

productRouter.get('/slug/:slug', getProductSlug);

export default productRouter;
