let student = {
  info: {
    name: "Tri",
    age: 18,
  },
  grades: {
    math: 10,
    english: 9.5,
  },
};

console.log("Điểm toán:", student.grades.math);

student.info.name = "Thai Duc Tri";

student.info.address = "Ha Noi";

let newStudent = JSON.parse(JSON.stringify(student));

newStudent.info.name = "LMCSML";

console.log("Student cũ:", student);
console.log("Student mới:", newStudent);
