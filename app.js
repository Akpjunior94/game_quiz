// referencing to display hard coded questions
const question = document.getElementById('question');
const options = Array.from(document.getElementsByClassName('option-text'));
const progressText = document.getElementById('proress-text');
const scoreTest = document.getElementById('score');
const progressBarFull = document.getElementById('progress-bar-full');
const nextButton = document.getElementById('next');
const totalScores = document.getElementById('final-score');


let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let answerOption;

let questions = [
  {
    question: 'What object is used to access globally scoped variables in a browser, for a front-end web application?',
    options: ['Window', 'Browser', 'Document', 'Global'],
    answer: 0
  },

  {
    question: 'What is the array prototype method that changes the contents of an array by removing existing elements and/or adding new elements?',
    options: ['[].remove()', '[].slice()', '[].splice()', '[].delete()'],
    answer: 2
  },

  {
    question: 'How would you indicate that you are neutral as to when or in what order a particular script is loaded, relative to other scripts?',
    options: [
      'Add the async attribute', 
      'Add the sync attribute with a value of false', 
      'Add the defer attribute', 
      'Add the defer attribute with a value of false'
    ],
    answer: 0
  },

  {
    question: 'What is the correct escape notation for a new line in a string?',
    options: ['/n/', '\\n', '/newline', '/n'],
    answer: 1
  },

  {
    question: 'Which primitive type represents the intentional absence of any object value?',
    options: ['‘’', 'Error', 'undefined', 'null'],
    answer: 3
  },
]

// constants
const CORRECT_SCORES = 20;
const MAX_QUESTIONS = 5;

const getNewQuestion = () => {
  if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    // store user score
    localStorage.setItem('score', score);

    // go to the end page
    return location.href = 'end.html';
  };

  questionCounter++;
  progressText.innerText =`Question: ${questionCounter}/${MAX_QUESTIONS}`;
  // updating the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  options.forEach(option => {
    const number = option.dataset['number'];
    option.innerText = currentQuestion.options[number];
  });

  availableQuestions.splice(questionIndex, 1);

  acceptingAnswers = true;
};

const incrementScore = num => {
  score += num;
  scoreTest.innerText = score;
}

let selectedOption, correctAnswer, option;

options.forEach(option => {
  option.addEventListener('click', e => {
    e.preventDefault();

    if(!acceptingAnswers) return; 

    acceptingAnswers = false;
    selectedOption = e.target;
    const selectedAnswer = selectedOption.dataset['number'];
    const correctOption = options.filter(opt => currentQuestion.answer == opt.getAttribute('data-number'))
    correctAnswer = correctOption[0]


    if (selectedAnswer == currentQuestion.answer) {
      option.parentElement.classList.add('correct');
      option.classList.add('child-color');
    } else {
      option.parentElement.classList.add('incorrect');
      option.classList.add('child-color');
      correctAnswer.parentElement.classList.add('correct');
      correctAnswer.classList.add('child-color')
    }

    const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

    if (classToApply === 'correct') {
      incrementScore(CORRECT_SCORES);
    }
  });
});

nextButton.addEventListener('click', e => {

  selectedOption.parentElement.classList.remove('incorrect')
  correctAnswer.parentElement.classList.remove('correct')
  correctAnswer.classList.remove('child-color')
  selectedOption.classList.remove('child-color');
  getNewQuestion()
})


const startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions]
  getNewQuestion();
};

startGame();


// EndGame();

