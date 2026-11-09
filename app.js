const VALID_CODES = ["ITIP9A", "ITIP9B", "ITIP9C"];

const questions = [
  {
    question: "¿Qué elemento se usa para controlar la dirección del flujo de aire en un circuito neumático?",
    options: [
      "Compresor",
      "Válvula direccional",
      "Cilindro",
      "Manguera"
    ],
    correct: 1
  },
  {
    question: "¿Qué ocurre cuando un cilindro neumático se extiende?",
    options: [
      "Se mueve el pistón por presión del aire",
      "Se apaga el compresor",
      "Se corta la electricidad",
      "Se vacía el depósito"
    ],
    correct: 0
  },
  {
    question: "¿Cuál de estas funciones es más propia de una válvula 5/2?",
    options: [
      "Controlar la temperatura",
      "Cambiar la dirección del aire a dos posiciones",
      "Aumentar la presión del aire",
      "Generar electricidad"
    ],
    correct: 1
  },
  {
    question: "Si el circuito tiene un compresor, una válvula y un cilindro, ¿qué permite el movimiento final?",
    options: [
      "La presión del aire",
      "La luz del aula",
      "La presencia de agua",
      "La velocidad del mouse"
    ],
    correct: 0
  },
  {
    question: "¿Qué representa la señal de entrada al sistema neumático?",
    options: [
      "El botón o pulsador que activa la función",
      "La rueda del ratón",
      "El teclado numérico",
      "La pantalla del navegador"
    ],
    correct: 0
  }
];

const state = {
  student: "",
  grade: "9",
  classCode: "",
  score: 0,
  currentIndex: 0,
  answered: false,
  finished: false
};

const loginScreen = document.getElementById("loginScreen");
const gameScreen = document.getElementById("gameScreen");
const studentNameInput = document.getElementById("studentName");
const classCodeInput = document.getElementById("classCode");
const gradeSelect = document.getElementById("grade");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");
const studentLabel = document.getElementById("studentLabel");
const scoreValue = document.getElementById("scoreValue");
const questionTitle = document.getElementById("questionTitle");
const questionText = document.getElementById("questionText");
const optionList = document.getElementById("optionList");
const resultsBox = document.getElementById("resultsBox");
const resultMessage = document.getElementById("resultMessage");

function saveSession() {
  localStorage.setItem(
    "neumatica_itip_session",
    JSON.stringify({
      student: state.student,
      grade: state.grade,
      classCode: state.classCode,
      score: state.score
    })
  );
}

function restoreSession() {
  const session = localStorage.getItem("neumatica_itip_session");
  if (!session) return;

  try {
    const parsed = JSON.parse(session);
    if (parsed.student && parsed.classCode) {
      state.student = parsed.student;
      state.grade = "9";
      state.classCode = parsed.classCode;
      state.score = parsed.score || 0;
      studentLabel.textContent = `${state.student} · 9° · ${state.classCode}`;
      showScreen("game");
      scoreValue.textContent = String(state.score);
      renderQuestion();
    }
  } catch (error) {
    console.warn("No se pudo restaurar la sesión.", error);
  }
}

function showScreen(screenName) {
  loginScreen.classList.toggle("active", screenName === "login");
  gameScreen.classList.toggle("active", screenName === "game");
}

function updateScore() {
  scoreValue.textContent = String(state.score);
}

function renderQuestion() {
  if (state.currentIndex >= questions.length) {
    finishActivity();
    return;
  }

  const q = questions[state.currentIndex];
  questionTitle.textContent = `Pregunta ${state.currentIndex + 1}`;
  questionText.textContent = q.question;
  optionList.innerHTML = "";
  state.answered = false;

  q.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option";
    button.textContent = option;

    button.addEventListener("click", () => {
      if (state.answered) return;
      state.answered = true;

      const isCorrect = index === q.correct;
      if (isCorrect) {
        state.score += 10;
        updateScore();
        saveSession();
      }

      Array.from(optionList.children).forEach((item, i) => {
        item.classList.remove("selected");
        if (i === q.correct) item.classList.add("correct");
        if (i === index && i !== q.correct) item.classList.add("incorrect");
      });

      button.classList.add("selected");

      setTimeout(() => {
        if (state.currentIndex < questions.length - 1) {
          state.currentIndex += 1;
          renderQuestion();
        } else {
          finishActivity();
        }
      }, 800);
    });

    optionList.appendChild(button);
  });
}

function finishActivity() {
  state.finished = true;
  resultsBox.classList.add("visible");

  const message =
    state.score >= 30
      ? `¡Excelente, ${state.student}! Tu puntaje final fue ${state.score}. Has comprendido muy bien los conceptos de neumática.`
      : `¡Buen trabajo, ${state.student}! Tu puntaje final fue ${state.score}. Sigue explorando el simulador para reforzar los conceptos.`;

  resultMessage.textContent = message;
  saveSession();
}

function validateLogin() {
  const student = studentNameInput.value.trim();
  const classCode = classCodeInput.value.trim().toUpperCase();
  const grade = gradeSelect.value;

  if (!student) {
    alert("Escribe el nombre del estudiante.");
    return;
  }

  if (!VALID_CODES.includes(classCode)) {
    alert("Código de clase no válido. Prueba: ITIP9A, ITIP9B o ITIP9C.");
    return;
  }

  state.student = student;
  state.grade = grade;
  state.classCode = classCode;
  state.score = 0;
  state.currentIndex = 0;
  state.finished = false;
  resultsBox.classList.remove("visible");
  studentLabel.textContent = `${state.student} · ${state.grade}° · ${state.classCode}`;
  updateScore();
  saveSession();
  renderQuestion();
  showScreen("game");
}

loginBtn.addEventListener("click", validateLogin);

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("neumatica_itip_session");
  studentNameInput.value = "";
  classCodeInput.value = "";
  state.student = "";
  state.classCode = "";
  state.score = 0;
  state.currentIndex = 0;
  state.finished = false;
  resultsBox.classList.remove("visible");
  updateScore();
  showScreen("login");
});

nextBtn.addEventListener("click", () => {
  if (state.finished) {
    finishActivity();
    return;
  }

  if (state.currentIndex < questions.length - 1) {
    state.currentIndex += 1;
    renderQuestion();
  } else {
    finishActivity();
  }
});

restartBtn.addEventListener("click", () => {
  state.score = 0;
  state.currentIndex = 0;
  state.finished = false;
  resultsBox.classList.remove("visible");
  updateScore();
  saveSession();
  renderQuestion();
});

restoreSession();

if (!state.student) {
  showScreen("login");
}
