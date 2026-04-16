const users = [
  { name: 'Alice', email: 'alice@mail.com', age: 25 },
  { name: 'Bob', age: 32 },
  { name: 'Charlie', email: 'charlie@mail.com' },
];

////////////////////////////////////////////////
for (const { name, email, age } of users) {
  console.log(name, email ?? 'N/A', age ?? 'N/A');
}
