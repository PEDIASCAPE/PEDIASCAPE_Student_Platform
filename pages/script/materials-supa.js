import { supabase } from './supabase-client.js';
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const materialsGrid = document.getElementById('materialsGrid');
let allMaterials = [];
let grouped = {};
const itemsPerPage = 6;
const MATERIAL_SCHEMAS = [
  { group: 'Streams', key: 'engineering', label: 'Engineering' },
  { group: 'Streams', key: 'bba', label: 'BBA' },
  { group: 'Streams', key: 'bcom', label: 'BCOM' },
  { group: 'Streams', key: 'class-11-12', label: 'Class 11 & 12' },
  { group: 'School Boards', key: 'cbse', label: 'Central Board of Secondary Education (CBSE)' },
  { group: 'School Boards', key: 'cisce', label: 'Council for the Indian School Certificate Examinations (CISCE)' },
  { group: 'School Boards', key: 'nios', label: 'National Institute of Open Schooling (NIOS)' },
  { group: 'School Boards', key: 'bosse', label: 'Board of Open Schooling and Skill Education (BOSSE)' },
  { group: 'School Boards', key: 'ib', label: 'International Baccalaureate (IB)' },
  { group: 'School Boards', key: 'caie-igcse', label: 'Cambridge International (CAIE / IGCSE)' },
  { group: 'Courses', key: 'ai-ml', label: 'Artificial Intelligence & Machine Learning' },
  { group: 'Courses', key: 'data-science-analytics', label: 'Data Science & Analytics' },
  { group: 'Courses', key: 'cybersecurity', label: 'Cybersecurity' },
  { group: 'Courses', key: 'cloud-computing', label: 'Cloud Computing' },
  { group: 'Courses', key: 'software-development', label: 'Software Development' },
  { group: 'Courses', key: 'mba', label: 'MBA' },
  { group: 'Courses', key: 'bsc-cs-it', label: 'BSc Computer Science / IT' },
  { group: 'Courses', key: 'bsc-zoology', label: 'BSc Zoology' },
  { group: 'Courses', key: 'biotech-genetics-biomedical', label: 'Biotechnology / Genetics / Biomedical Sciences' },
  { group: 'Courses', key: 'ui-ux-design', label: 'UI/UX Design' },
  { group: 'Courses', key: 'animation-game-design', label: 'Animation & Game Design' },
  { group: 'Courses', key: 'environmental-sustainability', label: 'Environmental & Sustainability Studies' },
];
const categoryPageStates = Object.fromEntries(MATERIAL_SCHEMAS.map((c) => [c.key, 0]));
let pendingUploadCategory = null;

const protocol = window.location.protocol === 'https:' ? 'https:' : 'http:';
const hostname = window.location.hostname || '127.0.0.1';
const origin = (window.location.origin && window.location.origin !== 'null')
  ? window.location.origin
  : `${protocol}//${hostname}:3000`;

const basePath = (typeof window.location.pathname === 'string' && window.location.pathname.indexOf('/PEDIASCAPE_Student_Platform-main/') === 0)
  ? '/PEDIASCAPE_Student_Platform-main'
  : '';

const REQUIRED_CATEGORY_KEYS = [
  'nios',
  'bosse',
  'ib',
  'cisce',
  'mba',
  'ai-ml',
  'data-science-analytics',
  'cloud-computing',
  'software-development',
  'ui-ux-design',
  'animation-game-design',
  'environmental-sustainability',
  'bsc-cs-it',
  'bsc-zoology',
  'biotech-genetics-biomedical',
];

function uniqueStrings(arr) {
  return Array.from(new Set((arr || []).filter(Boolean)));
}

function buildBackendOrigins() {
  const list = [origin];
  const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1';

  if (isLocalhost) {
    const ports = uniqueStrings(['3002', '3000', '3001', window.location.port]);
    const hosts = uniqueStrings([hostname, hostname === '127.0.0.1' ? 'localhost' : '127.0.0.1', 'localhost']);
    for (const h of hosts) {
      for (const p of ports) {
        if (!p) continue;
        list.push(`${protocol}//${h}:${p}`);
      }
    }
  }

  return uniqueStrings(list);
}

const backendOrigins = buildBackendOrigins();
let preferredApiPrefix = null;

function apiCandidates(path) {
  const candidates = [];
  if (preferredApiPrefix) {
    candidates.push(`${preferredApiPrefix}${path}`);
  }
  for (const backendOrigin of backendOrigins) {
    if (basePath) candidates.push(new URL(`${basePath}${path}`, backendOrigin).toString());
    candidates.push(new URL(path, backendOrigin).toString());
  }
  return uniqueStrings(candidates);
}

async function apiFetch(path, options = {}) {
  let lastError;
  for (const url of apiCandidates(path)) {
    try {
      const res = await fetch(url, options);
      if (res.ok) {
        if (String(path || '').startsWith('/api/materials')) {
          const contentType = res.headers.get('content-type') || '';
          if (!contentType.toLowerCase().includes('application/json')) {
            lastError = new Error('Invalid materials API response');
            continue;
          }

          try {
            const probe = await res.clone().json();
            const isUpload = String(path || '').startsWith('/api/materials/upload');
            const ok =
              (isUpload &&
                probe &&
                typeof probe === 'object' &&
                typeof probe.path === 'string' &&
                typeof probe.category === 'string') ||
              (!isUpload &&
                probe &&
                typeof probe === 'object' &&
                typeof probe.bucket === 'string' &&
                probe.categories &&
                typeof probe.categories === 'object' &&
                REQUIRED_CATEGORY_KEYS.every((k) => Object.prototype.hasOwnProperty.call(probe.categories, k)));
            if (!ok) {
              lastError = new Error('Invalid materials API response');
              continue;
            }

            if (!isUpload && typeof url === 'string') {
              const idx = url.indexOf(path);
              if (idx > 0) preferredApiPrefix = url.slice(0, idx);
            }
          } catch {
            lastError = new Error('Invalid materials API response');
            continue;
          }
        }
        return res;
      }
      lastError = new Error(`Server returned ${res.status} ${res.statusText}`);
    } catch (e) {
      lastError = e;
    }
  }
  throw lastError instanceof Error ? lastError : new Error('Failed to fetch');
}

console.log('Materials API Origins:', backendOrigins, 'basePath:', basePath);

document.addEventListener('DOMContentLoaded', () => {
  if (searchInput) searchInput.addEventListener('input', filterMaterials);
  if (categoryFilter) categoryFilter.addEventListener('change', filterMaterials);
  initCategoryFilterOptions();
  initUploadUI();
  loadMaterials();
});

function initCategoryFilterOptions() {
  if (!categoryFilter) return;
  const selected = categoryFilter.value;
  categoryFilter.innerHTML = '';

  const allOpt = document.createElement('option');
  allOpt.value = '';
  allOpt.textContent = 'All Materials';
  categoryFilter.appendChild(allOpt);

  const groupOrder = ['Streams', 'School Boards', 'Courses'];
  const byGroup = {};
  MATERIAL_SCHEMAS.forEach((c) => {
    if (!byGroup[c.group]) byGroup[c.group] = [];
    byGroup[c.group].push(c);
  });

  groupOrder.forEach((groupName) => {
    const items = byGroup[groupName] || [];
    if (!items.length) return;
    const og = document.createElement('optgroup');
    og.label = groupName;
    items.forEach((c) => {
      const opt = document.createElement('option');
      opt.value = c.key;
      opt.textContent = c.label;
      og.appendChild(opt);
    });
    categoryFilter.appendChild(og);
  });

  categoryFilter.value = selected;
}

function loadMaterials() {
  showLoader();
  materialsGrid.innerHTML = '';
  apiFetch(`/api/materials?t=${Date.now()}`)
    .then((res) => res.json())
    .then((json) => {
      hideLoader();
      console.log('Materials loaded:', json);
      const cats = json?.categories || {};
      allMaterials = [];
      grouped = {};
      Object.entries(cats).forEach(([key, value]) => {
        const items = value?.items || [];
        grouped[key] = items;
        items.forEach((it) => {
          allMaterials.push({
            title: it.title || it.fileName || 'Untitled',
            category: key,
            fileUrl: it.url,
            fileName: it.fileName,
            path: it.path,
          });
        });
      });
      if (allMaterials.length === 0) {
        showEmptyState('No materials available yet.');
        return;
      }
      displayMaterialsGrouped(grouped, { showEmptyCategories: true });
    })
    .catch((error) => {
      hideLoader();
      showEmptyState('Error loading materials. Please try again later.');
      console.error('Error loading materials:', error);
    });
}

function displayMaterialsGrouped(grouped, opts = {}) {
  materialsGrid.innerHTML = '';
  const order = MATERIAL_SCHEMAS.map((c) => c.key);
  const titleMap = Object.fromEntries(MATERIAL_SCHEMAS.map((c) => [c.key, c.label]));
  const showEmptyCategories = Boolean(opts.showEmptyCategories);
  const keysToRender = showEmptyCategories ? order : order.filter((key) => (grouped[key] || []).length > 0);
  if (!keysToRender.some((key) => (grouped[key] || []).length > 0)) {
    showEmptyState('No materials match your search criteria.');
    return;
  }

  keysToRender.forEach((key) => {
    const items = grouped[key] || [];
    const shouldPaginate = Object.prototype.hasOwnProperty.call(categoryPageStates, key);
    const totalPages = shouldPaginate ? Math.max(1, Math.ceil(items.length / itemsPerPage)) : 1;
    const pageIndex = shouldPaginate ? (categoryPageStates[key] || 0) % totalPages : 0;
    if (shouldPaginate) categoryPageStates[key] = pageIndex;
    const paginatedItems = shouldPaginate
      ? items.slice(pageIndex * itemsPerPage, pageIndex * itemsPerPage + itemsPerPage)
      : items;

    const section = document.createElement('section');
    section.className = 'category-section';
    const header = document.createElement('h2');
    header.className = 'category-title';
    header.textContent = `${titleMap[key]} (${items.length})`;
    section.appendChild(header);
    const grid = document.createElement('div');
    grid.className = 'materials-grid';
    if (items.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'empty-state';
      empty.innerHTML = `<p>No PDFs uploaded yet.</p>`;
      section.appendChild(empty);
      materialsGrid.appendChild(section);
      return;
    }
    paginatedItems.forEach((it) => {
      const card = document.createElement('div');
      card.className = 'pdf-card';
      const title = it.title || it.fileName;
      const safeUrl = it.url || it.fileUrl || '';
      const isDisabled = !safeUrl;
      
      card.innerHTML = `
        <div class="pdf-icon">PDF</div>
        <h3 class="pdf-title">${title}</h3>
        <p class="pdf-description">${titleMap[key]}</p>
        <div class="pdf-meta">
          <span class="pdf-category">${titleMap[key]}</span>
        </div>
        <div class="pdf-actions">
          <button class="action-btn" ${isDisabled ? 'disabled style="opacity:0.5;cursor:not-allowed;"' : ''} onclick="viewPDF('${safeUrl}')">View</button>
          <button class="action-btn" ${isDisabled ? 'disabled style="opacity:0.5;cursor:not-allowed;"' : ''} onclick="downloadPDF('${safeUrl}', '${it.fileName}')">Download</button>
        </div>
      `;
      grid.appendChild(card);
    });
    section.appendChild(grid);

    if (shouldPaginate && items.length > itemsPerPage) {
      const pagination = document.createElement('div');
      pagination.className = 'category-pagination';
      const nextBtn = document.createElement('button');
      nextBtn.type = 'button';
      nextBtn.className = 'upload-btn';
      nextBtn.textContent = 'Next Page';
      nextBtn.onclick = () => {
        categoryPageStates[key] = (pageIndex + 1) % totalPages;
        displayMaterialsGrouped(grouped);
      };
      pagination.appendChild(nextBtn);
      section.appendChild(pagination);
    }

    materialsGrid.appendChild(section);
  });
}

function filterMaterials() {
  const searchQuery = (searchInput?.value || '').toLowerCase();
  const catValue = (categoryFilter?.value || '').toLowerCase();
  Object.keys(categoryPageStates).forEach((k) => { categoryPageStates[k] = 0; });
  const filtered = allMaterials.filter((m) => {
    const matchesSearch =
      (m.title || '').toLowerCase().includes(searchQuery) ||
      (m.fileName || '').toLowerCase().includes(searchQuery);
    const matchesCat = catValue === '' || (m.category || '').toLowerCase() === catValue;
    return matchesSearch && matchesCat;
  });
  const groupedFiltered = {};
  filtered.forEach((m) => {
    const k = m.category;
    if (!groupedFiltered[k]) groupedFiltered[k] = [];
    groupedFiltered[k].push(m);
  });
  displayMaterialsGrouped(groupedFiltered, { showEmptyCategories: false });
}

function viewPDF(url) {
  if (!url || url === 'null' || url === 'undefined') {
    showToast('Error: Invalid PDF URL', 'error');
    return;
  }
  window.open(url, '_blank');
}

async function downloadPDF(url, fileName) {
  if (!url || url === 'null' || url === 'undefined') {
    showToast('Error: Invalid PDF URL', 'error');
    return;
  }
  
  try {
    showToast('Starting download...', 'success');
    
    // Fetch blob to bypass cross-origin download restrictions
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Download failed: ${response.status}`);
    
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = fileName;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    // Cleanup
    setTimeout(() => window.URL.revokeObjectURL(blobUrl), 100);
    showToast('Download completed', 'success');
  } catch (error) {
    console.error('Download error:', error);
    showToast('Download failed. Opening directly...', 'error');
    // Fallback to direct link if fetch fails (e.g. CORS strictness)
    setTimeout(() => window.open(url, '_blank'), 1000);
  }
}

// Expose functions to global scope for HTML onclick handlers
window.viewPDF = viewPDF;
window.downloadPDF = downloadPDF;


function showEmptyState(message = 'No materials available yet.') {
  materialsGrid.innerHTML = `
    <div class="empty-state">
      <div class="empty-icon">📚</div>
      <p>${message}</p>
    </div>
  `;
}

function showLoader() {
  if (!document.getElementById('loader')) {
    const loader = document.createElement('div');
    loader.id = 'loader';
    loader.className = 'loader';
    loader.innerHTML = '<div class="spinner"></div>';
    const style = document.createElement('style');
    style.innerHTML = `
      .loader { position: fixed; top:0; left:0; width:100%; height:100%; background-color: rgba(0,0,0,0.7); display:flex; justify-content:center; align-items:center; z-index:2000; }
      .spinner { width:50px; height:50px; border:5px solid rgba(255,255,255,0.3); border-radius:50%; border-top-color:#fff; animation: spin 1s ease-in-out infinite; }
      @keyframes spin { to { transform: rotate(360deg); } }
    `;
    document.head.appendChild(style);
    document.body.appendChild(loader);
  } else {
    document.getElementById('loader').style.display = 'flex';
  }
}

function hideLoader() {
  const loader = document.getElementById('loader');
  if (loader) loader.style.display = 'none';
}

function showToast(message, type = 'success') {
  const existingToast = document.getElementById('toast');
  if (existingToast) document.body.removeChild(existingToast);
  const toast = document.createElement('div');
  toast.id = 'toast';
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => { toast.classList.add('show'); }, 10);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => { if (document.body.contains(toast)) document.body.removeChild(toast); }, 300);
  }, 3000);
}

// ===== Upload Handling =====
function initUploadUI() {
  const uploadBtn = document.getElementById('uploadBtn');
  const fileInput = document.getElementById('fileInput');
  if (!uploadBtn || !fileInput) return;

  // Determine auth state
  supabase.auth.getUser().then(({ data: { user } }) => {
    if (user) {
      uploadBtn.textContent = 'Upload PDF';
      uploadBtn.disabled = false;
      uploadBtn.onclick = () => openStreamPicker((catKey) => {
        pendingUploadCategory = catKey;
        fileInput.click();
      });
    } else {
      uploadBtn.textContent = 'Login to Upload';
      uploadBtn.disabled = false;
      uploadBtn.onclick = () => window.location.href = 'login.html';
    }
  });

  // React to auth changes
  supabase.auth.onAuthStateChange((_event, session) => {
    const user = session?.user || null;
    if (user) {
      uploadBtn.textContent = 'Upload PDF';
      uploadBtn.onclick = () => openStreamPicker((catKey) => {
        pendingUploadCategory = catKey;
        fileInput.click();
      });
    } else {
      uploadBtn.textContent = 'Login to Upload';
      uploadBtn.onclick = () => window.location.href = 'login.html';
    }
  });

  fileInput.addEventListener('change', async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) {
      pendingUploadCategory = null;
      return;
    }
    if (file.type !== 'application/pdf') {
      showToast('Please select a PDF file', 'error');
      pendingUploadCategory = null;
      return;
    }

    try {
      showLoader();
      const catKey = (pendingUploadCategory || '').toLowerCase();
      if (!catKey) {
        hideLoader();
        showToast('Please select a stream first', 'error');
        return;
      }
      if (!MATERIAL_SCHEMAS.some((c) => c.key === catKey)) {
        hideLoader();
        showToast('Invalid category selected. Please try again.', 'error');
        return;
      }

      if (!preferredApiPrefix) {
        await apiFetch(`/api/materials?t=${Date.now()}`).catch(() => null);
      }
      const safeName = sanitizeFileName(file.name.replace(/\.pdf$/i, '')) + '.pdf';

      // Read file as base64
      const base64 = await readFileAsDataUrl(file);

      // Send to server to upload with service role
      const resp = await apiFetch('/api/materials/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName: safeName, category: catKey, base64 })
      });
      hideLoader();
      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}));
        throw new Error(err?.error || `Upload failed: ${resp.status}`);
      }
      const data = await resp.json();
      if ((data?.category || '').toLowerCase() !== catKey) {
        throw new Error('Upload reached the wrong category. Please retry.');
      }
      showToast('Upload successful', 'success');
      loadMaterials();
    } catch (err) {
      hideLoader();
      console.error('Upload error:', err);
      showToast(err?.message || 'Upload failed', 'error');
    } finally {
      fileInput.value = '';
      pendingUploadCategory = null;
    }
  });
}

function openStreamPicker(onSelect) {
  const existing = document.querySelector('.upload-modal');
  if (existing) document.body.removeChild(existing);

  const modal = document.createElement('div');
  modal.className = 'upload-modal';
  const groupedSchemas = MATERIAL_SCHEMAS.reduce((acc, item) => {
    if (!acc[item.group]) acc[item.group] = [];
    acc[item.group].push(item);
    return acc;
  }, {});
  const groupOrder = ['Streams', 'School Boards', 'Courses'];
  const groupsHtml = groupOrder
    .filter((g) => (groupedSchemas[g] || []).length > 0)
    .map((g) => {
      const items = groupedSchemas[g] || [];
      const buttons = items.map((c) => (
        `<button type="button" class="schema-option" data-stream="${c.key}" title="${c.label}">
          <span class="schema-option-text">${c.label}</span>
        </button>`
      )).join('');
      return `
        <div class="schema-group" data-group="${g}">
          <div class="schema-group-title">${g}</div>
          <div class="schema-options">${buttons}</div>
        </div>
      `;
    })
    .join('');

  modal.innerHTML = `
    <div class="modal-content">
      <h2>Select Category</h2>
      <div class="schema-search">
        <input type="text" class="schema-search-input" placeholder="Search categories..." aria-label="Search categories">
      </div>
      <div class="schema-groups">
        ${groupsHtml}
      </div>
      <div class="modal-actions">
        <button type="button" class="action-btn" data-action="cancel">Cancel</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  const close = () => {
    modal.classList.remove('show');
    setTimeout(() => {
      if (document.body.contains(modal)) document.body.removeChild(modal);
    }, 300);
  };

  modal.addEventListener('click', (e) => {
    if (e.target === modal) close();
  });

  const searchEl = modal.querySelector('.schema-search-input');
  if (searchEl) {
    searchEl.addEventListener('input', () => {
      const q = String(searchEl.value || '').trim().toLowerCase();
      modal.querySelectorAll('.schema-option').forEach((btn) => {
        const text = (btn.textContent || '').toLowerCase();
        btn.style.display = !q || text.includes(q) ? '' : 'none';
      });

      modal.querySelectorAll('.schema-group').forEach((groupEl) => {
        const anyVisible = Array.from(groupEl.querySelectorAll('.schema-option')).some((b) => b.style.display !== 'none');
        groupEl.style.display = anyVisible ? '' : 'none';
      });
    });
  }

  modal.querySelectorAll('[data-stream]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-stream');
      if (typeof onSelect === 'function') onSelect(key);
      close();
    });
  });
  const cancelBtn = modal.querySelector('[data-action="cancel"]');
  if (cancelBtn) cancelBtn.addEventListener('click', close);

  setTimeout(() => {
    modal.classList.add('show');
  }, 10);
}

function sanitizeFileName(name) {
  return name
    .replace(/[^a-zA-Z0-9._\-\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (e) => reject(e);
    reader.readAsDataURL(file);
  });
}
