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

  // render icons
  const renderUserAttackIcon = () => {
    userAttkIcon.innerHTML = `
      <img src="img/sword_container.png" width="150">
    `
  }
  const renderUserDefenseIcon = () => {
    userAttkIcon.innerHTML = `
      <img src="img/shield_container.png" width="150">
    `
  }
  const destroyUserAttackIcon = () => {
    userAttkIcon.innerHTML = ``
  }
  const destroyCompAttackIcon = () => {
    compAttkIcon.innerHTML = ``
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
      <img src="img/sword_container_p2.png" width="150">
    `
  }
  const renderCompDefenseIcon = () => {
    compAttkIcon.innerHTML = `
      <img src="img/shield_container.png" width="150">
    `
  }

  const renderWinLossIcon = () => {
    winLossIcon.innerText = "hello"
  }
  // end render icons

  // render Rock, Paper, Scissor buttons
  const renderRpsButtons = (buffDescObj) => {
    infoBar.innerText = "Press 'B' for the Main Menu."

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
    }) // end event listener
  } // end renderRpsButtons

  // render Attack/Defend button
  const renderAdButtons = () => {
    // A/D === Attack/Defend
    // check current buffs before rendering A/D buttons

    // resets
    user1Sprite.style.left = "0px"
    destroyUserAttackIcon()
    comp1Sprite.style.right = "0px"
    destroyCompAttackIcon()

    output.style.display = "none"
    commands.style.display = ""

    infoBar.innerText = 'Choose Attack or Defend'
    // end resets

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
      <div class="col-sm-6 bg-danger text-center p-4 d-block">
        <img src="img/sword_container.png" style="width:150px; height:auto">
        <button class="nes-btn is-error d-block mx-auto">Attack</button>
      </div>
      <div class="col-sm-6 bg-primary text-center p-4 d-block">
        <img src="img/shield_container.png" style="width:150px; height:auto">
        <button class="nes-btn is-primary d-block mx-auto">Defend</button>
      </div>
    `

    // display player1 & 2 HP
    player1WinHP.innerText = `${currentUser.hp}/10 HP`
    player2WinHP.innerText = `${bob.hp}/10 HP`

    player1Health.value = currentUser.hp
    player2Health.value = bob.hp
  } // end renderAdButtons

  // display the player choices and damage output
  function outputMessage (caseNum, attackLogic, userChoice1, userChoice2) {
    output.innerHTML = `
      <p>You played ${userChoice1} and ${bob.name} played ${userChoice2}.</p>
    `
    switch (attackLogic){
      case (true):
        switch (caseNum){
          case (-1):
            output.innerHTML += `
              <p>${bob.name} does ${bob.currentDamage} damage to you.</p>
            `
            break
          case (0):
            output.innerHTML += `
              <p>Draw, no damage.</p>
            `
            break
          case (1):
            output.innerHTML += `
              <p>You do ${currentUser.currentDamage} damage to ${bob.name}.</p>
            `
            break
        } // end switch
        break
      case (false):
        switch (caseNum){
          case (-1):
            output.innerHTML += `
              <p>${bob.name} gained ${bob.buffs}.</p>
            `
            break
          case (0):
            output.innerHTML += `
              <p>Draw, no damage.</p>
            `
            break
          case (1):
            output.innerHTML += `
              <p>You gained ${currentUser.buffs}.</p>
            `
            break
        } // end switch
        break
    } //end switch
  } // end outputMessage

  // attack/defend helper function to calculate damage and buff
  function playerCheck(currentPlayer, otherPlayer, userChoice){
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
