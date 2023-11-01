// const express = require('express')
import express from 'express';
import { calculator, Operation } from './calculator';
const app = express();

app.use(express.json()); // this middleware is needed to parse the body in req.body

const PORT = 3003;

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.post('/calculate', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { value1, value2, op } = req.body;

  const result = calculator(Number(value1), Number(value2), op as Operation);
  res.send({ result });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
