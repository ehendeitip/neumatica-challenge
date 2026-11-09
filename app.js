const VALID_CODES = ["ITIP9A", "ITIP9B", "ITIP9C"];
const SESSION_KEY = "neumatica_itip_grade9_v5";
const RESULTS_KEY = "neumatica_itip_results_v2";
const TEACHER_KEY = "DOCENTE9";

const missions = [
  { type: "choice", title: "Activa un mando y observa el actuador", action: "En Picuino, abre un circuito de ejemplo con un mando manual y un cilindro. Acciona el mando y observa el vástago.", question: "Al accionar el mando, ¿qué observaste?", options: ["El vástago se desplazó", "El cilindro produjo electricidad", "El aire se convirtió en líquido", "El circuito perdió sus conexiones"], correct: 0, feedback: "El mando cambia el estado de la válvula y el aire puede mover el actuador." },
  { type: "choice", title: "Encuentra quién dirige el aire", action: "Sigue las conexiones entre la alimentación y el cilindro. Acciona el mando e identifica qué componente cambia la ruta del aire.", question: "¿Qué componente dirige el aire por las distintas conexiones?", options: ["La válvula distribuidora", "El silenciador", "El manómetro", "El soporte del dibujo"], correct: 0, feedback: "La válvula distribuidora cambia las conexiones por las que circula el aire." },
  { type: "choice", title: "Sigue el recorrido del aire", action: "Observa las líneas del circuito. Empieza en la fuente de aire y sigue el recorrido hasta el elemento que se mueve.", question: "¿Cuál es el recorrido funcional básico?", options: ["Alimentación → válvula → cilindro", "Cilindro → manómetro → alimentación", "Mando → pantalla → cilindro", "Silenciador → estudiante → válvula"], correct: 0, feedback: "La alimentación aporta aire, la válvula lo dirige y el cilindro transforma energía en movimiento." },
  { type: "choice", title: "Compara las posiciones del cilindro", action: "Acciona y libera el mando. Observa si el cilindro avanza, retrocede o queda quieto; fíjate en las conexiones de la válvula.", question: "¿Qué permite explicar el avance y el retorno?", options: ["Qué conexiones reciben aire y cuáles descargan", "El color del fondo", "El tamaño de la ventana", "La posición del cursor"], correct: 0, feedback: "El movimiento depende de cómo la válvula conecta presión y escape con el actuador." },
  { type: "choice", title: "Diagnostica un cilindro inmóvil", action: "Acciona el circuito y revisa la fuente de aire, las conexiones y la posición del mando o la válvula.", question: "¿Qué conviene comprobar primero si el cilindro no se mueve?", options: ["Alimentación, conexiones y estado de la válvula", "Cambiar el color de la página", "Cerrar el navegador", "Subir el volumen"], correct: 0, feedback: "Un diagnóstico inicial revisa alimentación y continuidad del recorrido del aire." },
  { type: "choice", title: "Lee las señales de una secuencia neumática", points: 15, action: "Estudia la gráfica de señales del sistema secuencial. A representa el cilindro A y B el cilindro B; nivel 1 significa extendido y nivel 0 retraído. Lee los cambios de izquierda a derecha y deduce el orden del ciclo.", image: "images/secuencia-senales.svg", caption: "Diagrama didáctico de posición de dos cilindros a lo largo del tiempo.", question: "¿Qué secuencia de movimientos representa la gráfica?", options: ["A+ → B+ → B− → A−", "B+ → A+ → A− → B−", "A+ y B+ simultáneamente → A− → B−", "A− → B− → A+ → B+"], correct: 0, feedback: "A+ ocurre primero; después B+; luego B− y finalmente A−. El signo + indica avance y el signo − indica retorno." },
  { type: "build", title: "Control con realimentación visual", points: 15, action: "El simulador no tiene finales de carrera para detectar automáticamente la posición. Construye el circuito básico disponible (alimentación, válvula de mando y cilindro). Define como objetivo que el vástago quede extendido; acciona la válvula, observa visualmente la posición real y vuelve a actuar si aún no llegó al objetivo. Repite: observar → comparar con el objetivo → corregir.", checklist: ["Monté la alimentación, la válvula de mando y el cilindro en Picuino", "Definí una posición objetivo concreta para el vástago", "Observé visualmente la posición real después de accionar la válvula", "Usé esa observación como realimentación y corregí la orden hasta alcanzar el objetivo"] },
  { type: "build", title: "Compara lazo abierto y realimentación con operador", points: 15, action: "Usa el mismo circuito. Primero acciona la válvula sin corregir la orden según la posición observada: ejemplo de lazo abierto. Luego repite mirando el vástago y modifica la orden según la diferencia con el objetivo: realimentación visual del operador. No necesitas finales de carrera.", checklist: ["Realicé una prueba en lazo abierto sin corregir la orden", "Realicé otra prueba observando la posición real del cilindro", "Comparé la posición real con el objetivo y corregí la orden", "Expliqué que la vista del operador actúa como sensor en esta práctica"] },
  { type: "replica", title: "Replica el circuito del diagrama", points: 15, action: "Usa la imagen de referencia como modelo. En Picuino, busca los componentes equivalentes, móntalos y conecta alimentación, mando y actuador. Ejecuta el circuito y compara tu montaje con el diagrama.", image: "images/circuito-referencia.svg", caption: "Referencia didáctica: mando manual, válvula distribuidora y cilindro. Usa los componentes equivalentes disponibles en Picuino.", checklist: ["Coloqué los mismos elementos funcionales del diagrama", "Conecté la alimentación y las vías de trabajo de la válvula", "Conecté el actuador y probé el movimiento", "Revisé que el montaje corresponda con la referencia"] },
  { type: "build", title: "Implementa un circuito secuencial A+ → B+ → B− → A−", points: 20, action: "Monta en Picuino un circuito secuencial con dos cilindros de doble efecto, A y B, y sus válvulas distribuidoras. La secuencia que debes conseguir es: primero avanza A (A+), luego avanza B (B+), después retorna B (B−) y al final retorna A (A−). Como el simulador de esta actividad no cuenta con finales de carrera, realiza la secuencia accionando manualmente las válvulas, una etapa a la vez. Compara el orden de los movimientos con la gráfica del reto anterior; no se pide automatización con sensores.", checklist: ["Añadí dos cilindros de doble efecto identificados como A y B, con sus válvulas de mando", "Conecté la alimentación neumática a las válvulas y estas a sus cilindros", "Ejecuté manualmente A+ y después B+, observando ese orden", "Ejecuté manualmente B− y después A−, completando A+ → B+ → B− → A−", "Expliqué que la secuencia es manual y que para automatizarla harían falta finales de carrera/sensores que este simulador no ofrece"] }
];

const state = { student: "", grade: "9", classCode: "", score: 0, currentIndex: 0, confirmed: false, answered: false, finished: false, resultRecorded: false };
const $ = id => document.getElementById(id);
const loginScreen = $("loginScreen"), teacherScreen = $("teacherScreen"), gameScreen = $("gameScreen");
const studentNameInput = $("studentName"), classCodeInput = $("classCode"), gradeSelect = $("grade");
const loginBtn = $("loginBtn"), teacherBtn = $("teacherBtn"), backToLoginBtn = $("backToLoginBtn");
const teacherCodeInput = $("teacherCode"), teacherResultsPanel = $("teacherResultsPanel"), openTeacherResultsBtn = $("openTeacherResultsBtn");
const totalStudents = $("totalStudents"), averageScore = $("averageScore"), maxScoreElement = $("maxScore"), resultsTableBody = $("resultsTableBody");
const exportCsvBtn = $("exportCsvBtn"), clearResultsBtn = $("clearResultsBtn"), logoutBtn = $("logoutBtn");
const doneBtn = $("doneBtn"), nextBtn = $("nextBtn"), restartBtn = $("restartBtn"), studentLabel = $("studentLabel");
const scoreValue = $("scoreValue"), progressLabel = $("progressLabel"), missionNumber = $("missionNumber"), missionTitle = $("missionTitle"), missionAction = $("missionAction");
const missionVisual = $("missionVisual"), missionImage = $("missionImage"), imageCaption = $("imageCaption"), taskChecklist = $("taskChecklist");
const questionText = $("questionText"), optionList = $("optionList"), answerFeedback = $("answerFeedback"), resultsBox = $("resultsBox"), resultMessage = $("resultMessage");

function getResults() { try { const data = JSON.parse(localStorage.getItem(RESULTS_KEY) || "[]"); return Array.isArray(data) ? data : []; } catch { return []; } }
function saveResults(results) { try { localStorage.setItem(RESULTS_KEY, JSON.stringify(results)); } catch (error) { console.warn("No se pudieron guardar los resultados.", error); } }
function showScreen(name) { loginScreen.classList.toggle("active", name === "login"); teacherScreen.classList.toggle("active", name === "teacher"); gameScreen.classList.toggle("active", name === "game"); }
function saveSession() { try { localStorage.setItem(SESSION_KEY, JSON.stringify({ student: state.student, grade: state.grade, classCode: state.classCode, score: state.score, currentIndex: state.currentIndex, finished: state.finished, resultRecorded: state.resultRecorded })); } catch (error) { console.warn("No se pudo guardar la sesión.", error); } }
function maxPossibleScore() { return missions.reduce((sum, mission) => sum + (mission.points || 10), 0); }

function restoreSession() {
  try {
    const saved = JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
    if (!saved || !saved.student || !VALID_CODES.includes(saved.classCode)) return;
    state.student = saved.student; state.grade = "9"; state.classCode = saved.classCode; state.score = Number(saved.score) || 0;
    state.currentIndex = Math.min(Math.max(Number(saved.currentIndex) || 0, 0), missions.length - 1); state.finished = Boolean(saved.finished); state.resultRecorded = Boolean(saved.resultRecorded);
    studentLabel.textContent = `${state.student} · 9° · ${state.classCode}`; scoreValue.textContent = String(state.score); showScreen("game");
    if (state.finished) showResults(); else renderMission();
  } catch (error) { console.warn("No se pudo restaurar la sesión.", error); }
}

function renderMission() {
  const mission = missions[state.currentIndex];
  state.confirmed = false; state.answered = false;
  progressLabel.textContent = `Reto ${state.currentIndex + 1} de ${missions.length}`; missionNumber.textContent = `RETO ${state.currentIndex + 1}`;
  missionTitle.textContent = mission.title; missionAction.textContent = mission.action; answerFeedback.textContent = ""; answerFeedback.className = "answer-feedback";
  questionText.classList.add("hidden"); optionList.classList.add("hidden"); optionList.replaceChildren(); taskChecklist.classList.add("hidden"); taskChecklist.replaceChildren();
  missionVisual.classList.add("hidden"); missionImage.removeAttribute("src"); imageCaption.textContent = ""; nextBtn.classList.add("hidden"); resultsBox.classList.add("hidden");
  if (mission.image) { missionImage.src = mission.image; missionImage.alt = mission.title; imageCaption.textContent = mission.caption || ""; missionVisual.classList.remove("hidden"); }
  if (mission.checklist) {
    taskChecklist.classList.remove("hidden");
    mission.checklist.forEach((text, index) => {
      const label = document.createElement("label"); label.className = "check-item";
      const input = document.createElement("input"); input.type = "checkbox"; input.value = String(index);
      const span = document.createElement("span"); span.textContent = text; label.append(input, span); taskChecklist.append(label);
    });
    doneBtn.textContent = "Verificar mi montaje";
  } else {
    doneBtn.textContent = "Ya realicé la prueba";
    mission.options.forEach((text, index) => { const button = document.createElement("button"); button.type = "button"; button.className = "option"; button.textContent = text; button.disabled = true; button.addEventListener("click", () => answerChoice(index, mission)); optionList.append(button); });
  }
  doneBtn.classList.remove("hidden"); doneBtn.disabled = false;
}

function confirmExperiment() {
  if (state.confirmed || state.answered) return;
  state.confirmed = true;
  const mission = missions[state.currentIndex];
  if (mission.checklist) {
    const checked = taskChecklist.querySelectorAll("input:checked").length;
    const earned = Math.round((checked / mission.checklist.length) * mission.points);
    state.score += earned; state.answered = true; scoreValue.textContent = String(state.score);
    taskChecklist.querySelectorAll("input").forEach(input => { input.disabled = true; }); doneBtn.classList.add("hidden");
    answerFeedback.textContent = checked === mission.checklist.length ? `¡Reto completo! Obtienes ${earned}/${mission.points} puntos.` : `Registraste ${checked} de ${mission.checklist.length} criterios y obtienes ${earned}/${mission.points} puntos. Revisa los criterios pendientes en Picuino.`;
    answerFeedback.classList.add(checked === mission.checklist.length ? "success-feedback" : "retry-feedback"); finishAnswer(); return;
  }
  doneBtn.classList.add("hidden"); questionText.textContent = mission.question; questionText.classList.remove("hidden"); optionList.classList.remove("hidden"); optionList.querySelectorAll("button").forEach(button => { button.disabled = false; });
}

function answerChoice(selectedIndex, mission) {
  if (state.answered) return;
  state.answered = true; const correct = selectedIndex === mission.correct; if (correct) state.score += mission.points || 10; scoreValue.textContent = String(state.score);
  optionList.querySelectorAll("button").forEach((button, index) => { button.disabled = true; if (index === mission.correct) button.classList.add("correct"); else if (index === selectedIndex) button.classList.add("incorrect"); });
  answerFeedback.textContent = correct ? `¡Correcto! ${mission.feedback}` : `Revisa la observación: ${mission.feedback}`; answerFeedback.classList.add(correct ? "success-feedback" : "retry-feedback"); finishAnswer();
}
function finishAnswer() { nextBtn.textContent = state.currentIndex === missions.length - 1 ? "Ver resultado" : "Siguiente reto"; nextBtn.classList.remove("hidden"); saveSession(); }
function showResults() {
  state.finished = true; resultsBox.classList.remove("hidden");
  resultMessage.textContent = `¡Actividad terminada, ${state.student}! Lograste ${state.score} de ${maxPossibleScore()} puntos. El último circuito secuencial se ejecuta manualmente, pues esta práctica no dispone de finales de carrera para automatizarlo.`;
  if (!state.resultRecorded) { const results = getResults(); results.push({ student: state.student, classCode: state.classCode, score: state.score, total: maxPossibleScore(), date: new Date().toISOString() }); saveResults(results); state.resultRecorded = true; }
  saveSession();
}
function validateLogin() {
  const student = studentNameInput.value.trim(), classCode = classCodeInput.value.trim().toUpperCase();
  if (!student) { alert("Escribe el nombre del estudiante."); return; }
  if (!VALID_CODES.includes(classCode)) { alert("Código de clase no válido. Usa ITIP9A, ITIP9B o ITIP9C."); return; }
  state.student = student; state.grade = gradeSelect.value; state.classCode = classCode; state.score = 0; state.currentIndex = 0; state.finished = false; state.resultRecorded = false;
  studentLabel.textContent = `${state.student} · 9° · ${state.classCode}`; scoreValue.textContent = "0"; saveSession(); showScreen("game"); renderMission();
}
function escapeHtml(value) { return String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[char])); }
function renderTeacherResults() {
  const results = getResults().sort((a, b) => new Date(b.date) - new Date(a.date)), count = results.length;
  const average = count ? Math.round(results.reduce((sum, item) => sum + Number(item.score || 0), 0) / count) : 0;
  totalStudents.textContent = String(count); averageScore.textContent = String(average); maxScoreElement.textContent = String(count ? Math.max(...results.map(item => Number(item.score || 0))) : 0);
  resultsTableBody.innerHTML = results.length ? results.map(item => `<tr><td>${escapeHtml(item.student)}</td><td>${escapeHtml(item.classCode)}</td><td>${Number(item.score)}/${Number(item.total)}</td><td>${new Date(item.date).toLocaleString("es-CO", { dateStyle: "short", timeStyle: "short" })}</td></tr>`).join("") : "<tr><td colspan=\"4\">Aún no hay resultados</td></tr>";
}
function openTeacherPanel() { if (teacherCodeInput.value.trim() !== TEACHER_KEY) { alert("Clave incorrecta."); return; } teacherResultsPanel.classList.remove("hidden"); renderTeacherResults(); }
function exportCsv() {
  const results = getResults(); if (!results.length) { alert("No hay resultados para exportar."); return; }
  const rows = [["estudiante", "codigo", "puntaje", "total", "fecha"], ...results.map(item => [item.student, item.classCode, item.score, item.total, item.date])];
  const csv = rows.map(row => row.map(value => `"${String(value).replace(/"/g, '""')}"`).join(",")).join("\n");
  const url = URL.createObjectURL(new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8;" })); const link = document.createElement("a"); link.href = url; link.download = "resultados_neumatica.csv"; link.click(); URL.revokeObjectURL(url);
}

loginBtn.addEventListener("click", validateLogin);
teacherBtn.addEventListener("click", () => { showScreen("teacher"); teacherCodeInput.value = ""; teacherResultsPanel.classList.add("hidden"); });
backToLoginBtn.addEventListener("click", () => showScreen("login")); openTeacherResultsBtn.addEventListener("click", openTeacherPanel); exportCsvBtn.addEventListener("click", exportCsv);
clearResultsBtn.addEventListener("click", () => { if (confirm("¿Seguro que quieres borrar todos los resultados de este navegador?")) { saveResults([]); renderTeacherResults(); } });
doneBtn.addEventListener("click", confirmExperiment);
nextBtn.addEventListener("click", () => { if (!state.answered) return; if (state.currentIndex === missions.length - 1) { showResults(); return; } state.currentIndex++; saveSession(); renderMission(); });
restartBtn.addEventListener("click", () => { state.score = 0; state.currentIndex = 0; state.finished = false; state.resultRecorded = false; scoreValue.textContent = "0"; saveSession(); renderMission(); });
logoutBtn.addEventListener("click", () => { localStorage.removeItem(SESSION_KEY); studentNameInput.value = ""; classCodeInput.value = ""; state.student = ""; state.classCode = ""; state.score = 0; state.currentIndex = 0; state.finished = false; state.resultRecorded = false; showScreen("login"); });
restoreSession();
if (!state.student) showScreen("login");
