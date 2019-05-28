// HELPERS
  // adding 'sample' to Array prototype to randomize a return item from an array
  // this requires 'sample' to be invoked
  Array.prototype.sample = function(){
    return this[Math.floor(Math.random()*this.length)];
  }

  const grab = (funcArg) => {
    return document.querySelector(funcArg)
  }

  const renderRpsButtons = (buffDescObj) => {
    commands.innerHTML = `
      <button class="nes-btn">
        <p>Rock</p>
        <span>${buffDescObj.rock}</span>
      </button>

      <button class="nes-btn">
        <p>Paper</p>
        <span>${buffDescObj.paper}</span>
      </button>

      <button class="nes-btn">
        <p>Scissor</p>
        <span>${buffDescObj.scissor}</span>
      </button>

      <br><br>
      <button class="nes-btn">Back</button>
     `
  }

  const renderAdButtons = () => {
    // A/D === Attack/Defend
    // check current buffs before rendering A/D buttons
    const user1 = Object.entries(lee.buffs)
    const user2 = Object.entries(bob.buffs)

    for (let buff of user1){
      if (buff[1] > 0){
        player1Buff.innerText += buff[0]
      }
    }
    for (let buff of user2){
      if (buff[1] > 0){
        player1Buff.innerText += buff[0]
      }
    }

    commands.innerHTML = `
      <button class="nes-btn">attack</button>
      <button class="nes-btn">defend</button>
    `

    player1Health.value = lee.hp
    player2Health.value = bob.hp
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

  function playerCheck(currentPlayer, otherPlayer, userChoice){
    console.log("IN HELPER")
    switch (currentPlayer.attackLogic){
      case (true):
        switch (userChoice){
          case ("rock"):
            if (otherPlayer.buffs.damageReduction > 0){
              otherPlayer.hp -= (currentPlayer.damage/2)
            } else if (otherPlayer.buffs.missedAttack > 0){
              otherPlayer.hp -= ((currentPlayer.damage * 2) * missRng)
            } else {
              otherPlayer.hp -= (currentPlayer.damage * 2)
            }
            break
          case ("paper"):
            if (otherPlayer.buffs.damageReduction > 0){
              otherPlayer.hp -= (currentPlayer.damage/2)
              currentPlayer.buffs.damageReduction += 2
            } else if (otherPlayer.buffs.missedAttack > 0){
              otherPlayer.hp -= (currentPlayer.damage * missRng)
              currentPlayer.buffs.damageReduction += 2
            } else {
              otherPlayer.hp -= currentPlayer.damage
              currentPlayer.buffs.damageReduction += 2
              // using 2 because one buff will be "used" the same turn it is gained
              console.log('Damage Reduction Buff: ', currentPlayer.buffs)
            }
            break
          case ("scissor"):
            const scissorRng = [1, 1.5, 2, 2.5]
            if (otherPlayer.buffs.damageReduction > 0){
              otherPlayer.hp -= (currentPlayer.damage * (scissorRng.sample()/2))
            } else if (otherPlayer.buffs.missedAttack > 0){
              otherPlayer.hp -= ((currentPlayer.damage * scissorRng.sample()) * missRng)
            } else {
              otherPlayer.hp -= (currentPlayer.damage * scissorRng.sample())
            }
            break
        } // end nested switch
        break
      case (false):
        switch (userChoice){
          case ("rock"):
            if (currentPlayer.buffs.damageReduction === 0){
              currentPlayer.buffs.damageReduction += 3
              // using 3 because one buff will be "used" the same turn it is gained
              // todo: make this logic sexy
              console.log("damageReduction at 0")
            } else {
              currentPlayer.buffs.damageReduction += 2
              console.log("add on top of current damageReduction")
            }
            break
          case ("paper"):
            if (currentPlayer.hp === 9){
              currentPlayer.hp += 1
              console.log("Heal for 1 because of HP cap")
            } else if (currentPlayer.hp < 9 ) {
              currentPlayer.hp += 2
              console.log('Heal for 2')
            }
            break
          case ("scissor"):
            if (currentPlayer.buffs.missedAttack === 0){
              currentPlayer.buffs.missedAttack += 2
              console.log("missedAttack at 0")
              // using 2 because one buff will be "used" the same turn it is gained
              // todo: make this logic sexy
            } else {
              currentPlayer.buffs.missedAttack += 1
              console.log("have missedAttack")
            } // end if
            console.log("Missed Attack Buff: ", currentPlayer.buffs)
            break
        } // end nested switch
        break
    } // end switch
  } // end playerCheck
// end HELPERS

const rpsChoices = ["rock", "paper", "scissor"]
const missRng = [0, 1] // test with just 0

// RESET
function resetGame(player1 = lee, player2 = bob){
  // player 1 reset
  player1.hp = 10
  player1Health.value = '10'
  player1Health.classList.value = "nes-progress is-success"
  lee.buffs.damageReduction = 0
  lee.buffs.missedAttack = 0
  player1Buff.innerHTML = ''
  // player 2 reset
  player2.hp = 10
  player2Health.value = '10'
  player2Health.classList.value = "nes-progress is-success"
  bob.buffs.damageReduction = 0
  bob.buffs.missedAttack = 0
  player2Buff.innerHTML = ''

  output.innerHTML = ''
}
// end RESET

// checkBuffs
  let checkBuffs = () => {

    // player 1 buff check
    if (lee.buffs.damageReduction > 0){
      lee.buffs.damageReduction -= 1
    }
    if (lee.buffs.missedAttack > 0){
      lee.buffs.missedAttack -= 1
    }
    // end player 1 buff check

    // player 2 buff check
    if (bob.buffs.damageReduction > 0){
      bob.buffs.damageReduction -= 1
    }
    if (bob.buffs.missedAttack > 0){
      bob.buffs.missedAttack -= 1
    }
    // end player 2 buff check
  }
// end checkBuffs

// checkHealth
// check character health every turn to determine whether to reset game or not
let checkHealth = (player1, player2) => {
  console.log("Player 1 HP: ", player1.hp, "Player 2 HP: ", player2.hp)

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
        // check if user1 has buff before taking damage
        playerCheck(bob, lee, userChoice2)
      //
      //   if (lee.buffs.missedAttack > 0){
      //     lee.hp -= (bob.damage * missRng.sample())
      //     player1Buff.innerHTML += "Missed Attack"
      //     console.log("missedAttack should be 0 dmg")
      //   // } else if (lee.buffs.missedAttack === 0){
      //   //   lee.hp -= bob.damage
      //   //   player1Buff.innerHTML = ''
      //   //   console.log("missedAttack not working")
      // } else if (lee.buffs.damageReduction > 0){
      //     lee.hp -= (bob.damage/2)
      //     player1Buff.innerHTML += "Damage Reduction"
      //   // } else if (lee.buffs.damageReduction === 0) {
      //   //   lee.hp -= bob.damage
      //   //   player1Buff.innerHTML = ''
      //   //   console.log("missedAttack not working because of damageReduction")
      //   } else {
      //     // no buff
      //     lee.hp -= bob.damage
      //     player1Buff.innerHTML = ''
      //     console.log("no buffs")
      //   }
      //   // end user 1
        // player1Health.value = lee.hp
        break
      case (0):
        outputMessage(0, userChoice1, userChoice2)
        console.log('testing output message 0 rock')
        break
      case (1):
        outputMessage(1, userChoice1, userChoice2)
        console.log('testing output message 1 rock')

        // attackDefend logic for ROCK
        playerCheck(lee, bob, userChoice1)
        // user 1
        // if (lee.attackLogic === true && userChoice1 === "rock") {
        //   console.log("You won with Rock.")
        //   // check user2 buffs before attacking
        //   if (bob.buffs.damageReduction > 0){
        //     bob.hp -= (lee.damage/2)
        //   } else {
        //     bob.hp -= (lee.damage * 2)
        //   }
        //   // end user 2
        // } else if (lee.attackLogic === false && userChoice1 === "rock") {
        //   if (lee.buffs.damageReduction === 0){
        //     lee.buffs.damageReduction += 3
        //     // using 3 because one buff will be "used" the same turn it is gained
        //     // todo: make this logic sexy
        //     console.log("damageReduction at 0")
        //   } else {
        //     lee.buffs.damageReduction += 2
        //     console.log("add on top of current damageReduction")
        //   }
        //   console.log("Damage Reduction Buff: ", lee.buffs)
        // }
        //end attackDefend logic for ROCK
        // player2Health.value = bob.hp
        break
    } // end switch
  } else {
    // normal win/lose conditions
    switch (Math.sign(rpsChoices.indexOf(userChoice1)-rpsChoices.indexOf(userChoice2))){
    case (-1):
      outputMessage(-1, userChoice1, userChoice2)
      console.log('testing output message -1')
      // check if user1 has buff before taking damage
      playerCheck(bob, lee, userChoice2)
      // user 1
    //   if (lee.buffs.missedAttack > 0){
    //     lee.hp -= (bob.damage * missRng.sample())
    //     player1Buff.innerHTML += "Missed Attack"
    //     console.log("missedAttack should be 0 dmg")
    //   // } else if (lee.buffs.missedAttack === 0){
    //   //   lee.hp -= bob.damage
    //   //   player1Buff.innerHTML = ''
    //   //   console.log("missedAttack not working")
    // } else if (lee.buffs.damageReduction > 0){
    //     lee.hp -= (bob.damage/2)
    //     player1Buff.innerHTML += "Damage Reduction"
    //   // } else if (lee.buffs.damageReduction === 0) {
    //   //   lee.hp -= bob.damage
    //   //   player1Buff.innerHTML = ''
    //   //   console.log("missedAttack not working because of damageReduction")
    //   } else {
    //     // no buff
    //     lee.hp -= bob.damage
    //     player1Buff.innerHTML = ''
    //     console.log("no buffs")
    //   }
      // end user 1
      // player1Health.value = lee.hp
      break
    case (0):
      outputMessage(0, userChoice1, userChoice2)
      console.log('testing output message 0')
      break
    case (1):
      outputMessage(1, userChoice1, userChoice2)
      console.log('testing output message 1')
      // attackDefend logic for SCISSOR
      playerCheck(lee, bob, userChoice1)
      // if (lee.attackLogic === true && userChoice1 === "scissor") {
      //   // scissor damage multiple rng
      //   // const scissorRng = Math.ceil(((Math.random()*1.5)+1))
      //   const scissorRng = [1, 1.5, 2, 2.5]
      //
      //   console.log("You won with Scissor.")
      //   // check user 2 buffs before attacking
      //   if (bob.buffs.damageReduction > 0){
      //     bob.hp -= (lee.damage * (scissorRng.sample()/2))
      //   } else {
      //     bob.hp -= (lee.damage * scissorRng.sample())
      //   }
      //   // end user 2
      // } else if (lee.attackLogic === false && userChoice1 === "scissor") {
      //     if (lee.buffs.missedAttack === 0){
      //       lee.buffs.missedAttack += 2
      //       console.log("missedAttack at 0")
      //       // using 2 because one buff will be "used" the same turn it is gained
      //       // todo: make this logic sexy
      //     } else {
      //       lee.buffs.missedAttack += 1
      //       console.log("have missedAttack")
      //     } // end if
      //     console.log("Missed Attack Buff: ", lee.buffs)
      //   } // end else if
      //   //end attackDefend logic for SCISSOR
      //
      // // attackDefend logic for PAPER
      // if (lee.attackLogic === true && userChoice1 === "paper") {
      //   // user 1
      //     console.log("You won with Paper.")
      //     // check user 2 buffs before attacking
      //     if (bob.buffs.damageReduction > 0){
      //       bob.hp -= (lee.damage/2)
      //       lee.buffs.damageReduction += 2
      //     } else {
      //       bob.hp -= lee.damage
      //       lee.buffs.damageReduction += 2
      //       // using 2 because one buff will be "used" the same turn it is gained
      //       console.log('Damage Reduction Buff: ', lee.buffs)
      //     }
      //     // end user 2
      //   } else if (lee.attackLogic === false && userChoice1 === "paper") {
      //     if (lee.hp === 9){
      //       lee.hp += 1
      //       console.log("Heal for 1 because of HP cap")
      //     } else if (lee.hp < 9 ) {
      //       lee.hp += 2
      //       console.log('Heal for 2')
      //     }
      //   }
        //end attackDefend logic for PAPER
      // player2Health.value = bob.hp
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
const player1Buff = grab('#player1-buff')
const player2Buff = grab('#player2-buff')
const player1Name = grab('#player1-name')
const player2Name = grab('#player2-name')
// end DOM

start.innerHTML = `
  <button class="nes-btn is-primary">Start Game</button>
  <button class="nes-btn">Reset</button>
`

player1Name.innerText = lee.name
player2Name.innerText = bob.name
player1Buff.innerText = ''
player2Buff.innerText = ''
renderAdButtons()

// event listener
document.addEventListener("click", event => {
  event.preventDefault()

  switch (event.target.innerText){
    case ("Back"):
        renderAdButtons()
        break
    case ("attack"):
      renderRpsButtons({rock: "2x base damage", paper: "1x base damage, 1x damage reduction", scissor: "1-2.5x base damage"})
      lee.attackLogic = true
      console.log('You chose Attack.')
      break
    case ("defend"):
      renderRpsButtons({rock: "2x damage reduction", paper: "20% heal", scissor: "1x chance of receiving 0 damage"})
      lee.attackLogic = false
      console.log('You chose Defend')
      break
    case ("Start Game"):
      output.innerHTML = ''
      testRun()
      break
      case ("Reset"):
      resetGame()
      break
  }

  switch (event.target.firstElementChild.innerText){
    case ("Rock"):
      console.log("You chose Rock.")
      checkBuffs()
      playRound('rock')
      checkHealth(lee, bob)
      renderAdButtons()
      break
    case ("Paper"):
      console.log("You chose Paper.")
      checkBuffs()
      playRound('paper')
      checkHealth(lee, bob)
      renderAdButtons()
      break
    case ("Scissor"):
      console.log("You chose Scissor.")
      checkBuffs()
      playRound('scissor')
      checkHealth(lee, bob)
      renderAdButtons()
      break
  } // end switch
})
// end event listener
