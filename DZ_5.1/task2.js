const averageGrade = 60;

switch (true) {
  case averageGrade >= 91:
    console.log('Відмінно');
    break;
  case averageGrade >= 81:
    console.log('Дуже добре');
    break;
  case averageGrade >= 71:
    console.log('Добре');
    break;
  case averageGrade >= 61:
    console.log('Задовільно');
    break;
  default:
    console.log('Незадовільно');
}
