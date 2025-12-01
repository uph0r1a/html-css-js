const scrollBtn = document.getElementById("scrollTop");
window.onscroll = () => {
  scrollBtn.style.display =
    document.body.scrollTop > 200 || document.documentElement.scrollTop > 200
      ? "block"
      : "none";
};
scrollBtn.onclick = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

let events = JSON.parse(localStorage.getItem("Events")) || [];

const eventNameInput = document.getElementById("eventName");
const eventCategoryInput = document.getElementById("eventCategory");
const eventDateInput = document.getElementById("eventDate");
const eventLocationInput = document.getElementById("eventLocation");
const eventPriceInput = document.getElementById("eventPrice");
const eventSeatsInput = document.getElementById("eventSeats");
const eventThumbnailInput = document.getElementById("eventThumbnail");
const add = document.getElementById("add");
const tbody = document.getElementById("tbody");

let editId = null;
let editRow = null;

const checkLogin = () => {
  const isLogin = sessionStorage.getItem("isLogin");
  if (isLogin !== "true") {
    window.location.href = "login.html";
  }
};
checkLogin();
setInterval(checkLogin, 500);

document.getElementById("dashBoard").addEventListener("click", () => {
  window.location.href = "dashboard.html";
});
document.getElementById("logout").addEventListener("click", () => {
  sessionStorage.setItem("isLogin", "false");
  window.location.href = "login.html";
});

function renderEvents() {
  tbody.innerHTML = "";
  events.forEach((ev) => addEventRow(ev));
}
renderEvents();

function addEventRow(newEvent) {
  const tr = document.createElement("tr");

  tr.innerHTML = `
    <td>${newEvent.id}</td>
    <td>${newEvent.eventName}</td>
    <td>${newEvent.eventCategory}</td>
    <td>${newEvent.eventDate}</td>
    <td>${newEvent.eventLocation}</td>
    <td>${newEvent.eventPrice}</td>
    <td>${newEvent.eventSeats}</td>
    <td>${newEvent.thumbnailName}</td>
    <td>
      <button class="change">Change</button>
      <button class="delete">Delete</button>
    </td>
  `;

  tr.querySelector(".change").addEventListener("click", () => {
    editId = newEvent.id;
    editRow = tr;

    eventNameInput.value = newEvent.eventName;
    eventCategoryInput.value = newEvent.eventCategory;
    eventDateInput.value = newEvent.eventDate;
    eventLocationInput.value = newEvent.eventLocation;
    eventPriceInput.value = newEvent.eventPrice;
    eventSeatsInput.value = newEvent.eventSeats;

    eventThumbnailInput.value = "";

    add.textContent = "Confirm";
  });

  tr.querySelector(".delete").addEventListener("click", () => {
    if (confirm("Are you sure to delete?")) {
      events = events.filter((e) => e.id !== newEvent.id);
      localStorage.setItem("Events", JSON.stringify(events));
      tr.remove();
    }
  });

  tbody.appendChild(tr);
}

document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();

  const eventName = eventNameInput.value.trim();
  const eventCategory = eventCategoryInput.value;
  const eventDate = eventDateInput.value;
  const eventLocation = eventLocationInput.value.trim();
  const eventPrice = Number(eventPriceInput.value);
  const eventSeats = Number(eventSeatsInput.value);
  const eventThumbnail = eventThumbnailInput.files;

  if (
    !eventName ||
    !eventCategory ||
    !eventDate ||
    !eventLocation ||
    !eventPrice ||
    !eventSeats ||
    (editId === null && eventThumbnail.length === 0)
  ) {
    alert("All fields are required");
    return;
  }

  if (eventPrice <= 0 || eventSeats <= 0) {
    alert("Price and seats must be positive");
    return;
  }

  if (editId !== null) {
    events = events.map((e) =>
      e.id === editId
        ? {
            ...e,
            eventName,
            eventCategory,
            eventDate,
            eventLocation,
            eventPrice,
            eventSeats,
            thumbnailName: eventThumbnail.length
              ? eventThumbnail[0].name
              : e.thumbnailName,
          }
        : e
    );

    localStorage.setItem("Events", JSON.stringify(events));

    editRow.children[1].textContent = eventName;
    editRow.children[2].textContent = eventCategory;
    editRow.children[3].textContent = eventDate;
    editRow.children[4].textContent = eventLocation;
    editRow.children[5].textContent = eventPrice;
    editRow.children[6].textContent = eventSeats;

    if (eventThumbnail.length)
      editRow.children[7].textContent = eventThumbnail[0].name;

    editId = null;
    editRow = null;
    add.textContent = "Add";

    document.getElementById("form").reset();
    return;
  }

  const newEvent = {
    id: Date.now(),
    eventName,
    eventCategory,
    eventDate,
    eventLocation,
    eventPrice,
    eventSeats,
    thumbnailName: eventThumbnail[0].name,
  };

  events.push(newEvent);
  localStorage.setItem("Events", JSON.stringify(events));

  addEventRow(newEvent);

  document.getElementById("form").reset();
});
