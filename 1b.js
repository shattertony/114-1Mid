
const products = [
  { name: "keyboard", stock: 25 },
  { name: "mouse", stock: 5 },
  { name: "monitor", stock: 8 },
  { name: "usb cable", stock: 40 }
];


function getLowStock(products) {
  
  const lowList = products
    .filter(p => p.stock < 10)
    .map(p => p.name);

 
  console.log("庫存少於 10 的項目：", JSON.stringify(lowList));

 
  return lowList;
}


function updateStock(products, updates) {
  
  const pairs = updates.split(","); // ["mouse: 15", " monitor: 20"]

  pairs.forEach(item => {
    const [namePart, stockPart] = item.split(":");
    const name = namePart.trim();          // "mouse"
    const newStock = Number(stockPart.trim()); // 15

    
    const product = products.find(p => p.name === name);
    if (product) {
      product.stock = newStock;
    }
  });

  
  products.forEach(p => {
    console.log(`${p.name} ： ${p.stock}`);
  });
}


getLowStock(products);


const updates = "mouse: 15, monitor: 20";


updateStock(products, updates);

