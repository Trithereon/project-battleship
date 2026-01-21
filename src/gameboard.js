// Gameboard class module

import Ship from "./ship";

export class Gameboard {
  constructor() {
    this.board = [];
    const rows = 10;
    const columns = 10;
    this.rows = rows;
    this.columns = columns;
    for (let i = 0; i < rows; i++) {
      this.board[i] = [];
      for (let j = 0; j < columns; j++) {
        this.board[i].push(new Node());
      }
    }
    this.ships = [
      new Ship(5, "Carrier"),
      new Ship(4, "Battleship"),
      new Ship(3, "Destroyer"),
      new Ship(3, "Submarine"),
      new Ship(2, "Patrol Boat"),
    ];
  }

  getRows = () => {
    return this.rows;
  };

  getColumns = () => {
    return this.columns;
  };

  getBoard = () => {
    return this.board;
  };

  getShips = () => {
    return this.ships;
  };

  placeShip = (ship, startPos, direction) => {
    let start = startPos;
    let end = [];
    ship.setStartPos(startPos);
    if (direction === "horizontal") {
      ship.setDirection("horizontal");
      end.push(startPos[0] + ship.getLength() - 1);
      end.push(startPos[1]);
    } else if (direction === "vertical") {
      ship.setDirection("vertical");
      end.push(startPos[0]);
      end.push(startPos[1] + ship.getLength() - 1);
    }

    // Need logic to fill in the positions between start and end
    if (start[0] === end[0]) {
      // increment positions, keeping x constant
      for (let i = start[1]; i <= end[1]; i++) {
        this.board[start[0]][i].ship = ship;
      }
    } else if (start[1] === end[1]) {
      // increment positions, keeping y constant
      for (let i = start[0]; i <= end[0]; i++) {
        this.board[i][start[1]].ship = ship;
      }
    }
  };

  receiveAttack = (pos) => {
    const node = this.board[pos[0]][pos[1]];
    if (node.ship) {
      node.ship.hit();
      node.shoot();
      return "hit";
    } else {
      node.shoot();
      return "miss";
    }
  };

  simulateShipPlacement = () => {
    let counter = 0;
    this.ships.forEach((ship) => {
      this.placeShip(ship, [counter, 0], "vertical");
      counter++;
    });
  };

  checkGameOver = () => {
    for (const ship of this.ships) {
      if (!ship.isSunk()) return false;
    }
    return true;
  };
}

// Each position on the gameboard stores a Node object
export class Node {
  constructor() {
    this.ship = null;
    this.hasShot = false;
  }
  shoot = () => {
    this.hasShot = true;
  };
  getShip = () => {
    return this.ship;
  };
  getStatus = () => {
    return this.hasShot;
  };
}
