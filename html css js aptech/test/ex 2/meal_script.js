const form = document.getElementById("form");
const tbody = document.getElementById("tbody");
const countlist = document.getElementById("countlist");

const counts = {
    vegetarian: 0,
    nonvegetarian: 0,
    vegan: 0,
    kids: 0,
};

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const type = document.getElementById("type").value;

    const newrow = document.createElement("tr");
    newrow.innerHTML = `
    <td>${name}</td>
    <td>${type}</td>
    <td><button class="deleteBtn">Delete</button></td>
  `;
    tbody.appendChild(newrow);

    counts[type]++;
    updatecount();

    newrow.querySelector(".deleteBtn").addEventListener("click", () => {
        tbody.removeChild(newrow);
        counts[type]--;
        updatecount();
    });
});

function updatecount() {
    countlist.innerHTML = `
    <li>Vegetarian: ${counts.vegetarian}</li>
    <li>Non-Vegetarian: ${counts.nonvegetarian}</li>
    <li>Vegan: ${counts.vegan}</li>
    <li>Kids: ${counts.kids}</li>
  `;
}