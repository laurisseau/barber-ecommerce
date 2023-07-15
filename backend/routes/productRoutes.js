import express from 'express';
import {
  getAllProducts,
  getProductId,
  getProductSlug,
} from '../controller/productController.js';

const productRouter = express.Router();

productRouter.get('/', getAllProducts);

productRouter.get('/:id', getProductId);

productRouter.get('/slug/:slug', getProductSlug);

export default productRouter;
