/* ==================== 1. Questions Data ==================== */

// Store the quiz questions, answer choices, and correct answer indexes.
// Indexes start at 0, so answer: 2 means the third choice is correct.

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
  {
    question: "What is the chemical symbol for gold?",
    choices: ["Ag", "Au", "Fe", "Go"],
    answer: 1,
  },
  {
    question: "Which planet is known as the Red Planet?",
    choices: ["Venus", "Mercury", "Mars", "Neptune"],
    answer: 2,
  },
  {
    question: "What is the largest mammal in the world?",
    choices: ["African Elephant", "Blue Whale", "Giraffe", "Orca"],
    answer: 1,
  },
  {
    question: "Which language is primarily spoken in Brazil?",
    choices: ["Spanish", "French", "Portuguese", "Italian"],
    answer: 2,
  },
  {
    question: "What is the hardest naturally occurring substance?",
    choices: ["Quartz", "Iron", "Diamond", "Granite"],
    answer: 2,
  },
  {
    question: "How many sides does a hexagon have?",
    choices: ["Five", "Six", "Seven", "Eight"],
    answer: 1,
  },
  {
    question: "Which organ pumps blood throughout the human body?",
    choices: ["Lungs", "Liver", "Brain", "Heart"],
    answer: 3,
  },
  {
    question: "What is the closest star to Earth?",
    choices: ["Sirius", "The Sun", "Proxima Centauri", "Polaris"],
    answer: 1,
  },
  {
    question: "Which is the largest hot desert in the world?",
    choices: [
      "Gobi Desert",
      "Arabian Desert",
      "Sahara Desert",
      "Kalahari Desert",
    ],
    answer: 2,
  },
  {
    question:
      "What is the main gas that plants absorb from the atmosphere during photosynthesis?",
    choices: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"],
    answer: 2,
  },
  {
    question:
      "Which ancient city is famous for its rock-cut architecture in Jordan?",
    choices: ["Palmyra", "Petra", "Babylon", "Jericho"],
    answer: 1,
  },
  {
    question: "What is the capital city of Palestine?",
    choices: ["Ramallah", "Gaza", "Jerusalem", "Nablus"],
    answer: 2,
  },
  {
    question: "Which instrument is used to measure temperature?",
    choices: ["Barometer", "Thermometer", "Hygrometer", "Speedometer"],
    answer: 1,
  },
  {
    question: "What is the smallest prime number?",
    choices: ["0", "1", "2", "3"],
    answer: 2,
  },
  {
    question:
      "Which part of a computer performs most arithmetic and logical operations?",
    choices: ["RAM", "CPU", "SSD", "GPU"],
    answer: 1,
  },
];

/* ==================== 2. DOM Elements ==================== */

// Select the HTML elements that JavaScript will update or control.

const quizTitle = document.querySelector("#quiz-title");
const welcomePage = document.querySelector("#welcome-page");
const welcomePageTitle = document.querySelector("#welcome-page-title");
const welcomePageDescription = document.querySelector(
  "#welcome-page-description",
);
const welcomePageStartButton = document.querySelector("#welcome-page-start");
const quiz = document.querySelector("#quiz");
const questionNumber = document.querySelector("#quiz-question-number");
const question = document.querySelector("#quiz-question");
const choices = document.querySelectorAll(".quiz__choice");
const nextButton = document.querySelector("#quiz-next");
const message = document.querySelector("#quiz-message");
const prevButton = document.querySelector("#quiz-previous");
const quizResult = document.querySelector("#quiz-result");
const quizResultTitle = document.querySelector("#quiz-result-title");
const quizResultScore = document.querySelector("#quiz-result-score");
const quizResultRestartButton = document.querySelector("#quiz-result-restart");
const quizResultHomeButton = document.querySelector("#quiz-result-home");
const quizReviewButton = document.querySelector("#quiz-result-review");
const quizReview = document.querySelector("#quiz-review");
const quizReviewTitle = document.querySelector("#quiz-review-title");
const quizReviewList = document.querySelector("#quiz-review-list");
const quizReviewRestartButton = document.querySelector("#quiz-review-restart");
const quizReviewHomeButton = document.querySelector("#quiz-review-home");

/* ==================== 3. Quiz State ==================== */

// Track the current question, score, and answer status.

const STORAGE_KEY = "quizProgress";

let pickedQuestions = [];
let pickedIds = [];
let currentQuestionIndex = 0;
let isAnswered = false;
let userAnswers = [];

/* ==================== 4. Question Selection ==================== */

function selectRandomQuestions() {
  const ids = questions.map((_, i) => i);

  // Fisher–Yates shuffle
  for (let i = ids.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [ids[i], ids[j]] = [ids[j], ids[i]];
  }

  pickedIds = ids.slice(0, 5);
  pickedQuestions = pickedIds.map((i) => questions[i]);
}

/* ==================== 5. Display Functions ==================== */

// Display the current question card and reset the previous answer state.

function loadCard() {
  welcomePage.style.display = "none";
  quiz.style.display = "block";
  isAnswered = false;
  nextButton.textContent =
    currentQuestionIndex === pickedQuestions.length - 1 ? "Finish" : "Next";
  resetButtonState();
  resetChoices();
  loadQuestionNumber();
  loadQuestion();
  loadChoices();
  message.style.display = "none";
  saveProgress("quiz");
}

// Display the current question number and total number of questions.

function loadQuestionNumber() {
  questionNumber.textContent = `Question ${currentQuestionIndex + 1} of ${pickedQuestions.length}`;
}

// Display the current question's text.

function loadQuestion() {
  question.textContent = pickedQuestions[currentQuestionIndex].question;
}

// Display the answer choices for the current question.

function loadChoices() {
  choices.forEach((choice, index) => {
    choice.textContent = pickedQuestions[currentQuestionIndex].choices[index];
  });

  if (userAnswers[currentQuestionIndex] !== undefined) {
    const selectedChoiceIndex = userAnswers[currentQuestionIndex];
    choices[selectedChoiceIndex].classList.add("quiz__choice--selected");
    isAnswered = true; // Mark the question as answered since the user has already selected an answer.
  }
}

// Remove the selected styling from all answer choices.

function resetChoices() {
  choices.forEach((choice) => {
    choice.classList.remove("quiz__choice--selected");
  });
}

function resetButtonState() {
  // Disable the Previous button on the first question.
  prevButton.disabled = currentQuestionIndex === 0;
}

/* ==================== 6. Answer Handling ==================== */

// Check the user's selected answer and update the score when correct.

function checkAnswer() {
  choices.forEach((choice, index) => {
    choice.addEventListener("click", () => {
      isAnswered = true;

      // Clear any previous answer styling.
      resetChoices();

      // Highlight the selected answer.
      choice.classList.add("quiz__choice--selected");
      userAnswers[currentQuestionIndex] = index; // Store the user's answer for this question.
      saveProgress("quiz");
    });
  });
}

/* ==================== 7. Question Navigation ==================== */

// Move to the next question or finish the quiz.

function setupNextButton() {
  nextButton.textContent = "Next";

  nextButton.addEventListener("click", () => {
    // Prevent moving forward if the current question hasn't been answered.
    if (!isAnswered) {
      message.textContent = "Please select an answer before proceeding.";
      message.style.display = "block";
      return;
    } else {
      message.textContent = "";
      message.style.display = "none";
    }

    // Move forward if there are more questions.
    if (currentQuestionIndex < pickedQuestions.length - 1) {
      currentQuestionIndex++;
      loadCard();
    } else {
      // Show the final results after the last question.
      loadQuizResult();
    }
  });
}

// Move to the previous question.

function setupPrevButton() {
  prevButton.textContent = "Previous";

  prevButton.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      loadCard();
    }
  });
}

/* ==================== 8. Quiz Results ==================== */

// Calculate the user's score based on their answers.

function calculateScore() {
  return userAnswers.reduce((total, answer, index) => {
    if (answer === pickedQuestions[index].answer) {
      return total + 1;
    }

    return total;
  }, 0);
}

// Hide the quiz and display the final score.

function loadQuizResult() {
  quiz.style.display = "none";
  const score = calculateScore();
  quizResultTitle.textContent = "Quiz Result";
  quizResultScore.textContent = `Score: ${score} / ${pickedQuestions.length}`;
  quizResultRestartButton.textContent = "Restart Quiz";

  // Clear result styling from any previous attempt.
  quizResultScore.classList.remove(
    "quiz-result__score--passed",
    "quiz-result__score--failure",
  );

  // Consider a score of at least half the questions a pass.
  if (score >= pickedQuestions.length / 2) {
    quizResultScore.classList.add("quiz-result__score--passed");
  } else {
    quizResultScore.classList.add("quiz-result__score--failure");
  }

  // Make the result section visible.
  quizResult.style.display = "block";
  saveProgress("result");
}

/* ==================== 9. Quiz Review ==================== */

function setupReviewButton() {
  quizReviewButton.textContent = "Review Answers";
  quizReviewButton.addEventListener("click", loadQuizReview);
}

function setupReviewRestartButton() {
  quizReviewRestartButton.textContent = "Restart Quiz";
  quizReviewRestartButton.addEventListener("click", restartQuiz);
}

function loadQuizReview() {
  quiz.style.display = "none";
  quizResult.style.display = "none";
  quizReview.style.display = "block";
  quizReviewTitle.textContent = "Review Your Answers";
  quizReviewList.innerHTML = "";

  userAnswers.forEach((answer, index) => {
    const li = document.createElement("li");
    li.classList.add("quiz-review__item");

    if (pickedQuestions[index].answer === answer) {
      li.classList.add("quiz-review__item--correct");
    } else {
      li.classList.add("quiz-review__item--incorrect");
    }

    const q = pickedQuestions[index];
    const questionParagraph = document.createElement("p");
    questionParagraph.textContent = `Question ${index + 1}: ${q.question}`;
    li.appendChild(questionParagraph);

    const answerParagraph = document.createElement("p");
    answerParagraph.textContent = `Your answer: ${q.choices[answer]}`;
    li.appendChild(answerParagraph);

    if (pickedQuestions[index].answer !== answer) {
      const correctAnswerParagraph = document.createElement("p");
      correctAnswerParagraph.textContent = `Correct answer: ${q.choices[q.answer]}`;
      li.appendChild(correctAnswerParagraph);
    }

    quizReviewList.appendChild(li);
  });
  saveProgress("review");
}

/* ==================== 10. Restart Quiz ==================== */

// Listen for clicks on the Restart Quiz button.

function setupRestartButton() {
  quizResultRestartButton.addEventListener("click", restartQuiz);
}

// Reset the quiz so the user can play again.

function restartQuiz() {
  quizResult.style.display = "none";
  quizReview.style.display = "none";
  quiz.style.display = "block";

  // Reset the quiz state.
  currentQuestionIndex = 0;
  isAnswered = false;
  pickedQuestions = [];

  // Restore the initial button text.
  nextButton.textContent = "Next";

  // Remove result styling from the previous attempt.
  quizResultScore.classList.remove(
    "quiz-result__score--passed",
    "quiz-result__score--failure",
  );

  userAnswers = [];

  // Pick new random questions for the quiz.
  selectRandomQuestions();

  // Display the first question again.
  loadCard();
}

/* ==================== Progress Storage ==================== */

function isValidAnswer(a) {
  return Number.isInteger(a) && a >= 0 && a < choices.length;
}

function saveProgress(screen) {
  try {
    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ screen, pickedIds, currentQuestionIndex, userAnswers }),
    );
  } catch {
    // Storage may be full or blocked; the quiz still works without it.
  }
}

function clearProgress() {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {}
}

// Returns true if saved progress was found and restored.
function restoreProgress() {
  try {
    const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY));
    if (!saved) return false;

    const {
      screen: savedScreen,
      pickedIds: ids,
      currentQuestionIndex: index,
      userAnswers: answers,
    } = saved;

    const isValid =
      Array.isArray(ids) &&
      ids.length > 0 &&
      ids.every((i) => Number.isInteger(i) && questions[i]) &&
      Array.isArray(answers) &&
      answers.every(isValidAnswer) &&
      Number.isInteger(index) &&
      index >= 0 &&
      index < ids.length &&
      answers.length >= index &&
      answers.length <= ids.length;

    const isComplete =
      Array.isArray(ids) &&
      Array.isArray(answers) &&
      answers.length === ids.length &&
      answers.every(isValidAnswer);

    if (!isValid || (savedScreen !== "quiz" && !isComplete)) {
      clearProgress();
      return false;
    }

    pickedIds = ids;
    pickedQuestions = ids.map((i) => questions[i]);
    currentQuestionIndex = index;
    userAnswers = answers;

    welcomePage.style.display = "none";

    if (savedScreen === "result") loadQuizResult();
    else if (savedScreen === "review") loadQuizReview();
    else loadCard();

    return true;
  } catch {
    clearProgress();
    return false;
  }
}

/* ==================== 11. Welcome Page ==================== */

function setupStartButton() {
  welcomePageStartButton.textContent = "Start Quiz";

  welcomePageStartButton.addEventListener("click", () => {
    selectRandomQuestions();
    loadCard();
  });
}

function loadWelcomingPage() {
  welcomePageTitle.textContent = "Ready to begin?";
  welcomePageDescription.textContent =
    "Answer 5 questions and see how you score. Click the button below to start!";

  quiz.style.display = "none";
  quizResult.style.display = "none";
  quizReview.style.display = "none";
  welcomePage.style.display = "block";
}

function goHome() {
  currentQuestionIndex = 0;
  userAnswers = [];
  pickedIds = [];
  pickedQuestions = [];
  isAnswered = false;
  message.style.display = "none";

  clearProgress();
  loadWelcomingPage();
}

function setupResultHomeButton() {
  quizResultHomeButton.textContent = "Home";
  quizResultHomeButton.addEventListener("click", goHome);
}

function setupReviewHomeButton() {
  quizReviewHomeButton.textContent = "Home";
  quizReviewHomeButton.addEventListener("click", goHome);
}

/* ==================== 12. App Initialization ==================== */

function setupButtons() {
  setupNextButton();
  setupPrevButton();
  setupRestartButton();
  setupReviewButton();
  setupReviewRestartButton();
  setupReviewHomeButton();
  setupResultHomeButton();
  setupStartButton();
}

// Set up the quiz when the script runs.

function app() {
  setupButtons();
  checkAnswer();
  if (!restoreProgress()) {
    loadWelcomingPage();
  }
}

// Start the application.

app();
