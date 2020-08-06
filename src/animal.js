import { randomNormal, roundWithPrecision } from './math.js';

const DEFAULT_GENES = {
  size: { value: 4, variance: 1, statRatio: 0.7 }, // 1..10
  speed: { value: 2, variance: 0.5, statRatio: 1 }, // 1..10
  energy: { value: 100, variance: 20, statRatio: 0.5 }, // Energy to move = distance * speed^2 * Size^3
  sight: { value: 3, variance: 1, statRatio: 0.85 }
};
const VARIANCE_DRIFT = 5; // % how much variance can mutate
export const GENE_KEYS = Object.keys(DEFAULT_GENES);

export class Animal {
  constructor(parentA = false, parentB = false) {
    if (parentA && parentB) {
      this.genes = getRecombinedGenes(parentA.genes, parentB.genes);
    } else if (parentA) {
      this.genes = getRandomizedGenes(parentA.genes);
    } else {
      this.genes = getRandomizedGenes(DEFAULT_GENES);
    }
    this.age = 0;
    this.setStats();
  }

  // starting stats = (ratio)% of genetic stats
  setStats() {
    for (const key in this.genes) {
      this[key] = this.genes[key].value * DEFAULT_GENES[key].statRatio;
    }
    // lock Speed & Energy to Size
  }

  // increase stats to 100% of genetic
  mature() {
    for (const key in this.genes) {
      this[key] = this.genes[key].value;
    }
  }

  // random angle * speed = direction?
  pickDirection() {}

  // move along a vector
  move() {}

  // check for food in sight range
  look() {}

  // replenish energy
  eat() {}
}

class maleAnimal extends Animal {
  constructor(parentA = null, parentB = null) {
    super(parentA, parentB);
  }

  // look for available partners
  mate() {}
}

class femaleAnimal extends Animal {
  constructor(parentA = null, parentB = null) {
    super(parentA, parentB);
  }

  // takes a lot of energy
  giveBirth() {}
}

// --------- GENE FUNCTIONS --------- //

function getRandomizedGenes(parentGenes) {
  let genes = {};
  for (let [key, { value, variance }] of Object.entries(parentGenes)) {
    variance = randomizeVariance(variance);
    D;
    value = applyVariance(variance);
    genes[key] = { value, variance };
  }
  return genes;
}

function getRecombinedGenes(genesA, genesB) {
  let recombined = {};
  for (const key of GENE_KEYS) {
    if (genesA.hasOwnProperty(key) && genesB.hasOwnProperty(key)) {
      recombined[key] = recombineGene(genesA[key], genesB[key]);
    }
  }
  return recombined;
}

function recombineGene(geneA, geneB) {
  let value = recombine(geneA.value, geneB.value);
  let variance = recombine(geneA.variance, geneB.variance);
  variance = randomizeVariance(variance);
  value = applyVariance(value, variance);
  return { value, variance };
}

function recombine(a, b) {
  let p = randomNormal(0.5, 0.5);
  return p * a + (1 - p) * b;
}

function randomizeVariance(variance) {
  return (1 + randomNormal(0, VARIANCE_DRIFT) / 100) * variance;
}

function applyVariance(value, variance, precision = 2) {
  return roundWithPrecision(value + randomNormal(0, variance), precision);
}
