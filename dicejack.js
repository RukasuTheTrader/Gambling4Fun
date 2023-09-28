let jackAmount = 1000;
let playerPoints = 0;
let hostPoints = 0;
let betAmount = 10;
const jackAmountParagraph = document.getElementById('jack-amount');
const playerContainer = document.getElementById('player-container');
const hostContainer = document.getElementById('host-container');
const endGameButtons = document.getElementById('end-game-buttons');
const startButton = document.getElementById('start-button');
const rollButton = document.getElementById('roll-button');
const stopButton = document.getElementById('stop-button');
const newGameButton = document.getElementById('new-game-button');
const exitButton = document.getElementById('exit-button');
const playerPointsSpan = document.getElementById('player-points');
const hostPointsSpan = document.getElementById('host-points');
const resultParagraph = document.getElementById('result');
const betInput = document.getElementById('bet-input');

startButton.addEventListener('click', startGame);
rollButton.addEventListener('click', playerRoll);
stopButton.addEventListener('click', hostRoll);
newGameButton.addEventListener('click', newGame);
exitButton.addEventListener('click', exitGame);

function startGame() {
    betAmount = parseInt(betInput.value);
    if (betAmount < 10 || betAmount > jackAmount) return;
    jackAmount -= betAmount;
    jackAmountParagraph.textContent = `Jack: ${jackAmount}`;
    playerContainer.classList.remove('hidden');
    hostContainer.classList.remove('hidden');
    startButton.classList.add('hidden');
    betInput.classList.add('hidden');
}

function playerRoll() {
    const roll = rollDice();
    if (roll <= 4) {
        endGame('Host gewinnt!', false);
        return;
    }
    playerPoints += roll;
    playerPointsSpan.textContent = playerPoints;
    if (playerPoints > 100) {
        endGame('Host gewinnt!', false);
    }
}

function hostRoll() {
    while (hostPoints < playerPoints && hostPoints <= 100) {
        const roll = rollDice();
        hostPoints += roll;
        hostPointsSpan.textContent = hostPoints;
    }
    if (hostPoints >= playerPoints && hostPoints <= 100) {
        endGame('Unentschieden!', null);
    } else {
        endGame('Spieler gewinnt!', true);
    }
}

function rollDice() {
    return Math.floor(Math.random() * 100) + 1;
}

function endGame(message, playerWins) {
    rollButton.disabled = true;
    stopButton.disabled = true;
    resultParagraph.textContent = message;
    end
