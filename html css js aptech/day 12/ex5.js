let students = [
  { name: "Tri", score: 9 },
  { name: "rti", score: 10 },
  { name: "irt", score: 2 },
];

const topStudent = students.reduce(
  (max, s) => (s.score > max.score ? s : max),
  students[0]
);
console.log("Học sinh điểm cao nhất:", topStudent);

const passedStudents = students.filter((s) => s.score >= 5);
console.log("Học sinh đỗ:", passedStudents);

const hasFailing = students.some((s) => s.score < 3);
console.log("Có học sinh điểm dưới 3 không?", hasFailing);
