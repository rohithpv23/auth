import express from 'express';

export default function loginRoute() {
  const router = express.Router();
  router.get('/login', (req, res) => res.send("ggggg"));
  return router;
}
