// initialization constant
const questionList =['Which of the following oceans is not bordered by Australia?',
'Along with the kangaroo, which animal can be found only in Australia?',
'Which kind of landscape accounts for more than 40 per cent of Australia?',
'Which is the capital city of Australia?',
'When do people celebrate Australia Day, which is the anniversary of the start of the nation?',
'When an Aussie says: “I am knackered”, what does it mean?',
'Which natural structure located in central Australia is called “Uluru” by indigenous people?',
'What does the name “Australia” mean in Latin?',
'Which two cities in Australia used to host the Olympic Games?',
'Which event happened to Harold Holt, the Prime Minister of Australia, in 1967?',
'Anzac Day is a national day of remembrance in New Zealand and Australia to commemorate soldiers in which war?',
'The famous TV soap opera “Home and Away” is filmed on which famous beach?',
'How many states are there in Australia?',
'The badge of the state Tasmania features which animal?',
'The flag of which country is featured in the national flag of Australia?',
'Which of the following is an Australian rock band?',
'Before the name Australia was used, what did people call the country?',
'Which is the largest airline carrier in Australia in terms of fleet size?',
'The city of lights is the nickname of which Australian city?']
const answerList =['The Atlantic Ocean',
'Koala',
'Desert',
'Canberra',
'26 January',
'He is tired',
'Ayers Rock',
'Southern Land',
'Sydney and Melbourne',
'He disappeared at sea',
'World War I',
'Palm Beach',
'6',
'A red lion',
'The United Kingdom',
'AC/DC',
'New Holland',
'QANTAS',
'Perth']
const choiceList =[
    ['The Pacific Ocean', 'The Indian Ocean'],
    ['Lynx', 'Fjord horse'],
    ['Forest', 'Mountain'],
    ['Sydney', 'Melbourne'],
    ['8 April', '17 August'],
    ['He is angry', 'He is excited'],
    ['Fraser Island', 'The Pinnacles'],
    ['Secret Land', 'Free Land', 'Big Land'],
    ['Canberra and Sydney','Melbourne and Canberra'],
    ['He died in a car crash','He was assassinated'],
    ['World War II','Vietnam War'],
    ['Bondi Beach', 'Maroubra Beach'],
    ['4','8'],
    ['A piping shrike','A black swan'],
    ['Ireland', 'Holland'],
    ['Scorpions','Kent'],
    ['New Ireland', 'New England'],
    ['Virgin Australia','Jetstar'],
    ['Darwin','Brisbane']
]

// initialization variable
var numberOfQuestion = 0
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
var scoreText = document.querySelector('#currentScore')
var scoreArea = document.querySelector('#scoreArea')
var highscoreArea = document.querySelector('#highscoreArea')

var question = document.querySelector('#question')
var feedback = document.querySelector('#questionFeedback')
var feedbackArea = document.querySelector('#feedbackArea')

var btnArea = document.querySelector('#questionAnswer')
var playerDetail = document.querySelector('#playerDetail')

var timerArea = document.querySelector('#timerArea')
var timerText = document.querySelector('#timer')
var penaltyText = document.querySelector('#penalty')



// initialization
function init(){
    scoreList.setAttribute('style', 'display:none;')
    feedback.textContent = ''
    timerText.textContent = ''
    penaltyText.textContent = ''
    feedbackArea.setAttribute('style', 'display: none;')
    scoreArea.setAttribute('style', 'display: none !important;')
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

// render HighScore list
function displayHighScore(){
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
    clearBtn = document.createElement('button')
    clearBtn.textContent = "Clear HighScore"
    clearBtn.setAttribute('id','clearHSBtn')
    clearBtn.setAttribute('class','my-3')
    
}

// remove HighScore list from screen
function hideHighScore(){
    scoreList.setAttribute('style', 'display: none;')
    scoreBtn.textContent = "Show HighScore"
    highscoreToggle = false
    removeAllChild(scoreList)
    
}

// handle Show/Hide HighScore button click
function toggleHighscore(){
    if (!highscoreToggle){
        displayHighScore()
        highscoreArea.appendChild(clearBtn)
    }
    else{
        hideHighScore()
        highscoreArea.children[2].remove()
    }
    
}

// handle clear Highscore button click
function highscoreAreaClicked(event){
    var target =event.target
    if (target.matches('#clearHSBtn')){
        highscoreList=[]
        localStorage.setItem('highscore', JSON.stringify(highscoreList))
        removeAllChild(scoreList)
    }
    
}

// display the question
function showQuestion(index){
    removeAllChild(btnArea)
    question.textContent = questionList[index]
}

// randomize the choice for no copycat
function shuffleChoice(array){
    var currentIndex = array.length
    while(currentIndex > 0){
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
    }
    return array
}

// display multiple choice buttons
function showMultipleChoice(index){
    var choices = choiceList[index].slice(0, choiceList[index].length)
    choices.push(answerList[index])
    choices = shuffleChoice(choices)
    for (var i = 0; i < choices.length; i++)
    {
        buttonElement = document.createElement('button')
        buttonElement.setAttribute('class', 'choice row my-2')
        buttonElement.textContent = choices[i]
        btnArea.appendChild(buttonElement)
    }
}

// get random question and display it
function pickAndDisplayQuestion(){
    clearBoard()

    
    if (askedQuestion.length < numberOfQuestion){
        index = Math.floor(Math.random()*questionList.length)

        // roll index until find a question that has not been asked
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
        timerText.textContent = 'Time: ' + timeLeft
        timeLeft--
    }
        
}

// display main menu for re-play
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
    penaltyText.textContent="-10s"
    var penaltyTime = 1
    var penaltyTimer = setInterval(function(){
        penaltyTime--
        if(penaltyTime === 0){
            clearInterval(penaltyTimer)
            penaltyText.textContent = ''
        }
    }, 700)
}

function displayScore(){
    scoreArea.setAttribute('style', 'display: flex !important;')
    scoreText.textContent = score
}



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

// check if current record made it to top 10 - return true is got into top 10, false if not
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

// added score to highscore, sort it to the appopriate position
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
            displayScore()
        }
        else{
            timeLeft -= 10
            displayPenalty()
            feedback.textContent = 'Wrong'
        }
        // timer to hide feedback
        var feedbackTimer = 1
        var showFeedback = setInterval(function(){
            feedbackTimer--
            if (feedbackTimer === 0){
                clearInterval(showFeedback)
                
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

// function for submiting the score
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
        timerText.textContent =''
        scoreArea.setAttribute('style', 'display: none !important;')
        showMenu()

        // re-rendering Highscore if Highscore list is changed
        if(highscoreToggle){
            removeAllChild(scoreList)
            displayHighScore()
        }
        else{
            toggleHighscore()
        }
        
    }
}

// start the game
function startGame(){
    score = 0
    timeLeft = 100
    numberOfQuestion = 10
    if (numberOfQuestion > questionList.length){
        numberOfQuestion = questionList.length
    }
    askedQuestion = []
    if(timerArea.getAttribute('style') === "display:none;"){
        timerArea.setAttribute('style','display:block;')
    }
    feedbackArea.setAttribute('style','display:block;')
    scoreText.textContent = score
    // call showTimeRemaining() for first time to display immediately, since setInterval got a delay before it was called
    displayScore()
    showTimeRemaining()
    timer = setInterval(showTimeRemaining, 1000)
    pickAndDisplayQuestion()
}

// end the game
function gameOver(){
    clearInterval(timer)
    clearBoard()
    feedbackArea.setAttribute('style','display:none;')
    question.textContent = "Game Over! Your score is " + score + "."
    getPlayerDetail()
}

// assign event linstener to buttons

scoreBtn.addEventListener('click', toggleHighscore)
btnArea.addEventListener('click', checkButtonClicked)
playerDetail.addEventListener('click', playerDetailClicked)
highscoreArea.addEventListener('click', highscoreAreaClicked)