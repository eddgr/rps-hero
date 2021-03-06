// MISC
  // GAME LOOP for testing purposes only
  let gameNumber = 1

  function testRun(user1 = lee, user2 = currentComp){
    output.innerHTML += `
      <hr>
      <h2>Game Number: ${gameNumber}</h2>
    `
    while (user1.hp > 0 && user2.hp > 0){
      console.log("Player 1 HP: ", user1.hp, "Player 2 HP: ", user2.hp)
      console.log("Player 1 Buffs: ", user1.buffs)
      console.log("Player 2 Buffs: ", user2.buffs)
      // player 1 buff check
      if (user1.buffs.damageReduction > 0){
        user1.buffs.damageReduction -= 1
      }

      if (user1.buffs.dodge > 0){
        user1.buffs.dodge -= 1
      }
      // end player 1 buff check

      // player 2 buff check
      if (user2.buffs.damageReduction > 0){
        user2.buffs.damageReduction -= 1
      }
      if (user2.buffs.dodge > 0){
        user2.buffs.dodge -= 1
      }
      // end player 2 buff check
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
  } // end GAME LOOP

  // rock paper scissor AI logic
  const rollRPS = () => {
    let trueFalse

    switch (currentComp){
      case (lee):
        trueFalse = [false, false, false, true]
        break
      case (bob):
        trueFalse = [true, false]
        break
      case (jimmy):
        trueFalse = [true, true, true, false]
        break
    }
    currentComp.attackLogic = trueFalse.sample()
    //insert function to grab currentComp attack logic. run function to insert shield or sword based on true:sword || false:shield
    renderCompIcon(currentComp.attackLogic)
    //TODO: fire OFF CSS animation Here for ATTACK
    comp1Move()
    user1Move()

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
  } // end AI logic

  //ANIMATION MOVEMENT LOGIC for User and Computer
  function user1Move() {
    let elem = user1Sprite
    let pos = 0
    let id = setInterval(frame, 5)
    console.log(user1Sprite)

    function frame() {
      if (pos == 100) {
          clearInterval(id);
      } else {
      pos++;
      // elem.style.bottom = pos + 'px'; //let this be 300 ?
      elem.style.left = pos + 'px'; //let this be 100?
      }
    }
  } // end user1Move

  function comp1Move() {
    let elem = comp1Sprite
    let pos = 0
    let id = setInterval(frame, 5)
    console.log(user1Sprite)

    function frame() {
      if (pos == 100) {
          clearInterval(id);
      } else {
          pos++;
          // elem.style.top = pos + 'px'; //test positioning
          elem.style.right = pos + 'px'; //test positioning
      }
    }
  } // end comp1Move
  // end ANIMATION MOVEMENT LOGIC
// end MISC
