import express from 'express';
import {
  getProductId,
  getProductSlug,
} from '../controller/productController.js';

const productRouter = express.Router();

productRouter.get('/:id', getProductId);

productRouter.get('/slug/:slug', getProductSlug);

export default productRouter;
