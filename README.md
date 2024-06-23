# Particle Life Simulator
Simple rules can create complex behaviours.

# Simulator Parameters
1. COUNT: Number of particles in the simulation (Warning: Increasing the count too much could crash the simulation).
2. COLORS: Number of distinct colors/types of particles.
3. PARTICLE SIZE: Size of the particles.
4. UNIT DISTANCE: The distance used to compute forces around a particle. If the distance is too small -- nearby particles wont be detected and the simulation would appear still.
5. FRICTION: An opposing force applied to slow do the particles.
6. TIME SCALE: The scale at which time passes.
7. FORCE SCALE: Force multiplier.
8. LINE DISTANCE: Distance used to draw lines. If two particles are closer than LINE DISTANCE, a line will be drawn between them.
9. STABILITY WEIGHT: A multiplier for the stability value (Stability value is obtained from the STABILITY MATRIX, Check Configuration Matrices!).
10. SHOW LINES: Option to display lines between particles.
11. SHOW GRADIENT LINES: Option to display gradient lines between particles.

# Configuration Matrices:
1. AFFINITY MATRIX: Describes the strength of affinity (attract or repel) of a color towards other colors. 
2. BETA MATRIX: This matrix holds the distance in which two particles of different color can interact. If two particles distance is less than beta, they'll start to repel.
3. STABILITY VALUES: How many neighbours can a particle have. If there are too many neighbours, It will try to repel them to have a stable number of neighbours.

![Screenshot from 2024-06-23 13-12-50](https://github.com/Subash-A-A/life-simulator/assets/83503341/166ce690-2c48-4ebd-862e-c1f811fdb3c7)
![Screenshot from 2024-06-23 13-14-35](https://github.com/Subash-A-A/life-simulator/assets/83503341/d0a74dfe-ba8a-4fcb-ba69-ffe07da8b74a)
