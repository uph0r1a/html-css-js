const playerScoreEl = document.getElementById("player-score");
const computerScoreEl = document.getElementById("computer-score");
const resultsMsgEl = document.getElementById("results-msg");
const winnerMsgEl = document.getElementById("winner-msg");
const resetBtn = document.getElementById("reset-game-btn");
const optionButtons = document.querySelectorAll(".btn-container .btn");

let playerScore = 0;
let computerScore = 0;
const winningScore = 3;

const choices = ["Rock", "Paper", "Scissors"];

const getComputerChoice = () =>
  choices[Math.floor(Math.random() * choices.length)];

const playRound = (playerChoice) => {
  const computerChoice = getComputerChoice();

  if (playerChoice === computerChoice) {
    resultsMsgEl.textContent = `Both chose ${playerChoice}. It's a tie!`;
    return;
  }

  const winningConditions = {
    Rock: "Scissors",
    Paper: "Rock",
    Scissors: "Paper",
  };

  if (winningConditions[playerChoice] === computerChoice) {
    playerScore++;
    resultsMsgEl.textContent = `You win this round! ${playerChoice} beats ${computerChoice}.`;
  } else {
    computerScore++;
    resultsMsgEl.textContent = `Computer wins this round! ${computerChoice} beats ${playerChoice}.`;
  }

  updateScores();
  checkWinner();
};

const updateScores = () => {
  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;
};

const checkWinner = () => {
  if (playerScore === winningScore) {
    winnerMsgEl.textContent = "🎉 You won the game!";
    endGame();
  } else if (computerScore === winningScore) {
    winnerMsgEl.textContent = "💻 Computer won the game!";
    endGame();
  }
};

const endGame = () => {
  optionButtons.forEach((btn) => (btn.disabled = true));
  resetBtn.style.display = "inline-block";
};

const resetGame = () => {
  playerScore = 0;
  computerScore = 0;
  updateScores();
  resultsMsgEl.textContent = "";
  winnerMsgEl.textContent = "";
  optionButtons.forEach((btn) => (btn.disabled = false));
  resetBtn.style.display = "none";
};

optionButtons.forEach((btn) => {
  btn.addEventListener("click", () => playRound(btn.textContent));
});

resetBtn.addEventListener("click", resetGame);
