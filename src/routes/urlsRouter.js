import {Router} from 'express';

import {postUrl, getUrl, getShortUrl} from '../controllers/urlsController.js';
import {postUrlValidation} from '../middlewares/urlsMiddleware.js';

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", postUrlValidation, postUrl);
urlsRouter.get("/urls/:id", getUrl);
urlsRouter.get("/urls/open/:shortUrl", getShortUrl);

export default urlsRouter;