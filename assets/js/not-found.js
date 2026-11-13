/**
 * 404 page: shows one Hitchhiker's-themed gag at random (or ?gag=<name>),
 * steps through the rest with "Try another", and suggests real pages
 * close to the requested address using /sitemap.xml.
 * Gags are turned on/off in 404.md; each gag's markup is in _includes/not-found/.
 */
document.addEventListener("DOMContentLoaded", () => {
  const gags = [...document.querySelectorAll(".nf-gag")];
  const which = document.querySelector("[data-which]");
  const another = document.querySelector("[data-another]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Timers registered by the running gag, cleared when switching to another
  let timers = [];
  const later = (fn, ms) => timers.push(setTimeout(fn, reduceMotion ? 0 : ms));
  const every = (fn, ms) => timers.push(setInterval(fn, ms));
  const stopAll = () => { timers.forEach((t) => { clearTimeout(t); clearInterval(t); }); timers = []; };

  // ── Sitemap: real pages on the site, used by suggestions and the Improbability Drive ──
  const sitemap = fetch("/sitemap.xml")
    .then((r) => (r.ok ? r.text() : ""))
    .then((xml) => [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname))
    .catch(() => []);

  // ── Gags ──────────────────────────────────────────────────────────────────
  const init = {
    "guide-entry"(el) {
      const pre = el.querySelector("[data-type]");
      const text = pre.dataset.full || (pre.dataset.full = pre.textContent);
      if (reduceMotion) { pre.textContent = text; return; }
      pre.textContent = "";
      let i = 0;
      every(() => { if (i <= text.length) pre.textContent = text.slice(0, i++) + (i <= text.length ? "█" : ""); }, 18);
    },

    "vogon-notice"(el) {
      const box = el.querySelector("[data-notice]");
      const count = el.querySelector("[data-count]");
      const after = el.querySelector("[data-after]");
      box.classList.remove("is-demolished");
      after.hidden = true;
      let n = 10;
      count.textContent = n;
      if (reduceMotion) { count.textContent = 0; after.hidden = false; return; }
      every(() => {
        if (n <= 0) return;
        count.textContent = --n;
        if (n === 0) { box.classList.add("is-demolished"); later(() => { after.hidden = false; }, 900); }
      }, 1000);
    },

    "deep-thought"(el) {
      const bar = el.querySelector("[data-bar]");
      const status = el.querySelector("[data-status]");
      const answer = el.querySelector("[data-answer]");
      answer.hidden = true;
      let pct = 0;
      const finish = () => { bar.style.width = "100%"; status.textContent = "Search complete."; answer.hidden = false; };
      if (reduceMotion) return finish();
      every(() => {
        if (pct >= 100) return;
        pct = Math.min(100, pct + 3 + Math.random() * 6);
        // Years fall steeply with progress, reaching zero as the bar fills
        const years = Math.round(7500000 * Math.pow(1 - pct / 100, 3));
        bar.style.width = pct + "%";
        status.textContent = `Estimated time remaining: ${years.toLocaleString()} years`;
        if (pct >= 100) later(finish, 400);
      }, 300);
    },

    "improbability-drive"(el) {
      const btn = el.querySelector("[data-engage]");
      const readout = el.querySelector("[data-readout]");
      const odds = el.querySelector("[data-odds]");
      const event = el.querySelector("[data-event]");
      readout.hidden = true;
      btn.disabled = false;
      const events = [
        "A sperm whale materializes several miles above a planet and begins to reconsider its life choices.",
        "A bowl of petunias appears, looks deeply resigned, and vanishes.",
        "Your left shoe briefly becomes a small, polite poem.",
        "Everything turns into knitwear. Then, mercifully, back again.",
      ];
      btn.onclick = async () => {
        btn.disabled = true;
        readout.hidden = false;
        const exps = [276709, 65536, 4096, 512, 64, 8, 2, 1];
        exps.forEach((e, i) => later(() => {
          odds.textContent = e > 1 ? `Improbability: 2^${e.toLocaleString()} to 1 against` : "Improbability: 1 to 1. Normality achieved.";
          event.textContent = events[i % events.length];
        }, i * 650));
        const pages = (await sitemap).filter((p) => p !== location.pathname);
        const dest = pages.length ? pages[Math.floor(Math.random() * pages.length)] : "/";
        later(() => { event.textContent = `Arriving at ${dest} …`; }, exps.length * 650);
        later(() => { location.href = dest; }, exps.length * 650 + 1400);
      };
    },

    marvin(el) {
      const log = el.querySelector("[data-log]");
      const lines = [
        "Page not found. Not that anyone asked how I feel about it.",
        "Brain the size of a planet, and they've got me looking for a page that doesn't exist.",
        "I've searched every directory. Twice. It was every bit as dull as I expected.",
        "I'd make a joke about it, but you wouldn't laugh, and then I'd feel worse.",
        "Don't mind me. I'll just stay here in the 404, where nobody visits.",
        "The menu is up there. You'll probably enjoy it. People do, apparently.",
      ];
      log.innerHTML = "";
      let i = 0;
      const add = () => {
        if (i >= lines.length) return;
        const li = document.createElement("li");
        li.textContent = `[sigh ${String(i + 1).padStart(2, "0")}] ${lines[i++]}`;
        log.appendChild(li);
      };
      add();
      if (reduceMotion) { while (i < lines.length) add(); return; }
      every(add, 2600);
    },

    "vogon-poetry"(el) {
      const choices = el.querySelector("[data-choices]");
      const result = el.querySelector("[data-result]");
      result.hidden = true;
      choices.hidden = false;
      el.classList.remove("is-airlocked");
      choices.querySelectorAll("button").forEach((b) => {
        b.onclick = () => {
          choices.hidden = true;
          result.hidden = false;
          if (b.dataset.verdict === "good") {
            result.innerHTML = 'The captain is visibly moved. You are free to go. <a href="/">Proceed to the Interactive Menu &rarr;</a>';
          } else {
            result.textContent = "Guards! Take this one to the airlock. Ejecting you to the home page…";
            el.classList.add("is-airlocked");
            later(() => { location.href = "/"; }, 2200);
          }
        };
      });
    },

    "sub-etha"(el) {
      const qso = el.querySelector("[data-qso]");
      const needle = el.querySelector("[data-needle]");
      const morse = el.querySelector("[data-morse]");
      const beep = el.querySelector("[data-beep]");
      const path = location.pathname === "/404.html" ? "(unknown)" : location.pathname;
      const lines = [
        "CQ CQ CQ de K0FLB K0FLB K0FLB",
        `Calling station ${path}`,
        "Listening…",
        "Listening…",
        "No reply. Station not on the air.",
      ];
      qso.textContent = "";
      lines.forEach((line, i) => later(() => { qso.textContent += line + "\n"; }, i * 900));
      if (!reduceMotion) every(() => { needle.style.width = (2 + Math.random() * 6) + "%"; }, 180);

      // Morse "....- ----- ....-" played on demand (never automatically)
      beep.onclick = () => {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        if (!Ctx) return;
        const ctx = new Ctx();
        const unit = 0.08;
        let t = ctx.currentTime + 0.05;
        for (const ch of morse.textContent) {
          if (ch === " ") { t += unit * 3; continue; }
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.frequency.value = 700;
          gain.gain.value = 0.15;
          osc.connect(gain).connect(ctx.destination);
          const len = ch === "." ? unit : unit * 3;
          osc.start(t);
          osc.stop(t + len);
          t += len + unit;
        }
      };
    },

    "text-adventure"(el) {
      const screen = el.querySelector("[data-screen]");
      const form = el.querySelector("[data-form]");
      const input = el.querySelector("[data-input]");
      const scoreEl = el.querySelector("[data-score]");
      const ROOM =
        "MISSING PAGE\n" +
        "You are standing in the place where a web page used to be. It is very dark, but not in an interesting way. " +
        "A large yellow bulldozer idles nearby. Its driver is reading a clipboard.";
      let state;

      const print = (text, cls) => {
        const p = document.createElement("p");
        if (cls) p.className = cls;
        p.textContent = text;
        screen.appendChild(p);
        screen.scrollTop = screen.scrollHeight;
      };
      const status = () => { scoreEl.textContent = `Score: ${state.score}   Turns: ${state.turns}`; };
      const start = () => {
        state = { turns: 0, score: 0, towel: false, lying: false, over: false };
        screen.innerHTML = "";
        print(ROOM);
        print("There is a towel here.");
        print("(Type HELP if you're lost. You are.)", "nf-if__hint");
        status();
      };

      const doom = [
        "The bulldozer driver checks his watch.",
        "The bulldozer's engine coughs into life.",
        "The bulldozer edges forward, crushing a small and entirely innocent hyperlink.",
        "The bulldozer is now uncomfortably close.",
      ];

      const die = () => {
        state.over = true;
        print("The bulldozer rolls forward with a cheerful rumble. There is a short, flat noise, which is you.");
        print("****  You have been demolished  ****", "nf-if__death");
        print(`You scored ${state.score} out of a possible 42, in ${state.turns} turns, earning the rank of Mostly Harmless.`);
        print("Would you like to RESTART, or go HOME?");
      };

      const win = () => {
        state.over = true;
        state.score = 42;
        status();
        print("You stick out your thumb. A passing spaceship, finding this wildly improbable, stops anyway.");
        print("****  You have escaped the 404  ****", "nf-if__win");
        print("You are whisked back to the Interactive Menu…");
        later(() => { location.href = "/"; }, 2500);
      };

      const turn = () => {
        state.turns++;
        status();
        if (state.lying) { state.lying = false; print("The driver sighs and waits for you to get bored."); return; }
        if (state.turns >= 6) return die();
        if (state.turns >= 2) print(doom[Math.min(state.turns - 2, doom.length - 1)]);
      };

      const handle = (raw) => {
        const cmd = raw.trim().toLowerCase().replace(/[^a-z' ]/g, "").replace(/\s+/g, " ");
        print("> " + raw, "nf-if__echo");
        if (!cmd) return print("I beg your pardon?");

        if (state.over) {
          if (/^(restart|r)$/.test(cmd)) return start();
          if (/^(home|quit|q|menu)$/.test(cmd)) { location.href = "/"; return; }
          return print("Would you like to RESTART, or go HOME?");
        }

        if (/^(look|l)$/.test(cmd)) { print(ROOM); if (!state.towel) print("There is a towel here."); return turn(); }
        if (/^(inventory|inv|i)$/.test(cmd)) {
          print(state.towel ? "You are carrying: a towel, and a mild sense of unease." : "You are carrying: a mild sense of unease.");
          return turn();
        }
        if (/^(take|get|pick up) towel$/.test(cmd)) {
          if (state.towel) return print("You already have it. A hitchhiker who knows where their towel is can relax slightly.");
          state.towel = true;
          state.score += 10;
          print("Taken. You feel the quiet confidence of someone who knows where their towel is.");
          return turn();
        }
        if (/^(help|hint|hints)$/.test(cmd)) return print("Try LOOK, INVENTORY, TAKE TOWEL, WAIT, LIE DOWN, READ CLIPBOARD, or HITCHHIKE. Or panic. Actually, don't panic.");
        if (/^(don'?t panic)$/.test(cmd)) { state.score += 1; print("Good advice. You feel much better."); return turn(); }
        if (/^panic$/.test(cmd)) { print("You panic. It doesn't help. It never does."); return turn(); }
        if (/^(wait|z)$/.test(cmd)) { print("Time passes."); return turn(); }
        if (/^(lie down|lie|lie in front of bulldozer)$/.test(cmd)) {
          state.lying = true;
          print("You lie down in front of the bulldozer. This is a classic move, and it buys you exactly one turn.");
          return turn();
        }
        if (/^(read|examine|x) (clipboard|bulldozer|driver)$/.test(cmd)) {
          print('The clipboard says: "PAGE 404 — DEMOLISH TODAY." The driver gives you a sympathetic shrug.');
          return turn();
        }
        if (/^(hitchhike|thumb|stick out thumb|hitch)$/.test(cmd)) {
          if (state.towel) return win();
          print("Nobody picks up a hitchhiker without a towel. It's practically the first rule.");
          return turn();
        }
        if (/^(n|s|e|w|north|south|east|west|up|down|go .*)$/.test(cmd)) {
          print("There is nowhere to go. That's rather the problem with missing pages.");
          return turn();
        }
        print(`I don't know the word "${cmd.split(" ")[0]}".`);
      };

      form.onsubmit = (e) => { e.preventDefault(); handle(input.value); input.value = ""; };
      start();
    },
  };

  // ── Picking and switching gags ───────────────────────────────────────────
  const show = (index, focus) => {
    stopAll();
    gags.forEach((g, i) => { g.hidden = i !== index; });
    const gag = gags[index];
    const name = gag.dataset.gag;
    if (init[name]) init[name](gag);
    which.textContent = `${index + 1} of ${gags.length}: ${name}`;
    const url = new URL(location.href);
    url.searchParams.set("gag", name);
    history.replaceState(null, "", url);
    if (focus && name === "text-adventure") gag.querySelector("[data-input]").focus();
    current = index;
  };

  let current = 0;
  if (gags.length) {
    const requested = new URLSearchParams(location.search).get("gag");
    const match = gags.findIndex((g) => g.dataset.gag === requested);
    show(match >= 0 ? match : Math.floor(Math.random() * gags.length));
    another.onclick = () => show((current + 1) % gags.length, true);
    if (gags.length < 2) another.hidden = true;
  } else {
    another.hidden = true;
  }

  // ── "Did you mean…" suggestions from the sitemap ─────────────────────────
  const requestedPath = location.pathname.toLowerCase().replace(/\/index\.html$/, "/");
  if (requestedPath === "/404.html") return;

  const distance = (a, b) => {
    const row = Array.from({ length: b.length + 1 }, (_, i) => i);
    for (let i = 1; i <= a.length; i++) {
      let prev = row[0]++;
      for (let j = 1; j <= b.length; j++) {
        const tmp = row[j];
        row[j] = Math.min(row[j] + 1, row[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1));
        prev = tmp;
      }
    }
    return row[b.length];
  };
  const similarity = (a, b) => 1 - distance(a, b) / Math.max(a.length, b.length, 1);
  const lastPart = (p) => p.split("/").filter(Boolean).pop() || "";

  sitemap.then((pages) => {
    // Old /posts/ addresses moved to /blog/
    const wanted = requestedPath.replace(/^\/posts\//, "/blog/");
    const scored = pages
      .map((p) => ({
        path: p,
        score: Math.max(similarity(wanted, p), similarity(lastPart(wanted), lastPart(p))),
      }))
      .filter((s) => s.score >= 0.5)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
    if (!scored.length) return;
    const list = document.querySelector("[data-suggest-list]");
    scored.forEach(({ path }) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = path;
      a.textContent = path;
      li.appendChild(a);
      list.appendChild(li);
    });
    document.querySelector("[data-suggest]").hidden = false;
  });
});
