import "./styles.css";
import "modern-normalize/modern-normalize.css";
import Player from "./player.js";
import UI from "./ui.js";

// Initialize gameboards and players
const ui = new UI();
const player1 = new Player("human");
const player2 = new Player("computer");
ui.renderBoards(player1, player2);
ui.displayHit(player1, [0, 0]);
ui.displayHit(player1, [1, 0]);
ui.displayHit(player1, [2, 0]);
ui.displayHit(player1, [3, 1]);
ui.displayHit(player1, [4, 0]);
ui.displayHit(player1, [0, 1]);
ui.displayHit(player1, [0, 2]);
ui.displayHit(player1, [0, 3]);
ui.displayHit(player1, [0, 4]);
