//variables




window.onload = setBoardFirstTime;

function setBoardFirstTime() {
    setPieces();
    addListener();
}

function resetBoard() {
    deleteIcons();
    setPieces();
    removeListener();
    addListener();
}



//creates random array, and places icons on the board
resetButton = document.getElementById('reset');
resetButton.addEventListener('click', resetBoard);

function setPieces() {
    let gamePieces = ["fa fa-anchor", "fa fa-anchor", "fa fa-automobile", "fa fa-automobile", "fa fa-bank", "fa fa-bank", "fa fa-bath", "fa fa-bath", "fa fa-bed", "fa fa-bed", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bug", "fa fa-bug", "fa fa-child", "fa fa-child"];

    let currentRound = [];

    for (i=0; i < 16; i++) {
        let num = Math.floor(Math.random() * gamePieces.length);
        currentRound.push(gamePieces[num]);
        gamePieces.splice(num, 1);
        }
    for (i=0; i<16; i++) {
        let square = document.getElementById("card"+i);
        let setIcon = document.createElement('i');
        square.appendChild(setIcon).setAttribute('class', currentRound[i]);
        setIcon.setAttribute('id','icon'+i);
    }   
    for (i=0; i<16; i++) {
        let square = document.getElementById('card'+i);
        square.classList.remove('correctPick');
        square.classList.remove('incorrectPick');
        square.classList.remove('picked');
    }
}

//removes existing icons when board is reset

function deleteIcons() {
    for (i=0; i<16; i++) {
        let square = document.getElementById('card'+i);
        while (square.hasChildNodes()) {
            square.removeChild(square.firstChild);
        }
    }
}


function removeListener() {
    for (i=0; i < 16; i++) {
        let square = document.getElementById('card'+i);
        let icon = document.getElementById('icon'+i);
        let pickIcon = function changeColor() {
            square.className = 'picked';
            icon.classList.add('visible');
            runGame();
            }
        square.removeEventListener('click',pickIcon);
    }
}

function addListener() {
        for (i=0; i < 16; i++) {
        let square = document.getElementById('card'+i);
        let icon = document.getElementById('icon'+i);
        let pickIcon = function changeColor() {
            square.className = 'picked';
            icon.classList.add('visible');
            runGame();
            }
        square.addEventListener('click',pickIcon);  
    }
}

function runGame() {
    let square = document.getElementById('card'+i);
    let icon = document.getElementById('icon'+i);
    if (document.getElementsByClassName('picked')[1] === undefined) {console.log('first pick');}
    else {userClicks();};
}

//if the class and styles match, trigger event.
function userClicks() {
    let firstPick = document.getElementsByClassName('picked')[0];
    let firstIcon = firstPick.firstChild.getAttribute('class');
    let secondPick = document.getElementsByClassName('picked')[1];
    let secondIcon = secondPick.firstChild.getAttribute('class');
    
    
    if (firstIcon === secondIcon) {
        firstPick.classList.remove('incorrectPick');
        secondPick.classList.remove('incorrectPick');
        firstPick.classList.add('correctPick');
        secondPick.classList.add('correctPick');
        firstPick.classList.remove('picked');
        secondPick.classList.remove('picked');} else {
            let firstIcon = firstPick.firstChild;
            let secondIcon = secondPick.firstChild;
            firstPick.classList.add('incorrectPick');
            secondPick.classList.add('incorrectPick');
            firstPick.classList.remove('picked');
            secondPick.classList.remove('picked');
        };
    setTimeout(removeRedMarker, 2000);
}

function removeRedMarker() {
    if (document.getElementsByClassName('incorrectPick')[0] === undefined || document.getElementsByClassName('incorrectPick')[1] === undefined) {
        console.log('cleared')
    } else {
            let firstIncorrect = document.getElementsByClassName('incorrectPick')[0];
            let secondIncorrect = document.getElementsByClassName('incorrectPick')[1];
            let firstIncorrectIcon = firstIncorrect.firstChild;
            let secondIncorrectIcon = secondIncorrect.firstChild;
            firstIncorrect.classList.remove('incorrectPick');
            secondIncorrect.classList.remove('incorrectPick');
            firstIncorrectIcon.classList.remove('visible');
            secondIncorrectIcon.classList.remove('visible');
    }
}

