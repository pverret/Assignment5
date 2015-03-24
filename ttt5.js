var turn = 0;
var imageName="";

var pictureSource;   // picture source
var destinationType; // sets the format of returned value 
var counter = 0;
var boxNums =[0, 0, 0, 0, 0, 0, 0, 0, 0];

document.addEventListener("deviceready",onDeviceReady,false);

function onDeviceReady() {
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;
}

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function toggleBox(name) {
	var box = document.getElementById(name);
	if(endsWith(box.src, "blank.png") && (checkWin() == 0)) {
		var boxNum =0;
		
		if(turn == 0) {
			boxNum = 1;
			box.src = "x.png";
			turn = 1;
			counter++;
		} else { 
			boxNum = 5;
			box.src = "o.png";
			turn = 0;
			counter++;
		}
		
		if(name === 'box1') { boxNums[0] = boxNum; }
		else if(name === 'box2') { boxNums[1] = boxNum; }
		else if(name === 'box3') { boxNums[2] = boxNum; }
		else if(name === 'box4') { boxNums[3] = boxNum; }
		else if(name === 'box5') { boxNums[4] = boxNum; }
		else if(name === 'box6') { boxNums[5] = boxNum; }
		else if(name === 'box7') { boxNums[6] = boxNum; }
		else if(name === 'box8') { boxNums[7] = boxNum; }
		else if(name === 'box9') { boxNums[8] = boxNum; }
		console.log("boxnums: " + boxNums);

		var winner = checkWin();
		var wins = 0;
		if(winner != 0) {
			alert('Player ' + winner + 'wins!');
			var playerKey = "player"+winner;
			var scoreString = window.localStorage.getItem(playerKey);
			if(scoreString == null) {
				wins = 1;
				window.localStorage.setItem(playerKey, "1");
			} else {
				wins = parseInt(scoreString);
				wins++;
				window.localStorage.setItem(playerKey, "" + wins);
			}
			
			console.log(playerKey + " wins: " + wins);
		} else if(counter == 9) {
			navigator.vibrate(3000);
			alert("It's a Tie!");
			counter++;
			var scoreString = window.localStorage.getItem("ties");
			if(scoreString == null) {
				wins = 1;
				window.localStorage.setItem("ties", "1");
			} else {
				wins = parseInt(scoreString);
				wins++;
				window.localStorage.setItem("ties", "" + wins);
			}
			console.log("Ties: " + wins);
		}
	}
	
	
}

function checkWin() {
	var sum1 = boxNums[0] + boxNums[1] + boxNums[2];
	var sum2 = boxNums[3] + boxNums[4] + boxNums[5];
	var sum3 = boxNums[6] + boxNums[7] + boxNums[8];
	var sum4 = boxNums[0] + boxNums[3] + boxNums[6];
	var sum5 = boxNums[1] + boxNums[4] + boxNums[7];
	var sum6 = boxNums[2] + boxNums[5] + boxNums[8];
	var sum7 = boxNums[0] + boxNums[4] + boxNums[8];
	var sum8 = boxNums[6] + boxNums[2] + boxNums[4];
	
	if((sum1 == 3) || (sum2 == 3) || (sum3 == 3) || (sum4 == 3) ||
        (sum5 == 3) || (sum6 == 3) || (sum7 == 3) || (sum8 == 3)) {
			return 1;
	} else if((sum1 == 15) || (sum2 == 15) || (sum3 == 15) || (sum4 == 15) ||
        (sum5 == 15) || (sum6 == 15) || (sum7 == 15) || (sum8 == 15)) {
			return 2;
	}
	return 0;
}

function clearGame() {
	turn = 0;
	counter = 0;
	for(var i=1; i < 10; i++) {
		var box = document.getElementById("box" + i);
		box.src = "blank.png";
		boxNums[i-1] = 0;
	}	

}

function changePhoto(name) {
	imageName = name;
	//alert('Changing Photo');
	// Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50, destinationType: Camera.DestinationType.DATA_URL });
}

function onFail(message) {
    alert('Failed because: ' + message);
}

function onPhotoDataSuccess(imageData) {
      // Get image handle
      //
      var smallImage = document.getElementById(imageName);

      // Unhide image elements
      //
      //smallImage.style.display = 'block';

      // Show the captured photo
      // The inline CSS rules are used to resize the image
      //
      smallImage.src = "data:image/jpeg;base64," + imageData;}