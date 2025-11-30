const userInput = document.getElementById("user-input");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const resultsDiv = document.getElementById("results-div");

const checkValidNumber = (input) => {
  const trimmedInput = input.trim();
  if (!trimmedInput) {
    alert("Please provide a phone number");
    return;
  }

  const phoneRegex =
    /^(1\s?)?(\([0-9]{3}\)|[0-9]{3})[\s\-]?[0-9]{3}[\s\-]?[0-9]{4}$/;

  const isValid = phoneRegex.test(trimmedInput);

  const pTag = document.createElement("p");
  pTag.className = "results-text";
  pTag.style.color = isValid ? "#00471b" : "#4d3800";
  pTag.textContent = `${
    isValid ? "Valid" : "Invalid"
  } US number: ${trimmedInput}`;

  resultsDiv.prepend(pTag);
};

checkBtn.addEventListener("click", () => {
  checkValidNumber(userInput.value);
  userInput.value = "";
});

userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkValidNumber(userInput.value);
    userInput.value = "";
  }
});

clearBtn.addEventListener("click", () => {
  resultsDiv.textContent = "";
});
