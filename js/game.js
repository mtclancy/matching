//Global variables
let scoreCount = 0;
let firstStar = document.getElementById('firstStar');
let secondStar = document.getElementById('secondStar');
let thirdStar = document.getElementById('thirdStar');
let fourthStar = document.getElementById('fourthStar');
let fifthStar = document.getElementById('fifthStar');
let gameContainer = document.getElementById('gameContainer');
let timer = 0;
let timeDisplay = document.getElementById('displayTime');
let moveCounter = 0;
let modal = document.getElementById('winModal');
let close = document.getElementById('closeWindow')
let closeModal = function closing() {
    modal.style.display = 'none';
};
let startTimer = function() {
  setInterval(displayTime, 1000);
};  


//Events
window.onload = setBoardFirstTime;
resetButton = document.getElementById('reset');
resetButton.addEventListener('click', resetBoard);
close.addEventListener('click',closeModal);
gameContainer.addEventListener('click',startTimer,{once: true});


//Loading the board
function setBoardFirstTime() {
    setPieces();
    addListener();
}

function resetBoard() {
    location.reload();
}

function setPieces() {
    let gamePieces = ["fa fa-anchor fa-2x", "fa fa-anchor fa-2x", "fa fa-automobile fa-2x", "fa fa-automobile fa-2x", "fa fa-bank fa-2x", "fa fa-bank fa-2x", "fa fa-bath fa-2x", "fa fa-bath fa-2x", "fa fa-bed fa-2x", "fa fa-bed fa-2x", "fa fa-bicycle fa-2x", "fa fa-bicycle fa-2x", "fa fa-bug fa-2x", "fa fa-bug fa-2x", "fa fa-child fa-2x", "fa fa-child fa-2x"];

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

function addListener() {
        for (i=0; i < 16; i++) {
        let square = document.getElementById('card'+i);
        let icon = document.getElementById('icon'+i);
        let pickIcon = function() {
            if(document.getElementsByClassName('incorrectPick')[1] === undefined) {
            square.className = 'picked';
            icon.classList.add('visible');
            runGame();
            } else {return null;};
        }
        square.addEventListener('click',pickIcon);
    }
}


//Functions controlling and evaluating user interactions
function runGame() {
    let square = document.getElementById('card'+i);
    let icon = document.getElementById('icon'+i);
    if (document.getElementsByClassName('picked')[1] === undefined) {console.log('first pick');}
    else {userEvaluate();};
}

function userEvaluate() {
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
        secondPick.classList.remove('picked');
        displayMoves();} else {
            let firstIcon = firstPick.firstChild;
            let secondIcon = secondPick.firstChild;
            firstPick.classList.add('incorrectPick');
            secondPick.classList.add('incorrectPick');
            firstPick.classList.remove('picked');
            secondPick.classList.remove('picked');
            displayMoves();
        };
    setTimeout(removeRedMarker, 2000);
    evaluateWin();
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
            userScore();
    }
}


function evaluateWin() {
    if (document.getElementsByClassName('correctPick')[15] === undefined) {
        console.log('continue game');} else {
        modalControl();
    };
}

//Functions related to score and modal display
function reportScore() {
    let myScore = document.getElementById('myScore');
    let starNum = 5;
    if (scoreCount < 3) {
            starNum = 5;
        } else if (scoreCount >= 6 && scoreCount < 9) {
            starNum = 4;
        } else if (scoreCount >= 9 && scoreCount < 12) {
            starNum = 3;
        } else if (scoreCount >= 12 && scoreCount < 15) {
            starNum = 2;
        } else if (scoreCount >= 15 && scoreCount < 18) {
            starNum = 1;
        } ;
    
    for (i=1; i < starNum; i++) {
        let addStar = document.createElement('span');
        myScore.appendChild(addStar).setAttribute('class', 'fa fa-star');
    }
    
}

function userScore() {
    scoreCount += 1;
        if (scoreCount < 3) {
            console.log("great job");} else if (scoreCount >= 3 && scoreCount < 6) {
            firstStar.className = "fa fa-star-o";
        } else if (scoreCount >= 6 && scoreCount < 9) {
            secondStar.className = "fa fa-star-o";
        } else if (scoreCount >= 9 && scoreCount < 12) {
            thirdStar.className = "fa fa-star-o";
        } else if (scoreCount >= 12 && scoreCount < 15) {
            fourthStar.className = "fa fa-star-o";
        } else if (scoreCount >= 15 && scoreCount < 18) {
            fifthStar.className = "fa fa-star-o";
        } 
}

function displayMoves() {
  moveCounter += 1;
  document.getElementById('displayMoves').innerHTML = moveCounter;
}

function displayTime() {
  timer += 1;
  timeDisplay.innerHTML = timer;
}

function modalControl() {
  modal.style.display = 'block';
  let myTime = document.getElementById('myTime');
  myTime.innerHTML = timer + ' seconds';
  reportScore();
}
