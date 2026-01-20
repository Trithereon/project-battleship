// Game module.
import Player from "./player.js";
import UI from "./ui.js";

export default class Game {
  constructor() {
    this.player1 = null;
    this.player2 = null;
    this.currentTurn = null;
    this.gameOver = false;
  }

  init = () => {
    // Initialize gameboards and players
    const ui = new UI();
    const player1 = new Player("human");
    const player2 = new Player("computer");
    ui.renderBoards(player1, player2);
    this.setupEventListeners();
  };

  setupEventListeners = () => {
    document
      .querySelector(".player2-container")
      .addEventListener("click", this.handleAttackClick);
  };

  handleAttackClick = (e) => {
    if (e.target.dataset.x) {
      return `${e.target.dataset.x}, ${e.target.dataset.y}`;
    }
  };
}
