import AI from "./ai";
import Player from "./player";

describe("_getRandomTarget", () => {
  let player2;
  let ai;
  beforeEach(() => {
    player2 = new Player("computer");
    ai = new AI("easy", player2);
  });
  test("_getRandomTarget correctly targets valid random cell", () => {
    const isValidTarget = jest.fn(() => true);

    // Mock Math.random to return specific values.
    jest
      .spyOn(Math, "random")
      .mockReturnValueOnce(0.35) // x = floor(0.35 * 10) = 3
      .mockReturnValueOnce(0.72); // y = floor(0.72 * 10) = 7

    const target = ai._getRandomTarget(isValidTarget);

    expect(target).toEqual([3, 7]);
    expect(isValidTarget).toHaveBeenCalledWith(3, 7);
  });
  test("_getRandomTarget retries until valid target found", () => {
    const isValidTarget = jest
      .fn()
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true);

    jest.spyOn(Math, "random").mockReturnValue(0.5);

    const target = ai._getRandomTarget(isValidTarget);

    expect(isValidTarget).toHaveBeenCalledTimes(3);
    expect(target).toEqual([5, 5]);
  });
});

describe("_getNextEncircleTarget", () => {
  let player2;
  let ai;

  beforeEach(() => {
    player2 = new Player("computer");
    ai = new AI("hard", player2);
  });

  test("Correctly targets specific cell", () => {
    const isValidTarget = jest.fn(() => true);
    ai.encirclingHits[0] = { position: [6, 6] };

    // Force index 1 of adjacentPositions = [x, y + 1]
    jest.spyOn(Math, "random").mockReturnValueOnce(0.409);
    const target = ai._getNextEncircleTarget(isValidTarget);

    expect(isValidTarget).toHaveBeenCalledWith(6, 7);
    expect(target).toEqual([6, 7]);
  });
  test("Returns adjacent cell to the center hit", () => {
    const isValidTarget = jest.fn(() => true);
    ai.encirclingHits[0] = { position: [6, 6] };
    const target = ai._getNextEncircleTarget(isValidTarget);
    const adjacentPositions = [
      [6, 5],
      [6, 7],
      [5, 6],
      [7, 6],
    ];
    expect(adjacentPositions).toContainEqual(target);
  });
  test("Only considers valid targets", () => {
    // Mocking that only position [6,7] is valid.
    const isValidTarget = jest.fn((x, y) => x === 6 && y === 7);
    ai.encirclingHits[0] = { position: [6, 6] };
    const target = ai._getNextEncircleTarget(isValidTarget);
    expect(target).toEqual([6, 7]);
    expect(isValidTarget).toHaveBeenCalledTimes(4);
  });
});

describe("_getNextTargetLineTarget", () => {
  let player2;
  let ai;

  beforeEach(() => {
    player2 = new Player("computer");
    ai = new AI("hard", player2);
  });
  test("Fires along horizontal axis after two horizontal hits", () => {
    ai.targetLineHits = [{ position: [5, 5] }, { position: [6, 5] }];
    const isValidTarget = jest.fn(() => true);
    const target = ai._getNextTargetLineTarget(isValidTarget);
    expect([
      [4, 5],
      [7, 5],
    ]).toContainEqual(target);
  });
  test("Fires along vertical axis after two vertical hits", () => {
    ai.targetLineHits = [{ position: [5, 5] }, { position: [5, 6] }];
    const isValidTarget = jest.fn(() => true);
    const target = ai._getNextTargetLineTarget(isValidTarget);
    expect([
      [5, 4],
      [5, 7],
    ]).toContainEqual(target);
  });
  test("Returns null when both ends of the horizontal line are invalid", () => {
    ai.targetLineHits = [{ position: [5, 5] }, { position: [6, 5] }];
    const isValidTarget = jest.fn(() => false);
    const target = ai._getNextTargetLineTarget(isValidTarget);
    expect(target).toBeNull();
  });
  test("Returns null when both ends of the vertical line are invalid", () => {
    ai.targetLineHits = [{ position: [5, 5] }, { position: [5, 6] }];
    const isValidTarget = jest.fn(() => false);
    const target = ai._getNextTargetLineTarget(isValidTarget);
    expect(target).toBeNull();
  });
  test("Targets correctly when horiz. line is longer than 2 hits", () => {
    ai.targetLineHits = [
      { position: [5, 5] },
      { position: [6, 5] },
      { position: [7, 5] },
    ];
    const isValidTarget = jest.fn(() => true);
    const target = ai._getNextTargetLineTarget(isValidTarget);
    expect([
      [8, 5],
      [4, 5],
    ]).toContainEqual(target);
  });
  test("Targets correctly when horiz. line is longer than 2 hits and only one end is valid", () => {
    ai.targetLineHits = [
      { position: [5, 5] },
      { position: [6, 5] },
      { position: [7, 5] },
    ];
    const isValidTarget = jest.fn((x, y) => x === 8 && y === 5);
    const target = ai._getNextTargetLineTarget(isValidTarget);
    expect(target).toEqual([8, 5]);
  });
  test("Targets correctly when vert. line is longer than 2 hits", () => {
    ai.targetLineHits = [
      { position: [5, 5] },
      { position: [5, 6] },
      { position: [5, 7] },
    ];
    const isValidTarget = jest.fn(() => true);
    const target = ai._getNextTargetLineTarget(isValidTarget);
    expect([
      [5, 8],
      [5, 4],
    ]).toContainEqual(target);
  });
  test("Targets correctly when vert. line is longer than 2 hits and only one end is valid", () => {
    ai.targetLineHits = [
      { position: [5, 5] },
      { position: [5, 6] },
      { position: [5, 7] },
    ];
    const isValidTarget = jest.fn((x, y) => x === 5 && y === 8);
    const target = ai._getNextTargetLineTarget(isValidTarget);
    expect(target).toEqual([5, 8]);
  });
});
