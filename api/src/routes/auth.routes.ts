  import express from 'express';
  // controllers
  import userController from '@/controllers/auth.controller';

  const router = express.Router();

  router.post('/login', userController.login);

  export default router;