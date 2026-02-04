// AI module, the logic to handle the computer player's turn.

export default class AI {
  constructor(difficulty, player) {
    this.difficulty = difficulty;
    this.shots = []; // Record of all previous shots.
    this.hits = []; // Record of hits.
    this.encirclingHits = []; // Hits while in encircling mode.
    this.targetLineHits = [];
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

    // With target position determined,
    // based on current attackMode strategy,
    // fire a shot and store the result.
    shot = {
      position: target,
      result: player1Board.receiveAttack(target),
    };

    this._updateShots(shot);
    this._updateAttackMode(shot);

    return shot;
  };

  _updateShots = (shot) => {
    this.shots.push(shot);
    if (shot.result === "hit" || shot.result === "sunk") {
      this.hits.push(shot);
    }
  };

  _updateAttackMode = (shot) => {
    if (shot.result === "hit") {
      this.hits.push(shot);
      // Enter Encircling mode after a hit in random mode.
      if (this.attackMode === "random" && this.difficulty === "hard") {
        this.attackMode = "encircling";
        this.encirclingHits = []; // Reset encircle history.
        this.encirclingHits.push(shot); // This is the "center".
      }
      // Enter targetLine mode after a hit in Encircling mode.
      else if (this.attackMode === "encircling") {
        this.encirclingHits.push(shot);
        this.targetLineHits.push(...this.encirclingHits);
        this.attackMode = "targetLine";
      }
    }
  };

  _getNextEncircleTarget = (isValidTarget) => {
    const center = this.encirclingHits[0];
    const x = center.position[0];
    const y = center.position[1];
    const adjacentPositions = [
      [x, y - 1], // Up
      [x, y + 1], // Down
      [x - 1, y], // Left
      [x + 1, y], // Right
    ];

    // Filter valid targets from 4 options.
    const validTargets = adjacentPositions.filter(([posX, posY]) => {
      return isValidTarget(posX, posY);
    });

    // Select a target at random.
    const randomIndex = Math.floor(Math.random() * validTargets.length);

    // Return random adjacent valid target position, in [x,y] format.
    return validTargets[randomIndex];
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

  _getNextTargetLineTarget = (isValidTarget) => {
    let dir;
    let adjacentPositions = [];
    // Sorting the hits by position to help this method find the ends of the line.
    // This sorts top-down if vertical, left-right if horizontal.
    // lineHitsPos looks like [[x,y],[x2,y2],[x3,y3],...]
    const lineHitsPos = this.targetLineHits
      .sort((a, b) => a.position - b.position)
      .map((hit) => hit.position);

    // Determine attack direction by lining up hits.
    if (lineHitsPos[0][0] === lineHitsPos[1][0])
      dir = "vertical"; // Compare x's
    else if (lineHitsPos[0][1] === lineHitsPos[1][1]) dir = "horizontal"; // Compare y's

    // "first" and "last" hits along the line.
    const firstHit = lineHitsPos[0];
    const lastHit = lineHitsPos[lineHitsPos.length - 1];
    if (dir === "vertical") {
      adjacentPositions = [
        [firstHit[0], firstHit[1] - 1],
        [firstHit[0], lastHit[1] + 1],
      ];
    } else if (dir === "horizontal") {
      adjacentPositions = [
        [firstHit[0] - 1, firstHit[1]],
        [lastHit[0] + 1, firstHit[1]],
      ];
    }
    const validTargets = adjacentPositions.filter(([posX, posY]) => {
      return isValidTarget(posX, posY);
    });
    const randomIndex = Math.floor(Math.random() * validTargets.length);
    return validTargets[randomIndex];
  };
}
