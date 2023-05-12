// list all variables first
var startScreen = document.querySelector("#start");
var startBtn = document.querySelector("#start-btn");
var infoBox = document.querySelector(".info-box");
var exitBtn = document.querySelector(".quit");
var continueBtn = document.querySelector(".restart");
var quizBox = document.querySelector(".quiz-box");
var endBox = document.querySelector("#quiz-end");
var submitBtn = document.querySelector("#save-score");
var nameText = document.querySelector("#name");
var existing = localStorage.getItem('results');
existing = existing ? existing.split(',') : []; // this will start the quiz and split your choices
var queCount = 0;
var counter = 60;
var score = 0;

continueBtn.onclick = () => {
    infoBox.classList.add("hide");
    startScreen.classList.remove("hide");
};

// this will start the game with the start button
startBtn.onclick = () => {
    function countdown() {
        counter--;
        if (counter <= 0) {
            clearInterval(startCountdown)
            quizEnd()
        };
        let timeRem = document.querySelector("#time-rem");
        let timeTag = "<span>Time Remaining: " + counter + "</span>"
        timeRem.innerHTML = timeTag;
    };
    var startCountdown = setInterval(countdown, 1000);
    startScreen.classList.add("hide");
    quizBox.classList.remove("hide");
    showQuestions(queCount)
};

// this will pull all the questions from our array into the option list box for answers and questions
function showQuestions(index) {
    if (queCount >= 10) {
        return;
    }
    var queText = document.querySelector(".que-text");
    var optionList = document.querySelector("#choices");
    let queTag = "<span>" + questions[index].numb + ". " + questions[index].question + "</span>";
    let optionTag = '<div class="option">' + questions[index].options[0] + '<span></span></div>'
        + '<div class="option">' + questions[index].options[1] + '<span></span></div>'
        + '<div class="option">' + questions[index].options[2] + '<span></span></div>'
        + '<div class="option">' + questions[index].options[3] + '<span></span></div>'
    queText.innerHTML = queTag;
    optionList.innerHTML = optionTag;
    var option = optionList.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

//this will give you the next question based on your response action , whether you get it worng or right it doesn't matter
function optionSelected(answer) {
    if (queCount >= 10) {
        return;
    }
    let userAns = answer.textContent;
    let correctAns = questions[queCount].answer;
    if (userAns == correctAns) {
        var response = document.querySelector("#response");
        response.innerHTML = '<div id="response"><span>Correct!</span></div>';
        setTimeout(nextQuestion, 500)
        score += 1

    } else {
        var response = document.querySelector("#response");
        response.innerHTML = '<div id="response"><span>Wrong!</span></div>';
        setTimeout(nextQuestion, 500)
        counter -= 4
    }
}
// this will give you the next question until question 10 to be used in the above function for selecting answers as well
function nextQuestion() {
    queCount++;
    if (queCount == 10) {
        quizEnd()
    };
    showQuestions(queCount);
    var response = document.querySelector("#response");
    response.innerHTML = '<div id="response"><span></span></div>';
}

//this will end quiz if timer runs out or quetsions are finished
function quizEnd() {
    quizBox.classList.add("hide");
    endBox.classList.remove("hide");
    var scoreText = document.querySelector(".score");
    let scoreTag = '<h3 class="score"> Your score is ' + score + ' out of 10!</h3>';
    scoreText.innerHTML = scoreTag;
}
//this will submit your highscore name to local storage using json
submitBtn.onclick = () => {
    let name = nameText.value;
    var resultsDataObj = {
        name: name,
        score: score
    }
    localStorage.setItem((localStorage.length + 1), JSON.stringify(resultsDataObj));
    nameText.value = ""
    location.reload();
}

//10 questions for the quiz laid out here
let questions = [
    {
        numb: 1,
        question: "Which of these types of candy is the most popular in the USA during Halloween?",
        answer: "Reeses ",
        options: [
            "M&Ms",
            "Milk Duds",
            "Reeses",
            "Snickers"
        ]
    },
    {
        numb: 2,
        question: "Whats the name of the activity that involves grabbing floating fruit with your teeth?",
        answer: "Apple bobbing",
        options: [
            "Apple bobbing",
            "Dipping for pears",
            "Gone pineapple fishing",
            "Thats my tomato!",
        ]
    },
    {
        numb: 3,
        question: "In which country did Halloween start?",
        answer: "Ireland",
        options: [
            "Brazil",
            "Ireland",
            "India",
            "None of the above",
        ]
    },
    {
        numb: 4,
        question: "Which of these is not a traditional Halloween decoration?",
        answer: "Wreath",
        options: [
            "Cauldron",
            "Candle",
            "Witch",
            "Wreath",
        ]
    },
    {
        numb: 5,
        question: "The modern classic The Nightmare Before Christmas was released in what year?",
        answer: "1993",
        options: [
            "1987",
            "1993",
            "1999",
            "2003",
        ]
    },
    {
        numb: 6,
        question: "Wednesday Addams is which member of the Addams family?",
        answer: "Daughter",
        options: [
            "Daughter",
            "Mother",
            "Father",
            "Son",
        ]
    },
    {
        numb: 7,
        question: "What was candy corn originally called?",
        answer: "Chicken Feed",
        options: [
            "Chicken Feed",
            "Pumpkin corn",
            "Chicken wings",
            "Air heads",
        ]
    },
    {
        numb: 8,
        question: "The word “Halloween” means what?",
        answer: "Saints evening",
        options: [
            "Scary night",
            "Saints evening",
            "Reunion day",
            "None of the above.",
        ]
    },
    {
        numb: 9,
        question: "What is the most popular Halloween costume for pets?",
        answer: "pumpkin",
        options: [
            "spiderman",
            "pumpkin",
            "witch",
            "tinker bell",
        ]
    },
    {
        numb: 10,
        question: "Where is the biggest Halloween parade in the US thrown?",
        answer: "New york",
        options: [
            "New york",
            "Orlando ",
            "Miami beach",
            "Texas",
        ]
    }
];
