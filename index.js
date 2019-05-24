//CLASS CHARACTERS
class Character {
  constructor(name) {
     this.name = name
     this.hp = 10
     this.damage = 2
  }
}

const lee = new Character('Lee')
const bob = new Character('Bob')
//CLASS CHARACTERS

// HELPERS
// adding 'sample' to Array prototype to randomize a return item from an array
// this requires 'sample' to be invoked
Array.prototype.sample = function(){
  return this[Math.floor(Math.random()*this.length)];
}
const rpsChoices = ["rock", "paper", "scissor"]

// rock paper scissor AI logic
const rollRPS = () => {

  switch(rpsChoices.sample()){
    case("rock"):
      // console.log("it returned rock!")
      return "rock"
      break
    case("paper"):
      // console.log("it returned paper")
      return "paper"
      break
    case("scissor"):
      // console.log("it returned scissor")
      return "scissor"
      break
  } // end switch
}

// Math.sign(number1 - number 2)
// if number1 > number2 = 1 (win)
// if number1 < number2 = -1 (lose)
// if number1 === number2 = 0 (neutral)

// ROCK
  // Math.sign(rpsChoices.indexOf("rock")-rpsChoices.indexOf("paper")) === -1 
  // Math.sign(rpsChoices.indexOf("rock")-rpsChoices.indexOf("rock")) === 0
  // Math.sign(rpsChoices.indexOf("scissor")-rpsChoices.indexOf("rock")) === 1


//TODO: USER CHOICE IS BEING TESTED!!!!! TAKE OUT WHEN DONE 
  function playRound (userChoice1 = rollRPS(), userChoice2 = rollRPS()) {
    if (userChoice1 === "rock" && userChoice2 === "scissor" || userChoice1 === 'scissor' && userChoice2 === 'rock') {
      switch (Math.sign(rpsChoices.indexOf(userChoice2)-rpsChoices.indexOf(userChoice1))){
        case (-1): 
          console.log("You lost this round")
          lee.hp -= bob.damage
          console.log('player 1 hp:',lee.hp,'player 2 hp:',bob.hp)
          break
        case (0): 
          console.log("Its a Draw")
          console.log('player 1 hp:',lee.hp,'player 2 hp:',bob.hp)
          break
        case (1): 
          console.log("You won this round")
          bob.hp -= lee.damage
          console.log('player 1 hp:',lee.hp,'player 2 hp:',bob.hp)
          break
      }
    }else{

      switch (Math.sign(rpsChoices.indexOf(userChoice1)-rpsChoices.indexOf(userChoice2))){
      case (-1): 
        console.log("You lost this round")
        lee.hp -= bob.damage
        console.log('player 1 hp:',lee.hp,'player 2 hp:',bob.hp)
        break
      case (0): 
        console.log("Its a Draw")
        console.log('player 1 hp:',lee.hp,'player 2 hp:',bob.hp)
        break
      case (1): 
        console.log("You won this round")
        bob.hp -= lee.damage
        console.log('player 1 hp:',lee.hp,'player 2 hp:',bob.hp)
        break
       }//switch end
    }//IF statement end
  }//end of Playround Function

  function checkHP (user1 = lee, user2 = bob ){
    while (user1.hp > 0 && user2.hp > 0) {
      playRound()
    }//while statement
    if (user1.hp <= 0) {
      return "you Lose"
    } else {
      return "you Win"
    }
  }//checkHP function

// PAPER
  // Math.sign(rpsChoices.indexOf("paper")-rpsChoices.indexOf("rock")) === 1
  // Math.sign(rpsChoices.indexOf("paper")-rpsChoices.indexOf("paper")) === 0
  // Math.sign(rpsChoices.indexOf("paper")-rpsChoices.indexOf("scissor")) === -1

// SCISSOR
  // Math.sign(rpsChoices.indexOf("rock")-rpsChoices.indexOf("scissor")) === -1
  // Math.sign(rpsChoices.indexOf("scissor")-rpsChoices.indexOf("scissor")) === 0
  // Math.sign(rpsChoices.indexOf("scissor")-rpsChoices.indexOf("paper")) === 1




// characters with hp

