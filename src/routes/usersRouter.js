import {Router} from 'express';

import {getUser, getRanking} from '../controllers/usersController.js';

const usersRouter = Router();

usersRouter.get("/users/:id", getUser);
usersRouter.get("/ranking", getRanking);

export default usersRouter;