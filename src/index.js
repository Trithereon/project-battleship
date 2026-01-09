import "./styles.css";
import "modern-normalize/modern-normalize.css";
import Player from "./player.js";
import UI from "./ui.js";

const ui = new UI();
const player1 = new Player("human");
const player2 = new Player("computer");
ui.renderBoards(player1, player2);
