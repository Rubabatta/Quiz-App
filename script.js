const questions = [
  { question: "HTML stands for?", options: ["Hyper Text", "Home Tool", "High Text", "Hyperlink"], answer: 0 },
  { question: "JS is used for?", options: ["Styling", "Structure", "Interactivity", "Database"], answer: 2 },
  { question: "Line break tag?", options: ["<br>", "<lb>", "<break>", "<line>"], answer: 0 },
  { question: "Inline style attribute?", options: ["style", "class", "id", "font"], answer: 0 },
  { question: "JS comment symbol?", options: ["//", "<!-- -->", "/* */", "##"], answer: 0 },
  { question: "CSS stands for?", options: ["Cascading Style", "Color Style", "Creative Sheet", "Computer Sheet"], answer: 0 },
  { question: "Default JS data type?", options: ["String", "Number", "Boolean", "Undefined"], answer: 3 },
  { question: "HTML paragraph tag?", options: ["<p>", "<para>", "<pg>", "<par>"], answer: 0 },
  { question: "JS function keyword?", options: ["func", "function", "fn", "def"], answer: 1 },
  { question: "JS loop keyword?", options: ["for", "loop", "repeat", "each"], answer: 0 }
];

let currentQuestion = 0;
let score = 0;

// Select container & store original HTML for restart
let container = document.querySelector(".container");
let originalHTML = container.innerHTML;

// Select elements
let questionDiv = document.querySelector(".question");
let optionSpans = document.querySelectorAll(".options span");
let radios = document.querySelectorAll(".options input[type='radio']");
let next = document.querySelector(".next-btn");
let pre = document.querySelector(".Previous-btn");

// Show question function
function showQuestion() {
    questionDiv.innerText = `Q${currentQuestion+1}: ${questions[currentQuestion].question}`;
    questions[currentQuestion].options.forEach((opt, index) => {
        optionSpans[index].innerText = opt;
        radios[index].checked = false;
    });
}

// Initial call
showQuestion();

// ========== NEXT BUTTON ==========
next.addEventListener("click", function() {
    let selected = Array.from(radios).findIndex(r => r.checked);

    if (selected === -1) {
        showtoast("Please select an option!");
        return;
    }

    if (selected === questions[currentQuestion].answer) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        // Quiz complete → show result
        container.innerHTML = `
            <h2>Quiz Completed!</h2>
            <h3>Your Score: ${score} / ${questions.length}</h3>
            <button id="restart">Restart Quiz</button>
            <div id="toast"></div>
        `;

        document.querySelector("#restart").addEventListener("click", restartQuiz);
    }
});

// ========== PREVIOUS BUTTON ==========
pre.addEventListener("click", function() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion();
    }
});

// ========== TOASTER ==========
function showtoast(msg) {
    let toast = document.querySelector("#toast");
    if (!toast) {
        // create toast if not exists
        toast = document.createElement("div");
        toast.id = "toast";
        document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.opacity = 1;

    setTimeout(() => { toast.style.opacity = 0; }, 2000);
}

// ========== RESTART FUNCTION ==========
function restartQuiz() {
    // Reset variables
    currentQuestion = 0;
    score = 0;

    // Restore original HTML
    container.innerHTML = originalHTML;

    // Re-select elements
    questionDiv = document.querySelector(".question");
    optionSpans = document.querySelectorAll(".options span");
    radios = document.querySelectorAll(".options input[type='radio']");
    next = document.querySelector(".next-btn");
    pre = document.querySelector(".Previous-btn");

    // Show first question
    showQuestion();

    // Re-bind buttons
    next.addEventListener("click", nextClick);
    pre.addEventListener("click", preClick);
}

// Optional: separate functions for re-binding after restart
function nextClick() {
    let selected = Array.from(radios).findIndex(r => r.checked);
    if (selected === -1) { showtoast("Please select an option!"); return; }
    if (selected === questions[currentQuestion].answer) score++;
    currentQuestion++;
    if (currentQuestion < questions.length) showQuestion();
    else {
        container.innerHTML = `
            <h2>Quiz Completed!</h2>
            <h3>Your Score: ${score} / ${questions.length}</h3>
            <button id="restart">Restart Quiz</button>
            <div id="toast"></div>
        `;
        document.querySelector("#restart").addEventListener("click", restartQuiz);
    }
}

function preClick() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion();
    }
}
