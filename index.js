// HELPERS
// adding 'sample' to Array prototype to randomize a return item from an array
Array.prototype.sample = function(){
  return this[Math.floor(Math.random()*this.length)];
}
const rpsOutcome = ["rock", "paper", "scissor"]

// rock paper scissor AI logic
const rollRPS = () => {

  switch(rpsOutcome.sample()){
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


// characters with hp
