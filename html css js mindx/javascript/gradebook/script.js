function getAverage(scores) {
  if (!scores.length) return 0;
  return scores.reduce((sum, s) => sum + s, 0) / scores.length;
}

function getGrade(score) {
  if (score === 100) return "A++";
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}

function hasPassingGrade(score) {
  return getGrade(score) !== "F";
}

function studentMsg(totalScores, studentScore) {
  const avg = getAverage(totalScores);
  const grade = getGrade(studentScore);
  const passed = hasPassingGrade(studentScore);

  return `Class average: ${avg}. Your grade: ${grade}. You ${
    passed ? "passed" : "failed"
  } the course.`;
}

console.log(studentMsg([92, 88, 12, 77, 57, 100, 67, 38, 97, 89], 37));
