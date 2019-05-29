# RPS Hero

hp = 10
base dmg = 2 normal difficulty

### rock
- attack - 2x dmg
- defend - 50% damage reduction for 2x turn

### paper
- attack - 1x dmg, 50% damage reduction for 1x turn
- defend - heal 20% hp

### scissor
- attack - 1 - 2.5x dmg `(Math.random()*1.5)+1`
  <!-- - super attack - +1 base dmg -->
- defend - 50% chance next attack will miss for 1x turn
  <!-- - super defend - 50% hp recovery -->

### special
- win streaks will build up a counter
- neutral/draws do not reset counter
- once counter is full, save it until player uses it
 - special buff for 2x turns
 - super attack - +1 base dmg
 - super defend - 50% hp recovery


## Bosses
aggroBoss = [attack, attack, attack, defend]
defBoss = [defend, defn, def, attack]
regBoss = [attk, def]

## Score
- Rank up through level clears
  - Bronze - default
  - Silver - 10 levels
  - Gold - 25 levels
  - Platinum - 50 levels
  - Diamond - 100 levels
  - Ascended - 250 levels
  - Godly - 500 levels
  - Creators - 99999999999999999999999999999999999 levels
<!-- - calculate score at the end of each battle based on hp
  - remaining health
  - each dmg dealt to opponent (including negative/overkill)
    - negative/overkill per hp = 250 points
  - points are hp * 100 -->

## Models
- users has many scores through leaderboard, user has one leaderboard
- scores has many users through leaderboard, score has one leaderboard
- leaderboard (join table) and belongs to users and scores
  - user id, score id

## Classes
- game
  - story
  - media
  - game mode (normal, hard, etc) - stretch goal
- character
  - has hp
  - has dmg
  - attack/defend
  - has special counter
  - **user**
    - current level
    - has many scores through leaderboard
  - **boss**
    - play style (aggro, def, etc)

## Media Needed
- styling: https://nostalgic-css.github.io/NES.css/
- attack
- defend
- rock
- paper
- scissor
- special counter (gem or something)
- different character expressions
- **stretch goal** take a photo of user and make them the character

## MVP
### Bare Minimum
<!-- - rock paper scissor
- current user and computer hp -->
<!-- - game ends when one player reaches 0 hp or less -->
### Next Deliverable
<!-- - DOM input -->
- add attack/defend
  <!-- - after selecting RPS, go back to A/D choice -->
  - user1 win condition should check user2buffs
  - user1 lose condition should check user1buffs
  - calculate computer buff against us
- abstract code
- create backend
- character design
- special counter

## Edgar To Do
<!-- - make player 2 buff work -->
  <!-- - abstract current buffs so that it can apply to be player 1 or 2 -->
- change output text to reflect actual damage
- fix progress bar

- after selection, an animation should show both characters' choices
  - and show their attack/defend and rps choice,
  - then damage taken if any


## Notes

``` javascript
Math.sign(number1 - number 2)
if number1 > number2 = 1 (win)
if number1 < number2 = -1 (lose)
if number1 === number2 = 0 (neutral)

// ROCK
  Math.sign(rpsChoices.indexOf("rock")-rpsChoices.indexOf("paper")) === -1
  Math.sign(rpsChoices.indexOf("rock")-rpsChoices.indexOf("rock")) === 0
  Math.sign(rpsChoices.indexOf("scissor")-rpsChoices.indexOf("rock")) === 1

// PAPER
  Math.sign(rpsChoices.indexOf("paper")-rpsChoices.indexOf("rock")) === 1
  Math.sign(rpsChoices.indexOf("paper")-rpsChoices.indexOf("paper")) === 0
  Math.sign(rpsChoices.indexOf("paper")-rpsChoices.indexOf("scissor")) === -1

// SCISSOR
  Math.sign(rpsChoices.indexOf("rock")-rpsChoices.indexOf("scissor")) === -1
  Math.sign(rpsChoices.indexOf("scissor")-rpsChoices.indexOf("scissor")) === 0
  Math.sign(rpsChoices.indexOf("scissor")-rpsChoices.indexOf("paper")) === 1
```
