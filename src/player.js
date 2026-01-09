// Player class module

import { Gameboard } from "./gameboard";

export default class Player {
  constructor(playerType) {
    this.playerType = playerType;
    // each player class, human or computer, should contain its own gameboard
    this.board = new Gameboard();

    // Temporary automatic ship placement.
    this.board.simulateShipPlacement();
  }
}
