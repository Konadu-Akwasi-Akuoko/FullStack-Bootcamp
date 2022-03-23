let p = new Promise((resolve, reject) => {
  let a = 1 + 3;
  if (a === 3) {
    resolve("Success");
  } else {
    reject("Failed");
  }
});

p.then(
  (message) => {
    console.log(message);
    return err;
  },
  (err) => {
    console.error(err);
    return err;
  }
).then(
  (returnValue) => {
    let a = [...returnValue];
    a.forEach((element) => {
      console.log(element);
    });
  },
  (returnValue) => {
    let b = [...returnValue];
    b.forEach((element) => {
      console.log(element);
    });
  }
);
