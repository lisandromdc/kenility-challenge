  import express from 'express';
  // middlewares
  import { uploadFile } from '@/middlewares/files.middleware';
  import { isLoggedIn } from '@/middlewares/auth.middleware';
  // controllers
  import userController from '@/controllers/user.controller';

  const router = express.Router();

  router.use(isLoggedIn);

  router.get('/', userController.getUsers);
  router.get('/:id', userController.getUser);
  router.post('/', uploadFile, userController.createUser);
  router.put('/:id', uploadFile, userController.updateUser);

  export default router;