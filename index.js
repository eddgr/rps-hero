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
let gameNumber = 1

function testRun(user1 = lee, user2 = bob){
  output.innerHTML += `
    <hr>
    <h2>Game Number: ${gameNumber}</h2>
  `
  while (user1.hp > 0 && user2.hp > 0){
    playRound()
  } // while statement
  if (user1.hp <= 0) {
    user1.hp = 10
    user2.hp = 10

    gameNumber = 1 // reset gameNumber count to 1
    output.innerHTML += `
      <h2>You Lose!</h2>
    `
  } else {
    user1.hp = 10
    user2.hp = 10

    gameNumber ++ // increase gameNumber count by 1 for every play though to show success
    output.innerHTML += `
      <h2>You Win!</h2>
    `
    return testRun() // reruns the loop until user 1 loses
  } // end if
}
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

// ATTACK DEFEND LOGIC
// attackDefendDecision will when set to true be in attack mode, when set to false we will be in defense mode
let attackDefendDecision = true

// player buffs
// user1 buff and user 2 buff. they will be set to an empty array, when a user has a buff set from the playRound we push the buff property to the user1 or user 2 array:
// new object with predetermined buffs set at count of 0. both players start at 0.
// the win success of buffs will increase the numbers += number
// every turn, if buff count is greater than 0, -=1. otherwise, do nothing
let user1Buffs = {
  damageReduction: 0,
  missedAttack: 0
  // calculate the miss attack chance
  // if missedAttack > 0, calculate the chance of being attack
}
let user2Buffs = {
  damageReduction: 0,
  missedAttack: 0
  // calculate the miss attack chance
  // if missedAttack > 0, calculate the chance of being attack
}
// end player buffs

// end ATTACK DEFEND LOGIC

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
  // player 1 reset
  player1.hp = 10
  player1Health.value = '10'
  player1Health.classList.value = "nes-progress is-success"
  user1Buffs.damageReduction = 0
  // player 2 reset
  player2.hp = 10
  player2Health.value = '10'
  player2Health.classList.value = "nes-progress is-success"
  user2Buffs.damageReduction = 0

  output.innerHTML = ''
}
// end RESET

// checkHealth
// check character health every turn to determine whether to reset game or not
let checkHealth = (player1, player2) => {
  // player 1 buff check
  if (user1Buffs.damageReduction > 0){
    user1Buffs.damageReduction -= 1
  }
  // end player 1 buff check

  // player 2 buff check
  if (user2Buffs.damageReduction > 0){
    user2Buffs.damageReduction -= 1
  }
  // end player 2 buff check

  switch (true){
    // player 1
    case (player1.hp <= 0 && player2.hp > 0):
      resetGame(player1, player2)
      output.innerHTML += `
        <h2>You lose</h2>
      `
      break
    case (player1.hp < 10 && player2.hp > 0):
      player1Health.classList.value = "nes-progress is-warning"
      break
    case (player1.hp < 3 && player2.hp > 0):
      player1Health.classList.value = "nes-progress is-error"
      break
    // case (player1.hp === 8 && player2.hp > 0):
    //   player1Health.classList.value = "nes-progress is-warning"
    //   break
    // case (player1.hp === 2 && player2.hp > 0):
    //   player1Health.classList.value = "nes-progress is-error"
    //   break
    // player 2
    case (player2.hp <= 0 && player1.hp > 0):
      resetGame(player1, player2)
      output.innerHTML += `
        <h2>You win!</h2>
      `
      break
    case (player2.hp < 10 && player1.hp > 0):
      player2Health.classList.value = "nes-progress is-warning"
      break
    case (player2.hp < 3 && player1.hp > 0):
      player2Health.classList.value = "nes-progress is-error"
      break
    // case (player2.hp === 8 && player1.hp > 0):
    //   player2Health.classList.value = "nes-progress is-warning"
    //   break
    // case (player2.hp === 2 && player1.hp > 0):
    //   player2Health.classList.value = "nes-progress is-error"
    //   break
  } // end switch
}
// end checkHealth

//TODO: USER CHOICE IS BEING TESTED!!!!! TAKE OUT WHEN DONE
function playRound(userChoice1 = rollRPS(), userChoice2 = rollRPS()){
  // conditional for rock/scissor win and lose needs to be swapped
  //if user chooses attack && rock then rock attack multiplier to base dmg
  //grab DOM grabber to see whether attack or defend based on back button

  if (userChoice1 === "rock" && userChoice2 === "scissor" || userChoice1 === 'scissor' && userChoice2 === 'rock'){
    switch (Math.sign(rpsChoices.indexOf(userChoice2)-rpsChoices.indexOf(userChoice1))){
      case (-1):
        // lee.hp -= bob.damage

        // player1Health.value = lee.hp
        output.innerHTML += `
          <p>You played ${userChoice1} and ${bob.name} played ${userChoice2}.</p>
          <p>You lost this round and took ${bob.damage} damage.</p>
          <hr>
        `

        // check if user has buff before taking damage
        if (user1Buffs.damageReduction > 0){
          lee.hp -= (bob.damage/2)
        } else {
          lee.hp -= bob.damage
        }
        // end user 1
        player1Health.value = lee.hp

        break
      case (0):
        output.innerHTML += `
          <p>You played ${userChoice1} and ${bob.name} played ${userChoice2}.</p>
          <p>Draw, no damage.</p>
          <hr>
        `
        break
      case (1):
        // let rockWin = bob.hp -= lee.damage

        // player2Health.value = bob.hp
        output.innerHTML += `
          <p>You played ${userChoice1} and ${bob.name} played ${userChoice2}.</p>
          <p>You won this round. ${bob.name} lost ${lee.damage} HP.</p>
          <hr>
        `

        // attackDefend logic for ROCK
        // user 1
        if (attackDefendDecision === true && userChoice1 === "rock") {
          bob.hp -= (lee.damage * 2)
        } else if (attackDefendDecision === false && userChoice1 === "rock") {
          user1Buffs.damageReduction += 3
          // using 3 because one buff will be "used" the same turn it is gained
          // todo: make this logic sexy
          console.log(user1Buffs)
        }
        //end attackDefend logic for ROCK

        // attackDefend logic for SCISSOR
        // user 1
        if (attackDefendDecision === true && userChoice1 === "scissor") {
          bob.hp -= (lee.damage * (Math.random()*1.5)+1)
        } else if (attackDefendDecision === false && userChoice1 === "scissor") {
          user1Buffs.missedAttack += 1
          // using 3 because one buff will be "used" the same turn it is gained
          // todo: make this logic sexy
          console.log(user1Buffs)
        }
        //end attackDefend logic for SCISSOR

        // this is causing issues and may need to be moved somewhere else
        // check user 2 buffs before attacking
        if (user2Buffs.damageReduction > 0){
          bob.hp -= (lee.damage/2)
        } else {
          bob.hp -= lee.damage
        }
        // end user 2
        player2Health.value = bob.hp
        break
    }
  } else {
    // normal win/lose conditions
    switch (Math.sign(rpsChoices.indexOf(userChoice1)-rpsChoices.indexOf(userChoice2))){
    case (-1):
      // lee.hp -= bob.damage

      // player1Health.value = lee.hp
      output.innerHTML += `
        <p>You played ${userChoice1} and ${bob.name} played ${userChoice2}.</p>
        <p>You lost this round and took ${bob.damage} damage.</p>
        <hr>
      `

      // check if user has buff before taking damage
      // if user has damageReduction, divide user2 damage by 2
      // user 1
      if (user1Buffs.damageReduction > 0){
        lee.hp -= (bob.damage/2)
      } else {
        lee.hp -= bob.damage
      }
      // end user 1
      player1Health.value = lee.hp
      break
    case (0):
      output.innerHTML += `
        <p>You played ${userChoice1} and ${bob.name} played ${userChoice2}.</p>
        <p>Draw, no damage.</p>
        <hr>
      `
      break
    case (1):
      // bob.hp -= lee.damage

      // player2Health.value = bob.hp
      output.innerHTML += `
        <p>You played ${userChoice1} and ${bob.name} played ${userChoice2}.</p>
        <p>You won this round. Player 2 lost ${lee.damage} HP.</p>
        <hr>
      `
      // check user 2 buffs before attacking
      if (user2Buffs.damageReduction > 0){
        bob.hp -= (lee.damage/2)
      } else {
        bob.hp -= lee.damage
      }
      // end user 2
      player2Health.value = bob.hp
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
  <button class="nes-btn is-primary">Start Game</button>
  <button class="nes-btn">Reset</button>
`
commands.innerHTML = `
  <button class="nes-btn">attack</button>
  <button class="nes-btn">defend</button>
`

// event listener
document.addEventListener("click", event => {
  event.preventDefault()

  switch (event.target.innerText){
    case ("Back"):
        commands.innerHTML = `
          <button class="nes-btn">attack</button>
          <button class="nes-btn">defend</button>
        `
        break
    case ("attack"):
      commands.innerHTML = `
        <button class="nes-btn">Back</button>
        <button class="nes-btn">Rock</button>
        <button class="nes-btn">Paper</button>
        <button class="nes-btn">Scissor</button>
       `
      attackDefendDecision = true
      console.log('attacking!')
      break
    case ("defend"):
      commands.innerHTML = `
        <button class="nes-btn">Back</button>
        <button class="nes-btn">Rock</button>
        <button class="nes-btn">Paper</button>
        <button class="nes-btn">Scissor</button>
       `
      attackDefendDecision = false
      console.log('Defend')
      break
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
      testRun()
      break
    case ("Reset"):
      resetGame()
      break
  }
})
// end event listener
