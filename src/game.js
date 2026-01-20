// Game module.
import Player from "./player.js";
import UI from "./ui.js";

export default class Game {
  constructor() {
    this.player1 = new Player("human");
    this.player2 = new Player("computer");
    this.currentTurn = null;
    this.gameOver = false;
  }

  initUI = () => {
    const ui = new UI();
    ui.renderBoards(this.player1, this.player2);
    this.setupEventListeners();
  };

  setupEventListeners = () => {
    // Attack clicks.
    document
      .querySelector(".player2-container")
      .addEventListener("click", this.handleAttackClick);
  };

  handleAttackClick = (e) => {
    if (e.target.dataset.x) {
      const x = e.target.dataset.x;
      const y = e.target.dataset.y;
      this.player2.getBoard().receiveAttack([x, y]);
    }
  };
}
