import game from "./game.js";

describe("Game", () => {
  test("handleAttackClick returns 'x, y' when target has data-x and data-y", () => {
    const mockEvent = {
      target: {
        dataset: {
          x: "4",
          y: "9",
        },
      },
    };
    expect(game.handleAttackClick(mockEvent)).toBe("4, 9");
  });
});
