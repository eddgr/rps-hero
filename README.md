# RPS Hero
RPS Hero is a single player dungeon crawler using Rock, Paper, Scissors for the battle system.

Created by [@gamerman2001](https://www.github.com/gamerman2001) and [@eddgr](https://www.github.com/eddgr)

Demo: https://eddgr.github.io/rps-hero

# Game Play

Rock beats Scissors.
Scissors beats Paper.
Paper beats Rock.

Players begin with 10 health points (HP) and have a base damage of 3.

Why are their health points and damage in Rock, Paper, Scissors?

- Players can choose to Attack or Defend.

- Based on their choice, new modifiers are introduced from winning the round.

Here is a list of modifiers for both Attack or Defend.

## Rock
**Attack -** 2x Base Damage

**Defend -** 50% Damage Reduction for the next 2 turns

## Paper
**Attack -** 1x Base Damage and 50% Damage Reduction for the next turn

**Defend -** Heal 30% of total health points

## Scissors
**Attack -** Do between 1x and 2.5x Base Damage

**Defend -** Gain 50% Chance to Dodge for the next 2 turns

# Current Characters

**Lee -** Lee is more defensive.

**Jimmy -** Jimmy is more aggressive.

**Bob -** Bob, is most level headed of the group.

# Stack
RPS Hero was built using the following:

- JavaScript
- HTML
- Ruby on Rails
- NES.css - https://nostalgic-css.github.io/NES.css/
- Bootstrap

# To Do
- Player ranks based on current level
 - Bronze Hero, Silver Hero, Gold Hero, etc
- Add more characters
- Replace click event listeners with keydown listeners
- Add more original assets
- Fix HP bar bug
 - Sometimes the color of the HP bar does not change color
