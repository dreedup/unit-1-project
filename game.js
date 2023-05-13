LOOKUP = {
    '1': "X",
    '-1': 'O',
    'null': ''
}

//determine win positions
const winPos = [
    [0, 1, 2], [3, 4, 5], 
    [6, 7, 8], [0, 3, 6], 
    [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]
];

//Variables
let turn, winner, gameboard, player1Score, player2Score, champion


//Cached element references
const gameOverEl = document.querySelector('h4')
const championEl = document.querySelector('h3')
const messageEl = document.querySelector('h2')
const gameboardEl = document.getElementById('gameboard');
const tileEls = document.querySelectorAll('.tile')
const buttonEl = document.querySelector('button')
const newroundEL = document.getElementById('newround')

//Event Listeners
gameboardEl.addEventListener('click', handleClick)
buttonEl.addEventListener('click', init)
newroundEL.addEventListener('click',newRound)


//Functions

// Start the game upon intial load and when the Play Again button is clicked
init();



function init() {

    //set player's wins
    player1Score = 0;
    player2Score = 0;

    // set the players turn
    turn = 1; // X goes first & is player 1

    // set winner to false (no winner to begin)
    winner = false;

    //determine champion
    champion = false;

    // set up beginner gameboard
    //gameboard  [   null, null, null,  null, null, null,  null, null, null  ]
    gameboard = new Array(9).fill(null);

    // visualize a new game to the DOM
    render();
}



function getWinner() {
    // go over the gameboard (array) and check each collection of combo values ex: [1,2,3]
    for(let i = 0; i < winPos.length; i++) {
        if(Math.abs(gameboard[winPos[i][0]] + 
                    gameboard[winPos[i][1]] + 
                    gameboard[winPos[i][2]]) === 3) {
                return gameboard[winPos[i][0]];
    
            }
    }
    if(gameboard.includes(null)) return false;
    return "T";
    }
    
function newRound() {

    if (winner === 1) {
        player1Score++;
      } else if (winner === -1) {
        player2Score++;
      }

// Check if a player has won 3 games to become champion
  if (player1Score === 3) {
    champion = 1;
  } else if (player2Score === 3) {
    champion = -1;
  }

    turn = winner;
    winner = false;
    gameboard = new Array(9).fill(null);
    render();
}
 


function handleClick(Event) {
    const position = event.target.dataset.index;
    if(winner || gameboard[position] !== null) return;
    gameboard[position] = turn;
    turn *= -1;
    winner = getWinner();
    render();

    

}

function render() {
    // change the state of the game
    tileEls.forEach(function(tile, position) {
        tile.textContent = LOOKUP[gameboard[position]]
    }); 

    
    if(!winner) {

        

    messageEl.textContent = `Player ${LOOKUP[turn]}'s turn`;}
    else if(winner === "T") {
        messageEl.textContent = "Tie Game";
    } else {
        messageEl.textContent = `Player ${LOOKUP[winner]} Wins!`;
    } 
 
    if (champion) {
        gameOverEl.textContent = `GAME OVER. PLEASE PRESS NEW GAME TO RESTART`;
        championEl.textContent = ` PLAYER ${LOOKUP[champion]} IS THE CHAMPION`;
      } else {
        gameOverEl.textContent = '';
        championEl.textContent = '';
      }

}