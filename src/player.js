// Player class module

import { Gameboard } from "./gameboard";

export default class Player {
  constructor(playerType, rows = 10, columns = 10) {
    this.playerType = playerType;
    // each player class, human or computer, should contain its own gameboard
    this.board = new Gameboard(rows, columns);

    // Temporary automatic ship placement.
    this.board.simulateShipPlacement();
  }

  getBoard = () => {
    return this.board;
  };
}
