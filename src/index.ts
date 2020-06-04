import { Hangman } from "./hangman";

class PlayHangman {
  // Read Interface to read input from terminal
  private static _readLineInterface = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  //Start Game
  public static async startGame() {
    console.log("\n\n  Hey, Let's play hangman.\n");

    // Choose Random Word To Get Started
    let randomWord = wordList[Math.floor(Math.random() * wordList.length)];

    // Initialize game.
    let hangman = new Hangman(randomWord);

    // Play until game ends.
    while (hangman.gameEndStatus == null) {
      // Print Game Status
      this._printGameStatus(hangman);

      // Read Next Guess.
      let guess = await this._readGuess();

      // Validate guess
      if (guess.length != 1) {
        console.log("\nInvalid Guess, provide one character, try again.");
      } else {
        // Check Guess
        hangman.validateGuess(guess);
      }

      // Print Seperator.
      console.log("\n-----------------------------------------------------\n");
    }

    // Print message according to game end status.
    if (hangman.gameEndStatus == true) {
      console.log(`\n Yup, it's ${randomWord}, You Win !!!\n\n`);
    } else if (hangman.gameEndStatus == false) {
      this._printGameStatus(hangman);
      console.log(`\n\n Game Over! Word was ${randomWord}\n\n`);
    }

    // Exit Game
    process.exit(0);
  }

  // Read guess from terminal
  private static async _readGuess(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this._readLineInterface.question(`  Make your guess: `, (guess) => {
        resolve(guess.toLowerCase());
      });
    });
  }

  // Print game status [Also draw sketch]
  private static _printGameStatus(hangman: Hangman) {
    // Create clone of existing game status
    let statusArray = Object.assign([], hangman.gameStatus);

    // Build status string (words with underscores)
    let statusString = "";
    for (let i = 0; i < statusArray.length; i++) {
      if (statusArray[i] == null) statusString += " __ ";
      else statusString += ` ${statusArray[i]} `;
    }

    // Build in-correct guesses message
    let incorrectGuesses = "";
    if (hangman.wrongWordsGuessed.length > 0) {
      incorrectGuesses = `Wrong Guesses: ${hangman.wrongWordsGuessed.join(
        ", "
      )}`;
    }

    // Draw sketch
    let sketch = {
      rope: hangman.triesLeft < 8 ? "|" : " ",
      head: hangman.triesLeft < 7 ? "O" : " ",
      body1: hangman.triesLeft < 6 ? "|" : " ",
      body2: hangman.triesLeft < 5 ? "|" : " ",
      leftHand: hangman.triesLeft < 4 ? "/" : " ",
      rightHand: hangman.triesLeft < 3 ? "\\" : " ",
      leftLag: hangman.triesLeft < 2 ? "/" : " ",
      rightLag: hangman.triesLeft < 1 ? "\\" : " ",
    };
    console.log(`   ____`);
    console.log(`  |    ${sketch.rope}      ${incorrectGuesses}`);
    console.log(`  |    ${sketch.head}      Tries Left : ${hangman.triesLeft}`);
    console.log(`  |   ${sketch.leftHand}${sketch.body1}${sketch.rightHand}`);
    console.log(`  |    ${sketch.body2}`);
    console.log(`  |   ${sketch.leftLag} ${sketch.rightLag} `);
    console.log(` _|_`);

    // Print Game Status String, if game has not ended
    if (hangman.gameEndStatus == null) {
      console.log(`\n\n  ${statusString}\n\n`);
    }
  }
}

PlayHangman.startGame();

// List of allowed words in game.
let wordList = [
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Croatia",
  "Cuba",
  "Cyprus",
];
