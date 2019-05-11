const cellEls = document.getElementsByClassName('cell')

let turn = 'X' // 'O'
let picks = new Array(9).fill(undefined)

const play = event => {
  let el = event.target
  let id = el.id
  let num = id[id.length - 1]
  console.log(num)
  el.removeEventListener('click', play)

  el.innerHTML = turn // add X or O to cell
  turn === 'X' ? turn = 'O' : turn = 'X' // toggle turn
}

Array.from(cellEls).forEach(cellEl => cellEl.addEventListener('click', play))
