// MISC
  // GAME LOOP for testing purposes only
  let gameNumber = 1

  function testRun(user1 = lee, user2 = bob){
    output.innerHTML += `
      <hr>
      <h2>Game Number: ${gameNumber}</h2>
    `
    while (user1.hp > 0 && user2.hp > 0){
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
// end MISC
