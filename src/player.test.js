import { Gameboard } from "./gameboard";
import Player from "./player";

// Player Unit Tests
describe("Player", () => {
  let player1;
  let player2;

  // Create a new instance of players before each test.
  beforeEach(() => {
    player1 = new Player("human");
    player2 = new Player("computer");
  });
  test("playerType is properly set when creating Player instance", () => {
    expect(player1.playerType).toBe("human");
    expect(player2.playerType).toBe("computer");
  });
  test("Each player has their own gameboard", () => {
    expect(player1.board).not.toBe(player2.board);
    expect(player1.board).toBeInstanceOf(Gameboard);
    expect(player2.board).toBeInstanceOf(Gameboard);
  });
});
