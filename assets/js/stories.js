// DOM Elements
const categoryFilter = document.getElementById('categoryFilter');
const regencyFilter = document.getElementById('regencyFilter');
const sortFilter = document.getElementById('sortFilter');
const resetFiltersBtn = document.getElementById('resetFilters');
const featuredStories = document.getElementById('featuredStories');
const storiesGrid = document.getElementById('storiesGrid');
const loadingState = document.getElementById('loadingState');
const noResults = document.getElementById('noResults');
const resultsCount = document.getElementById('resultsCount');
const storyModal = document.getElementById('storyModal');
const closeModal = document.getElementById('closeModal');
const shareStory = document.getElementById('shareStory');

// State
let storiesData = [];
let filteredStories = [];
let categoriesData = [];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  loadStories();
  setupEventListeners();
});

// Load stories data
async function loadStories() {
  try {
    loadingState.classList.remove('hidden');
    storiesGrid.classList.add('hidden');
    noResults.classList.add('hidden');

    const response = await fetch('/assets/data/stories.json');
    const data = await response.json();

    storiesData = data.stories;
    categoriesData = data.categories;

    populateFilters();
    renderFeaturedStories();
    filterAndRenderStories();

    loadingState.classList.add('hidden');
    storiesGrid.classList.remove('hidden');

    resultsCount.textContent = filteredStories.length;
  } catch (error) {
    console.error('Error loading stories:', error);
    loadingState.classList.add('hidden');
    showError();
  }
}

// Setup event listeners
function setupEventListeners() {
  categoryFilter.addEventListener('change', filterAndRenderStories);
  regencyFilter.addEventListener('change', filterAndRenderStories);
  sortFilter.addEventListener('change', filterAndRenderStories);
  resetFiltersBtn.addEventListener('click', resetFilters);
  closeModal.addEventListener('click', closeStoryModal);
  shareStory.addEventListener('click', shareCurrentStory);

  // Close modal when clicking outside
  storyModal.addEventListener('click', function(e) {
    if (e.target === storyModal) {
      closeStoryModal();
    }
  });
}

// Populate filter dropdowns
function populateFilters() {
  // Populate categories
  categoriesData.forEach(category => {
    const option = document.createElement('option');
    option.value = category.id;
    option.textContent = category.name;
    categoryFilter.appendChild(option);
  });

  // Populate regencies
  const regencies = [...new Set(storiesData.map(story => story.regency))];
  regencies.sort().forEach(regency => {
    const option = document.createElement('option');
    option.value = regency;
    option.textContent = regency;
    regencyFilter.appendChild(option);
  });
}

// Filter and render stories
function filterAndRenderStories() {
  const selectedCategory = categoryFilter.value;
  const selectedRegency = regencyFilter.value;
  const sortBy = sortFilter.value;

  // Filter stories
  filteredStories = storiesData.filter(story => {
    const matchesCategory = !selectedCategory || story.category === selectedCategory;
    const matchesRegency = !selectedRegency || story.regency === selectedRegency;
    return matchesCategory && matchesRegency;
  });

  // Sort stories
  switch (sortBy) {
    case 'newest':
      filteredStories.sort((a, b) => new Date(b.date) - new Date(a.date));
      break;
    case 'oldest':
      filteredStories.sort((a, b) => new Date(a.date) - new Date(b.date));
      break;
    case 'title':
      filteredStories.sort((a, b) => a.title.localeCompare(b.title));
      break;
  }

  renderStories();
  resultsCount.textContent = filteredStories.length;
}

// Reset filters
function resetFilters() {
  categoryFilter.value = '';
  regencyFilter.value = '';
  sortFilter.value = 'newest';
  filterAndRenderStories();
}

// Render featured stories
function renderFeaturedStories() {
  const featured = storiesData.filter(story => story.featured);

  featuredStories.innerHTML = featured.map((story, index) => {
    const category = categoriesData.find(cat => cat.id === story.category);

    return `
      <div class="story-card bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100" data-aos="fade-up" data-aos-delay="${index * 100}">
        <div class="relative">
          <img src="https://picsum.photos/seed/story${story.id}/600/300.jpg" alt="${story.title}" class="w-full h-48 object-cover">
          <div class="absolute top-4 left-4">
            <span class="px-3 py-1 bg-gradient-to-r ${category.color} text-white text-xs font-semibold rounded-full">
              ${category.name}
            </span>
          </div>
        </div>
        <div class="p-6">
          <h3 class="text-xl font-bold text-gray-800 mb-2">${story.title}</h3>
          <p class="text-gray-600 mb-4 line-clamp-3">${story.story}</p>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2 text-sm text-gray-500">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>${story.regency}</span>
            </div>
            <button onclick="openStoryModal(${story.id})" class="text-brand-purple-600 hover:text-brand-purple-700 font-semibold text-sm">
              Baca Selengkapnya →
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Render all stories
function renderStories() {
  if (filteredStories.length === 0) {
    storiesGrid.classList.add('hidden');
    noResults.classList.remove('hidden');
    return;
  }

  storiesGrid.classList.remove('hidden');
  noResults.classList.add('hidden');

  storiesGrid.innerHTML = filteredStories.map((story, index) => {
    const category = categoriesData.find(cat => cat.id === story.category);

    return `
      <div class="story-card bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100" data-aos="fade-up" data-aos-delay="${index * 50}">
        <div class="relative">
          <img src="https://picsum.photos/seed/story${story.id}/600/300.jpg" alt="${story.title}" class="w-full h-48 object-cover">
          <div class="absolute top-4 left-4">
            <span class="px-3 py-1 bg-gradient-to-r ${category.color} text-white text-xs font-semibold rounded-full">
              ${category.name}
            </span>
          </div>
        </div>
        <div class="p-6">
          <h3 class="text-xl font-bold text-gray-800 mb-2">${story.title}</h3>
          <p class="text-gray-600 mb-4 line-clamp-3">${story.story}</p>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2 text-sm text-gray-500">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>${story.regency}</span>
            </div>
            <button onclick="openStoryModal(${story.id})" class="text-brand-purple-600 hover:text-brand-purple-700 font-semibold text-sm">
              Baca Selengkapnya →
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Open story modal
function openStoryModal(storyId) {
  const story = storiesData.find(s => s.id === storyId);
  const category = categoriesData.find(cat => cat.id === story.category);

  // Populate modal content
  document.getElementById('modalTitle').textContent = story.title;
  document.getElementById('modalAuthor').textContent = story.name;
  document.getElementById('modalMeta').textContent = `${story.age} tahun • ${story.regency} • ${story.readTime} baca`;
  document.getElementById('modalCategory').textContent = category.name;
  document.getElementById('modalCategory').className = `inline-block px-3 py-1 rounded-full text-sm font-semibold mb-6 bg-gradient-to-r ${category.bgColor} text-white border ${category.borderColor}`;
  document.getElementById('modalStory').innerHTML = `<p>${story.story}</p>`;
  document.getElementById('modalOutcome').textContent = story.outcome;

  // Store current story for sharing
  storyModal.dataset.storyId = storyId;

  // Show modal
  storyModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Close story modal
function closeStoryModal() {
  storyModal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

// Share current story
function shareCurrentStory() {
  const storyId = parseInt(storyModal.dataset.storyId);
  const story = storiesData.find(s => s.id === storyId);

  if (navigator.share) {
    navigator.share({
      title: story.title,
      text: `Baca kisah inspiratif dari ${story.name} (${story.age} tahun, ${story.regency}) tentang perjuangan melawan pernikahan dini.`,
      url: window.location.href
    });
  } else {
    // Fallback for browsers that don't support Web Share API
    const shareText = `Baca kisah inspiratif dari ${story.name} (${story.age} tahun, ${story.regency}) tentang perjuangan melawan pernikahan dini.\n\n${story.title}\n${window.location.href}`;

    // Create temporary textarea to copy text
    const textarea = document.createElement('textarea');
    textarea.value = shareText;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    // Show success message
    alert('Link kisah berhasil disalin!');
  }
}

// Show error state
function showError() {
  storiesGrid.classList.add('hidden');
  noResults.classList.add('hidden');

  const errorDiv = document.createElement('div');
  errorDiv.className = 'text-center py-12';
  errorDiv.innerHTML = `
    <div class="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
      <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
    <h3 class="text-xl font-bold text-gray-800 mb-2">Terjadi Kesalahan</h3>
    <p class="text-gray-600 max-w-md mx-auto">
      Gagal memuat data kisah. Silakan coba lagi nanti.
    </p>
  `;

  storiesGrid.parentNode.appendChild(errorDiv);
}
