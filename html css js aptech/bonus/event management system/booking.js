let events = JSON.parse(localStorage.getItem("Events") || "[]");
if (events.length === 0) {
  events = [];
  for (let i = 1; i <= 15; i++) {
    events.push({
      id: Date.now() + i,
      eventName: "Event " + i,
      eventCategory: "Category " + ((i % 3) + 1),
      eventDate: `2025-12-${i + 5}`,
      eventLocation: "Location " + i,
      eventPrice: 50 + i * 5,
      eventSeats: 20 + i,
    });
  }
  localStorage.setItem("Events", JSON.stringify(events));
}

document
  .getElementById("dashBoard")
  .addEventListener("click", () => (window.location.href = "dashboard.html"));

document.getElementById("logout").addEventListener("click", () => {
  sessionStorage.setItem("isLogin", "false");
  window.location.href = "login.html";
});

const perPage = 6;
let currentPage = 1;

const eventGrid = document.getElementById("eventGrid");
const pagination = document.getElementById("pagination");

const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const modalTitle = document.getElementById("modalTitle");
const modalCategory = document.getElementById("modalCategory");
const modalDate = document.getElementById("modalDate");
const modalLocation = document.getElementById("modalLocation");
const modalPrice = document.getElementById("modalPrice");
const modalSeats = document.getElementById("modalSeats");
const ticketQuantity = document.getElementById("ticketQuantity");
const totalPrice = document.getElementById("totalPrice");
const bookBtn = document.getElementById("bookBtn");
const loadingMsg = document.getElementById("loadingMsg");

let selectedEvent = null;

function renderEvents() {
  eventGrid.innerHTML = "";
  const start = (currentPage - 1) * perPage;
  const pagedEvents = events.slice(start, start + perPage);

  pagedEvents.forEach((ev) => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <h3>${ev.eventName}</h3>
      <p>${ev.eventCategory}</p>
      <p>${ev.eventDate}</p>
      <p>Price: $${ev.eventPrice}</p>
      <p>Seats: ${ev.eventSeats}</p>
    `;
    div.addEventListener("click", () => openModal(ev));
    eventGrid.appendChild(div);
  });

  renderPagination();
}

function renderPagination() {
  pagination.innerHTML = "";
  const totalPages = Math.ceil(events.length / perPage);
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    if (i === currentPage) btn.disabled = true;
    btn.addEventListener("click", () => {
      currentPage = i;
      renderEvents();
    });
    pagination.appendChild(btn);
  }
}

function openModal(ev) {
  selectedEvent = ev;
  modalTitle.textContent = ev.eventName;
  modalCategory.textContent = ev.eventCategory;
  modalDate.textContent = ev.eventDate;
  modalLocation.textContent = ev.eventLocation;
  modalPrice.textContent = ev.eventPrice;
  modalSeats.textContent = ev.eventSeats;
  ticketQuantity.value = 1;
  totalPrice.textContent = ev.eventPrice;

  modal.style.display = "flex";
}

closeModal.addEventListener("click", () => (modal.style.display = "none"));

ticketQuantity.addEventListener("input", () => {
  const qty = Number(ticketQuantity.value);
  totalPrice.textContent = (qty * selectedEvent.eventPrice).toFixed(2);
});

bookBtn.addEventListener("click", () => {
  const qty = Number(ticketQuantity.value);

  if (qty <= 0) return alert("Quantity must be at least 1");
  if (qty > selectedEvent.eventSeats)
    return alert("Not enough seats available");

  loadingMsg.style.display = "block";
  bookBtn.disabled = true;

  setTimeout(() => {
    selectedEvent.eventSeats -= qty;
    localStorage.setItem("Events", JSON.stringify(events));

    const tickets = JSON.parse(localStorage.getItem("Tickets") || "[]");
    tickets.push({
      id: Date.now(),
      eventId: selectedEvent.id,
      eventName: selectedEvent.eventName,
      quantity: qty,
      total: qty * selectedEvent.eventPrice,
      bookedAt: new Date().toISOString(),
    });
    localStorage.setItem("Tickets", JSON.stringify(tickets));

    loadingMsg.style.display = "none";
    bookBtn.disabled = false;
    modal.style.display = "none";
    alert("Booking successful!");

    renderEvents();
  }, 2000);
});

renderEvents();
