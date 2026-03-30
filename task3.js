function divide(numerator, denominator) {
  if (denominator === 0) {
    throw new Error('Denominator cannot be zero');
  }
  if (typeof numerator === 'string' || typeof denominator === 'string') {
    throw new Error('Arguments must be numbers');
  }
  const result = numerator / denominator;
  return result;
}

// try catch block to handle errors
//↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓//

// Error: Denominator cannot be zero
try {
  divide(12, 0);
} catch (error) {
  console.error(`Робота завершена ${error.message}`);
}

// Error: Arguments must be numbers
try {
  divide('12', 4);
} catch (error) {
  console.error(`Робота завершена ${error.message}`);
}
