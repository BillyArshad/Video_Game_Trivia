const questions = [
    {
        question: "Which is the most successful battle royale game?",
        answers: [
            { text: "Call of Duty: Warzone", correct: false },
            { text: "Fortnite", correct: true },
            { text: "Apex Legends", correct: false },
            { text: "Royal Realm", correct: false },
        ]
    },
    {
        question: "Which is the most popular Fallout game, according to the community?",
        answers: [
            { text: "Fallout: New Vegas", correct: true },
            { text: "Fallout 4", correct: false },
            { text: "Fallout 2", correct: false },
            { text: "Fallout 76", correct: false },
        ]
    },
    {
        question: "Which game that won the game of the year 2022?",
        answers: [
            { text: "Horizon Forbidden West", correct: false },
            { text: "God of War: Ragnarok", correct: false },
            { text: "Elden Ring", correct: true },
            { text: "Overwatch 2", correct: false },
        ]
    },
    {
        question: "Which company that owns Activision-Blizzard?",
        answers: [
            { text: "Sony", correct: false },
            { text: "Amazon", correct: false },
            { text: "Nintendo", correct: false },
            { text: "Microsoft", correct: true },
        ]
    },
    {
        question: "What is Amicia's real surname?",
        answers: [
            { text: "De Rune", correct: true },
            { text: "De Stone", correct: false },
            { text: "De Slab", correct: false },
            { text: "De Bread", correct: false },
        ]
    },
    {
        question: "What is the first video game console?",
        answers: [
            { text: "Atari 2600", correct: false },
            { text: "Nintendo 64", correct: false },
            { text: "The Magnavox Odyssey", correct: true },
            { text: "Xbox 360", correct: false },
        ]
    },
    {
        question: "Which is the most successful PlayStation 3 ONLY exclusive game?",
        answers: [
            { text: "Infamous", correct: false },
            { text: "Killzone 2", correct: false },
            { text: "Uncharted", correct: false },
            { text: "The Last of Us", correct: true },
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("nxt-btn");

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
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;

        button.classList.add("btn");

        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();