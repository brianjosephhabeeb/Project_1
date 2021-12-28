const player_X = 'x';
const player_O = 'circle';
const eightWinningCombos = [
//Array of each index that gives a winning combo//
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
//Accessing "data-cell" from HTML using .forEach method
const cellElements = document.querySelectorAll('[data-cell]');
//Adding eventListener for clicks in a cell and limiting to one click per cell

let circlePlay

cellElements.forEach(cell => {
    cell.addEventListener('click', handleClick, {once: true});
})

//Creat function for handleClick event
function handleClick(e) {
    const cell = e.target
    const currentChar = circlePlay ? player_O : player_X
    placeChar(cell, currentChar)
    //What events happen upon click?
    //First place character "x" in chosen cell
    //Switch to next user
    newTurn()
}

//function to add currentChar to selected cell
function placeChar(cell, currentChar) {
    cell.charList.add(currentChar)
}
//changes character based on who played last
function newTurn () {
    circlePlay = !circlePlay
}

