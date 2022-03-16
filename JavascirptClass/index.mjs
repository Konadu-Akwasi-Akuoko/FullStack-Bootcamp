let arr = [99, 45, 75];
let iterator = arr[Symbol.iterator]();
for (let result = iterator.next(); !result.done; result = iterator.next()) {
  console.log(result.value);
}
``