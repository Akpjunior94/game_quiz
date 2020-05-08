const sum = (a, b) => a + b;
const addFive = (a, b) => sum(a, b) + 5;

console.log('total', sum(1, 3));

console.log('totalAge', addFive(1, 3));

console.log('totalAmount', sum(1000, 300));

// function sum(a, b) {
//   return a + b;
// }

// function addFive(a, b) {
//   return sum(a, b) + 5;
// }