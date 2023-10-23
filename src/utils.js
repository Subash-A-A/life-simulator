const getRandomColors = (n_colors) => {
  const colors = [];
  for (let i = 0; i < n_colors; i++) {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    colors.push(randomColor);
  }

  return colors;
};

const pickRandomColorIndex = (colors) => {
  return Math.floor(Math.random() * colors.length);
};

const pickColor = (index, colors) => {
  return colors[index];
};

const generateRandomAffinityMatrix = (n_colors) => {
  const affinityMatrix = [];
  for (let i = 0; i < n_colors; i++) {
    let currentColorMatrix = [];
    affinityMatrix.push(currentColorMatrix);
    for (let j = 0; j < n_colors; j++) {
      // Ranges from -1 to +1
      const randomAffinity = (Math.random() - 0.5) * 2;
      affinityMatrix[i].push(randomAffinity);
    }
  }
  return affinityMatrix;
};
