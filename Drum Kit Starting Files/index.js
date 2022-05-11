let buttons = document.querySelectorAll(".drum");

function handleClick(button) {
  switch (button.textContent) {
    case "a":
      let kick_bass = new Audio("/sounds/kick-bass.mp3");
      kick_bass.play();
      break;
    case "s":
      let snare = new Audio("/sounds/snare.mp3");
      snare.play();
      break;
    case "d":
      let tom_1 = new Audio("/sounds/tom-1.mp3");
      tom_1.play();
      break;
    case "j":
      let tom_2 = new Audio("/sounds/tom-2.mp3");
      tom_2.play();
      break;
    case "k":
      let tom_3 = new Audio("/sounds/tom-3.mp3");
      tom_3.play();
      break;
    case "l":
      let tom_4 = new Audio("/sounds/tom-4.mp3");
      tom_4.play();
      break;
    case "w":
      let crash = new Audio("/sounds/crash.mp3");
      crash.play();
      break;
    default:
      console.log("not a drum key.");
  }
}

function handleKeyDown(e) {
  switch (e.key) {
    case "a":
      let kick_bass = new Audio("/sounds/kick-bass.mp3");
      kick_bass.play();
      break;
    case "s":
      let snare = new Audio("/sounds/snare.mp3");
      snare.play();
      break;
    case "d":
      let tom_1 = new Audio("/sounds/tom-1.mp3");
      tom_1.play();
      break;
    case "j":
      let tom_2 = new Audio("/sounds/tom-2.mp3");
      tom_2.play();
      break;
    case "k":
      let tom_3 = new Audio("/sounds/tom-3.mp3");
      tom_3.play();
      break;
    case "l":
      let tom_4 = new Audio("/sounds/tom-4.mp3");
      tom_4.play();
      break;
    case "w":
      let crash = new Audio("/sounds/crash.mp3");
      crash.play();
      break;
    default:
      console.log("not a drum key.");
  }
}

function buttonAnimation(currentKey) {
  let activeButton = document.querySelector("." + currentKey);
  activeButton.classList.add("pressed");
  setTimeout(() => {
    activeButton.classList.remove("pressed");
  }, 100);
}

buttons.forEach((button) => {
  button.addEventListener("click", function () {
    handleClick(button);
    buttonAnimation(button.textContent);
  });
});

buttons.forEach((button) => {
  button.addEventListener(
    "keydown",
    (e) => {
      handleKeyDown(e);
      //Handle error when the key is not a drum key and thus have no corresponding textContent
      try {
        buttonAnimation(e.key);
      } catch (e) {
        console.log(e);
      }
    },
    true
  );
});
