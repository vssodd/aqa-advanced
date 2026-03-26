function checkOrder(available, ordered) {
  if (available >= ordered) {
    return 'Your order is accepted';
  } else if (available < ordered) {
    return 'Your order is too large, we don’t have enough goods.';
  } else if (available <= 0) {
    return 'Your order is empty';
  }
}

console.log(checkOrder(100, 50)); // Your order is accepted
console.log(checkOrder(100, 150)); // Your order is too large, we don’t have enough goods.
console.log(checkOrder(0, 50)); // Your order is empty
