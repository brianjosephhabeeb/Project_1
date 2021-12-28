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
]
const cellCharacter = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageElement = document.getElementById('winningMessage')
const winningMessageTextElement = document.querySelector('data-winning-message-text')
const restartAction = document.getElementById('restartButton')
let xTurn

gameStart()

restartAction.addEventListener('click', gameStart)

function gameStart() {
    xTurn = true
    cellCharacter.forEach(cell => {
        cell.playerList.remove(player_1)
        cell.playerList.remove(player_2)
        cell.removeEventListener('click', onceClicked)
        cell.addEventListener('click', onceClicked, { once: true })
  })   
  getBoardHoverState() 
  winningMessageElement.playerList.remove('show')
}




function onceClicked(e) {
  const cell = e.target
  const currentPlayer = xTurn ? player_1 : player_2
  placeChar(cell, currentPlayer)
  if (checkWin(currentPlayer)) {
    gameOver(false)
  } else if(ifDraw()) {
      gameOver(true)
  } else {
    switchPlayer()
    getBoardHoverState()  
  }  
}

function gameOver(draw) {
    if (draw) {
        winningMessageTextElement.innerText = `It's a Draw!`
    } else {
    winningMessageTextElement.innerText = `${xTurn ? "O's" : "X's"} holds court!`
 }
 winningMessageTextElement.playerList.add('show')
}

function ifDraw() {
    //had to destructure cellCharacter because .every only works in this case as an ARRAY
    return [...cellCharacter].every(cell => {
        return cell.playerList.contains(player_) || cell.playerList.contains(player_2)
    })
} 

function placeChar(cell, currentPlayer) {
    cell.playerList.add(currentPlayer)
}

function switchPlayer() {
    xTurn = !xTurn
}

function getBoardHoverState() {
    board.playerList.remove(player_1)
    board.playerList.remove(player_2)
    if (xTurn) {
        board.playerList.add(player_2)
    } else {
        board.playerList.add(player_1)
    }
}

function checkWin(currentPlayer) {
    return eightWinningCombos.some(combination => {
        return combination.every(index => {
            return cellCharacter[index].playerList.contains(currentPlayer)
        })
    })
}