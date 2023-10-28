const presetBtn = document.getElementById("preset-button");
const presets = document.getElementById("presets");

function getCaretPosition(element) {
  if (window.getSelection && window.getSelection().getRangeAt) {
    const range = window.getSelection().getRangeAt(0);
    const selected = range.toString().length;
    const preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(element);
    preCaretRange.setEnd(range.endContainer, range.endOffset);
    const caret = preCaretRange.toString().length;
    return { start: caret, end: caret + selected };
  }
  return { start: 0, end: 0 };
}

function setCaretPosition(element, position) {
  const range = document.createRange();
  const sel = window.getSelection();
  range.setStart(element.childNodes[0], position.start);
  range.setEnd(element.childNodes[0], position.end);
  sel.removeAllRanges();
  sel.addRange(range);
}

const toggleElement = (element, button) => {
  const menu = document.getElementById(element);
  menu.classList.toggle("show");
  button.classList.toggle("morph-btn");
};

const append = (element, nodes) => {
  for (const node of nodes) {
    element.appendChild(node);
  }
};

const createElement = (type, classList) => {
  const element = document.createElement(type);
  if (classList.length > 0) {
    element.classList.add([...classList]);
  }
  return element;
};

const createTable = (matrix, name, colors) => {
  const preset = createElement("div", ["preset"]);
  const h2 = document.createElement("h2");
  h2.innerText = name;

  const presetGrid = createElement("div", ["preset-grid"]);

  append(preset, [h2, presetGrid]);

  const firstRow = createElement("div", ["preset-row"]);
  const emptyDiv = createElement("div", []);
  append(firstRow, [emptyDiv]);

  for (let i = 0; i < colors.length; i++) {
    const colorDiv = createElement("div", ["color"]);
    colorDiv.setAttribute("data-color", colors[i]);
    append(firstRow, [colorDiv]);
  }
  append(preset, [firstRow]);

  for (let i = 0; i < colors.length; i++) {
    const row = createElement("div", ["preset-row"]);
    const colorDiv = createElement("div", ["color"]);
    colorDiv.setAttribute("data-color", colors[i]);
    append(row, [colorDiv]);
    for (let j = 0; j < matrix[i].length; j++) {
      let isEditing = false;
      const numericDiv = createElement("div", ["numeric"]);
      numericDiv.setAttribute("data-index", [i, j]);
      numericDiv.setAttribute("contenteditable", true);
      numericDiv.addEventListener("input", function (e) {
        isEditing = true;
        const text = numericDiv.innerText;
        const caretPosition = getCaretPosition(numericDiv);
        const sanitizedText = text.replace(/[^0-9.-]/g, "");
        numericDiv.innerText = sanitizedText;
        setCaretPosition(numericDiv, caretPosition);
      });
      numericDiv.innerText = matrix[i][j].toFixed(2);
      append(row, [numericDiv]);
    }
    append(preset, [row]);
  }

  append(presets, [preset]);

  assignColors();
};

const create1D = (array, name, colors) => {
  const preset = createElement("div", ["preset"]);
  const h2 = document.createElement("h2");
  h2.innerText = name;

  const presetGrid = createElement("div", ["preset-grid"]);

  append(preset, [h2, presetGrid]);

  const firstRow = createElement("div", ["preset-row"]);

  for (let i = 0; i < colors.length; i++) {
    const colorDiv = createElement("div", ["color"]);
    colorDiv.setAttribute("data-color", colors[i]);
    append(firstRow, [colorDiv]);
  }
  append(preset, [firstRow]);

  const row = createElement("div", ["preset-row"]);
  for (let i = 0; i < array.length; i++) {
    const numericDiv = createElement("div", ["numeric"]);
    numericDiv.setAttribute("data-index", [i]);
    numericDiv.setAttribute("contenteditable", true);
    numericDiv.innerText = array[i].toFixed(2);
    append(row, [numericDiv]);
    append(preset, [row]);
  }

  append(presets, [preset]);

  assignColors();
};

const assignColors = () => {
  const elements = document.querySelectorAll(".color");

  elements.forEach((element) => {
    const color = element.getAttribute("data-color");
    element.style.backgroundColor = color;
  });
};

const displayAllTables = () => {
  presets.innerHTML = "";
  console.log("Inner HTML", presets.innerHTML);
  createTable(CONFIG.AFFINITY_MATRIX, "AFFINITY MATRIX", CONFIG.COLORS);
  createTable(CONFIG.BETA_MATRIX, "BETA MATRIX", CONFIG.COLORS);
  create1D(CONFIG.STABILITY_MATRIX, "STABILITY VALUES", CONFIG.COLORS);
};

displayAllTables();
