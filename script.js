// Track the current player (X starts first)
let currentPlayer = 'X';

// Array to store the game state (empty strings represent empty cells)
let gameState = ['', '', '', '', '', '', '', '', ''];

// Winning combinations
const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Select all the cells and the status display
const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('reset');

// Add click event listeners to each cell
cells.forEach((cell, index) => {
  cell.addEventListener('click', () => handleClick(cell, index));
});

// Handle cell clicks
function handleClick(cell, index) {
  // If the cell is already filled or the game is over, do nothing
  if (gameState[index] !== '' || checkWin() || checkDraw()) return;

  // Update the cell and the game state
  gameState[index] = currentPlayer;
  cell.textContent = currentPlayer;

  // Check for a win or draw after every move
  if (checkWin()) {
    statusDisplay.textContent = `${currentPlayer} Wins!`;
  } else if (checkDraw()) {
    statusDisplay.textContent = `It's a Draw!`;
  } else {
    // Switch the player if no win/draw
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
  }
}

// Check if a player has won
function checkWin() {
  return winningCombinations.some(combination => {
    return combination.every(index => gameState[index] === currentPlayer);
  });
}

// Check for a draw (no empty cells left)
function checkDraw() {
  return gameState.every(cell => cell !== '');
}

// Reset the game
resetButton.addEventListener('click', resetGame);

function resetGame() {
  gameState = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
  cells.forEach(cell => cell.textContent = '');
}
