const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('nxt-btn');

let currentQuestionIndex = 0;
let score = 0;
let questions;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Next';
    showQuestion();
}

function getQuestions() {
    fetch('assets/js/questions.json')
        .then((res) => res.json())
        .then((result) => {
            questions = result;
            startQuiz();
        });
}

/**
 * Shows the next question and populates answers
 */
function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    const questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + '.' + currentQuestion.question;

    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');

        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
    });
}

// Resets the game state
function resetState() {
    nextButton.style.display = 'none';
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';
    if (isCorrect) {
        selectedBtn.classList.add('correct');
        score++;
    } else {
        selectedBtn.classList.add('incorrect');
    }
    Array.from(answerButtons.children).forEach((button) => {
        if (button.dataset.correct === 'true') {
            button.classList.add('correct');
        }
        button.disabled = true;
    });
    nextButton.style.display = 'block';
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = 'Play Again?';
    nextButton.style.display = 'block';
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

getQuestions();