document.addEventListener('DOMContentLoaded', () => {
  const cardGrid = document.getElementById('cardGrid');
  const moveCount = document.getElementById('moveCount');
  const timeDisplay = document.getElementById('time');
  const stopGameBtn = document.getElementById('stopGameBtn');

  let cards = [];
  let flippedCards = [];
  let moveCounter = 0;
  let time = 0;
  let timer;

  const cardImages = ['🐶', '🐱', '🐸', '🐷', '🐹', '🐰', '🐵', '🐴'];
  const cardPairs = [...cardImages, ...cardImages];

  function initGame() {
      cards = [];
      flippedCards = [];
      moveCounter = 0;
      time = 0;
      moveCount.textContent = moveCounter;
      timeDisplay.textContent = '00:00';
      clearInterval(timer);

      const shuffledCards = cardPairs.sort(() => Math.random() - 0.5);

      cardGrid.innerHTML = '';
      shuffledCards.forEach((image, index) => {
          const card = document.createElement('div');
          card.className = 'card';
          card.dataset.index = index;
          card.dataset.image = image;
          card.addEventListener('click', handleCardClick);
          cards.push(card);
          cardGrid.appendChild(card);
      });

      timer = setInterval(updateTimer, 1000);
  }

  function handleCardClick(e) {
      const card = e.target;
      if (card.classList.contains('flipped') || card.classList.contains('matched') || flippedCards.length === 2) return;

      card.classList.add('flipped');
      card.textContent = card.dataset.image;
      flippedCards.push(card);

      if (flippedCards.length === 2) {
          moveCounter++;
          moveCount.textContent = moveCounter;
          checkMatch();
      }
  }

  function checkMatch() {
      const [card1, card2] = flippedCards;
      if (card1.dataset.image === card2.dataset.image) {
          card1.classList.add('matched');
          card2.classList.add('matched');
          flippedCards = [];
          if (document.querySelectorAll('.matched').length === cardPairs.length) {
              alert('Chúc mừng! Bạn đã thắng!');
              clearInterval(timer);
          }
      } else {
          setTimeout(() => {
              card1.classList.remove('flipped');
              card2.classList.remove('flipped');
              card1.textContent = '';
              card2.textContent = '';
              flippedCards = [];
          }, 1000);
      }
  }

  function updateTimer() {
      time++;
      const minutes = Math.floor(time / 60).toString().padStart(2, '0');
      const seconds = (time % 60).toString().padStart(2, '0');
      timeDisplay.textContent = `${minutes}:${seconds}`;
  }

  stopGameBtn.addEventListener('click', () => {
      clearInterval(timer);
      alert('Trò chơi đã dừng! Số nước đi: ' + moveCounter + ', Thời gian: ' + timeDisplay.textContent);
      initGame();
  });

  initGame();
});