// Ship Unit Tests
import Ship from "./ship";

describe("Ship", () => {
  let ship;
  beforeEach(() => (ship = new Ship(2, "patrol boat")));

  test("hit() increments number of hits on the Ship", () => {
    expect(ship.hitCount).toBe(0);
    ship.hit();
    expect(ship.hitCount).toBe(1);
  });
  test("isSunk() returns false while hitCount < length, then true", () => {
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});
