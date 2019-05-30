let currentUser = lee
let currentComp = computerCharacters

const rpsChoices = ["rock", "paper", "scissor"]
const missRng = [0, 1] // test with just 0
const scissorRng = [1, 1.5, 2, 2.5]

// RESET
function resetGame(player1 = currentUser, player2 = currentComp){
  // player 1 reset
  player1.hp = 10
  player1Health.value = '10'
  player1WinHP.innerText = `${player1.hp}/10 HP`
  player1Health.classList.value = "nes-progress is-success"
  player1Level.innerText = `Lvl ${currentUser.level}`
  currentUser.buffs.damageReduction = 0
  currentUser.buffs.dodge = 0
  player1Buff.innerHTML = ''
  user1Sprite.style.left = "0px"
  destroyUserAttackIcon()
  // player 2 reset
  player2.hp = 10
  player2Health.value = '10'
  player2WinHP.innerText = `${player2.hp}/10 HP`
  player2Health.classList.value = "nes-progress is-success"
  currentComp.buffs.damageReduction = 0
  currentComp.buffs.dodge = 0
  player2Buff.innerHTML = ''
  currentComp = computerChars.sample()
  player2Name.innerText = currentComp.name
  comp1Sprite.style.right = "0px"
  destroyCompAttackIcon()
  switch (currentComp){
    case (lee):
      comp1Sprite.className = "nes-squirtle float-left"
      break
    case (bob):
      comp1Sprite.className = "nes-bulbasaur float-left"
      break
    case (jimmy):
      comp1Sprite.className = "nes-charmander float-left"
      break
  }
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
  if (currentComp.buffs.damageReduction > 0){
    currentComp.buffs.damageReduction -= 1
  }
  if (currentComp.buffs.dodge > 0){
    currentComp.buffs.dodge -= 1
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
        <h2 class="d-block">You lose</h2>
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
        <h2 class="d-block">You win!</h2>
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
        playerCheck(currentComp, currentUser, userChoice2)
        outputMessage(-1, currentComp.attackLogic, userChoice1, userChoice2)
        // check for lost
        renderOutput()
        break
      case (0):
        console.log('Draw with Rock')
        outputMessage(0, currentUser.attackLogic, userChoice1, userChoice2)
        renderOutput()
        break
      case (1):
        console.log('Win with Rock')
        playerCheck(currentUser, currentComp, userChoice1)
        outputMessage(1, currentUser.attackLogic, userChoice1, userChoice2)
        // check for win
        //Testing WIN CASE TO POP TROPHY ON USER: WILL CHANGE with CSS
        // renderWinLossIcon()//testing to see where this fires off
        //Testing WIN CASE TO POP TROPHY ON USER: WILL CHANGE with CSS
        renderOutput()
        break
    } // end switch
  } else {
    // normal win/lose conditions
    switch (Math.sign(rpsChoices.indexOf(userChoice1)-rpsChoices.indexOf(userChoice2))){
    case (-1):
      playerCheck(currentComp, currentUser, userChoice2)
      outputMessage(-1, currentComp.attackLogic, userChoice1, userChoice2)
      console.log(`Lose with ${userChoice1}`)
      // check for lost
      renderOutput()
      break
    case (0):
      outputMessage(0, currentUser.attackLogic, userChoice1, userChoice2)
      console.log(`Draw with ${userChoice1}`)
      renderOutput()
      break
    case (1):
      playerCheck(currentUser, currentComp, userChoice1)
      outputMessage(1, currentUser.attackLogic, userChoice1, userChoice2)
      console.log(`Win with ${userChoice1}`)
      // check for win
      renderOutput()
      break
     } // switch end
  } // IF statement end
}
// end of Playround Function

// Command Outputs
let renderOutput = () => {
  output.style.display = ''
  commands.style.display = "none"
  checkHealth(currentUser, currentComp)
}
// end Command Outputs

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
      console.log('working')
      renderAdButtons()
      break
    case ("Attack"):
      renderRpsButtons({rock: "2x Base Damage", paper: "1x Base Damage<br><br>50% Damage Reduction next turn", scissor: "1 - 2.5x Base Damage"})
      console.log("will render attack icon")
      renderUserAttackIcon()
      currentUser.attackLogic = true
      console.log('You chose Attack.')
      break
    case ("Defend"):
      renderRpsButtons({rock: "50% Damage Reduction for next 2 turns", paper: "Heal 30% HP", scissor: "50% chance to Dodge next attack"})
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
    case ("Leaderboard"):
      insertLeaderboard()
      break
    case ("Play Game"):
      fetchHelper(API_URL, "POST", {name: welcomeScreen.lastElementChild.firstElementChild.value.toLowerCase()})
        .then(resp => resp.json())
        .then(user => {
          console.log(user)
          currentUser = new Character(user.name, user.id)
          currentUser.level = user.level
          player1Name.innerText = currentUser.name
          player1Level.innerHTML = `
            Lvl ${currentUser.level}
          `
        })

      welcomeScreen.style.display = "none"
      gameContainer.style.display = ""
      resetGame()
      break
    case ("Rock"):
      console.log("You chose Rock.")
      checkBuffs()
      playRound('rock')
      checkHealth(currentUser, currentComp)
      // renderAdButtons()
      break
    case ("Paper"):
      console.log("You chose Paper.")
      checkBuffs()
      playRound('paper')
      checkHealth(currentUser, currentComp)
      // renderAdButtons()
      break
    case ("Scissor"):
      console.log("You chose Scissor.")
      checkBuffs()
      playRound('scissor')
      checkHealth(currentUser, currentComp)
      // renderAdButtons()
      break
    case ("Click here for the Main Menu."):
      renderAdButtons()
      break
    case ("Click here to continue."):
      renderAdButtons()
      break
  } // end switch
})
// end event listener

start.innerHTML = `
  <button class="nes-btn is-primary">Start Game</button>
  <button class="nes-btn">Leaderboard</button>
`
const insertLeaderboard = () =>{ 

  welcomeScreen.innerHTML = `
  
      <div class="nes-table-responsive">
        <table class="nes-table is-bordered is-dark" style="height: 803px; width: 92%; margin-left: 23px" >
          <thead>
            <tr>
              <th>User</th>
              <th>Current Level</th>
            </tr>
          </thead>
              <tbody id="leaderTable">
          </tbody>
        </table>
      </div>
      <button class="nes-btn is-primary">Start Game</button>
      `
      fetchHelperLeaderboard()
}


player2Name.innerText = currentComp.name

gameContainer.style.display = "none"
output.style.display = "none"
renderAdButtons()
