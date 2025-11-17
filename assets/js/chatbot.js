// DOM Elements
const chatMessages = document.getElementById('chatMessages');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const quickTopicBtns = document.querySelectorAll('.quick-topic');

// Bot Responses
const botResponses = {
  greeting: [
    "Hai! Selamat datang di SiANAK. Aku di sini untuk mendengarkan dan membantumu. Kamu bisa cerita apa saja, dan semua yang kamu sampaikan akan tetap rahasia. Bagaimana kabarmu hari ini? 😊",
    "Selamat datang! Aku adalah asisten virtual SiANAK. Aku siap mendengarkan apa pun yang ingin kamu bagikan. Semua percakapan kita sepenuhnya anonim. Ada yang bisa aku bantu?",
    "Halo! Terima kasih sudah menghubungi SiANAK. Jangan ragu untuk berbagi apa yang kamu rasakan. Aku di sini untukmu. Bagaimana perasaanmu sekarang?"
  ],
  marriage: [
    "Aku mengerti betapa sulitnya berada dalam situasi ini. Tekanan untuk menikah saat belum siap adalah hal yang berat. Kamu punya hak untuk menentukan masa depanmu sendiri. Apa yang membuatmu merasa tertekan?",
    "Pernikahan adalah keputusan besar yang akan mempengaruhi masa depanmu. Penting untuk menikah hanya ketika kamu benar-benar siap. Apa yang membuatmu memikirkan pernikahan sekarang?",
    "Aku sangat prihatin mendengar situasimu. Pernikahan paksa adalah pelanggaran hak asasi manusia. Kamu punya hak untuk menolak. Apakah kamu merasa aman sekarang?"
  ],
  education: [
    "Pendidikan adalah hak setiap anak, termasuk kamu. Tidak ada yang boleh menghalangimu untuk mengejar impianmu melalui pendidikan. Apa kendala yang kamu hadapi sekarang?",
    "Aku mendukung keputusanmu untuk terus belajar. Pendidikan adalah investasi terbaik untuk masa depanmu. Apa yang membuatmu khawatir tentang pendidikanmu?",
    "Teruslah bersekolah, ya! Pendidikan akan membuka banyak peluang untukmu. Apakah ada kesulitan dalam belajar yang ingin kamu bagikan?"
  ],
  family: [
    "Keluarga seharusnya menjadi tempat yang aman dan mendukung. Aku mengerti jika situasi di rumah terasa sulit. Apa yang terjadi dengan keluargamu?",
    "Hubungan dengan keluarga bisa terasa rumit, terutama saat ada perbedaan pendapat. Aku di sini untuk mendengarkan. Ceritakan lebih banyak jika kamu merasa nyaman.",
    "Aku memahami bahwa masalah keluarga bisa sangat menyakitkan. Apa yang membuatmu merasa tidak nyaman dengan keluargamu?"
  ],
  relationship: [
    "Hubungan bisa membawa kebahagiaan, tapi juga tantangan. Apa yang sedang kamu alami dalam hubunganmu?",
    "Aku mendengarmu. Hubungan yang sehat harus didasarkan pada saling menghormati dan memahami. Apa yang membuatmu khawatir tentang hubunganmu?",
    "Terima kasih sudah mempercayai aku dengan ceritamu. Hubungan bisa rumit, apalagi saat kamu masih muda. Apa yang ingin kamu tanyakan tentang hubungan?"
  ],
  help: [
    "Ada banyak sumber bantuan yang bisa kamu hubungi. Kamu bisa menghubungi Komnas Perempuan di +62-21-3903963, atau mencari layanan perlindungan perempuan dan anak di daerahmu. Apakah kamu ingin aku bantu menemukan kontak bantuan di wilayahmu?",
    "Penting untuk mencari bantuan saat membutuhkannya. Ada beberapa opsi: Komnas Perempuan (+62-21-3903963), layanan perlindungan anak di daerahmu, atau konselor sekolah. Apakah kamu merasa dalam situasi darurat atau hanya ingin berkonsultasi?",
    "Aku senang kamu mencari bantuan. Selain chat ini, kamu bisa menghubungi hotline perlindungan anak atau perempuan di daerahmu. Apakah kamu ingin aku bantu menemukan informasi kontak layanan bantuan terdekat?"
  ],
  emotional: {
    sad: "Aku mendengarmu dan aku di sini untukmu. Sedih itu wajar, jangan menahan perasaanmu. Apa yang membuatmu merasa sedih?",
    angry: "Aku mengerti kemarahanmu. Marah adalah respons alami saat kita merasa tidak adil atau frustrasi. Apa yang membuatmu marah?",
    fear: "Aku mengerti rasa takutmu. Takut adalah respons alami terhadap ancaman atau ketidakpastian. Apa yang membuatmu merasa takut?",
    happy: "Aku senang mendengar kamu merasa bahagia! Ceritakan lebih banyak tentang hal yang membuatmu gembira."
  },
  default: [
    "Terima kasih sudah berbagi. Aku di sini untuk mendengarkan lebih banyak jika kamu mau cerita.",
    "Aku mengerti. Ceritakan lebih banyak jika kamu merasa nyaman.",
    "Terima kasih telah mempercayai aku dengan ceritamu. Ada lagi yang ingin kamu bagikan?"
  ]
};

// State variables
let isGreetingDisplayed = false;
let conversationStarted = false;

// Initialize chat
document.addEventListener('DOMContentLoaded', function() {
  // Only display welcome message once
  if (!isGreetingDisplayed) {
    isGreetingDisplayed = true;
  }
});

// Event Listeners
sendBtn.addEventListener('click', sendMessage);

messageInput.addEventListener('keydown', function(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

messageInput.addEventListener('input', function() {
  this.style.height = 'auto';
  this.style.height = Math.min(this.scrollHeight, 120) + 'px';
});

quickTopicBtns.forEach(button => {
  button.addEventListener('click', function() {
    const topic = this.getAttribute('data-topic');
    messageInput.value = topic;
    sendMessage();
  });
});

// Functions
function sendMessage() {
  const message = messageInput.value.trim();

  if (message === '') return;

  // Mark conversation as started
  if (!conversationStarted) {
    conversationStarted = true;
  }

  // Add user message
  addMessage(message, true);

  // Clear input
  messageInput.value = '';
  messageInput.style.height = 'auto';

  // Disable send button
  sendBtn.disabled = true;

  // Show typing indicator
  const typingIndicator = showTypingIndicator();

  // Simulate bot response delay
  setTimeout(() => {
    // Remove typing indicator
    typingIndicator.remove();

    // Add bot response
    const response = getBotResponse(message);
    addMessage(response, false);

    // Re-enable send button
    sendBtn.disabled = false;
    messageInput.focus();
  }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
}

function addMessage(message, isUser = false) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `flex gap-3 ${isUser ? 'justify-end' : 'animate-slide-up'}`;

  if (isUser) {
    messageDiv.innerHTML = `
      <div class="flex-1 max-w-[80%]">
        <div class="bg-gradient-to-r from-brand-purple-600 to-brand-purple-700 text-white rounded-2xl rounded-tr-none p-3 sm:p-4 shadow-md">
          <p class="text-sm sm:text-base leading-relaxed">${message}</p>
        </div>
        <span class="text-xs text-gray-500 mt-1 block text-right">${getCurrentTime()}</span>
      </div>
      <div class="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-brand-purple-500 to-brand-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
        <svg class="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>
    `;
  } else {
    messageDiv.innerHTML = `
      <div class="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-brand-purple-500 to-brand-teal-500 rounded-xl flex items-center justify-center flex-shrink-0">
        <svg class="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </div>
      <div class="flex-1">
        <div class="bg-gradient-to-br from-brand-purple-50 to-brand-teal-50 rounded-2xl rounded-tl-none p-3 sm:p-4 border border-brand-purple-100">
          <p class="text-sm sm:text-base text-gray-800 leading-relaxed">${message}</p>
        </div>
        <span class="text-xs text-gray-500 mt-1 block">${getCurrentTime()}</span>
      </div>
    `;
  }

  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTypingIndicator() {
  const typingDiv = document.createElement('div');
  typingDiv.className = 'flex gap-3 typing-indicator-container';
  typingDiv.innerHTML = `
    <div class="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-brand-purple-500 to-brand-teal-500 rounded-xl flex items-center justify-center flex-shrink-0">
      <svg class="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    </div>
    <div class="flex-1">
      <div class="bg-gradient-to-br from-brand-purple-50 to-brand-teal-50 rounded-2xl rounded-tl-none p-3 sm:p-4 border border-brand-purple-100">
        <div class="typing-indicator flex gap-1">
          <span class="w-2 h-2 bg-gray-400 rounded-full"></span>
          <span class="w-2 h-2 bg-gray-400 rounded-full"></span>
          <span class="w-2 h-2 bg-gray-400 rounded-full"></span>
        </div>
      </div>
    </div>
  `;

  chatMessages.appendChild(typingDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  return typingDiv;
}

function getBotResponse(userMessage) {
  const lowerMessage = userMessage.toLowerCase();

  // Check for greetings (but only respond if conversation has started)
  if (conversationStarted && (lowerMessage.includes('hai') || lowerMessage.includes('halo') || lowerMessage.includes('pagi') || lowerMessage.includes('siang') || lowerMessage.includes('sore') || lowerMessage.includes('malam'))) {
    return botResponses.greeting[Math.floor(Math.random() * botResponses.greeting.length)];
  }

  // Check for specific topics
  if (lowerMessage.includes('pernikahan') || lowerMessage.includes('nikah') || lowerMessage.includes('kawin')) {
    return botResponses.marriage[Math.floor(Math.random() * botResponses.marriage.length)];
  }

  if (lowerMessage.includes('sekolah') || lowerMessage.includes('belajar') || lowerMessage.includes('pendidikan')) {
    return botResponses.education[Math.floor(Math.random() * botResponses.education.length)];
  }

  if (lowerMessage.includes('keluarga') || lowerMessage.includes('orang tua') || lowerMessage.includes('ortu')) {
    return botResponses.family[Math.floor(Math.random() * botResponses.family.length)];
  }

  if (lowerMessage.includes('pacar') || lowerMessage.includes('hubungan') || lowerMessage.includes('cinta')) {
    return botResponses.relationship[Math.floor(Math.random() * botResponses.relationship.length)];
  }

  if (lowerMessage.includes('bantuan') || lowerMessage.includes('tolong') || lowerMessage.includes('help')) {
    return botResponses.help[Math.floor(Math.random() * botResponses.help.length)];
  }

  // Check for emotions
  if (lowerMessage.includes('sedih') || lowerMessage.includes('murung') || lowerMessage.includes('nangis')) {
    return botResponses.emotional.sad;
  }

  if (lowerMessage.includes('marah') || lowerMessage.includes('kesal') || lowerMessage.includes('benci')) {
    return botResponses.emotional.angry;
  }

  if (lowerMessage.includes('takut') || lowerMessage.includes('khawatir') || lowerMessage.includes('cemas')) {
    return botResponses.emotional.fear;
  }

  if (lowerMessage.includes('senang') || lowerMessage.includes('bahagia') || lowerMessage.includes('gembira')) {
    return botResponses.emotional.happy;
  }

  // Default response
  return botResponses.default[Math.floor(Math.random() * botResponses.default.length)];
}

function getCurrentTime() {
  const now = new Date();
  return now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
}
