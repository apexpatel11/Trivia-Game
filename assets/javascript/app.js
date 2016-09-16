
var panel = $('#quiz-area');
var countStartNumber = 30;

//CLICK EVENTS

$(document).on('click', '#start-over', function(e) {
  game.reset();
});

$(document).on('click', '.answer-button', function(e) {
  game.clicked(e);
});

$(document).on('click', '#start', function(e) {
  $('#subwrapper').prepend('<h2>Time Remaining: <span id="counter-number">30</span> Seconds</h2>');
  game.loadQuestion();
});


//Question set


var questions = [{
  question: "In North Carolina it is illegal to use what to plough cotton fields?",
  answers: ["Horse", "Cow", "Elephants", "Bullock"],
  correctAnswer: "Elephants",
  image:"assets/images/elephant.gif"
}, {
  question: "On Sunday, in Columbus Ohio, it is illegal to sell what?",
  answers: ["Beer", "Cornflakes", "Furniture", "Plastic Bags"],
  correctAnswer: "Cornflakes",
  image:"assets/images/cornflakes.gif"
}, {
  question: "What is the diameter of Earth?",
  answers: ["10,000 miles", "8,000 miles", "36,500 miles", "5000 miles"],
  correctAnswer: "8,000 miles",
  image:"assets/images/earth.gif"
}, {
  question: "Which record label did Michael Jackson first record on?",
  answers: ["Dangerous", "Bad", "Off the wall", "Motown"],
  correctAnswer: "Motown",
  image:"assets/images/mj.gif"
}, {
  question: " 25% of Americans believe what fictional character is real?",
  answers: ["Sherlock Holmes", "Superman", "Batman", " Dracula"],
  correctAnswer: "Sherlock Holmes",
  image:"assets/images/skh.gif"
}, {
  question: "No other animal gives us more by-products than this?",
  answers: ["Cow", "Pig", "Chicken", "Fish"],
  correctAnswer: "pig",
  image:"assets/images/pig.gif"
}, {
  question: "In California it is illegal to do what in a hotel room?",
  answers: ["Sleeping under the bed", "Peel an Onion", "Watch horror moovies", "Jumping on mattress"],
  correctAnswer: "Peel an Onion",
  image:"assets/images/onion.gif"
}, {
  question: "According to doctors people with what pets fall asleep easiest?",
  answers: ["Dog", "Cat", "Fish", "Hamsters"],
  correctAnswer: "Fish",
  image:"assets/images/fish.gif"
}];




var game = {
  questions:questions,
  currentQuestion:0,
  counter:countStartNumber,
  correct:0,
  incorrect:0,
  countdown: function(){
    game.counter--;
    $('#counter-number').html(game.counter);

    if (game.counter === 0){
      console.log('TIME UP');
      game.timeUp();
    }
  },
  loadQuestion: function(){
    timer = setInterval(game.countdown, 1000);
    panel.html('<h2>' + questions[this.currentQuestion].question + '</h2>' );
    for (var i = 0; i<questions[this.currentQuestion].answers.length; i++){
      panel.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
    }
  },
  nextQuestion: function(){
    game.counter = countStartNumber;
    $('#counter-number').html(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },
  timeUp: function (){
    clearInterval(timer);
    $('#counter-number').html(game.counter);

    panel.html('<h2>Out of Time!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[this.currentQuestion].correctAnswer);
    panel.append('<img src="' + questions[this.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  results: function() {
    clearInterval(timer);

    panel.html('<h2>All done, heres how you did!</h2>');
    $('#counter-number').html(game.counter);
    panel.append('<h3>Correct Answers: ' + game.correct + '</h3>');
    panel.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
    panel.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
    panel.append('<br><button id="start-over">Start Over?</button>');
  },
  clicked: function(e) {
    clearInterval(timer);

    if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer){
      this.answeredCorrectly();
    } else {
      this.answeredIncorrectly();
    }
  },
  answeredIncorrectly: function() {
    game.incorrect++;
    clearInterval(timer);
    panel.html('<h2>Nope!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  answeredCorrectly: function(){
    clearInterval(timer);
    game.correct++;
    panel.html('<h2>Correct!</h2>');
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  reset: function(){
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};
