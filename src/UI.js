const presetBtn = document.getElementById("preset-button");
const presets = document.getElementById("presets");
const values = document.getElementById("values");

const keyNameMapping = {
  N: { name: "COUNT", runtime_param: false },
  N_COLORS: { name: "COLORS", runtime_param: false },
  UNIT_DIST: { name: "UNIT DISTANCE", runtime_param: true },
  FIRCTION: { name: "FRICTION", runtime_param: true },
  TIME_SCALE: { name: "TIME SCALE", runtime_param: true },
  FORCE_SCALE: { name: "FORCE SCALE", runtime_param: true },
  LINE_DIST: { name: "LINE DISTANCE", runtime_param: true },
  ENTITY_CRAMMING_COUNT: { name: "CRAMMING COUNT", runtime_param: true },
  SHOW_LINES: { name: "SHOW LINES", runtime_param: true },
  ENABLE_GRADIENT_LINES: { name: "SHOW GRADIENT LINES", runtime_param: true },
  STABILITY_WEIGHT: { name: "STABILITY WEIGHT", runtime_param: true },
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

const restartSim = () => {
  for (const key in TEMP) {
    PARAMS[key] = TEMP[key];
  }

  CONFIG.AFFINITY_MATRIX = createRandomAffinityMatrix(PARAMS.N_COLORS);
  CONFIG.BETA_MATRIX = createRandomBetaMatrix(PARAMS.N_COLORS);
  CONFIG.STABILITY_MATRIX = generateStabilityMatrix(PARAMS.N_COLORS, 10, 20);
  CONFIG.COLORS = generateColors(PARAMS.N_COLORS);

  updateConfiguration();

  startSimulation();
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
      if (keyNameMapping[key].runtime_param) {
        input.addEventListener("change", (e) => {
          PARAMS[key] = e.target.checked;
        });
      }
    } else {
      input.value = PARAMS[key];
      input.addEventListener("change", (e) => {
        if (keyNameMapping[key].runtime_param) {
          PARAMS[key] = e.target.value;
        } else {
          TEMP[key] = e.target.value;
        }
      });
    }

    h2.innerText =
      keyNameMapping[key].name +
      (!keyNameMapping[key].runtime_param ? " (requires restart)" : "");
    append(valueDiv, [h2, input]);
    append(values, [valueDiv]);
    inputTypeMapper(PARAMS[key]);
  }
};

const displayAllTables = () => {
  updateParams();
  updateConfiguration();
};

const updateConfiguration = () => {
  presets.innerHTML = "";
  createTable(CONFIG.AFFINITY_MATRIX, "AFFINITY MATRIX", CONFIG.COLORS, -1, 1);
  createTable(CONFIG.BETA_MATRIX, "BETA MATRIX", CONFIG.COLORS, 0, 1);
  create1D(CONFIG.STABILITY_MATRIX, "STABILITY VALUES", CONFIG.COLORS, 5, 50);
};

const updateParams = () => {
  values.innerHTML = "";
  createParamUI();
};

displayAllTables();
