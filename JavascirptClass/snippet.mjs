let timeOut = (callback) => {
  setTimeout(function () {
    console.log("I am still learning");
    callback();
  }, 5000);
};

function readToConsole() {
  console.log("I am waiting for the first one to finish");
}

timeOut(readToConsole);
