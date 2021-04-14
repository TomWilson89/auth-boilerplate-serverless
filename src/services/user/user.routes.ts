import { Router } from 'express';
import { authorize } from '../../middlewares/authorize';
import UserController from './user.controller';
import UserValidation from './user.validation';

const router = Router();

router.get('/me', authorize, UserController.me);

router.route('/register').post(UserValidation.create, UserController.create);

router.route('/login').post(UserValidation.login, UserController.login);

export default router;
