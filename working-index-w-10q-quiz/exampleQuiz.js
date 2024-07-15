const quizzes = [
    {
        question: "What is the first book of the Bible?",
        choices: ["Exodus", "Genesis", "Leviticus", "Numbers"],
        topic: "Book",
        correct: 1
    },
    {
        question: "Who built the ark?",
        choices: ["Moses", "Noah", "Abraham", "Jacob"],
        topic: "Person",
        correct: 1
    },
    {
        question: "What is the longest book in the Bible?",
        choices: ["Genesis", "Psalms", "Isaiah", "Matthew"],
        topic: "Book",
        correct: 1
    },
    {
        question: "Who was swallowed by a big fish?",
        choices: ["Elijah", "Jonah", "Daniel", "Peter"],
        topic: "Event",
        correct: 1
    },
    {
        question: "Where was Jesus born?",
        choices: ["Nazareth", "Jerusalem", "Bethlehem", "Galilee"],
        topic: "Place",
        correct: 2
    },
    {
        question: "Who was the first king of Israel?",
        choices: ["David", "Solomon", "Saul", "Samuel"],
        topic: "Person",
        correct: 2
    },
    {
        question: "What is the shortest book in the New Testament?",
        choices: ["Philemon", "2 John", "3 John", "Jude"],
        topic: "Book",
        correct: 1
    },
    {
        question: "Who led the Israelites out of Egypt?",
        choices: ["Joshua", "Aaron", "Moses", "Joseph"],
        topic: "Person",
        correct: 2
    },
    {
        question: "Which of these is not a Gospel?",
        choices: ["Matthew", "Mark", "Luke", "Acts"],
        topic: "Book",
        correct: 3
    },
    {
        question: "Who denied Jesus three times?",
        choices: ["Judas", "Peter", "John", "Thomas"],
        topic: "Person",
        correct: 1
    }
    // Add more quiz objects here
];

let currentQuestionIndex = 0;
let score = 0;
let answersCorrect = [];

// Fisher-Yates shuffle algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function loadQuestion(index) {
    const questionElement = document.getElementById('question');
    const choicesElement = document.getElementById('choices');
    const nextButton = document.getElementById('nextButton');
    const retryButton = document.getElementById('retryButton');
    const showAnswersButton = document.getElementById('showAnswersButton');
    const completeMessage = document.getElementById('completeMessage');
    const scoreElement = document.getElementById('score');
    const correctModal = document.getElementById('correctModal');
    const incorrectModal = document.getElementById('incorrectModal');
    const questionCounter = document.getElementById('questionCounter');
    const topicElement = document.getElementById('topic');
    const questionSection = document.querySelector('.question-section');

    // Clear previous choices
    choicesElement.innerHTML = '';

    // Load new question
    const quiz = quizzes[index];
    questionElement.textContent = quiz.question;

    // Update question counter
    questionCounter.textContent = `Question: ${index + 1}/${quizzes.length}`;

    // Update topic
    topicElement.textContent = `${quiz.topic}`;

    // Load new choices
    quiz.choices.forEach((choice, i) => {
        const li = document.createElement('li');
        const button = document.createElement('button');
        button.textContent = choice;
        button.onclick = () => checkAnswer(button, i === quiz.correct);
        li.appendChild(button);
        choicesElement.appendChild(li);
    });

    // Hide the next button and complete message initially
    nextButton.style.display = 'none';
    retryButton.style.display = 'none';
    showAnswersButton.style.display = 'none'; // Hide show answers button initially
    completeMessage.style.display = 'none';

    // Hide the modals
    correctModal.style.display = 'none';
    incorrectModal.style.display = 'none';

    // Show the question section
    questionSection.style.display = 'block';
}


function checkAnswer(button, isCorrect) {
    const nextButton = document.getElementById('nextButton');
    const showAnswersButton = document.getElementById('showAnswersButton');

    if (isCorrect) {
        button.classList.add('correct');
        button.classList.add('correct-hover');
        showCorrectModal();
        score += 1;
        answersCorrect[currentQuestionIndex] = true;
    } else {
        button.classList.add('incorrect');
        button.classList.add('incorrect-hover');
        showIncorrectModal(quizzes[currentQuestionIndex].choices[quizzes[currentQuestionIndex].correct]);
        answersCorrect[currentQuestionIndex] = false;
    }
    updateScore();
    
    // Disable all buttons after an answer is selected
    const buttons = document.querySelectorAll('#choices button');
    buttons.forEach(btn => btn.disabled = true);

    // Hide the next button when a modal is shown
    nextButton.classList.add('hidden');

    // Show the next button if more questions are available, otherwise show the complete message
    if (currentQuestionIndex < quizzes.length - 1) {
        nextButton.style.display = 'block';
        nextButton.disabled = false;
    } else {
        const completeMessage = document.getElementById('completeMessage');
        const retryButton = document.getElementById('retryButton');
        completeMessage.style.display = 'block';
        retryButton.style.display = 'block';
        showAnswersButton.style.display = 'block'; // Show the show answers button
        const questionSection = document.querySelector('.question-section');
        questionSection.style.display = 'none'; // Hide the question section after quiz completion
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
    scoreElement.textContent = `Score: ${score}/${quizzes.length}`;
    // Show the score after the first question is answered
    if (scoreElement.classList.contains('hidden')) {
        scoreElement.classList.remove('hidden');
    }
}

// Update the retryQuiz function
function retryQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    answersCorrect = [];
    updateScore();
    shuffleArray(quizzes); // Shuffle questions before restarting the quiz
    loadQuestion(currentQuestionIndex);

    // Show the question section and hide the correct answers section
    const quizContainer = document.querySelector('.question-section');
    const correctAnswersSection = document.getElementById('correctAnswersSection');
    quizContainer.style.display = 'block';
    correctAnswersSection.style.display = 'none';

    // Show the retry button and show answers button after quiz is retried
    const nextRetryCorrectDiv = document.querySelector('.next-retry-correct');
    nextRetryCorrectDiv.style.display = 'flex'; // Show the buttons after retrying
}

function showCorrectModal() {
    const correctModal = document.getElementById('correctModal');
    correctModal.style.display = 'flex';
}

function showIncorrectModal(correctAnswer) {
    const incorrectModal = document.getElementById('incorrectModal');
    const modalContent = document.querySelector('#incorrectModal .modal-content');
    
    // Update the modal content with more information
    modalContent.innerHTML = `
        <p class="incorrect-message">Wrong Answer! 
        The correct answer is: <strong style='color: red;'>${correctAnswer}</strong></p>
        <button onclick="handleModalButtonClick()">Next Question</button>
        `;
    
    // Display the modal
    incorrectModal.style.display = 'flex';
}

function handleModalButtonClick() {
    const correctModal = document.getElementById('correctModal');
    const incorrectModal = document.getElementById('incorrectModal');
    correctModal.style.display = 'none';
    incorrectModal.style.display = 'none';

    // Show the next button only if there are more questions
    const nextButton = document.getElementById('nextButton');
    if (currentQuestionIndex < quizzes.length - 1) {
        nextButton.classList.remove('hidden');
    }

    loadNextQuestion();
}

// Display the completed answers with background colors
function displayCorrectAnswers() {
    const correctAnswersSection = document.getElementById('correctAnswersSection');
    const correctAnswersList = document.getElementById('correctAnswersList');
    correctAnswersList.innerHTML = '';

    quizzes.forEach((quiz, index) => {
        const li = document.createElement('li');
        const text = `Question: ${quiz.question}<br>Correct Answer: ${quiz.choices[quiz.correct]}`;
        li.innerHTML = text;
        li.style.backgroundColor = answersCorrect[index] ? 'rgb(57, 114, 57)' : 'rgb(97, 15, 15)';
        correctAnswersList.appendChild(li);
    });
    correctAnswersSection.style.display = 'block'; // Show correct answers section
}

// Toggle the visibility of the correct answers section
function toggleCorrectAnswers() {
    const correctAnswersSection = document.getElementById('correctAnswersSection');
    const showAnswersButton = document.getElementById('showAnswersButton');
    const nextRetryCorrectDiv = document.querySelector('.next-retry-correct');

    if (correctAnswersSection.style.display === 'none' || correctAnswersSection.style.display === '') {
        displayCorrectAnswers();
        correctAnswersSection.style.display = 'block';
        showAnswersButton.style.display = 'none';
    } else {
        correctAnswersSection.style.display = 'none';
        nextRetryCorrectDiv.style.display = 'flex'; // Show the buttons when hiding correct answers
    }
}

// Ensure the button calls toggleCorrectAnswers
// document.getElementById('showAnswersButton').addEventListener('click', toggleCorrectAnswers);

// Initialize the quiz on page load
document.addEventListener('DOMContentLoaded', () => {
    shuffleArray(quizzes); // Shuffle questions initially
    loadQuestion(currentQuestionIndex);
});
