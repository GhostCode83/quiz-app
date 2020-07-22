const STORE = [
  {
    question: "Question 1: <br>Where did Frank Castle and Amy first meet?",
    image: '<img src="images/question-page/frank-amy-waiting-room.jpg" alt="frank-and-amy-in-waiting-room">'
    ,
    options: [
      'a bar',
      'a barbershop',
      'a dentist office',
      'a grocery store'
    ],
    answer: 0,
    correct: true
  },
  {
    question: "Question 2: <br>Who was Frank Castle's one call when he was arrested?",
    image: '<img src="images/question-page/frank-arrested.jpg" alt="frank-mugshot">',

    options: [
      'Russo',
      'Madani',
      'Curtis',
      'Pilgrim'
    ],
    answer: 1,
    correct: true
  },
  {
    question: "Question 3: <br>What's the bounty placed on Frank Castle's head?",
    image: '<img  src="images/question-page/bounty-hunters.gif" alt="bounty-hunters-agains-frank">',
    options: [
      '$5 Billion',
      '$5 Thousand',
      '$5 Hundred Thousand',
      '$5 Million'
    ],
    answer: 3,
    correct: true
  },
  {
    question: "Question 4: <br>How did Krista's father die?",
    image: '<img  src="images/question-page/krista-young.png" alt="krista-sad-as-child-on-floor">',
    options: [
      'Heart Attack',
      'Shot by the Punisher',
      'Jumped out of a window',
      'Drug overdose after rehab'
    ],
    answer: 2,
    correct: true
  },
  {
    question: "Question 5: <br>Why did Krista befriend Madani?",
    image: '<img  src="images/question-page/krista-offers-madani-accepts-drink.jpg" alt="krista-offers-madani-accepts-drink">',
    options: [
      'To chat about Russo',
      'She appreciated her as a professional',
      'She needed to share a secret with her',
      "To find Frank's weakness"
    ],
    answer: 3,
    correct: true
  }
]

let score = 0;
let currentQuestion = 0;


/*------- functions with content to be rendered in the DOM --------*/
function renderStartPage() {
  // event.preventDefault()
  return `<form class="js-quiz-form welcome">
            <h1>Punisher Trivia Quiz</h1>
            <h2>Welcome</h2>
            <img src="images/start-page/punisher-poster-frank.jpg" alt="frank-with-a-gun" width="500">
            <br>
            <button>Start Trivia Quiz</button>
          </form>`
}

function renderQuestionPage() {
  //loads a multiple choice question with a submit button
  if (currentQuestion < STORE.length) {
    return `<form class="question js-question"> 
              <h2 > 
              ${STORE[currentQuestion].question} 
              </h2>
              <section class="group">
                <div class="item"> 
                ${STORE[currentQuestion].image} 
                </div>
                
                <div class="item align">
                  <input id="option 1" type="radio" name="option" class="option" value="0" required> 
                  <label for="option 1">${STORE[currentQuestion].options[0]}</label>
                  </br>
                  <input id="option 2" type="radio" name="option" class="option" value="1"> 
                  <label for="option 2">${STORE[currentQuestion].options[1]}</label>
                  </br>
                  <input id="option 3" type="radio" name="option" class="option" value="2"> 
                  <label for="option 3">${STORE[currentQuestion].options[2]}</label>
                  </br>
                  <input id="option 4" type="radio" name="option" class="option" value="3"> 
                  <label for="option 4">${STORE[currentQuestion].options[3]}</label>
                  </br>
                  <button id="submit" class="option" type='submit' >Submit Answer</button>
                </div>
                
                <div class="item align">
                <p>Points earned: </p>
                <p class="score"> ${ score} </p>
                </div>
              </section>
            </form>`
  }
}

function renderFeedbackPage() {
  //renders a page that gives users feedback on how they did.
  if (STORE[currentQuestion].correct) {
    return `<form class="js-feedback-page"> 
    <h2>That's right!</h2>
    <section class="group">
      <div class="item">
        <img src="images/answer-page/frank-winning-gun-fight.jpg" alt="frank-winning-gun-fight" width="500"> 
      </div>
      <div class="item item-2">
        <p>Points earned: </p>
        <p class="score">${ score}</p>
        <button class="feedback-page">Continue</button>
      </div>
    </form>`
  } else {
    return `<form class="js-feedback-page"> 
    <h2>Wrong answer!</h2>
    <section class="group">
      <div class="item">
        <img src="images/answer-page/frank-beside-car-with-gun.jpg" alt="frank-pinned-down-by-gunfire-behind-car" width="500">
      </div>
      <div class="item item-2">
        <p>The correct answer was: <br> ${STORE[currentQuestion].options[STORE[currentQuestion].answer]} </p>
        <p>Points earned: </p>
        <p class="score">${ score}</p>
        <button class="feedback-page">Continue</button>
      </div>
    </section>  
    </form>`
  }
}

function renderResultsPage() {
  //shows users their total score once they have answered all the questions and received feedback, and gives opportunity to play again.
  if (score / STORE.length >= .75) {
    return `<form class="js-results-page">
    <h2>Results</h2>
    <section class="group">
      <div class="item">
        <img src="images/last-page/frank-and-amy-happy.jpg" alt="frank-and-amy-happy-at-storefront" width="500">
      </div>
      <div class="item">
        <h3>Good Job!</h3>
        <p>You scored: ${score} / ${STORE.length} </p>                
        <input type="submit" value="try again">
      </div>
    </section>
    </form>`
  } else {
    return `<form class="js-results-page">
    <h2>Results</h2>
    <section class="group">
    <div class="item">
    <img src="images/last-page/frank-and-amy-dissatisfied.jpg" alt="frank-and-amy-dissatisfied-at-storefront" width="500">
    </div>
    <div class="item">
      <h3>Are you even trying?</h3>
      <p>You scored: </p> 
      <p class="score"> ${score} / ${STORE.length} </p>              
      <input type="submit" value="try again">
    </div>
    </form>`
  }
}


/*----------------- functions that initiate the above render functions -------------------*/

function begin() {
  $( '.js-quiz-container' ).html(renderStartPage())
  startQuizQuestions();
}

function restart() {
  score = 0;
  currentQuestion = 0;
  $('.js-results-page').on('submit', function (event) {
    event.preventDefault();
    $('.js-quiz-container').html(renderStartPage())
  })
}

function startQuizQuestions() {
  //starts quiz by bringing user to the first question
  $('.js-quiz-form').on('submit', function (event) {
    event.preventDefault();

    $('.js-quiz-container').html(renderQuestionPage())
    evaluateAnswer();
  });
}

function evaluateAnswer() {
  //evaluates the answer submitted by user as either right or wrong.
  $('.js-question').on('submit', function (event) {
    event.preventDefault();
    if (parseInt($('input[name=option]:checked').val()) === STORE[currentQuestion].answer) {
      score++;

    } else {
      STORE[currentQuestion].correct = false;
      event.preventDefault();
    }
    $('.js-quiz-container').html(renderFeedbackPage());
    currentQuestion++;
    nextQuestion();
  });
};

function nextQuestion() {
  //goes to the next question if there are more questions, if not, goes to the results page.
  if (currentQuestion < STORE.length) {
    $('.js-feedback-page').on('submit', function (event) {
      event.preventDefault();
      $('.js-quiz-container').html(renderQuestionPage())
      evaluateAnswer();
    })
  } else {
    $('.js-feedback-page').on('submit', function (event) {
      event.preventDefault();
      $('.js-quiz-container').html(renderResultsPage())
    })
  }
}

$(document).ready(function() {
  begin();
})
