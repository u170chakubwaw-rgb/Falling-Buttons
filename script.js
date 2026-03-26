const button = document.querySelector(`#gameButton`);
const scoreDisplay = document.querySelector(`#score`);
const timeDisplay = document.querySelector(`#time`);
const uiBox = document.querySelector(`#ui`);
const allParagraphs = document.querySelectorAll(`p`);

let score = 0;
let isGameActive = false;
let timerInterval;
let startTime;

function moveButton() {
  //math random
  button.style.left =
    Math.random() /*losuje liczbe od 0 do 1 */ * (window.innerWidth - 150) +
    `px`;
  button.style.top = Math.random() * (window.innerHeight - 150) + `px`; //button nie wyleci przez inner width/heigth
  button.style.transform = `none`;
}

function updateTimer() {
  // date calsass
  const timePassed = (new Date() - startTime) / 1000;
  timeDisplay.innerText = `Time: ` + timePassed.toFixed(2) + `s`;
}

function finishGame() {
  isGameActive = false;
  clearInterval(timerInterval);
  uiBox.classList.add(`game-over-ui`);
  button.style.pointerEvents = `none`; // nie da sie kliknac przycisku
}

// 4. event listener
button.addEventListener(`click`, function (event) {
  if (event.target.id === `gameButton`) {
    if (score === 0) {
      isGameActive = true;
      startTime = new Date();
      timerInterval = setInterval(updateTimer, 10);
    }
    score++;
    scoreDisplay.innerText = `Score: ` + score;
    if (score < 10) moveButton();
    else finishGame();
  }
});

window.addEventListener(`keydown`, function (event) {
  if (event.key.toLowerCase() === `r`) location.reload(); // resecik
});

window.addEventListener(`resize`, function () {
  if (!isGameActive) button.style.top = `50%`;
});

// eventpreventdeault
window.addEventListener(`contextmenu`, function (e) {
  e.preventDefault();
});
