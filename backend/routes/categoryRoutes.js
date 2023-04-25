import express from 'express';
import {
  getCategories,
  getProductFromCategory,
} from '../controller/categoryController.js';

const categoryRouter = express.Router();

categoryRouter.get('/', getCategories);

categoryRouter.get('/:slug', getProductFromCategory);

export default categoryRouter;
