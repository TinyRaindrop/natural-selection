// Generates normally distributed random numbers in [-amplitude..amplitude] range
export function randomBoxMuller(mean = 0, amplitude = 0.5) {
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  let r = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  r = r / 7 + 0.5;
  if (r < 0 || r > 1) return randomBoxMuller();
  return 2 * amplitude * r + mean - amplitude;
}

export function expDistribution() {
  let shift = 2;
  return -Math.log((1 - randomNormal(0.5)) / shift);
}

// Generates pseudo-normally distributed random numbers in [-amplitude..amplitude). Ideal depth == 4.
export function randomNormal(mean = 0, amplitude = 0.5, depth = 4) {
  let r = 0;
  for (let i = 0; i < depth; i++) r += Math.random();
  r /= depth;
  return 2 * amplitude * r + mean - amplitude;
}

// Returns an array of histogram coordinates {x,y} for Chart.js
export function createHistogram(array, step, min = null, max = null) {
  if (!array.length || step <= 0) return false;
  array.sort((a, b) => a - b);
  if (min === null) min = array[0];
  if (max === null) max = array[array.length - 1];

  let threshold = min + step;
  let histogram = [];
  let count = 0;

  for (const n of array) {
    if (n < threshold) {
      count++;
    } else {
      histogram.push({ x: roundWithPrecision(threshold - step / 2, 2), y: count });
      count = 0;
      threshold += step;
    }
  }
  return histogram;
}

export function getMean(array) {
  return array.reduce((sum, n) => sum + n, 0) / array.length;
}

export function getStdDeviation(array) {
  return Math.sqrt(
    array.reduce((total, n) => total + (getMean(array) - n) ** 2) / array.length
  );
}

export function roundWithPrecision(x, p = 2) {
  return Math.round((x + Number.EPSILON) * 10 ** p) / 10 ** p;
}
