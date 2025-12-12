// Ship class module

export default class Ship {
  constructor(length) {
    this.length = length;
    this.hitCount = 0;
  }

  hit = () => {
    this.hitCount++;
    // TODO update all Gameboards with hit coordinates
  };

  isSunk = () => {
    if (this.hitCount === this.length) {
      return true;
    } else return false;
  };
}
