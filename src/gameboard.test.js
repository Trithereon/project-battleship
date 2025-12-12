// Gameboard Unit Tests
import { Gameboard, Node } from "./gameboard";

describe("Gameboard", () => {
  const gameboard = new Gameboard();

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
});
