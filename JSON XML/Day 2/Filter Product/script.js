let originalData = []
let currentData = []
let isAscending = true

function renderTable(products) {
    const tbody = document.querySelector("#productTable tbody");
    tbody.innerHTML = "";

    products.forEach(item => {
        tbody.innerHTML += `
            <tr>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.category}</td>
                <td>${item.price}</td>
            </tr>
        `;
    });
}

function sortByPrice() {
    currentData.sort((a, b) => {
        const priceA = parseFloat(a.price.replace("$", ""))
        const priceB = parseFloat(b.price.replace("$", ""))
        return isAscending ? priceA - priceB : priceB - priceA
    })

    const btn = document.getElementById("sortBtn");
    btn.textContent = "Sort by Price " + (isAscending ? "(Descending)" : "(Ascending)")

    isAscending = !isAscending;
    renderTable(currentData)
}

function filterByCategory() {
    const value = document.getElementById("categoryFilter").value

    if (value === "All") {
        currentData = [...originalData];
    } else {
        currentData = originalData.filter(item => item.category === value)
    }

    renderTable(currentData)
}

document.getElementById("sortBtn").addEventListener("click", sortByPrice)
document.getElementById("categoryFilter").addEventListener("change", filterByCategory)

fetch("products.json").then(res => res.json()).then(data => {
    originalData = data.products
    currentData = [...originalData];
    renderTable(currentData)
}).catch(err => {
    console.error(err);
    alert("Please run with Live Server")
})