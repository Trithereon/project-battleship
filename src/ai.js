// AI module, the logic to handle the computer player's turn.

export default class AI {
  constructor(difficulty, player) {
    this.difficulty = difficulty;
    this.shots = []; // Record of all previous shots.
    this.encirclingShots = []; // Record of shots in encircling mode.
    this.targetLineShots = []; // Record of shots in targetLine mode.
    this.attackMode = "random"; // "random", "encircling", "targetLine" mode.
    this.rows = player.getBoard().getRows();
    this.columns = player.getBoard().getColumns();
  }

  playTurn = (isValidTarget, player1Board) => {
    let shot;
    let target;
    if (this.attackMode === "encircling") {
      target = this._getNextEncircleTarget(isValidTarget);
    } else if (this.attackMode === "targetLine") {
      target = this._getNextTargetLineTarget(isValidTarget);
    } else {
      target = this._getRandomTarget(isValidTarget);
    }

    shot = {
      position: target,
      result: player1Board.receiveAttack(target),
    };

    this._updateShots(shot);
    this._updateAttackMode(shot);

    return shot;
  };

  _updateAttackMode = (shot) => {
    // Enter Encircling mode.
    if (shot.result === "hit" && this.attackMode === "random") {
      this.attackMode = "encircling";
    }
    // Enter targetLine mode.
    else if (shot.result === "hit" && this.attackMode === "encircling") {
      this.encirclingShots = []; // Reset encircle history.
      this.attackMode = "targetLine";
    }
  };

  _getNextEncircleTarget = (isValidTarget) => {
    return target;
  };

  _getRandomTarget = (isValidTarget) => {
    let x;
    let y;

    // get a random number between 0 and 9
    // Loop through random positions until a valid one is selected.
    do {
      x = Math.floor(Math.random() * this.columns);
      y = Math.floor(Math.random() * this.rows);
    } while (!isValidTarget(x, y));
    return [x, y];
  };

  _updateShots = (shot) => {
    this.shots.push(shot);
  };
}
