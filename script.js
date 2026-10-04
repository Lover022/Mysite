const SCRAMBLE = {
  mode: "cipher",
  chars: "0123456789ABCDEF#$%&@*?<>/\\|=+~",
  idleSpeed: 260,
  idleFlicker: 0.12,
  hoverSpeed: 45
};

(() => {
  const D = CV, $ = s => document.querySelector(s);
  const SECTIONS = ["about", "skills", "code", "education", "languages", "projects"];
  const keys = Object.keys(D.langs);
  const PLACEHOLDER = "data:image/svg+xml;utf8," + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="#3a3f66"/>' +
    '<circle cx="50" cy="38" r="17" fill="#8d94c9"/><path d="M16 92c4-26 20-34 34-34s30 8 34 34z" fill="#8d94c9"/></svg>');

  const opt = (cls, v) => v ? `<span class="${cls}">${v}</span>` : "";
  const esc = s => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

  let lang;
  try { lang = localStorage.getItem("cv-lang"); } catch (e) {}
  if (!D.langs[lang]) lang = D.defaultLang;

  const photo = $("#photo");
  photo.src = D.photo;
  photo.onerror = () => { photo.onerror = null; photo.src = PLACEHOLDER; };
  $("#code-block").textContent = D.code;
  $("#skills-grid").innerHTML = D.skills.map(s => `<div class="glass tile"><b>${s}</b></div>`).join("");
  $("#socials").innerHTML = D.socials.map(s =>
    `<a class="chip" href="${s.url}" title="${s.label}" target="_blank" rel="noopener">${s.icon}</a>`).join("");

  let scramblers = [];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  function attachScramble(el) {
    const S = SCRAMBLE, P = [...el.dataset.scramble], n = P.length;
    const rnd = () => S.chars[Math.floor(Math.random() * S.chars.length)];
    let chars = P.map(c => c === " " ? " " : rnd());
    let r = S.mode === "plain" ? n : 0;
    let hover = false, timer = 0;

    const wantPlain = () => S.mode === "plain" ? !hover : S.mode === "reveal" ? hover : false;
    const scramble = frac => { chars = chars.map((c, i) => P[i] === " " ? " " : Math.random() < frac ? rnd() : c); };
    const draw = () => {
      el.textContent = chars.map((c, i) => i < r ? P[i] : c).join("");
      el.classList.toggle("is-cipher", r < n);
    };
    el.setAttribute("aria-label", S.mode === "cipher" ? "encrypted" : el.dataset.scramble);

    const loop = () => {
      timer = 0;
      const goal = wantPlain() ? n : 0;
      if (r !== goal) r += Math.sign(goal - r);
      scramble(hover ? 1 : S.idleFlicker);
      draw();
      if (hover || r !== goal) timer = setTimeout(loop, S.hoverSpeed);
      else if (S.mode !== "plain" && S.idleSpeed > 0) timer = setTimeout(loop, S.idleSpeed);
    };

    const row = el.closest("li") || el;
    const setHover = v => {
      hover = v;
      clearTimeout(timer);
      if (reduced) {
        r = wantPlain() ? n : 0;
        scramble(1); draw();
      } else loop();
    };
    row.addEventListener("pointerenter", () => setHover(true));
    row.addEventListener("pointerleave", () => setHover(false));

    draw();                                              // первый кадр
    if (!reduced && S.mode !== "plain" && S.idleSpeed > 0) timer = setTimeout(loop, S.idleSpeed);
    return () => clearTimeout(timer);
  }

  function render() {
    const d = D.langs[lang];
    document.documentElement.lang = lang;
    document.title = d.name + " — CV";
    $("#brand").textContent = d.name;
    $("#lang-btn").textContent = d.btn;
    $("#nav").innerHTML = SECTIONS.map(id => `<a href="#${id}">${d.ui[id]}</a>`).join("");
    SECTIONS.forEach(id => { $(`#${id} h2`).textContent = d.ui[id]; });

    $("#name").innerHTML = d.name.split(" ").join("<br>");
    $("#role").textContent = d.role;
    $("#about-text").textContent = d.about;

    scramblers.forEach(stop => stop());
    $("#contacts").innerHTML = d.contacts.map(c => {
      const value = c.scramble ? `<b class="scramble" data-scramble="${esc(c.value)}"></b>` : `<b>${c.value}</b>`;
      const text = `<small>${c.label}</small>${value}`;
      return `<li><span class="chip ico">${c.icon}</span><div>${c.href ? `<a href="${c.href}">${text}</a>` : text}</div></li>`;
    }).join("");
    scramblers = [...document.querySelectorAll("[data-scramble]")].map(attachScramble);

    $("#edu-grid").innerHTML = d.education.map(e =>
      `<div class="glass tile"><span class="big-ico">${e.icon}</span><b>${e.title}</b>` +
      `${opt("sub", e.place)}${opt("year", e.year)}</div>`).join("");

    $("#lang-grid").innerHTML = d.languages.map(l =>
      `<div class="glass tile"><b>${l.name}</b>${opt("year", l.level)}</div>`).join("");

    $("#proj-grid").innerHTML = d.projects.map(p =>
      `<a class="glass tile" href="${p.url || "#"}" target="_blank" rel="noopener"><span class="big-ico">${p.icon}</span>` +
      `<b>${p.title}</b>${opt("sub", p.text)}</a>`).join("");
  }

  $("#lang-btn").addEventListener("click", () => {
    lang = keys[(keys.indexOf(lang) + 1) % keys.length];
    try { localStorage.setItem("cv-lang", lang); } catch (e) {}
    render();
  });

  document.addEventListener("pointermove", e => {
    const t = e.target.closest(".glass");
    if (!t) return;
    const r = t.getBoundingClientRect();
    t.style.setProperty("--mx", e.clientX - r.left + "px");
    t.style.setProperty("--my", e.clientY - r.top + "px");
  });

  render();
})();
