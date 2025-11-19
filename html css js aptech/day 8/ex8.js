let isFail = false;

let taiTaiLieu = new Promise((resolve, reject) => {
  if (!isFail) {
    setTimeout(() => {
      resolve("Tải thành công!");
    }, 2000);
  } else {
    reject("Tải thất bại!");
  }
});
