const elements = [
  { id: "name", color: "red" },
  { id: "dob", color: "green" },
  { id: "job", color: "blue" },
  { id: "future-job", color: "orange" },
];

elements.forEach((item) => {
  const el = document.getElementById(item.id);
  if (el) {
    el.style.color = item.color;
  }
});
