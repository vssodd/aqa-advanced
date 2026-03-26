function age(age1, age2) {
  if (age1 >= 18 && age2 >= 18) {
    return 'Both are adults';
  } else if (age1 >= 18) {
    return 'First is an adult';
  } else if (age2 >= 18) {
    return 'Second is an adult';
  } else {
    return 'Neither is an adult';
  }
}
console.log(age(25, 21));
