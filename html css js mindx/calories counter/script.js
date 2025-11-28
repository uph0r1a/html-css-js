const form = document.getElementById("calorie-counter");
const budgetInput = document.getElementById("budget");
const entryDropdown = document.getElementById("entry-dropdown");
const addEntryBtn = document.getElementById("add-entry");
const clearBtn = document.getElementById("clear");
const output = document.getElementById("output");

let hasError = false;

function cleanNumber(str) {
  return str.replace(/[+\-\s]/g, "");
}

function isScientific(str) {
  return /\d+e\d+/i.test(str);
}

function getCaloriesFrom(list) {
  let total = 0;

  for (const input of list) {
    const raw = cleanNumber(input.value);

    if (isScientific(raw)) {
      alert(`Invalid Input: ${raw}`);
      hasError = true;
      return 0;
    }

    if (raw !== "" && isNaN(raw)) {
      alert(`Invalid number format: ${input.value}`);
      hasError = true;
      return 0;
    }

    total += Number(raw);
  }

  return total;
}

function addEntry() {
  const sectionId = entryDropdown.value;
  const container = document.querySelector(`#${sectionId} .input-container`);

  const entryCount =
    container.querySelectorAll("input[type='number']").length + 1;

  const newEntry = `
    <label>Entry ${entryCount} Name</label>
    <input type="text" placeholder="Name">

    <label>Entry ${entryCount} Calories</label>
    <input type="number" min="0" placeholder="Calories">
  `;

  container.insertAdjacentHTML("beforeend", newEntry);
}

function calculateCalories(e) {
  e.preventDefault();
  hasError = false;

  const categories = ["breakfast", "lunch", "dinner", "snacks", "exercise"];
  const totals = {};

  for (const category of categories) {
    const inputs = document.querySelectorAll(
      `#${category} input[type="number"]`
    );
    totals[category] = getCaloriesFrom(inputs);
  }

  const budgetCalories = getCaloriesFrom([budgetInput]);

  if (hasError) return;

  const consumed =
    totals.breakfast + totals.lunch + totals.dinner + totals.snacks;

  const burned = totals.exercise;
  const remaining = budgetCalories - consumed + burned;

  const status = remaining < 0 ? "Surplus" : "Deficit";

  output.innerHTML = `
    <span class="${status.toLowerCase()}">
      ${Math.abs(remaining)} Calorie ${status}
    </span>
    <hr>
    <p>${budgetCalories} Calories Budgeted</p>
    <p>${consumed} Calories Consumed</p>
    <p>${burned} Calories Burned</p>
  `;

  output.classList.remove("hide");
}

function clearForm() {
  document
    .querySelectorAll(".input-container")
    .forEach((c) => (c.innerHTML = ""));

  budgetInput.value = "";
  output.innerHTML = "";
  output.classList.add("hide");
}

addEntryBtn.addEventListener("click", addEntry);
form.addEventListener("submit", calculateCalories);
clearBtn.addEventListener("click", clearForm);
