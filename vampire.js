class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    const totalOffspring = this.offspring.length;
    return totalOffspring;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVampires = 0;
    let thisVampire = this;

    while (thisVampire.creator) {
      thisVampire = thisVampire.creator;
      numberOfVampires++;
    }

    return numberOfVampires;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    const thisSeniorityRank = this.numberOfVampiresFromOriginal;
    const otherSeniorityRank = vampire.numberOfVampiresFromOriginal;
    const thisVampireHasSeniority = thisSeniorityRank < otherSeniorityRank;
    return thisVampireHasSeniority;
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    if (this.name === name) {
      return this;
    }
    let thisVampire;
    for (const offspring of this.offspring) {
      thisVampire = offspring.vampireWithName(name);
      if (thisVampire !== null) {
        return thisVampire;
      }
    }

    return null;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let result = this.numberOfOffspring;
    for (const offspring of this.offspring) {
      result += offspring.totalDescendents;
    }

    return result;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    
  }

  // Returns true if this vampire is an ancestor of the other vampire.
  isAncestor(vampire) {
    let outcome = false;
    let otherVampire = vampire;
    const thisVampireName = this.name;
    while (otherVampire.creator !== null) {
      const otherVampireCreatorName = otherVampire.name;
      if (otherVampireCreatorName === thisVampireName) {
        return true;
      }
      otherVampire = otherVampire.creator;
    }
    return outcome;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    
    let thisVampire = this;
    while (thisVampire.isAncestor(vampire) === false) {
      if (thisVampire.creator === null) {
        break;
      }
      thisVampire = thisVampire.creator;
    }
    return thisVampire;
    
  }

}

// const rootVampire = new Vampire("root");
// const offspring1 = new Vampire("a");
// const offspring2 = new Vampire("b");
// const offspring3 = new Vampire("c");
// const offspring4 = new Vampire("d");
// const offspring5 = new Vampire("e");
// const offspring6 = new Vampire("f");
// const offspring7 = new Vampire("g");
// const offspring8 = new Vampire("h");

// rootVampire.addOffspring(offspring1);
// rootVampire.addOffspring(offspring2);
// rootVampire.addOffspring(offspring3);
// offspring3.addOffspring(offspring4);
// offspring3.addOffspring(offspring5);
// offspring5.addOffspring(offspring6);
// offspring6.addOffspring(offspring7);
// offspring2.addOffspring(offspring8);

// console.log(rootVampire.depthFirstTraversal())

// Data structure outline
/*
      root
    /   |   \
  [a]  [b]  [c]
        |   / \
       [h][d] [e]
               |
              [g]
*/

module.exports = Vampire;
