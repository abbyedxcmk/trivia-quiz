// Target clear button and call the clearHighScore function on click
document.getElementById('clear').addEventListener('click', clearHighScore);

// Read local storage and display the scores 
function displayHighScores() {
	let highScores = localStorage.getItem('highScores');
	highScores = JSON.parse(highScores);
	const highScoresTable = document.getElementById('highscores');

	// If there are high scores stored, display high scores
	if (highScores) {
		for (let i = 0; i < highScores.length; i++) {
			const li = document.createElement('li');
			li.innerText = `${highScores[i].userInitials}: ${highScores[i].score}`;
			highScoresTable.appendChild(li);
		}
		// if there are no high scores stored, display no record message
	} else {
		document.querySelector('h1').innerText = 'No high score recorded.'
	}
}

// delete local storage record of highscores and delete high scores list
function clearHighScore() {
	localStorage.removeItem('highScores');
	document.getElementById('highscores').innerHTML = '';
	// Update high scores display
	displayHighScores();
}

// Call the display high scores function 
displayHighScores();