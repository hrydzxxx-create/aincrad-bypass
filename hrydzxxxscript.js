(function () {
  "use strict";

  if (typeof window.RAMA_BOOKMARK_LOAD === "undefined") {
    console.log("%cAccess Denied - Bookmark Required", "color:#ff0000;font-size:15px;font-weight:bold");
    return;
  }

  const URLS = {
    key:      "https://raw.githubusercontent.com/hrydzxxx-create/aincrad-bypass/refs/heads/main/key.txt",
    redirect: "https://raw.githubusercontent.com/hrydzxxx-create/aincrad-bypass/refs/heads/main/hrydzx.txt",
    telegram: "https://raw.githubusercontent.com/hrydzxxx-create/aincrad-bypass/refs/heads/main/button.txt",
    update:   "https://rm.rama-modz.workers.dev/",
    getkey:   "https://aincradmods.com/getkey?token=7e6d3dc2a446411c870605827719f7d2"
  };

  // ── Helpers ──────────────────────────────────────────────────────────────
  const $ = id => document.getElementById(id);
  const fetchText = url => fetch(url + "?t=" + Date.now()).then(r => r.text());

  function injectStyles() {
    if ($("hrydzx-styles")) return;
    const fonts = [
      "https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=DM+Sans:wght@300;400;500;600&display=swap"
    ];
    fonts.forEach(href => {
      const l = document.createElement("link");
      l.rel = "stylesheet"; l.href = href;
      document.head.appendChild(l);
    });

    const style = document.createElement("style");
    style.id = "hrydzx-styles";
    style.textContent = `
      :root {
        --hx-bg:       #0d0f1a;
        --hx-card:     #131625;
        --hx-border:   rgba(0,210,255,0.12);
        --hx-accent:   #00d2ff;
        --hx-accent2:  #3a7bd5;
        --hx-tg:       #229ED9;
        --hx-success:  #00e676;
        --hx-error:    #ff1744;
        --hx-muted:    #5a6080;
        --hx-text:     #dde3f5;
        --hx-subtext:  #8892b0;
      }

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
        border-radius: 16px;
        width: 340px;
        box-shadow: 0 0 60px rgba(0,210,255,0.06), 0 24px 60px rgba(0,0,0,0.7);
        overflow: hidden;
        animation: hx-rise 0.35s cubic-bezier(0.22,1,0.36,1) both;
      }

      @keyframes hx-rise {
        from { opacity:0; transform: translateY(24px) scale(0.97); }
        to   { opacity:1; transform: translateY(0)   scale(1); }
      }

      #hrydzx-header {
        background: linear-gradient(135deg, #0d1528 0%, #111827 100%);
        border-bottom: 1px solid var(--hx-border);
        padding: 16px 20px;
        display: flex; align-items: center; gap: 12px;
        position: relative; overflow: hidden;
      }

      #hrydzx-header::before {
        content:'';
        position: absolute; left:-40px; top:-40px;
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

      @keyframes hx-pulse {
        0%,100% { opacity:1; box-shadow:0 0 8px var(--hx-accent); }
        50%      { opacity:.5; box-shadow:0 0 18px var(--hx-accent); }
      }

      .hx-title {
        font-family: 'Rajdhani', sans-serif;
        font-size: 16px; font-weight: 700;
        letter-spacing: 1.5px;
        color: var(--hx-text);
        text-transform: uppercase;
      }

      .hx-subtitle {
        margin-left: auto;
        font-size: 10px; color: var(--hx-muted);
        letter-spacing: 1px; text-transform: uppercase;
      }

      #hrydzx-body { padding: 24px 20px 20px; }

      .hx-label {
        font-size: 10px; font-weight: 600;
        color: var(--hx-subtext);
        text-transform: uppercase; letter-spacing: 1.2px;
        margin-bottom: 8px;
      }

      #hrydzx-input {
        width: 100%; padding: 11px 14px;
        background: var(--hx-bg);
        border: 1px solid rgba(255,255,255,0.07);
        border-radius: 8px;
        color: var(--hx-text);
        font-size: 13px; font-family: 'DM Sans', sans-serif;
        outline: none; box-sizing: border-box;
        transition: border-color .2s, box-shadow .2s;
        margin-bottom: 16px;
      }

      #hrydzx-input:focus {
        border-color: var(--hx-accent);
        box-shadow: 0 0 0 3px rgba(0,210,255,0.1);
      }

      #hrydzx-input::placeholder { color: var(--hx-muted); }

      .hx-btn {
        width: 100%; padding: 12px;
        border: none; border-radius: 8px;
        font-family: 'Rajdhani', sans-serif;
        font-size: 14px; font-weight: 700;
        letter-spacing: 1.5px; text-transform: uppercase;
        cursor: pointer; transition: opacity .2s, transform .15s;
        margin-bottom: 10px;
      }

      .hx-btn:active { transform: scale(0.98); }
      .hx-btn:disabled { opacity: .4; cursor: not-allowed; }

      #hrydzx-verify-btn {
        background: linear-gradient(135deg, var(--hx-accent2) 0%, var(--hx-accent) 100%);
        color: #fff;
        box-shadow: 0 4px 20px rgba(0,210,255,0.25);
      }

      #hrydzx-getkey-btn {
        background: linear-gradient(135deg, #1a472a 0%, #27ae60 100%);
        color: #fff;
        box-shadow: 0 4px 16px rgba(39,174,96,0.2);
      }

      #hrydzx-tg-btn {
        background: var(--hx-tg);
        color: #fff;
        margin-bottom: 0;
      }

      #hrydzx-status {
        margin-top: 14px; min-height: 20px;
        text-align: center; font-size: 11px;
        font-weight: 600; letter-spacing: .5px;
        color: var(--hx-subtext);
      }

      /* ── Loading Overlay ── */
      #hrydzx-loading {
        position: fixed; inset: 0;
        background: rgba(8,10,20,0.95);
        backdrop-filter: blur(8px);
        z-index: 2147483647;
        display: flex; align-items: center; justify-content: center;
        font-family: 'DM Sans', sans-serif;
      }

      .hx-spinner-wrap {
        text-align: center;
        background: var(--hx-card);
        padding: 36px 32px;
        border-radius: 16px;
        border: 1px solid var(--hx-border);
        box-shadow: 0 0 60px rgba(0,210,255,0.08);
        width: 260px;
      }

      .hx-spinner {
        width: 52px; height: 52px;
        border: 4px solid rgba(0,210,255,0.12);
        border-top-color: var(--hx-accent);
        border-radius: 50%;
        margin: 0 auto 22px;
        animation: hx-spin 0.9s linear infinite;
      }

      @keyframes hx-spin { to { transform: rotate(360deg); } }

      .hx-load-text {
        font-family: 'Rajdhani', sans-serif;
        font-size: 15px; font-weight: 700;
        color: var(--hx-accent);
        letter-spacing: 1.5px; text-transform: uppercase;
      }

      /* ── Countdown Overlay ── */
      #hrydzx-countdown {
        position: fixed; inset: 0;
        background: rgba(8,10,20,0.97);
        backdrop-filter: blur(10px);
        z-index: 2147483647;
        display: flex; align-items: center; justify-content: center;
        font-family: 'DM Sans', sans-serif;
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
        font-size: 54px; font-weight: 700;
        color: var(--hx-accent);
        text-shadow: 0 0 24px rgba(0,210,255,0.5);
      }

      .hx-cd-label {
        margin-top: 22px;
        font-family: 'Rajdhani', sans-serif;
        font-size: 18px; font-weight: 700;
        color: var(--hx-text);
        letter-spacing: 3px; text-transform: uppercase;
      }

      .hx-cd-powered {
        margin-top: 8px;
        font-size: 11px; color: var(--hx-muted);
        letter-spacing: 1px;
      }
    `;
    document.head.appendChild(style);
  }

  function buildAuthUI() {
    injectStyles();
    $("hrydzx-overlay")?.remove();

    const overlay = document.createElement("div");
    overlay.id = "hrydzx-overlay";
    overlay.innerHTML = `
      <div id="hrydzx-card">
        <div id="hrydzx-header">
          <span class="hx-dot"></span>
          <span class="hx-title">HrydzX · Aincrad Bypass</span>
          <span class="hx-subtitle">v3.0</span>
        </div>
        <div id="hrydzx-body">
          <p class="hx-label">License Key</p>
          <input id="hrydzx-input" type="text" placeholder="Enter your key…" autocomplete="off" spellcheck="false">
          <button class="hx-btn" id="hrydzx-verify-btn">⚡ Verify Key</button>
          <button class="hx-btn" id="hrydzx-getkey-btn">🔑 Get Key</button>
          <button class="hx-btn" id="hrydzx-tg-btn">✈ Telegram HrydzXxX</button>
          <div id="hrydzx-status">READY</div>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    const verifyBtn  = $("hrydzx-verify-btn");
    const getKeyBtn  = $("hrydzx-getkey-btn");
    const tgBtn      = $("hrydzx-tg-btn");
    const input      = $("hrydzx-input");
    const status     = $("hrydzx-status");

    // Enter key support
    input.addEventListener("keydown", e => { if (e.key === "Enter") verifyBtn.click(); });

    // Get Key
    getKeyBtn.addEventListener("click", () => {
      window.open(URLS.getkey, "_blank");
    });

    // Telegram
    tgBtn.addEventListener("click", async () => {
      try {
        const url = (await fetchText(URLS.telegram)).trim();
        if (url.startsWith("http")) window.open(url, "_blank");
      } catch (_) {}
    });

    // Verify
    verifyBtn.addEventListener("click", async () => {
      const key = input.value.trim();
      if (!key) {
        setStatus("Please enter your key!", "error");
        return;
      }

      setStatus("Connecting to server…", "accent");
      setDisabled(true);

      try {
        const raw   = await fetchText(URLS.key);
        const keys  = raw.split("\n").map(s => s.trim()).filter(Boolean);

        if (!keys.includes(key)) {
          setStatus("Invalid license key!", "error");
          setDisabled(false);
          return;
        }

        setStatus("Key validated ✓", "success");
        await sleep(800);
        overlay.remove();

        await showLoading();
        const redirectUrl = (await fetchText(URLS.redirect)).trim();
        if (redirectUrl.startsWith("http")) await showCountdown(redirectUrl);

      } catch (_) {
        setStatus("Server error — try again.", "error");
        setDisabled(false);
      }
    });

    function setStatus(msg, type) {
      const colors = { error: "var(--hx-error)", success: "var(--hx-success)", accent: "var(--hx-accent)" };
      status.innerHTML = `<span style="color:${colors[type] || "var(--hx-subtext)"};">${msg}</span>`;
    }

    function setDisabled(v) {
      verifyBtn.disabled = tgBtn.disabled = v;
    }
  }

  async function showLoading() {
    return new Promise(async resolve => {
      injectStyles();
      const el = document.createElement("div");
      el.id = "hrydzx-loading";
      el.innerHTML = `
        <div class="hx-spinner-wrap">
          <div class="hx-spinner"></div>
          <p id="hrydzx-load-text" class="hx-load-text">Checking Update…</p>
        </div>
      `;
      document.body.appendChild(el);

      let updated = false;
      try {
        const txt = await fetch(URLS.update).then(r => r.text());
        if (txt.includes("GitHub Updated")) updated = true;
      } catch (_) {}

      await sleep(3000);
      const txt = $("hrydzx-load-text");
      if (txt) {
        txt.style.color = updated ? "var(--hx-success)" : "var(--hx-error)";
        txt.textContent = updated ? "Updated Successfully ✓" : "No Update Available";
      }

      await sleep(1200);
      el.remove();
      resolve();
    });
  }

  function showCountdown(url) {
    return new Promise(resolve => {
      injectStyles();
      const TOTAL = Math.floor(Math.random() * 4) + 22;
      const CIRC  = 2 * Math.PI * 88; // r=88

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
        </div>
      `;
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

  function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

  // ── Boot ─────────────────────────────────────────────────────────────────
  buildAuthUI();

})();
