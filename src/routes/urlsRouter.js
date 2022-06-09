import {Router} from 'express';

import {postUrl} from '../controllers/urlsController.js';
import {postUrlValidation} from '../middlewares/urlsMiddleware.js';

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", postUrlValidation, postUrl);

export default urlsRouter;