// Ship class module

export default class Ship {
  constructor(length, name) {
    this.length = length;
    this.name = name;
    this.hitCount = 0;
    this.direction = null;
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

  setDirection = (direction) => {
    this.direction = direction;
  };
}
