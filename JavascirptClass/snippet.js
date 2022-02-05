let object1 = {
  childObject1: function function1() {
    console.log("I am child1 of object1");
  },
};

let object2 = {
  childObject1: true,
  childObject1: true,
  childObject1: true,
  childObject1: false,
};

object1.childObject1();
console.log(object1.childObject1.toString());
console.log(Boolean(object1.childObject1));
console.log(
  (Number(object2.childObject1) + Number(object2.childObject1)) * 10e100
);

console.log(Date.now().toString());
