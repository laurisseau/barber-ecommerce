import express from 'express';
import { isAuth } from '../utils.js';
import {
  signup,
  decodeJwtToVerify,
  emailVerification,
  login,
  updateProfile,
  updatedEmailVerification,
  forgotPassword,
  resetPassword,
} from '../controller/userController.js';

const userRouter = express.Router();

userRouter.post('/signup', signup);

userRouter.post('/login', login);

userRouter.get('/email/:id', decodeJwtToVerify);

userRouter.post('/emailVerification', emailVerification);

userRouter.post('/updateEmailVerification', updatedEmailVerification);

userRouter.post('/forgotPassword', forgotPassword);

userRouter.patch('/resetPassword/:token', resetPassword);

userRouter.put('/profile', isAuth, updateProfile);

// make pop up for auth expire

export default userRouter;
