function handleNum(num, callback_Even, callback_Odd) {
  if (num % 2) {
    callback_Even(num);
  } else {
    callback_Odd(num);
  }
}

const handleEven = (num) => {
  console.log(`${num} number is even.`);
};

const handleOdd = (num) => {
  console.log(`${num} number is odd.`);
};

handleNum(5, handleEven, handleOdd);
handleNum(10, handleEven, handleOdd);
