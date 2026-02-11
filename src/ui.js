// DOM manipulation module.
import carrierSVG from "./img/icons/carrier.svg";
import battleshipSVG from "./img/icons/battleship.svg";
import destroyerSVG from "./img/icons/destroyer.svg";
import submarineSVG from "./img/icons/submarine.svg";
import patrolBoatSVG from "./img/icons/patrol-boat.svg";
import fireGif from "./img/icons/fire.gif";

export default class UI {
  constructor() {}
  renderBoards = (player1, player2) => {
    // Human player board.
    const player1Container = document.querySelector(".player1-container");
    const player1Board = player1Container.querySelector(".board-container");
    player1Board.innerHTML = _createBlankBoard(player1);
    const player1Ships = player1Container.querySelector(".ships-container");
    player1Ships.innerHTML = "";

    // Computer player board.
    const player2Container = document.querySelector(".player2-container");
    const player2Board = player2Container.querySelector(".board-container");
    player2Board.innerHTML = _createBlankBoard(player2);
    const player2Ships = player2Container.querySelector(".ships-container");
    player2Ships.innerHTML = "";
  };

  renderShips = (player) => {
    // Loop through ships and append each to board.
    const ships = player.getBoard().getShips();
    for (const ship of ships) {
      _renderSingleShip(player, ship);
    }
  };

  displayHit = (player, pos) => {
    const fire = _createElement("img", "fire");
    fire.src = fireGif;
    const cell = _getTargetCell(player, pos);
    cell.appendChild(fire);
    cell.classList.add("hit");

    const dir = player
      .getBoard()
      .getBoard()
      [pos[0]][pos[1]].getShip()
      .getDirection();
    if (player.playerType === "human" && dir === "vertical") {
      fire.style.transform = "rotate(90deg)";
    }
  };

  displayMiss = (player, pos) => {
    const cell = _getTargetCell(player, pos);
    cell.textContent = "X";
    cell.classList.add("miss");
  };

  displaySunk = (player, pos) => {
    const ship = player.getBoard().getBoard()[pos[0]][pos[1]].getShip();
    _renderSingleShip(player, ship);
  };

  displayStartModal = () => {
    const modal = document.querySelector("#game-over-modal");
    modal.querySelector("h2").textContent = "Man your battle stations!";
    modal.querySelector("p.first-line").textContent =
      "The enemy has deployed an advanced computer program targeting our ships. ";
    modal.querySelector("p.second-line").textContent = "You must defeat it!";
    modal.showModal();
  };

  displayVictory = () => {
    const modal = document.querySelector("#game-over-modal");
    modal.querySelector("h2").textContent = "VICTORY!";
    modal.querySelector("p.first-line").textContent =
      "Congratulations! You have won the game!";
    modal.querySelector("p.second-line").textContent = "";
    modal.showModal();
  };

  displayDefeat = () => {
    const modal = document.querySelector("#game-over-modal");
    modal.querySelector("h2").textContent = "DEFEAT!";
    modal.querySelector("p.first-line").textContent =
      "Alas! You were defeated in battle!";
    modal.querySelector("p.second-line").textContent = "";
    modal.showModal();
  };
}

// Helper functions.
const _createElement = (tag, classes, text) => {
  const element = document.createElement(tag);
  if (classes) element.classList.add(...classes.split(" "));
  if (text) element.textContent = text;
  return element;
};

const _createBlankBoard = (player) => {
  const rows = player.getBoard().getRows();
  const cols = player.getBoard().getColumns();

  // Column headers.
  let html = "<table>";
  html += "<thead>";
  html += `<tr><th scope="col"></th>`;
  for (let c = 1; c <= cols; c++) {
    html += `<th scope="col">${c}</th>`;
  }
  html += "</tr>";
  html += "</thead>";

  // Rows.
  html += "<tbody>";
  for (let y = 0; y < rows; y++) {
    const rowHeader = String.fromCharCode(65 + y); // 65 is A
    html += `<tr><th scope="row">${rowHeader}</th>`;
    for (let x = 0; x < cols; x++) {
      html += `<td data-x="${x}" data-y="${y}"></td>`;
    }
    html += "</tr>";
  }
  html += "</table>";

  return html;
};

const _renderSingleShip = (player, ship) => {
  let shipSVG;
  switch (ship.getName()) {
    case "Carrier":
      shipSVG = carrierSVG;
      break;
    case "Battleship":
      shipSVG = battleshipSVG;
      break;
    case "Destroyer":
      shipSVG = destroyerSVG;
      break;
    case "Submarine":
      shipSVG = submarineSVG;
      break;
    case "Patrol Boat":
      shipSVG = patrolBoatSVG;
  }
  const shipElem = _createElement("img", "ship");
  shipElem.src = shipSVG;
  shipElem.alt = ship.getName();
  const x = ship.getStartPos()[0]; // from [x, y]
  const y = ship.getStartPos()[1];
  const shipDir = ship.getDirection();

  // Position ship <img> element.
  let playerContainer;
  if (player.playerType === "human") {
    playerContainer = document.querySelector(`div.player1-container`);
  } else if (player.playerType === "computer") {
    playerContainer = document.querySelector(`div.player2-container`);
  }
  const shipsContainer = playerContainer.querySelector("div.ships-container");
  const cell = playerContainer.querySelector(
    `td[data-x="${x}"][data-y="${y}"]`,
  );
  const cellRect = cell.getBoundingClientRect(); // Cell position relative to viewport.
  const containerRect = playerContainer.getBoundingClientRect(); // Container position relative to viewport.
  shipElem.style.top = cellRect.top - containerRect.top + "px";
  shipElem.style.left = cellRect.left - containerRect.left + "px";
  // Handle rotation based on ship direction.
  if (shipDir === "vertical") {
    shipElem.style.transformOrigin = "26px 26px"; // Center of the startPos cell.
    shipElem.style.transform = "rotate(90deg)";
  }
  shipsContainer.appendChild(shipElem);
};

const _getTargetCell = (player, position) => {
  let cell;
  if (player.playerType === "human") {
    cell = document.querySelector(
      `div.player1-container td[data-x="${position[0]}"][data-y="${position[1]}"]`,
    );
  } else if (player.playerType === "computer") {
    cell = document.querySelector(
      `div.player2-container td[data-x="${position[0]}"][data-y="${position[1]}"]`,
    );
  }
  return cell;
};
