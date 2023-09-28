let playerJack = 1000; // Spieler startet mit 1000 Jack
let playerSum = 0;
let hostSum = 0;

// Beispiel-Elemente, ersetzen Sie diese mit Ihren tatsächlichen Element-Referenzen
let playerSumElement = document.getElementById('playerSum');
let hostSumElement = document.getElementById('hostSum');
let playerJackElement = document.getElementById('playerJack');
let rollButton = document.getElementById('rollButton');
let holdButton = document.getElementById('holdButton');
let newGameButton = document.getElementById('newGameButton');
let exitButton = document.getElementById('exitButton');
let betInput = document.getElementById('betInput');

function startGame() {
    let bet = parseInt(betInput.value);
    if(isNaN(bet) || bet < 10 || bet > playerJack) {
        alert('Invalid bet amount');
        return;
    }

    playerJack -= bet;
    playerJackElement.textContent = playerJack;
    playerSum = 0;
    hostSum = 0;
    rollButton.disabled = false;
    holdButton.disabled = false;
    newGameButton.disabled = true;
    exitButton.disabled = true;
}

function rollDice() {
    let roll = Math.floor(Math.random() * 100) + 1;
    playerSum += roll;
    playerSumElement.textContent = playerSum;

    if(roll <= 4 || playerSum > 100) {
        endGame('Host wins!', false);
    }
}

function hold() {
    rollButton.disabled = true;
    holdButton.disabled = true;
    
    while(hostSum < playerSum && hostSum <= 100) {
        let roll = Math.floor(Math.random() * 100) + 1;
        hostSum += roll;
        hostSumElement.textContent = hostSum;
    }

    if(hostSum <= 4 || hostSum > 100) {
        endGame('Player wins!', true);
    } else if(hostSum >= playerSum && hostSum <= 100) {
        endGame('Host wins!', false);
    } else {
        endGame('Player wins!', true);
    }
}

function endGame(message, playerWins) {
    alert(message);
    if(playerWins) playerJack += parseInt(betInput.value) * 2;
    playerJackElement.textContent = playerJack;
    newGameButton.disabled = false;
    exitButton.disabled = false;
}

function newGame() {
    playerSum = 0;
    hostSum = 0;
    playerSumElement.textContent = playerSum;
    hostSumElement.textContent = hostSum;
    startGame();
}

function exitGame() {
    // Hier Logik zum Verlassen des Spiels oder Zurückkehren zum Hauptmenü
    window.location.href = 'index.html'; // Beispiel: Leitet zur Startseite weiter.
}

rollButton.addEventListener('click', rollDice);
holdButton.addEventListener('click', hold);
newGameButton.addEventListener('click', newGame);
exitButton.addEventListener('click', exitGame);

startGame(); // Startet das Spiel beim Laden der Seite
