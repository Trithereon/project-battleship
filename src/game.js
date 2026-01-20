// Game module.
import Player from "./player.js";
import UI from "./ui.js";

export default class Game {
  constructor() {}

  init() {
    // Initialize gameboards and players
    const ui = new UI();
    const player1 = new Player("human");
    const player2 = new Player("computer");
    ui.renderBoards(player1, player2);
  }
}
