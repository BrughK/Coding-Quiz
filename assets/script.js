// Query Selectors
var welcome = document.querySelector("#introduction");
var startBtn = document.querySelector("#start_button");
var introPage =document.querySelector("#intro_page");

var questionPage = document.querySelector("#question_page");
var askQuestion = document.querySelector("#ask_question");

var reactButtons = document.querySelectorAll(".choices");
var answerBtn1 = document.querySelector("#answer_btn1");
var answerBtn2 = document.querySelector("#answer_btn2");
var answerBtn3 = document.querySelector("#answer_btn3");
var answerBtn4 = document.querySelector("#answer_btn4");

var checkLine = document.querySelector("#check_line");
var scoreBoard = document.querySelector("#submit_page");
var finalScore = document.querySelector("#final_score");
var userInitial =document.querySelector("#initial");

var submitBtn =document.querySelector("#submit_btn");
var highScorePage =document.querySelector("#highscore_page");
var scoreRecord =document.querySelector("#score_record");
var scoreCheck =document.querySelector("#score_check");
var finish =document.querySelector("#finish");

var backBtn =document.querySelector("#back_btn");
var clearBtn=document.querySelector("#clear_btn");

// Question list
var questionList = [
    {
        question: "Commonly used data types DO NOT include:",
        choices: ["a. Strings", "b. Booleans", "c. Alerts", "d. Numbers"],
        answer: "c"
    },
    {
        question: "String values must be enclosed within _____ when being assigned to variables.",
        choices: ["a. Commas", "b. Curly brackets", "c. Quotes", "d. Parenthesis"],
        answer: "c"
    },
    {
        question: "Arrays in JavaScript can be used to store ___.",
        choices: ["a. Numbers & Strings", "b. Other Arrays", "c. Booleans", "d. All of The Above"],
        answer: "d"
    },
    {
        question: "A very useful tool in debugging and for printing content to the debugger is:",
        choices: ["a. JavaScript", "b. Terminal/Bash", "c. For Loops", "d. Console.Log"],
        answer: "d"
    },
    {
        question: "The condition in an if/else statement is enclosed with ____.",
        choices: ["a. Quotes", "b. Curly Brackets", "c. Parenthesis", "d. Square Brackets"],
        answer: "c"
    }
];

var timeLeft = document.getElementById("timer");
var secondsLeft = 75;
var questionNumber = 0;
var totalScore = 0;
var questionCount = 1;

// Timer count down funciton
function countdown() {
        
        var timerInterval = setInterval(function () {

          secondsLeft--;
          timeLeft.textContent = "Time left: " + secondsLeft + " s";
    
            if (secondsLeft <= 0){
                clearInterval(timerInterval);
                timeLeft.textContent = "Time's Up!"; 
                // if time is up, show on score board content instead of "all done!"
                finish.textContent = "Time's Up!";
                gameOver();

            } else  if(questionCount >= questionList.length +1) {
                clearInterval(timerInterval);
                gameOver();
                } 
    }, 1000);
}

// Start Quiz Function
function startQuiz () {
        introPage.style.display = "none";
        questionPage.style.display = "block";
        questionNumber = 0
        countdown();
        showQuestion(questionNumber);
      
}

// Diplay the actual question
function showQuestion (n) {
        askQuestion.textContent = questionList[n].question;
        answerBtn1.textContent = questionList[n].choices[0];
        answerBtn2.textContent = questionList[n].choices[1];
        answerBtn3.textContent = questionList[n].choices[2];
        answerBtn4.textContent = questionList[n].choices[3];
        questionNumber = n;
    }

function checkAnswer(event) {
    event.preventDefault();
    // Making the right or wrong display
    checkLine.style.display = "block";
    setTimeout(function () {
        checkLine.style.display = 'none';
    }, 1000);

    // Checking for the right answer
    if (questionList[questionNumber].answer == event.target.value) {
        checkLine.textContent = "Correct!"; 
        checkLine.style.color = "green"; 
        totalScore = totalScore + 10;

    } else {
        secondsLeft = secondsLeft - 10;
        checkLine.textContent = "Wrong!";
        checkLine.style.color = "red"; 
    }

    if (questionNumber < questionList.length -1 ) {
        showQuestion(questionNumber +1);
    } else {
    gameOver();
}
questionCount++;
}

// End the game
function gameOver() {

        questionPage.style.display = "none";
        scoreBoard.style.display = "block";
        console.log(scoreBoard);
        // display the final score
        finalScore.textContent = "Your final score is:  " + totalScore ; 
        timeLeft.style.display = "none"; 
};

// get current score and initials from local storage
function getScore () {
    var currentList =localStorage.getItem("ScoreList");
    if (currentList !== null ){
        freshList = JSON.parse(currentList);
        return freshList;
    } else {
        freshList = [];
    }
    return freshList;
};


// Posts score to scoreboard and only keeps the top 5 highest scores
function renderScore () {
    scoreRecord.innerHTML = "";
    scoreRecord.style.display ="block";
    var highScores = sort();   
    var topFive = highScores.slice(0,5);
    for (var i = 0; i < topFive.length; i++) {
        var item = topFive[i];
    var li = document.createElement("li");
    li.textContent = item.user + " - " + item.score;
    li.setAttribute("data-index", i);
    scoreRecord.appendChild(li);
    }
};

// ranking the highscore list
function sort () {
    var unsortedList = getScore();
    if (getScore == null ){
        return;
    } else{
    unsortedList.sort(function(a,b){
        return b.score - a.score;
    })
    return unsortedList;
}};

// puts scores in Local Storage
function addItem (n) {
    var addedList = getScore();
    addedList.push(n);
    localStorage.setItem("ScoreList", JSON.stringify(addedList));
};

function saveScore () {
    var scoreItem ={
        user: userInitial.value,
        score: totalScore
    }
    addItem(scoreItem);
    renderScore();
}

// Event Listeners
// Start Quiz
startBtn.addEventListener("click", startQuiz);

// Next Question
reactButtons.forEach(function(click){
    click.addEventListener("click", checkAnswer);
});

// Saves the initials and goes to next part
submitBtn.addEventListener("click", function(event) {
    event.preventDefault();
    scoreBoard.style.display = "none";
    introPage.style.display = "none";
    highScorePage.style.display = "block";
    questionPage.style.display ="none";
    saveScore();
});

// views the highscore list
scoreCheck.addEventListener("click", function(event) {
    event.preventDefault();
    scoreBoard.style.display = "none";
    introPage.style.display = "none";
    highScorePage.style.display = "block";
    questionPage.style.display ="none";
    renderScore();
});

// Home page
backBtn.addEventListener("click",function(event){
        event.preventDefault();
        scoreBoard.style.display = "none";
        introPage.style.display = "block";
        highScorePage.style.display = "none";
        questionPage.style.display ="none";
        location.reload();
});

// Clear the scores
clearBtn.addEventListener("click",function(event) {
    event.preventDefault();
    localStorage.clear();
    renderScore();
});