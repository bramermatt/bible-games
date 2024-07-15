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
    {
        question: "What sea did the Isrealites cross during the Exodus?",
        choices: ["Yellow", "Reed", "Euphrates", "Red"],
        correct: 3
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
            const correctModal = document.getElementById('correctModal');
            const incorrectModal = document.getElementById('incorrectModal');
            
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

            // Hide the modals
            correctModal.style.display = 'none';
            incorrectModal.style.display = 'none';

            // Hide the score initially
            if (index === 0) {
                scoreElement.classList.add('hidden');
            }
        }

        function checkAnswer(button, isCorrect) {
            const nextButton = document.getElementById('nextButton');
            if (isCorrect) {
                button.classList.add('correct');
                button.classList.add('correct-hover');
                showCorrectModal();
                score += 1;
            } else {
                button.classList.add('incorrect');
                button.classList.add('incorrect-hover');
                showIncorrectModal();
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

        function showCorrectModal() {
            const correctModal = document.getElementById('correctModal');
            correctModal.style.display = 'flex';
        }

        function showIncorrectModal() {
            const incorrectModal = document.getElementById('incorrectModal');
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

        // Load the first question
        loadQuestion(currentQuestionIndex);