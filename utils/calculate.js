export function calculate(previousValue, currentValue, operator) {
  const left = Number(previousValue);
  const right = Number(currentValue);

  if (!Number.isFinite(left) || !Number.isFinite(right)) {
    return 'Error';
  }

  switch (operator) {
    case '+':
      return String(left + right);
    case '-':
      return String(left - right);
    case 'x':
    case '*':
      return String(left * right);
    case '/':
      if (right === 0) {
        return 'Error';
      }
      return String(left / right);
    default:
      return currentValue;
  }
}
