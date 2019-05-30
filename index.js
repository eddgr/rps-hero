let currentUser = lee

// HELPERS
  // adding 'sample' to Array prototype to randomize a return item from an array
  // this requires 'sample' to be invoked
  Array.prototype.sample = function(){
    return this[Math.floor(Math.random()*this.length)];
  }

  // use `grab` instead of a querySelector
  const grab = (funcArg) => {
    return document.querySelector(funcArg)
  }

  const renderUserAttackIcon = () => {
    userAttkIcon.innerHTML = `
    <img src="img/gameSword.jpg" height="100" width="120">
    `
  }

  const renderUserDefenseIcon = () => {
    userAttkIcon.innerHTML = `
    <img src="img/gameShield.jpg" height="70" width="120">
    `
  }

  const destroyUserAttackIcon = () => {
    userAttkIcon.innerHTML = ``
  }

  const renderCompIcon = (bool) => {
    if (bool === true){
        renderCompAttackIcon()
    } else if (bool === false){
        renderCompDefenseIcon()
    }
  }
  const renderCompAttackIcon = () => {
    compAttkIcon.innerHTML = `
    <img src="img/gameSword.jpg" height="100" width="120">
    `
  }
  const renderCompDefenseIcon = () => {
    compAttkIcon.innerHTML = `
    <img src="img/gameShield.jpg" height="100" width="120">
    `
  }

  const renderWinLossIcon = () => {
    winLossIcon.innerText = "hello"
  }
  // console.log(renderWinLossIcon)

  // render Rock, Paper, Scissor buttons
  const renderRpsButtons = (buffDescObj) => {
    infoBar.innerText = "Press 'B' for the Previous Menu."

    commands.innerHTML = `
      <div class="row w-100">
        <div class="col-sm card bg-primary rounded-0">
          <span class="card-body">${buffDescObj.rock}</span>
          <button class="nes-btn is-primary mb-4">
            Rock
          </button>
        </div>

        <div class="col-sm card bg-warning rounded-0">
          <span class="card-body">${buffDescObj.paper}</span>
          <button class="nes-btn is-warning mb-4">
            Paper
          </button>
        </div>

        <div class="col-sm card bg-danger rounded-0">
          <span class="card-body">${buffDescObj.scissor}</span>
          <button class="nes-btn is-error mb-4">
            Scissor
          </button>
        </div>
      </div>
     `

     document.addEventListener("keydown", event => {
       if (event.keyCode === 66){
         renderAdButtons()
       }
     })
  }

  // render Attack/Defend button
  const renderAdButtons = () => {
    // A/D === Attack/Defend
    // check current buffs before rendering A/D buttons

    commands.style.display = ""
    output.style.display = "none"

    //player 1 buff status
    if (currentUser.buffs.damageReduction > 0 && currentUser.buffs.missedAttack > 0){
      player1Buff.innerText = `
        Damage Reduction: ${currentUser.buffs.damageReduction - 1}
        Missed Attack: ${currentUser.buffs.missedAttack - 1}
      `
    } else if (currentUser.buffs.damageReduction > 0) {
      player1Buff.innerText = `
        Damage Reduction: ${currentUser.buffs.damageReduction - 1}
      `
    } else if (currentUser.buffs.missedAttack > 0) {
      player1Buff.innerText = `
        Missed Attack: ${currentUser.buffs.missedAttack}
      `
    } else {
      player1Buff.innerText = ``
    }
    //player 2 buff status
    if (bob.buffs.damageReduction > 0 && bob.buffs.missedAttack > 0){
      player2Buff.innerText = `
        Damage Reduction: ${bob.buffs.damageReduction - 1}
        Missed Attack: ${bob.buffs.missedAttack - 1}
      `
    } else if (bob.buffs.damageReduction > 0) {
      player2Buff.innerText = `
        Damage Reduction: ${bob.buffs.damageReduction - 1}
      `
    } else if (bob.buffs.missedAttack > 0) {
      player2Buff.innerText = `
        Missed Attack: ${bob.buffs.missedAttack}
      `
    } else {
      player2Buff.innerText = ``
    }
    //end testing new display for buffs

    commands.innerHTML = `
      <div class="col-sm-6 bg-danger text-center p-4">
        Attack Image
        <br><br>
        <button class="nes-btn">attack</button>
      </div>
      <div class="col-sm-6 bg-primary text-center p-4">
        Defend Image
        <br><br>
        <button class="nes-btn">defend</button>
      </div>
    `

    infoBar.innerText = 'Choose Attack or Defend'
    //display player1 HP & 2 HP
    player1WinHP.innerText = `${currentUser.hp}/10 HP`
    player2WinHP.innerText = `${bob.hp}/10 HP`
    //destroys attack icon
    // destroyUserAttackIcon()


    console.log(attackIconImage)
    console.log('attack icon should be destroyed')

    player1Health.value = currentUser.hp
    player2Health.value = bob.hp
  }

  // display the player choices and damage output
  function outputMessage (caseNum, userChoice1, userChoice2) {
    output.innerHTML = `
      <p>You played ${userChoice1} and ${bob.name} played ${userChoice2}.</p>
    `
    switch(caseNum) {
      case (-1):
        output.innerHTML += `
          <p>You lost this round and took ${bob.currentDamage} damage.</p>
        `
        break
      case (0):
        output.innerHTML += `
          <p>Draw, no damage.</p>
        `
        break
      case (1):
        output.innerHTML += `
          <p>You won this round. Player 2 lost ${currentUser.currentDamage} HP.</p>
        `
        break
    }
  }

  // attack/defend helper function to calculate damage and buff
  function playerCheck(currentPlayer, otherPlayer, userChoice){
    console.log("IN HELPER")
    switch (currentPlayer.attackLogic){
      case (true):
        switch (userChoice){
          case ("rock"):
            if (otherPlayer.buffs.damageReduction > 0){
              currentPlayer.currentDamage = ((currentPlayer.damage * 2)/2)
              otherPlayer.hp -= currentPlayer.currentDamage
            } else if (otherPlayer.buffs.dodge > 0){
              currentPlayer.currentDamage = ((currentPlayer.damage * 2) * missRng.sample())
              otherPlayer.hp -= currentPlayer.currentDamage
            } else {
              currentPlayer.currentDamage = (currentPlayer.damage * 2)
              otherPlayer.hp -= currentPlayer.currentDamage
            }
            break
          case ("paper"):
            if (otherPlayer.buffs.damageReduction > 0){
              currentPlayer.currentDamage = (currentPlayer.damage/2)
              otherPlayer.hp -= currentPlayer.currentDamage
              currentPlayer.buffs.damageReduction += 2
            } else if (otherPlayer.buffs.dodge > 0){
              currentPlayer.currentDamage = (currentPlayer.damage * missRng.sample())
              otherPlayer.hp -= currentPlayer.currentDamage
              currentPlayer.buffs.damageReduction += 2
            } else {
              currentPlayer.currentDamage = currentPlayer.damage
              otherPlayer.hp -= currentPlayer.currentDamage
              currentPlayer.buffs.damageReduction += 2
              // using 2 because one buff will be "used" the same turn it is gained
              console.log('Damage Reduction Buff: ', currentPlayer.buffs)
            }
            break
          case ("scissor"):
            if (otherPlayer.buffs.damageReduction > 0){
              currentPlayer.currentDamage = (currentPlayer.damage * (scissorRng.sample()/2))
              otherPlayer.hp -= currentPlayer.currentDamage
            } else if (otherPlayer.buffs.dodge > 0){
              currentPlayer.currentDamage = ((currentPlayer.damage * scissorRng.sample()) * missRng.sample())
              otherPlayer.hp -= currentPlayer.currentDamage
            } else {
              currentPlayer.currentDamage = (currentPlayer.damage * scissorRng.sample())
              otherPlayer.hp -= currentPlayer.currentDamage
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
            if (currentPlayer.buffs.dodge === 0){
              currentPlayer.buffs.dodge += 2
              console.log("dodge at 0")
              // using 2 because one buff will be "used" the same turn it is gained
              // todo: make this logic sexy
            } else {
              currentPlayer.buffs.dodge += 1
              console.log("have dodge")
            } // end if
            console.log("Missed Attack Buff: ", currentPlayer.buffs)
            break
        } // end nested switch
        break
    } // end switch
  } // end playerCheck

  // fetch
  let fetchHelper = (url, method, bodyObj) => {
    return fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        users: bodyObj
      })
    })
  }
  // end fetch
// end HELPERS

const rpsChoices = ["rock", "paper", "scissor"]
const missRng = [0, 1] // test with just 0
const scissorRng = [1, 1.5, 2, 2.5]

// RESET
function resetGame(player1 = currentUser, player2 = bob){
  // player 1 reset
  player1.hp = 10
  player1Health.value = '10'
  player1Health.classList.value = "nes-progress is-success"
  player1Level.innerText = `Level ${currentUser.level}`
  currentUser.buffs.damageReduction = 0
  currentUser.buffs.dodge = 0
  player1Buff.innerHTML = ''
  // player 2 reset
  player2.hp = 10
  player2Health.value = '10'
  player2Health.classList.value = "nes-progress is-success"
  bob.buffs.damageReduction = 0
  bob.buffs.dodge = 0
  player2Buff.innerHTML = ''

  output.innerHTML = ''
}
// end RESET

// checkBuffs
  let checkBuffs = () => {

    // player 1 buff check
    if (currentUser.buffs.damageReduction > 0){
      currentUser.buffs.damageReduction -= 1
    }
    if (currentUser.buffs.dodge > 0){
      currentUser.buffs.dodge -= 1
    }
    // end player 1 buff check

    // player 2 buff check
    if (bob.buffs.damageReduction > 0){
      bob.buffs.damageReduction -= 1
    }
    if (bob.buffs.dodge > 0){
      bob.buffs.dodge -= 1
    }
    // end player 2 buff check
  }
// end checkBuffs

// checkHealth
// check character health every turn to determine whether to reset game or not
let checkHealth = (player1, player2) => {
  console.log("Player 1 HP: ", player1.hp, "Player 2 HP: ", player2.hp)
  console.log("Player 1 Buffs: ", player1.buffs)
  console.log("Player 2 Buffs: ", player2.buffs)

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
      fetchHelper(API_URL + `/${currentUser.id}`, "PATCH", {
        level: currentUser.level += 1
      })
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
        console.log('Lost with Rock')
        outputMessage(-1, userChoice1, userChoice2)
        // check for lost
        playerCheck(bob, currentUser, userChoice2)
        renderOutput()
        break
      case (0):
        console.log('Draw with Rock')
        outputMessage(0, userChoice1, userChoice2)
        renderOutput()
        break
      case (1):
        console.log('Win with Rock')
        outputMessage(1, userChoice1, userChoice2)

        // check for win
        playerCheck(currentUser, bob, userChoice1)
        //Testing WIN CASE TO POP TROPHY ON USER: WILL CHANGE with CSS
        renderWinLossIcon()//testing to see where this fires off
        //Testing WIN CASE TO POP TROPHY ON USER: WILL CHANGE with CSS
        renderOutput()
        break
    } // end switch
  } else {
    // normal win/lose conditions
    switch (Math.sign(rpsChoices.indexOf(userChoice1)-rpsChoices.indexOf(userChoice2))){
    case (-1):
      outputMessage(-1, userChoice1, userChoice2)
      console.log(`Lose with ${userChoice1}`)
      // check for lost
      playerCheck(bob, currentUser, userChoice2)
      renderOutput()
      break
    case (0):
      outputMessage(0, userChoice1, userChoice2)
      console.log(`Draw with ${userChoice1}`)
      renderOutput()
      break
    case (1):
      outputMessage(1, userChoice1, userChoice2)
      console.log(`Win with ${userChoice1}`)
      // check for win
      playerCheck(currentUser, bob, userChoice1)
      renderOutput()
      break
     } // switch end
  } // IF statement end
}
// end of Playround Function

// Command Outputs
let renderOutput = () => {
  commands.style.display = "none"
  output.style.display = ''
  checkHealth(currentUser, bob)
}
// end Command Outputs

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
const userAttkIcon = grab('#usr-attk-icon')
const compAttkIcon = grab('#comp-attk-icon')
const attackIconImage = grab('#attk-icon > img')
const player1WinHP = grab('#player1-winHP')
const player2WinHP = grab('#player2-winHP')
const player1Name = grab('#player1-name')
const player2Name = grab('#player2-name')
const user1Sprite = grab('#user-1-sprite')
const comp1Sprite = grab ('#comp-1-sprite')
const winLossIcon = grab('#winLoss')
// winLossIcon.innerText = "test Trophy placement"
const welcomeScreen = grab('#welcome-screen')
const player1Level = grab('#player1-level')
const infoBar = grab('#information')
const API_URL = "http://localhost:3000/api/v1/users"
// end DOM

// login
let playGame = () => {
  welcomeScreen.innerHTML = `
    Hello hero!
    <br><br>
    What is your name?
    <br><br>
    <form>
      <input type="text" class="nes-input" style="text-transform: uppercase" placeholder="Type your name here">
      <button class="nes-btn is-primary mt-4">Play Game</button>
    </form>
  `
}
// end login

// event listener
document.addEventListener("click", event => {
  event.preventDefault()

  switch (event.target.innerText){
    case ("Back"):
        renderAdButtons()
        break
    case ("attack"):
      renderRpsButtons({rock: "2x base damage", paper: "1x base damage<br>50% damage reduction next turn", scissor: "1 - 2.5x base damage"})
      console.log("will render attack icon")
      renderUserAttackIcon()
      currentUser.attackLogic = true
      console.log('You chose Attack.')
      break
    case ("defend"):
      renderRpsButtons({rock: "50% Damage reduction for next 2 turns", paper: "Heal 20% HP", scissor: "50% chance to dodge next attack"})
      currentUser.attackLogic = false
      console.log('You chose Defend')
      console.log('rendering defense button')
      renderUserDefenseIcon()
      break
    case ("Start Game"):
      playGame()
      // output.innerHTML = ''
      // testRun()
      break
    case ("Reset"):
      resetGame()
      break
    case ("Play Game"):
      fetchHelper(API_URL, "POST", {name: welcomeScreen.lastElementChild.firstElementChild.value.toLowerCase()})
        .then(resp => resp.json())
        .then(user => {
          console.log(user)
          currentUser = new Character(user.name, user.id)
          currentUser.level = user.level
          player1Name.innerText = currentUser.name
          player1Level.innerText = `Level ${currentUser.level}`
        })

      welcomeScreen.style.display = "none"
      gameContainer.style.display = ""
      resetGame()
      break
    case ("Rock"):
      console.log("You chose Rock.")
      checkBuffs()
      playRound('rock')
      checkHealth(currentUser, bob)
      // renderAdButtons()
      break
    case ("Paper"):
      console.log("You chose Paper.")
      checkBuffs()
      playRound('paper')
      checkHealth(currentUser, bob)
      // renderAdButtons()
      break
    case ("Scissor"):
      console.log("You chose Scissor.")
      checkBuffs()
      playRound('scissor')
      checkHealth(currentUser, bob)
      // renderAdButtons()
      break
  } // end switch
})
// end event listener

start.innerHTML = `
  <button class="nes-btn is-primary">Start Game</button>
  <button class="nes-btn">Reset</button>
`

player1Name.innerText = currentUser.name
player1Level.innerText = currentUser.level
player2Name.innerText = bob.name
player1Buff.innerText = ''
player2Buff.innerText = ''

gameContainer.style.display = "none"
output.style.display = "none"
renderAdButtons()
