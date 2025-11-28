let price = 3.26;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];

const displayChangeDue = document.getElementById("change-due");
const cash = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const priceScreen = document.getElementById("price-screen");
const cashDrawerDisplay = document.getElementById("cash-drawer-display");

const formatResults = (status, change) => {
  displayChangeDue.innerHTML = `<p>Status: ${status}</p>`;
  displayChangeDue.innerHTML += change
    .map(([name, amt]) => `<p>${name}: $${amt}</p>`)
    .join("");
};

const checkCashRegister = () => {
  const cashInCents = Math.round(Number(cash.value) * 100);
  const priceInCents = Math.round(price * 100);

  if (cashInCents < priceInCents) {
    alert("Customer does not have enough money");
    cash.value = "";
    return;
  }

  if (cashInCents === priceInCents) {
    displayChangeDue.innerHTML =
      "<p>No change due - customer paid with exact cash</p>";
    cash.value = "";
    return;
  }

  let changeDue = cashInCents - priceInCents;
  const reversedCid = [...cid]
    .reverse()
    .map(([name, amount]) => [name, Math.round(amount * 100)]);
  const denominations = [10000, 2000, 1000, 500, 100, 25, 10, 5, 1];
  const result = { status: "OPEN", change: [] };
  const totalCID = reversedCid.reduce((sum, [, amt]) => sum + amt, 0);

  if (totalCID < changeDue) {
    displayChangeDue.innerHTML = "<p>Status: INSUFFICIENT_FUNDS</p>";
    return;
  }

  if (totalCID === changeDue) {
    result.status = "CLOSED";
    formatResults("CLOSED", cid);
    updateUI(cid);
    return;
  }

  for (let i = 0; i < reversedCid.length; i++) {
    const [name, total] = reversedCid[i];
    const denomValue = denominations[i];

    if (changeDue >= denomValue) {
      let amountToReturn = 0;
      let remainingDrawerAmt = total;

      while (remainingDrawerAmt > 0 && changeDue >= denomValue) {
        amountToReturn += denomValue;
        remainingDrawerAmt -= denomValue;
        changeDue -= denomValue;
      }

      if (amountToReturn > 0) {
        result.change.push([name, amountToReturn / 100]);
      }
    }
  }

  if (changeDue > 0) {
    displayChangeDue.innerHTML = "<p>Status: INSUFFICIENT_FUNDS</p>";
    return;
  }

  formatResults("OPEN", result.change);
  updateUI(result.change);
};

const checkResults = () => {
  if (!cash.value) return;
  checkCashRegister();
};

const updateUI = (change) => {
  const names = {
    PENNY: "Pennies",
    NICKEL: "Nickels",
    DIME: "Dimes",
    QUARTER: "Quarters",
    ONE: "Ones",
    FIVE: "Fives",
    TEN: "Tens",
    TWENTY: "Twenties",
    "ONE HUNDRED": "Hundreds",
  };

  if (change) {
    change.forEach(([name, amt]) => {
      const target = cid.find((d) => d[0] === name);
      target[1] = (Math.round(target[1] * 100) - Math.round(amt * 100)) / 100;
    });
  }

  cash.value = "";
  priceScreen.textContent = `Total: $${price}`;
  cashDrawerDisplay.innerHTML =
    `<p><strong>Change in drawer:</strong></p>` +
    cid.map(([name, amt]) => `<p>${names[name]}: $${amt}</p>`).join("");
};

purchaseBtn.addEventListener("click", checkResults);
cash.addEventListener("keydown", (e) => {
  if (e.key === "Enter") checkResults();
});

updateUI();
