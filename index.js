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
      console.log("it returned rock!")
      break
    case("paper"):
      console.log("it returned paper")
      break
    case("scissor"):
      console.log("it returned scissor")
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

// PAPER
  // Math.sign(rpsChoices.indexOf("paper")-rpsChoices.indexOf("rock")) === 1
  // Math.sign(rpsChoices.indexOf("paper")-rpsChoices.indexOf("paper")) === 0
  // Math.sign(rpsChoices.indexOf("paper")-rpsChoices.indexOf("scissor")) === -1

// SCISSOR
  // Math.sign(rpsChoices.indexOf("rock")-rpsChoices.indexOf("scissor")) === -1
  // Math.sign(rpsChoices.indexOf("scissor")-rpsChoices.indexOf("scissor")) === 0
  // Math.sign(rpsChoices.indexOf("scissor")-rpsChoices.indexOf("paper")) === 1




// characters with hp
