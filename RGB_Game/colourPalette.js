let paletteSize = 6;
let colours = [];
let chosenColour;
let displayColour = document.getElementById("chosenColour");
let palette = document.querySelectorAll(".paint");
let statusDisplay = document.querySelector(".status");
let h1 = document.querySelector("h1");
let resetButton = document.querySelector("#reset");
let modeButtons = document.querySelectorAll(".mode");

init();

resetButton.addEventListener("click", function(){
  reset();
})

function matchColours(colour) {
  for (let index = 0; index < palette.length; index++) {
    palette[index].style.backgroundColor = colour;
  }
}

function chooseColour() {
  let randomIndex = Math.floor(Math.random() * colours.length);
  return colours[randomIndex];
}

function generatePalette(num) {
  let arr = [];
  for (let index = 0; index < num; index++) {
    arr.push(randomColour());
  }
  return arr;
}

function randomColour() {
  let red = Math.floor(Math.random() * 256);
  let green = Math.floor(Math.random() * 256);
  let blue = Math.floor(Math.random() * 256);

  return `rgb(${red}, ${green}, ${blue})`;
}

function reset() {
  colours = generatePalette(paletteSize);
  chosenColour = chooseColour();
  displayColour.textContent = chosenColour;
  resetButton.textContent = "Regenerate";
  statusDisplay.textContent = "";
  for (let index = 0; index < palette.length; index++) {
    if (colours[index]) {
      palette[index].style.display = "block";
      palette[index].style.backgroundColor = colours[index];
    } else {
      palette[index].style.display = "none";
    }
  }
  h1.style.backgroundColor = "#85144b";
}

function init() {
  setupButtonMode();
  setupPalette();
  reset();
}

function setupButtonMode(){
  for (let index = 0; index < modeButtons.length; index++) {
    modeButtons[index].addEventListener("click", function () {
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      this.classList.add("selected");

      this.textContent === "Easy" ? paletteSize = 3 : paletteSize = 6;
      reset();
    });
  }
}

function setupPalette(){
  for (let index = 0; index < palette.length; index++) {
    palette[index].addEventListener("click", function () {
      let clickedColour = this.style.backgroundColor;
      if (clickedColour === chosenColour) {
        statusDisplay.textContent = "Correct!";
        matchColours(clickedColour);
        resetButton.textContent = "Play Again?";
        h1.style.backgroundColor = clickedColour;
        hover.style.backgroundColor = clickedColour;
      } else {
        this.style.backgroundColor = "#1d1d1d";
        statusDisplay.textContent = "Try Again";
      }
    })
  }
}