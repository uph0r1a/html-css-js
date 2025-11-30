const body = document.body;
const hexCodeSpan = document.getElementById("hex-code");
const btn = document.getElementById("change-btn");

function getRandomHexColor() {
  const hex = Math.floor(Math.random() * 0xffffff).toString(16);
  return `#${hex.padStart(6, "0")}`;
}

function changeBackgroundColor() {
  const randomColor = getRandomHexColor();
  body.style.backgroundColor = randomColor;
  hexCodeSpan.textContent = randomColor.toUpperCase();
}
btn.addEventListener("click", changeBackgroundColor);
