let originalData = [];
let currentData = [];
let isAscending = true;

function isPastEvent(dateStr) {
    const eventDate = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return eventDate < today;
}

function renderTable(events) {
    const tbody = document.querySelector("#eventTable tbody");
    const emptyState = document.getElementById("emptyState");
    tbody.innerHTML = "";

    if (events.length === 0) {
        emptyState.hidden = false;
        return;
    }
    emptyState.hidden = true;

    events.forEach(item => {
        const statusClass = item.status === "Scheduled" ? "status-scheduled" : "status-completed";
        const pastBadge = isPastEvent(item.date) ? '<span class="past-badge">Past Event</span>' : "";

        tbody.innerHTML += `
      <tr>
        <td data-label="Event ID">${item.id}</td>
        <td data-label="Name">${item.name}${pastBadge}</td>
        <td data-label="Sport">${item.sport}</td>
        <td data-label="Date">${item.date}</td>
        <td data-label="Venue">${item.venue}</td>
        <td data-label="Status"><span class="status-pill ${statusClass}">${item.status}</span></td>
      </tr>
    `;
    });
}

function sortByDate() {
    currentData.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return isAscending ? dateA - dateB : dateB - dateA;
    });

    const btn = document.getElementById("sortBtn");
    btn.textContent = "Sort by Date " + (isAscending ? "▲" : "▼");

    isAscending = !isAscending;

    renderTable(currentData);
}

function filterByStatus() {
    const value = document.getElementById("statusFilter").value;
    currentData = value === "All" ? [...originalData] : originalData.filter(item => item.status === value);
    renderTable(currentData);
}

document.getElementById("sortBtn").addEventListener("click", sortByDate);
document.getElementById("statusFilter").addEventListener("change", filterByStatus);

fetch("events.json")
    .then(res => res.json())
    .then(data => {
        originalData = data.events;
        currentData = [...originalData];
        renderTable(currentData);
    })
    .catch(err => {
        console.error(err);
        alert("Could not load events.json. Please run this with a local server (e.g. Live Server).");
    });