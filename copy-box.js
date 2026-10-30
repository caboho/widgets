/* Copy box widget. Copyright (c) 2026 caboho. All rights reserved. No license is granted to use, copy, modify or distribute this code. */
(function () {
  function copyText(t, done) {
    var ok = false;
    try {
      var a = document.createElement("textarea");
      a.value = t; a.setAttribute("readonly", "");
      a.style.position = "fixed"; a.style.top = "0"; a.style.left = "0"; a.style.opacity = "0";
      document.body.appendChild(a); a.focus(); a.select(); a.setSelectionRange(0, t.length);
      ok = document.execCommand("copy");
      document.body.removeChild(a);
    } catch (e) { ok = false; }
    if (ok) { done(true); return; }
    try {
      navigator.clipboard.writeText(t).then(function () { done(true); }, function () { done(false); });
    } catch (e) { done(false); }
  }
  function box(el) {
    var t = el.textContent.trim();
    el.setAttribute("data-copy-done", "");
    el.textContent = "";
    el.style.cssText = "display:flex;align-items:flex-start;gap:10px;border:0.5px solid var(--border-strong);border-radius:8px;padding:10px 12px";
    var c = document.createElement("code");
    c.style.cssText = "font-family:var(--font-mono);font-size:13.5px;line-height:1.5;color:var(--text-primary);flex:1;white-space:normal;user-select:all;-webkit-user-select:all";
    c.textContent = t;
    var b = document.createElement("button");
    b.type = "button";
    b.style.cssText = "font:inherit;font-size:13px;border:0.5px solid var(--border-strong);background:transparent;color:var(--text-primary);border-radius:6px;padding:4px 10px;cursor:pointer;flex:none";
    b.setAttribute("data-t", t);
    b.textContent = "Copy";
    b.addEventListener("click", function () {
      copyText(t, function (ok) { b.textContent = ok ? "Copied" : "Select and copy"; });
    });
    el.appendChild(c); el.appendChild(b);
  }
  function chip(el) {
    var t = el.textContent.trim(), label = t + " ⧉";
    el.setAttribute("data-copy-done", "");
    el.setAttribute("role", "button");
    el.setAttribute("tabindex", "0");
    el.setAttribute("aria-label", "Copy " + t);
    el.style.cssText = "font-family:var(--font-mono);font-size:13px;padding:1px 6px;border:0.5px solid var(--border-strong);border-radius:5px;cursor:pointer;white-space:nowrap;color:var(--text-primary)";
    el.textContent = label;
    function go() {
      copyText(t, function (ok) {
        el.textContent = ok ? "Copied" : "Select and copy";
        setTimeout(function () { el.textContent = label; }, 1500);
      });
    }
    el.addEventListener("click", go);
    el.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } });
  }
  function render() {
    Array.prototype.forEach.call(document.querySelectorAll("[data-copy]:not([data-copy-done])"), box);
    Array.prototype.forEach.call(document.querySelectorAll("[data-copy-chip]:not([data-copy-done])"), chip);
  }
  window.CPYr = render;
  render();
})();
