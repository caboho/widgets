/* Reply endings widget. Copyright (c) 2026 caboho. All rights reserved. No license is granted to use, copy, modify or distribute this code. */
(function () {
  // Look values come from CSS custom properties set on the #en element (theming hooks, since v1.12.0), so a
  // look change is a snippet edit, not a release. Defaults keep the v1.11.0 look: the ℹ️ row's sans at 14 px.
  // All lines: --en-font, --en-size, --en-line, --en-weight, --en-color, --en-link.
  // One line: --en-<kind>-font, -size, -weight, -color, kind = set, paused, ask, done, still, info.
  // Spacing: --en-gap-done (under ☑️ Done, 8px), --en-gap-set (above ✅ after the ℹ️ row, 12px).
  function S(k) {
    function v(n, d) { return "var(--en-" + k + "-" + n + ",var(--en-" + n + "," + d + "))"; }
    return "margin:0;font-family:" + v("font", "inherit") + ";font-size:" + v("size", "14px") + ";line-height:var(--en-line,1.6);font-weight:" + v("weight", "400") + ";color:" + v("color", "var(--text-primary)");
  }
  var A = "color:var(--en-link,var(--text-accent));font-weight:400;text-decoration:underline;text-underline-offset:3px;cursor:pointer";
  var HR = '<hr style="border:none;border-top:1px solid var(--border-strong);margin:0 0 1rem">';
  function esc(t) { return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  // A link whose target is a web address opens that page (e.g. the thing to check before "Ready to use");
  // any other target is a reply sent to the chat.
  function link(l) {
    if (/^https?:\/\//.test(l[1])) return '<a href="' + esc(l[1]) + '" target="_blank" rel="noopener" style="' + A + '">' + esc(l[0]) + " ↗</a>";
    return '<a href="#" data-p="' + esc(l[1]) + '" style="' + A + '">' + esc(l[0]) + "</a>";
  }
  function done(d) { return d ? '<p style="' + S("done") + ';margin:0 0 var(--en-gap-done,8px)">☑️ Done</p>' : ""; }
  function ask(D) {
    var ps = (D.a || []).map(function (parts, i) {
      var html = parts.map(function (x) { return typeof x === "string" ? esc(x) : link(x); }).join("");
      return '<p style="' + S("ask") + (i < D.a.length - 1 ? ";margin-bottom:10px" : "") + '">' + html + "</p>";
    }).join("");
    ps = done(D.d) + ps;
    var n = D.n ? '<div style="margin-top:10px;border:0.5px solid var(--border-strong);border-radius:8px;padding:8px 12px;font-size:14px;line-height:1.55;color:var(--text-secondary)">' + esc(D.n) + "</div>" : "";
    return HR + ps + n;
  }
  function still(D) {
    var g = (D.g || []).length ? " · " + D.g.map(link).join(" · ") : "";
    var c = (D.c || []).map(function (t) { return '<div data-copy style="margin-top:10px">' + esc(t) + "</div>"; }).join("");
    return HR + done(D.d) + '<p style="' + S("still") + '">' + "🔲 Still on you: " + esc(D.s) + g + " — then click " + link(["Done", D.t]) + "</p>" + c;
  }
  function info(D) {
    var rows = (D.r || []).map(function (r) {
      var cmd = r[2] ? ' · <span data-copy-chip>' + esc(r[2]) + "</span>" : "";
      return '<div style="' + S("info") + '">ℹ️ ' + esc(r[0]) + " · " + esc(r[1]) + cmd + "</div>";
    }).join("");
    return HR + rows + '<p style="' + S("set") + ';margin-top:var(--en-gap-set,12px)">✅ All set, you\'re free.</p>';
  }
  // A lone ending line: k:"set" (✅ All set) or k:"paused" (✨ Paused, before the On-your-return widget).
  function line(D) { return HR + '<p style="' + S(D.k === "paused" ? "paused" : "set") + '">' + (D.k === "paused" ? "✨ Paused" : "✅ All set, you're free.") + "</p>"; }
  function render() {
    var D = window.EN || {}, root = document.getElementById("en");
    if (!root) return;
    root.innerHTML = D.k === "still" ? still(D) : D.k === "info" ? info(D) : (D.k === "set" || D.k === "paused") ? line(D) : ask(D);
    root.querySelectorAll("a[data-p]").forEach(function (a) {
      a.addEventListener("click", function (e) { e.preventDefault(); if (window.sendPrompt) sendPrompt(a.getAttribute("data-p")); });
    });
    if (window.CPYr) CPYr();
  }
  window.ENr = render;
  render();
})();
