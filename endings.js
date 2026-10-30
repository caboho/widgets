/* Reply endings widget. Copyright (c) 2026 caboho. All rights reserved. No license is granted to use, copy, modify or distribute this code. */
(function () {
  var P = "margin:0;font-family:var(--font-voice);font-size:16px;line-height:1.7;font-weight:400;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;color:var(--text-primary)";
  var A = "color:var(--text-accent);font-weight:400;text-decoration:underline;text-underline-offset:3px;cursor:pointer";
  var HR = '<hr style="border:none;border-top:1px solid var(--border-strong);margin:0 0 1rem">';
  function esc(t) { return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function link(l) { return '<a href="#" data-p="' + esc(l[1]) + '" style="' + A + '">' + esc(l[0]) + "</a>"; }
  function done(d) { return d ? "<em>☑️ Done</em><br>" : ""; }
  function ask(D) {
    var ps = (D.a || []).map(function (parts, i) {
      var html = parts.map(function (x) { return typeof x === "string" ? esc(x) : link(x); }).join("");
      return '<p style="' + P + (i < D.a.length - 1 ? ";margin-bottom:10px" : "") + '">' + (i === 0 ? done(D.d) : "") + html + "</p>";
    }).join("");
    var n = D.n ? '<div style="margin-top:10px;border:0.5px solid var(--border-strong);border-radius:8px;padding:8px 12px;font-size:14px;line-height:1.55;color:var(--text-secondary)">' + esc(D.n) + "</div>" : "";
    return HR + ps + n;
  }
  function still(D) {
    var g = (D.g || []).length ? " · " + D.g.map(link).join(" · ") : "";
    var c = (D.c || []).map(function (t) { return '<div data-copy style="margin-top:10px">' + esc(t) + "</div>"; }).join("");
    return HR + '<p style="' + P + '">' + done(D.d) + "🔲 Still on you: " + esc(D.s) + g + " — then click " + link(["Done", D.t]) + "</p>" + c;
  }
  function info(D) {
    var rows = (D.r || []).map(function (r) {
      var cmd = r[2] ? ' · <span data-copy-chip>' + esc(r[2]) + "</span>" : "";
      return '<div style="font-size:14px;line-height:1.6;color:var(--text-primary)">ℹ️ ' + esc(r[0]) + " · " + esc(r[1]) + cmd + "</div>";
    }).join("");
    return HR + rows + '<p style="' + P + ';margin-top:6px"><em>✅ All set, you\'re free.</em></p>';
  }
  function render() {
    var D = window.EN || {}, root = document.getElementById("en");
    if (!root) return;
    root.innerHTML = D.k === "still" ? still(D) : D.k === "info" ? info(D) : ask(D);
    root.querySelectorAll("a[data-p]").forEach(function (a) {
      a.addEventListener("click", function (e) { e.preventDefault(); if (window.sendPrompt) sendPrompt(a.getAttribute("data-p")); });
    });
    if (window.CPYr) CPYr();
  }
  window.ENr = render;
  render();
})();
