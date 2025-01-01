// Array of emojis for card faces
const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];

// Duplicate emojis to create pairs
const cardFaces = [...emojis, ...emojis];

let flippedCards = [];
let matchedPairs = 0;
let moves = 0;

const gameBoard = document.getElementById('game-board');
const movesDisplay = document.getElementById('moves');
const resetButton = document.getElementById('reset-button');

// Function to shuffle the array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to create a card element
function createCard(emoji) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <div class="card-front"></div>
        <div class="card-back">${emoji}</div>
    `;
    card.addEventListener('click', flipCard);
    return card;
}

// Function to flip a card
function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            moves++;
            movesDisplay.textContent = moves;
            checkForMatch();
        }
    }
}

// Function to check if the flipped cards match
function checkForMatch() {
    const [card1, card2] = flippedCards;
    const emoji1 = card1.querySelector('.card-back').textContent;
    const emoji2 = card2.querySelector('.card-back').textContent;

    if (emoji1 === emoji2) {
        matchedPairs++;
        flippedCards = [];

        if (matchedPairs === emojis.length) {
            setTimeout(() => {
                alert(`Congratulations! You won in ${moves} moves!`);
            }, 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

// Function to initialize the game
function initializeGame() {
    gameBoard.innerHTML = '';
    matchedPairs = 0;
    moves = 0;
    movesDisplay.textContent = moves;

    const shuffledEmojis = shuffle(cardFaces);
    shuffledEmojis.forEach(emoji => {
        const card = createCard(emoji);
        gameBoard.appendChild(card);
    });
}

// Event listener for reset button
resetButton.addEventListener('click', initializeGame);

// Initialize the game when the script loads
initializeGame();

