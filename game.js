resetButton = document.getElementById('reset');

//creates random array, and places icons on the board
function setPieces() {
    let gamePieces = ["fa fa-anchor", "fa fa-anchor", "fa fa-automobile", "fa fa-automobile", "fa fa-bank", "fa fa-bank", "fa fa-bath", "fa fa-bath", "fa fa-bed", "fa fa-bed", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bug", "fa fa-bug", "fa fa-child", "fa fa-child"];

    let currentRound = [];

    for (i=0; i < 16; i++) {
        let num = Math.floor(Math.random() * gamePieces.length);
        currentRound.push(gamePieces[num]);
        gamePieces.splice(num, 1);
        }
    for (i=0; i<16; i++) {
        let space = document.getElementById("card"+i);
        let setIcon = document.createElement('i');
        space.appendChild(setIcon).setAttribute('class', currentRound[i]);
    }   
}

//removes existing icons when board is reset
function deleteIcons() {
    for (i=0; i<16; i++) {
        let cardNum = document.getElementById('card'+i);
        while (cardNum.hasChildNodes()) {
            cardNum.removeChild(cardNum.firstChild);
        }
    }
}

//combines two functions that allow the board to be reset when button is clicked
function resetBoard() {
    deleteIcons();
    setPieces();
    pickedItem();
}

resetButton.addEventListener('click', resetBoard);

//functionality for clicking on icons

function pickedItem() {
    for (i=0; i < 16; i++) {
        let userChoice = document.getElementById('card'+i);
        let changeColor = function() {
            userChoice.className = 'picked';
        } 
        userChoice.addEventListener('click',changeColor);
    }
}