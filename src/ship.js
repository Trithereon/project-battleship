// Ship class module

export default class Ship {
  constructor(length, name) {
    this.length = length;
    this.name = name;
    this.hitCount = 0;
    this.direction = null;
    this.startPos = null;
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

  setStartPos = (startPos) => {
    this.startPos = startPos;
  };

  getStartPos = () => {
    return this.startPos;
  };

  setDirection = (direction) => {
    this.direction = direction;
  };

  getDirection = () => {
    return this.direction;
  };

  getName = () => {
    return this.name;
  };

  getLength = () => {
    return this.length;
  };
}
