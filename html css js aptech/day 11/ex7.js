const array = [
  { name: "An", age: 20 },
  { name: "Bình", age: 21 },
  { name: "Châu", age: 20 },
  { name: "Dũng", age: 22 },
];

const groupedByAge = array.reduce((acc, student) => {
  if (!acc[student.age]) {
    acc[student.age] = [];
  }
  acc[student.age].push(student.name);
  return acc;
}, {});

console.log(groupedByAge);
