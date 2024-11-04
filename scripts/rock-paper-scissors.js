
let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();

let isAutoPlaying = false;
let intervalId;

document.querySelector('.js-auto-play-button')
.addEventListener('click', () => {
  autoplay();
});

function autoplay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => { 
      //setInterval returns a number.
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
    document.querySelector('.js-auto-play-button')
     .innerHTML = 'Stop Playing'
  }
  else{
    document.querySelector('.js-auto-play-button')
     .innerHTML = 'Auto Play'
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('rock');
  });

document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('paper');
  });

document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    playGame('scissors');
  });

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r'){
    playGame('rock');
  }
  else if (event.key === 'p'){
    playGame('paper');
  }
  else if (event.key === 's'){
    playGame('scissors');
  }
  else if (event.key === 'a'){
    autoplay();
  }
  else if (event.key === 'Backspace'){
    resetScore();
  }
})

function playGame(playerMove) {

  const computerMove = pickComputerMove();

  let result = '';

  if(playerMove === 'scissors') {
    if (computerMove ==='scissors') {
    result = 'Tie.'
    }
    else if (computerMove ==='paper') {
      result = 'You Win.'
    }
    else if (computerMove ==='rock') {
      result = 'You Lose.'
    }
  }

  else if (playerMove === 'paper') {
    if (computerMove==='paper') {
      result = 'Tie.'
    }
    else if (computerMove==='rock') {
      result = 'You Win.'
    }
    else if (computerMove==='scissors') {
      result = 'You Lose.'
    }
  }
  
  else if (playerMove === 'rock') {
    if (computerMove==='rock') {
    result = 'Tie.'
    }
    else if (computerMove==='paper') {
      result = 'You Lose.'
    }
    else if (computerMove==='scissors') {
      result = 'You Win.'
    }
  }

  if(result === 'You Win.') {
    score.wins += 1;
  }
  else if(result === 'You Lose.') {
    score.losses += 1;
  }
  else if(result === 'Tie.') {
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result')
    .innerHTML = result;

  document.querySelector('.js-moves')
    .innerHTML = `You
      <img src="images/${playerMove}-emoji.png" class="move-icon">
      <img src="images/${computerMove}-emoji.png" class="move-icon">
      Computer`;

}

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
}

document.querySelector('.js-reset-score-button')
  .addEventListener('click', () => {
    displayConfirmation();
  });

function updateScoreElement(){
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;

  document.querySelector('.js-moves')
  .innerHTML = ` `;

  document.querySelector('.js-result')
    .innerHTML = ' ';

}

function displayConfirmation() {
  const message = document.querySelector('.js-confirmation');

  message.innerHTML = `
  Are you sure you want to reset the score?
  <button class = "js-yes-button"> Yes </button>
  <button class = "js-no-button"> No </button>
  `;

  document.querySelector('.js-yes-button')
    .addEventListener('click', () => {
      resetScore();
      hideResetConfirmation();
  });
  
  document.querySelector('.js-no-button')
    .addEventListener('click', () => {
      hideResetConfirmation();
  });

}

function hideResetConfirmation() {
  document.querySelector('.js-confirmation')
    .innerHTML = '';
}

function updatePlayerMoveElement() {
}

function pickComputerMove() {
  const randomNumber = (Math.random());

  let computerMove = '';
  
  if(randomNumber >= 0 && randomNumber < 1/3) {
    computerMove = 'rock';
  }

  else if(randomNumber >= 1/3 && randomNumber < 2/3) {
    computerMove = 'paper';
  }

  else if(randomNumber >= 2/3 && randomNumber < 1) {
    computerMove = 'scissors';
  }

  return computerMove;

}