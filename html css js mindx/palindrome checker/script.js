const userInput = document.getElementById("text-input");
const checkPalindromeBtn = document.getElementById("check-btn");
const resultDiv = document.getElementById("result");

const checkForPalindrome = (input) => {
  const trimmedInput = input.trim();
  resultDiv.replaceChildren();

  if (!trimmedInput) {
    resultDiv.textContent = "Please enter a value.";
    resultDiv.style.color = "red";
    resultDiv.classList.remove("hidden");
    return;
  }

  const cleanStr = trimmedInput.replace(/[^A-Za-z0-9]/gi, "").toLowerCase();
  const isPalindrome = cleanStr === [...cleanStr].reverse().join("");

  const pTag = document.createElement("p");
  pTag.className = "user-input";
  pTag.innerText = `"${trimmedInput}" ${
    isPalindrome ? "is" : "is not"
  } a palindrome.`;
  pTag.style.color = isPalindrome ? "green" : "red";

  resultDiv.appendChild(pTag);
  resultDiv.classList.remove("hidden");
};

checkPalindromeBtn.addEventListener("click", () => {
  checkForPalindrome(userInput.value);
  userInput.value = "";
});

userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkForPalindrome(userInput.value);
    userInput.value = "";
  }
});
