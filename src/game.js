// Game module.
import AI from "./ai.js";
import Player from "./player.js";
import UI from "./ui.js";

export default class Game {
  constructor() {
    this.player1 = new Player("human");
    this.player2 = new Player("computer");
    this.currentTurn = this.getRandomPlayer();
    this.gameOver = false;
    this.ui = new UI();
    this.ai = new AI("easy", this.player2);
    this.initUI();

    // If AI plays first:
    if (this.currentTurn === "computer") this.playAITurn();

    // If Human plays first, nothing happens until user attacks.
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
    this.ai = new AI("easy", this.player2);
    this.initUI();

    // If AI plays first:
    if (this.currentTurn === "computer") this.playAITurn();

    // If Human plays first, nothing happens until user attacks.
  };

  getRandomPlayer = () => {
    if (Math.random() >= 0.5) return "human";
    else return "computer";
  };

  handleAttackClick = (e) => {
    // if statement to ensure click target is a valid cell.
    if (e.target.dataset.x) {
      const x = Number(e.target.dataset.x);
      const y = Number(e.target.dataset.y);
      const result = this.player2.getBoard().receiveAttack([x, y]);

      // Process results of attack: update UI, check for game over.
      if (result === "hit") {
        this.ui.displayHit(this.player2, [x, y]);
        if (this.player2.getBoard().checkGameOver()) {
          return this.handleGameOver(this.player2);
        }
      } else if (result === "miss") {
        this.ui.displayMiss(this.player2, [x, y]);
      }

      // Call AI to play its turn.
      this.playAITurn();
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

  playAITurn = () => {
    // AI plays turn.
    const shot = this.ai.playTurn(this.isValidTarget, this.player1.getBoard());
    if (shot.result === "hit") {
      this.ui.displayHit(this.player1, shot.position);
      if (this.player1.getBoard().checkGameOver()) {
        this.handleGameOver(this.player1);
      }
    } else if (shot.result === "miss") {
      this.ui.displayMiss(this.player1, shot.position);
    }
    this.switchTurns();
  };

  switchTurns = () => {
    if (this.currentTurn === "human") this.currentTurn = "computer";
    else this.currentTurn = "human";
  };

  isValidTarget = (x, y) => {
    const result = this.player1.getBoard().getBoard()[x][y].getShotStatus();
    if (result) return false;
    else return true;
  };
}
