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

const categoryRouter = express.Router();

categoryRouter.get('/', getCategories);

categoryRouter.post(
  '/createCategory',
  uploadUserPhoto,
  resizeUserPhoto,
  createCategory
); //admin

categoryRouter.put(
  '/updateCategory/:id',
  uploadUserPhoto,
  resizeUpdatedUserPhotoWithDB(Category),
  updateCategoryById
); //admin

categoryRouter.delete('/deleteCategory/:id', deleteCategoryById); //admin

categoryRouter.get('/category/:id', getCategoryById); //admin

categoryRouter.get('/:slug', getProductFromCategory);

export default categoryRouter;
