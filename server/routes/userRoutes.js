import {
  registerUser,
  loginUser,
  userCredits,
} from '../controllers/userController.js';
import express from 'express';
import userAuth from '../middlewares/auth.js';
// const { registerUser, loginUser } = userController;

const userRouter = express.Router();

// http://localhost:4000/api/user/register
userRouter.post('/register', registerUser);
// http://localhost:4000/api/user/login
userRouter.post('/login', loginUser);
// http://localhost:4000/api/user/credits
userRouter.get('/credits', userAuth, userCredits);

export default userRouter;
