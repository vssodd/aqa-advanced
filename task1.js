function printWithDelay(text, milliseconds) {
  setTimeout(() => {
    console.log(text);
  }, milliseconds);
}

printWithDelay('Hello after 1 second', 1000);
printWithDelay('Hello after 2 seconds', 2000);
