function getGrade(score) {
  if (score < 0 || score > 100) {
    return "Điểm sai hãy nhập lại";
  } else if (score >= 85) {
    return "A";
  } else if (score >= 70) {
    return "B";
  } else if (score >= 50) {
    return "C";
  } else {
    return "D";
  }
}

let score = 50;
console.log(getGrade(score));
