const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const roleInput = document.getElementById("role");
const registeredDateInput = document.getElementById("registeredDate");
const addbtn = document.getElementById("add");
const tbody = document.getElementById("tbody");

let account = [];

account = JSON.parse(localStorage.getItem("Account")) || [];

document.getElementById("form").addEventListener("submit",()=>{
    
})