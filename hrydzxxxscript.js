(function () {
  "use strict";

  if (typeof window.HRYDZX_BOOKMARK_LOAD === "undefined") {
    console.log("%cAccess Denied - Bookmark Required", "color:#ff0000;font-size:15px;font-weight:bold");
    return;
  }

  const URLS = {
    key:         "https://raw.githubusercontent.com/hrydzxxx-create/aincrad-bypass/refs/heads/main/key.txt",
    redirect:    "https://raw.githubusercontent.com/hrydzxxx-create/aincrad-bypass/refs/heads/main/hrydzx.txt",
    telegram:    "https://raw.githubusercontent.com/hrydzxxx-create/aincrad-bypass/refs/heads/main/button.txt",
    update:      "https://rm.hrydzx-modz.workers.dev/",
    getkey:      "https://aincradmods.com/getkey?token=7e6d3dc2a446411c870605827719f7d2",
    hunterkey:   "https://huntermods.in/activekey.php?active_token=PNvWZMtpBYIuiXxGz6Rh9aco"
  };

  const $ = id => document.getElementById(id);
  const fetchText = url => fetch(url + "?t=" + Date.now()).then(r => r.text());
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  // ── STYLES ────────────────────────────────────────────────────────────────
  function injectStyles() {
    if ($("hrydzx-styles")) return;

    // Google Fonts
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=DM+Sans:wght@300;400;500;600&display=swap";
    document.head.appendChild(link);

    const style = document.createElement("style");
    style.id = "hrydzx-styles";
    style.textContent = `
      :root {
        --hx-bg:      #080a14;
        --hx-card:    #0e1120;
        --hx-card2:   #111427;
        --hx-border:  rgba(0,210,255,0.10);
        --hx-accent:  #00d2ff;
        --hx-accent2: #3a7bd5;
        --hx-tg:      #229ED9;
        --hx-green:   #00e676;
        --hx-red:     #ff1744;
        --hx-muted:   #4a5270;
        --hx-text:    #dde3f5;
        --hx-sub:     #7a85a8;
      }

      /* ── WEBSITE OVERLAY ── */
      #hrydzx-site {
        position: fixed; inset: 0;
        background: var(--hx-bg);
        z-index: 2147483640;
        overflow-y: auto;
        font-family: 'DM Sans', sans-serif;
        color: var(--hx-text);
      }

      #hrydzx-site * { box-sizing: border-box; margin: 0; padding: 0; }

      #hrydzx-site::before {
        content: '';
        position: fixed; inset: 0;
        background:
          radial-gradient(ellipse 60% 40% at 20% 10%, rgba(0,210,255,0.05) 0%, transparent 60%),
          radial-gradient(ellipse 50% 40% at 80% 80%, rgba(58,123,213,0.06) 0%, transparent 60%);
        pointer-events: none; z-index: 0;
      }

      /* NAV */
      .hx-nav {
        position: sticky; top: 0; z-index: 100;
        display: flex; align-items: center; justify-content: space-between;
        padding: 0 32px; height: 60px;
        background: rgba(8,10,20,0.9);
        backdrop-filter: blur(12px);
        border-bottom: 1px solid var(--hx-border);
      }

      .hx-nav-logo {
        font-family: 'Rajdhani', sans-serif;
        font-size: 18px; font-weight: 700;
        letter-spacing: 2px; text-transform: uppercase;
        color: var(--hx-text);
        display: flex; align-items: center; gap: 10px;
      }

      .hx-nav-dot {
        width: 8px; height: 8px; border-radius: 50%;
        background: var(--hx-accent);
        box-shadow: 0 0 10px var(--hx-accent);
        animation: hx-pulse 2s ease-in-out infinite;
      }

      .hx-nav-links { display: flex; gap: 24px; }

      .hx-nav-links a {
        font-size: 11px; font-weight: 600;
        color: var(--hx-sub); text-decoration: none;
        letter-spacing: 1.2px; text-transform: uppercase;
        transition: color .2s; cursor: pointer;
      }

      .hx-nav-links a:hover { color: var(--hx-accent); }

      /* HERO */
      .hx-hero {
        position: relative; z-index: 1;
        min-height: 92vh;
        display: flex; align-items: center; justify-content: center;
        flex-direction: column; text-align: center;
        padding: 80px 24px 60px;
      }

      .hx-hero-grid {
        position: absolute; inset: 0; z-index: 0;
        background-image:
          linear-gradient(rgba(0,210,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,210,255,0.03) 1px, transparent 1px);
        background-size: 48px 48px;
        mask-image: radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 80%);
        pointer-events: none;
      }

      .hx-badge {
        display: inline-flex; align-items: center; gap: 8px;
        background: rgba(0,210,255,0.07);
        border: 1px solid rgba(0,210,255,0.18);
        border-radius: 100px; padding: 6px 16px;
        font-size: 11px; font-weight: 600;
        color: var(--hx-accent); letter-spacing: 1.5px; text-transform: uppercase;
        margin-bottom: 28px;
        animation: hx-fadeUp 0.6s ease both;
      }

      .hx-badge-dot {
        width: 6px; height: 6px; border-radius: 50%;
        background: var(--hx-accent);
        animation: hx-pulse 1.5s ease-in-out infinite;
      }

      .hx-hero-title {
        font-family: 'Rajdhani', sans-serif;
        font-size: clamp(52px, 10vw, 100px);
        font-weight: 700; line-height: 1; letter-spacing: -1px;
        animation: hx-fadeUp 0.7s 0.1s ease both;
        background: linear-gradient(135deg, #fff 20%, var(--hx-accent) 60%, var(--hx-accent2) 100%);
        -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      }

      .hx-hero-sub {
        margin-top: 18px; max-width: 460px;
        font-size: 15px; color: var(--hx-sub); line-height: 1.7; font-weight: 300;
        animation: hx-fadeUp 0.7s 0.2s ease both;
      }

      .hx-hero-btns {
        margin-top: 36px;
        display: flex; gap: 12px; flex-wrap: wrap; justify-content: center;
        animation: hx-fadeUp 0.7s 0.3s ease both;
      }

      .hx-btn-primary {
        padding: 13px 28px;
        background: linear-gradient(135deg, var(--hx-accent2), var(--hx-accent));
        border: none; border-radius: 10px;
        font-family: 'Rajdhani', sans-serif;
        font-size: 14px; font-weight: 700;
        letter-spacing: 1.5px; text-transform: uppercase;
        color: #fff; cursor: pointer;
        box-shadow: 0 4px 24px rgba(0,210,255,0.25);
        transition: transform .15s, box-shadow .2s;
      }

      .hx-btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 32px rgba(0,210,255,0.35);
      }

      .hx-btn-outline {
        padding: 13px 28px;
        background: transparent;
        border: 1px solid var(--hx-border); border-radius: 10px;
        font-family: 'Rajdhani', sans-serif;
        font-size: 14px; font-weight: 700;
        letter-spacing: 1.5px; text-transform: uppercase;
        color: var(--hx-sub); cursor: pointer;
        transition: border-color .2s, color .2s, transform .15s;
      }

      .hx-btn-outline:hover {
        border-color: var(--hx-accent);
        color: var(--hx-accent); transform: translateY(-2px);
      }

      /* SECTION */
      .hx-section {
        position: relative; z-index: 1;
        padding: 72px 24px; max-width: 1000px; margin: 0 auto;
      }

      .hx-section-label {
        font-size: 10px; font-weight: 600;
        color: var(--hx-accent); letter-spacing: 2.5px; text-transform: uppercase;
        margin-bottom: 10px;
      }

      .hx-section-title {
        font-family: 'Rajdhani', sans-serif;
        font-size: clamp(28px, 5vw, 40px); font-weight: 700;
        line-height: 1.1; margin-bottom: 14px;
      }

      .hx-section-sub {
        font-size: 14px; color: var(--hx-sub); line-height: 1.7;
        max-width: 500px; font-weight: 300; margin-bottom: 44px;
      }

      .hx-divider {
        height: 1px; margin: 0 24px;
        background: linear-gradient(90deg, transparent, var(--hx-border), transparent);
      }

      /* FEATURES */
      .hx-features {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        gap: 14px;
      }

      .hx-feat-card {
        background: var(--hx-card);
        border: 1px solid var(--hx-border);
        border-radius: 14px; padding: 26px 22px;
        transition: border-color .2s, transform .2s;
      }

      .hx-feat-card:hover {
        border-color: rgba(0,210,255,0.28);
        transform: translateY(-4px);
      }

      .hx-feat-icon { font-size: 22px; margin-bottom: 14px; }

      .hx-feat-title {
        font-family: 'Rajdhani', sans-serif;
        font-size: 15px; font-weight: 700;
        letter-spacing: 1px; text-transform: uppercase;
        color: var(--hx-text); margin-bottom: 8px;
      }

      .hx-feat-desc {
        font-size: 13px; color: var(--hx-sub);
        line-height: 1.65; font-weight: 300;
      }

      /* STEPS */
      .hx-steps { display: flex; flex-direction: column; }

      .hx-step {
        display: flex; gap: 24px;
        padding: 28px 0;
        border-bottom: 1px solid var(--hx-border);
      }

      .hx-step:last-child { border-bottom: none; }

      .hx-step-num {
        font-family: 'Rajdhani', sans-serif;
        font-size: 30px; font-weight: 700;
        color: var(--hx-accent); opacity: 0.3;
        line-height: 1; flex-shrink: 0; width: 44px;
      }

      .hx-step-title {
        font-family: 'Rajdhani', sans-serif;
        font-size: 16px; font-weight: 700;
        letter-spacing: 1px; text-transform: uppercase;
        margin-bottom: 6px;
      }

      .hx-step-desc {
        font-size: 13px; color: var(--hx-sub);
        line-height: 1.65; font-weight: 300;
      }

      .hx-code-block {
        margin-top: 12px;
        background: var(--hx-card2);
        border: 1px solid var(--hx-border);
        border-radius: 8px; padding: 12px 14px;
        font-family: 'Courier New', monospace;
        font-size: 11px; color: var(--hx-accent);
        word-break: break-all; line-height: 1.6;
        position: relative;
      }

      .hx-copy-btn {
        position: absolute; top: 8px; right: 8px;
        background: rgba(0,210,255,0.1);
        border: 1px solid rgba(0,210,255,0.2);
        border-radius: 5px; padding: 3px 10px;
        font-size: 10px; font-weight: 600;
        color: var(--hx-accent); cursor: pointer;
        letter-spacing: 0.5px; font-family: 'DM Sans', sans-serif;
        transition: background .15s;
      }

      .hx-copy-btn:hover { background: rgba(0,210,255,0.2); }

      /* KEY CHECKER */
      .hx-checker {
        background: var(--hx-card);
        border: 1px solid var(--hx-border);
        border-radius: 16px; padding: 36px 32px;
        max-width: 460px; margin: 0 auto; text-align: center;
      }

      .hx-checker-title {
        font-family: 'Rajdhani', sans-serif;
        font-size: 20px; font-weight: 700;
        letter-spacing: 1.5px; text-transform: uppercase;
        margin-bottom: 6px;
      }

      .hx-checker-sub {
        font-size: 13px; color: var(--hx-sub);
        margin-bottom: 22px; font-weight: 300;
      }

      .hx-checker-input {
        width: 100%; padding: 12px 14px;
        background: var(--hx-bg);
        border: 1px solid rgba(255,255,255,0.07);
        border-radius: 9px; color: var(--hx-text);
        font-size: 13px; font-family: 'DM Sans', sans-serif;
        outline: none; margin-bottom: 12px;
        transition: border-color .2s, box-shadow .2s;
      }

      .hx-checker-input:focus {
        border-color: var(--hx-accent);
        box-shadow: 0 0 0 3px rgba(0,210,255,0.09);
      }

      .hx-checker-input::placeholder { color: var(--hx-muted); }

      .hx-checker-btn {
        width: 100%; padding: 12px;
        background: linear-gradient(135deg, var(--hx-accent2), var(--hx-accent));
        border: none; border-radius: 9px;
        font-family: 'Rajdhani', sans-serif;
        font-size: 14px; font-weight: 700;
        letter-spacing: 1.5px; text-transform: uppercase;
        color: #fff; cursor: pointer;
        box-shadow: 0 4px 20px rgba(0,210,255,0.2);
        transition: opacity .2s, transform .15s;
      }

      .hx-checker-btn:hover { transform: scale(1.02); }
      .hx-checker-btn:disabled { opacity: .4; cursor: not-allowed; }

      .hx-checker-status {
        margin-top: 14px; min-height: 20px;
        font-size: 12px; font-weight: 600;
        letter-spacing: .5px; color: var(--hx-sub);
      }

      /* FOOTER */
      .hx-footer {
        position: relative; z-index: 1;
        border-top: 1px solid var(--hx-border);
        padding: 32px 24px; text-align: center;
      }

      .hx-footer-logo {
        font-family: 'Rajdhani', sans-serif;
        font-size: 20px; font-weight: 700;
        letter-spacing: 2px; margin-bottom: 6px;
      }

      .hx-footer-sub {
        font-size: 12px; color: var(--hx-muted); letter-spacing: .5px;
      }

      .hx-footer-links {
        margin-top: 14px;
        display: flex; gap: 20px; justify-content: center;
      }

      .hx-footer-links a {
        font-size: 11px; color: var(--hx-muted);
        text-decoration: none; letter-spacing: 1px; text-transform: uppercase;
        cursor: pointer; transition: color .2s;
      }

      .hx-footer-links a:hover { color: var(--hx-accent); }

      /* ── AUTH OVERLAY ── */
      #hrydzx-overlay {
        position: fixed; inset: 0;
        background: rgba(5,7,15,0.88);
        backdrop-filter: blur(6px);
        z-index: 2147483646;
        display: flex; align-items: center; justify-content: center;
        font-family: 'DM Sans', sans-serif;
      }

      #hrydzx-card {
        background: var(--hx-card);
        border: 1px solid var(--hx-border);
        border-radius: 16px; width: 340px;
        box-shadow: 0 0 60px rgba(0,210,255,0.06), 0 24px 60px rgba(0,0,0,0.7);
        overflow: hidden;
        animation: hx-rise 0.35s cubic-bezier(0.22,1,0.36,1) both;
      }

      @keyframes hx-rise {
        from { opacity:0; transform: translateY(24px) scale(0.97); }
        to   { opacity:1; transform: translateY(0) scale(1); }
      }

      #hrydzx-header {
        background: linear-gradient(135deg, #0d1528 0%, #111827 100%);
        border-bottom: 1px solid var(--hx-border);
        padding: 16px 20px;
        display: flex; align-items: center; gap: 12px;
        position: relative; overflow: hidden;
      }

      #hrydzx-header::before {
        content: '';
        position: absolute; left: -40px; top: -40px;
        width: 120px; height: 120px;
        background: radial-gradient(circle, rgba(0,210,255,0.12) 0%, transparent 70%);
        pointer-events: none;
      }

      .hx-dot {
        width: 10px; height: 10px; border-radius: 50%;
        background: var(--hx-accent);
        box-shadow: 0 0 10px var(--hx-accent);
        animation: hx-pulse 2s ease-in-out infinite;
      }

      .hx-title {
        font-family: 'Rajdhani', sans-serif;
        font-size: 16px; font-weight: 700;
        letter-spacing: 1.5px; color: var(--hx-text); text-transform: uppercase;
      }

      .hx-version {
        margin-left: auto; font-size: 10px;
        color: var(--hx-muted); letter-spacing: 1px; text-transform: uppercase;
      }

      #hrydzx-body { padding: 24px 20px 20px; }

      .hx-input-label {
        font-size: 10px; font-weight: 600; color: var(--hx-sub);
        text-transform: uppercase; letter-spacing: 1.2px; margin-bottom: 8px;
        display: block;
      }

      #hrydzx-input {
        width: 100%; padding: 11px 14px;
        background: var(--hx-bg);
        border: 1px solid rgba(255,255,255,0.07);
        border-radius: 8px; color: var(--hx-text);
        font-size: 13px; font-family: 'DM Sans', sans-serif;
        outline: none; box-sizing: border-box;
        transition: border-color .2s, box-shadow .2s; margin-bottom: 14px;
      }

      #hrydzx-input:focus {
        border-color: var(--hx-accent);
        box-shadow: 0 0 0 3px rgba(0,210,255,0.1);
      }

      #hrydzx-input::placeholder { color: var(--hx-muted); }

      .hx-action-btn {
        width: 100%; padding: 12px; border: none; border-radius: 8px;
        font-family: 'Rajdhani', sans-serif;
        font-size: 14px; font-weight: 700;
        letter-spacing: 1.5px; text-transform: uppercase;
        cursor: pointer; transition: opacity .2s, transform .15s;
        margin-bottom: 9px;
      }

      .hx-action-btn:last-of-type { margin-bottom: 0; }
      .hx-action-btn:active { transform: scale(0.98); }
      .hx-action-btn:disabled { opacity: .4; cursor: not-allowed; }

      #hrydzx-verify-btn {
        background: linear-gradient(135deg, var(--hx-accent2) 0%, var(--hx-accent) 100%);
        color: #fff; box-shadow: 0 4px 20px rgba(0,210,255,0.25);
      }

      #hrydzx-getkey-btn {
        background: linear-gradient(135deg, #1a472a 0%, #27ae60 100%);
        color: #fff; box-shadow: 0 4px 16px rgba(39,174,96,0.2);
      }

      #hrydzx-tg-btn {
        background: var(--hx-tg); color: #fff;
      }

      /* BYPASS SELECTOR */
      .hx-bypass-label {
        font-size: 10px; font-weight: 600; color: var(--hx-sub);
        text-transform: uppercase; letter-spacing: 1.2px;
        margin-bottom: 8px; display: block;
      }

      .hx-bypass-grid {
        display: grid; grid-template-columns: 1fr 1fr;
        gap: 8px; margin-bottom: 14px;
      }

      .hx-bypass-card {
        background: var(--hx-bg);
        border: 1px solid rgba(255,255,255,0.07);
        border-radius: 8px; padding: 10px 10px 8px;
        cursor: pointer; text-align: center;
        transition: border-color .2s, box-shadow .2s;
        position: relative;
      }

      .hx-bypass-card:hover { border-color: rgba(0,210,255,0.3); }

      .hx-bypass-card.active {
        border-color: var(--hx-accent);
        box-shadow: 0 0 0 2px rgba(0,210,255,0.12);
        background: rgba(0,210,255,0.04);
      }

      .hx-bypass-card-name {
        font-family: 'Rajdhani', sans-serif;
        font-size: 12px; font-weight: 700;
        letter-spacing: 1px; text-transform: uppercase;
        color: var(--hx-text); margin-bottom: 4px;
      }

      .hx-bypass-card-link {
        font-size: 10px; color: var(--hx-accent);
        text-decoration: none; letter-spacing: 0.3px; display: block;
        white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      }

      .hx-bypass-card-link:hover { text-decoration: underline; }

      .hx-bypass-tick {
        position: absolute; top: 5px; right: 6px;
        width: 14px; height: 14px; border-radius: 50%;
        background: var(--hx-accent);
        display: none; align-items: center; justify-content: center;
        font-size: 8px; color: #000; font-weight: 700;
      }

      .hx-bypass-card.active .hx-bypass-tick { display: flex; }

      #hrydzx-status {
        margin-top: 14px; min-height: 20px; text-align: center;
        font-size: 11px; font-weight: 600; letter-spacing: .5px;
        color: var(--hx-sub);
      }

      /* LOADING */
      #hrydzx-loading {
        position: fixed; inset: 0; background: rgba(8,10,20,0.95);
        backdrop-filter: blur(8px); z-index: 2147483647;
        display: flex; align-items: center; justify-content: center;
      }

      .hx-spinner-wrap {
        text-align: center; background: var(--hx-card);
        padding: 36px 32px; border-radius: 16px;
        border: 1px solid var(--hx-border);
        box-shadow: 0 0 60px rgba(0,210,255,0.08); width: 260px;
      }

      .hx-spinner {
        width: 52px; height: 52px;
        border: 4px solid rgba(0,210,255,0.12);
        border-top-color: var(--hx-accent); border-radius: 50%;
        margin: 0 auto 22px;
        animation: hx-spin 0.9s linear infinite;
      }

      .hx-load-text {
        font-family: 'Rajdhani', sans-serif; font-size: 15px; font-weight: 700;
        color: var(--hx-accent); letter-spacing: 1.5px; text-transform: uppercase;
      }

      /* COUNTDOWN */
      #hrydzx-countdown {
        position: fixed; inset: 0; background: rgba(8,10,20,0.97);
        backdrop-filter: blur(10px); z-index: 2147483647;
        display: flex; align-items: center; justify-content: center;
      }

      .hx-cd-inner { text-align: center; }

      .hx-cd-ring {
        position: relative; width: 200px; height: 200px; margin: 0 auto;
      }

      .hx-cd-ring svg { transform: rotate(-90deg); }

      .hx-cd-number {
        position: absolute; inset: 0;
        display: flex; align-items: center; justify-content: center;
        font-family: 'Rajdhani', sans-serif;
        font-size: 54px; font-weight: 700; color: var(--hx-accent);
        text-shadow: 0 0 24px rgba(0,210,255,0.5);
      }

      .hx-cd-label {
        margin-top: 22px; font-family: 'Rajdhani', sans-serif;
        font-size: 18px; font-weight: 700;
        color: var(--hx-text); letter-spacing: 3px; text-transform: uppercase;
      }

      .hx-cd-powered {
        margin-top: 8px; font-size: 11px;
        color: var(--hx-muted); letter-spacing: 1px;
      }

      /* ANIMATIONS */
      @keyframes hx-pulse {
        0%,100% { opacity:1; box-shadow:0 0 8px var(--hx-accent); }
        50%      { opacity:.4; box-shadow:0 0 18px var(--hx-accent); }
      }

      @keyframes hx-fadeUp {
        from { opacity:0; transform:translateY(20px); }
        to   { opacity:1; transform:translateY(0); }
      }

      @keyframes hx-spin { to { transform:rotate(360deg); } }

      @media (max-width:600px) {
        .hx-nav { padding: 0 16px; }
        .hx-nav-links { display: none; }
        .hx-step { flex-direction: column; gap: 8px; }
        .hx-checker { padding: 24px 18px; }
        #hrydzx-card { width: 92vw; }
      }
    `;
    document.head.appendChild(style);
  }

  // ── BOOKMARKLET URL ───────────────────────────────────────────────────────
  const BOOKMARKLET = `javascript:(function(){window.HRYDZX_BOOKMARK_LOAD=true;fetch('https://raw.githubusercontent.com/hrydzxxx-create/aincrad-bypass/refs/heads/main/hrydzxxxscript.js'+'?t='+Date.now().toString(36)).then(r=>r.text()).then(t=>eval(t)).catch(()=>alert('Failed'));})();`;

  // ── WEBSITE UI ────────────────────────────────────────────────────────────
  function buildSiteUI() {
    injectStyles();
    $("hrydzx-site")?.remove();

    const site = document.createElement("div");
    site.id = "hrydzx-site";
    site.innerHTML = `
      <!-- NAV -->
      <nav class="hx-nav">
        <div class="hx-nav-logo">
          <span class="hx-nav-dot"></span>
          HrydzX
        </div>
        <div class="hx-nav-links">
          <a onclick="document.getElementById('hx-features').scrollIntoView({behavior:'smooth'})">Features</a>
          <a onclick="document.getElementById('hx-howtouse').scrollIntoView({behavior:'smooth'})">How To Use</a>
          <a onclick="document.getElementById('hx-keycheck').scrollIntoView({behavior:'smooth'})">Key Check</a>
          <a onclick="document.getElementById('hx-launch').scrollIntoView({behavior:'smooth'})">Launch</a>
        </div>
      </nav>

      <!-- HERO -->
      <div class="hx-hero">
        <div class="hx-hero-grid"></div>
        <div class="hx-badge"><span class="hx-badge-dot"></span>Aincrad Bypass · v3.0</div>
        <h1 class="hx-hero-title">HrydzX</h1>
        <p class="hx-hero-sub">A premium bypass tool built for speed and reliability. One click, one key — and you're in.</p>
        <div class="hx-hero-btns">
          <button class="hx-btn-primary" onclick="document.getElementById('hx-howtouse').scrollIntoView({behavior:'smooth'})">⚡ Get Started</button>
          <button class="hx-btn-outline" onclick="window.open('https://t.me/HrydzXxX','_blank')">✈ Telegram</button>
        </div>
      </div>

      <div class="hx-divider"></div>

      <!-- FEATURES -->
      <div id="hx-features" class="hx-section">
        <p class="hx-section-label">Why HrydzX</p>
        <h2 class="hx-section-title">Built Different</h2>
        <p class="hx-section-sub">Lightweight, fast, and easy to use. No installs. No extensions. Just a bookmark.</p>
        <div class="hx-features">
          <div class="hx-feat-card"><div class="hx-feat-icon">⚡</div><div class="hx-feat-title">Instant Bypass</div><div class="hx-feat-desc">One click from your bookmarks bar. No downloads, no installs, no extensions required.</div></div>
          <div class="hx-feat-card"><div class="hx-feat-icon">🔑</div><div class="hx-feat-title">Key System</div><div class="hx-feat-desc">Secure license key verification checked live against the server every session.</div></div>
          <div class="hx-feat-card"><div class="hx-feat-icon">🔄</div><div class="hx-feat-title">Auto Updates</div><div class="hx-feat-desc">Script updates silently on every run. You always have the latest version automatically.</div></div>
          <div class="hx-feat-card"><div class="hx-feat-icon">🛡️</div><div class="hx-feat-title">Secure Loader</div><div class="hx-feat-desc">Bookmark flag check prevents the script from running without proper authorization.</div></div>
          <div class="hx-feat-card"><div class="hx-feat-icon">⏱️</div><div class="hx-feat-title">Smooth Redirect</div><div class="hx-feat-desc">Animated SVG countdown ring before every redirect — clean and professional.</div></div>
          <div class="hx-feat-card"><div class="hx-feat-icon">✈️</div><div class="hx-feat-title">Community</div><div class="hx-feat-desc">Join our Telegram for key giveaways, updates, and support from the HrydzXxX community.</div></div>
        </div>
      </div>

      <div class="hx-divider"></div>

      <!-- HOW TO USE -->
      <div id="hx-howtouse" class="hx-section">
        <p class="hx-section-label">Setup Guide</p>
        <h2 class="hx-section-title">How To Use</h2>
        <p class="hx-section-sub">Get started in under 60 seconds. No technical knowledge needed.</p>
        <div class="hx-steps">
          <div class="hx-step">
            <div class="hx-step-num">01</div>
            <div>
              <div class="hx-step-title">Get Your Key</div>
              <div class="hx-step-desc">Join our Telegram channel and grab a free license key from the pinned posts or key giveaways.</div>
            </div>
          </div>
          <div class="hx-step">
            <div class="hx-step-num">02</div>
            <div style="width:100%">
              <div class="hx-step-title">Add The Bookmarklet</div>
              <div class="hx-step-desc">Create a new bookmark in your browser. Paste the code below as the bookmark URL and save it.</div>
              <div class="hx-code-block" id="hx-bm-code">${BOOKMARKLET}<button class="hx-copy-btn" id="hx-copy-bm">COPY</button></div>
            </div>
          </div>
          <div class="hx-step">
            <div class="hx-step-num">03</div>
            <div>
              <div class="hx-step-title">Click The Bookmark</div>
              <div class="hx-step-desc">Navigate to any page and click the bookmark. The HrydzX panel will appear on screen.</div>
            </div>
          </div>
          <div class="hx-step">
            <div class="hx-step-num">04</div>
            <div>
              <div class="hx-step-title">Enter Key & Bypass</div>
              <div class="hx-step-desc">Paste your license key into the input and click Verify Key. You'll be redirected after a short countdown.</div>
            </div>
          </div>
        </div>
      </div>

      <div class="hx-divider"></div>

      <!-- KEY CHECKER -->
      <div id="hx-keycheck" class="hx-section">
        <p class="hx-section-label" style="text-align:center">Verification</p>
        <h2 class="hx-section-title" style="text-align:center">Check Your Key</h2>
        <p class="hx-section-sub" style="margin:0 auto 36px;text-align:center">Instantly verify if your license key is active.</p>
        <div class="hx-checker">
          <div class="hx-checker-title">Key Validator</div>
          <div class="hx-checker-sub">Enter your key below to check if it's valid</div>
          <input class="hx-checker-input" id="hx-kc-input" type="text" placeholder="Paste your key here…" autocomplete="off" spellcheck="false">
          <button class="hx-checker-btn" id="hx-kc-btn">⚡ Verify Key</button>
          <div class="hx-checker-status" id="hx-kc-status"></div>
        </div>
      </div>

      <div class="hx-divider"></div>

      <!-- LAUNCH -->
      <div id="hx-launch" class="hx-section" style="text-align:center">
        <p class="hx-section-label">Ready?</p>
        <h2 class="hx-section-title">Launch Bypass</h2>
        <p class="hx-section-sub" style="margin:0 auto 32px">Click below to open the key panel and begin the bypass process.</p>
        <button class="hx-btn-primary" id="hx-launch-btn" style="font-size:16px;padding:16px 40px;">⚡ Launch HrydzX</button>
      </div>

      <div class="hx-divider"></div>

      <!-- FOOTER -->
      <div class="hx-footer">
        <div class="hx-footer-logo">HrydzX · Aincrad Bypass</div>
        <div class="hx-footer-sub">Powered by HrydzXxX · v3.0</div>
        <div class="hx-footer-links">
          <a onclick="window.open('https://t.me/HrydzXxX','_blank')">Telegram</a>
          <a onclick="document.getElementById('hx-features').scrollIntoView({behavior:'smooth'})">Features</a>
          <a onclick="document.getElementById('hx-howtouse').scrollIntoView({behavior:'smooth'})">Setup</a>
          <a onclick="document.getElementById('hx-keycheck').scrollIntoView({behavior:'smooth'})">Key Check</a>
        </div>
      </div>
    `;
    document.body.appendChild(site);

    // Copy bookmarklet
    $("hx-copy-bm").addEventListener("click", () => {
      navigator.clipboard.writeText(BOOKMARKLET).then(() => {
        const btn = $("hx-copy-bm");
        btn.textContent = "COPIED!";
        setTimeout(() => btn.textContent = "COPY", 2000);
      });
    });

    // Key checker
    const kcInput  = $("hx-kc-input");
    const kcBtn    = $("hx-kc-btn");
    const kcStatus = $("hx-kc-status");

    async function checkKey() {
      const key = kcInput.value.trim();
      if (!key) { kcStatus.style.color = "var(--hx-red)"; kcStatus.textContent = "Please enter a key."; return; }
      kcBtn.disabled = true;
      kcStatus.style.color = "var(--hx-accent)"; kcStatus.textContent = "Checking…";
      try {
        const raw  = await fetchText(URLS.key);
        const keys = raw.split("\n").map(s => s.trim()).filter(Boolean);
        if (keys.includes(key)) {
          kcStatus.style.color = "var(--hx-green)"; kcStatus.textContent = "✓ Valid key — you're good to go!";
        } else {
          kcStatus.style.color = "var(--hx-red)"; kcStatus.textContent = "✗ Invalid key. Join Telegram to get one.";
        }
      } catch (_) {
        kcStatus.style.color = "var(--hx-red)"; kcStatus.textContent = "Server error — try again.";
      }
      kcBtn.disabled = false;
    }

    kcBtn.addEventListener("click", checkKey);
    kcInput.addEventListener("keydown", e => { if (e.key === "Enter") checkKey(); });

    // Launch button — closes site, opens auth
    $("hx-launch-btn").addEventListener("click", () => {
      site.remove();
      buildAuthUI();
    });
  }

  // ── AUTH PANEL ────────────────────────────────────────────────────────────
  const BYPASSES = [
    { id: "aincrad", name: "Aincrad Bypass", getkey: "https://aincradmods.com/getkey?token=7e6d3dc2a446411c870605827719f7d2" },
    { id: "hunter",  name: "Hunter Bypass",  getkey: "https://huntermods.in/activekey.php?active_token=PNvWZMtpBYIuiXxGz6Rh9aco" }
  ];

  function buildAuthUI() {
    injectStyles();
    $("hrydzx-overlay")?.remove();

    let selectedBypass = BYPASSES[0];

    const overlay = document.createElement("div");
    overlay.id = "hrydzx-overlay";
    overlay.innerHTML = `
      <div id="hrydzx-card">
        <div id="hrydzx-header">
          <span class="hx-dot"></span>
          <span class="hx-title">HrydzX · Aincrad Bypass</span>
          <span class="hx-version">v3.0</span>
        </div>
        <div id="hrydzx-body">
          <span class="hx-bypass-label">Select Bypass</span>
          <div class="hx-bypass-grid">
            ${BYPASSES.map(b => `
              <div class="hx-bypass-card${b.id === 'aincrad' ? ' active' : ''}" data-id="${b.id}">
                <span class="hx-bypass-tick">✓</span>
                <div class="hx-bypass-card-name">${b.name}</div>
                <a class="hx-bypass-card-link" href="${b.getkey}" target="_blank" onclick="event.stopPropagation()">Get Key →</a>
              </div>
            `).join('')}
          </div>
          <label class="hx-input-label">License Key</label>
          <input id="hrydzx-input" type="text" placeholder="Enter your key…" autocomplete="off" spellcheck="false">
          <button class="hx-action-btn" id="hrydzx-verify-btn">⚡ Verify Key</button>
          <button class="hx-action-btn" id="hrydzx-tg-btn">✈ Telegram HrydzXxX</button>
          <div id="hrydzx-status">READY</div>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    const verifyBtn = $("hrydzx-verify-btn");
    const tgBtn     = $("hrydzx-tg-btn");
    const input     = $("hrydzx-input");
    const status    = $("hrydzx-status");

    // Bypass card selection
    overlay.querySelectorAll(".hx-bypass-card").forEach(card => {
      card.addEventListener("click", () => {
        overlay.querySelectorAll(".hx-bypass-card").forEach(c => c.classList.remove("active"));
        card.classList.add("active");
        selectedBypass = BYPASSES.find(b => b.id === card.dataset.id);
      });
    });

    input.addEventListener("keydown", e => { if (e.key === "Enter") verifyBtn.click(); });

    tgBtn.addEventListener("click", async () => {
      try {
        const url = (await fetchText(URLS.telegram)).trim();
        if (url.startsWith("http")) window.open(url, "_blank");
      } catch (_) {}
    });

    verifyBtn.addEventListener("click", async () => {
      const key = input.value.trim();
      if (!key) { setStatus("Please enter your key!", "red"); return; }

      setStatus("Connecting to server…", "accent");
      setDisabled(true);

      try {
        const raw  = await fetchText(URLS.key);
        const keys = raw.split("\n").map(s => s.trim()).filter(Boolean);

        if (!keys.includes(key)) {
          setStatus("Invalid license key!", "red");
          setDisabled(false);
          return;
        }

        setStatus("Key validated ✓", "green");
        await sleep(800);
        overlay.remove();
        await showLoading();

        // Fetch redirect URL from hrydzx.txt — each line: "Name","URL"
        const raw2 = await fetchText(URLS.redirect);
        let redirectUrl = null;
        for (const line of raw2.split("\n")) {
          const m = line.match(/"([^"]+)",\s*"(https?:[^"]+)"/);
          if (m && m[1].toLowerCase().replace(/[^a-z]/g,'') === selectedBypass.id.replace(/[^a-z]/g,'')) {
            redirectUrl = m[2].trim();
            break;
          }
        }
        // Fallback: if old plain URL format
        if (!redirectUrl) redirectUrl = raw2.trim();

        if (redirectUrl && redirectUrl.startsWith("http")) await showCountdown(redirectUrl);

      } catch (_) {
        setStatus("Server error — try again.", "red");
        setDisabled(false);
      }
    });

    function setStatus(msg, type) {
      const c = { red:"var(--hx-red)", green:"var(--hx-green)", accent:"var(--hx-accent)" };
      status.innerHTML = `<span style="color:${c[type]||"var(--hx-sub)"};">${msg}</span>`;
    }

    function setDisabled(v) {
      verifyBtn.disabled = tgBtn.disabled = v;
    }
  }

  // ── LOADING ───────────────────────────────────────────────────────────────
  async function showLoading() {
    return new Promise(async resolve => {
      const el = document.createElement("div");
      el.id = "hrydzx-loading";
      el.innerHTML = `
        <div class="hx-spinner-wrap">
          <div class="hx-spinner"></div>
          <p id="hrydzx-load-text" class="hx-load-text">Checking Update…</p>
        </div>`;
      document.body.appendChild(el);

      let updated = false;
      try {
        const txt = await fetch(URLS.update).then(r => r.text());
        if (txt.includes("GitHub Updated")) updated = true;
      } catch (_) {}

      await sleep(3000);
      const txt = $("hrydzx-load-text");
      if (txt) {
        txt.style.color = updated ? "var(--hx-green)" : "var(--hx-red)";
        txt.textContent = updated ? "Updated Successfully ✓" : "No Update Available";
      }
      await sleep(1200);
      el.remove();
      resolve();
    });
  }

  // ── COUNTDOWN ─────────────────────────────────────────────────────────────
  function showCountdown(url) {
    return new Promise(resolve => {
      const TOTAL = Math.floor(Math.random() * 4) + 22;
      const CIRC  = 2 * Math.PI * 88;

      const el = document.createElement("div");
      el.id = "hrydzx-countdown";
      el.innerHTML = `
        <div class="hx-cd-inner">
          <div class="hx-cd-ring">
            <svg width="200" height="200" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="88" fill="none" stroke="rgba(0,210,255,0.1)" stroke-width="10"/>
              <circle id="hx-cd-progress" cx="100" cy="100" r="88" fill="none"
                stroke="var(--hx-accent)" stroke-width="10"
                stroke-dasharray="${CIRC}" stroke-dashoffset="0"
                stroke-linecap="round"/>
            </svg>
            <div class="hx-cd-number" id="hx-cd-num">${TOTAL}</div>
          </div>
          <p class="hx-cd-label">Redirecting…</p>
          <p class="hx-cd-powered">Powered by HrydzXxX</p>
        </div>`;
      document.body.appendChild(el);

      let remaining = TOTAL;
      const ring = $("hx-cd-progress");
      const num  = $("hx-cd-num");

      const timer = setInterval(() => {
        remaining--;
        num.textContent = remaining;
        ring.style.strokeDashoffset = CIRC * (remaining / TOTAL);
        if (remaining <= 0) {
          clearInterval(timer);
          el.remove();
          window.location.replace(url);
          resolve();
        }
      }, 1000);
    });
  }

  // ── BOOT ──────────────────────────────────────────────────────────────────
  buildSiteUI();

})();
