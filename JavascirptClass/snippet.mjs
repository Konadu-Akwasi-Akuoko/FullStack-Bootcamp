// const square = require("./index");

// // let Square = square.Square;

// class sq extends square.Square {
//   constructor(...args) {
//     super(...args);
//   }
// }

import { Square } from "./index.mjs";
let sq = Square;
let square2 = new sq(2, 2);

console.log(square2.area());
