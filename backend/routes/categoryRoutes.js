import express from 'express';
import {
  createCategory,
  deleteCategoryById,
  getCategories,
  getCategoryById,
  getProductFromCategory,
  updateCategoryById,
} from '../controller/categoryController.js';

import {
  uploadUserPhoto,
  resizeUserPhoto,
  resizeUpdatedUserPhotoWithDB,
} from '../controller/productController.js';
import Category from '../models/categoryModel.js';
import { isAuth } from '../utils.js';

const categoryRouter = express.Router();

categoryRouter.get('/', getCategories);

categoryRouter.post(
  '/createCategory',
  isAuth,
  uploadUserPhoto,
  resizeUserPhoto,
  createCategory
); //admin

categoryRouter.put(
  '/updateCategory/:id',
  isAuth,
  uploadUserPhoto,
  resizeUpdatedUserPhotoWithDB(Category),
  updateCategoryById
); //admin

categoryRouter.delete('/deleteCategory/:id',isAuth, deleteCategoryById); //admin

categoryRouter.get('/category/:id',isAuth, getCategoryById); //admin

categoryRouter.get('/:slug', getProductFromCategory);

export default categoryRouter;
