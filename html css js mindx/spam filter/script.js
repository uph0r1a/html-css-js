const messageInput = document.getElementById("message-input");
const result = document.getElementById("result");
const checkMessageButton = document.getElementById("check-message-btn");

const denyList = [
  /please help|assist me/i,
  /\b\d+\s*(hundred|thousand|million|billion)?\s+dollars\b/i,
  /\bfree money\b/i,
  /\bstock alert\b/i,
  /\bdear friend\b/i,
];

const isSpam = (msg) => denyList.some((regex) => regex.test(msg.trim()));

checkMessageButton.addEventListener("click", () => {
  const message = messageInput.value.trim();

  if (!message) {
    alert("Please enter a message.");
    return;
  }

  result.textContent = isSpam(message)
    ? "Oh no! This looks like a spam message."
    : "This message does not seem to contain any spam.";

  messageInput.value = "";
});
