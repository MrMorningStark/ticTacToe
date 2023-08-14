const player1Turn = "👧🏻 Player 1's Turn 🧔🏻‍♂️";
const player2Turn = "👩🏻‍🦰 Player 2's Turn 👨🏻‍🦰";
const player1Win = "🎉 Player 1 Wins! 🎉";
const player2Win = "🎉 Player 2 Wins! 🎉";
const draw = "📍 Draw! 📍";
const x = "X";
const o = "O";
var boardElements = [];
const winningCombinations = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column
    [0, 4, 8], // top left to bottom right
    [2, 4, 6] // top right to bottom left
];

var insertValue = x;
var allowPlay = true;

var turn = player1Turn;

const message = document.getElementById("message");

message.innerText = turn;
message.style.backgroundColor = insertValue == o ? "black" : "white";
message.style.color = insertValue == o ? "white" : "black";

function changeTurn() {
    if (turn === player1Turn) {
        turn = player2Turn;
        insertValue = o;
    } else {
        turn = player1Turn;
        insertValue = x;
    }
    message.innerText = turn;
    message.style.backgroundColor = insertValue == o ? "black" : "white";
    message.style.color = insertValue == o ? "white" : "black";
}

function checkWin() {
    const boardValues = boardElements.map(element => element.innerText);

    for (let index = 0; index < winningCombinations.length; index++) {
        const winnComb = winningCombinations[index];
        if (boardValues[winnComb[0]] !== "" && boardValues[winnComb[1]] !== "" && boardValues[winnComb[2]] !== "" && boardValues[winnComb[0]] === boardValues[winnComb[1]] && boardValues[winnComb[1]] === boardValues[winnComb[2]]) {
            allowPlay = false;
            return true;
        }
    }
    return false;
}

function checkDraw() {
    const boardValues = boardElements.map(element => element.innerText);
    if (boardValues.every(value => value.length === 1)) {
        allowPlay = false;
        return true;
    }
    return false;
}

function reset() {
    window.location.reload();
}

function onClick(event) {
    const element = document.getElementById(event.target.id);
    if (element.innerText === "" && allowPlay) {
        element.innerText = insertValue;
        element.style.backgroundColor = insertValue == o ? "black" : "white";
        element.style.color = insertValue == o ? "white" : "black";
        element.style.cursor = "default";
        if (checkWin()) {
            message.innerText = turn == player1Turn ? player1Win : player2Win;
            message.style.backgroundColor = "green";
            message.style.color = "white";
        } else if (checkDraw()) {
            message.innerText = draw;
            message.style.backgroundColor = "yellow";
            message.style.color = "black";
        } else {
            changeTurn();
        }
    }
}

for (let index = 0; index < 9; index++) {
    boardElements.push(document.getElementById(index));
    document.getElementById(index).addEventListener("click", onClick);
}



