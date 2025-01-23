document.addEventListener('DOMContentLoaded', () => {
  const cardArray = [
    { name: 'cheeseburger', img: 'images/cheeseburger.png' },
    { name: 'cheeseburger', img: 'images/cheeseburger.png' },
    { name: 'hotdog', img: 'images/hotdog.png' },
    { name: 'hotdog', img: 'images/hotdog.png' },
    { name: 'ice-cream', img: 'images/ice-cream.png' },
    { name: 'ice-cream', img: 'images/ice-cream.png' },
    { name: 'milkshake', img: 'images/milkshake.png' },
    { name: 'milkshake', img: 'images/milkshake.png' },
    { name: 'pizza', img: 'images/pizza.png' },
    { name: 'pizza', img: 'images/pizza.png' },
  ];

  cardArray.sort(() => 0.5 - Math.random());

  const grid = document.querySelector('#grid');
  const resultDisplay = document.querySelector('#score');
  const timerDisplay = document.querySelector('#timer');
  const playAgainButton = document.querySelector('#play-again');
  const startButton = document.querySelector('#start-game');
  const pauseButton = document.querySelector('#pause-game');
  const difficultySelect = document.querySelector('#difficulty');
  let cardsChosen = [];
  let cardsChosenIds = [];
  let cardsWon = [];
  let timer;
  let timeRemaining;

  // Create the game board
  function createBoard() {
      cardArray.forEach((_, i) => {
          const card = document.createElement('img');
          card.setAttribute('src', 'images/blank.png');
          card.setAttribute('data-id', i);
          card.addEventListener('click', flipCard);
          grid.appendChild(card);
      });
  }

  // Flip the card
  function flipCard() {
      const cardId = this.getAttribute('data-id');
      if (cardsChosen.length < 2 && !cardsChosenIds.includes(cardId)) {
          cardsChosen.push(cardArray[cardId].name);
          cardsChosenIds.push(cardId);
          this.setAttribute('src', cardArray[cardId].img);
          if (cardsChosen.length === 2) {
              setTimeout(checkForMatch, 500);
          }
      }
  }

  // Check for a match
  function checkForMatch() {
      const cards = document.querySelectorAll('img');
      const [optionOneId, optionTwoId] = cardsChosenIds;
      if (cardsChosen[0] === cardsChosen[1]) {
          cards[optionOneId].setAttribute('src', 'images/white.png');
          cards[optionTwoId].setAttribute('src', 'images/white.png');
          cardsWon.push(cardsChosen);
      } else {
          cards[optionOneId].setAttribute('src', 'images/blank.png');
          cards[optionTwoId].setAttribute('src', 'images/blank.png');
      }
      cardsChosen = [];
      cardsChosenIds = [];
      resultDisplay.textContent = `Score: ${cardsWon.length}`;
      if (cardsWon.length === cardArray.length / 2) {
          clearInterval(timer);
          resultDisplay.textContent = '🎉 Congratulations! You found them all!';
      }
  }

  // Timer function
  function startTimer() {
      timerDisplay.textContent = `Time Left: ${timeRemaining}s`;
      timer = setInterval(() => {
          timeRemaining--;
          timerDisplay.textContent = `Time Left: ${timeRemaining}s`;
          if (timeRemaining < 0) {
              clearInterval(timer);
              resultDisplay.textContent = '⏰ Time\'s up! You lost!';
              disableBoard();
          }
      }, 1000);
  }

  // Disable all cards when the game ends
  function disableBoard() {
      const cards = document.querySelectorAll('img');
      cards.forEach(card => card.removeEventListener('click', flipCard));
  }

  // Restart the game
  function resetGame() {
      grid.innerHTML = '';
      cardsChosen = [];
      cardsChosenIds = [];
      cardsWon = [];
      timeRemaining = getTimeBasedOnDifficulty();
      resultDisplay.textContent = '';
      timerDisplay.textContent = '';
      createBoard();
      startTimer();
  }

  // Start the game
  function startGame() {
      startButton.style.display = 'none';
      playAgainButton.style.display = 'inline-block';
      pauseButton.style.display = 'inline-block';
      timeRemaining = getTimeBasedOnDifficulty();  // Get difficulty-based time
      createBoard();
      startTimer();
  }

  // Get the time limit based on selected difficulty
  function getTimeBasedOnDifficulty() {
      const difficulty = difficultySelect.value;
      return parseInt(difficulty, 10);  // Convert selected value to integer
  }

  // Event listeners
  playAgainButton.addEventListener('click', resetGame);
  startButton.addEventListener('click', startGame);
  pauseButton.addEventListener('click', () => {
      if (timer) {
          clearInterval(timer);
          pauseButton.textContent = 'Resume';
      } else {
          startTimer();
          pauseButton.textContent = 'Pause';
      }
  });

 
});
