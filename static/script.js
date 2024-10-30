const cells = document.querySelectorAll("[data-cell]");
const board = document.getElementById("gameBoard");
const restartButton = document.getElementById("restartButton");
const messageElement = document.getElementById("message");

let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
let isGameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (gameState[cellIndex] !== "" || !isGameActive) return;

    gameState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer === "X" ? "x-marker" : "o-marker");
    
    if (checkWin()) {
        messageElement.textContent = `Player ${currentPlayer} wins!`;
        isGameActive = false;
    } else if (isDraw()) {
        messageElement.textContent = "It's a draw!";
        isGameActive = false;
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        messageElement.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => gameState[index] === currentPlayer);
    });
}

function isDraw() {
    return gameState.every(cell => cell !== "");
}

function restartGame() {
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    isGameActive = true;
    messageElement.textContent = "Player X's turn";
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("x-marker", "o-marker");
    });
}

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
restartButton.addEventListener("click", restartGame);
