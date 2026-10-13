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
];

/* ==================== 2. DOM Elements ==================== */

// Select the HTML elements that JavaScript will update or control.
const quizTitle = document.querySelector(".quiz-title");
const welcomePage = document.querySelector(".welcome-page");
const welcomePageTitle = document.querySelector(".welcome-page__title");
const welcomePageDescription = document.querySelector(".welcome-page__description");
const welcomePageStartButton = document.querySelector(
  ".welcome-page__start",
);
const quiz = document.querySelector(".quiz");
const questionNumber = document.querySelector(".quiz__question-number");
const question = document.querySelector(".quiz__question");
const choices = document.querySelectorAll(".quiz__choice");
const nextButton = document.querySelector(".quiz__next");
const currentResult = document.querySelector(".quiz__score");
const message = document.querySelector(".quiz__message");
const prevButton = document.querySelector(".quiz__prev");
const quizReviewButton = document.querySelector(".quiz-result__review");
const quizReview = document.querySelector(".quiz-review");
const quizReviewTitle = document.querySelector(".quiz-review__title");
const quizReviewList = document.querySelector(".quiz-review__list");
const quizReviewRestartButton = document.querySelector(".quiz-review__restart");

const quizResult = document.querySelector(".quiz-result");
const quizResultTitle = document.querySelector(".quiz-result__title");
const quizResultScore = document.querySelector(".quiz-result__score");
const quizRestartButton = document.querySelector(".quiz-result__restart");

/* ==================== 3. Quiz State ==================== */

// Track the current question, score, and answer status.
let currentQuestionIndex = 0;
let score = 0;
let isAnswered = false;
let userAnswers = [];

/* ==================== 4. Display Functions ==================== */

// Display the current question card and reset the previous answer state.
function loadCard() {
  isAnswered = false;

  resetButtonState();
  resetChoices();
  loadQuestionNumber();
  loadQuestion();
  loadChoices();
}

// Display the current question number and total number of questions.
function loadQuestionNumber() {
  questionNumber.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
}

// Display the current question's text.
function loadQuestion() {
  question.textContent = questions[currentQuestionIndex].question;
}

// Display the answer choices for the current question.
function loadChoices() {
  choices.forEach((choice, index) => {
    choice.textContent = questions[currentQuestionIndex].choices[index];
  });

  if (userAnswers[currentQuestionIndex] !== undefined) {
    const selectedChoiceIndex = userAnswers[currentQuestionIndex];
    choices[selectedChoiceIndex].classList.add("quiz__choice--selected");
    isAnswered = true; // Mark the question as answered since the user has already selected an answer.
  }
}

// Remove correct/incorrect styling before displaying the next question.
function resetChoices() {
  choices.forEach((choice) => {
    choice.classList.remove("quiz__choice--selected");
  });
}

function resetButtonState() {
  // Disable the Previous button on the first question.
  prevButton.disabled = currentQuestionIndex === 0;
  // Enable the Next button.
  nextButton.disabled = false;
}

/* ==================== 5. Answer Handling ==================== */

// Check the user's selected answer and update the score when correct.
function checkAnswer() {
  choices.forEach((choice, index) => {
    choice.addEventListener("click", () => {
      // Prevent multiple answers and repeated score increases.
      // if (isAnswered) return;

      isAnswered = true;

      // Clear any previous answer styling.
      resetChoices();
      // Check if the selected answer is correct.
      if (index === questions[currentQuestionIndex].answer) {
        score++;
      }
      // Highlight the selected answer.
      choice.classList.add("quiz__choice--selected");

      userAnswers[currentQuestionIndex] = index; // Store the user's answer for this question.
    });
  });
}

/* ==================== 6. Question Navigation ==================== */

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
    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;

      loadCard();

      // Show Finish instead of Next on the last question.
      if (currentQuestionIndex === questions.length - 1) {
        nextButton.textContent = "Finish";
      }
    } else {
      // Show the final results after the last question.
      loadQuizResult();
    }
  });
}

//move to the previous question
function setupPrevButton() {
  prevButton.textContent = "Previous";

  prevButton.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      loadCard();
    }
  });
}

/* ==================== 7. Quiz Results ==================== */

// Hide the quiz and display the final score.
function loadQuizResult() {
  quiz.style.display = "none";

  quizResultTitle.textContent = "Quiz Result";
  quizResultScore.textContent = `Score: ${score} / ${questions.length}`;
  quizRestartButton.textContent = "Restart Quiz";

  // Clear result styling from any previous attempt.
  quizResultScore.classList.remove(
    "quiz-result__score--passed",
    "quiz-result__score--failure",
  );

  // Consider a score of at least half the questions a pass.
  if (score >= questions.length / 2) {
    quizResultScore.classList.add("quiz-result__score--passed");
  } else {
    quizResultScore.classList.add("quiz-result__score--failure");
  }

  // Make the result section visible.
  quizResult.style.display = "block";
}

/* ==================== 8. Restart Quiz ==================== */

// Listen for clicks on the Restart Quiz button.
function setupRestartButton() {
  quizRestartButton.addEventListener("click", restartQuiz);
}

function setupReviewButton() {
  quizReviewButton.textContent = "Review Answers";
  quizReviewButton.addEventListener("click", loadQuizReview);
}

// Reset the quiz so the user can play again.
function restartQuiz() {
  quizResult.style.display = "none";
  quizReview.style.display = "none";
  quiz.style.display = "block";

  // Reset the quiz state.
  currentQuestionIndex = 0;
  score = 0;
  isAnswered = false;

  // Restore the initial button text.
  nextButton.textContent = "Next";

  // Remove result styling from the previous attempt.
  quizResultScore.classList.remove(
    "quiz-result__score--passed",
    "quiz-result__score--failure",
  );

  userAnswers = [];

  // Display the first question again.
  loadCard();
}

/* ==================== 9. Quiz Review ==================== */
function setupReviewRestartButton() {
  quizReviewRestartButton.textContent = "Restart Quiz";
  quizReviewRestartButton.addEventListener("click", restartQuiz);
}
function loadQuizReview() {
  quiz.style.display = "none";
  quizResult.style.display = "none";
  quizReview.style.display = "block";

  quizReviewTitle.textContent = "Review Your Answers";

  const reviewList = document.querySelector(".quiz-review__list");
  reviewList.innerHTML = "";

  userAnswers.forEach((answer, index) => {
    const li = document.createElement("li");
    li.classList.add("quiz-review__item");

    if (questions[index].answer === answer) {
      li.classList.add("quiz-review__item--correct");
    } else {
      li.classList.add("quiz-review__item--incorrect");
    }

    const question = questions[index];
    const questionParagraph = document.createElement("p");
    questionParagraph.textContent = `Question ${index + 1}: ${question.question}`;
    li.appendChild(questionParagraph);

    const answerParagraph = document.createElement("p");
    answerParagraph.textContent = `Your answer: ${question.choices[answer]}`;
    li.appendChild(answerParagraph);
    if (questions[index].answer !== answer) {
      const correctAnswerParagraph = document.createElement("p");
      correctAnswerParagraph.textContent = `Correct answer: ${question.choices[question.answer]}`;
      li.appendChild(correctAnswerParagraph);
    }

    reviewList.appendChild(li);
  });
}
/* ==================== 10. welcoming page ==================== */
function loadWelcomingPage() {
  quiz.style.display = "none";
  quizResult.style.display = "none";
  quizReview.style.display = "none";
  welcomePage.style.display = "block";
}

/* ==================== 10. Initialize the App ==================== */

function setupButtons() {
  setupNextButton();
  setupPrevButton();
  setupRestartButton();
  setupReviewButton();
  setupReviewRestartButton();
}

// Set up the quiz when the script runs.
function app() {
  loadCard();
  setupButtons();
  checkAnswer();
}

// Start the application.
app();
