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

module.exports = Vampire;

