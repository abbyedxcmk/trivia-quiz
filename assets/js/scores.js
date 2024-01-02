document.getElementById('clear').addEventListener('click', clearHighScore);

function displayHighScores() {
    let highScores = localStorage.getItem('highScores');
    highScores = JSON.parse(highScores);
    const highScoresTable = document.getElementById('highscores');
    if (highScores) {
        for (let i = 0; i <highScores.length; i++) {
            const li = document.createElement('li');
            li.innerText = `${highScores[i].userInitials}: ${highScores[i].score}`;
            highScoresTable.appendChild(li);
        }
    } else {
        document.querySelector('h1').innerText = 'No high score recorded.'
    }
}

function clearHighScore() {

}
displayHighScores();