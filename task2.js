function printNumber(num) {
  if (num <= 0) return;
  console.log(`The number is ${num}`);
  printNumber(num - 1);
}

printNumber(5);
