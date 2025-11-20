let array = [1, 2, 3, 4, 5, 6];

const even = array.filter((n) => n % 2 === 0);

const doubleEven = even.map((n) => n * 2);

const sum = doubleEven.reduce((total, num) => total + num, 0);

console.log("Tổng các số chẵn nhân đôi:", sum);
