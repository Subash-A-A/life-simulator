function generateColors(n_colors) {
  const colors = [];
  const hueStep = 360 / n_colors; // Calculate the step between hues

  for (let i = 0; i < n_colors; i++) {
    const hue = (i * hueStep) % 360; // Calculate the hue for each sector
    const saturation = 70; // You can adjust the saturation and lightness values
    const lightness = 70; // to control the vibrancy of the colors.

    colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
  }

  return colors;
}
function generateStabilityMatrix(n_colors, min, max) {
  const stabilityMatrix = [];

  for (let i = 0; i < n_colors; i++) {
    stabilityMatrix.push(min + Math.round(Math.random() * (max - min)));
  }

  return stabilityMatrix;
}

function createRandomAffinityMatrix(n) {
  const array = [];

  for (let i = 0; i < n; i++) {
    const current = [];
    for (let j = 0; j < n; j++) {
      // Generate a random number between -1 and 1
      const randomValue = Math.random() * 2 - 1;
      current.push(randomValue);
    }
    array.push(current);
  }

  return array;
}

function createRandomBetaMatrix(n) {
  const array = [];
  for (let i = 0; i < n; i++) {
    const current = [];
    for (let j = 0; j < n; j++) {
      // Generate a random number between -1 and 1
      const randomValue = 0.2 + Math.random() * 0.3;
      current.push(randomValue);
    }
    array.push(current);
  }
  return array;
}
