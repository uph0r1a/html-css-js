const diceEls = document.querySelectorAll(".die");
const scoreInputs = document.querySelectorAll("#score-options input");
const scoreSpans = document.querySelectorAll("#score-options span");
const roundEl = document.getElementById("current-round");
const rollsEl = document.getElementById("current-round-rolls");
const totalScoreEl = document.getElementById("total-score");
const scoreHistoryEl = document.getElementById("score-history");
const rollDiceBtn = document.getElementById("roll-dice-btn");
const keepScoreBtn = document.getElementById("keep-score-btn");
const rulesContainer = document.querySelector(".rules-container");
const rulesBtn = document.getElementById("rules-btn");

let diceValues = [0, 0, 0, 0, 0];
let round = 1;
let rolls = 0;
let totalScore = 0;
let isRulesVisible = false;

const rollDice = () => {
  diceValues = Array.from(
    { length: 5 },
    () => Math.floor(Math.random() * 6) + 1
  );
  diceEls.forEach((die, i) => (die.textContent = diceValues[i]));
};

const updateStats = () => {
  rollsEl.textContent = rolls;
  roundEl.textContent = round;
};

const resetRadioOptions = () => {
  scoreInputs.forEach((input) => {
    input.disabled = true;
    input.checked = false;
  });
  scoreSpans.forEach((span) => (span.textContent = ""));
};

const updateRadioOption = (index, score) => {
  scoreInputs[index].disabled = false;
  scoreInputs[index].value = score;
  scoreSpans[index].textContent = `, score = ${score}`;
};

const getCounts = (arr) => {
  const counts = {};
  arr.forEach((n) => (counts[n] = (counts[n] || 0) + 1));
  return counts;
};

const detectDuplicates = (arr) => {
  const counts = getCounts(arr);
  const sum = arr.reduce((a, b) => a + b, 0);
  const maxCount = Math.max(...Object.values(counts));

  if (maxCount >= 4) updateRadioOption(1, sum);
  if (maxCount >= 3) updateRadioOption(0, sum);
};

const detectFullHouse = (arr) => {
  const counts = Object.values(getCounts(arr));
  if (counts.includes(3) && counts.includes(2)) updateRadioOption(2, 25);
};

const detectStraights = (arr) => {
  const uniqueSorted = [...new Set(arr)].sort((a, b) => a - b).join("");
  const smallStraights = ["1234", "2345", "3456"];
  const largeStraights = ["12345", "23456"];

  if (smallStraights.some((st) => uniqueSorted.includes(st)))
    updateRadioOption(3, 30);
  if (largeStraights.includes(uniqueSorted)) updateRadioOption(4, 40);
};

const addScore = (value, label) => {
  totalScore += parseInt(value);
  totalScoreEl.textContent = totalScore;
  scoreHistoryEl.innerHTML += `<li>${label} : ${value}</li>`;
};

const resetGame = () => {
  diceValues = [0, 0, 0, 0, 0];
  totalScore = 0;
  round = 1;
  rolls = 0;

  diceEls.forEach((die, i) => (die.textContent = diceValues[i]));
  totalScoreEl.textContent = totalScore;
  scoreHistoryEl.innerHTML = "";
  updateStats();
  resetRadioOptions();
};

rollDiceBtn.addEventListener("click", () => {
  if (rolls >= 3) {
    alert("You have made three rolls this round. Please select a score.");
    return;
  }

  rolls++;
  resetRadioOptions();
  rollDice();
  updateStats();

  detectDuplicates(diceValues);
  detectFullHouse(diceValues);
  detectStraights(diceValues);

  updateRadioOption(5, 0);
});

keepScoreBtn.addEventListener("click", () => {
  const selectedOption = Array.from(scoreInputs).find((input) => input.checked);

  if (!selectedOption) {
    alert("Please select an option or roll the dice.");
    return;
  }

  addScore(selectedOption.value, selectedOption.id);

  rolls = 0;
  round++;
  updateStats();
  resetRadioOptions();

  if (round > 6) {
    setTimeout(() => {
      alert(`Game Over! Your total score is ${totalScore}`);
      resetGame();
    }, 500);
  }
});

rulesBtn.addEventListener("click", () => {
  isRulesVisible = !isRulesVisible;
  rulesContainer.style.display = isRulesVisible ? "block" : "none";
  rulesBtn.textContent = isRulesVisible ? "Hide rules" : "Show rules";
});

resetGame();
