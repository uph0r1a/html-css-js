let D = parseFloat(prompt("What's D?"));

if (isNaN(D)) {
  console.log("Gia tri khong hop le");
} else if (D >= 9 && D <= 10) {
  console.log("hang A");
} else if (D >= 7 && D < 9) {
  console.log("hang B");
} else if (D >= 5 && D < 7) {
  console.log("hang C");
} else if (D >= 0 && D < 5) {
  console.log("hang D");
} else {
  console.log("Diem ko co that");
}
