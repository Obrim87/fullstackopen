interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (hours: number[], target: number): Result => {
  let trainingDays = 0;
  for (const hour of hours) {
    if (hour > 0) trainingDays++;
  }

  const avgHours =
    Math.round((hours.reduce((a, b) => a + b) / hours.length) * 100) / 100;

  const ratingCalc = () => {
    if (avgHours < target - 0.5) {
      return 1;
    }
    if (avgHours > target - 0.5 && avgHours < target) {
      return 2;
    }
    return 3;
  };

  const ratingDescription = [
    'Not enough exercise, do better next week!',
    'Almost got there, try and improve next week!',
    'You reached your goal hours, nice work! Keep it up.'
  ];

  return {
    periodLength: hours.length,
    trainingDays: trainingDays,
    target: target,
    average: avgHours,
    success: avgHours > target ? true : false,
    rating: ratingCalc(),
    ratingDescription: ratingDescription[ratingCalc() - 1]
  };
};

// const { hours, target } = parseExerciseArgs(
//   process.argv.slice(2, process.argv.length)
// );
// console.log(hours, target);

// console.log(calculateExercises(hours, target));

// interface ExerciseInputValues {
//   hours: number[];
//   target: number;
// }

// const parseExerciseArgs = (args: string[]): ExerciseInputValues => {
//   if (args.length < 8)
//     throw new Error('Please enter at least a weeks worth of data');
//   const convertedArgs = args.map((arg) => {
//     if (isNaN(Number(arg))) {
//       throw new Error('You can only enter numbers');
//     }
//     return Number(arg);
//   });
//   return {
//     hours: convertedArgs.slice(1, args.length),
//     target: convertedArgs[0]
//   };
// };
