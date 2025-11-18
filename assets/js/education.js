// Tab functionality
const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const tabName = button.getAttribute("data-tab");

    // Update button styles
    tabButtons.forEach((btn) => {
      btn.classList.remove(
        "bg-gradient-to-r",
        "from-brand-purple-600",
        "to-brand-purple-700",
        "text-white",
        "shadow-lg"
      );
      btn.classList.add("bg-gray-200", "text-gray-700");
    });

    button.classList.remove("bg-gray-200", "text-gray-700");
    button.classList.add(
      "bg-gradient-to-r",
      "from-brand-purple-600",
      "to-brand-purple-700",
      "text-white",
      "shadow-lg"
    );

    // Show corresponding tab content
    tabContents.forEach((content) => {
      content.classList.remove("active");
    });

    document.getElementById(tabName).classList.add("active");
  });
});

// Quiz functionality
let currentQuestion = 1;
let score = 0;
const totalQuestions = 5;

// Quiz feedback messages
const feedbackMessages = {
  1: {
    correct: {
      title: "Benar!",
      message:
        "Menurut UU No. 16/2019 tentang Perubahan UU No. 1/1974 tentang Perkawinan, usia minimal untuk menikah adalah 19 tahun untuk baik perempuan maupun laki-laki.",
    },
    incorrect: {
      title: "Salah",
      message:
        "Menurut UU No. 16/2019, usia minimal untuk menikah adalah 19 tahun untuk perempuan dan laki-laki. Sebelumnya, usia minimal perempuan adalah 16 tahun, namun telah diubah menjadi 19 tahun untuk menyamakan usia minimal pernikahan.",
    },
  },
  2: {
    correct: {
      title: "Benar!",
      message:
        "Komplikasi kehamilan dan persalinan adalah dampak kesehatan paling umum pada perempuan yang menikah di usia dini. Tubuh mereka belum siap secara fisik untuk mengandung dan melahirkan anak.",
    },
    incorrect: {
      title: "Salah",
      message:
        "Komplikasi kehamilan dan persalinan adalah dampak kesehatan paling umum pada perempuan yang menikah di usia dini. Risiko kematian ibu juga 5 kali lebih tinggi pada pernikahan anak.",
    },
  },
  3: {
    correct: {
      title: "Benar!",
      message:
        "Hak untuk mendapatkan pendidikan adalah hak anak yang paling sering dilanggar dalam kasus pernikahan dini. Banyak anak perempuan yang menikah dini terpaksa putus sekolah.",
    },
    incorrect: {
      title: "Salah",
      message:
        "Hak untuk mendapatkan pendidikan adalah hak anak yang paling sering dilanggar dalam kasus pernikahan dini. Padahal, menurut UU No. 20/2003 tentang Sistem Pendidikan Nasional, setiap warga negara berhak mendapatkan pendidikan.",
    },
  },
  4: {
    correct: {
      title: "Benar!",
      message:
        "Komnas Perempuan, LBH (Lembaga Bantuan Hukum), dan DP3AK (Dinas Pemberdayaan Perempuan dan Perlindungan Anak Kependudukan dan Keluarga Berencana) adalah lembaga yang bisa membantu remaja yang menghadapi paksaan pernikahan.",
    },
    incorrect: {
      title: "Salah",
      message:
        "Ada banyak lembaga yang bisa membantu remaja yang menghadapi paksaan pernikahan, termasuk Komnas Perempuan, LBH, dan DP3AK. Kamu juga bisa menghubungi hotline PPPA di 129 atau Komnas Perempuan di +62-21-3903963.",
    },
  },
  5: {
    correct: {
      title: "Benar!",
      message:
        "Mencari bantuan dari orang dewasa yang dipercaya atau lembaga perlindungan anak adalah langkah yang tepat jika kamu merasa tertekan untuk menikah dini. Jangan ragu mencari bantuan, karena kamu tidak sendirian.",
    },
    incorrect: {
      title: "Salah",
      message:
        "Mencari bantuan dari orang dewasa yang dipercaya atau lembaga perlindungan anak adalah langkah yang tepat jika kamu merasa tertekan untuk menikah dini. Kamu bisa menghubungi guru, konselor, atau lembaga perlindungan anak terdekat.",
    },
  },
};

// Function to handle quiz option selection
function selectOption(questionNum, optionElement) {
  const options = document.querySelectorAll(
    `#question${questionNum} .quiz-option`
  );
  const isCorrect = optionElement.getAttribute("data-answer") === "true";

  // Disable all options
  options.forEach((opt) => {
    opt.disabled = true;
    opt.classList.remove("hover:border-brand-purple-300");
  });

  // Mark selected option
  optionElement.classList.add("selected");

  // Show feedback
  const feedbackElement = document.getElementById(`feedback${questionNum}`);
  const feedback = isCorrect
    ? feedbackMessages[questionNum].correct
    : feedbackMessages[questionNum].incorrect;

  feedbackElement.classList.remove("hidden");
  feedbackElement.classList.add(
    isCorrect ? "bg-green-50" : "bg-red-50",
    "border",
    isCorrect ? "border-green-200" : "border-red-200"
  );

  feedbackElement.querySelector("p.font-semibold").textContent = feedback.title;
  feedbackElement.querySelector("p.text-sm").textContent = feedback.message;

  // Mark correct/incorrect
  if (isCorrect) {
    optionElement.classList.add("correct");
    score++;
    document.getElementById("quizScore").textContent = score;
  } else {
    optionElement.classList.add("incorrect");
    // Show correct answer
    options.forEach((opt) => {
      if (opt.getAttribute("data-answer") === "true") {
        opt.classList.add("correct");
      }
    });
  }

  // Enable next button
  if (questionNum < totalQuestions) {
    document.getElementById(`next${questionNum}`).disabled = false;
  } else {
    document.getElementById("finishQuiz").disabled = false;
  }
}

// Function to show question
function showQuestion(questionNum) {
  // Hide all questions
  for (let i = 1; i <= totalQuestions; i++) {
    document.getElementById(`question${i}`).classList.add("hidden");
  }

  // Show current question
  document.getElementById(`question${questionNum}`).classList.remove("hidden");

  // Update progress bar
  const progress = (questionNum / totalQuestions) * 100;
  document.getElementById("quizProgress").style.width = `${progress}%`;

  currentQuestion = questionNum;
}

// Function to show quiz results
function showQuizResults() {
  // Hide all questions
  for (let i = 1; i <= totalQuestions; i++) {
    document.getElementById(`question${i}`).classList.add("hidden");
  }

  // Show results
  document.getElementById("quizResults").classList.remove("hidden");
  document.getElementById("finalScore").textContent = score;

  // Set message based on score
  let message = "";
  if (score === totalQuestions) {
    message =
      "Luar biasa! Kamu sudah memahami hak-hakmu dengan sangat baik. Teruslah berbagi pengetahuan ini dengan teman-temanmu!";
  } else if (score >= totalQuestions * 0.7) {
    message =
      "Bagus! Kamu sudah memiliki pemahaman yang baik tentang hak-hakmu. Teruslah belajar untuk meningkatkan pengetahuanmu.";
  } else if (score >= totalQuestions * 0.4) {
    message =
      "Kamu sudah mengetahui beberapa hal tentang hak-hakmu, namun masih banyak yang perlu kamu pelajari. Jangan ragu untuk membaca artikel dan menonton video edukasi di halaman ini.";
  } else {
    message =
      "Masih banyak yang perlu kamu pelajari tentang hak-hakmu. Kami sarankan untuk membaca artikel dan menonton video edukasi di halaman ini untuk meningkatkan pemahamanmu.";
  }

  document.getElementById("scoreMessage").textContent = message;
}

// Function to reset quiz
function resetQuiz() {
  score = 0;
  document.getElementById("quizScore").textContent = score;

  // Reset all options
  for (let i = 1; i <= totalQuestions; i++) {
    const options = document.querySelectorAll(`#question${i} .quiz-option`);
    options.forEach((opt) => {
      opt.disabled = false;
      opt.classList.remove("selected", "correct", "incorrect");
      opt.classList.add("hover:border-brand-purple-300");
    });

    // Hide feedback
    document.getElementById(`feedback${i}`).classList.add("hidden");

    // Disable next button
    if (i < totalQuestions) {
      document.getElementById(`next${i}`).disabled = true;
    } else {
      document.getElementById("finishQuiz").disabled = true;
    }
  }

  // Hide results and show first question
  document.getElementById("quizResults").classList.add("hidden");
  showQuestion(1);
}

// Add event listeners to quiz options
for (let i = 1; i <= totalQuestions; i++) {
  const options = document.querySelectorAll(`#question${i} .quiz-option`);
  options.forEach((option) => {
    option.addEventListener("click", () => selectOption(i, option));
  });

  // Add event listeners to navigation buttons
  if (i > 1) {
    document
      .getElementById(`prev${i}`)
      .addEventListener("click", () => showQuestion(i - 1));
  }

  if (i < totalQuestions) {
    document
      .getElementById(`next${i}`)
      .addEventListener("click", () => showQuestion(i + 1));
  }
}

// Add event listener to finish button
document
  .getElementById("finishQuiz")
  .addEventListener("click", showQuizResults);

// Add event listener to retry button
document.getElementById("retryQuiz").addEventListener("click", resetQuiz);
