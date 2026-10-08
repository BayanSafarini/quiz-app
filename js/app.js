const questions = [
  {
    question: "What is the largest planet in our Solar System?",
    choices: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: 2,
  },
  {
    question: "Which country is famous for the pyramids of Giza?",
    choices: ["Greece", "Egypt", "Mexico", "Italy"],
    answer: 1,
  },
  {
    question: "What is the capital city of Japan?",
    choices: ["Seoul", "Beijing", "Tokyo", "Bangkok"],
    answer: 2,
  },
  {
    question: "How many continents are there on Earth?",
    choices: ["5", "6", "7", "8"],
    answer: 2,
  },
  {
    question: "Which ocean is the largest in the world?",
    choices: [
      "Atlantic Ocean",
      "Indian Ocean",
      "Arctic Ocean",
      "Pacific Ocean",
    ],
    answer: 3,
  },
];

const quiz = document.querySelector(".quiz");
const questionNumber = document.querySelector(".quiz__question-number");
const question = document.querySelector(".quiz__question");
const choices = document.querySelectorAll(".quiz__choice");
const nextButton = document.querySelector(".quiz__next");
const currentResult = document.querySelector(".quiz__score");
const quizResult = document.querySelector(".quiz-result");
const quizResultTitle = document.querySelector(".quiz-result__title");
const quizResultScore = document.querySelector(".quiz-result__score");
const quizRestartButton = document.querySelector(".quiz-result__restart");

let currentQuestionIndex = 0;
let score = 0;
let isAnswered = false;

function app() {
  loadCard();
  setupNextButton();
  setupRestartButton();
  checkAnswer();
}

function setupNextButton() {
  nextButton.innerText = "Next";
  nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      loadCard();
      if (currentQuestionIndex === questions.length - 1) {
        nextButton.innerText = "Finish";
      }
    } else {
      loadQuizResult();
    }
  });
}
function loadCard() {
  isAnswered = false;
  updateScore();
  resetChoices();
  loadQuestionNumber();
  loadQuestion();
  loadChoices();
}
function loadQuestionNumber() {
  questionNumber.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
}

function loadQuestion() {
  question.textContent = questions[currentQuestionIndex].question;
}

function loadChoices() {
  choices.forEach((choice, index) => {
    choice.textContent = questions[currentQuestionIndex].choices[index];
  });
}

function checkAnswer() {
  choices.forEach((choice, index) => {
    choice.addEventListener("click", () => {
      if (isAnswered) return;
      isAnswered = true;
      resetChoices();
      if (index === questions[currentQuestionIndex].answer) {
        choice.classList.add("quiz__choice--correct");
        score++;
        updateScore();
      } else {
        choice.classList.add("quiz__choice--incorrect");
      }
    });
  });
}

function resetChoices() {
  choices.forEach((choice) => {
    choice.classList.remove("quiz__choice--correct", "quiz__choice--incorrect");
  });
}

function updateScore() {
  currentResult.textContent = `Score: ${score} / ${questions.length}`;
}

function loadQuizResult() {
  quiz.style.display = "none";
  quizRestartButton.textContent = "Restart Quiz";
  quizResultTitle.textContent = "Quiz Result";
  quizResultScore.textContent = `Score: ${score} / ${questions.length}`;
  if (score >= questions.length / 2) {
    quizResultScore.classList.add("quiz-result__score--passed");
  } else {
    quizResultScore.classList.add("quiz-result__score--failure");
  }
  quizResult.style.display = "block";
}

function setupRestartButton() {
  quizRestartButton.addEventListener("click", restartQuiz);
}
function restartQuiz() {
  quiz.style.display = "block";
  quizResult.style.display = "none";
  currentQuestionIndex = 0;
    score = 0;
    nextButton.innerText = "Next";
    quizResultScore.classList.remove("quiz-result__score--passed", "quiz-result__score--failure");
  loadCard();
}

app();
