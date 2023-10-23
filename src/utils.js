const getRandomColors = (n_colors) => {
  const colors = [];
  for (let i = 0; i < n_colors; i++) {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    colors.push(randomColor);
  }

  return colors;
};

const pickRandomColor = (colors) => {
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
};
