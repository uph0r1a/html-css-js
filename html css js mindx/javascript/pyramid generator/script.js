const char = "!";
const count = 10;
const inverted = false;

function padRow(row, max) {
  const spaces = " ".repeat(max - row);
  const symbols = char.repeat(row * 2 - 1);
  return spaces + symbols + spaces;
}

const rows = Array.from({ length: count }, (_, i) => {
  const rowNumber = inverted ? count - i : i + 1;
  return padRow(rowNumber, count);
});

console.log(rows.join("\n"));
