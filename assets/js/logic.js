// initialise variables
let currentQuestionIndex = 0 // Keeps track of the index of the current question being displayed
let timerInterval; // Used to store the interval ID for updating the timer
let timeRemaining = 0;
let score = 0;
const feedback = document.getElementById('feedback');
let statusAnswer = 'incorrect';
let quizEnded = false;

// Load the sfx files
const correctSound = new Audio('./assets/sfx/correct.wav');
const incorrectSound = new Audio('./assets/sfx/incorrect.wav');

//  add event listeners for starting quiz, and saving score
document.getElementById('start').addEventListener('click', startQuiz);
document.getElementById('submit').addEventListener('click', startScore);

// start quiz function
function startQuiz() {

	// hide the landing page
	document.getElementById('start-screen').classList.add('hide');

	// Show the timer
	document.querySelector('.timer').classList.remove('hide');

	// show the question section
	document.getElementById('questions').classList.remove('hide');

	// start the timer
	timeRemaining = 60;
	timerInterval = setInterval(function() {
		timeRemaining--;
		if (timeRemaining <= 0) {
			score = 0;
            quizEnded = true;
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

// Function to display a question
function displayQuestion() {
	// Avoid question display if the quiz is ended 
	if (!quizEnded) {
		const question = questions[currentQuestionIndex];
		const questionTitle = document.getElementById('question-title');
		const choices = document.getElementById('choices');
		questionTitle.innerText = question.questionText;
		// display the questions and add a data status attribute to each button
		for (let i = 0; i < question.choices.length; i++) {
			const button = document.createElement('button');
			button.innerText = `${i + 1}. ${question.choices[i]}`
			if (i === question.correctAnswer) {
				button.setAttribute('data-status', 'correct');
			} else {
				button.setAttribute('data-status', 'incorrect');
			}
			//  Add a click event listener to each button and detect if the answer is right/wrong
			button.addEventListener('click', function() {
				statusAnswer = button.dataset.status;
				// Call the function to display if the question was right or wrong
				showStatus();
				questionTitle.innerHTML = '';
				choices.innerHTML = '';
				// End the quiz if the last question is answered
				if (currentQuestionIndex === questions.length - 1) {
					score = timeRemaining;
					currentQuestionIndex = 0;
					quizEnded = true;
					endQuiz();
					// Calculate next question index to continue the quiz
				} else {
					currentQuestionIndex++;
				}
				displayQuestion();
			})
			choices.appendChild(button);
		}
	}
}

// End quiz function removes the quiz elements and displays the score and initial input
function endQuiz() {
	clearInterval(timerInterval);
	document.getElementById('time').textContent = 0;
	document.querySelector('.timer').classList.add('hide');
	document.getElementById('final-score').innerText = score;
	// show the question section
	document.getElementById('questions').classList.add('hide');
	document.getElementById('end-screen').classList.remove('hide');
}

// save the high score function
function startScore(event) {
	event.preventDefault();
	let initials = document.getElementById('initials').value;
	// Make a high score object with user initials and score details
	const highScore = {
		userInitials: initials,
		score: score,
	}
	let highScores = JSON.parse(localStorage.getItem('highScores'));
	// Check if there are no high scores recorded
	if (highScores === null) {
		highScores = []
	}
	// Append a new high score to the existing ones.
	highScores.push(highScore);
	localStorage.setItem('highScores', JSON.stringify(highScores));
	// Redirect to the highscores page
	window.location.href = './highscores.html';
}

// show status function displays correct/incorrect message for a sec
function showStatus() {
	let statusMessage;
	feedback.classList.remove('hide');
	if (statusAnswer === 'correct') {
		statusMessage = 'CORRECT!';
		correctSound.play();
	} else {
		// subtract 10 seconds from the remaining time if answer is wrong 
		timeRemaining -= 10;
		statusMessage = 'INCORRECT!';
		incorrectSound.play();
	}
	feedback.innerText = statusMessage;
	setTimeout(function() {
		feedback.innerText = '';
		feedback.classList.toggle('hide');
	}, 1000);
}