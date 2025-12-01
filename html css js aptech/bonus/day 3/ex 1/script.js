let product = JSON.parse(localStorage.getItem("Product")) || [];
const nameInput = document.getElementById("name");
const priceInput = document.getElementById("price");
const tbody = document.getElementById("tbody");
let count = 1;

document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const price = priceInput.value.trim();

  if (name === "" || price === "") {
    alert("Name or price must not be empty");
    return;
  }
  if (price <= 0) {
    alert("Price cannot be negative");
    return;
  } else {
    product.push({ id: count, name, price });

    renderTable();
    localStorage.setItem("Product", JSON.stringify(product));
    nameInput.value = "";
    priceInput.value = "";
    count++;
  }
});

function renderTable() {
  tbody.innerHTML = "";

  product.forEach((p, index) => {
    p.id = index + 1;

    const tr = document.createElement("tr");

    const tdid = document.createElement("td");
    tdid.textContent = p.id;

    const tdname = document.createElement("td");
    tdname.textContent = p.name;

    const tdprice = document.createElement("td");
    tdprice.textContent = p.price;

    const tddel = document.createElement("td");
    const del = document.createElement("button");
    del.textContent = "Delete";
    tddel.appendChild(del);

    del.addEventListener("click", () => {
      product = product.filter((item) => item !== p);
      renderTable();
      localStorage.setItem("Product", JSON.stringify(product));
    });

    tr.appendChild(tdid);
    tr.appendChild(tdname);
    tr.appendChild(tdprice);
    tr.appendChild(tddel);

    tbody.appendChild(tr);
  });

  count = product.length + 1;
}
