let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0,
}

updateScoreElement();

let isAutoPlaying = false;
let intervalId;

document.querySelector('.js-auto-play-button').addEventListener('click', () => {
  autoPlay();
});
document.body.addEventListener('keydown', (event) => {
  if(event.key === 'a'){
    autoPlay();
  } else if(event.key === 'r'){
    playGame('Rock');
  } else if(event.key === 'p'){
    playGame('Paper');
  } else if (event.key === 's'){
    playGame('Scissors');
  } else if(event.key === 'Backspace'){
    showConfirmationMessage();
  }
});

function autoPlay(){ 
  if(!isAutoPlaying){
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
    document.querySelector('.js-auto-play-button').innerHTML = 'Stop Play';
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    document.querySelector('.js-auto-play-button').innerHTML = 'Auto Play';
  }
}

document.querySelector('.js-rock-button').addEventListener('click', () => {
  playGame('Rock');
});
document.querySelector('.js-paper-button').addEventListener('click', () => {
  playGame('Paper');
});
document.querySelector('.js-scissors-button').addEventListener('click', () => {
  playGame('Scissors');
});

function playGame(playerMove){
const computerMove = pickComputerMove();
let result = '';
if(playerMove == 'Rock'){
  if(computerMove === 'Rock'){
    result = 'Tie.';
  }
  else if(computerMove === 'Paper'){
    result = 'You lose.';
  }
  else if(computerMove === 'Scissors'){
    result = 'You win.';
  }

} else if(playerMove === 'Paper'){
  if(computerMove === 'Rock'){
  result = 'You win.';
  }
  else if(computerMove === 'Paper'){
    result = 'Tie.';
  }
  else if(computerMove === 'Scissors'){
    result = 'You lose.';
  }

} else if(playerMove === 'Scissors'){
  if(computerMove === 'Rock'){
  result = 'You lose.';
  }
  else if(computerMove === 'Paper'){
    result = 'You win.';
  }
  else if(computerMove === 'Scissors'){
    result = 'Tie.';
  }
}

if(result === 'You win.'){
  score.wins += 1;
} 
else if(result === 'You lose.'){
  score.losses += 1;
} 
else if(result === 'Tie.'){
  score.ties += 1;
}

localStorage.setItem('score', JSON.stringify(score));

updateScoreElement();

document.querySelector('.js-result').innerHTML = result;
document.querySelector('.js-moves').innerHTML = `You <img class="move-icon" src="images/${playerMove}-emoji.png"><img class="move-icon" src="images/${computerMove}-emoji.png"> Computer`;
}

function updateScoreElement(){
document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Tie: ${score.ties}`
}

function pickComputerMove(){
const randomNumber = Math.random();
let computerMove = '';
if(randomNumber >=0 && randomNumber < 1/3){
  computerMove = 'Rock';
}
else if (randomNumber >= 1/3 && randomNumber < 2/3){
  computerMove = 'Paper';
}
else if (randomNumber >= 2/3 && randomNumber < 1){
  computerMove = 'Scissors';
}
return computerMove;
}

document.querySelector('.js-reset-button').addEventListener('click', () => showConfirmationMessage());

function showConfirmationMessage(){
  document.querySelector('.js-confirmation-message').innerHTML = `Are you sure you want to reset the score
  <button class="reset-confirm-button js-reset-yes-button">Yes</button>
  <button class="reset-confirm-button js-reset-no-button">No</button>`;

document.querySelector('.js-reset-yes-button').addEventListener('click', () => {
  resetAll();
  hideResetConfirmation();
});
document.querySelector('.js-reset-no-button').addEventListener('click', () => {
  hideResetConfirmation();
});
}

function hideResetConfirmation(){
  document.querySelector('.js-confirmation-message').innerHTML = '';
}

function resetAll(){
 score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
}

