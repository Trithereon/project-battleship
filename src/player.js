// Player class module

import { Gameboard } from "./gameboard";

export default class Player {
  constructor(playerType) {
    this.playerType = playerType;
    // each player class, human or computer, should contain its own gameboard
    this.boardHuman = new Gameboard();
    this.boardComputer = new Gameboard();
  }
}
