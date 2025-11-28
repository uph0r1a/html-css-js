let a = parseFloat(prompt("What's a?"));
let b = parseFloat(prompt("What's b?"));
let c = parseFloat(prompt("What's c?"));

if (isNaN(a) || isNaN(b) || isNaN(c)) {
  console.log("Gia tri khong hop le");
} else if (a === 0) {
  if (b === 0) {
    if (c === 0) {
      console.log("Phuong trinh vo so nghiem");
    } else {
      console.log("Phuong trinh vo nghiem");
    }
  } else {
    console.log("Phuong trinh co 1 nghiem: x = " + -c / b);
  }
} else {
  let delta = b * b - 4 * a * c;

  if (delta < 0) {
    console.log("Phuong trinh vo nghiem");
  } else if (delta === 0) {
    console.log("Phuong trinh co nghiem kep:");
    console.log("x = " + -b / (2 * a));
  } else {
    console.log("Phuong trinh co 2 nghiem phan biet:");
    console.log("x1 = " + (-b + Math.sqrt(delta)) / (2 * a));
    console.log("x2 = " + (-b - Math.sqrt(delta)) / (2 * a));
  }
}
