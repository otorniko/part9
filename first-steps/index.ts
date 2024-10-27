import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercise } from './utils';
import { RequestBody } from './types';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const heightStr = req.query.height as string;
    const weightStr = req.query.weight as string;
  
    const height = parseFloat(heightStr);
    const weight = parseFloat(weightStr);
  
    if (isNaN(height) || isNaN(weight)) {
      res.status(400).send({ error: "malformatted parameters" });
      return;
    }

    const bmi = calculateBmi(height, weight);
    const payload = { "height": height, "weight": weight, "bmi": bmi};
    res.json(payload);
});

// TODO: toimivuutta ei oo testattu
app.post('/exercises', (req, res) => {
    const { hours, target} = req.body as RequestBody;
    if (!hours || hours.length === 0 || !target) {
        res.send("error: missing parameters");
    };
    if (!Array.isArray(hours) || !hours.every(h => typeof h === 'number')) {
        res.send("error: malformatted parameters");
    };

    if (isNaN(target)) {
        res.send("error: malformatted parameters");
    };

    res.json(calculateExercise(hours, target));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});