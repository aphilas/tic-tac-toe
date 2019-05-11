const cellEls = document.getElementsByClassName('cell')
const turnEl = document.getElementById('turn') // to show player turn message

let turn = 1 // or 2
const positions = {
  '1': [],
  '2': []
}
const playerTurnMsg = _ => `It's Player ${turn}'s turn to play` // dynamically get player turn message
turnEl.innerHTML = playerTurnMsg() // start with player 1

const resetGame = _ => {
  Array.from(cellEls).forEach(cellEl => {
    cellEl.addEventListener('click', play) // make all cells playable
    cellEl.innerHTML = '' // clear Xs and Os
  })  

  positions['1'] = [] // clear cell positions
  positions['2'] = [] // clear cell positions

  turn = 1
  turnEl.innerHTML = playerTurnMsg()
}

const winningCells = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [7, 5, 3]
] // if X or Os align in this cells, then player has won

winningArrayPositions = winningCells.map(row => row.map(cellNum => cellNum - 1)) // array zero based indexing

const containsSequence = (arr, sequence) => { // fn to check if an arr contains certain numbers
  for (let num of sequence) {
    if(!arr.includes(num)) return false // if arr doesn't include the num, then test failed
  }

  return true // if all nums in sequence pass the test i.e are in array
}

const winningCombination = positions => {
  for (let combo of winningArrayPositions) { // for each winning combo ...
    if (containsSequence(positions[`${turn}`], combo)) return true // ... check if combo is contained in player's positions
    // if so return true ...
  }

  return false // ... else return false
}

const play = event => {
  let el = event.target
  let id = el.id
  let num = id[id.length - 1] // get numeric value of cell

  positions[`${turn}`].push(num - 1) // assign cell position to player
  el.innerHTML = turn === 1 ? 'X' : 'O' // add X or O to cell

  if (winningCombination(positions)) { // handle win
    turnEl.innerHTML = `Player ${turn} won!`
    setTimeout(resetGame, 2000) // reset game after 2 seconds in order to keep msg of who won on screen for some time
    return
  }

  if (((positions['1'].length + positions['1'].length) >= 9) && !winningCombination(positions)) { // handle draw
    turnEl.innerHTML = `It's a draw!`
    setTimeout(resetGame, 2000) // reset game after 2 seconds in order to keep of draw on screen
    return
  }

  el.removeEventListener('click', play) // disable cell that has already been played
  turn === 1 ? turn = 2 : turn = 1 // toggle turn
  turnEl.innerHTML = playerTurnMsg() // set message of player to play next
}

Array.from(cellEls).forEach(cellEl => cellEl.addEventListener('click', play)) // run fn play when a cell is clicked
