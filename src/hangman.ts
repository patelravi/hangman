export class Hangman {
  private _word: string[] = null; // List of word charactres use for matching guesses.
  public gameStatus: string[] = null; // Status of game
  public wrongWordsGuessed: string[] = []; // List of all wrong words guessed
  public triesLeft: number = 8; // Number of wrong tries left.

  // Game end status
  // Three possible values: null = game running, true = game won, false = game lost.
  public gameEndStatus = null;

  /**
   * Initialize game object with word to play with.
   * @param word: Word to guess
   **/
  constructor(word: string) {
    // Replace space with dash
    word = word.toLowerCase().replace(/\s/g, "-");
    this._word = word.split("");

    // Replace spaces with dashes
    this.gameStatus = new Array(this._word.length).fill(null);
    for (let i = 0; i < this._word.length; i++) {
      if (this._word[i] === "-") this.gameStatus[i] = "-";
    }
  }

  // Function to execute when user makes a guess
  // Function will also modify game end status, if game has ended.
  public validateGuess(char: string): boolean {
    // If game has alredy ended, return
    if (this.gameEndStatus != null) {
      throw new Error("Game has already ended.");
    }

    // Check for match
    let index = this._word.indexOf(char);

    if (index >= 0) {
      // Valid Guess

      // Replace all matching characters
      do {
        // Put word in game status
        this.gameStatus[index] = char;

        // Remove the char at index for next search of same char
        this._word[index] = "~";

        // Check for next occurence of char
        index = this._word.indexOf(char);
      } while (index >= 0);

      // Check for game end.
      if (this.gameStatus.indexOf(null) < 0) {
        this.gameEndStatus = true;
      }

      return true;
    } else {
      // Wrong guess

      // Reduce remaining tries
      this.triesLeft--;

      // Modify list of wrong guesses
      if (this.wrongWordsGuessed.indexOf(char) < 0)
        this.wrongWordsGuessed.push(char);

      // Check for game end.
      if (this.triesLeft == 0) {
        this.gameEndStatus = false;
      }

      return false;
    }
  }
}
