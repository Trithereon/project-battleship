// Gameboard Unit Tests
import { Gameboard, Node } from "./gameboard";
import Ship from "./ship";

describe("Gameboard", () => {
  let gameboard;
  beforeEach(() => {
    gameboard = new Gameboard();
  });

  test("getBoard returns a 10x10 2D array of Nodes", () => {
    const board = gameboard.getBoard();
    // 10 columns (board is an array of 10 arrays (rows))
    expect(board).toHaveLength(10);
    expect(Array.isArray(board)).toBe(true);

    // Each row is an array of 10 Node objects
    board.forEach((row) => {
      expect(row).toHaveLength(10);
      expect(Array.isArray(row)).toBe(true);

      row.forEach((node) => {
        expect(node).toBeInstanceOf(Node);
      });
    });
  });
  test("placeShip stores a Ship object in its corresponding Nodes", () => {
    const ship = new Ship(4);
    gameboard.placeShip(ship, [6, 7], [6, 4]);
    const board = gameboard.getBoard();
    let shipPosition = [];
    // Consider refactoring the following for loops using filter and forEach
    for (let i = 0; i <= 9; i++) {
      for (let j = 0; j <= 9; j++) {
        if (board[i][j].ship) {
          shipPosition.push([i, j]);
          // eslint-disable-next-line jest/no-conditional-expect
          expect(board[i][j]).toMatchObject({ ship: ship, hasShot: false });
        }
      }
    }
    expect(shipPosition).toEqual([
      [6, 4],
      [6, 5],
      [6, 6],
      [6, 7],
    ]);
  });
  test("receiveAttack correctly registers a miss", () => {
    const board = gameboard.getBoard();
    gameboard.receiveAttack([5, 5]);
    expect(board[5][5].ship).toBeNull();
    expect(board[5][5].hasShot).toBe(true);
  });
  test("receiveAttack correctly registers a hit", () => {
    const ship = new Ship(4);
    gameboard.placeShip(ship, [6, 7], [6, 4]);
    const board = gameboard.getBoard();
    gameboard.receiveAttack([6, 7]);
    expect(board[6][7].ship.hitCount).toBe(1);
    expect(board[6][7].hasShot).toBe(true);
  });
  test("checkGameEnd correctly identifies a game over", () => {
    gameboard.ships = [new Ship(1)];
    gameboard.placeShip(gameboard.ships[0], [0, 0], [0, 0]);
    gameboard.receiveAttack([0, 0]);
    expect(gameboard.checkGameEnd()).toBe(true);
  });
  test("checkGameEnd correctly identifies an ongoing game", () => {
    gameboard.simulateShipPlacement();
    expect(gameboard.checkGameEnd()).toBe(false);
  });
});
