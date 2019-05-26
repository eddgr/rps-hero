// Math.sign(number1 - number 2)
// if number1 > number2 = 1 (win)
// if number1 < number2 = -1 (lose)
// if number1 === number2 = 0 (neutral)

// ROCK
  // Math.sign(rpsChoices.indexOf("rock")-rpsChoices.indexOf("paper")) === -1
  // Math.sign(rpsChoices.indexOf("rock")-rpsChoices.indexOf("rock")) === 0
  // Math.sign(rpsChoices.indexOf("scissor")-rpsChoices.indexOf("rock")) === 1

// PAPER
  // Math.sign(rpsChoices.indexOf("paper")-rpsChoices.indexOf("rock")) === 1
  // Math.sign(rpsChoices.indexOf("paper")-rpsChoices.indexOf("paper")) === 0
  // Math.sign(rpsChoices.indexOf("paper")-rpsChoices.indexOf("scissor")) === -1

// SCISSOR
  // Math.sign(rpsChoices.indexOf("rock")-rpsChoices.indexOf("scissor")) === -1
  // Math.sign(rpsChoices.indexOf("scissor")-rpsChoices.indexOf("scissor")) === 0
  // Math.sign(rpsChoices.indexOf("scissor")-rpsChoices.indexOf("paper")) === 1

// GAME LOOP for testing purposes only
function checkHP(user1 = lee, user2 = bob){
  while (user1.hp > 0 && user2.hp > 0){
    playRound()
  } // while statement

  if (user1.hp <= 0) {
    user1.hp = 10
    user2.hp = 10

    output.innerHTML += `
    <h2>You Lose!</h2>
    `
  } else {
    user1.hp = 10
    user2.hp = 10

    output.innerHTML += `
    <h2>You Win!</h2>
    `
    return checkHP()
  }
} // checkHP function
// end GAME LOOP

// rock paper scissor AI logic
const rollRPS = () => {
  switch(rpsChoices.sample()){
    case("rock"):
      return "rock"
      break
    case("paper"):
      return "paper"
      break
    case("scissor"):
      return "scissor"
      break
  } // end switch
}
// end AI logic

// end MISC

// CLASS CHARACTERS
class Character {
  constructor(name) {
     this.name = name
     this.hp = 10
     this.damage = 2
  }
}

// seed
const lee = new Character('Lee')
const bob = new Character('Bob')
// end CLASS CHARACTERS

// HELPERS
// adding 'sample' to Array prototype to randomize a return item from an array
// this requires 'sample' to be invoked
Array.prototype.sample = function(){
  return this[Math.floor(Math.random()*this.length)];
}

const grab = (funcArg) => {
  return document.querySelector(funcArg)
}
// end HELPERS
const rpsChoices = ["rock", "paper", "scissor"]

// RESET
function resetGame(player1 = lee, player2 = bob){
  player1Health.value = '10'
  player2Health.value = '10'
  player1.hp = 10
  player2.hp = 10
  output.innerHTML = ''
}
// end RESET

// checkHealth
// check character health every turn to determine whether to reset game or not
let checkHealth = (player1, player2) => {
  if (player1.hp <= 0){
    resetGame(player1, player2)
    output.innerHTML += `
      <h2>You lose</h2>
    `
  } else if (player2.hp <= 0){
    resetGame(player1, player2)
    output.innerHTML += `
      <h2>You win!</h2>
    `
  }
}
// end checkHealth

//TODO: USER CHOICE IS BEING TESTED!!!!! TAKE OUT WHEN DONE
function playRound(userChoice1 = rollRPS(), userChoice2 = rollRPS()){
  // conditional for rock/scissor win and lose needs to be swapped
  if (userChoice1 === "rock" && userChoice2 === "scissor" || userChoice1 === 'scissor' && userChoice2 === 'rock'){
    switch (Math.sign(rpsChoices.indexOf(userChoice2)-rpsChoices.indexOf(userChoice1))){
      case (-1):
        lee.hp -= bob.damage

        player1Health.value = lee.hp
        output.innerHTML += `
          <p>You lost this round and took ${bob.damage} damage.</p>
        `
        break
      case (0):
        output.innerHTML += `
          <p>Draw, no damage.</p>
        `
        break
      case (1):
        bob.hp -= lee.damage

        player2Health.value = bob.hp
        output.innerHTML += `
          <p>You won this round. Player 2 lost ${lee.damage} HP.</p>
        `
        break
    }
  } else {
    // normal win/lose conditions
    switch (Math.sign(rpsChoices.indexOf(userChoice1)-rpsChoices.indexOf(userChoice2))){
    case (-1):
      lee.hp -= bob.damage

      player1Health.value = lee.hp
      output.innerHTML += `
        <p>You lost this round and took ${bob.damage} damage.</p>
      `
      break
    case (0):
      output.innerHTML += `
        <p>Draw, no damage.</p>
      `
      break
    case (1):
      bob.hp -= lee.damage

      player2Health.value = bob.hp
      output.innerHTML += `
        <p>You won this round. Player 2 lost ${lee.damage} HP.</p>
      `
      break
     } // switch end
  } // IF statement end
}
// end of Playround Function

// DOM
const gameContainer = grab('#game-container')
const start = grab('#start')
const user1 = grab('#user-1')
const user2 = grab('#user-2')
const commands = grab('#commands')
const output = grab('#temp-output')
const player1Health = grab('#player1-health-bar')
const player2Health = grab('#player2-health-bar')
// end DOM

start.innerHTML = `
  <button>Start Game</button>
`
commands.innerHTML = `
  <button>Rock</button>
  <button>Paper</button>
  <button>Scissor</button>
`

// event listener
document.addEventListener("click", event => {
  event.preventDefault()

  switch (event.target.innerText){
    case ("Rock"):
      console.log("rock")
      playRound('rock')
      checkHealth(lee, bob)
      break
    case ("Paper"):
      console.log("paper")
      playRound('paper')
      checkHealth(lee, bob)
      break
    case ("Scissor"):
      console.log("scissor")
      playRound('scissor')
      checkHealth(lee, bob)
      break
    case ("Start Game"):
      output.innerHTML = ''
      resetGame()
      break
  }
})
// end event listener
