let x = parseFloat(prompt("What's x?"));

if (isNaN(x)) {
  console.log("Gia tri khong hop le");
} else if (x < 0) {
  console.log("x la so am");
} else if (x === 0) {
  console.log("x = 0");
} else {
  if (Number.isInteger(x)) {
    console.log("x la so nguyen duong");
  } else {
    console.log("x la so thap phan duong");
  }
}
