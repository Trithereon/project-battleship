// Game module.
import Player from "./player.js";
import UI from "./ui.js";

export default class Game {
  constructor() {
    this.player1 = new Player("human");
    this.player2 = new Player("computer");
    this.currentTurn = this.getRandomPlayer();
    this.gameOver = false;
    this.ui = new UI();
    this.initUI();
  }

  initUI = () => {
    this.ui.renderBoards(this.player1, this.player2);
    this.setupEventListeners();
  };

  setupEventListeners = () => {
    // Attack clicks.
    document
      .querySelector(".player2-container")
      .addEventListener("click", this.handleAttackClick);

    // Start new game button.
    const form = document.getElementById("start-new-game");
    form.addEventListener("submit", () => {
      this.startNewGame();
    });
  };

  startNewGame = () => {
    this.player1 = new Player("human");
    this.player2 = new Player("computer");
    this.currentTurn = this.getRandomPlayer();
    this.gameOver = false;
    this.ui = new UI();
    this.initUI();
  };

  getRandomPlayer = () => {
    if (Math.random() >= 0.5) return "human";
    else return "computer";
  };

  handleAttackClick = (e) => {
    if (e.target.dataset.x) {
      const x = Number(e.target.dataset.x);
      const y = Number(e.target.dataset.y);
      const result = this.player2.getBoard().receiveAttack([x, y]);
      if (result === "hit") {
        this.ui.displayHit(this.player2, [x, y]);
        if (this.player2.getBoard().checkGameOver()) {
          this.handleGameOver(this.player2);
        }
      } else if (result === "miss") {
        this.ui.displayMiss(this.player2, [x, y]);
      }
    }
  };

  handleGameOver = (defeatedPlayer) => {
    // Display victory message.
    if (defeatedPlayer.playerType === "human") {
      this.ui.displayDefeat();
    } else if (defeatedPlayer.playerType === "computer") {
      this.ui.displayVictory();
    }
    this.gameOver = true;
  };

  playRound = () => {
    // while (this.gameOver = false) play turns
    // start loop
    // player whose playerType === currentTurn, play turn.
    // currentTurn becomes opposing player
    // end loop
  };
}
