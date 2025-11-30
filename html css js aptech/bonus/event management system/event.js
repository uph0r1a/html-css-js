let events = [];
const eventNameInput = document.getElementById("eventName");
const eventCategoryInput = document.getElementById("eventCategory");
const eventDateInput = document.getElementById("eventDate");
const eventLocationInput = document.getElementById("eventLocation");
const eventPriceInput = document.getElementById("eventPrice");
const eventSeatsInput = document.getElementById("eventSeats");
const eventThumbnailInput = document.getElementById("eventThumbnail");
const add = document.getElementById("add");
const logOut = document.getElementById("logout");
const tbody = document.getElementById("tbody");

let editId = null;

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
    eventThumbnail.length === 0
  ) {
    alert("Input cannot be empty");
    return;
  }

  if (eventPrice <= 0 || eventSeats <= 0) {
    alert("Any number input must be positive");
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
    eventThumbnail: eventThumbnail[0],
  };

  events.push(newEvent);

  const tr = document.createElement("tr");

  const tdid = document.createElement("td");
  tdid.textContent = newEvent.id;

  const tdname = document.createElement("td");
  tdname.textContent = newEvent.eventName;

  const tdcategory = document.createElement("td");
  tdcategory.textContent = newEvent.eventCategory;

  const tddate = document.createElement("td");
  tddate.textContent = newEvent.eventDate;

  const tdlocation = document.createElement("td");
  tdlocation.textContent = newEvent.eventLocation;

  const tdprice = document.createElement("td");
  tdprice.textContent = newEvent.eventPrice;

  const tdseat = document.createElement("td");
  tdseat.textContent = newEvent.eventSeats;

  const tdthumbnail = document.createElement("td");
  tdthumbnail.textContent = newEvent.eventThumbnail.name;

  const tdaction = document.createElement("td");

  const changebtn = document.createElement("button");
  changebtn.textContent = "Change";
  changebtn.addEventListener("click", () => {
    const findEvent = events.find((e) => e.id === events.id);
    if (!findEvent) return;

    eventNameInput.value = findEvent.eventName;
    eventCategoryInput.value = findEvent.eventCategory;
    eventDateInput.value = findEvent.eventDate;
    eventLocationInput.value = findEvent.eventLocation;
    eventPriceInput.value = findEvent.eventPrice;
    eventSeatsInput.value = findEvent.eventSeats;
    eventThumbnailInput.value = findEvent.eventThumbnail;
    document.getElementById("add").textContent = "Confirm"
  });

  const delbtn = document.createElement("button");
  delbtn.textContent = "Delete";
  delbtn.addEventListener("click", () => {
    if (confirm("Are you sure to delete?")) {
      events = events.filter((e) => e !== newEvent);
      tr.remove();
    }
  });

  tdaction.appendChild(delbtn);

  tr.appendChild(tdid);
  tr.appendChild(tdname);
  tr.appendChild(tdcategory);
  tr.appendChild(tddate);
  tr.appendChild(tdlocation);
  tr.appendChild(tdprice);
  tr.appendChild(tdseat);
  tr.appendChild(tdthumbnail);
  tr.appendChild(tdaction);

  tbody.appendChild(tr);

  eventNameInput.value = "";
  eventCategoryInput.value = "";
  eventDateInput.value = "";
  eventLocationInput.value = "";
  eventPriceInput.value = "";
  eventSeatsInput.value = "";
  eventThumbnailInput.value = "";
});
