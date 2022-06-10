import {Router} from 'express';

import {getUser} from '../controllers/usersController.js';
//import {postUrlValidation, deleteUrlValidation} from '../middlewares/urlsMiddleware.js';

const usersRouter = Router();

usersRouter.get("/users/:id", getUser);

export default usersRouter;