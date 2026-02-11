// Game module.
import AI from "./ai.js";
import Player from "./player.js";
import UI from "./ui.js";
import { settings } from "./settings.js";

export default class Game {
  constructor() {
    this.player1 = new Player("human");
    this.player2 = new Player("computer");
    this.currentTurn = this._getRandomPlayer();
    this.gameOver = false;
    this.ui = new UI();
    this.ai = new AI(settings.difficulty, this.player2);
    this.ui.renderBoards(this.player1, this.player2);
    this.setupEventListeners();

    this.ui.displayStartModal();
    // If Human plays first, nothing happens until user attacks.
  }

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

    // Randomize ship placement using R key.
    document.addEventListener("keydown", (e) => {
      if (e.code === "KeyR") this.startNewGame();
    });
  };

  startNewGame = () => {
    this.player1 = new Player("human");
    this.player2 = new Player("computer");
    this.currentTurn = this._getRandomPlayer();
    this.gameOver = false;
    this.ui = new UI();
    this.ai = new AI("hard", this.player2);
    this.ui.renderBoards(this.player1, this.player2);
    this.ui.renderShips(this.player1);

    // If AI plays first:
    if (this.currentTurn === "computer") this.playAITurn();

    // If Human plays first, nothing happens until user attacks.
  };

  _getRandomPlayer = () => {
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
      } else if (result === "miss") {
        this.ui.displayMiss(this.player2, [x, y]);
      } else if (result === "sunk") {
        this.ui.displayHit(this.player2, [x, y]);
        this.ui.displaySunk(this.player2, [x, y]);
        if (this.player2.getBoard().checkGameOver()) {
          return this.handleGameOver(this.player2);
        }
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
    } else if (shot.result === "miss") {
      this.ui.displayMiss(this.player1, shot.position);
    } else if (shot.result === "sunk") {
      this.ui.displayHit(this.player1, shot.position);
      this.ui.displaySunk(this.player1, shot.position);
      if (this.player1.getBoard().checkGameOver()) {
        this.handleGameOver(this.player1);
      }
    }
    this.switchTurns();
  };

  switchTurns = () => {
    if (this.currentTurn === "human") this.currentTurn = "computer";
    else this.currentTurn = "human";
  };

  isValidTarget = (x, y) => {
    // Out-of-bounds check.
    if (x > settings.rows - 1 || x < 0 || y < 0 || y > settings.columns - 1) {
      return false;
    }
    // Untouched position check.
    const isAlreadyShot = this.player1
      .getBoard()
      .getBoard()
      [x][y].getShotStatus();
    if (isAlreadyShot) return false;
    else return true;
  };
}
