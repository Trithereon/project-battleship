// AI module, the logic to handle the computer player's turn.

export default class AI {
  constructor(difficulty) {
    this.difficulty = difficulty;
    this.shots = [];
  }

  playTurn = () => {
    let shot;
    let x;
    let y;

    shot = { position: [0, 0], result: "hit" };
    this.updateShots(shot);
  };

  _getRandomTarget = () => {
    let x;
    let y;

    // get a random number between 0 and 9
    // Math.floor(Math.random() * 10)

    // Loop through random positions until a valid one is selected.
    x = Math.floor(Math.random() * 10);
    y = Math.floor(Math.random() * 10);
    if (player1) return [x, y];
  };

  _isValid = (x, y) => {
    if (this.player1.getBoard().getBoard()[x][y].isValidTarget()) return true;
    else return false;
  };

  updateShots = (shot) => {
    this.shots.push(shot);
  };
}
