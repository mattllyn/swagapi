
API.on(API.CHAT, gamesticles);

var userChoice = [];
var targeted = " ";
var player = " ";
var name = " ";
var pastPlayers = [];
var playing = false;
var playingWait = 60000;
var pWait = 300000;
var playingPassed = 0;
var pPassed = 0;
var playingTimer = null;
var pTimer = null;
var tpTimer = null;
var hr = 6E5;
var chosen = true;
var gamesPlayed = 0;
var gamesWon = 0;
var gamesLost = 0;
var winMsg = ["I lost, I won't lose the next game", ""];
var loseMsg = [" You lose"];
var drawMsg = [" game tied"];
var quitMsg = ["Why are you quiting?:"];
var cookieMsg = [" here is your winning cookie :cookie:"];
var kickMsg = [" you lost!:"];
var targeted = " ";


function gamesticles(data) {
	var msg = data.message;
	if (API.getUser(data.fromID).permission >= 1 && msg.indexOf("!start") > -1) {
		API.sendChat("/me Game Initiated!");
		setTimeout("targetPlayer()", 1000);
		tpTimer = setInterval("targetPlayer();", hr);
	}
	if (playing == false && player.indexOf(data.fromID) > -1 && msg.indexOf("!pass") > -1) {
		API.sendChat("/me Player cancelled!");
		clearInrerval (pTimer);
		pPassed = 0;
		target = " ";
		player = " ";
		playing = false;
	}
        if (playing == false && player.indexOf(data.fromID) > -1 && msg.indexOf("!play") > -1) {
	        API.sendChat("@" + data.from + " welcome to Rock Paper Scissors.You can quit at anytime by typing /quit.");
	        API.sendChat("@" + data.from + " Rock Paper or Scissors?");
	        playing = true;
		chosen = false;
        }
        if (playing == true && player.indexOf(data.fromID) > -1 && msg.indexOf("!quit") > -1) {
        	API.sendChat("@" + data.from + " " + quitMsg + " Final Score: WON: " + gamesWon + " LOST: " + gamesLost);
        	playingTimer = setInterval("checkPlaying()", 1000);
        	userChoice = [];
        	player = " ";
        	chosen = true;
        	gamesWon = 0;
        	gamesLost = 0;
        }
        if (playing == true && chosen == false && player.indexOf(data.fromID) > -1 && msg.indexOf("rock") > -1) {
        	userChoice.push("ROCK");
        	chosen = true;
        	game();
        }
        else if (playing == true && chosen == false && player.indexOf(data.fromID) > -1 && msg.indexOf("paper") > -1) {
        	userChoice.push("PAPER");
        	chosen = true;
        	game();
        }
        else if (playing == true && chosen == false && player.indexOf(data.fromID) > -1 && msg.indexOf("scissors") > -1) {
        	userChoice.push("SCISSORS");
        	chosen = true;
        	game();
        }
}

function game(){
	var computerChoice = Math.random();
	if (computerChoice < 0.34) {
		computerChoice = "ROCK";
	} 
	else if(computerChoice <= 0.67) {
		computerChoice = "PAPER";
	} 
	else {
		computerChoice = "SCISSORS";
	}
	var compare = function(choice1, choice2) {
		if (choice1 == choice2) {
	        	return drawMsg;
	    	}
	    	if (choice1 == "ROCK") {
	        	if (choice2 == "SCISSORS") {
	        		gamesWon = gamesWon + 1;
	            		return "ROCK beats SCISSORS " + winMsg[Math.floor(Math.random() * winMsg.length)];
	        	}
	        	else {
	        		gamesLost = gamesLost + 1;
	            		return "PAPER beats ROCK " + loseMsg[Math.floor(Math.random() * loseMsg.length)];
	        	}
	    	}
	    	if (choice1 == "PAPER") {
	        	if (choice2 == "ROCK") {
	        		gamesWon = gamesWon + 1;
	            		return "PAPER beats ROCK " + winMsg[Math.floor(Math.random() * winMsg.length)];
	        	}
	        	else {
	        		gamesLost = gamesLost + 1;
	            		return "SCISSORS beats PAPER " + loseMsg[Math.floor(Math.random() * loseMsg.length)];
	        	}
	    	}
	    	if (choice1 == "SCISSORS") {
	        	if (choice2 == "PAPER") {
	        		gamesWon = gamesWon + 1;
	            		return "SCISSORS beats PAPER " + winMsg[Math.floor(Math.random() * winMsg.length)];
	        	}
	        	else {
	        		gamesLost = gamesLost + 1;
	            		return "ROCK beats SCISSORS " + loseMsg[Math.floor(Math.random() * loseMsg.length)];
	        	}
	    	}
	};
	API.sendChat("@" + API.getUser(player).username + " You chose " + userChoice + ", and I chose " + computerChoice + ". " + compare(userChoice, computerChoice));
	checkStats();
}
function targetPlayer(){
	targeted = API.getUsers()[Math.floor(Math.random() * API.getUsers().length)];
	player = targeted.id;
	name = API.getUser(player).username;
	pastPlayers.push(targeted);
	API.sendChat("@" + name + " you have been randonly chosen to play rock paper scissors . to play type !play, or to skip type !pass");
	pTimer = setInterval("checkPassed()", 1000);
	checkGames();
}
function checkGames() {
	if (gamesPlayed == 5) {
		clearInterval(tpTimer);
		clearInterval(tTimer);
		clearInterval(playingTimer);
		playing = false;
		playingPassed = 0;
	}
}	
		
function checkStats() {
	if (gamesWon < 3 && gamesLost < 3) {
		setTimeout('API.sendChat("@" + API.getUser(player).username + " Stats: WON: " + gamesWon + " LOST: " + gamesLost + ". Rock Paper or Scissors?");', 2000);
		userChoice = [];
		chosen = false;
	}
	if (gamesWon == 3) {
		setTimeout('API.sendChat("@" + API.getUser(player).username + " Congratulations, " + cookieMsg[Math.floor(Math.random() * cookieMsg.length)]);', 2000);
		playingTimer = setInterval("checkPlaying()", 1000);
        	userChoice = [];
        	setTimeout('player = " ";', 7000);
        	chosen = true;
		gamesPlayed = gamesPlayed + 1;
		playing = false;
        	gamesWon = 0;
        	gamesLost = 0;
	}
	if (gamesLost == 3) {
		setTimeout('API.sendChat("@" + API.getUser(player).username + " Shit son, ");', 2000);
		playingTimer = setInterval("checkPlaying()", 1000);
                setTimeout('API.sendChat("@" + API.getUser(player).username + " Ouch unlucky. Great game though");', 2000)
		userChoice = [];
        	setTimeout('player = " ";', 7000);
        	chosen = true;
		gamesPlayed = gamesPlayed + 1;
		playing = false;
        	gamesWon = 0;
        	gamesLost = 0;	
	}

}

function checkPassed() {
	if (pPassed >= pWait) {
		clearInterval (pTimer);
		pPassed = 0;
		target = " ";
		player = " ";
	}
	else {
		pPassed = pPassed + 1000;
	}
}

function checkPlaying() {
	if (playingPassed >= playingWait) {
		clearInterval(playingTimer);
		playing = false;
		playingPassed = 0;
	}
	else {
		playingPassed = playingPassed + 1000;
	}
}
