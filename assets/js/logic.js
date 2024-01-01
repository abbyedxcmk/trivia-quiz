// initialise variables
let currentQuestionIndex = 0  // Keeps track of the index of the current question being displayed
let timerInterval; // Used to store the interval ID for updating the timer
let timeRemaining = 0;
let score = 0;
const feedback = document.getElementById('feedback');

document.getElementById('start').addEventListener('click', startQuiz);
document.getElementById('submit').addEventListener('click', startScore);
document.getElementById('clear').addEventListener('click', clearHighScore);

function startQuiz() {

    // hide the landing page
    document.getElementById('start-screen').classList.add('hide');

    // Show the timer
    document.querySelector('.timer').classList.remove('hide');

    document.getElementById('questions').classList.remove('hide');
    // show the question section

    // start the timer

    timeRemaining = 60;
    timerInterval = setInterval(function () {
        timeRemaining--;
        if (timeRemaining <= 0) {
            endQuiz();

        }
        updateTimerDisplay();

    }, 1000);
    displayQuestion();
}

// function to update the timer display
function updateTimerDisplay() {

    document.getElementById('time').textContent = timeRemaining;
}

// Functiion to display a question
function displayQuestion() {

    const question = questions[currentQuestionIndex];
    const questionTitle = document.getElementById('question-title');
    const choices = document.getElementById('choices');
    questionTitle.innerText = question.questionText;
    for (let i = 0; i < question.choices.length; i++) {
        const button = document.createElement('button');
        button.innerText =`${i+1}. ${question.choices[i]}`
        if (i === question.correctAnswer){
            button.setAttribute('data-status', 'correct');
        } else {
            button.setAttribute('data-status', 'incorrect');
        }
        button.addEventListener('click', function() {

            feedback.classList.remove('hide');
            if (this.dataset.status === 'correct'){
                feedback.innerText = 'CORRECT!'
            } else {
                feedback.innerText = 'INCORRECT!'
            }
            currentQuestionIndex++;
            questionTitle.innerHTML = '';
            choices.innerHTML = '';

            displayQuestion();
        })
        choices.appendChild(button);
        

    }

}
function endQuiz() {

}

function startScore() {

}


function clearHighScore() {

}