import {Router} from 'express';

import {getUser, getRanking} from '../controllers/usersController.js';
import {getUserValidation} from '../middlewares/usersMiddlewares.js';

const usersRouter = Router();

usersRouter.get("/users/:id", getUserValidation, getUser);
usersRouter.get("/ranking", getRanking);

export default usersRouter;