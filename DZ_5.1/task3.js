const number = 5;

console.log('-----------Використовуючи цикл for------------');

for (let i = 1; i <= 10; i++) {
  console.log(`${number} * ${i} = ${number * i}`);
}

console.log('---------Використовуючи цикл while-------------');
let i = 1;

while (i <= 10) {
  console.log(`${number} * ${i} = ${number * i}`);
  i++;
}
