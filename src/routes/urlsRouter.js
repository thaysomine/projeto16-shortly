import {Router} from 'express';

import {postUrl, getUrl, getShortUrl, deleteUrl} from '../controllers/urlsController.js';
import {postUrlValidation, deleteUrlValidation} from '../middlewares/urlsMiddleware.js';

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", postUrlValidation, postUrl);
urlsRouter.get("/urls/:id", getUrl);
urlsRouter.get("/urls/open/:shortUrl", getShortUrl);
urlsRouter.delete("/urls/:id", deleteUrlValidation, deleteUrl);

export default urlsRouter;