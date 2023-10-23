const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const N = 2000; // Num of Particles
const N_COLORS = 5; // Num of Colors
const COLORS = getRandomColors(N_COLORS); // Array of Colors
const PARTICLE_RADIUS = 3; // Radius of each particle

const AFFINITY_MATRIX = generateRandomAffinityMatrix(N_COLORS);

console.log(AFFINITY_MATRIX);

const MAX_DIST = 100;
const FRICTION_FACTOR = 0.05;

const world = new World();

let t1 = new Date();

const tick = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Delta Calculation
  let t2 = new Date();
  let delta = t2 - t1;
  t1 = t2;

  // Update World
  world.update(ctx, delta);
  window.requestAnimationFrame(tick);
};

tick();
