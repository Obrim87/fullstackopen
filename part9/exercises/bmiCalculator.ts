export const calculateBmi = (args: string[]): string => {
  const height = Number(args[0]);
  const weight = Number(args[1]);

  const bmi = Math.round((weight / (height / 100) ** 2) * 100) / 100;

  if (bmi < 20) {
    return 'You are under weight. Eat a cheeseburger.';
  } else if (bmi > 25) {
    return 'You are over weight. Go to the gym.';
  } else {
    return 'Normal (healthy weight)';
  }
};
