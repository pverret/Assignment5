

function loadScores() {
	
	var player1wins = document.getElementById("player1wins");
	var player2wins = document.getElementById("player2wins");
	var ties = document.getElementById("ties");

	var player1score = window.localStorage.getItem("player1");
	var player2score = window.localStorage.getItem("player2");
	var tiesscore = window.localStorage.getItem("ties");
	
	if(player1score == null)
		player1score = 0;
	if(player2score == null)
		player2score = 0;
	if(tiesscore == null)
		tiesscore = 0;

	player1wins.innerHTML = "Player 1 wins: " + player1score;
	player2wins.innerHTML = "Player 2 wins: " + player2score;
	ties.innerHTML = "Ties: " + tiesscore;
	
}

