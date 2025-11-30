let event = [];
let user = [];
const isLogin = sessionStorage.getItem("isLogin");
const checkLogin = () => {
  const isLogin = sessionStorage.getItem("isLogin");
  if (isLogin !== "true") {
    window.location.href = "login.html";
  }
};

checkLogin();

setInterval(checkLogin,500);

document.getElementById("eventTab").addEventListener("click", () => {
  window.location.href = "event.html";
});

document.getElementById("userTab").addEventListener("click", () => {
  window.location.href = "user.html";
});

document.getElementById("bookingTab").addEventListener("click", () => {
  window.location.href = "booking.html";
});

document.getElementById("logoutBtn").addEventListener("click", () => {
  sessionStorage.setItem("isLogin", false);
});
