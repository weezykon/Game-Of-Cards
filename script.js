/*
    Black Card Javascript
    By Weezykon Akinbode
*/ 
// buttons
var newGame = document.getElementById('new-game');
var hitGame = document.getElementById('hit-game');
var stayGame = document.getElementById('stay-game');


// suits
let suits = ['Hearts','Clubs','Diamonds','Spades'];
let values = ['Ace', 'King', 'Queen', 'Jack', 'Ten', 'Nine', 'Eight', 'Seven', 'Six', 'Five', 'Four', 'Three', 'Two'];


// game variables
let gameStarted = false,
    gameOver = false,
    playerWon = false,
    dealerCards = [],
    playerCards = [],
    dealerScore = 0,
    playerScore = 0,
    deck = [];
    

newGame.addEventListener('click', function(){
    newGame.style = "display:none";
    hitGame.style = "display:inline";
    stayGame.style = "display:inline";
    gameStarted = true;
    gameOver = false;
    playerWon = false;

    deck = createDeck();
    shuffleCard(deck);
    dealerCards = [getNextcard(), getNextcard()];
    playerCards = [getNextcard(), getNextcard()];
    
    showStatus();
});

hitGame.addEventListener('click', function(){
    playerCards.push(getNextcard());
    checkforendGame();
    showStatus()
});

stayGame.addEventListener('click', function(){
    gameOver = true;
    checkforendGame();
    showStatus()
});

// create deck
function createDeck(){
    let deck = [];
    for (let suitId = 0; suitId < suits.length; suitId++) {
        for (let valueId = 0; valueId < values.length; valueId++) {
            let card = {
                suit: suits[suitId],
                value: values[valueId]
            };
            deck.push(card);
        }
    }
    return deck;
}

function getcard(card){
    return ' '+card.value + ' of ' + card.suit + ' ';
}

function shuffleCard(deck){
    for (let i = 0; i < deck.length; i++) {
        let swapId = Math.trunc(Math.random() * deck.length);
        let tmp = deck[swapId];
        deck[swapId] = deck[i];
        deck[i] = tmp;
    }
}

function getNextcard(){
    return deck.shift();
}

function getcardNumeric(card){
    switch (card.value) {
        case 'Ace':
            return 1;
        case 'Two':
            return 2;
        case 'Three':
            return 3;
        case 'Four':
            return 4;
        case 'Five':
            return 5;
        case 'Six':
            return 6;
        case 'Seven':
            return 7;
        case 'Eight':
            return 8;
        case 'Nine':
            return 9;
        default:
            return 10;
    }
}

function getScore(cardArray){
    let score = 0;
    let hasAce =  false;
    for (let i = 0; i < cardArray.length; i++) {
        let card = cardArray[i];
        score += getcardNumeric(card);
        if (card.value === 'Ace') {
            hasAce = true;
        }
    }
    if (hasAce && score + 10 <= 21 ) {
        return score + 10;
    }

    return score;
}

function checkforendGame(){
    updateScores();

    if (gameOver) {
        while (dealerScore < playerScore && playerScore <= 21 && dealerScore <= 21) {
            dealerCards.push(getNextcard());
            updateScores();
        }
    }

    if (playerScore > 21) {
        playerWon = false;
        gameOver = true;
    } else if (dealerScore > 21) {
        playerWon = true;
        gameOver = true;
    } else if (gameOver){
        if (playerScore > dealerScore) {
            playerWon = true;
        } else if (playerScore === dealerScore) {
            playerWon = false;
        } else {
            playerWon = false;
        }
    }
}

function updateScores(){
    dealerScore = getScore(dealerCards);
    playerScore = getScore(playerCards);
}

function showStatus(){
    let dealerCard = '';
    for (let i = 0; i < dealerCards.length; i++) {
        dealerCard += getcard(dealerCards[i]) + '\n';
    }

    let playerCard = '';
    for (let i = 0; i < playerCards.length; i++) {
        playerCard += getcard(playerCards[i]) + '\n';
    }

    updateScores()

    document.getElementById('cardSec').style = "display:flex";
    document.getElementById('dealerDiv').innerText =  dealerCard;
    document.getElementById('playerDiv').innerText =  playerCard;
    document.getElementById('dealerScore').innerText =  dealerScore;
    document.getElementById('playerScore').innerText =  playerScore;

    if(playerScore === 21){
        playerWon = true;
        gameOver = true;
    }

    if (gameOver) {
        if (playerWon) {
            document.getElementById('status').innerText =  'You Win!';
        } else {
            document.getElementById('status').innerText =  'Dealer Wins!';
        }
        newGame.style = "display:inline";
        hitGame.style = "display:none";
        stayGame.style = "display:none";
    }
}
