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

## UI

I am stuck on a problem here. I need to render the ships onto the board, but I don't know how.
I could simply traverse the entire board and detect whether a ship is present on each Node, and change the cell color to red or something, but I want to instead print an SVG for each ship onto the board.

What if I store the direction of the ship inside a class? That way, I could

1. scan for the starting position of each ship,
2. check its direction, and
3. print the ship SVG in that direction.

Which would be most appropriate?

1. Ship
2. Gameboard
3. Player

I think Ship would make the most sense.

Ok now I have to figure out how I want to scan for ship starting position...

I surely need to start at [0,0] and then either row by row or column by column. Should be arbitrary, so I'll choose row by row.

What if I create a function like getShipPos(shipName) to return all positions occupied by a ship? Would that help?

The UI function that will place a ship SVG onto the board needs three things:

1. Ship name
2. Ship starting position
3. Ship direction

What is the simplest way to get that information, from reading the board 2d array?

## AI

I want two difficulty levels: easy, hard.

How "easy" proceeds is to choose a random valid position on the board every turn.

How "hard" proceeds is based on the state of the game.

1. First attacks until a hit is achieved: random.
2. After a hit, AI will randomly select one of four positions: x +/- 1, or y +/- 1 from previous hit position.
3. Repeat step 2 until a second hit.
4. After the second hit, keep firing shots along the same axis as the previous hits, until the ship is sunk.
5. After a ship is sunk, start over at step 1.

## Settings

1. Name = Human
2. Difficulty = Hard
3. Rows = 10
4. Columns = 10
