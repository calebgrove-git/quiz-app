//Starts the quiz
function startQuiz() {
  $('#start').on('click', function (e) {
    displayQuestion();
    displayAnswers();
    displayScore();
    e.preventDefault();
  });
}
//Displays score and current question
function displayScore() {
  $('main').append(
    `<h2 class="center">Your Score    ` +
      STORE.yourScore +
      `/` +
      STORE.allQuestions.length +
      `<br>Current Question    ` +
      STORE.thisQuestion +
      `/` +
      STORE.allQuestions.length +
      `</h2>`
  );
}
//displays the current question
function displayQuestion() {
  let i = STORE.thisQuestion;
  let html =
    `<form class="center"><h2 class="center"id="quiz-main">` +
    STORE.allQuestions[i].question +
    `</h2>
 <ul id="quiz-answers">
 </ul>
 <button id="quiz-submit" type="submit" name="submit">submit</button></form>`;
  $('main').html(html);
}
//displays answers for the current question
function displayAnswers() {
  let i = STORE.thisQuestion;
  let k = 1;
  STORE.allQuestions[i].answers.forEach((answer) => {
    $('ul').append(
      `<li><input type="radio" name="answer" id="` +
        k +
        `" value="` +
        answer +
        `"><label for="` +
        k +
        `">` +
        answer +
        `</label></li>`
    );
    k++;
  });
  STORE.thisQuestion++;
}
//handles the next question button
function nextQuestion() {
  $('body').on('click', '#next', function () {
    let i = STORE.thisQuestion;
    if (i === STORE.allQuestions.length) {
      $('main').html(
        `<h2 class="center">End of Quiz</h2><button type="submit" id="restart" name="restart">Restart Quiz</button>`
      );
      displayScore();
    } else {
      displayQuestion();
      displayAnswers();
      displayScore();
    }
  });
}
//displays screen for correct answer
function correctAnswer() {
  $('main').html(
    `<h2 class="center">That is correct!</h2><button type="submit" id="next" name="next question">Next</button>`
  );
  STORE.yourScore++;
  displayScore();
}
//displays screen for incorect answer
function incorrectAnswer() {
  let i = STORE.thisQuestion - 1;
  $('main').html(
    `<h2 class="center">That is incorrect.</h2>
    <h2 class="center">The correct answer was:   ` +
      STORE.allQuestions[i].correctAnswer +
      `<br> If you would like to learn more about this answer, <a href="` +
      STORE.allQuestions[i].answerLink +
      `" target="_blank"> click here!</a></h2>
      <button type="submit" id="next" name="next question">Next</button>`
  );
  displayScore();
}
//handles the submit answer button
function submitAnswer() {
  $('body').on('click', '#quiz-submit', function (e) {
    e.preventDefault();
    let i = STORE.thisQuestion - 1;
    let correct = STORE.allQuestions[i].correctAnswer;
    let selectedOption = $('input[name=answer]:checked').val();
    if (selectedOption === undefined) {
      alert('You must select an answer');
      return;
    }
    if (selectedOption === correct) {
      correctAnswer();
    } else {
      incorrectAnswer();
    }
  });
}
//handles the restart quiz button
function restartQuiz() {
  $('body').on('click', '#restart', function (e) {
    STORE.thisQuestion = 0;
    STORE.yourScore = 0;
    displayQuestion();
    displayAnswers();
    displayScore();
  });
}
//main function
function handleQuiz() {
  startQuiz();
  submitAnswer();
  displayScore();
  nextQuestion();
  restartQuiz();
}
//questions object
const STORE = {
  allQuestions: [
    {
      question: "jQuery('#id') is the same as ____",
      answers: ["%('id')", '$(id)', '(id)', "$('id')"],
      correctAnswer: "$('id')",
      answerLink: 'https://www.w3schools.com/jquery/jquery_syntax.asp',
    },
    {
      question:
        'Which jQuery method inserts content to the end of each matched element?',
      answers: ['.prepend()', '.add()', '.insert()', '.append()'],
      correctAnswer: '.append()',
      answerLink: 'https://www.w3schools.com/jquery/html_append.asp',
    },
    {
      question:
        "What would this code block do? $('p').css('background-color','green')",
      answers: [
        'Change background color of the body to green',
        'Change the text color of all p elements to green',
        'Change the background color of all p elements to green',
        'None of the above',
      ],
      correctAnswer: 'Change the background color of all p elements to green',
      answerLink: 'https://www.w3schools.com/jquery/jquery_css.asp',
    },
    {
      question:
        "What elements would be selected by this selector? $('p.content')",
      answers: [
        'All p elements',
        'All p elements with the class of content',
        'All p elements with the id of content',
        'The first p element with the class of content',
      ],
      correctAnswer: 'All p elements with the class of content',
      answerLink: 'https://www.w3schools.com/jquery/jquery_selectors.asp',
    },
    {
      question:
        'What is the correct jQuery to set all div elements to 100 pixels wide?',
      answers: [
        "$('div').css('width','100px')",
        "$('div.css')('width','100px')",
        "$('div').addClass('width','100px')",
        "$('div.all').css('width','100px')",
      ],
      correctAnswer: "$('div').css('width','100px')",
      answerLink: 'https://www.w3schools.com/jquery/jquery_css.asp',
    },
    {
      question:
        ' ____ is used to stop animations or effects before they are finished.',
      answers: ['.quit()', '.remove()', '.stop()', '.toggle()'],
      correctAnswer: '.stop()',
      answerLink: 'ht`tps://www.w3schools.com/jquery/jquery_stop.asp',
    },
    {
      question: 'What does the .length() jQuery method return?',
      answers: [
        'The length of a string',
        'The size of a document',
        'The length of an array',
        'The number of elements matched by the selector',
      ],
      correctAnswer: 'The number of elements matched by the selector',
      answerLink: 'https://www.w3schools.com/jquery/prop_length.asp',
    },
    {
      question: 'DOM stands for ____',
      answers: [
        'Documnent Object Model',
        'Document Operation Matrix ',
        'Direct Object Managment ',
        'Document Order Model',
      ],
      correctAnswer: 'Documnent Object Model',
      answerLink: 'https://www.w3schools.com/js/js_htmldom.asp',
    },
    {
      question: '____ stops event propagation in jQuery',
      answers: [
        'event.stopProp()',
        'event.quit()',
        'event.stopPropagation()',
        'event.stop()',
      ],
      correctAnswer: 'event.stopPropagation()',
      answerLink:
        'https://www.w3schools.com/jquery/event_stoppropagation.asp#:~:text=The%20event.,was%20called%20for%20the%20event.',
    },
    {
      question: 'jQuery is useful because',
      answers: [
        'It allows us to manipulate the DOM quickly',
        'It allows us to traverse the DOM quickly',
        'It lets us write less code than vanilla JS',
        'All of the above',
      ],
      correctAnswer: 'All of the above',
      answerLink: 'https://www.w3schools.com/jquery/jquery_intro.asp',
    },
  ],
  thisQuestion: 0,
  yourScore: 0,
};
//document ready function
$(handleQuiz);
