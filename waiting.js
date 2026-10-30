/* What's waiting checklist widget. Copyright (c) 2026 ca-boh. All rights reserved. No license is granted to use, copy, modify or distribute this code. */
(function () {
  function esc(t) { return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;"); }
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
    var D = window.WT || {}, R = D.r || [], root = document.getElementById("wt");
    if (!root || !R.length) return;
    var line = "0.5px solid var(--border-strong)";
    var rows = R.map(function (r) {
      return '<tr>' +
        '<td data-x style="padding:10px 8px;border-bottom:' + line + '">' + esc(r[0]) + '</td>' +
        '<td data-x data-w style="padding:10px 8px;border-bottom:' + line + '">' + esc(r[1]) + '</td>' +
        '<td style="padding:10px 8px;border-bottom:' + line + '"><div data-c style="display:flex;align-items:center;gap:8px;border:' + line + ';border-radius:8px;padding:6px 8px">' +
          '<code style="font-family:var(--font-mono);font-size:13.5px;color:var(--text-primary);flex:1;user-select:all;-webkit-user-select:all">' + esc(r[2]) + '</code>' +
          '<button type="button" data-t="' + esc(r[2]) + '" style="font:inherit;font-size:13px;border:' + line + ';background:transparent;color:var(--text-primary);border-radius:6px;padding:4px 10px;cursor:pointer;flex:none">Copy</button></div></td>' +
        '<td style="padding:10px 8px;border-bottom:' + line + ';text-align:center;width:36px"><input type="checkbox" aria-label="Done in ' + esc(r[0]) + '" style="width:18px;height:18px;cursor:pointer;accent-color:var(--text-accent)"></td>' +
        '</tr>';
    }).join("");
    var th = 'style="text-align:left;font-weight:500;color:var(--text-secondary);font-size:12.5px;padding:6px 8px;border-bottom:' + line + '"';
    root.innerHTML =
      '<style>@media (max-width:520px){#wt [data-w]{display:none}}#wt tr.done [data-x]{opacity:.45;text-decoration:line-through}#wt tr.done [data-c]{opacity:.45}</style>' +
      '<h2 class="sr-only">Checklist of what is waiting in each chat, with a button to copy each command and a box to tick it off.</h2>' +
      '<table style="width:100%;border-collapse:collapse;font-size:14px;color:var(--text-primary)"><thead><tr>' +
      '<th ' + th + '>Chat</th><th data-w ' + th + '>What\'s waiting</th><th ' + th + '>Command</th>' +
      '<th ' + th.replace("text-align:left", "text-align:center") + '>✓</th></tr></thead><tbody>' + rows + '</tbody></table>' +
      (D.d ? '<p style="margin:14px 0 0;font-family:var(--font-voice);font-size:16px;line-height:1.7;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;color:var(--text-primary)">When you\'re back: ' +
        '<a href="#" data-d style="color:var(--text-accent);text-decoration:underline;text-underline-offset:3px">Done</a>, and I\'ll check what\'s still waiting</p>' : "");
    root.querySelectorAll("button[data-t]").forEach(function (b) { b.addEventListener("click", function () { copy(b); }); });
    root.querySelectorAll("input[type=checkbox]").forEach(function (c) {
      c.addEventListener("change", function () { c.closest("tr").classList.toggle("done", c.checked); });
    });
    var d = root.querySelector("a[data-d]");
    if (d) d.addEventListener("click", function (e) { e.preventDefault(); if (window.sendPrompt) sendPrompt(D.d); });
  }
  window.WTr = render;
  render();
})();
