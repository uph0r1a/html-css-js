let calculateElectricBill = (kwh) => {
  if (kwh < 0) {
    return "Số điện sai, hãy nhập lại";
  } else if (kwh <= 50) {
    return kwh * 1500;
  } else if (kwh <= 100) {
    return 50 * 1500 + (kwh - 50) * 2000;
  } else {
    return 50 * 1500 + 50 * 2000 + (kwh - 100) * 3000;
  }
};

let kwh = 120;
console.log(`${calculateElectricBill(kwh)} đ`);
