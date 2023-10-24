const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const sizes = {
  x: window.innerWidth,
  y: window.innerHeight,
};

canvas.width = sizes.x;
canvas.height = sizes.y;

window.addEventListener("resize", (e) => {
  sizes.x = window.innerWidth;
  sizes.y = window.innerHeight;

  canvas.width = sizes.x;
  canvas.height = sizes.y;
});

window.addEventListener("keydown", (e) => {
  if (e.key == " ") {
    AFFINITY_MATRIX = createRandomFloat32Array(N_COLORS);
    console.log(AFFINITY_MATRIX);
  }
});

/**
 * N denotes the number of particles
 * colors = 0, 1, 2, 3, 4, if N_COLORS = 5
 */
const N = 1500;
const N_COLORS = 4;
const COLORS = generateColors(N_COLORS);
const UNIT_DIST = 120;
const FIRCTION = 0.25;
const TIME_SCALE = 1;
const FORCE_SCALE = 30;
const LINE_DIST = 30;

let AFFINITY_MATRIX = createRandomFloat32Array(N_COLORS);
console.log(AFFINITY_MATRIX);

const swarm = [];

for (let i = 0; i < N; i++) {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  const color = Math.floor(Math.random() * N_COLORS);

  swarm.push(new Particle({ x, y }, { x: 0, y: 0 }, color));
}

let time = new Date();

const tick = () => {
  const currentTime = new Date();
  const delta = currentTime - time;
  time = currentTime;

  context.clearRect(0, 0, canvas.width, canvas.height);

  for (const particle of swarm) {
    particle.update(0.01 * TIME_SCALE);
    particle.draw(context);
  }

  window.requestAnimationFrame(tick);
};

tick();
