// CLASS CHARACTERS
class Character {
  constructor(name, id) {
     this.name = name
     this.id = id
     this.hp = 10
     this.damage = 3
     this.currentDamage = 3
     this.buffs = {
       damageReduction: 0,
       dodge: 0
     }
     this.attackLogic = true
     // Attack === true
     // Defend === false
  }
}

// seed
const lee = new Character('Lee') // defensive, squirtle
const bob = new Character('Bob') // neutral, bulbasaur
const jimmy = new Character('Jimmy') // offensive, charmander

const computerChars = [lee, bob, jimmy]
const computerCharacters = computerChars.sample()
// end CLASS CHARACTERS
