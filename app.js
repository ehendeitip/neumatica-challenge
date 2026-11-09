const VALID_CODES = ["ITIP9A", "ITIP9B", "ITIP9C"];
const SESSION_KEY = "neumatica_itip_grade9_v2";
const RESULTS_KEY = "neumatica_itip_results_v2";
const TEACHER_KEY = "DOCENTE9";

const missions = [
  {
    title: "Activa un mando y observa el actuador",
    action: "En el simulador, abre un circuito de ejemplo que tenga un mando manual y un cilindro. Acciona el mando y observa el vástago del cilindro.",
    question: "Al accionar el mando del circuito, ¿qué observaste en el cilindro?",
    options: ["El vástago se desplazó", "El cilindro produjo electricidad", "El aire se convirtió en líquido", "El circuito dejó de tener conexiones"],
    correct: 0,
    feedback: "El mando cambia el estado del circuito y el aire comprimido puede mover el actuador."
  },
  {
    title: "Encuentra quién dirige el aire",
    action: "En el esquema del simulador, sigue las conexiones entre la alimentación y el cilindro. Acciona el mando y observa qué componente cambia la ruta del aire.",
    question: "¿Qué componente dirige el aire hacia las distintas conexiones del circuito?",
    options: ["La válvula distribuidora o direccional", "El silenciador", "El manómetro", "El soporte del dibujo"],
    correct: 0,
    feedback: "La válvula distribuidora cambia las conexiones por las que circula el aire."
  },
  {
    title: "Sigue el recorrido del aire",
    action: "Observa las líneas del circuito en Picuino. Empieza en la fuente de aire y sigue el recorrido hasta el elemento que se mueve.",
    question: "¿Cuál es el recorrido funcional básico que observaste?",
    options: ["Alimentación de aire → válvula → cilindro", "Cilindro → manómetro → alimentación", "Mando → pantalla → cilindro", "Silenciador → estudiante → válvula"],
    correct: 0,
    feedback: "La alimentación aporta aire, la válvula lo dirige y el cilindro transforma esa energía en movimiento."
  },
  {
    title: "Compara las posiciones del cilindro",
    action: "Acciona y libera el mando del circuito de ejemplo. Observa si el cilindro avanza, retrocede o permanece en su posición. Fíjate en las conexiones de la válvula.",
    question: "¿Qué debes observar para explicar el avance o el retorno del cilindro?",
    options: ["Qué conexiones de la válvula reciben aire y cuáles descargan", "El color del fondo de la página", "El tamaño de la ventana del navegador", "La posición del cursor"],
    correct: 0,
    feedback: "El movimiento depende de cómo la válvula conecta la presión y el escape con el actuador."
  },
  {
    title: "Diagnostica un cilindro que no se mueve",
    action: "Vuelve a accionar el circuito. Revisa visualmente la fuente de aire, las conexiones y la posición del mando o de la válvula antes de decidir qué podría estar fallando.",
    question: "Si el cilindro no se mueve al accionar el mando, ¿qué conviene comprobar primero en el esquema?",
    options: ["La alimentación de aire, las conexiones y el estado de la válvula", "Cambiar el color de la página", "Cerrar la pestaña del simulador", "Aumentar el volumen del computador"],
    correct: 0,
    feedback: "Un diagnóstico inicial revisa que haya alimentación y que el aire pueda pasar por las conexiones y la válvula."
  }
];

const state = {
  student: "",
  grade: "9",
  classCode: "",
  score: 0,
  currentIndex: 0,
  confirmed: false,
  answered: false,
  finished: false
};

const loginScreen = document.getElementById("loginScreen");
const teacherScreen = document.getElementById("teacherScreen");
const gameScreen = document.getElementById("gameScreen");
const studentNameInput = document.getElementById("studentName");
const classCodeInput = document.getElementById("classCode");
const gradeSelect = document.getElementById("grade");
const loginBtn = document.getElementById("loginBtn");
const teacherBtn = document.getElementById("teacherBtn");
const backToLoginBtn = document.getElementById("backToLoginBtn");
const openTeacherResultsBtn = document.getElementById("openTeacherResultsBtn");
const teacherCodeInput = document.getElementById("teacherCode");
const teacherResultsPanel = document.getElementById("teacherResultsPanel");
const totalStudents = document.getElementById("totalStudents");
const averageScore = document.getElementById("averageScore");
const maxScore = document.getElementById("maxScore");
const resultsTableBody = document.getElementById("resultsTableBody");
const exportCsvBtn = document.getElementById("exportCsvBtn");
const clearResultsBtn = document.getElementById("clearResultsBtn");
const logoutBtn = document.getElementById("logoutBtn");
const doneBtn = document.getElementById("doneBtn");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");
const studentLabel = document.getElementById("studentLabel");
const scoreValue = document.getElementById("scoreValue");
const progressLabel = document.getElementById("progressLabel");
const missionNumber = document.getElementById("missionNumber");
const missionTitle = document.getElementById("missionTitle");
const missionAction = document.getElementById("missionAction");
const questionText = document.getElementById("questionText");
const optionList = document.getElementById("optionList");
const answerFeedback = document.getElementById("answerFeedback");
const resultsBox = document.getElementById("resultsBox");
const resultMessage = document.getElementById("resultMessage");

function getResults() {
  try {
    return JSON.parse(localStorage.getItem(RESULTS_KEY) || "[]");
  } catch (error) {
    return [];
  }
}

function saveResults(results) {
  localStorage.setItem(RESULTS_KEY, JSON.stringify(results));
}

function showScreen(name) {
  loginScreen.classList.toggle("active", name === "login");
  teacherScreen.classList.toggle("active", name === "teacher");
  gameScreen.classList.toggle("active", name === "game");
}

function saveSession() {
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify({
      student: state.student,
      grade: state.grade,
      classCode: state.classCode,
      score: state.score,
      currentIndex: state.currentIndex,
      finished: state.finished
    }));
  } catch (error) {
    console.warn("No se pudo guardar la sesión en este navegador.", error);
  }
}

function restoreSession() {
  try {
    const saved = JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
    if (!saved || !saved.student || !VALID_CODES.includes(saved.classCode)) return;

    state.student = saved.student;
    state.grade = "9";
    state.classCode = saved.classCode;
    state.score = Number(saved.score) || 0;
    state.currentIndex = Math.min(Number(saved.currentIndex) || 0, missions.length - 1);
    state.finished = Boolean(saved.finished);
    studentLabel.textContent = `${state.student} · 9° · ${state.classCode}`;
    scoreValue.textContent = String(state.score);
    showScreen("game");
    if (state.finished) showResults();
    else renderMission();
  } catch (error) {
    console.warn("No se pudo restaurar la sesión.", error);
  }
}

function renderMission() {
  const mission = missions[state.currentIndex];
  state.confirmed = false;
  state.answered = false;
  progressLabel.textContent = `Reto ${state.currentIndex + 1} de ${missions.length}`;
  missionNumber.textContent = `RETO ${state.currentIndex + 1}`;
  missionTitle.textContent = mission.title;
  missionAction.textContent = mission.action;
  questionText.textContent = mission.question;
  questionText.classList.add("hidden");
  optionList.innerHTML = "";
  optionList.classList.add("hidden");
  answerFeedback.textContent = "";
  answerFeedback.className = "answer-feedback";
  doneBtn.classList.remove("hidden");
  doneBtn.disabled = false;
  nextBtn.classList.add("hidden");
  resultsBox.classList.add("hidden");

  mission.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option";
    button.textContent = option;
    button.disabled = true;
    button.addEventListener("click", () => answerMission(index, mission));
    optionList.appendChild(button);
  });
}

function confirmExperiment() {
  if (state.confirmed || state.answered) return;
  state.confirmed = true;
  doneBtn.classList.add("hidden");
  questionText.classList.remove("hidden");
  optionList.classList.remove("hidden");
  Array.from(optionList.children).forEach(button => { button.disabled = false; });
}

function answerMission(selectedIndex, mission) {
  if (state.answered) return;
  state.answered = true;
  const correct = selectedIndex === mission.correct;
  if (correct) state.score += 10;
  scoreValue.textContent = String(state.score);

  Array.from(optionList.children).forEach((button, index) => {
    button.disabled = true;
    if (index === mission.correct) button.classList.add("correct");
    else if (index === selectedIndex) button.classList.add("incorrect");
  });

  answerFeedback.textContent = correct
    ? `¡Correcto! ${mission.feedback}`
    : `Observa de nuevo el circuito: ${mission.feedback}`;
  answerFeedback.classList.add(correct ? "success-feedback" : "retry-feedback");
  nextBtn.textContent = state.currentIndex === missions.length - 1 ? "Ver resultado" : "Siguiente reto";
  nextBtn.classList.remove("hidden");
  saveSession();
}

function showResults() {
  state.finished = true;
  resultsBox.classList.remove("hidden");
  resultMessage.textContent = `¡Actividad terminada, ${state.student}! Lograste ${state.score} de ${missions.length * 10} puntos. Revisa las explicaciones de cada reto y sigue experimentando en el simulador.`;

  const results = getResults();
  const entry = {
    student: state.student,
    classCode: state.classCode,
    score: state.score,
    total: missions.length * 10,
    date: new Date().toISOString()
  };

  const filtered = results.filter(item => !(item.student === entry.student && item.classCode === entry.classCode && item.date && item.score === entry.score && item.date.slice(0,10) === entry.date.slice(0,10)));
  filtered.push(entry);
  saveResults(filtered);
  saveSession();
}

function validateLogin() {
  const student = studentNameInput.value.trim();
  const classCode = classCodeInput.value.trim().toUpperCase();
  if (!student) {
    alert("Escribe el nombre del estudiante.");
    return;
  }
  if (!VALID_CODES.includes(classCode)) {
    alert("Código de clase no válido. Usa ITIP9A, ITIP9B o ITIP9C.");
    return;
  }

  state.student = student;
  state.grade = gradeSelect.value;
  state.classCode = classCode;
  state.score = 0;
  state.currentIndex = 0;
  state.finished = false;
  studentLabel.textContent = `${state.student} · 9° · ${state.classCode}`;
  scoreValue.textContent = "0";
  saveSession();
  showScreen("game");
  renderMission();
}

function renderTeacherResults() {
  const results = getResults().sort((a, b) => new Date(b.date) - new Date(a.date));
  const total = results.length;
  const average = total ? Math.round(results.reduce((acc, item) => acc + Number(item.score || 0), 0) / total) : 0;
  const max = total ? Math.max(...results.map(item => Number(item.score || 0))) : 0;

  totalStudents.textContent = String(total);
  averageScore.textContent = `${average}`;
  maxScore.textContent = `${max}`;

  resultsTableBody.innerHTML = results.length
    ? results.map(item => `
      <tr>
        <td>${item.student}</td>
        <td>${item.classCode}</td>
        <td>${item.score}/${item.total}</td>
        <td>${new Date(item.date).toLocaleString("es-CO", { dateStyle: "short", timeStyle: "short" })}</td>
      </tr>
    `).join("")
    : `<tr><td colspan="4">Aún no hay resultados</td></tr>`;
}

function openTeacherPanel() {
  const code = teacherCodeInput.value.trim();
  if (code !== TEACHER_KEY) {
    alert("Clave incorrecta.");
    return;
  }
  teacherResultsPanel.classList.remove("hidden");
  renderTeacherResults();
}

function exportCsv() {
  const results = getResults();
  if (!results.length) {
    alert("No hay resultados para exportar.");
    return;
  }

  const header = ["estudiante", "codigo", "puntaje", "total", "fecha"];
  const rows = results.map(item => [
    item.student,
    item.classCode,
    item.score,
    item.total,
    new Date(item.date).toISOString()
  ]);

  const csv = [header, ...rows]
    .map(row => row.map(value => `"${String(value).replace(/"/g, '""')}"`).join(","))
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "resultados_neumatica.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function clearResults() {
  if (!confirm("¿Seguro que quieres borrar todos los resultados?")) return;
  saveResults([]);
  renderTeacherResults();
}

loginBtn.addEventListener("click", validateLogin);
teacherBtn.addEventListener("click", () => {
  showScreen("teacher");
  teacherCodeInput.value = "";
  teacherResultsPanel.classList.add("hidden");
});
backToLoginBtn.addEventListener("click", () => {
  showScreen("login");
});
openTeacherResultsBtn.addEventListener("click", openTeacherPanel);
exportCsvBtn.addEventListener("click", exportCsv);
clearResultsBtn.addEventListener("click", clearResults);
doneBtn.addEventListener("click", confirmExperiment);

nextBtn.addEventListener("click", () => {
  if (!state.answered) return;
  if (state.currentIndex === missions.length - 1) {
    showResults();
    return;
  }
  state.currentIndex += 1;
  saveSession();
  renderMission();
});

restartBtn.addEventListener("click", () => {
  state.score = 0;
  state.currentIndex = 0;
  state.finished = false;
  resultsBox.classList.add("hidden");
  scoreValue.textContent = "0";
  saveSession();
  renderMission();
});

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem(SESSION_KEY);
  studentNameInput.value = "";
  classCodeInput.value = "";
  state.student = "";
  state.classCode = "";
  state.score = 0;
  state.currentIndex = 0;
  state.finished = false;
  showScreen("login");
});

restoreSession();
if (!state.student) {
  showScreen("login");
}
