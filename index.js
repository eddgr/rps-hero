// ATTACK DEFEND LOGIC
  let attackDefendDecision = true
  // Attack Mode === true, Defend Mode === false

  // player buffs
  let user1Buffs = {
    damageReduction: 0,
    missedAttack: 0
    // calculate the miss attack chance
    // if missedAttack > 0, calculate the chance of being attack
  }
  let user2Buffs = {
    damageReduction: 0,
    missedAttack: 0
  }
  // end player buffs
// end ATTACK DEFEND LOGIC

// HELPERS
  // adding 'sample' to Array prototype to randomize a return item from an array
  // this requires 'sample' to be invoked
  Array.prototype.sample = function(){
    return this[Math.floor(Math.random()*this.length)];
  }

  const grab = (funcArg) => {
    return document.querySelector(funcArg)
  }

  const renderRpsButtons = () => {
    commands.innerHTML = `
      <button class="nes-btn">Back</button>
      <button class="nes-btn">Rock</button>
      <button class="nes-btn">Paper</button>
      <button class="nes-btn">Scissor</button>
     `
  }

  const renderAdButtons = () => {
    commands.innerHTML = `
      <button class="nes-btn">attack</button>
      <button class="nes-btn">defend</button>
    `
  }

  function outputMessage (caseNum, userChoice1, userChoice2) {
    output.innerHTML += `
      <p>You played ${userChoice1} and ${bob.name} played ${userChoice2}.</p>
    `
    switch(caseNum) {
      case (-1):
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
        output.innerHTML += `
          <p>You won this round. Player 2 lost ${lee.damage} HP.</p>
        `
    }
    output.innerHTML += `<hr>`
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
  user1Buffs.missedAttack = 0
  // player 2 reset
  player2.hp = 10
  player2Health.value = '10'
  player2Health.classList.value = "nes-progress is-success"
  user2Buffs.damageReduction = 0
  user2Buffs.missedAttack = 0

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

  if (user1Buffs.missedAttack > 0){
    user1Buffs.missedAttack -= 1
  }
  // end player 1 buff check

  // player 2 buff check
  if (user2Buffs.damageReduction > 0){
    user2Buffs.damageReduction -= 1
  }
  if (user2Buffs.missedAttack > 0){
    user2Buffs.missedAttack -= 1
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
    case (player1.hp < 10 && player1.hp > 3 && player2.hp > 0):
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
    case (player2.hp < 10 && player2.hp > 3 && player1.hp > 0):
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
        outputMessage(-1, userChoice1, userChoice2)
        console.log('testing output message -1 rock')
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
        outputMessage(0, userChoice1, userChoice2)
        console.log('testing output message 0 rock')
        break
      case (1):
        outputMessage(1, userChoice1, userChoice2)
        console.log('testing output message 1 rock')
        // attackDefend logic for ROCK
        // user 1
        if (attackDefendDecision === true && userChoice1 === "rock") {
          console.log("You won with Rock.")

          // check user 2 buffs before attacking
          if (user2Buffs.damageReduction > 0){
            bob.hp -= (lee.damage/2)
          } else {
            bob.hp -= (lee.damage * 2)
          }
          // end user 2
        } else if (attackDefendDecision === false && userChoice1 === "rock") {
          if (user1Buffs.damageReduction === 0){
            user1Buffs.damageReduction += 3
            // using 3 because one buff will be "used" the same turn it is gained
            // todo: make this logic sexy
            console.log("damageReduction at 0")
          } else {
            user1Buffs.damageReduction += 2
            console.log("add on top of current damageReduction")
          }
          console.log("Damage Reduction Buff: ", user1Buffs)
        }
        //end attackDefend logic for ROCK
        player2Health.value = bob.hp
        break
    } // end switch
  } else {
    // normal win/lose conditions
    switch (Math.sign(rpsChoices.indexOf(userChoice1)-rpsChoices.indexOf(userChoice2))){
    case (-1):
      outputMessage(-1, userChoice1, userChoice2)
      console.log('testing output message -1')
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
      outputMessage(0, userChoice1, userChoice2)
      console.log('testing output message 0')
      break
    case (1):
      outputMessage(1, userChoice1, userChoice2)
      console.log('testing output message 1')
      // attackDefend logic for SCISSOR
      if (attackDefendDecision === true && userChoice1 === "scissor") {
        // scissor damage multiple rng
        // const scissorRng = Math.ceil(((Math.random()*1.5)+1))
        const scissorRng = [1, 1.5, 2, 2.5]

        console.log("You won with Scissor.")
        // check user 2 buffs before attacking
        if (user2Buffs.damageReduction > 0){
          bob.hp -= (lee.damage * (scissorRng.sample()/2))
        } else {
          bob.hp -= (lee.damage * scissorRng.sample())
        }
        // end user 2
        } else if (attackDefendDecision === false && userChoice1 === "scissor") {
          if (user1Buffs.missedAttack === 0){
            user1Buffs.missedAttack += 2
            console.log("missedAttack at 0")
            // using 2 because one buff will be "used" the same turn it is gained
            // todo: make this logic sexy
          } else {
            user1Buffs.missedAttack += 1
            console.log("have missedAttack")
          } // end if
          console.log("Missed Attack Buff: ", user1Buffs)
        } // end else if
        //end attackDefend logic for SCISSOR

      // attackDefend logic for PAPER
      if (attackDefendDecision === true && userChoice1 === "paper") {
        // user 1
          console.log("You won with Paper.")
          // check user 2 buffs before attacking
          if (user2Buffs.damageReduction > 0){
            bob.hp -= (lee.damage/2)
            user1Buffs.damageReduction += 2
          } else {
            bob.hp -= lee.damage
            user1Buffs.damageReduction += 2
            // using 2 because one buff will be "used" the same turn it is gained
            console.log('Damage Reduction Buff: ', user1Buffs)
          }
          // end user 2
        } else if (attackDefendDecision === false && userChoice1 === "paper") {
          if (lee.hp === 9){
            lee.hp += 1
            console.log("Heal for 1 because of HP cap")
          } else if (lee.hp < 9 ) {
            lee.hp += 2
            console.log('Heal for 2')
          }
        }
        //end attackDefend logic for PAPER
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
renderAdButtons()

// event listener
document.addEventListener("click", event => {
  event.preventDefault()

  switch (event.target.innerText){
    case ("Back"):
        renderAdButtons()
        break
    case ("attack"):
      renderRpsButtons()
      attackDefendDecision = true
      console.log('You chose Attack.')
      break
    case ("defend"):
      renderRpsButtons()
      attackDefendDecision = false
      console.log('You chose Defend')
      break
    case ("Rock"):
      console.log("You chose Rock.")
      playRound('rock')
      checkHealth(lee, bob)
      renderAdButtons()
      break
    case ("Paper"):
      console.log("You chose Paper.")
      playRound('paper')
      checkHealth(lee, bob)
      renderAdButtons()
      break
    case ("Scissor"):
      console.log("You chose Scissor.")
      playRound('scissor')
      checkHealth(lee, bob)
      renderAdButtons()
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
