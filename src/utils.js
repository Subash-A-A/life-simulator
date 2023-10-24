function generateColors(n_colors) {
  const colors = [];
  const hueStep = 360 / n_colors; // Calculate the step between hues

  for (let i = 0; i < n_colors; i++) {
    const hue = (i * hueStep) % 360; // Calculate the hue for each sector
    const saturation = 100; // You can adjust the saturation and lightness values
    const lightness = 70; // to control the vibrancy of the colors.

    colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
  }

  return colors;
}

function createRandomFloat32Array(n) {
  const array = new Float32Array(n * n);

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      // Generate a random number between -1 and 1
      const randomValue = Math.random() * 2 - 1;
      const index = i * n + j;
      array[index] = randomValue;
    }
  }

  return array;
}
