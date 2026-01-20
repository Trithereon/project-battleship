/**
 * @jest-environment jsdom
 */

import Game from "./game.js";

describe("Game", () => {
  let game;
  beforeEach(() => {
    game = new Game();
  });

  test("handleAttackClick works on empty Node", () => {
    const mockEvent = {
      target: {
        dataset: {
          x: "6",
          y: "7",
        },
      },
    };
    game.handleAttackClick(mockEvent);
    const emptyNode = game.player2.getBoard().getBoard()[6][7];
    expect(emptyNode.getShip()).toBeNull();
    expect(emptyNode.getStatus()).toBe(true);
  });

  test("handleAttackClick works on occupied Node", () => {
    const mockEvent = {
      target: {
        dataset: {
          x: "0",
          y: "0",
        },
      },
    };
    game.handleAttackClick(mockEvent);
    const emptyNode = game.player2.getBoard().getBoard()[0][0];
    expect(emptyNode.getShip()).toBeTruthy();
    expect(emptyNode.getStatus()).toBe(true);
  });
});
