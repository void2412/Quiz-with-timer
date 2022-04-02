// initial variable and constant
const questionList =[]
const answerList =[]
const choiceList =[]
var timeLeft = 0
var highscoreList = localStorage.getItem('highscore')
var highscoreToggle = false

// item selected in HTML DOM
var scoreList = document.querySelector('#highscore')
var scoreBtn = document.querySelector('#viewScore')

var questionArea = document.querySelector('#questionArea')
var question = document.querySelector('#question')

var inputArea = document.querySelector('#inputArea')
var btnArea = document.querySelector('#questionAnswer')
var playerDetail = document.querySelector('#playerDetail')

var timerArea = document.querySelector('#timerArea')
var timerText = document.querySelector('#timer')
var penaltyText = document.querySelector('#penalty')

function init(){
    scoreList.setAttribute('style', 'display:none;')
}
init()
// rendering functions
function toggleHighscore(){
    if (!highscoreToggle){
        scoreList.setAttribute('style', 'display: block;')
        scoreBtn.textContent = "Hide HighScore"
        highscoreToggle = true
        // for (var i = 0; i < highscoreList.length; i++){
            // var liEl = document.createElement('li')
    
        // }
    }
    else{
        scoreList.setAttribute('style', 'display: none;')
        scoreBtn.textContent = "Show HighScore"
        highscoreToggle = false
    }
    
}

function showQuestion(){

}

function showTimeRemaining(){

}

// get Input and process input functions
function getPlayerDetail(){

}

function checkAnswer(){

}

function checkHighscore(){

}

function updateHighscore(){

}

// assign event linstener to buttons

scoreBtn.addEventListener('click', toggleHighscore)