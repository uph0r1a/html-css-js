const scrollBtn = document.createElement("button");
scrollBtn.id = "scrollTopBtn";
scrollBtn.innerHTML = "&#8679;";
document.body.appendChild(scrollBtn);

window.onscroll = function () {
  if (
    document.body.scrollTop > 200 ||
    document.documentElement.scrollTop > 200
  ) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
};

scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

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

setInterval(checkLogin, 500);

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
