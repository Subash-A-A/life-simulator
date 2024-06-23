![Screenshot from 2024-06-23 13-12-50](https://github.com/Subash-A-A/life-simulator/assets/83503341/3feaa1fe-dce3-4636-8f3e-2a49cfefa190)# life-simulator
Simple rules can create complex behaviours.

# Simulator Parameters
1. COUNT: Number of particles in the simulation (Warning: Increasing the count too much could crash the simulation)
2. COLORS: Number of distinct colors/types of particles
3. PARTICLE SIZE: Size of the particles
4. UNIT DISTANCE:
5. FRICTION:
6. TIME SCALE:
7. FORCE SCALE:
8. LINE DISTANCE:
9. CRAMMING COUNT:
10. STABILITY WEIGHT:
11. SHOW LINES:
12. SHOW GRADIENT LINES:

# Configuration Matrices:
1. AFFINITY MATRIX: Describes the strength of affinity (attract or repel) of a color towards other colors. 
2. BETA MATRIX: This matrix holds the distance in which two particles of different color can interact. If two particles distance is less than beta, they'll start to repel.
3. STABILITY VALUES: How many neighbours can a particle have. If there are too many neighbours, It will try to repel them to have a stable number of neighbours.

![Screenshot from 2024-06-23 13-12-50](https://github.com/Subash-A-A/life-simulator/assets/83503341/166ce690-2c48-4ebd-862e-c1f811fdb3c7)
![Screenshot from 2024-06-23 13-14-35](https://github.com/Subash-A-A/life-simulator/assets/83503341/d0a74dfe-ba8a-4fcb-ba69-ffe07da8b74a)
