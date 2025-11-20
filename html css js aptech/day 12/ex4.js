let products = [
  { name: "iPhone", price: 1000 },
  { name: "Laptop", price: 1500 },
  { name: "Mouse", price: 50 },
];

products.forEach((p) => console.log(p.name));

products.push({ name: "Keyboard", price: 100 });
console.log("Danh sách sản phẩm sau khi thêm:", products);

const over1000 = products.filter((p) => p.price > 1000);
console.log("Sản phẩm có giá > 1000:", over1000);
