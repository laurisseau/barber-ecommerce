import express from 'express';

//import {forgotPassword, signin, signup, updateProfile, resetPassword } from "../Controller/userController.js";
//import { isAuth } from "../utils.js";

import { signup, decodeJwtToVerify, emailVerification, login } from "../Controller/userController.js";

const userRouter = express.Router();

//userRouter.post("/signin", signin);

userRouter.post('/signup', signup);

userRouter.post('/login', login);

userRouter.get('/email/:id', decodeJwtToVerify);

userRouter.post('/emailVerification', emailVerification)

//userRouter.post("/forgotPassword", forgotPassword);

//userRouter.patch("/resetPassword/:token", resetPassword);

//userRouter.put("/profile", isAuth, updateProfile);

export default userRouter;
