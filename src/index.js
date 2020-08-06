'use strict';

import { Animal, GENE_KEYS } from './animal.js';
import {
  // populationChart,
  sizeChart
  // speedChart,
  // energyChart,
  // sightChart
} from './charts.js';
import { randomNormal, createHistogram, getStdDeviation, expDistribution } from './math.js';

const WORLD_SIZE = 100;
const AMOUNT = 10;

// --------- MAIN APP --------- //

let population = [];

spawnAnimals(3, 2);
function spawnAnimals(genNum, amount) {
  let generation = [];
  for (let i = 0; i < amount; i++) {
    generation[i] = new Animal();
  }
  population[0] = generation;

  for (let gen = 1; gen < genNum; gen++) {
    generation = [];
    for (let i = 0; i < amount; i += 2) {
      const parentA = population[gen - 1][i];
      const parentB = population[gen - 1][i + 1];
      generation[i] = new Animal(parentA, parentB);
      generation[i + 1] = new Animal(parentA, parentB);
    }
    population[gen] = generation;
  }
}

console.log('Population', population);

function spawnOffspring(parentA, parentB) {
  return [children];
}

population.forEach((generation) => {
  let genGenes = getAvgGenesOfGeneration(generation);
  console.log('genGenes', genGenes);
});

function getAvgGenesOfGeneration(generation) {
  let generationGenes = {};
  generation.forEach((animal) => {
    for (const key of GENE_KEYS) {
      let pool = generationGenes[key] || [];
      generationGenes[key] = [...pool, animal.genes[key].value];
    }
  });
  return generationGenes;
}

let a = [];
let b = [];

// for (let i = 0; i < 100000; i++) {
//   a.push(randomNormal());
//   b.push(expDistribution());
// }

// let aDist = createHistogram(a, 0.1);
// let bDist = createHistogram(b, 0.05);
// console.log('A', a, '\nB', b);
// console.log('hA', aDist, '\nhB', bDist);
// console.log('devA', getStdDeviation(a), 'devB', getStdDeviation(b));

// addData(sizeChart, 'Simple', aDist, '#ffffff55');
// addData(sizeChart, 'True', bDist, '#3dffff');

function addData(chart, label, data, color = '#ffffff') {
  chart.data.datasets.push({ label, data, backgroundColor: color });
  chart.update();
}
