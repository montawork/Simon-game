const buttonColours = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let startGame = false;

$('.btn').on('click', function () {
  let userChosenColour = $(this).attr('id');
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress($(this));

  checkAnswer(userClickedPattern.length - 1);

  console.log(userClickedPattern);
});

function nextSequence() {
  userClickedPattern = [];

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  let btns = $(`#${randomChosenColour}`);
  btns.fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  level++;
  $('h1').text(`Level ${level}`);
}
// nextSequence();

function playSound(name) {
  let colorAudio = new Audio(`sounds/${name}.mp3`);
  colorAudio.play();
}

function animatePress(currentColour) {
  currentColour.addClass('pressed');
  setTimeout(() => {
    currentColour.removeClass('pressed');
  }, 100);
}

$(document).on('keypress', function () {
  if (!startGame) {
    $('h1').text(`Level ${level}`);
    nextSequence();
    startGame = true;
  }
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
    if (gamePattern.length == userClickedPattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound('wrong');
    $('body').addClass('game-over');
    setTimeout(() => {
      $('body').removeClass('game-over');
    }, 200);
    $('h1').text('Game Over, Press Any Key to Restart');
    startOver();
  }
}

function startOver() {
  startGame = false;
  level = 0;
  gamePattern = [];
}
