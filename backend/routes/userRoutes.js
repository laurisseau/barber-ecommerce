import express from 'express';

//import {forgotPassword, signin, signup, updateProfile, resetPassword } from "../Controller/userController.js";

import { isAuth } from "../utils.js";
import { signup, decodeJwtToVerify, emailVerification, login, updateProfile, updatedEmailVerification } from "../Controller/userController.js";

const userRouter = express.Router();

userRouter.post('/signup', signup);

userRouter.post('/login', login);

userRouter.get('/email/:id', decodeJwtToVerify);

userRouter.post('/emailVerification', emailVerification)

userRouter.post('/updateEmailVerification', updatedEmailVerification)

//userRouter.post("/forgotPassword", forgotPassword);

//userRouter.patch("/resetPassword/:token", resetPassword);

userRouter.put("/profile", isAuth, updateProfile);

// make pop up fo rauth expire

export default userRouter;
