import { supabase } from "./supabase-client.js";

function q(id) { return document.getElementById(id); }

function showToast(message, type = 'success') {
  const existingToast = q('toast');
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

function updateAuthUI(user) {
  const userProfileSection = q('userProfileSection') || document.querySelector('.user-profile');
  const guestProfileSection = q('guestProfileSection');
  const mobileAuthOption = q('mobileAuthOption');
  const userInitials = q('userInitials');
  const profileLogo = document.querySelector('.profilelogo');

  if (user) {
    if (userProfileSection) userProfileSection.style.display = 'flex';
    if (guestProfileSection) guestProfileSection.style.display = 'none';
    if (profileLogo) profileLogo.style.display = 'none';
    if (mobileAuthOption) {
      mobileAuthOption.innerText = 'DASHBOARD';
      mobileAuthOption.onclick = () => navigateTo('Dashboard.html');
    }
    if (userInitials) {
      const email = user.email || '';
      const initials = email.split('@')[0].charAt(0).toUpperCase();
      userInitials.textContent = initials || 'U';
    }
  } else {
    if (userProfileSection) userProfileSection.style.display = 'none';
    if (guestProfileSection) guestProfileSection.style.display = 'flex';
    if (profileLogo) profileLogo.style.display = 'block';
    if (mobileAuthOption) {
      mobileAuthOption.innerText = 'LOGIN';
      mobileAuthOption.onclick = () => navigateTo('login.html');
    }
  }
}

function toggleUserMenu() {
  const userMenu = q('userMenu');
  if (userMenu) userMenu.classList.toggle('active');
}

function toggleDropdown() {
  const dropdown = document.querySelector('.dropdown');
  if (!dropdown) return;
  dropdown.classList.toggle('active');
}

function redirectToLogin() {
  navigateTo('login.html');
}

function navigateTo(page) {
  window.location.href = page;
}

async function initAuthUI() {
  const { data: { user } } = await supabase.auth.getUser();
  updateAuthUI(user || null);

  const logoutButton = q('logoutButton');
  if (logoutButton) {
    logoutButton.addEventListener('click', async () => {
      const { error } = await supabase.auth.signOut();
      if (error) {
        showToast('Error logging out: ' + error.message, 'error');
      } else {
        showToast('Logged out successfully', 'success');
        updateAuthUI(null);
        setTimeout(() => navigateTo('index.html'), 500);
      }
    });
  }

  document.addEventListener('click', (event) => {
    const userMenu = q('userMenu');
    const userAvatar = q('userInitials');
    if (userMenu && userAvatar && event.target !== userAvatar && !userMenu.contains(event.target)) {
      userMenu.classList.remove('active');
    }
  });

  supabase.auth.onAuthStateChange((event, session) => {
    updateAuthUI(session?.user || null);
  });
}

window.toggleUserMenu = toggleUserMenu;
window.toggleDropdown = toggleDropdown;
window.redirectToLogin = redirectToLogin;
window.navigateTo = navigateTo;

document.addEventListener('DOMContentLoaded', initAuthUI);

