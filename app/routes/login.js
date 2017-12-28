import express from 'express';

export default function loginRoute() {
  const router = express.Router();
  router.get('/login', (req, res) => res.render('pages/login'));
  return router;
}
