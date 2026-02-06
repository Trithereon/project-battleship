// Player class module

import { Gameboard } from "./gameboard";
import { settings } from "./settings";

export default class Player {
  constructor(playerType) {
    this.playerType = playerType;
    // each player class, human or computer, should contain its own gameboard
    this.board = new Gameboard(settings.rows, settings.columns);

    // Automatic random ship placement.
    this.board.simulateRandomShipPlacement();
  }

  getBoard = () => {
    return this.board;
  };
}
