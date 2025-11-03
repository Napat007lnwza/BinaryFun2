// คำถามของเกม
const questions = [
  { question: "แปลง 1101 เป็น Decimal?", correctAnswer: 13, answers: [10,13,12,15] },
  { question: "แปลง 15 เป็น Binary?", correctAnswer: "1111", answers: ["1010","1111","1001","1101"] },
  { question: "แปลง A เป็น Decimal?", correctAnswer: 10, answers: [8,10,12,16] },
  { question: "แปลง 1010 เป็น Hexadecimal?", correctAnswer: "A", answers: ["B","A","C","D"] }
];

let score = 0;
let currentQuestion = 0;

// ตรวจสอบหน้า
window.onload = () => {
  if (document.getElementById("start-btn")) initStartPage();
  if (document.querySelector(".game-container")) initGamePage();
};

// --- หน้าเริ่มเกม ---
function initStartPage() {
  const startBtn = document.getElementById("start-btn");
  startBtn.onclick = () => {
    const name = document.getElementById("username").value.trim();
    if(!name) { alert("กรุณากรอกชื่อผู้เล่น"); return; }
    localStorage.setItem("username", name);
    localStorage.setItem("score", 0);

    // แสดงหน้าโหลดก่อน
    document.getElementById("loading-screen").style.display = "flex";
    setTimeout(() => {
      // ซ่อนหน้าโหลดและแสดงหน้าเกม
      document.getElementById("loading-screen").style.display = "none";
      document.getElementById("game-container").style.display = "block";
      loadQuestion();
    }, 3000); // สามารถปรับเวลาได้ตามต้องการ
  };
}

// --- หน้าเล่นเกม ---
function initGamePage() {
  score = parseInt(localStorage.getItem("score")) || 0;
  document.getElementById("score").innerText = score;
}

function loadQuestion() {
  if(currentQuestion >= questions.length) {
    saveHighScore();
    window.location.href = "score.html";
    return;
  }

  const q = questions[currentQuestion];
  document.getElementById("question").innerText = q.question;
  const buttons = document.querySelectorAll(".answer-btn");

  buttons.forEach((btn, index) => {
    btn.innerText = q.answers[index];
    btn.onclick = () => checkAnswer(q.answers[index], q.correctAnswer);
  });
}

function checkAnswer(selected, correct) {
  if(selected == correct){
    score++;
    document.getElementById("score").innerText = score;
    alert("✅ ถูกต้อง!");
  } else {
    alert("❌ ผิดครับ คำตอบที่ถูกคือ " + correct);
  }
  currentQuestion++;
  loadQuestion();
}

// --- บันทึกคะแนนทั้งหมด ---
function saveHighScore() {
  const username = localStorage.getItem("username");
  const newEntry = { name: username, score: score, date: new Date().toLocaleString() };
  let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  highScores.push(newEntry);
  highScores.sort((a,b) => b.score - a.score);
  localStorage.setItem("highScores", JSON.stringify(highScores));
  localStorage.setItem("score", score);
}
