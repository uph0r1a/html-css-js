const product_form = document.getElementById("form");
const list = document.getElementById("list");
const product_name = document.getElementById("product_name");
const product_price = document.getElementById("product_price");

product_form.addEventListener("submit", (e) => {
  e.preventDefault();

  const product_name_input = product_name.value.trim();
  const product_price_input = Number(product_price.value);

  if (!product_name_input || product_price_input <= 0) {
    alert("Name must not be empty and price must be higher than 0");
    return;
  }

  const li = document.createElement("li");
  li.innerHTML = `
        <strong>${product_name_input}</strong> - 
        <span>${product_price_input}</span>
    `;

  list.appendChild(li);

  product_name.value = "";
  product_price.value = "";
});
