//dom elements
const startScreen = document.getElementById("start-screen");
const practicalScreen = document.getElementById("practical-screen");
const resultScreen  = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

 
const practicalQuestions = [
    {
        question: "what is the capital of Uganda?",
        answers: [
            {text: "Arusha",correct: false},
            {text: "Kagali",correct: false},
            {text: "Kampala",correct: true},
            {text: "Soroti",correct: false},
        ],
    },
    {
        question: "who is the current president of Uganda?",
        answers: [
            {text: "Bobi Wine",correct: false},
            {text: "Museveni Kaguta",correct: true},
            {text: "Adones",correct: false},
            {text: "Kamukama",correct: false},
        ],
    },
    {
        question: "who heads the country?",
        answers: [
            {text: "President",correct: true},
            {text: "Minister",correct: false},
            {text: "Speaker",correct: false},
            {text: "Lecturer",correct: false},
        ],
    },
    {
        question: "what is the second best university in Uganda?",
        answers: [
            {text: "Makerere",correct: false},
            {text: "Mountain of the moon",correct: false},
            {text: "Kabale University",correct: false},
            {text: "Mbarara University",correct: true},
        ],
    },
    {
        question: "when did Uganda get independence?",
        answers: [
            {text: "2001",correct: false},
            {text: "2025",correct: false},
            {text: "1961",correct: false},
            {text: "1962",correct: true},
        ],
    },
];

//practical variables
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent  = practicalQuestions.length;
maxScoreSpan.textContent = practicalQuestions.length;

//event listeners
startButton.addEventListener("click",startPractical);
restartButton.addEventListener("click",restartPractical);

function startPractical(){
    //console.log("Practical started");
    //reset variables
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = 0;

    startScreen.classList.remove("active");
    practicalScreen.classList.add("active");
     
    showQuestion();
}
function showQuestion(){
    //reset state
    answersDisabled = false;
    const currentQuestion = practicalQuestions[currentQuestionIndex];
    currentQuestionSpan.textContent = currentQuestionIndex + 1;
    const progressPercent = (currentQuestionIndex/practicalQuestions.length)*100;
    progressBar.style.width = progressPercent + "%";
    questionText.textContent = currentQuestion.question;

    //explain in secs
    
    answersContainer.innerHTML = "";

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");
    //a dataset is used to store custom data 
        button.dataset.correct = answer.correct;
        button.addEventListener("click",selectAnswer);
        answersContainer.appendChild(button);
        });
}
function selectAnswer(event){
if(answersDisabled) return;
answersDisabled = true;

const selectedButton =  event.target;
const isCorrect = selectedButton.dataset.correct === "true";

Array.from(answersContainer.children).forEach(button => {
    if(button.dataset.correct === "true"){
        button.classList.add("correct");
    }else if (button === selectedButton){
        button.classList.add("incorrect");
    }
});
if(isCorrect){
    score++;
    scoreSpan.textContent = score;
}
setTimeout(()=>{
    currentQuestionIndex++;
    //check if there are more qns
if(currentQuestionIndex < practicalQuestions.length ){
    showQuestion();
}else{
    showResult();
}
},1000);

}
function showResult(){
    practicalScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScoreSpan.textContent = score;
    const percentage = (score/practicalQuestions.length)*100;

    if(percentage === 100){
        resultMessage.textContent = "best of the best";
    }else if(percentage >= 50){
        resultMessage.textContent = "aim higher";
    }else{
        resultMessage.textContent = "visit your lecturer";
    }
}
function restartPractical(){
    //console.log("Practical restarted");
    resultScreen.classList.remove("active");
    
    startPractical();
}
const questionEl = document.getElementById("question");
if (questionEl) {
  questionEl.innerHTML = "Some text";
} else {
  console.warn("Element with ID 'question' not found.");
}
document.addEventListener("DOMContentLoaded", function () {
  showQuestion();
});
