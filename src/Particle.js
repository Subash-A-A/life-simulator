class Particle {
  constructor(position, velocity, color) {
    this.x = position.x;
    this.y = position.y;
    this.velX = velocity.x;
    this.velY = velocity.y;
    this.color = color;
    this.radius = 2;
  }

  draw() {
    context.fillStyle = COLORS[this.color];
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    context.fill();
  }

  update(delta) {
    // Update Velocity
    let totalForceX = 0;
    let totalForceY = 0;

    for (let i = 0; i < swarm.length; i++) {
      const particle = swarm[i];

      if (particle == this) continue;

      let dx = particle.x - this.x;
      let dy = particle.y - this.y;

      // Torous like environment (min dist calculation)
      if (dx > sizes.x / 2) {
        dx -= sizes.x;
      } else if (dx < -sizes.x / 2) {
        dx += sizes.x;
      }
      if (dy > sizes.y / 2) {
        dy -= sizes.y;
      } else if (dy < -sizes.y / 2) {
        dy += sizes.y;
      }

      const dist = Math.sqrt(dx * dx + dy * dy);

      const affinity = AFFINITY_MATRIX[this.color * N_COLORS + particle.color];

      if (dist < LINE_DIST) {
      }

      if (dist > 0 && dist < UNIT_DIST) {
        const force = this.force(dist / UNIT_DIST, affinity);
        totalForceX += (dx / dist) * force;
        totalForceY += (dy / dist) * force;
      }
    }

    totalForceX *= UNIT_DIST * FORCE_SCALE;
    totalForceY *= UNIT_DIST * FORCE_SCALE;

    this.velX *= FIRCTION;
    this.velY *= FIRCTION;

    this.velX += totalForceX * delta;
    this.velY += totalForceY * delta;

    // Update Position
    this.x += this.velX * delta;
    this.y += this.velY * delta;

    this.x = (this.x + sizes.x) % sizes.x;
    this.y = (this.y + sizes.y) % sizes.y;
  }

  force(dist, affinity) {
    const beta = 0.3;

    if (dist <= beta) {
      return dist / beta - 1;
    } else if (dist > beta && dist < 1) {
      return affinity * (1 - Math.abs(2 * dist - 1 - beta) / (1 - beta));
    } else {
      return 0;
    }
  }
}
