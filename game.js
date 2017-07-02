// NPM Packages
var inquirer = require('inquirer');

// Local Require Files
var basiccard = require('./BasicCard.js');
var clozecard = require('./ClozeCard.js');

var questions = require('./questions.js').questions; //.questions defines object in js file to use.
var basicquestions = require('./basicquestions.js').basicquestions;

//Array to Hold Question Arguments.
var basic = [];

//Loops through questions object (text & cloze arguments) and pushes arguments into array.
for (var i = 0; i < basicquestions.length; i++) {
  var bflashcard = new basiccard.BasicCard(basicquestions[i].front, basicquestions[i].back);
  basic.push(bflashcard);
}

//Array to Hold Question Arguments.
var closeQuestions = [];

//Loops through questions object (text & cloze arguments) and pushes arguments into array.
for (var i = 0; i < questions.length; i++) {
  var flashcard = new clozecard.ClozeCard(questions[i].full, questions[i].cloze);
  closeQuestions.push(flashcard);
}

//console.log(basic); //Shows Array of Objects.
//console.log(closeQuestions); //Shows Array of Objects.

//Global variables to hold score results.
var currentQuestion = 0; // Index 0 in Array.
var correct = 0;
var wrong = 0;

//Start Game for User.
console.log('Welcome to That 70\'s show Trivia! \n')

inquirer.prompt([
	{
		type: "list",
		message: "Choose Your Flash Card Game",
		choices: ["Basic", "Cloze"],
		name: "choice"
	}
	]).then(function(user) {
		var inputResults = user.choice;

		switch (inputResults) {
			case "Basic":
				askQuestionB();
				break;
			case "Cloze":
				askQuestionC();
				break;
			default:
				console.log("error");
		}
	});

	


//Cloze Function to setup game.
function askQuestionC() {
  inquirer.prompt([
    {
      type: 'input',
      message: closeQuestions[currentQuestion].partial + '\nAnswer: ',
      name: 'userGuess'
    }
  ]).then(function (answers) {
    console.log('\n');
    if (answers.userGuess.toLowerCase() === closeQuestions[currentQuestion].cloze.toLowerCase()) {
      console.log('Correct, I love Wisconson! \n(You are welcome to join the crew in the basement!)\n');
      correct++;
    } else {
      console.log('Wrong, Red is gonna put his foot up your ass! \n (You know he will...)\n');
      wrong++;
    }
    console.log(closeQuestions[currentQuestion].full);

    if (currentQuestion < closeQuestions.length - 1) {
      currentQuestion++;
      askQuestionC();
    } else {
      console.log('Game Over!');
      console.log('Correct Answers: ' + correct);
      console.log('Incorrect Answers: ' + wrong);
      console.log('\n AHhhhhh noooooo. (Fez is sad the game is over!)\n');

      inquirer.prompt([
        {
          type: 'confirm',
          message: 'Would you like to play again?',
          name: 'Again'
        }
      ]).then(function (answers) {
        // Reset Array to Index 0 and score variables to 0 and replay's the game.
        if (answers.Again) {
          currentQuestion = 0;
          correct = 0;
          wrong = 0;
          reload();

        } else {
          console.log('Thanks for playing, Comrade!');
        }
      })
    }
  })
}

//Basic Function to setup game.
function askQuestionB() {
  inquirer.prompt([
    {
      type: 'input',
      message: basic[currentQuestion].front + '\nAnswer: ',
      name: 'userGuess'
    }
  ]).then(function (answers) {
    console.log('\n');
    if (answers.userGuess.toLowerCase() === basic[currentQuestion].back.toLowerCase()) {
      console.log('Correct, I love Wisconson! \n(You are welcome to join the crew in the basement!)\n');
      correct++;
    } else {
      console.log('Wrong, Red is gonna put his foot up your ass! \n (You know he will...)\n');
      wrong++;
    }
    //console.log(basic[currentQuestion].front);

    if (currentQuestion < basic.length - 1) {
      currentQuestion++;
      askQuestionB();
    } else {
      console.log('Game Over!');
      console.log('Correct Answers: ' + correct);
      console.log('Incorrect Answers: ' + wrong);
      console.log('\n AHhhhhh noooooo. (Fez is sad the game is over!)\n');

      inquirer.prompt([
        {
          type: 'confirm',
          message: 'Would you like to play again?',
          name: 'Again'
        }
      ]).then(function (answers) {
        // Reset Array to Index 0 and score variables to 0 and replay's the game.
        if (answers.Again) {
          currentQuestion = 0;
          correct = 0;
          wrong = 0;
          reload();

        } else {
          console.log('Thanks for playing!');
        }
      })
    }
  })
}

function reload () {
	inquirer.prompt([
		{
			type: "list",
			message: "Choose Your Flash Card Game",
			choices: ["Basic", "Cloze"],
			name: "choice"
		}
		]).then(function(user) {
			var inputResults = user.choice;

			switch (inputResults) {
				case "Basic":
					askQuestionB();
					break;
				case "Cloze":
					askQuestion();
					break;
				default:
					console.log("error");
			}
		});
};