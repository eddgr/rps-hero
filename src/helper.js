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
      <img src="img/sword_container.png" width="100">
    `
  }
  const renderUserDefenseIcon = () => {
    userAttkIcon.innerHTML = `
      <img src="img/shield_container.png" width="100">
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
      <img src="img/sword_container_p2.png" width="100">
    `
  }
  const renderCompDefenseIcon = () => {
    compAttkIcon.innerHTML = `
      <img src="img/shield_container.png" width="100">
    `
  }

  const renderWinLossIcon = () => {
    winLossIcon.innerText = "hello"
  }
  // end render icons

  // render Rock, Paper, Scissor buttons
  const renderRpsButtons = (buffDescObj) => {
    infoBar.innerText = "Click here for the Main Menu."

    commands.innerHTML = `
      <div class="row w-100">
        <div class="col-sm-4 card bg-primary rounded-0 text-light">
          <span class="card-body">${buffDescObj.rock}</span>
          <button class="nes-btn is-primary mb-4 d-block">
            Rock
          </button>
        </div>

        <div class="col-sm-4 card bg-warning rounded-0">
          <span class="card-body">${buffDescObj.paper}</span>
          <button class="nes-btn is-warning mb-4 d-block">
            Paper
          </button>
        </div>

        <div class="col-sm-4 card bg-danger rounded-0 text-light">
          <span class="card-body">${buffDescObj.scissor}</span>
          <button class="nes-btn is-error mb-4 d-block">
            Scissor
          </button>
        </div>
      </div>
    `
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
    if (currentUser.buffs.damageReduction > 0 && currentUser.buffs.dodge > 0){
      player1Buff.innerText = `
        Damage Reduction: ${currentUser.buffs.damageReduction - 1}
        Dodge: ${currentUser.buffs.dodge - 1}
      `
    } else if (currentUser.buffs.damageReduction > 0) {
      player1Buff.innerText = `
        Damage Reduction: ${currentUser.buffs.damageReduction - 1}
      `
    } else if (currentUser.buffs.dodge > 0) {
      player1Buff.innerText = `
        Dodge: ${currentUser.buffs.dodge}
      `
    } else {
      player1Buff.innerText = ``
    }
    //player 2 buff status
    if (currentComp.buffs.damageReduction > 0 && currentComp.buffs.dodge > 0){
      player2Buff.innerText = `
        Damage Reduction: ${currentComp.buffs.damageReduction - 1}
        Dodge: ${currentComp.buffs.dodge - 1}
      `
    } else if (currentComp.buffs.damageReduction > 0) {
      player2Buff.innerText = `
        Damage Reduction: ${currentComp.buffs.damageReduction - 1}
      `
    } else if (currentComp.buffs.dodge > 0) {
      player2Buff.innerText = `
        Dodge: ${currentComp.buffs.dodge}
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
  } // end renderAdButtons

  // display the player choices and damage output
  function outputMessage (caseNum, attackLogic, userChoice1, userChoice2) {
    // display player1 & 2 HP
    player1WinHP.innerText = `${currentUser.hp}/10 HP`
    player2WinHP.innerText = `${currentComp.hp}/10 HP`

    player1Health.value = currentUser.hp
    player2Health.value = currentComp.hp

    infoBar.innerText = "Click here to continue."

    output.innerHTML = `
      <p>You played ${userChoice1.toUpperCase()} and ${currentComp.name} played ${userChoice2.toUpperCase()}.</p>
    `
    switch (attackLogic){
      case (true):
        switch (caseNum){
          case (-1):
            output.innerHTML += `
              <p>${currentComp.name} does ${currentComp.currentDamage} damage to you.</p>
            `
            break
          case (0):
            output.innerHTML += `
              <p>It's a Draw, nothing happens.</p>
            `
            break
          case (1):
            output.innerHTML += `
              <p>You do ${currentUser.currentDamage} damage to ${currentComp.name}.</p>
            `
            break
        } // end switch
        break
      case (false):
        switch (caseNum){
          case (-1):
            output.innerHTML += `
              <p>${currentComp.name} gained a Buff!</p>
            `
            break
          case (0):
            output.innerHTML += `
              <p>It's a Draw, nothing happens.</p>
            `
            break
          case (1):
            output.innerHTML += `
              <p>You gained a Buff!</p>
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
            } else if (currentPlayer.hp === 8 ) {
              currentPlayer.hp += 2
              console.log("Heal for 2 because of HP cap")
            } else if (currentPlayer.hp < 8 ) {
              currentPlayer.hp += 3
              console.log('Heal for 3')
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
            console.log("Dodge Buff: ", currentPlayer.buffs)
            break
        } // end nested switch
        break
    } // end switch
  } // end playerCheck

  // fetch 1
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
  // end fetch 1
  //fetch 2 
  const fetchHelperLeaderboard = () => {
    
    fetch(API_URL)
      .then(function(response) {
        return response.json()
      })
      .then(function(myJson) {
          const leaderTable = grab('#leaderTable')
          // console.log(leaderTable)
          //sort objects before placing on DOM
          let sortable = []
          for (const object in myJson) {
              if (myJson[object].level >= 0){
                sortable.push([myJson[object]])
              }
          }

          let sortedTable = sortable.sort(function(a, b) {
            return b[0].level - a[0].level
          })
        
          //sort objects before placing on DOM
          let i;
          for (i = 0; (sortedTable.length < 15) ? sortedTable.length: i < 15; i++) {
            leaderTable.innerHTML += `
                <tr>
                <td>${sortedTable[i][0].name}</td>
                <td>${sortedTable[i][0].level}</td>
                </tr>
                `  
          }
    })//end of then function
  }//end fetchHelperLeaderboard

  //end fetch 2
// end HELPERS
