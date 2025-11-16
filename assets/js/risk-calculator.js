// Assessment Data Structure
const questions = [
  {
    id: 1,
    text: "Berapa usiamu sekarang?",
    desc: "Usia adalah salah satu faktor penting dalam menentukan kesiapan menikah",
    options: [
      { text: "18 tahun atau lebih", score: 1, weight: 1.5 },
      { text: "17 tahun", score: 2, weight: 1.5 },
      { text: "16 tahun", score: 3, weight: 1.5 },
      { text: "15 tahun atau kurang", score: 4, weight: 1.5 },
    ],
  },
  {
    id: 2,
    text: "Bagaimana status pendidikanmu saat ini?",
    desc: "Pendidikan memberi kamu lebih banyak pilihan untuk masa depan",
    options: [
      {
        text: "Masih sekolah dan ingin lanjut kuliah",
        score: 1,
        weight: 1.3,
      },
      { text: "Masih sekolah tapi ragu lanjut", score: 2, weight: 1.3 },
      {
        text: "Sudah putus sekolah tapi ingin kembali",
        score: 3,
        weight: 1.3,
      },
      {
        text: "Sudah putus sekolah dan tidak berencana kembali",
        score: 4,
        weight: 1.3,
      },
    ],
  },
  {
    id: 3,
    text: "Bagaimana kondisi ekonomi keluargamu?",
    desc: "Kondisi ekonomi bukan alasan untuk menikah dini",
    options: [
      {
        text: "Cukup/mampu membiayai kebutuhan sehari-hari",
        score: 1,
        weight: 1.2,
      },
      {
        text: "Kadang kesulitan tapi masih bisa bertahan",
        score: 2,
        weight: 1.2,
      },
      { text: "Sering kesulitan keuangan", score: 3, weight: 1.2 },
      {
        text: "Sangat sulit, sering tidak bisa makan",
        score: 4,
        weight: 1.2,
      },
    ],
  },
  {
    id: 4,
    text: "Apakah ada yang membicarakan/merencanakan pernikahanmu?",
    desc: "Kamu punya hak untuk menolak dan memilih waktu yang tepat",
    options: [
      { text: "Tidak ada sama sekali", score: 1, weight: 1.8 },
      {
        text: "Pernah disinggung tapi tidak serius",
        score: 2,
        weight: 1.8,
      },
      {
        text: "Sering dibicarakan keluarga/tetangga",
        score: 3,
        weight: 1.8,
      },
      {
        text: "Sudah ada rencana konkret/sudah dijodohkan",
        score: 4,
        weight: 1.8,
      },
    ],
  },
  {
    id: 5,
    text: "Apakah kamu tahu hak-hakmu terkait pernikahan?",
    desc: "Pengetahuan adalah kekuatan untuk melindungi dirimu",
    options: [
      {
        text: "Ya, aku tahu usia minimal menikah dan hak menolak",
        score: 1,
        weight: 1.0,
      },
      { text: "Tahu sedikit tapi tidak yakin", score: 2, weight: 1.0 },
      { text: "Tidak terlalu tahu", score: 3, weight: 1.0 },
      { text: "Tidak tahu sama sekali", score: 4, weight: 1.0 },
    ],
  },
  {
    id: 6,
    text: "Apakah kamu punya teman/guru/orang dewasa yang bisa dipercaya?",
    desc: "Support system sangat penting saat kamu butuh bantuan",
    options: [
      {
        text: "Ya, ada beberapa orang yang bisa kupercaya",
        score: 1,
        weight: 1.1,
      },
      { text: "Ada tapi tidak terlalu dekat", score: 2, weight: 1.1 },
      { text: "Tidak banyak yang bisa kupercaya", score: 3, weight: 1.1 },
      { text: "Tidak ada sama sekali", score: 4, weight: 1.1 },
    ],
  },
  {
    id: 7,
    text: "Bagaimana pandangan keluargamu tentang pernikahan anak?",
    desc: "Pandangan keluarga mempengaruhi tekanan yang kamu hadapi",
    options: [
      { text: "Mendukung aku untuk sekolah dulu", score: 1, weight: 1.4 },
      { text: "Netral/belum membicarakan", score: 2, weight: 1.4 },
      {
        text: "Kadang menyinggung agar cepat menikah",
        score: 3,
        weight: 1.4,
      },
      {
        text: "Mendesak/memaksa untuk segera menikah",
        score: 4,
        weight: 1.4,
      },
    ],
  },
  {
    id: 8,
    text: "Apakah ada tekanan dari lingkungan sekitar (tetangga/teman)?",
    desc: "Tekanan sosial bisa membuat kamu merasa terpojok",
    options: [
      { text: "Tidak ada tekanan", score: 1, weight: 1.0 },
      {
        text: "Kadang ada komentar tapi tidak serius",
        score: 2,
        weight: 1.0,
      },
      {
        text: "Sering dikomentar/dibanding-bandingkan",
        score: 3,
        weight: 1.0,
      },
      {
        text: "Tekanan sangat kuat dari banyak pihak",
        score: 4,
        weight: 1.0,
      },
    ],
  },
  {
    id: 9,
    text: "Apakah kamu punya cita-cita/rencana untuk masa depan?",
    desc: "Cita-cita memberimu motivasi untuk terus maju",
    options: [
      {
        text: "Ya, aku punya rencana jelas dan termotivasi",
        score: 1,
        weight: 0.9,
      },
      { text: "Ada tapi belum terlalu yakin", score: 2, weight: 0.9 },
      { text: "Bingung mau apa kedepannya", score: 3, weight: 0.9 },
      {
        text: "Tidak punya rencana/merasa tidak ada pilihan",
        score: 4,
        weight: 0.9,
      },
    ],
  },
  {
    id: 10,
    text: "Jika ada yang memaksamu menikah, apa yang akan kamu lakukan?",
    desc: "Respon kamu menunjukkan tingkat kesiapan menghadapi tekanan",
    options: [
      {
        text: "Aku akan menolak tegas dan mencari bantuan",
        score: 1,
        weight: 1.3,
      },
      {
        text: "Aku akan mencoba menolak tapi tidak yakin berhasil",
        score: 2,
        weight: 1.3,
      },
      { text: "Aku tidak tahu harus bagaimana", score: 3, weight: 1.3 },
      { text: "Aku mungkin akan mengikuti saja", score: 4, weight: 1.3 },
    ],
  },
];

// State Management
let currentQuestion = 0;
let answers = {};
let totalScore = 0;

// DOM Elements
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const questionNumber = document.getElementById("questionNumber");
const questionText = document.getElementById("questionText");
const questionDesc = document.getElementById("questionDesc");
const optionsContainer = document.getElementById("optionsContainer");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const questionCard = document.getElementById("questionCard");
const resultCard = document.getElementById("resultCard");

// Initialize Assessment
function init() {
  renderQuestion();
  updateProgress();
}

// Render Current Question
function renderQuestion() {
  const q = questions[currentQuestion];

  questionNumber.textContent = currentQuestion + 1;
  questionText.textContent = q.text;
  questionDesc.textContent = q.desc;

  optionsContainer.innerHTML = "";
  q.options.forEach((option, index) => {
    const isSelected = answers[q.id] === index;
    const optionBtn = document.createElement("button");
    optionBtn.className = `w-full text-left p-3 sm:p-4 rounded-xl border-2 transition-all duration-300 ${
      isSelected
        ? "border-brand-purple-600 bg-brand-purple-50"
        : "border-gray-200 hover:border-brand-purple-300 hover:bg-gray-50"
    }`;
    optionBtn.innerHTML = `
          <div class="flex items-center gap-2 sm:gap-3">
            <div class="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 ${
              isSelected
                ? "border-brand-purple-600 bg-brand-purple-600"
                : "border-gray-300"
            } flex items-center justify-center flex-shrink-0">
              ${
                isSelected
                  ? '<div class="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white rounded-full"></div>'
                  : ""
              }
            </div>
            <span class="font-medium text-sm sm:text-base text-gray-800 break-words">${option.text}</span>
          </div>
        `;
    optionBtn.onclick = () => selectOption(index);
    optionsContainer.appendChild(optionBtn);
  });

  prevBtn.disabled = currentQuestion === 0;
  nextBtn.disabled = answers[q.id] === undefined;
}

// Select Option - NO AUTO SCROLL
function selectOption(index) {
  const q = questions[currentQuestion];
  answers[q.id] = index;
  renderQuestion();
  // Removed auto-scroll - stay in place when selecting option
}

// Update Progress
function updateProgress() {
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  progressBar.style.width = `${progress}%`;
  progressText.textContent = `${currentQuestion + 1}/${questions.length}`;
}

// Next Question - Scroll to question card only
nextBtn.onclick = () => {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    renderQuestion();
    updateProgress();
  } else {
    calculateResult();
  }
};

// Previous Question - Scroll to question card only
prevBtn.onclick = () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    renderQuestion();
    updateProgress();
    // Smooth scroll to question card, not to top of page
    questionCard.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

// Calculate Final Score
function calculateResult() {
  totalScore = 0;
  let maxScore = 0;

  questions.forEach((q) => {
    const answerIndex = answers[q.id];
    if (answerIndex !== undefined) {
      const option = q.options[answerIndex];
      totalScore += option.score * option.weight;
      maxScore += 4 * option.weight;
    }
  });

  const normalizedScore = (totalScore / maxScore) * 9 + 1;
  const finalScore = Math.round(normalizedScore * 10) / 10;

  displayResult(finalScore);
}

// Display Result
function displayResult(score) {
  questionCard.classList.add("hidden");
  resultCard.classList.remove("hidden");

  let category, color, bgColor, icon, message, recommendations;

  if (score <= 3.3) {
    category = "Risiko Rendah";
    color = "text-status-success-600";
    bgColor = "from-status-success-50 to-status-success-100";
    icon = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />`;
    message =
      "Kamu berada dalam kondisi yang relatif aman! Tetap pertahankan situasi positif ini dan terus fokus pada pendidikan dan cita-citamu.";
    recommendations = [
      {
        title: "Terus Belajar",
        desc: "Fokus pada pendidikan dan kembangkan skill yang kamu minati",
      },
      {
        title: "Perluas Wawasan",
        desc: "Ikuti program edukasi tentang hak-hak remaja dan kesehatan reproduksi",
      },
      {
        title: "Bangun Network",
        desc: "Pertahankan hubungan baik dengan teman dan mentor yang positif",
      },
      {
        title: "Stay Informed",
        desc: "Tetap update tentang hak-hakmu dan sumber bantuan yang tersedia",
      },
    ];
  } else if (score <= 6.6) {
    category = "Risiko Sedang";
    color = "text-status-warning-600";
    bgColor = "from-status-warning-50 to-status-warning-100";
    icon = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />`;
    message =
      "Ada beberapa faktor yang perlu kamu perhatikan. Kamu tidak sendirian - ada banyak dukungan yang bisa membantu memperkuat posisimu.";
    recommendations = [
      {
        title: "Cari Support System",
        desc: "Bicara dengan guru, konselor, atau orang dewasa yang kamu percaya",
      },
      {
        title: "Pelajari Hak-Hakmu",
        desc: "Ketahui bahwa kamu punya hak untuk menolak dan memilih kapan menikah",
      },
      {
        title: "Hubungi Layanan Bantuan",
        desc: "Jangan ragu untuk menghubungi hotline atau lembaga bantuan",
      },
      {
        title: "Buat Rencana",
        desc: "Tetapkan tujuan jangka pendek dan panjang untuk masa depanmu",
      },
      {
        title: "Dokumentasikan",
        desc: "Catat semua tekanan atau pemaksaan yang kamu alami",
      },
    ];
  } else {
    category = "Risiko Tinggi";
    color = "text-status-danger-600";
    bgColor = "from-status-danger-50 to-status-danger-100";
    icon = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />`;
    message =
      "Kondisimu memerlukan perhatian serius. KAMU TIDAK SENDIRIAN! Ada banyak orang dan lembaga yang siap membantu melindungi hak-hakmu.";
    recommendations = [
      {
        title: "SEGERA Cari Bantuan",
        desc: "Hubungi hotline, LBH, atau lembaga perlindungan anak SEKARANG",
      },
      {
        title: "Bicara dengan Orang Dewasa Terpercaya",
        desc: "Guru, konselor sekolah, atau tetangga yang bisa membantu",
      },
      {
        title: "Ketahui Hak Legal",
        desc: "UU melarang pernikahan di bawah 19 tahun - kamu dilindungi hukum",
      },
      {
        title: "Dokumentasi Lengkap",
        desc: "Catat semua pemaksaan, ancaman, atau tekanan yang kamu terima",
      },
      {
        title: "Jangan Putus Asa",
        desc: "Banyak remaja yang berhasil keluar dari situasi ini dengan bantuan yang tepat",
      },
      {
        title: "Akses Shelter",
        desc: "Jika terancam, ada rumah aman yang bisa melindungimu",
      },
    ];
  }

  resultCard.innerHTML = `
        <div class="bg-white rounded-2xl sm:rounded-4xl p-4 sm:p-6 md:p-8 shadow-xl border border-gray-100 animate-scale-in">
          <div class="text-center mb-6 sm:mb-8">
            <div class="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br ${bgColor} rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 sm:w-10 sm:h-10 ${color}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                ${icon}
              </svg>
            </div>
            <h2 class="text-2xl sm:text-3xl font-black mb-2">Hasil Assessment</h2>
            <div class="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r ${bgColor} rounded-full border-2 border-gray-200">
              <span class="text-xl sm:text-2xl font-black ${color}">${score.toFixed(
    1
  )}/10</span>
              <span class="text-base sm:text-lg font-semibold ${color}">${category}</span>
            </div>
          </div>

          <div class="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8">
            <p class="text-base sm:text-lg text-gray-700 leading-relaxed text-center break-words">${message}</p>
          </div>

          <div class="mb-6 sm:mb-8">
            <h3 class="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 sm:w-6 sm:h-6 text-brand-purple-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span class="break-words">Rekomendasi untuk Kamu</span>
            </h3>
            <div class="space-y-2 sm:space-y-3">
              ${recommendations
                .map(
                  (rec) => `
                <div class="flex gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-xl border border-gray-200 hover:border-brand-purple-300 transition-all">
                  <div class="w-7 h-7 sm:w-8 sm:h-8 bg-brand-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg class="w-4 h-4 sm:w-5 sm:h-5 text-brand-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div class="flex-1 min-w-0">
                    <h4 class="font-bold text-sm sm:text-base text-gray-800 mb-1 break-words">${rec.title}</h4>
                    <p class="text-xs sm:text-sm text-gray-600 break-words">${rec.desc}</p>
                  </div>
                </div>
              `
                )
                .join("")}
            </div>
          </div>

          ${
            score > 6.6
              ? `
          <div class="bg-status-danger-50 border-2 border-status-danger-500 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8">
            <div class="flex items-start gap-2 sm:gap-3">
              <svg class="w-5 h-5 sm:w-6 sm:h-6 text-status-danger-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div class="flex-1 min-w-0">
                <h4 class="font-bold text-sm sm:text-base text-status-danger-700 mb-2">⚠️ Peringatan Penting</h4>
                <p class="text-xs sm:text-sm text-status-danger-700 mb-3 break-words">
                  Jika kamu merasa dalam bahaya atau dipaksa menikah, SEGERA hubungi:
                </p>
                <div class="space-y-2">
                  <a href="tel:+62-21-3903963" class="flex items-center gap-2 text-xs sm:text-sm font-semibold text-status-danger-700 hover:text-status-danger-800 break-all">
                    📞 Komnas Perempuan: +62-21-3903963
                  </a>
                  <a href="tel:129" class="flex items-center gap-2 text-xs sm:text-sm font-semibold text-status-danger-700 hover:text-status-danger-800">
                    📞 Hotline Kementerian PPPA: 129
                  </a>
                </div>
              </div>
            </div>
          </div>
          `
              : ""
          }

          <div class="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <a href="/pages/contacts.html" class="flex-1 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-brand-purple-600 to-brand-purple-700 text-white text-sm sm:text-base font-bold rounded-xl hover:from-brand-purple-700 hover:to-brand-purple-800 transition-all duration-300 shadow-lg hover:scale-105 text-center">
              Lihat Kontak Bantuan
            </a>
            <a href="/pages/chatbot.html" class="flex-1 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-brand-teal-600 to-brand-teal-700 text-white text-sm sm:text-base font-bold rounded-xl hover:from-brand-teal-700 hover:to-brand-teal-800 transition-all duration-300 shadow-lg hover:scale-105 text-center">
              Chat dengan Kami
            </a>
          </div>

          <div class="mt-4 sm:mt-6 text-center">
            <button onclick="resetAssessment()" class="text-sm sm:text-base text-gray-600 hover:text-brand-purple-600 font-semibold underline">
              Ulangi Assessment
            </button>
          </div>
        </div>

        <div class="mt-6 sm:mt-8 bg-brand-purple-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-brand-purple-200">
          <div class="flex items-start gap-3 sm:gap-4">
            <svg class="w-5 h-5 sm:w-6 sm:h-6 text-brand-purple-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div class="text-xs sm:text-sm text-gray-700 flex-1 min-w-0">
              <p class="font-semibold mb-2">Catatan Penting:</p>
              <ul class="space-y-1 list-disc list-inside break-words">
                <li>Hasil ini bersifat indikasi dan bukan diagnosis profesional</li>
                <li>Data kamu 100% anonim dan tidak disimpan di server manapun</li>
                <li>Untuk konsultasi lebih lanjut, hubungi profesional atau lembaga bantuan</li>
              </ul>
            </div>
          </div>
        </div>
      `;

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Reset Assessment
function resetAssessment() {
  currentQuestion = 0;
  answers = {};
  totalScore = 0;
  questionCard.classList.remove("hidden");
  resultCard.classList.add("hidden");
  resultCard.innerHTML = "";
  init();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Initialize on load
init();
