const tableBody = document.querySelector("#userTable tbody");
const userDetail = document.getElementById("userDetail");

fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((users) => {
    users.forEach((user) => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
          <td>${user.id}</td>
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td><button data-id="${user.id}">Xem chi tiết</button></td>
        `;

      tableBody.appendChild(tr);
    });

    tableBody.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => {
        const userId = btn.dataset.id;
        fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
          .then((res) => res.json())
          .then((user) => {
            userDetail.innerHTML = `
                <h3>Chi tiết người dùng: ${user.name}</h3>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Phone:</strong> ${user.phone}</p>
                <p><strong>Website:</strong> ${user.website}</p>
                <p><strong>Địa chỉ:</strong> ${user.address.street}, ${user.address.city}</p>
                <p><strong>Công ty:</strong> ${user.company.name}</p>
              `;
          });
      });
    });
  })
  .catch((err) => console.error("Lỗi:", err));
