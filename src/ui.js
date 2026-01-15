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
    player1Container.innerHTML = _createBlankBoard(player1);
    _renderShips(player1);

    // Computer player board.
    const player2Container = document.querySelector(".player2-container");
    player2Container.innerHTML = _createBlankBoard(player2);
  };

  displayHit = (player, position) => {
    const fire = _createElement("img", "fire");
    fire.src = fireGif;
    const cell = _getTargetCell(player, position);
    cell.appendChild(fire);
    cell.classList.add("hit");
  };

  displayMiss = (player, position) => {
    const cell = _getTargetCell(player, position);
    cell.textContent = "X";
    cell.classList.add("miss");
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
  let html = "<table>";
  const rows = player.getBoard().getRows();
  const cols = player.getBoard().getColumns();

  // Column headers.
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

const _renderShips = (player) => {
  // Loop through ships and append each to board.
  const ships = player.getBoard().getShips();
  for (const ship of ships) {
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
    const container = document.querySelector(`div.player1-container`);
    const cell = container.querySelector(`td[data-x="${x}"][data-y="${y}"]`);
    const cellRect = cell.getBoundingClientRect(); // Cell position relative to viewport.
    const containerRect = container.getBoundingClientRect(); // Container position relative to viewport.
    shipElem.style.top = cellRect.top - containerRect.top + "px";
    shipElem.style.left = cellRect.left - containerRect.left + "px";
    // Handle rotation based on ship direction.
    if (shipDir === "vertical") {
      shipElem.style.transformOrigin = "26px 26px"; // Center of the startPos cell.
      shipElem.style.transform = "rotate(90deg)";
    }
    container.appendChild(shipElem);
  }
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
