const p = document.getElementById("para");
const btnHide = document.getElementById("gone");
const btnShow = document.getElementById("show");

btnHide.addEventListener("click", () => {
  p.style.display = "none";
});

btnShow.addEventListener("click", () => {
  p.style.display = "block";
});
