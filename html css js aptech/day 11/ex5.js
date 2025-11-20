let array = [10, 15, 20, 25, 30];

const chiaHetChoNam = array.filter((n) => n % 5 === 0);
console.log("Các số chia hết cho 5:", chiaHetChoNam);

const lonHonHaiMuoi = array.filter((n) => n > 20);
console.log("Các số lớn hơn 20:", lonHonHaiMuoi);
