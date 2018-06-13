//variables
let scoreCount = 0;
let firstStar = document.getElementById('firstStar');
let secondStar = document.getElementById('secondStar');
let thirdStar = document.getElementById('thirdStar');
let fourthStar = document.getElementById('fourthStar');
let fifthStar = document.getElementById('fifthStar');
let gameContainer = document.getElementById('gameContainer');
let timer = 0;
let modal = document.getElementById('winModal');
let close = document.getElementById('closeWindow')
let closeModal = function closing() {
    modal.style.display = 'none';
};
let startTimer = function startTime() {
  setInterval(displayTime, 1000);
};  

window.onload = setBoardFirstTime;


function setBoardFirstTime() {
    setPieces();
    addListener();
}

function resetBoard() {
    location.reload();
}



resetButton = document.getElementById('reset');
resetButton.addEventListener('click', resetBoard);
close.addEventListener('click',closeModal);
gameContainer.addEventListener('click',startTimer,{once: true});

//creates random array, and places icons on the board.  Function also clears "correct" and "incorrect" classes.
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

//removes existing icons when board is reset
/*
function deleteIcons() {
    for (i=0; i<16; i++) {
        let square = document.getElementById('card'+i);
        while (square.hasChildNodes()) {
            square.removeChild(square.firstChild);
        }
    }
}
*/
//adds the eventlistener that triggers a function when a square is clicked, also removes previous eventlisteners.
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


//precursor to function that evaluates user picks for matches - function clears an error.
function runGame() {
    let square = document.getElementById('card'+i);
    let icon = document.getElementById('icon'+i);
    if (document.getElementsByClassName('picked')[1] === undefined) {console.log('first pick');}
    else {userEvaluate();};
}

//if the class and styles match, trigger event.
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
        secondPick.classList.remove('picked');} else {
            let firstIcon = firstPick.firstChild;
            let secondIcon = secondPick.firstChild;
            firstPick.classList.add('incorrectPick');
            secondPick.classList.add('incorrectPick');
            firstPick.classList.remove('picked');
            secondPick.classList.remove('picked');
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

//evaluates if all spaces are marked correct
function evaluateWin() {
    if (document.getElementsByClassName('correctPick')[15] === undefined) {
        console.log('continue game');} else {
        stopTimer();
        reportScore();
        modal.style.display = 'block';
        
    };
}

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

//scoring function - tie to removeRedMarker(), if the "else" portion is triggered, add to counter.

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

function displayTime() {
  timer += 1;
  document.getElementById('displayTime').innerHTML = timer;
}

function stopTimer() {
  let myTime = document.getElementById('myTime');
  myTime.innerHTML = timer + ' seconds';
  clearInterval(startTime);
}