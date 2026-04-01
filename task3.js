const numbers = new Array(10, 20, 30, 40, 50);
const initialValue = 0;
const sumWithInitial = numbers.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  initialValue,
);

console.log(sumWithInitial);
