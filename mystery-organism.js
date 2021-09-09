// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}

// Creates a pAequor object
const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum,
    dna,

    // Selects a random index and mutates the base on that index
    mutate() {
      const randIndex = Math.floor(Math.random() * this.dna.length);
      let newBase = returnRandBase();
      while (this.dna[randIndex] === newBase) {
        newBase = returnRandBase();
      }
      this.dna[randIndex] = newBase;
      return this.dna;
    },

    // Logs the percent similarity of two specimens
    compareDNA(newObj){
      let same = 0;
      for (let i = 0; i < newObj.dna.length; i++){
        if (newObj.dna[i] === this.dna[i]){
          same++;
        }
      }
      const percentEqual = (same / newObj.dna.length * 100).toFixed(2);
      console.log(`specimen #${this.specimenNum} and specimen #${newObj.specimenNum} have ${percentEqual}% DNA in common`)
    },

    // Returns true if at least 60% of the DNA contains either 'C' or 'G'
    willLikelySurvive(){
      const cOrG = this.dna.filter(base => base === 'C' || base === 'G');
      return cOrG.length / this.dna.length >= 0.6;
    },

    // Returns a new DNA strand composed of the complements of each base of the original strand
    complementStrand(){
      return this.dna.map(base => {
        switch(base){
          case 'A':
            return 'T';
            break;
          case 'T':
            return 'A';
            break;
          case 'G':
            return 'C';
            break;
          case 'C':
            return 'G';
            break;
          default:
            return 'Invalid DNA base';
            break;
        }
      })
    }
  }
};

// Creates 30 specimens or samples
let samples = [];
let counter = 1;
while(counter <= 30){
  let newObj = pAequorFactory(counter, mockUpStrand());
  if (newObj.willLikelySurvive()){
  samples.push(newObj);
  counter++;
  }
}
  











