const greeting = document.getElementById("greeting");
const changeBtn = document.getElementById("changeBtn");

changeBtn.addEventListener("click", () => {
  greeting.textContent = "Chào mừng bạn đến với trang web!";
});
