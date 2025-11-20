let nums = [5, 3, 9, 1];

console.log("Mảng ban đầu:", nums);

nums.unshift(7);
console.log("Sau khi thêm 7 vào đầu:", nums);

nums.pop();
console.log("Sau khi xoá số cuối cùng:", nums);

nums.splice(1, 1);
console.log("Sau khi xoá phần tử index 1:", nums);
