function fibonacciGenerator(n) {
  let firstNum;
  let secondNum;
  let arrOfFibonacci;

  for (let i = 1; i <= n; i++) {
    console.log("i: ", i);
    if (i === 1) {
      firstNum = 0;
      secondNum = 1;
      arrOfFibonacci = [firstNum];
      continue;
    } else if (i === 2) {
      arrOfFibonacci.push(secondNum);
      continue;
    }
    console.log(`First number: ${firstNum} and second number: ${secondNum}`);
    let nextNum = firstNum + secondNum;
    console.log(`nextNum: ${nextNum}`);
    arrOfFibonacci.push(nextNum);
    console.log(`arrOfFibonacci: ${arrOfFibonacci}`);
    firstNum = arrOfFibonacci[arrOfFibonacci.length - 2];
    secondNum = arrOfFibonacci[arrOfFibonacci.length - 1];
    console.log(
      `After changing first and second number: ${firstNum} and ${secondNum}`
    );
  }
  return arrOfFibonacci;
}

console.log(fibonacciGenerator(7));
