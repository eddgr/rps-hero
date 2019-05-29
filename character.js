// CLASS CHARACTERS
class Character {
  constructor(name) {
     this.name = name
     this.hp = 10
     this.damage = 2
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
const lee = new Character('Lee')
const bob = new Character('Bob')
// end CLASS CHARACTERS
