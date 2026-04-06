const users = [
  { name: 'Alice', email: 'alice@mail.com', age: 25 },
  { name: 'Bob', email: 'bob@mail.com', age: 32 },
  { name: 'Charlie', email: 'charlie@mail.com', age: 19 },
];

for (const user of users) {
  console.log('Not Destructured:', user.name, user.email, user.age);
}
for (const { name, email, age } of users) {
  console.log('Destructured:', name, email, age);
}
