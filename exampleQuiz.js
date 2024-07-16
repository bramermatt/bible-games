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
    },
    {
        question: "Which book in the Bible is known for its collection of wise sayings and proverbs?",
        choices: ["Proverbs", "Ecclesiastes", "Job", "Psalms"],
        topic: "Book",
        correct: 0
    },
    {
        question: "Who was the mother of Samuel?",
        choices: ["Hannah", "Elizabeth", "Mary", "Rachel"],
        topic: "Person",
        correct: 0
    },
    {
        question: "What is the first miracle performed by Jesus according to the Gospels?",
        choices: ["Turning water into wine", "Healing the blind", "Feeding the 5000", "Walking on water"],
        topic: "Miracles",
        correct: 0
    },
    {
        question: "In which book do we find the story of the Good Samaritan?",
        choices: ["Matthew", "Mark", "Luke", "John"],
        topic: "Parables",
        correct: 2
    },
    {
        question: "What was the profession of Matthew before he followed Jesus?",
        choices: ["Fisherman", "Tax collector", "Pharisee", "Shepherd"],
        topic: "Profession",
        correct: 1
    },
    {
        question: "Which apostle is known for doubting Jesus' resurrection until he saw Jesus himself?",
        choices: ["Peter", "John", "Thomas", "James"],
        topic: "Apostles",
        correct: 2
    },
    {
        question: "Which Old Testament prophet was swallowed by a great fish?",
        choices: ["Elijah", "Isaiah", "Jeremiah", "Jonah"],
        topic: "Prophets",
        correct: 3
    },
    {
        question: "What does the name 'Jesus' mean?",
        choices: ["Savior", "King", "Messiah", "Redeemer"],
        topic: "Names",
        correct: 0
    },
    {
        question: "In which city were the followers of Jesus first called Christians?",
        choices: ["Jerusalem", "Antioch", "Ephesus", "Rome"],
        topic: "Early Church",
        correct: 1
    },
    {
        question: "Which prophet confronted King Ahab and the prophets of Baal on Mount Carmel?",
        choices: ["Elijah", "Elisha", "Isaiah", "Jeremiah"],
        topic: "Prophets",
        correct: 0
    },
    {
        question: "What was the name of the garden where Jesus prayed before His crucifixion?",
        choices: ["Gethsemane", "Eden", "Jericho", "Galilee"],
        topic: "Events",
        correct: 0
    },
    {
        question: "Which apostle wrote the majority of the New Testament letters?",
        choices: ["Paul", "Peter", "John", "James"],
        topic: "Apostles",
        correct: 0
    },
    {
        question: "How many days and nights did it rain during the flood in Noah's time?",
        choices: ["40 days and nights", "30 days and nights", "7 days and nights", "100 days and nights"],
        topic: "Events",
        correct: 0
    },
    {
        question: "Which New Testament book is known for its teachings on love and its famous 'love chapter'?",
        choices: ["John", "Romans", "1 Corinthians", "Hebrews"],
        topic: "Book",
        correct: 2
    },
    {
        question: "Which book describes the early church and the acts of the apostles?",
        choices: ["Acts", "Revelation", "Matthew", "Hebrews"],
        topic: "Early Church",
        correct: 0
    },
    {
        question: "Who was the brother of Moses and the first high priest of Israel?",
        choices: ["Aaron", "Joshua", "Caleb", "Miriam"],
        topic: "Person",
        correct: 0
    },
    {
        question: "Which book contains the story of Esther and her bravery in saving her people?",
        choices: ["Esther", "Ruth", "Daniel", "Nehemiah"],
        topic: "Book",
        correct: 0
    },
    {
        question: "Which two cities were destroyed by fire and brimstone in the Old Testament?",
        choices: ["Sodom and Gomorrah", "Jericho and Ai", "Nineveh and Babylon", "Egypt and Canaan"],
        topic: "Events",
        correct: 0
    },
    {
        question: "Who was the Roman governor who sentenced Jesus to be crucified?",
        choices: ["Herod", "Pontius Pilate", "Caesar", "Judas"],
        topic: "Events",
        correct: 1
    },
    {
        question: "Which book of the Bible is known for its focus on the end times and prophecy?",
        choices: ["Revelation", "Daniel", "Ezekiel", "Matthew"],
        topic: "Book",
        correct: 0
    }
    // Add more quiz objects here
];

let currentQuestionIndex = 0, score = 0, answersCorrect = [];

// Fisher-Yates shuffle algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Pick 5 random questions from quizzes
function pickRandomQuestions() {
    shuffleArray(quizzes);
    return quizzes.slice(0, 5);
}

const exampleQuizzes = pickRandomQuestions();

function loadQuestion(index) {
    const elements = {
        question: document.getElementById('question'),
        choices: document.getElementById('choices'),
        nextButton: document.getElementById('nextButton'),
        retryButton: document.getElementById('retryButton'),
        showAnswersButton: document.getElementById('showAnswersButton'),
        completeMessage: document.getElementById('completeMessage'),
        score: document.getElementById('score'),
        correctModal: document.getElementById('correctModal'),
        incorrectModal: document.getElementById('incorrectModal'),
        questionCounter: document.getElementById('questionCounter'),
        topic: document.getElementById('topic'),
        questionSection: document.querySelector('.question-section')
    };

    elements.choices.innerHTML = '';
    const quiz = exampleQuizzes[index];
    elements.question.textContent = quiz.question;
    elements.questionCounter.textContent = `Question: ${index + 1}/${exampleQuizzes.length}`;
    elements.topic.textContent = `${quiz.topic}`;

    quiz.choices.forEach((choice, i) => {
        const li = document.createElement('li');
        const button = document.createElement('button');
        button.textContent = choice;
        button.onclick = () => checkAnswer(button, i === quiz.correct);
        li.appendChild(button);
        elements.choices.appendChild(li);
    });

    ['nextButton', 'retryButton', 'showAnswersButton', 'completeMessage', 'correctModal', 'incorrectModal']
        .forEach(id => elements[id].style.display = 'none');
    elements.questionSection.style.display = 'block';
}

function checkAnswer(button, isCorrect) {
    const elements = {
        nextButton: document.getElementById('nextButton'),
        showAnswersButton: document.getElementById('showAnswersButton')
    };

    if (isCorrect) {
        button.classList.add('correct', 'correct-hover');
        showCorrectModal();
        score++;
        answersCorrect[currentQuestionIndex] = true;
    } else {
        button.classList.add('incorrect', 'incorrect-hover');
        showIncorrectModal(exampleQuizzes[currentQuestionIndex].choices[exampleQuizzes[currentQuestionIndex].correct]);
        answersCorrect[currentQuestionIndex] = false;
    }
    updateScore();

    document.querySelectorAll('#choices button').forEach(btn => btn.disabled = true);
    elements.nextButton.classList.add('hidden');

    if (currentQuestionIndex < exampleQuizzes.length - 1) {
        elements.nextButton.style.display = 'block';
    } else {
        document.getElementById('completeMessage').style.display = 'block';
        document.getElementById('retryButton').style.display = 'block';
        elements.showAnswersButton.style.display = 'block';
        document.querySelector('.question-section').style.display = 'none';
    }
}

function loadNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < exampleQuizzes.length) loadQuestion(currentQuestionIndex);
}

function updateScore() {
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = `Score: ${score}`;
    scoreElement.classList.remove('hidden');
}

function retryQuiz() {
    currentQuestionIndex = score = 0;
    answersCorrect = [];
    updateScore();
    shuffleArray(exampleQuizzes);
    loadQuestion(currentQuestionIndex);

    document.querySelector('.question-section').style.display = 'block';
    document.getElementById('correctAnswersSection').style.display = 'none';
    document.querySelector('.next-retry-correct').style.display = 'flex';
}

function showCorrectModal() {
    document.getElementById('correctModal').style.display = 'flex';
}

function showIncorrectModal(correctAnswer) {
    const modalContent = document.querySelector('#incorrectModal .modal-content');
    modalContent.innerHTML = `
        <p class="incorrect-message">Wrong Answer! The correct answer is: <strong style='color: red;'>${correctAnswer}</strong></p>
        <button onclick="handleModalButtonClick()">Next Question</button>`;
    document.getElementById('incorrectModal').style.display = 'flex';
}

function handleModalButtonClick() {
    document.getElementById('correctModal').style.display = 'none';
    document.getElementById('incorrectModal').style.display = 'none';
    if (currentQuestionIndex < exampleQuizzes.length - 1) document.getElementById('nextButton').classList.remove('hidden');
    loadNextQuestion();
}

function displayCorrectAnswers() {
    const correctAnswersList = document.getElementById('correctAnswersList');
    correctAnswersList.innerHTML = '';

    exampleQuizzes.forEach((quiz, index) => {
        const li = document.createElement('li');
        li.innerHTML = `Question: ${quiz.question}<br>Correct Answer: ${quiz.choices[quiz.correct]}`;
        li.style.backgroundColor = answersCorrect[index] ? 'rgb(57, 114, 57)' : 'rgb(97, 15, 15)';
        correctAnswersList.appendChild(li);
    });
    document.getElementById('correctAnswersSection').style.display = 'block';
}

function toggleCorrectAnswers() {
    const correctAnswersSection = document.getElementById('correctAnswersSection');
    const showAnswersButton = document.getElementById('showAnswersButton');
    const nextRetryCorrectDiv = document.querySelector('.next-retry-correct');

    if (correctAnswersSection.style.display === 'none' || !correctAnswersSection.style.display) {
        displayCorrectAnswers();
        showAnswersButton.style.display = 'none';
    } else {
        correctAnswersSection.style.display = 'none';
        nextRetryCorrectDiv.style.display = 'flex';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadQuestion(currentQuestionIndex);
});
