const presetBtn = document.getElementById("preset-button");
const presets = document.getElementById("presets");
const values = document.getElementById("values");

const keyNameMapping = {
  N: "COUNT",
  N_COLORS: "COLORS",
  UNIT_DIST: "UNIT DISTANCE",
  FIRCTION: "FRICTION",
  TIME_SCALE: "TIME SCALE",
  FORCE_SCALE: "FORCE SCALE",
  LINE_DIST: "LINE DISTANCE",
  ENTITY_CRAMMING_COUNT: "CRAMMING COUNT",
  SHOW_LINES: "SHOW LINES",
  ENABLE_GRADIENT_LINES: "SHOW GRADIENT LINES",
  STABILITY_WEIGHT: "STABILITY WEIGHT",
};

const pausePlaySim = (btn) => {
  if (!SIM_STATE.PAUSED) {
    btn.classList.add("pause");
    SIM_STATE.PAUSED = true;
  } else {
    btn.classList.remove("pause");
    SIM_STATE.PAUSED = false;
    tick();
  }
};

const stepSim = () => {
  if (SIM_STATE.PAUSED) {
    tick();
  }
  return;
};

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

const createTable = (matrix, name, colors, min, max) => {
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
      const numeric = createElement("input", ["numeric"]);
      numeric.setAttribute("data-index", [i, j]);
      numeric.value = matrix[i][j].toFixed(2);
      numeric.type = "number";
      numeric.min = min;
      numeric.max = max;
      numeric.step = 0.25;

      numeric.addEventListener("change", (e) => {
        const val = e.target.value;
        let newVal = 0;
        if (val > max || val < min) {
          e.target.value = val > 0 ? max : min;
          newVal = e.target.value;
        } else {
          newVal = val;
        }
        matrix[i][j] = newVal;
      });

      append(row, [numeric]);
    }
    append(preset, [row]);
  }

  append(presets, [preset]);

  assignColors();
};

const create1D = (array, name, colors, min, max) => {
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
    const numeric = createElement("input", ["numeric"]);
    numeric.setAttribute("data-index", [i]);
    numeric.setAttribute("contenteditable", true);
    numeric.value = array[i].toFixed(2);
    numeric.type = "number";
    numeric.min = min;
    numeric.max = max;

    numeric.addEventListener("change", (e) => {
      const val = e.target.value;
      let newVal = 0;
      if (val > max || val < min) {
        e.target.value = val > 0 ? max : min;
        newVal = e.target.value;
      } else {
        newVal = val;
      }
      array[i] = newVal;
    });

    append(row, [numeric]);
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

const inputTypeMapper = (value) => {
  if (typeof value == "number") {
    return "number";
  } else if (typeof value == "boolean") {
    return "checkbox";
  }
};

const createParamUI = () => {
  for (const key in PARAMS) {
    const valueDiv = createElement("div", ["value"]);
    const h2 = createElement("h2", []);
    const input = createElement("input", []);
    input.type = inputTypeMapper(PARAMS[key]);

    if (input.type == "checkbox") {
      input.checked = PARAMS[key];
    } else {
      input.value = PARAMS[key];
      input.addEventListener("change", (e) => {
        PARAMS[key] = e.target.value;
      });
    }

    h2.innerText = keyNameMapping[key];
    append(valueDiv, [h2, input]);
    append(values, [valueDiv]);
    inputTypeMapper(PARAMS[key]);
  }
};

const displayAllTables = () => {
  presets.innerHTML = "";
  values.innerHTML = "";
  createParamUI();
  updateConfiguration();
};

const updateConfiguration = () => {
  createTable(CONFIG.AFFINITY_MATRIX, "AFFINITY MATRIX", CONFIG.COLORS, -1, 1);
  createTable(CONFIG.BETA_MATRIX, "BETA MATRIX", CONFIG.COLORS, 0, 1);
  create1D(CONFIG.STABILITY_MATRIX, "STABILITY VALUES", CONFIG.COLORS, 5, 50);
};

displayAllTables();
