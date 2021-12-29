const player_1 = 'x';
const player_2 = 'circle';
const eightWinningCombos = [
//Array of each index that gives a winning combo//
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
];
const cellCharacter = document.querySelectorAll('[data-cell]');
//grabbing all of the cells on the board//
const board = document.getElementById('board');
//grabbing the board element itself//
const winningMessageElement = document.getElementById('winningMessage');
//grabbing the winning message element//
const winningMessageTextElement = document.querySelector('.win-text');
//grabbing class of win-text that will be displayed at the end of the game
const restartAction = document.getElementById('restartButton');
let xTurn;

gameStart();
//function to start with a clear board//

restartAction.addEventListener('click', gameStart);
//attaching an event listener to the restart button 
function gameStart() {
    xTurn = true;
    cellCharacter.forEach(cell => {
        //.forEach loops through each cell//
        cell.classList.remove(player_1);
        //clear board for beginning of new game//
        cell.classList.remove(player_2);
        //clear board for beginning of new game//
        cell.removeEventListener('click', onceClicked);
        cell.addEventListener('click', onceClicked, { once: true });
        //this allows us to click cell once and only once//
  })   
  getBoardHoverState();
  winningMessageTextElement.style.display = "none";
  //stops winning message from displaying until gameover conditions are met//
}




function onceClicked(e) {
  const cell = e.target;
  //targeting the cell that is clicked//
  const currentPlayer = xTurn ? player_1 : player_2;
  //says if it's xTurn use x if not use circle for current player//
  placeChar(cell, currentPlayer);
  //passing current cell and class//
  if (checkWin(currentPlayer)) {
      //function to check for win//
    gameOver(false);
    //function to check for draw//
  } else if(ifDraw()) {
      gameOver(true);
      //gameOver is true because it is a draw//
  } else {
    switchPlayer();
    //Else statement if neither draw or win has been met then switches player//
    getBoardHoverState();
  }  
};

function gameOver(draw) {
    if (draw) {
        //function to call draw and show message it's a draw by using the winningMessageTextElement//
        winningMessageTextElement.innerText = `It's a Draw!`;
    } else {
    winningMessageTextElement.innerText = `${xTurn ? "X" : "O"} holds court!`;
 }//Shows who's turn it is on the event of a win//
 winningMessageTextElement.style.display = "block";
};

function ifDraw() {
    //had to destructure cellCharacter because .every only works in this case as an ARRAY//
    return [...cellCharacter].every(cell => {
        return cell.classList.contains(player_1) || cell.classList.contains(player_2);
        //checking to see if every cell has a class of x or circle to return true for a draw//
    })
};

function placeChar(cell, currentPlayer) {
    //adds the current players character//
    cell.classList.add(currentPlayer);
};

function switchPlayer() {
    //this changes the turn from player 1 to player 2 and then back and forth until game is over//
    xTurn = !xTurn;
};




function checkWin(currentPlayer) {
    return eightWinningCombos.some(combination => {
        //Checking all winning combos to see if any are met by the current combination//
        return combination.every(index => {
            //will return true while every element has the same class if the winning conditions are met while looping over all combinations//
            return cellCharacter[index].classList.contains(currentPlayer);
            //checking classlist to see if it contains the current combo for a winning combo//
        })
    })
};

