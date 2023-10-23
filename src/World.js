class World {
  constructor() {
    this.particles = [];
  }

  update(ctx) {
    for (const particle of this.particles) {
      particle.draw(ctx);
    }
  }

  add(particle) {
    this.particles.push(particle);
  }
}
