// AI module, the logic to handle the computer player's turn.

export default class AI {
  constructor(difficulty) {
    this.difficulty = difficulty;
    this.shots = [];
  }

  playTurn = (isValidTarget, player1Board) => {
    let shot;
    // Random play.
    const target = this._getRandomTarget(isValidTarget);

    shot = {
      position: target,
      result: player1Board.receiveAttack(target),
    };

    this._updateShots(shot);
    return shot;
  };

  _getRandomTarget = (isValidTarget) => {
    let x;
    let y;

    // get a random number between 0 and 9
    // Loop through random positions until a valid one is selected.
    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    } while (!isValidTarget(x, y));
    return [x, y];
  };

  _updateShots = (shot) => {
    this.shots.push(shot);
  };
}
