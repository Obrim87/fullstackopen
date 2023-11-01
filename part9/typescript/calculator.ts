export type Operation = 'multiply' | 'add' | 'divide';
type Result = number | string;

export const calculator = (a: number, b: number, op: Operation): Result => {
  if (op === 'multiply') {
    return a * b;
  } else if (op === 'add') {
    return a + b;
  } else if (op === 'divide') {
    if (b === 0) return `You can't divide by 0!`;
    return a / b;
  } else {
    return 'error';
  }
};
