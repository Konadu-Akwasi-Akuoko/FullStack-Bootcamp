"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let a = {
    a: "I am a boy",
    b: 24,
    c: () => `${a.b} and ${a.a}`,
    23: 432,
    45: 34,
};
function c() {
    return "Hello, world!";
}
let func = () => {
    return "Wow, this is also another string type";
};
//Creating classes in TypeScript
class Car {
    constructor(modelName, carYear) {
        this.modelName = modelName;
        this.carYear = carYear;
    }
    getMakeAndYear() {
        return `The model name of the car is ${this.modelName} and the year is ${this.carYear}`;
    }
}
let Toyota = new Car("Toyota Camry", 2021);
console.log(Toyota.getMakeAndYear());
let myAge = 745;
let returnNum = () => {
    return { age: myAge };
};
//# sourceMappingURL=index.js.map