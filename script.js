//your JS code here.

// Do not change code below this line
// This code will just display the questions to the screen
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
]

//your JS code here.

const questionsElement = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// Load progress if available
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || {};

// Restore score if available
let savedScore = localStorage.getItem("score");
if (savedScore !== null) {
  scoreElement.innerText = `Your score is ${savedScore} out of ${questions.length}.`;
}

// Handle choice selection and save progress
function handleChoice(i, choice) {
  userAnswers[i] = choice;
  sessionStorage.setItem("progress", JSON.stringify(userAnswers));
}

// Display the quiz questions and choices
function renderQuestions() {
  questionsElement.innerHTML = ""; // clear old render
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");
    const questionText = document.createElement("p");
    questionText.innerText = question.question;
    questionElement.appendChild(questionText);

    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];

      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);

      // restore checked state from session storage
      if (userAnswers[i] === choice) {
        choiceElement.checked = true;
      }

      choiceElement.addEventListener("change", () => handleChoice(i, choice));

      const label = document.createElement("label");
      label.innerText = choice;

      questionElement.appendChild(choiceElement);
      questionElement.appendChild(label);
      questionElement.appendChild(document.createElement("br"));
    }

    questionsElement.appendChild(questionElement);
  }
}

// Submit and calculate score
submitBtn.addEventListener("click", () => {
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }
  scoreElement.innerText = `Your score is ${score} out of ${questions.length}.`;
  localStorage.setItem("score", score);
});

renderQuestions();
