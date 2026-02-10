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

Algorithm:

1. First attacks until a hit is achieved: random.
2. After a hit, Encircling mode: AI will randomly select one of four positions: x +/- 1, or y +/- 1 from previous hit position.
3. Repeat step 2 until a second hit.
4. After the second hit, TargetLine mode: keep firing shots along the same axis as the previous hits, until the ship is sunk.
5. After a ship is sunk, start over at step 1.

Wait! There is a problem: this algorithm poorly handles the situation where two hits on adjacent positions belong to two separate ships. If two ships are in parallel, they will never be sunk and the algorithm will revert back to random targeting instead of a more effective targeting strategy.

I could add a conditional statement like "If there are misses on both ends of the hit line, revert back to encircling on either of the two hit positions".

## Settings

1. Name = Human
2. Difficulty = Hard
3. Rows = 10
4. Columns = 10

## Random ship placement

This is tricky, because the ship placement must be valid. I can't simply plug in random numbers. How about I try to come up with rules to follow. `placeShip(ship, startPos, direction)`

1. First I should randomize the direction, because the limits on position are based on direction.
2. If direction vertical:
   1. startPos[0] or 'x' can be anything from 0 to this.columns - 1
   2. startPos[1] or 'y' can be anything from 0 to this.rows - ship.getLength()
3. If direction horizontal:
   1. startPos[0] can be anything from 0 to this.columns - ship.getLength()
   2. startPos[1] can be anything from 0 to this.rows - 1
4. No position along the ship's length can already be occupied by another ship.

## Concerns

1. The position format `[x,y]` is confusing. This code would benefit from a refactor to an object with two keys x and y instead. The position could then be called with `pos.x` and `pos.y`, instead of `pos[0]` and `pos[1]` which would make the code much more legible and easier to maintain.
