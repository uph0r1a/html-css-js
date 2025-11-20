let array = [1, 2, 3, 4, 5];
let sum = 0;

for (let i = 0; i < array.length; i++) {
  sum += array[i];
}
console.log("Tổng các phần tử:", sum);

array.forEach((num, index) => {
  console.log(`Index ${index}: ${num}`);
});
