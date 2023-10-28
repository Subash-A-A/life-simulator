const SIM_STATE = {
  PAUSED: false,
};

const PARAMS = {
  N: 1000,
  N_COLORS: 3,
  UNIT_DIST: 150,
  FIRCTION: 0.05,
  TIME_SCALE: 1,
  FORCE_SCALE: 30,
  LINE_DIST: 0.2,
  ENTITY_CRAMMING_COUNT: 35,
  STABILITY_WEIGHT: 1,
  SHOW_LINES: true,
  ENABLE_GRADIENT_LINES: false,
};

const CONFIG = {
  COLORS: generateColors(PARAMS.N_COLORS),
  AFFINITY_MATRIX: createRandomAffinityMatrix(PARAMS.N_COLORS),
  STABILITY_MATRIX: generateStabilityMatrix(PARAMS.N_COLORS, 10, 20),
  BETA_MATRIX: createRandomBetaMatrix(PARAMS.N_COLORS),
};

const swarm = [];

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const sizes = {
  x: window.innerWidth,
  y: window.innerHeight,
};

const controls = {
  isDown: false,
  startTranslate: { x: 0, y: 0 },
  zoom: 1,
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
    CONFIG.AFFINITY_MATRIX = createRandomAffinityMatrix(PARAMS.N_COLORS);
    CONFIG.BETA_MATRIX = createRandomBetaMatrix(PARAMS.N_COLORS);
    CONFIG.STABILITY_MATRIX = generateStabilityMatrix(PARAMS.N_COLORS, 10, 20);
    displayAllTables();
  }
});

const spwanParticle = () => {
  const x = Math.random() * sizes.x;
  const y = Math.random() * sizes.y;
  const color = Math.floor(Math.random() * PARAMS.N_COLORS);
  swarm.push(new Particle({ x, y }, { x: 0, y: 0 }, color));
};

const startSimulation = () => {
  swarm.length = 0;
  for (let i = 0; i < PARAMS.N; i++) {
    spwanParticle();
  }
};

const tick = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);

  for (const particle of swarm) {
    particle.update(0.01 * PARAMS.TIME_SCALE);
    particle.draw();
  }

  if (!SIM_STATE.PAUSED) {
    window.requestAnimationFrame(tick);
  }
};

startSimulation();
tick();
