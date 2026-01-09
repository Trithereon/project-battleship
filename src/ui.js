// DOM manipulation module.

export default class UI {
  constructor() {}
  renderBoards = (player1, player2) => {
    // Human player board.
    const player1Container = document.querySelector(".player1-container");
    player1Container.innerHTML = _createBoard(player1);
    // Computer player board.
    const player2Container = document.querySelector(".player2-container");
    player2Container.innerHTML = _createBoard(player2);
  };
}

// Helper functions.
const _createElement = (tag, classes, text) => {
  const element = document.createElement(tag);
  if (classes) element.classList.add(...classes.split(" "));
  if (text) element.textContent = text;
  return element;
};

const _createBoard = (player) => {
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
      html += `<td data-x="${x}" data-y="${y}">Cell</td>`;
    }
    html += "</tr>";
  }
  html += "</table>";
  return html;
};
