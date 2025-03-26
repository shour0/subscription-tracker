import { Router } from 'express';
import { getUser, getUsers } from '../controllers/user.controller.js';
import authorize from '../middlewares/auth.middleware.js';
const userRouter = Router();
// CRUD method
userRouter.get('/', authorize, getUsers);

userRouter.get('/:id', authorize, getUser);

userRouter.post('/', (req, res) => res.send({
  title: ' CREATE new users'
}));

userRouter.put('/:id', (req, res) => res.send({
  title: ' UPDATE users'
}));

userRouter.delete('/:id', (req, res) => res.send({
  title: ' DELETE all users'
}));

export default userRouter;