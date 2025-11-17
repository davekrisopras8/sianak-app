// DOM Elements
const searchInput = document.getElementById('searchInput');
const regencyFilter = document.getElementById('regencyFilter');
const typeFilter = document.getElementById('typeFilter');
const resetFiltersBtn = document.getElementById('resetFilters');
const contactsList = document.getElementById('contactsList');
const loadingState = document.getElementById('loadingState');
const noResults = document.getElementById('noResults');
const resultsCount = document.getElementById('resultsCount');
const totalContacts = document.getElementById('totalContacts');

// State
let contactsData = [];
let filteredContacts = [];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  loadContacts();
  setupEventListeners();
});

// Load contacts data
async function loadContacts() {
  try {
    loadingState.classList.remove('hidden');
    contactsList.classList.add('hidden');
    noResults.classList.add('hidden');

    const response = await fetch('/assets/data/contacts.json');
    const data = await response.json();

    contactsData = data.contacts;
    filteredContacts = [...contactsData];

    populateRegencyFilter(data.regencies);
    renderContacts();

    loadingState.classList.add('hidden');
    contactsList.classList.remove('hidden');

    totalContacts.textContent = contactsData.length;
    resultsCount.textContent = filteredContacts.length;
  } catch (error) {
    console.error('Error loading contacts:', error);
    loadingState.classList.add('hidden');
    showError();
  }
}

// Setup event listeners
function setupEventListeners() {
  searchInput.addEventListener('input', filterContacts);
  regencyFilter.addEventListener('change', filterContacts);
  typeFilter.addEventListener('change', filterContacts);
  resetFiltersBtn.addEventListener('click', resetFilters);
}

// Populate regency filter dropdown
function populateRegencyFilter(regencies) {
  regencies.sort().forEach(regency => {
    const option = document.createElement('option');
    option.value = regency;
    option.textContent = regency;
    regencyFilter.appendChild(option);
  });
}

// Filter contacts based on search and filters
function filterContacts() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedRegency = regencyFilter.value;
  const selectedType = typeFilter.value;

  filteredContacts = contactsData.filter(contact => {
    const matchesSearch = !searchTerm ||
      contact.name.toLowerCase().includes(searchTerm) ||
      contact.regency.toLowerCase().includes(searchTerm) ||
      contact.description.toLowerCase().includes(searchTerm);

    const matchesRegency = !selectedRegency || contact.regency === selectedRegency;
    const matchesType = !selectedType || contact.type === selectedType;

    return matchesSearch && matchesRegency && matchesType;
  });

  renderContacts();
  resultsCount.textContent = filteredContacts.length;
}

// Reset all filters
function resetFilters() {
  searchInput.value = '';
  regencyFilter.value = '';
  typeFilter.value = '';
  filteredContacts = [...contactsData];
  renderContacts();
  resultsCount.textContent = filteredContacts.length;
}

// Render contacts to the DOM
function renderContacts() {
  if (filteredContacts.length === 0) {
    contactsList.classList.add('hidden');
    noResults.classList.remove('hidden');
    return;
  }

  contactsList.classList.remove('hidden');
  noResults.classList.add('hidden');

  contactsList.innerHTML = '';

  filteredContacts.forEach((contact, index) => {
    const contactCard = createContactCard(contact, index);
    contactsList.appendChild(contactCard);
  });
}

// Create a contact card element
function createContactCard(contact, index) {
  const card = document.createElement('div');
  card.className = 'contact-card bg-white rounded-2xl p-6 shadow-lg border border-gray-100';
  card.setAttribute('data-aos', 'fade-up');
  card.setAttribute('data-aos-delay', (index % 9) * 50);

  const typeColor = getTypeColor(contact.type);
  const typeIcon = getTypeIcon(contact.type);

  card.innerHTML = `
    <div class="flex items-start justify-between mb-4">
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 bg-gradient-to-br ${typeColor} rounded-xl flex items-center justify-center shadow-lg">
          ${typeIcon}
        </div>
        <div>
          <h3 class="text-lg font-bold text-gray-800">${contact.name}</h3>
          <span class="inline-block px-2 py-1 text-xs font-semibold rounded-full ${getTypeBadgeColor(contact.type)}">
            ${contact.type}
          </span>
        </div>
      </div>
    </div>

    <p class="text-sm text-gray-600 mb-4">${contact.description}</p>

    <div class="space-y-3">
      <div class="flex items-start gap-3">
        <svg class="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span class="text-sm text-gray-600">${contact.address}</span>
      </div>

      <div class="flex items-center gap-3">
        <a href="tel:${contact.phone}" class="flex items-center gap-2 text-sm text-brand-purple-600 hover:text-brand-purple-700 font-medium">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          ${contact.phone}
        </a>
      </div>

      <div class="flex items-center gap-3">
        <a href="https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}" target="_blank" class="flex items-center gap-2 text-sm text-green-600 hover:text-green-700 font-medium">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          WhatsApp
        </a>
      </div>

      <div class="flex items-center gap-3">
        <a href="mailto:${contact.email}" class="flex items-center gap-2 text-sm text-brand-teal-600 hover:text-brand-teal-700 font-medium">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Email
        </a>
      </div>

      ${contact.website ? `
      <div class="flex items-center gap-3">
        <a href="${contact.website}" target="_blank" class="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
          Website
        </a>
      </div>
      ` : ''}
    </div>
  `;

  return card;
}

// Get type color gradient
function getTypeColor(type) {
  switch (type) {
    case 'DP3AK':
      return 'from-brand-purple-500 to-brand-purple-600';
    case 'LBH':
      return 'from-brand-teal-500 to-brand-teal-600';
    case 'P2TP2A':
      return 'from-pink-500 to-pink-600';
    case 'Komnas':
      return 'from-red-500 to-red-600';
    default:
      return 'from-gray-500 to-gray-600';
  }
}

// Get type badge color
function getTypeBadgeColor(type) {
  switch (type) {
    case 'DP3AK':
      return 'bg-brand-purple-100 text-brand-purple-700';
    case 'LBH':
      return 'bg-brand-teal-100 text-brand-teal-700';
    case 'P2TP2A':
      return 'bg-pink-100 text-pink-700';
    case 'Komnas':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
}

// Get type icon
function getTypeIcon(type) {
  switch (type) {
    case 'DP3AK':
      return `<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>`;
    case 'LBH':
      return `<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>`;
    case 'P2TP2A':
      return `<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>`;
    case 'Komnas':
      return `<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>`;
    default:
      return `<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>`;
  }
}

// Show error state
function showError() {
  contactsList.classList.add('hidden');
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
      Gagal memuat data kontak. Silakan coba lagi nanti.
    </p>
  `;

  contactsList.parentNode.appendChild(errorDiv);
}
