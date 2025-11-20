let array = [1, 2, 3, 4, 5];

const even = array.filter((n) => n % 2 === 0);
console.log("Các số chẵn:", even);

const double = array.map((n) => n * 2);
console.log("Mảng mới gấp đôi:", double);

const sum = array.reduce((total, num) => total + num, 0);
console.log("Tổng các số:", sum);
