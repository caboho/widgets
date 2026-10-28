/* Copy box widget. Copyright (c) 2026 ca-boh. All rights reserved. No license is granted to use, copy, modify or distribute this code. */
(function () {
  function copy(b) {
    var t = b.getAttribute("data-t"), ok = false;
    try {
      var a = document.createElement("textarea");
      a.value = t; a.setAttribute("readonly", "");
      a.style.position = "fixed"; a.style.top = "0"; a.style.left = "0"; a.style.opacity = "0";
      document.body.appendChild(a); a.focus(); a.select(); a.setSelectionRange(0, t.length);
      ok = document.execCommand("copy");
      document.body.removeChild(a);
    } catch (e) { ok = false; }
    if (ok) { b.textContent = "Copied"; return; }
    try {
      navigator.clipboard.writeText(t).then(function () { b.textContent = "Copied"; }, function () { b.textContent = "Select and copy"; });
    } catch (e) { b.textContent = "Select and copy"; }
  }
  function render() {
    var els = document.querySelectorAll("[data-copy]:not([data-copy-done])");
    Array.prototype.forEach.call(els, function (el) {
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
      b.addEventListener("click", function () { copy(b); });
      el.appendChild(c); el.appendChild(b);
    });
  }
  window.CPYr = render;
  render();
})();
