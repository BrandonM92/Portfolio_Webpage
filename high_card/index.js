// Initial hand of cards for the player
let playerHand = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let cpuHand = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Initialize scores and rounds
let playerScore = 0;
let cpuScore = 0;
let round = 1;

// Flag to track if the player has selected a card for the current round
let cardSelected = false;

// Function to randomly select a card from the CPU's hand
function selectCPUCard() {
    return cpuHand[Math.floor(Math.random() * cpuHand.length)];
}

// Function to initialize the card buttons for the CPU's hand
function initializeCPUButtons() {
    const cpuHandNumbers = document.querySelector('.cpu-hand-container .hand-numbers');
    cpuHandNumbers.innerHTML = ''; // Clear previous buttons
    cpuHand.forEach(card => {
        const button = document.createElement('button');
        button.textContent = card;
        button.classList.add('cpu-card-button');
        button.disabled = true; // Disable CPU buttons
        cpuHandNumbers.appendChild(button);
    });
}

// Function to remove a used CPU card from the CPU's hand
function removeUsedCPUCard(cardValue) {
    const index = cpuHand.indexOf(cardValue);
    if (index !== -1) {
        cpuHand.splice(index, 1);
        initializeCPUButtons(); // Reinitialize CPU buttons after removing a card
    }
}

// Function to handle player's card selection
function selectPlayerCard(cardValue) {
    // Check if a card has already been selected for this round
    if (cardSelected) {
        alert("You have already selected a card for this round. Click 'Start Next Round' to continue.");
        return;
    }

    // Remove the selected card from the player's hand
    const cardIndex = playerHand.indexOf(cardValue);
    if (cardIndex !== -1) {
        playerHand.splice(cardIndex, 1);
    }

    // Remove the corresponding card button from the UI
    const buttonToRemove = document.querySelector(`.hand-numbers .card-button[value="${cardValue}"]`);
    if (buttonToRemove) {
        buttonToRemove.remove();
    }

    // CPU selects a card
    const cpuCard = selectCPUCard();

    // Remove the CPU's used card from its hand
    removeUsedCPUCard(cpuCard);

    // Display player's card value in the box
    document.querySelector('.game-container-blocks.player .score-value').textContent = cardValue;

    // Display CPU's card value in the box
    updateCPUCardValue(cpuCard);

    // Compare the cards and update scores
    if (cardValue > cpuCard) {
        playerScore++;
    } else if (cpuCard > cardValue) {
        cpuScore++;
    }

    // Update UI with scores
    updateUI();

    // Check if the round is over
    if (playerHand.length === 0 || cpuHand.length === 0) {
        endRound();
    }

    // Set cardSelected flag to true
    cardSelected = true;

    // Check if the game is over
    if (playerScore === 5 || cpuScore === 5 || (playerHand.length === 0 && cpuHand.length === 0)) {
        endGame();
    }
}


// Function to update the UI with the CPU's card value
function updateCPUCardValue(cardValue) {
    document.querySelector('.game-container-blocks.cpu .score-value').textContent = cardValue;
}

// Function to end the round and start the next round
function endRound() {
    // Display round result
    let roundResult;
    if (playerScore > cpuScore) {
        roundResult = "You win this round!";
    } else if (cpuScore > playerScore) {
        roundResult = "CPU wins this round!";
    } else {
        roundResult = "It's a tie for this round!";
    }
    alert(`Round ${round} Result:\n${roundResult}`);

    // Increment round
    round++;

    // Reset player's and CPU's card values to 0
    document.querySelector('.game-container-blocks.player .score-value').textContent = 0;
    document.querySelector('.game-container-blocks.cpu .score-value').textContent = 0;

    // Reset cardSelected flag
    cardSelected = false;
}

// Function to handle the end of the game
function endGame() {
    let gameResult;
    if (playerScore === cpuScore) {
        gameResult = "It's a draw!";
    } else {
        gameResult = playerScore > cpuScore ? "You win the game!" : "CPU wins the game!";
    }
    alert(gameResult);
    playerScore=0;
    cpuScore=0;
    resetGame(); // Reset the game
}

// Function to start a new game
function startNewGame() {
    // Reset UI and game state
    resetUI();

    // Initialize the UI with initial scores, round, and hands
    updateUI();
}

// Function to reset the game
function resetGame() {
    // Reset scores, round, and hands
    playerScore = 0;
    cpuScore = 0;
    round = 1;
    playerHand = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    cpuHand = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    // Update UI
    updateUI();
    initializeCardButtons();
    initializeCPUButtons();

    // Reset UI elements
    document.querySelector('.game-container-blocks.player .score-value').textContent = 0;
    document.querySelector('.game-container-blocks.cpu .score-value').textContent = 0;

    // Reset cardSelected flag
    cardSelected = false;

    startNewGame();

    // Enable the "Start Next Round" button until a card is selected
    document.getElementById('start-next-round-button').disabled = false; // Enable the button here
}


// Function to reset the UI and game state for a new game
function resetUI() {
    // Reset scores, round, and hands
    playerScore = 0;
    cpuScore = 0;
    round = 1;
    playerHand = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    cpuHand = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    // Reset UI elements
    document.querySelector('.game-container-blocks.player .score-value').textContent = 0;
    document.querySelector('.game-container-blocks.cpu .score-value').textContent = 0;
    initializeCardButtons();
    initializeCPUButtons(); // Reinitialize CPU buttons

    // Reset cardSelected flag
    cardSelected = false;

    // Enable the "Start Next Round" button until a card is selected
    document.getElementById('start-next-round-button').disabled = true;
}


// Function to update the UI with scores, rounds, and remaining cards
function updateUI() {
    // Update player score text
    document.querySelector('.player-score-text').textContent = playerScore;

    // Update CPU score text
    document.querySelector('.cpu-score-text').textContent = cpuScore;

    // Update round text
    document.querySelector('.round-text').textContent = `Round: ${round}`;
}

// Function to initialize the card buttons for the player's hand
function initializeCardButtons() {
    const handNumbers = document.querySelector('.hand-numbers');
    handNumbers.innerHTML = ''; // Clear previous buttons
    playerHand.forEach(card => {
        const button = document.createElement('button');
        button.textContent = card;
        button.value = card; // Set value attribute
        button.classList.add('card-button');
        button.addEventListener('click', function() {
            selectPlayerCard(card);
        });
        handNumbers.appendChild(button);
    });
}

// Function to start the next round
function startNextRound() {
    // Check if a card has been selected for the current round
    if (!cardSelected) {
        alert("You must select a card before starting the next round.");
        return;
    }

    // Increment round
    round++;

    // Reset player's and CPU's card values to 0
    document.querySelector('.game-container-blocks.player .score-value').textContent = 0;
    document.querySelector('.game-container-blocks.cpu .score-value').textContent = 0;

    // Reset cardSelected flag
    cardSelected = false;

   
}

// Add event listener to initialize CPU buttons when the document is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize card buttons
    initializeCardButtons();

    // Initialize CPU card buttons
    initializeCPUButtons();

    // Add event listener to "Start Next Round" button
    document.getElementById('start-next-round-button').addEventListener('click', startNextRound);

    // Add event listener to "Reset Game" button
    document.getElementById('reset-game-button').addEventListener('click', resetGame);
});

// Initialize the UI with initial scores, round, and hands
updateUI();
