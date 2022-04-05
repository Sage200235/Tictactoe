const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('container')
const WinningMessageElement = document.getElementById('WinningMessage')
const WinningMessageTextElement = document.querySelector('[data-winningMessageText]')
const restartButton = document.getElementById('restartButton')
const xClass = 'x'
const circleClass = 'circle'
const Show = 'show'
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
let circleTurn

startGame()

function startGame() {
    circleTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(xClass)
        cell.classList.remove(circleClass)
        cell.addEventListener('click', handleClick, {once: true})
    })
    setHover()
    WinningMessageElement.classList.remove(Show)
}

function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn? circleClass : xClass
    placeMark(cell, currentClass)
    if(checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns()
        setHover()
    }
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    circleTurn = !circleTurn
}

function setHover() {
    board.classList.remove(xClass)
    board.classList.remove(circleClass)
    if(circleTurn) {
        board.classList.add(circleClass)
    } else {
        board.classList.add(xClass)
    }
}

function checkWin(currentClass) {
    return winningCombos.some(combination => {
        return combination.every(index => {
           return cellElements[index].classList.contains(currentClass)
        })
    })
}

function endGame(draw) {
    if(draw) {
        WinningMessageTextElement.innerText  = 'Draw!'
    } else {
        WinningMessageTextElement.innerText  = `${circleTurn? 'O' : 'X'} Wins!`
    }
        WinningMessageElement.classList.add(Show)
}

function isDraw() {
   return [...cellElements].every(cell => {
        return cell.classList.contains(xClass) || cell.classList.contains(circleClass)
    })
}

restartButton.addEventListener('click', () => {
    startGame()
})