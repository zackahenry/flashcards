var ClozeCard = require("./lib/ClozeCard");
var cardData = require("./cloze.json");
var inquirer = require("inquirer");


initGame();

function initGame() {
  var currentCard;
  var cardArray = [];
  var initialScore = 0;
  var initialIndex = 0;
  for (var i = 0; i < cardData.length; i++) {
    currentCard = new ClozeCard(cardData[i].partial, cardData[i].cloze);
    cardArray.push(currentCard);
  }
  playRound(initialScore, cardArray, initialIndex);
}

function endGame(score) {
  console.log("Game Over!");
  console.log("Your score is:", score);
  inquirer.prompt([{
    type: "input",
    name: "text",
    message: "Play again?"
  }]).then(function(answer) {
    if (answer.text.charAt(0).toLowerCase() === "y") {
      initGame();
    } 
    else {
      console.log("Thanks for playing!");
      console.log("Goodbye!");
    }
  });
}

function playRound(currentScore, cardArray, currentIndex) {
  if (currentIndex < cardArray.length) {
    promptUser(cardArray, currentIndex, currentScore);
  }
  else {
    endGame(currentScore);
  }
}

function promptUser(cardArray, currentIndex, currentScore) {
  var card = cardArray[currentIndex];
  inquirer.prompt([{
    type: "input",
    name: "text",
    message: card.partial + "\nAnswer:"
  }]).then(function(answer) {
    if (answer.text.trim().toLowerCase() === card.cloze.trim().toLowerCase()) {
      currentScore++;
      console.log("\nYou are correct! Awesome!");
    }
    else {
      console.log("\nIncorrect!");
    }
    console.log(card.displayCard());
    currentIndex++;
    console.log("-------\n");
    playRound(currentScore, cardArray, currentIndex);
  });
}
