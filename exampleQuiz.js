const quizzes = [
    {
        question: "What is the first book of the Bible?",
        choices: ["Exodus", "Genesis", "Leviticus", "Numbers"],
        correct: 1
    },
    {
        question: "Who built the ark?",
        choices: ["Moses", "Noah", "Abraham", "Jacob"],
        correct: 1
    },
    // Add more quiz objects here
];

let currentQuestionIndex = 0;
let score = 0;

function loadQuestion(index) {
    const questionElement = document.getElementById('question');
    const choicesElement = document.getElementById('choices');
    const nextButton = document.getElementById('nextButton');
    const retryButton = document.getElementById('retryButton');
    const completeMessage = document.getElementById('completeMessage');
    const scoreElement = document.getElementById('score');
    
    // Clear previous choices
    choicesElement.innerHTML = '';

    // Load new question
    const quiz = quizzes[index];
    questionElement.textContent = quiz.question;

    // Load new choices
    quiz.choices.forEach((choice, i) => {
        const li = document.createElement('li');
        const button = document.createElement('button');
        button.textContent = choice;
        button.onclick = () => checkAnswer(button, i === quiz.correct);
        li.appendChild(button);
        choicesElement.appendChild(li);
    });

    // Hide the next, retry buttons and complete message
    nextButton.style.display = 'none';
    nextButton.disabled = true;
    retryButton.style.display = 'none';
    completeMessage.style.display = 'none';

    // Hide the score initially
    if (index === 0) {
        scoreElement.classList.add('hidden');
    }
}

function checkAnswer(button, isCorrect) {
    if (isCorrect) {
        button.classList.add('correct');
        button.classList.add('correct-hover');
        alert('Correct answer!');
        score += 1;
    } else {
        button.classList.add('incorrect');
        button.classList.add('incorrect-hover');
    }
    updateScore();
    
    // Disable all buttons after an answer is selected
    const buttons = document.querySelectorAll('#choices button');
    buttons.forEach(btn => btn.disabled = true);

    // Show the next button if more questions are available, otherwise show the complete message
    const nextButton = document.getElementById('nextButton');
    if (currentQuestionIndex < quizzes.length - 1) {
        nextButton.style.display = 'block';
        nextButton.disabled = false;
    } else {
        const completeMessage = document.getElementById('completeMessage');
        const retryButton = document.getElementById('retryButton');
        completeMessage.style.display = 'block';
        retryButton.style.display = 'block';
    }
}

function loadNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizzes.length) {
        loadQuestion(currentQuestionIndex);
    }
}

function updateScore() {
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = `Score: ${score}`;
    // Show the score after the first question is answered
    if (scoreElement.classList.contains('hidden')) {
        scoreElement.classList.remove('hidden');
    }
}

function retryQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    updateScore();
    loadQuestion(currentQuestionIndex);
}

// Load the first question
loadQuestion(currentQuestionIndex);