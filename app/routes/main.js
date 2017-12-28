import express from 'express';
import login from './login';

export default function routes() {
  const router = express.Router();
  router.use(login);
  return router;
}
