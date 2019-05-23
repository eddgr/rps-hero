# RPS Hero

hp = 10
base dmg = 2 normal difficulty

### rock
- attack - 2x dmg
- defend - 50% damage reduction for 2x turn

### paper
- attack - 1x dmg, 50% damage reduction for 1x turn
- defend - heal 10% hp

### scissor
- attack - 1 - 2.5x dmg `(Math.random()*1.5)+1`

- defend - 50% chance next attack will miss for 1x turn

### special
- win streaks will build up a counter
- neutral/draws do not reset counter
- once counter is full, save it until player uses it
 - super attack or super defend

## Bosses
aggroBoss = [attack, attack, attack, defend]
defBoss = [defend, defn, def, attack]
regBoss = [attk, def]

## Score
- calculate score at the end of each battle based on hp
  - remaining health
  - each dmg dealt to opponent (including negative/overkill)
    - negative/overkill per hp = 250 points
  - points are hp * 100

## Models
- game model
- character
  - has hp
  - has dmg
  - attack/defend
  - has special counter
  - << user
    - current level
    - has many scores through leaderboard
  - << boss
    - play style (aggro, def, etc)
- story
  - game mode (normal, hard, etc)
- scores has many users through leaderboard
- leaderboard (join table)
  - user id, score id
- media

## Media Needed
- attack
- defend
- rock
- paper
- scissor
- special counter (gem or something)
- different character expressions
- **stretch goal** take a photo of user and make them the character
