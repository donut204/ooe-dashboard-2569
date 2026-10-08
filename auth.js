(() => {
  "use strict";
  const cfg = window.OOE_AUTH_CONFIG || {};
  const loginPage = "login.html";
  const tokenKey = cfg.storageKey || "ooe_google_credential";
  const loginSkipKey = "ooe_skip_auto_login_once";
  const maxWaitMs = 8000;
  const refreshLeewaySeconds = 90;
  let refreshJob = null;
  let refreshTimer = null;
  let loginStarted = false;

  function decodeJwt(token) {
    try {
      const part = token.split(".")[1];
      if (!part) return null;
      const normalized = part.replace(/-/g, "+").replace(/_/g, "/");
      const padded = normalized + "=".repeat((4 - normalized.length % 4) % 4);
      const json = decodeURIComponent(
        atob(padded).split("").map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)).join("")
      );
      return JSON.parse(json);
    } catch (_) { return null; }
  }
  function isConfigured() {
    return Boolean(cfg.googleClientId && !cfg.googleClientId.includes("PASTE_GOOGLE_OAUTH_CLIENT_ID_HERE"));
  }
  function validateCredential(token) {
    if (!token || !isConfigured()) return null;
    const p = decodeJwt(token);
    if (!p) return null;
    const now = Math.floor(Date.now() / 1000);
    const email = String(p.email || "").toLowerCase();
    const domain = String(cfg.allowedDomain || "").toLowerCase();
    const valid =
      p.aud === cfg.googleClientId &&
      Number(p.exp || 0) > now &&
      p.email_verified === true &&
      Boolean(domain) &&
      email.endsWith("@" + domain) &&
      (!p.hd || String(p.hd).toLowerCase() === domain);
    return valid ? p : null;
  }
  function getCredential() {
    try { return localStorage.getItem(tokenKey) || ""; } catch (_) { return ""; }
  }
  function getUser() { return validateCredential(getCredential()); }
  function saveCredential(token) {
    try { localStorage.setItem(tokenKey, token); } catch (_) {}
  }
  function clearCredential() {
    try { localStorage.removeItem(tokenKey); } catch (_) {}
  }
  function currentPageUrl() {
    const path = location.pathname.split("/").pop() || "index.html";
    return path + location.search + location.hash;
  }
  function dashboardUrl() {
    const raw = new URLSearchParams(location.search).get("next");
    if (!raw) return "index.html";
    // Disallow absolute, protocol-relative, path traversal and unrecognized destinations.
    const m = raw.match(/^(index\.html|ai-tutor\.html|podcast\.html)(\?[^#]*)?(#.*)?$/);
    return m ? raw : "index.html";
  }
  function loginUrl() {
    return loginPage + "?next=" + encodeURIComponent(currentPageUrl());
  }
  function redirectLogin() {
    clearCredential();
    location.replace(loginUrl());
  }
  function renderUser(user) {
    const el = document.getElementById("authUserEmail");
    if (el) el.textContent = user.email || "";
  }
  function enterDashboard(user) {
    document.documentElement.classList.remove("auth-check");
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => renderUser(user), { once: true });
    } else renderUser(user);
    scheduleRenewal(user);
  }
  function loadGIS() {
    return new Promise((resolve, reject) => {
      if (window.google?.accounts?.id) return resolve(window.google.accounts.id);
      let tag = document.querySelector('script[data-ooe-gis="1"]');
      if (!tag) {
        tag = document.createElement("script");
        tag.src = "https://accounts.google.com/gsi/client";
        tag.async = true;
        tag.dataset.ooeGis = "1";
        document.head.appendChild(tag);
      }
      let done = false;
      const finish = ok => {
        if (done) return;
        done = true;
        clearTimeout(timer);
        ok ? resolve(window.google.accounts.id) : reject(new Error("Google Identity Services unavailable"));
      };
      const timer = setTimeout(() => finish(false), maxWaitMs);
      tag.addEventListener("load", () => finish(Boolean(window.google?.accounts?.id)), { once: true });
      tag.addEventListener("error", () => finish(false), { once: true });
      if (window.google?.accounts?.id) finish(true);
    });
  }
  function renewCredential() {
    if (refreshJob) return refreshJob;
    refreshJob = (async () => {
      if (!isConfigured()) return null;
      let id;
      try { id = await loadGIS(); } catch (_) { return null; }
      return await new Promise(resolve => {
        let finished = false;
        const finish = user => {
          if (finished) return;
          finished = true;
          clearTimeout(timer);
          resolve(user);
        };
        const timer = setTimeout(() => finish(null), maxWaitMs);
        try {
          id.initialize({
            client_id: cfg.googleClientId,
            hd: cfg.allowedDomain,
            auto_select: true,
            cancel_on_tap_outside: true,
            callback: response => {
              const user = validateCredential(response?.credential);
              if (user) saveCredential(response.credential);
              finish(user);
            }
          });
          // GIS prompt may fail or require user interaction depending on browser/FedCM.
          id.prompt(notification => {
            if (notification?.isNotDisplayed?.() || notification?.isSkippedMoment?.() || notification?.isDismissedMoment?.()) {
              finish(null);
            }
          });
        } catch (_) { finish(null); }
      });
    })().finally(() => { refreshJob = null; });
    return refreshJob;
  }
  function scheduleRenewal(user) {
    if (refreshTimer) clearTimeout(refreshTimer);
    const ms = Math.max(1000, (Number(user.exp) - Math.floor(Date.now() / 1000) - refreshLeewaySeconds) * 1000);
    // Timer may be throttled by browsers; pageshow/visibilitychange recheck on return.
    refreshTimer = setTimeout(async () => {
      const renewed = await renewCredential();
      if (renewed) enterDashboard(renewed);
      else if (!getUser()) redirectLogin();
      else scheduleRenewal(getUser());
    }, Math.min(ms, 2147483647));
  }
  function requireAuth() {
    const user = getUser();
    if (user) {
      enterDashboard(user);
    } else {
      // Keep the dashboard concealed until Google has been given one recovery attempt.
      renewCredential().then(recovered => recovered ? enterDashboard(recovered) : redirectLogin());
    }
    const checkOnResume = () => {
      if (document.visibilityState === "hidden") return;
      const active = getUser();
      if (!active) {
        renewCredential().then(recovered => recovered ? enterDashboard(recovered) : redirectLogin());
      } else if (Number(active.exp) - Math.floor(Date.now() / 1000) <= refreshLeewaySeconds) {
        renewCredential().then(recovered => {
          if (recovered) enterDashboard(recovered);
          else if (!getUser()) redirectLogin();
        });
      }
    };
    window.addEventListener("pageshow", checkOnResume);
    document.addEventListener("visibilitychange", checkOnResume);
    return user;
  }
  function handleGoogleCredential(response) {
    const user = validateCredential(response?.credential);
    const msg = document.getElementById("loginMessage");
    if (!user) {
      clearCredential();
      if (msg) {
        msg.textContent = "บัญชีนี้ไม่ได้รับอนุญาต กรุณาใช้บัญชี @" + (cfg.allowedDomain || "spu.ac.th");
        msg.className = "message error";
      }
      return;
    }
    saveCredential(response.credential);
    location.replace(dashboardUrl());
  }
  function logout() {
    clearCredential();
    if (refreshTimer) clearTimeout(refreshTimer);
    try { sessionStorage.setItem(loginSkipKey, "1"); } catch (_) {}
    try { window.google?.accounts?.id?.disableAutoSelect(); } catch (_) {}
    location.replace(loginPage);
  }
  function setupLogin() {
    if (loginStarted) return;
    const msg = document.getElementById("loginMessage");
    const box = document.getElementById("googleSignIn");
    if (!isConfigured()) {
      if (msg) { msg.textContent = "ยังไม่ได้ตั้งค่า Google OAuth Client ID"; msg.className = "message setup"; }
      if (box) box.innerHTML = '<div class="setup-box">ตั้งค่า <code>auth-config.js</code> ก่อนเปิดใช้งานจริง</div>';
      return;
    }
    if (getUser()) { location.replace(dashboardUrl()); return; }
    if (!window.google?.accounts?.id) {
      // GIS is already included on login.html; wait for it, but never loop indefinitely.
      loadGIS().then(setupLogin).catch(() => {
        if (msg) { msg.textContent = "ไม่สามารถโหลด Google Sign-In ได้ กรุณาตรวจสอบการเชื่อมต่อแล้วรีเฟรชหน้า"; msg.className = "message error"; }
      });
      return;
    }
    loginStarted = true;
    google.accounts.id.initialize({
      client_id: cfg.googleClientId, callback: handleGoogleCredential,
      hd: cfg.allowedDomain, auto_select: false, cancel_on_tap_outside: true
    });
    google.accounts.id.renderButton(box, {
      type: "standard", theme: "outline", size: "large", text: "signin_with",
      shape: "pill", logo_alignment: "left", width: 300
    });
    // Only try silent re-auth for a genuine expired session returning from a dashboard.
    let loggedOut = false;
    try { loggedOut = sessionStorage.getItem(loginSkipKey) === "1"; sessionStorage.removeItem(loginSkipKey); } catch (_) {}
    if (!loggedOut && new URLSearchParams(location.search).has("next")) {
      try { google.accounts.id.prompt(); } catch (_) {}
    }
  }
  window.OOEAuth = { requireAuth, setupLogin, logout, getUser, handleGoogleCredential };
})();