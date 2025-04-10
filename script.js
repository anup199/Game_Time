// Show student & father name on the quiz page
window.addEventListener("DOMContentLoaded", () => {
  const name = localStorage.getItem("studentName") || "";
  const father = localStorage.getItem("fatherName") || "";
  const welcome = document.getElementById("welcome");
  if (welcome) {
    welcome.textContent = `Student: ${name} | Father's Name: ${father}`;
  }
});



    const quizData = [
        {
          question: "What is Notepad used for?",
          options: ["Playing games", "Writing and editing text", "Watching videos", "Browsing websites"],
          answer: "Writing and editing text"
        },
        {
          question: "Which file extension is commonly used with Notepad?",
          options: [".exe", ".txt", ".jpg", ".mp4"],
          answer: ".txt"
        },
        {
          question: "How do you save a file in Notepad?",
          options: ["File > Save", "Edit > Copy", "View > Zoom", "Help > About"],
          answer: "File > Save"
        },
        {
          question: "Which key combination is used to cut text?",
          options: ["Ctrl + C", "Ctrl + V", "Ctrl + X", "Ctrl + Z"],
          answer: "Ctrl + X"
        },
        {
          question: "Which menu option allows you to find a word in Notepad?",
          options: ["Edit > Find", "File > Open", "View > Zoom", "Help > About"],
          answer: "Edit > Find"
        },
        {
          question: "How do you undo an action in Notepad?",
          options: ["Ctrl + Y", "Ctrl + Z", "Ctrl + S", "Ctrl + F"],
          answer: "Ctrl + Z"
        },
        {
          question: "Which of the following is NOT a feature of Notepad?",
          options: ["Basic text editing", "Syntax highlighting", "Save as .txt", "Word Wrap"],
          answer: "Syntax highlighting"
        },
        {
          question: "Which option enables text wrapping in Notepad?",
          options: ["File > Wrap", "Edit > Wrap", "View > Word Wrap", "Help > Word Wrap"],
          answer: "View > Word Wrap"
        },
        {
          question: "Can you insert images into Notepad?",
          options: ["Yes", "Only PNGs", "Only JPGs", "No"],
          answer: "No"
        },
        {
          question: "Which key combination is used to save a file quickly?",
          options: ["Ctrl + P", "Ctrl + S", "Ctrl + Z", "Ctrl + F"],
          answer: "Ctrl + S"
        },
        {
          question: "What is the default font in Notepad?",
          options: ["Arial", "Courier New", "Times New Roman", "Calibri"],
          answer: "Courier New"
        },
        {
          question: "What happens when you close Notepad without saving?",
          options: ["It saves automatically", "You lose your changes", "It sends to recycle bin", "It prints the file"],
          answer: "You lose your changes"
        },
        {
          question: "Where can you change the font in Notepad?",
          options: ["View > Font", "Format > Font", "Edit > Font", "File > Font"],
          answer: "Format > Font"
        },
        {
          question: "What type of files can Notepad open?",
          options: [".txt", ".html", ".bat", "All of these"],
          answer: "All of these"
        },
        {
          question: "How do you select all text in Notepad?",
          options: ["Ctrl + A", "Ctrl + S", "Ctrl + F", "Ctrl + P"],
          answer: "Ctrl + A"
        },
        {
          question: "Can Notepad run scripts or code?",
          options: ["Yes, it can compile code", "Only for HTML", "No, it's only for viewing", "It can write, but not run code"],
          answer: "It can write, but not run code"
        },
        {
          question: "Which menu contains the 'Save As' option?",
          options: ["Edit", "File", "Format", "View"],
          answer: "File"
        },
        {
          question: "What is Word Wrap used for?",
          options: ["Change font style", "Wrap paper", "Keep text in one line", "Display text within window without scrolling"],
          answer: "Display text within window without scrolling"
        },
        {
          question: "Can Notepad open files with .html extension?",
          options: ["No", "Yes, but read-only", "Yes, and edit too", "Only on Windows 11"],
          answer: "Yes, and edit too"
        },
        {
          question: "Which feature is **not** present in Notepad?",
          options: ["Text editing", "Search and Replace", "Dark mode", "Spell check"],
          answer: "Spell check"
        }
      ];
      
  
  let currentQuestion = 0;
  let score = 0;
  
  const questionEl = document.getElementById("question");
  const optionsEl = document.getElementById("options");
  const nextBtn = document.getElementById("next-btn");
  const resultEl = document.getElementById("result");
  const scoreEl = document.getElementById("score");
  
  function loadQuestion() {
    const q = quizData[currentQuestion];
    questionEl.textContent = `${currentQuestion + 1}. ${q.question}`;
    optionsEl.innerHTML = "";
    q.options.forEach((option) => {
      const btn = document.createElement("button");
      btn.textContent = option;
      btn.onclick = () => checkAnswer(option);
      optionsEl.appendChild(btn);
    });
  }
  
  function checkAnswer(selected) {
    const correct = quizData[currentQuestion].answer;
    if (selected === correct) score++;
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      loadQuestion();
    } else {
      showResult();
    }
  }
  
  function showResult() {
  document.getElementById("quiz").classList.add("hidden");
  resultEl.classList.remove("hidden");
  scoreEl.textContent = `Your score: ${score} out of ${quizData.length}`;

  const studentName = localStorage.getItem("studentName") || "Unknown";
  const fatherName = localStorage.getItem("fatherName") || "Unknown";
  const answers = quizData.slice(0, currentQuestion).map(q => q.answer);
  const endTime = new Date().toLocaleTimeString();

  const payload = {
    name: studentName,
    fatherName: fatherName,
    score: score,
    total: quizData.length,
    time: endTime,
    answers: answers
  };

  fetch("https://docs.google.com/spreadsheets/d/1Hd4jLg_ajFqEw0BFIGT8-8Yur1LY5uCOCuNfYhy0EI0/edit?usp=sharing", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(res => res.text())
  .then(response => console.log("Saved to sheet:", response))
  .catch(err => console.error("Error saving to sheet", err));
}

  
  nextBtn.onclick = () => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      loadQuestion();
    } else {
      showResult();
    }
  };
  
  
  loadQuestion();
  
