import { supabase } from "../../script/supabase-client.js";

const profileLogo = document.querySelector(".profilelogo");
const userProfile = document.querySelector(".user-profile");
const userInitials = document.getElementById("userInitials");
const userMenu = document.getElementById("userMenu");
const logoutButton = document.getElementById("logoutButton");

let currentUser = null;

function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

function createUserAvatar(user) {
  if (!userInitials) return;

  const email = user?.email || "";
  const initials = email ? email.charAt(0).toUpperCase() : "U";
  const seed = user?.id || user?.email || "user";
  const hue = Math.abs(hashCode(seed) % 360);
  const color = `hsl(${hue}, 70%, 60%)`;

  userInitials.style.backgroundColor = color;
  userInitials.textContent = initials;
}

function updateAuthUI(user) {
  if (user) {
    if (profileLogo) profileLogo.style.display = "none";
    if (userProfile) userProfile.style.display = "flex";
    createUserAvatar(user);
  } else {
    if (userMenu) userMenu.classList.remove("active");
    if (userProfile) userProfile.style.display = "none";
    if (profileLogo) profileLogo.style.display = "block";
  }
}

function toggleUserMenu() {
  if (userMenu) userMenu.classList.toggle("active");
}

function navigateTo(page) {
  window.location.href = page;
}

function redirectToLogin() {
  if (currentUser) {
    navigateTo("../Dashboard.html");
    return;
  }
  navigateTo("../login.html");
}

function toggleDropdown() {
  const dropdown = document.querySelector(".dropdown");
  if (!dropdown) return;
  dropdown.style.display = dropdown.style.display === "flex" ? "none" : "flex";
}

async function initAuthUI() {
  const { data: { user } } = await supabase.auth.getUser();
  currentUser = user || null;
  updateAuthUI(currentUser);

  supabase.auth.onAuthStateChange((_event, session) => {
    currentUser = session?.user || null;
    updateAuthUI(currentUser);
  });

  if (logoutButton) {
    logoutButton.addEventListener("click", async () => {
      await supabase.auth.signOut();
      currentUser = null;
      updateAuthUI(null);
      navigateTo("../login.html");
    });
  }

  if (userInitials) {
    userInitials.addEventListener("click", toggleUserMenu);
  }

  document.addEventListener("click", (event) => {
    if (!userMenu || !userInitials) return;
    if (event.target !== userInitials && !userMenu.contains(event.target)) {
      userMenu.classList.remove("active");
    }
  });
}

window.toggleUserMenu = toggleUserMenu;
window.redirectToLogin = redirectToLogin;
window.navigateTo = navigateTo;
window.toggleDropdown = toggleDropdown;

document.addEventListener("DOMContentLoaded", initAuthUI);
