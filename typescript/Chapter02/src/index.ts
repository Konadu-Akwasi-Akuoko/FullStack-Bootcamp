import { type } from "os";

let a: {
  b: number;
  a: string;
  c(): string;
  [seatNumber: number]: number;
} = {
  a: "I am a boy",
  b: 24,
  c: () => `${a.b} and ${a.a}`,
  23: 432,
  45: 34,
};

function c(): string {
  return "Hello, world!";
}

let func: () => string = () => {
  return "Wow, this is also another string type";
};
//Creating classes in TypeScript
class Car {
  constructor(public modelName: string, public carYear: number) {}

  getMakeAndYear(): string {
    return `The model name of the car is ${this.modelName} and the year is ${this.carYear}`;
  }
}

let Toyota: Car = new Car("Toyota Camry", 2021);

console.log(Toyota.getMakeAndYear());

//Type aliases
type Age = number;
type Name = string;

let myAge: Age | Name = 745;

let returnNum: () => { age: Age | Name } = () => {
  return { age: myAge };
};
