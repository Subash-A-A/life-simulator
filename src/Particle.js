class Particle {
  constructor(position, velocity, radius, color) {
    this.position = position;
    this.velocity = velocity;
    this.radius = radius;
    this.color = color;
    this.colorStr = "";
    this.world = null;

    this.init();
  }

  init() {
    this.colorStr = pickColor(this.color, COLORS);
  }

  draw(ctx) {
    ctx.fillStyle = this.colorStr;
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  }

  update(delta) {
    // this.checkBounds();
    this.updateVelocity(delta);
    this.updatePosition(delta);
  }
  updateVelocity(delta) {
    const particles = this.world.particles;

    let totalForceX = 0;
    let totalForceY = 0;

    for (let i = 0; i < particles.length; i++) {
      if (particles[i] == this) continue;
      // 1 --> this, 2--> other particle
      const x1 = this.position.x;
      const y1 = this.position.y;
      const x2 = particles[i].position.x;
      const y2 = particles[i].position.y;

      const delX = x2 - x1;
      const delY = y2 - y1;

      const d = Math.hypot(delX, delY);

      if (d > 0 && d < MAX_DIST) {
        const force = this.force(
          d / MAX_DIST,
          AFFINITY_MATRIX[this.color][particles[i].color]
        );

        totalForceX += (delX / d) * force;
        totalForceY += (delY / d) * force;
      }
    }

    totalForceX *= MAX_DIST;
    totalForceY *= MAX_DIST;

    this.velocity.x *= FRICTION_FACTOR;
    this.velocity.y *= FRICTION_FACTOR;

    this.velocity.x += totalForceX * 0.000001 * delta;
    this.velocity.y += totalForceY * 0.000001 * delta;
  }

  updatePosition(delta) {
    this.position.x =
      (this.position.x + this.velocity.x * delta) % window.innerWidth;
    this.position.y =
      (this.position.y + this.velocity.y * delta) % window.innerHeight;
  }

  checkBounds() {}

  force(dist, affinity) {
    const threshold = 0.3;
    // Global particle repulsion
    // To prevent clumping of particles at center
    if (dist < threshold) {
      return dist / threshold - 1;
    } else if (dist > threshold && dist < 1) {
      return (
        affinity * (1 - Math.abs(2 * dist - 1 - threshold) / (1 - threshold))
      );
    } else {
      return 0;
    }
  }
}
