const questions = [
    {
        question: "কোটা আন্দোলনে প্রথম শহীদ কে?",
        answers: [
            {text: "ক.আবু সাইদ", correct: true},
            {text: "খ.মুগ্ধ", correct: false},
        ]
    },
    {
        question: "কোটা আন্দোলনের সময় কতদিন মোবাইল ইন্টারনেট বন্ধ ছিল?",
        answers: [
            {text: "ক.১৬দিন ", correct: false},
            {text: "খ.১০দিন", correct: true},
        ]
    },
    {
        question: "কোটা আন্দোলন কত তারিখ শুরু হয়?",
        answers: [
            {text: "ক.৪জুলাই", correct: false},
            {text: "খ.৫জুন", correct: true},
        ]
    },
    {
        question: "শহিদ আবু সাইদ কত তারিখ মৃত্যুবরণ করেন?",
        answers: [
            {text: "ক.২৩জুলাই", correct: false},
            {text: "খ.১৬জুলাই", correct: true},
        ]
    },
    {
        question: "বাংলাদেশ দ্বিতীয় স্বাধীন কত তারিখ অর্জন করেন?",
        answers: [
            {text: "ক.১৪জুলাই", correct: false},
            {text: "খ.৫আগস্ট", correct: true},
        ]
    }
];

const question = document.querySelector("#question");
const ansButtons = document.querySelector("#ans-buttons");
const nextButton = document.querySelector("#next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    const questionNo = currentQuestionIndex+1;
    question.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        ansButtons.appendChild(button);
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);
    })
}

function resetState() {
    nextButton.style.display = "none";
    while(ansButtons.firstChild) {
        ansButtons.removeChild(ansButtons.firstChild);
    }
}


function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    }else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(ansButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    question.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else {
        showScore();
    }
}


nextButton.addEventListener("click", ()=> {
    if(currentQuestionIndex < questions.length) {
        handleNextButton();
    }else {
        startQuiz();
    }
})

startQuiz();