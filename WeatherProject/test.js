async function f(yourName) {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Your name is ${yourName}`);
    }, 3000);
  });
  let result = await promise;
  return result;
}

f("John").then((result) => {
  console.log(result);
});
