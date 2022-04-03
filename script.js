// initial variable and constant
const questionList =['What is DOM', 'HTML stand for', 'css stand for', 'js stand for', 'What is jQuery']
const answerList =['Document Object Model', 'Hypertext Markup Language', 'Casading stylesheet','javascript', 'javascript library']
const choiceList =[
    ['x', 'y', 'z'],
    ['a', 'b', 'c'],
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9']
]
var numberOfQuestion = 3
var score
var timeLeft = 0
var highscoreList = JSON.parse(localStorage.getItem('highscore'))||[]
var highscoreToggle = false
var timer
var index
var askedQuestion = []
// item selected in HTML DOM
var scoreList = document.querySelector('#highscore')
var scoreBtn = document.querySelector('#viewScore')

var question = document.querySelector('#question')
var feedback = document.querySelector('#questionFeedback')

var btnArea = document.querySelector('#questionAnswer')
var playerDetail = document.querySelector('#playerDetail')

var timerArea = document.querySelector('#timerArea')
var timerText = document.querySelector('#timer')
var penaltyText = document.querySelector('#penalty')



// initialization
function init(){
    scoreList.setAttribute('style', 'display:none;')
    feedback.setAttribute('style', 'display:none;')
    timerArea.setAttribute('style', 'display:none;')
    penaltyText.setAttribute('style','display: none;')
    showMenu()
}
init()

// utilities functions
function removeAllChild(element){
    for(var i = 0; i< element.children.length; i){
        element.children[i].remove()
    }
}

function clearBoard(){
    removeAllChild(btnArea)
    question.textContent = ''
}

// rendering functions
function toggleHighscore(){
    if (!highscoreToggle){
        scoreList.setAttribute('style', 'display: block;')
        scoreBtn.textContent = "Hide HighScore"
        highscoreToggle = true
        highscoreList = []
        highscoreList = JSON.parse(localStorage.getItem('highscore'))||[]
        for (var i = 0; i < highscoreList.length; i++){
            var liEl = document.createElement('li')
            var liText = highscoreList[i].name + " - " + highscoreList[i].score + " point(s)."
            liEl.textContent = liText
            scoreList.appendChild(liEl)
        }
    }
    else{
        scoreList.setAttribute('style', 'display: none;')
        scoreBtn.textContent = "Show HighScore"
        highscoreToggle = false
        removeAllChild(scoreList)
    }
    
}

function showQuestion(index){
    removeAllChild(btnArea)
    question.textContent = questionList[index]
}

function shuffleChoice(array){
    var currentIndex = array.length
    while(currentIndex > 0){
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
    }
    return array
}

function showMultipleChoice(index){
    var choices = choiceList[index].slice(0, choiceList[index].length)
    choices.push(answerList[index])
    choices = shuffleChoice(choices)
    for (var i = 0; i < choices.length; i++)
    {
        buttonElement = document.createElement('button')
        buttonElement.setAttribute('class', 'choice')
        buttonElement.textContent = choices[i]
        btnArea.appendChild(buttonElement)
    }
}

function pickAndDisplayQuestion(){
    clearBoard()
    if (askedQuestion.length < numberOfQuestion){
        index = Math.floor(Math.random()*questionList.length)
        while(askedQuestion.includes(index)){
            index = Math.floor(Math.random()*questionList.length)
        }
        askedQuestion.push(index)
        showQuestion(index)
        showMultipleChoice(index)
    }
    else{
        gameOver()
    }
}


// render time left and trigger game over if time's up
function showTimeRemaining(){
 
    if(timeLeft < 0){
        
        gameOver()
    }
    else{
        timerText.textContent = timeLeft
        timeLeft--
    }
        
}

function showMenu(){
    clearBoard()
    question.textContent= "Press the button below to start the game."
    removeAllChild(btnArea)
    startBtn = document.createElement("button")
    startBtn.setAttribute('id','startBtn')
    startBtn.textContent = "Start"
    btnArea.appendChild(startBtn)
}

function displayPenalty(){
    penaltyText.setAttribute('style','display: block;')
    var penaltyTime = 1
    var penaltyTimer = setInterval(function(){
        penaltyTime--
        if(penaltyTime === 0){
            clearInterval(penaltyTimer)
            penaltyText.setAttribute('style','display: none;')
        }
    }, 700)
}


// get Input and process input functions

// render input form and process the input
function getPlayerDetail(){
 var input = document.createElement('input')
 input.setAttribute('type', 'text')
 input.setAttribute('id', 'playerName')
 input.setAttribute('placeholder', 'Enter your initial')
 playerDetail.appendChild(input)
 var submit = document.createElement('button')
 submit.setAttribute('type', 'submit')
 submit.setAttribute('id', 'submit')
 submit.setAttribute('form', 'playerDetail')
 submit.textContent = "Submit"
 playerDetail.appendChild(submit)
}

// check if current record made it to top 10 - return -1 if not, return where it stands in top 10 if it made to top 10
function checkHighscore(){
    var localScore = score
    highscoreList = JSON.parse(localStorage.getItem('highscore'))||[]
    if (highscoreList.length < 10){
        return true
    }
    for (var i=0; i<highscoreList.length; i++){
        if(localScore >= highscoreList[i].score){
            return true
        }
    }
    return false
}

function updateHighscore(playerObj){
    highscoreList.push(playerObj)
    highscoreList.sort(function(a,b){return b.score - a.score})
    while (highscoreList.length > 10){
        highscoreList.pop()
    }
    localStorage.setItem('highscore', JSON.stringify(highscoreList))
}


// check button clicked and process according to that button
function checkButtonClicked(event){
    var target = event.target
    if(target.matches('.choice')){
        if(target.textContent === answerList[index]){
            score += 10
            feedback.textContent = 'Correct'
        }
        else{
            timeLeft -= 10
            displayPenalty()
            feedback.textContent = 'Wrong'
        }
        // display feedback
        feedback.setAttribute('style', 'display:block;')
        // timer to hide feedback
        var feedbackTimer = 1
        var showFeedback = setInterval(function(){
            feedbackTimer--
            if (feedbackTimer === 0){
                clearInterval(showFeedback)
                feedback.setAttribute('style','display:none;')
                feedback.textContent = ''
            }
        }, 700)

        // go to new question
        pickAndDisplayQuestion()
    }
    if(target.matches('#startBtn')){
        clearBoard()
        startGame()
    }

}

function playerDetailClicked(event){
    var target = event.target
    if (target.matches('#submit')){
        event.preventDefault()
        if(checkHighscore()){
            var playerName = document.querySelector('#playerName')
            if (playerName.value == ""){
                playerName.setAttribute("style","box-shadow: 0 0 3px red;")
                return
            }
            var playerObj = {
                name: playerName.value,
                score: score
            }
            
            updateHighscore(playerObj)
        }
        removeAllChild(playerDetail)
        showMenu()
    }
}

function startGame(){
    score = 0
    timeLeft = 100
    askedQuestion = []
    if(timerArea.getAttribute('style') === "display:none;"){
        timerArea.setAttribute('style','display:block;')
    }
    
    // call showTimeRemaining() for first time to display immediately, since setInterval got a delay before it was called
    showTimeRemaining()
    timer = setInterval(showTimeRemaining, 1000)
    pickAndDisplayQuestion()
}


function gameOver(){
    clearInterval(timer)
    clearBoard()
    question.textContent = "Game Over! Your score is " + score + "."
    getPlayerDetail()
}

// assign event linstener to buttons

scoreBtn.addEventListener('click', toggleHighscore)
btnArea.addEventListener('click', checkButtonClicked)
playerDetail.addEventListener('click', playerDetailClicked)