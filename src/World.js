class World {
  constructor() {
    this.particles = [];
    this.affinityMatrix = [];

    this.init();
  }

  init() {
    for (let i = 0; i < N; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const velX = (Math.random() - 0.5) * 0.01;
      const velY = (Math.random() - 0.5) * 0.01;
      this.add(
        new Particle(
          { x: x, y: y },
          { x: velX, y: velY },
          PARTICLE_RADIUS,
          pickRandomColorIndex(COLORS)
        )
      );
    }
  }

  update(ctx, delta) {
    for (const particle of this.particles) {
      particle.update(delta);
      particle.draw(ctx);
    }
  }

  add(particle) {
    particle.world = this;
    this.particles.push(particle);
  }
}
