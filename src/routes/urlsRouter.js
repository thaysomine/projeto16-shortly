import {Router} from 'express';

import {postUrl, getUrl} from '../controllers/urlsController.js';
import {postUrlValidation} from '../middlewares/urlsMiddleware.js';

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", postUrlValidation, postUrl);
urlsRouter.get("/urls/:id", getUrl);

export default urlsRouter;