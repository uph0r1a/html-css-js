const form = document.getElementById("form");
const convertButton = document.getElementById("convert-btn");
const output = document.getElementById("output");
const numberInput = document.getElementById("number");

const ROMAN_MAP = [
  ["M", 1000],
  ["CM", 900],
  ["D", 500],
  ["CD", 400],
  ["C", 100],
  ["XC", 90],
  ["L", 50],
  ["XL", 40],
  ["X", 10],
  ["IX", 9],
  ["V", 5],
  ["IV", 4],
  ["I", 1],
];

const convertToRoman = (num) => {
  let result = "";
  for (const [roman, value] of ROMAN_MAP) {
    while (num >= value) {
      result += roman;
      num -= value;
    }
  }
  return result;
};

const validateInput = (inputValue) => {
  const num = parseInt(inputValue, 10);

  if (!inputValue || inputValue.includes("e") || inputValue.includes(".")) {
    return "Please enter a valid number.";
  }
  if (num < 1) {
    return "Please enter a number greater than or equal to 1.";
  }
  if (num > 3999) {
    return "Please enter a number less than or equal to 3999.";
  }
  return null;
};

const updateUI = () => {
  const inputValue = numberInput.value.trim();
  const error = validateInput(inputValue);

  output.classList.remove("hidden");
  output.classList.remove("alert");

  if (error) {
    output.innerText = error;
    output.classList.add("alert");
  } else {
    output.innerText = convertToRoman(parseInt(inputValue, 10));
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  updateUI();
});

convertButton.addEventListener("click", updateUI);
