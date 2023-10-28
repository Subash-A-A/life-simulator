class Particle {
  constructor(position, velocity, color) {
    this.x = position.x;
    this.y = position.y;
    this.velX = velocity.x;
    this.velY = velocity.y;
    this.color = color;
    this.radius = 5;
  }
  draw() {
    context.fillStyle = CONFIG.COLORS[this.color];
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    context.fill();
  }
  drawLineToParticle(particle, affinity) {
    if (!PARAMS.SHOW_LINES) return;
    if (PARAMS.ENABLE_GRADIENT_LINES) {
      const grad = context.createLinearGradient(
        this.x,
        this.y,
        particle.x,
        particle.y
      );
      grad.addColorStop(0, CONFIG.COLORS[this.color]);
      grad.addColorStop(1, CONFIG.COLORS[particle.color]);
      context.strokeStyle = grad;
      context.beginPath();
      context.moveTo(this.x, this.y);
      context.lineTo(particle.x, particle.y);
      context.stroke();
    } else {
      context.strokeStyle = CONFIG.COLORS[this.color];
      context.beginPath();
      context.moveTo(this.x, this.y);
      context.lineTo(particle.x, particle.y);
      context.lineWidth = affinity;
      context.globalAlpha = 0.75;
      context.stroke();
      context.globalAlpha = 1;
    }
  }

  update(delta) {
    // Update Velocity
    let totalForceX = 0;
    let totalForceY = 0;

    let neighbours = 0;

    for (let i = 0; i < swarm.length; i++) {
      const particle = swarm[i];

      if (particle == this) continue;

      const affinity = CONFIG.AFFINITY_MATRIX[this.color][particle.color];
      const beta = CONFIG.BETA_MATRIX[this.color][particle.color];

      let dx = particle.x - this.x;
      let dy = particle.y - this.y;

      const longDist = Math.sqrt(dx * dx + dy * dy);

      if (longDist / PARAMS.UNIT_DIST < PARAMS.LINE_DIST && affinity > 0) {
        this.drawLineToParticle(particle, affinity);
      }

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

      if (dist / PARAMS.UNIT_DIST <= 0.2) {
        neighbours++;
      }

      if (dist > 0 && dist < PARAMS.UNIT_DIST) {
        const stabilityNumber = CONFIG.STABILITY_MATRIX[this.color];
        const force =
          this.force(dist / PARAMS.UNIT_DIST, affinity, beta) -
          (neighbours / stabilityNumber) * PARAMS.STABILITY_WEIGHT;

        totalForceX += (dx / dist) * force;
        totalForceY += (dy / dist) * force;
      }
    }

    totalForceX *= PARAMS.UNIT_DIST * PARAMS.FORCE_SCALE;
    totalForceY *= PARAMS.UNIT_DIST * PARAMS.FORCE_SCALE;

    this.velX *= PARAMS.FIRCTION;
    this.velY *= PARAMS.FIRCTION;

    this.velX += totalForceX * delta;
    this.velY += totalForceY * delta;

    // Update Position
    this.x += this.velX * delta;
    this.y += this.velY * delta;

    this.x = (this.x + sizes.x) % sizes.x;
    this.y = (this.y + sizes.y) % sizes.y;
  }

  force(dist, affinity, beta) {
    if (dist <= beta) {
      return dist / beta - 1;
    } else if (dist > beta && dist < 1) {
      return affinity * (1 - Math.abs(2 * dist - 1 - beta) / (1 - beta));
    } else {
      return 0;
    }
  }
}
