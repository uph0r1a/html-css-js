const form = document.getElementById("product-form");
const nameInput = document.getElementById("name");
const priceInput = document.getElementById("price");
const amountInput = document.getElementById("amount");
const descriptionInput = document.getElementById("description");
const submitBtn = document.getElementById("submitBtn");
const tbody = document.getElementById("product-tbody");
const searchInput = document.getElementById("search");
const totalValueDiv = document.getElementById("totalValue");

let products = JSON.parse(localStorage.getItem("products")) || [];
let editingId = null;

function renderProducts(filter = "") {
  tbody.innerHTML = "";
  let total = 0;
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  );

  filteredProducts.forEach((product, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.amount}</td>
            <td>${product.description}</td>
            <td>
                <button class="edit-btn" data-id="${product.id}">Sửa</button>
                <button class="delete-btn" data-id="${product.id}">Xóa</button>
            </td>
        `;
    tbody.appendChild(tr);

    total += Number(product.price) * Number(product.amount);

    tr.querySelector(".edit-btn").addEventListener("click", () => {
      nameInput.value = product.name;
      priceInput.value = product.price;
      amountInput.value = product.amount;
      descriptionInput.value = product.description;
      submitBtn.textContent = "Cập nhật";
      editingId = product.id;
    });

    tr.querySelector(".delete-btn").addEventListener("click", () => {
      products = products.filter((p) => p.id !== product.id);
      saveAndRender();
    });
  });

  totalValueDiv.textContent = "Tổng giá trị tồn kho: " + total;
}

function saveAndRender() {
  localStorage.setItem("products", JSON.stringify(products));
  renderProducts(searchInput.value);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const price = Number(priceInput.value);
  const amount = Number(amountInput.value);
  const description = descriptionInput.value.trim();

  if (!name || price < 0 || amount < 0) return;

  if (editingId) {
    const product = products.find((p) => p.id === editingId);
    product.name = name;
    product.price = price;
    product.amount = amount;
    product.description = description;
    editingId = null;
    submitBtn.textContent = "Thêm";
  } else {
    products.push({ id: Date.now(), name, price, amount, description });
  }

  form.reset();
  saveAndRender();
});

searchInput.addEventListener("input", () => {
  renderProducts(searchInput.value);
});

renderProducts();
