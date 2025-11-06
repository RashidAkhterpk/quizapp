var firebaseConfig = {
  apiKey: "AIzaSyAI61JKYodTHlMplWwfYeEGZXONxrnC4Xc",
  authDomain: "rshquizapp.firebaseapp.com",
  databaseURL: "https://rshquizapp-default-rtdb.firebaseio.com",
  projectId: "rshquizapp",
  storageBucket: "rshquizapp.firebasestorage.app",
  messagingSenderId: "730186115553",
  appId: "1:730186115553:web:de949a5f487d33c822caa0"
};

// Initialize Firebase
var app = firebase.initializeApp(firebaseConfig);
var db = firebase.database();

var obj = [];
var questions = [
  {
    question: "Q1: Who is the father of HTML?",
    option1: "Rasmus Lerdorf",
    option2: "Tim Berners-Lee",
    option3: "Brendan Eich",
    option4: "Sergey Brin",
    corretAnswer: "Tim Berners-Lee",
  },
  {
    question: "Q2: HTML stands for ____",
    option1: "HyperText Markup Language",
    option2: "HyperText Machine Language",
    option3: "HyperText Marking Language",
    option4: "HighText Marking Language",
    correctAnswer: "HyperText Markup Language",
  },
  {
    question: "Q3: What is the correct syntax of doctype in HTML5?",
    option1: "</doctype html>",
    option2: "<doctype html>",
    option3: "<doctype html!>",
    option4: "<!doctype html>",
    correctAnswer: "<!doctype html>",
  },
  {
    question: "Q4: Which of the following is used to read an HTML page and render it?",
    option1: "Web server",
    option2: "Web network",
    option3: "Web browser",
    option4: "Web matrix",
    correctAnswer: "Web browser",
  },
  {
    question: "Q5: In which part of the HTML metadata is contained?",
    option1: "head tag",
    option2: "title tag",
    option3: "html tag",
    option4: "body tag",
    correctAnswer: "head tag",
  },
  // {
  //   question: "Q6: Which element is used to get highlighted text in HTML5?",
  //   option1: "<u>",
  //   option2: "<mark>",
  //   option3: "<highlight>",
  //   option4: "<b>",
  //   correctAnswer: "3",
  // },
  // {
  //   question: "Q7: Which character is used to represent when a tag is closed in HTML?",
  //   option1: "#",
  //   option2: "!",
  //   option3: "/",
  //   option4: "$",
  //   correctAnswer: "/",
  // },
  // {
  //   question: "Q8: Which HTML element is used for short quote",
  //   option1: "<em>",
  //   option2: "<abbr>",
  //   option3: "<q>",
  //   option4: "<blockquote>",
  //   correctAnswer: "<q>",
  // },
  // {
  //   question: "Q9: Which of the following HTML tag is used to create an unordered list?",
  //   option1: "<ol>",
  //   option2: "<ul>",
  //   option3: "<li>",
  //   option4: "<ll>",
  //   correctAnswer: "<ul>",
  // },
  // {
  //   question: "Q10: Which works similar to <b> element?",
  //   option1: "<blockquote>",
  //   option2: "<strong>",
  //   option3: "<em>",
  //   option4: "<i>",
  //   correctAnswer: "<strong>",
  // },

  // {
  //   question: "Q11: Which HTML element is used for YouTube videos?",
  //   option1: "<samp>",
  //   option2: "<small>",
  //   option3: "<frame>",
  //   option4: "<iframe>",
  //   correctAnswer: "<iframe>",
  // },

  // {
  //   question: "Q12: What is JavaScript?",
  //   option1: "JavaScript is a scripting language used to make the website interactive",
  //   option2: "JavaScript is an assembly language used to make the website interactive",
  //   option3: "JavaScript is a compiled language used to make the website interactive",
  //   option4: "None of the mentioned",
  //   correctAnswer: "JavaScript is a scripting language used to make the website interactive",
  // },

  // {
  //   question: "Q13: Arrays in JavaScript are defined by which of the following statements?",
  //   option1: "It is an ordered list of values",
  //   option2: "It is an ordered list of objects",
  //   option3: "It is an ordered list of string",
  //   option4: "It is an ordered list of functions",
  //   correctAnswer: "It is an ordered list of values",
  // },

  // {
  //   question: "Q14: Which of the following object is the main entry point to all client-side JavaScript features and APIs?",
  //   option1: "Position",
  //   option2: "Window",
  //   option3: "Standard",
  //   option4: "Location",
  //   correctAnswer: "Window",
  // },

  // {
  //   question: "Q15: Why JavaScript Engine is needed?",
  //   option1: "Both Compiling & Interpreting the JavaScript",
  //   option2: "Parsing the javascript",
  //   option3: "Interpreting the JavaScript",
  //   option4: "Compiling the JavaScript",
  //   correctAnswer: "Interpreting the JavaScript",
  // },
];

var quesElement = document.getElementById("quest");
console.log(quesElement);
var opt1 = document.getElementById("option1");
var opt2 = document.getElementById("option2");
var opt3 = document.getElementById("option3");
var opt4 = document.getElementById("option4");
var index = 0;
var nextBtn = document.getElementById("btn");
var score = 0;
var min = 1;
var sec = 59;

function timer() {
  var timeElement = document.getElementById("time");
  timeElement.innerHTML = min + ":" + sec;
  sec--;
  if (sec < 0) {
    min--;
    sec = 59;
    if (min < 0) {
      next();
      min = 1;
      sec = 59;
    }
  }
}

setInterval(timer, 1000);

function next() {
  var allInputs = document.getElementsByTagName("input");
  for (var i = 0; i < allInputs.length; i++) {
    if (allInputs[i].checked) {
      allInputs[i].checked = false;
      var userSelectedValue = allInputs[i].value;

      var selectedOption = questions[index - 1]["option" + userSelectedValue];
      var correctOption = questions[index - 1]["correctAnswer"];

      if (selectedOption === correctOption) {
        score++;
      }
      obj.push(selectedOption);
      // console.log(arr);
    }
    else {
      // console.log(arr);
    }
  }

  min = 1;
  sec = 59;
  nextBtn.disabled = true;

  if (index > questions.length - 1) {

    if (((score / questions.length) * 100) > 90) {
      Swal.fire({
        title: "Marvelous!",
        text: (score / questions.length) * 100 + "%",
        icon: "success",
      });
      AddtoDatabase();
    }
    else if (((score / questions.length) * 100) > 80) {
      // AddtoDatabase();
      Swal.fire({
        title: "Excellent!",
        text: (score / questions.length) * 100 + "%",
        icon: "success",
      });
      AddtoDatabase();
    }
    else if (((score / questions.length) * 100) > 70) {
      // AddtoDatabase();
      Swal.fire({
        title: "Good Job!",
        text: (score / questions.length) * 100 + "%",
        icon: "success",
      }); 
      AddtoDatabase();
    }
    else if (((score / questions.length) * 100) > 50) {
      // AddtoDatabase();
      Swal.fire({
        title: "Need Improvement!",
        text: (score / questions.length) * 100 + "%",
        icon: "warning",
      });
      AddtoDatabase();
    }
    else {
      // AddtoDatabase();
      Swal.fire({
        title: "Better Luck Next Time!",
        text: (score / questions.length) * 100 + "%",
        icon: "error",
      });  
      AddtoDatabase();      
    }
  }
  else {
    quesElement.innerText = questions[index].question;
    opt1.innerText = questions[index].option1;
    opt2.innerText = questions[index].option2;
    opt3.innerText = questions[index].option3;
    opt4.innerText = questions[index].option4;
    index++;
  }
}

function AddtoDatabase() {
  firebase.database().ref("Quiz").push(obj);
  // alert("End of Quiz");
  // window.location.href = "end.html"
}
function tigger() {
  nextBtn.disabled = false;
}
