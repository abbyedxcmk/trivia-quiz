// initialise variables
let currentQuestionIndex = 0  // Keeps track of the index of the current question being displayed
let timerInterval; // Used to store the interval ID for updating the timer
let timeRemaining = 0;
let score = 0;

document.getElementById('start').addEventListener('click', startQuiz);
document.getElementById('submit').addEventListener('click', startScore);
document.getElementById('clear').addEventListener('click', clearHighScore);

const questions = [

    {

        questionText: 'What is ISO20022',  // The question text
        choices: ['A programming language', 'A type of coffee', 'A car brand'], // Array of answer choices
        correctAnswer: 0, // Index of the correct answer in the 'choices' array
    },
];
function startQuiz() {

    // hide the landing page
    document.getElementById('start-screen').classList.add('hide');

    // Show the timer
    document.querySelector('.timer).classList.remove('hide');

// show the question section
document.getElementById('questions').classList.remove('hide');

    // start the timer

    timeRemaining = 60;
    updateTimerDisplay();
    timerInterval = setInterval(function () {
        timeRemaining--;
        if (timeRemaining <= 0) {
            endQuiz();

        }
    }, 1000);
}

// function to update the timer display
fucntion updateTimerDisplay() {

    document.getElementById('time').textContent = timeRemaining;
}

// Functiion to display a question
function displayQuestion() {

    const question = questions[currentQuestionIndex];
    const questionTitle = document.getElementById('question title');
    const choices = document.getElementById('choices');

}
