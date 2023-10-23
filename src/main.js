const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", (e) => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const N = 1000; // Num of Particles
const N_COLORS = 5; // Num of Colors
const COLORS = getRandomColors(N_COLORS); // Array of Colors
const PARTICLE_RADIUS = 3; // Radius of each particle

const world = new World();

for (let i = 0; i < N; i++) {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  world.add(new Particle(x, y, PARTICLE_RADIUS, pickRandomColor(COLORS)));
}

const tick = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  world.update(ctx);
  window.requestAnimationFrame(tick);
};

tick();
