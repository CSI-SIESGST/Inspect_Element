const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");
const img = document.getElementById("queimg");
const queimg = document.getElementById("img");
const img1 = document.getElementById("queimg1");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "Which Of The Following Will Create Hamburger Menu?",
    choice1: "Icon-prev",
    choice2: "Icon-bar",
    choice3: "Img-circle",
    choice4: "Icon-next",
    answer: 2,
  },
  {
    question: "To Start A List Using Circles, Use",
    choice1: "<ul Type=''circle''>",
    choice2: "<ul Type=''round''>",
    choice3: "<ul =''round''>",
    choice4: "<ul ''round''>",
    answer: 1,
  },
  {
    question:
      "What keyword is used in p.ex1’s margin-left property (Blank Space)?",
    choice1: "Derive",
    choice2: "End",
    choice3: "Inherit",
    choice4: "Right",
    answer: 3,
  },
  {
    question:
      "Which of the following properties is used to change the font of text?",
    choice1: "font-family",
    choice2: "font-size",
    choice3: ".text-align",
    choice4: "None of the above",
    answer: 1,
  },
  {
    question:
      "How do you display a border like this: The top border = 10 pixels, The bottom border = 5 pixels, The left border = 20 pixels, The right border = 1 pixel?",
    choice1: "border-width : 10px 20px 5px 1px",
    choice2: "border-width : 10px 5px 20px 1px",
    choice3: "border-width : 5px 20px 10px 1px",
    choice4: "border-width : 10px 1px 5px 20px",
    answer: 1,
  },
  {
    question:
      "Which of the following options is suitable for creating a table?",
    choice1: "<table><tr><th>Apple</th><th>Ball</th><th>Cat</th></tr></table>",
    choice2: "<table><td><th>Apple</th><th>Ball</th><th>Cat</th></td></table>",
    choice3: "<table><th><td>Apple</td><th>Ball</td><td>Cat</td></th></table>",
    choice4: "All of the above",
    answer: 1,
  },
  {
    question:
      "Which of the following statements is correct about 'em' units in CSS?",
    choice1: "Relative to 1% of the width of the viewport*",
    choice2: "Relative to the font size of the root element.",
    choice3: "Relative to 1% of viewport's* smaller dimension",
    choice4: "Relative to the font size of the element",
    answer: 1,
  },
  {
    question: "How do you add shadow to elements in CSS3?",
    choice1: "box-shadow: 10px 10px 5px grey;",
    choice2: "shadow-right: 10px shadow-bottom: 10px;",
    choice3: "alpha-effect[shadow]: 10px 10px 5px grey;",
    choice4: "shadow-color: grey;",
    answer: 1,
  },
  {
    question: "How to rotate objects using CSS3?",
    choice1: "object-rotation: 30deg;",
    choice2: "transform: rotate(30deg);",
    choice3: "rotate-object: 30deg;",
    choice4: "transform: rotate-30deg-clockwise;",
    answer: 1,
  },
  {
    question:
      "The transparent keyword is equivalent to which RGBA() value in CSS?",
    choice1: "RGBA(0, 0, 0, 1)",
    choice2: "RGBA(255, 255, 255, 1)",
    choice3: "RGBA(0, 0, 0, 0)",
    choice4: "RGBA(255, 255, 255, 0)",
    answer: 1,
  },
  {
    question:
      "What is the correct JavaScript syntax to change the content of the HTML element <p id=''demo''>This is a demonstration.</p>?",
    choice1: "document.getElementById(''demo'').innerHTML = ''Hello World!''; ",
    choice2: "document.getElement(''p'').innerHTML = ''Hello World!''; ",
    choice3: "document.getElementByName(''p'').innerHTML = ''Hello World!''; ",
    choice4: "#demo.innerHTML = ''Hello World!''; ",
    answer: 1,
  },
  {
    question: "Which is the most optimal place to insert a JavaScript?",
    choice1:
      "<html><head></head><body><script src=''main.js''></script>...code...</body></html>",
    choice2:
      "<html><head><script src=''main.js''></script></head><body>...code...</body></html>",
    choice3:
      "<html><head></head><body>...code...</body><script src=''main.js''></script></html>",
    choice4:
      "<html><head></head><body>...code...<script src=''main.js''></script></body></html>",
    answer: 1,
  },
  {
    question: "How do you write ''Hello World'' in an alert box?",
    choice1: "alert(''Hello World'');",
    choice2: "alertBox(''Hello World'');",
    choice3: "msgBox(''Hello World'');",
    choice4: "msg(''Hello World'');",
    answer: 1,
  },
  {
    question: "What is the right syntax to print a message to the web console?",
    choice1: "Console.log()",
    choice2: "Console.print()",
    choice3: "Console.cout()",
    choice4: "Console.output()",
    answer: 1,
  },
  {
    question:
      "what would be the value of x in the functions letTest() and varTest() respectively?",
    choice1: "(1,1)",
    choice2: "(1,2)",
    choice3: "(2,1)",
    choice4: "(2,2)",
    answer: 1,
    img: "/static/question.png",
  },
];

/*Function to convert time to string*/
function timeToString(time) {
  let diffInHrs = time / 3600000;
  let hh = Math.floor(diffInHrs);

  let diffInMin = (diffInHrs - hh) * 60;
  let mm = Math.floor(diffInMin);

  let diffInSec = (diffInMin - mm) * 60;
  let ss = Math.floor(diffInSec);

  let formattedMM = mm.toString().padStart(2, "0");
  let formattedSS = ss.toString().padStart(2, "0");

  return `${formattedMM}:${formattedSS}`;
}
/*Variables for calculating time*/
let startTime;
let elapsedTime = 0;
let timerInterval;

// Create function to modify innerHTML

function print(txt) {
  document.getElementById("Time").innerHTML = txt;
}

// Create "start"

function start() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(function printTime() {
    elapsedTime = Date.now() - startTime;
    print(timeToString(elapsedTime));
  }, 10);
}
print("elapsed  nknkTime");
function submit() {
  clearInterval(timerInterval);

  print(timeToString(elapsedTime));
}
const SCORE_POINTS = 100;
const MAX_QUESTIONS = 15;

startGame = () => {
  questionCounter = 0;
  score = 0;
  start();
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  // img.style.display = "none";
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    localStorage.setItem("timeelapsed", elapsedTime);
    return window.location.assign("/end.html");
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;
  // var i = currentQuestion.img;
  // // console.log(i);
  // if (i == "/static/question.png") {
  //   img.style.display = "block";
  // }

  var a = currentQuestion.question;
  if (
    a ==
    "what would be the value of x in the functions letTest() and varTest() respectively?"
  ) {
    queimg.innerHTML = '<img src="/static/question.png" id="queimg1">';
  } else if (
    a == "What keyword is used in p.ex1’s margin-left property (Blank Space)?"
  ) {
    queimg.innerHTML = '<img src="/static/question2.png" id="queimg1">';
  } else {
    queimg.innerHTML = " ";
  }
  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    let classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
};

startGame();
