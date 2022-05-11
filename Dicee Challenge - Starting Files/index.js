let image1 = document.querySelector(".img1");
let image2 = document.querySelector(".img2");
let textOfResult = document.querySelector(".text-results");

//A function that sets a random number and returns it
let maximumNum = 7; //Exclusive
let minimumNum = 1; //Inclusive
let randomNumber1;
let randomNumber2;

function getRandomNumber() {
  return Math.floor(Math.random() * (maximumNum - minimumNum) + minimumNum);
}

randomNumber1 = getRandomNumber();
randomNumber2 = getRandomNumber();

//Set the image of image 1 and 2 to the random dice based on the random number
image1.src = `images/dice${randomNumber1}.png`;
image2.src = `images/dice${randomNumber2}.png`;

if (randomNumber1 > randomNumber2) {
  textOfResult.textContent = "Player 1 Wins!";
} else if (randomNumber1 < randomNumber2) {
  textOfResult.textContent = "Player 2 Wins!";
} else {
  textOfResult.textContent = "Draw!";
}
