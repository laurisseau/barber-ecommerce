import express from 'express';
import {
  createCategory,
  getCategories,
  getProductFromCategory,
} from '../controller/categoryController.js';

import {
  uploadUserPhoto,
  resizeUserPhoto,
} from '../controller/productController.js';

const categoryRouter = express.Router();

categoryRouter.get('/', getCategories);

categoryRouter.post(
  '/createCategory',
  uploadUserPhoto,
  resizeUserPhoto,
  createCategory
);

categoryRouter.get('/:slug', getProductFromCategory);

export default categoryRouter;
