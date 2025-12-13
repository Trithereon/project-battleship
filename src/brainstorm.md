# Brainstorm

- Ok the focus is practicing test driven development TDD, so I need to definitely start by writing tests and then turning them green, one little thing at a time. I guess I'll be focusing on writing many pure functions and then refactor.
- It was recommended in the lessons to do...
  - Write test > Write function to pass the test > Continue until all requirements of the project are met > refactor the code, to make it cleaner or more DRY, avoid redundancy

## Ship

I need tests for Ship.
Maybe I should make a list of all the public functions Ship will have.
What uses Ship?

- Gameboard needs to track where the Ships are
- Player contains a Gameboard or two
- Player decides where to place their Ships
  - a public function placeShip?
  - I think Player only tells the Gameboard where to place a ship
- If Player is computer, ship placement is random

Conclusion: for now, let's assume that Ship functions are only called by Gameboard

List of functions:

1. isSunk
2. hit
