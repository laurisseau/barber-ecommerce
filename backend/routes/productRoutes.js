import express from 'express';
import {
  CreatProduct,
  getAllProducts,
  getProductId,
  getProductSlug,
} from '../controller/productController.js';

const productRouter = express.Router();

productRouter.post('/createProduct', CreatProduct);

productRouter.get('/', getAllProducts);

productRouter.get('/:id', getProductId);

productRouter.get('/slug/:slug', getProductSlug);

export default productRouter;
