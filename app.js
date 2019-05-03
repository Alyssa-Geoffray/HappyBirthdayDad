//europe trivia game

$(document).ready(function () {

    //function to keep earth gif moving
    function validateField() { 
        var docs = document.getElementById("img");
        docs.setAttribute("src", "gif_path");
        };

    //generates initial screen / home page
    function initialScreen() {
        startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block startbtn' href='#' role='button'>Click Here To Start</a></p>";
        $(".mainDiv").html(startScreen);
    }

    initialScreen();

    //when the user clicks 'start'
    $("body").on("click", ".startbtn", function (event) {
        event.preventDefault();  // added line to test scrolling issue
        clickSound.play();
        generateHTML();
        timerWrapper();
    });

    //when the user clicks on an answer
    $("body").on("click", ".answer", function (event) {
        //correct answer
        // clickSound.play();    
        selectedAnswer = $(this).text();
        if (selectedAnswer === correctAnswers[questionCounter]) {
            clearInterval(theClock);
            generateWin();
        }
        else {
            //wrong answer
            clearInterval(theClock);
            generateLoss();
        }
    });

    //when user clicks 'play again' after a game ends
    $("body").on("click", ".resetBtn", function (event) {
        clickSound.play();
        resetGame();
    });

});

//if the user does not select an answer before the timer runs out
function userLossTimeOut() {
    unansweredTally++;
    gameHTML =  correctAnswers[questionCounter] + "" + losingImages[questionCounter];
    $(".mainDiv").html(gameHTML);
    setTimeout(wait, 5000); 
}

//if the user selects the correct answer
function generateWin() {
    correctTally++;
    gameHTML = "<p class='text-center timerText'></p>" + "<p class='text-center msg'>" + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
    $(".mainDiv").html(gameHTML);
    setTimeout(wait, 5000); 
}

//if the user selects the wrong answer
function generateLoss() {
    incorrectTally++;
    gameHTML = correctAnswers[questionCounter] + "" + losingImages[questionCounter];
    $(".mainDiv").html(gameHTML);
    setTimeout(wait, 5000); 
}

// YOU CAN PUT BUTTONS HERE <p class='firstAnswer answer'>TEXTHERE</p> TO GENERATE BUTTONS AND CLICK THROUGH EVERY OTHER PIC
//function to generate possible answers for each question
function generateHTML() {
    gameHTML =  answerArray[questionCounter] +"<p class='text-center msg'>" + questionArray[questionCounter] + "</p>";
    $(".mainDiv").html(gameHTML);
}

//function to check if there are more questions
//after each question, it will either show the next question or generate the final 'game-over' page
function wait() {
    if (questionCounter < 7) {
        questionCounter++;
        generateHTML();
        counter = 5;
        timerWrapper();
    }
    else {
        finalScreen();
    }
}

//function to give each question 20 seconds, show countdown in html, and generate loss if player does not select an answer in time
function timerWrapper() {
    theClock = setInterval(twentySeconds, 1000);
    function twentySeconds() {
        if (counter === 0) {
            clearInterval(theClock);
            userLossTimeOut();
        }
        if (counter > 0) {
            counter--;
        }
        $(".timer").html(counter);
    }
}


//function for when it's game over
function finalScreen() {

    // unique end-game message if the user got a perfect score of 8
    if (correctTally === 8) {
        gameHTML = "<p class='text-center timerText'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>100%! You got a perfect score!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center resetBtn-container'><a class='btn btn-primary btn-lg btn-block resetBtn' href='#' role='button'>Watch Again</a></p>";
        $(".mainDiv").html(gameHTML);
    } 
    //if correct tally is 5-7 out of 8
    else if (correctTally < 8 && correctTally > 4) {
        gameHTML = "<p class='text-center timerText'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Game Over! You did great!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center resetBtn-container'><a class='btn btn-primary btn-lg btn-block resetBtn' href='#' role='button'>Watch Again</a></p>";
        $(".mainDiv").html(gameHTML);
    }
    //if tally is 4 out of 8
    else if (correctTally === 4) {
        gameHTML = "<p class='text-center timerText'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Game Over! You scored 50%." + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center resetBtn-container'><a class='btn btn-primary btn-lg btn-block resetBtn' href='#' role='button'>Watch Again</a></p>";
        $(".mainDiv").html(gameHTML);
    }
    //if correct tally is between 1-3
    else if (correctTally < 4 && correctTally != 0) {
        gameHTML = "<p class='text-center timerText'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Game Over! You need to stay in school." + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center resetBtn-container'><a class='btn btn-primary btn-lg btn-block resetBtn' href='#' role='button'>Watch Again</a></p>";
        $(".mainDiv").html(gameHTML);
    }
    //if the correct tally is zero
    else { 
        gameHTML = "<p class='text-center timerText msg finalmsg'>YOU DA BEST!<br><img src='https://i.imgur.com/FpJ79Ry.gif' class='picDisplay noBorder'></p>" + "<p class='text-center'></p>" + "<p class='summary-correct'></p>" + "<p class='text-center resetBtn-container'><a class='btn btn-primary btn-lg btn-block resetBtn' href='#' role='button'>Replay</a></p>";
        $(".mainDiv").html(gameHTML);
    }
}

//function to reset game (function called when player presses button to restart the game)
function resetGame() {
    questionCounter = 0;
    correctTally = 0;
    incorrectTally = 0;
    unansweredTally = 0;
    counter = 5;
    generateHTML();
    timerWrapper();
}



//set counter to 20
var counter = 5;

//set questions (in the form of an image) inside array
// 1. Dad Peace. 2 Life Lessons (fishing, stick shift). 3. me&ryan(protection&security), 4. pets(animals), 5. accident(worst times), 6. graduation(best times), 7. trumpcard (mysideofthewall), 8. dad definition meme
var questionArray = ["<img class='picDisplay' src='https://i.imgur.com/qyV2PZi.jpg'></img>", "<img class='picDisplay' src='https://i.imgur.com/iVsUQAt.jpg'></img>", "<img class='picDisplay' src='https://i.imgur.com/z5dQEDm.jpg'></img>", "<img class='picDisplay' src='https://i.imgur.com/aFHg4bE.png'></img>", "<img class='picDisplay' src='https://i.imgur.com/qYI09Uj.png?1'></img>", "<img class='picDisplay' src='https://i.imgur.com/JE6Hti6.png?1'></img>", "<img class='picDisplay' src='https://i.imgur.com/EMexd30.jpg'></img>", "<img class='picDisplay' src='https://i.imgur.com/MoTyO04.jpg'></img>"];

//set possible answers inside array, matching each object's index number to the correlating question image
//  1. Snack Faces
var answerArray = [["<p class='text-center msg'>I love you SOOO much. Do you know why?</p>"], ["<p class='text-center msg'>You taught us life skills</p>"], ["<p class='text-center msg'>You always kept us safe and warm and fed, no matter how hard it was</p>"], ["<p class='text-center msg'>You are kind to animals</p>"], ["<p class='text-center msg'>You were there at my toughest moments</p>"], ["<p class='text-center msg'>You're there to support us at the best times, too!</p>"], [ "<p class='text-center msg' I can't imagine my life without you in it!</p>"], ["<p class='text-center msg'>And these are just a few of the reasons why...</p>"]];

//array of images to display after the user selects a right answer
// img array same as losingimages array
//1. snack faces. 2 Beans Beans magical fruit. 3. gram(good friend), 4. rock, 5. lucky(thanks you), 6. dadlookuptomeme(supportive), 7. lays(smile), 8. happy bday dad meme
var imageArray = ["<img class='center-block img-right picDisplay' src='https://i.imgur.com/JS7TCzh.jpg'>", "<img class='center-block img-right picDisplay' src='https://i.imgur.com/rzezxUM.png?1'>", "<img class='center-block img-right picDisplay' src='https://i.imgur.com/MHjSnmZ.jpg'>", "<img class='center-block img-right picDisplay noBorder' src='https://i.imgur.com/BPCNQQ3.png'>", "<img class='center-block img-right picDisplay' src='https://i.imgur.com/acB9JRa.jpg'>", "<img class='center-block img-right picDisplay' src='https://i.imgur.com/OCSQKgZ.jpg'>", "<img class='center-block img-right picDisplay' src='https://i.imgur.com/bFRQtDb.jpg'>", "<img class='center-block img-right picDisplay' src='https://i.imgur.com/gXVMHGy.jpg'>"];

//array of images to display after the user selects a wrong answer
var losingImages = ["<img class='center-block img-right picDisplay' src='https://i.imgur.com/JS7TCzh.jpg'>", "<img class='center-block img-right picDisplay' src='https://i.imgur.com/rzezxUM.png?1'>", "<img class='center-block img-right picDisplay' src='https://i.imgur.com/MHjSnmZ.jpg'>", "<img class='center-block img-right picDisplay noBorder' src='https://i.imgur.com/BPCNQQ3.png'>", "<img class='center-block img-right picDisplay' src='https://i.imgur.com/acB9JRa.jpg'>", "<img class='center-block img-right picDisplay' src='https://i.imgur.com/OCSQKgZ.jpg'>", "<img class='center-block img-right picDisplay' src='https://i.imgur.com/bFRQtDb.jpg'>", "<img class='center-block img-right picDisplay' src='https://i.imgur.com/gXVMHGy.jpg'>"];

//set correct answers inside array, index numbers matching the correlating question
var correctAnswers = [ "<p class='text-center msg'>You are hilarious</p>", "<p class='text-center msg'>You taught me the comedic value of flatulence</p>", "<p class='text-center msg'>You are a great friend</p>", "<p class='text-center msg'>You are my ROCK</p>", "<p class='text-center msg'>Even Lucky is blown away by all the love and sacrifices you make</p>", "<p class='text-center msg'>You never gave up on me</p>", "<p class='text-center msg'>It's hard not to smile knowing you are my Dad</p>", "<p class='text-center msg'>I love you SO much!</p>"];

//other empty variables or number variables set to zero
var questionCounter = 0;
var startScreen;
var gameHTML;
var selecterAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;

//variable to store audio for the game
var clickSound = new Audio("BuildThatWallRMX2.mp3");



