import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (
    !height ||
    !weight ||
    Number.isNaN(Number(height)) ||
    Number.isNaN(Number(weight))
  ) {
    return res.status(400).json({ error: 'Malformatted parameters' });
  }

  const bmi = calculateBmi([height as string, weight as string]);
  // the issue was that req.query can output multiple types (not just string)
  // since my bmiCalculator function MUST has a string[], this creates an error
  // explicitly using the as string keywords, makes sure it is always a string!!

  return res.json({
    weight: weight,
    height: height,
    bmi: bmi
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {
    dailyExercises,
    target
  }: { dailyExercises: number[]; target: number } = req.body;
  if (!dailyExercises || !target) {
    return res.json({ error: 'parameters missing' });
  }
  if (
    dailyExercises.some((day) => {
      if (day === null || day === undefined) return true;
      return Number.isNaN(Number(day));
    })
  ) {
    return res.json({ error: 'malformatted parameters' });
  }
  return res.json(calculateExercises(dailyExercises, target));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
