const questions = [
    {
        question: "What is the full form of SQL?",
        options: ["Structured Query List", "Simple Query Language", "Structured Query Language", "System Query Logic"],
        correct: 2
    },
    {
        question: "Which protocol is for emails?",
        options: ["SMTP", "HTTP", "FTP", "DHCP"],
        correct: 0
    },
    {
        question: "What does CSS stand for?",
        options: ["Computer Style System", "Color Style Sheet", "Cascading Style Sheets", "Custom Styling Script"],
        correct: 2
    },
    {
        question: "What is 10011011 in decimal?",
        options: ["155", "157", "159", "161"],
        correct: 0
    },
    {
        question: "Which is a deep learning tool?",
        options: ["TensorFlow", "MySQL", "Hadoop", "MongoDB"],
        correct: 0
    }
];

let currentQuestionIndex = 0;
let selectedAnswers = new Array(questions.length).fill(null);

function startQuiz() {
    document.getElementById("welcome-container").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
    loadQuestion();
}

function loadQuestion() {
    const questionElement = document.getElementById("question-text");
    const optionsContainer = document.getElementById("options-container");

    document.getElementById("question-text").innerText = questions[currentQuestionIndex].question;

    optionsContainer.innerHTML = "";

    questions[currentQuestionIndex].options.forEach((option, index) => {
        const optionLabel = document.createElement("label");
        optionLabel.classList.add("option");
        optionLabel.innerText = option;
        optionLabel.onclick = () => selectOption(index);
        optionsContainer.appendChild(optionLabel);
    });

    document.getElementById("prev-btn").style.display = currentQuestionIndex === 0 ? "none" : "inline-block";
    document.getElementById("next-btn").style.display = currentQuestionIndex === questions.length - 1 ? "none" : "inline-block";
    document.getElementById("submit-btn").style.display = currentQuestionIndex === questions.length - 1 ? "inline-block" : "none";
}

function selectOption(index) {
    selectedAnswers[currentQuestionIndex] = index;
    const options = document.querySelectorAll(".option");
    options.forEach((opt, i) => {
        if (i === index) {
            opt.classList.add("selected");
        } else {
            opt.classList.remove("selected");
        }
    });
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    }
}

function submitQuiz() {
    let score = selectedAnswers.reduce((acc, ans, idx) => acc + (ans === questions[idx].correct ? 1 : 0), 0);
    
    let message = "";
    if (score === 5) message = "🎉 Excellent! You got all correct!";
    else if (score >= 3) message = "🙂 Good job! Keep improving!";
    else message = "😢 Keep trying! You can do better!";

    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("result-container").style.display = "block";
    document.getElementById("score").innerText = score;
    document.getElementById("message").innerText = message;
}

function restartQuiz() {
    location.reload();
}
