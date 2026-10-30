/* On-your-return widget. Copyright (c) 2026 caboho. All rights reserved. No license is granted to use, copy, modify or distribute this code. */
(function () {
  function render() {
  var D = window.OYR || {}, C = D.c || "", R = D.r || [], root = document.getElementById("oyr");
  if (!root || !R.length) return;
  var T = "⌛️ On your return";
  function esc(t) { return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;"); }
  var rows = R.map(function (r, i) {
    var u = r[3] && /^https:\/\//.test(r[3][1]);
    var link = r[3] ? ' · <a href="' + (u ? esc(r[3][1]) : "#") + '"' + (u ? "" : ' data-i="' + i + '"') + ">" + esc(r[3][0]) + "</a>" : "";
    return '<div style="display:grid;grid-template-columns:32px minmax(0,1fr);gap:8px;border-top:0.5px solid var(--border);padding:6px 0;font-size:13px;line-height:1.5;overflow-wrap:anywhere">' +
      '<span style="color:var(--text-secondary)">' + esc(r[0]) + "</span>" +
      '<span><span style="font-weight:500">' + esc(r[1]) + '</span><span style="color:var(--text-secondary)">: ' + esc(r[2]) + "</span>" + link + "</span></div>";
  }).join("");
  root.innerHTML =
    "<style>#oyr summary::-webkit-details-marker{display:none}</style>" +
    '<h2 class="sr-only">Collapsible list of the next steps when Carlos returns, with a button to copy them as markdown.</h2>' +
    '<details style="border:0.5px solid var(--border);border-radius:var(--radius,12px);padding:0.5rem 0.75rem">' +
    '<summary style="cursor:pointer;list-style:none;font-size:14px;font-weight:500;display:flex;align-items:center;gap:10px">' +
    '<span><span style="display:inline-block;width:1.6em">⌛️</span>On your return</span>' +
    '<button type="button" style="font-size:12px;padding:2px 10px">Copy in markdown</button></summary>' +
    '<div style="margin-top:2px">' +
    (C ? '<div style="font-size:14px;color:var(--text-primary);padding:6px 0 8px 1.6em">' + esc(C) + "</div>" : "") +
    rows + "</div></details>";
  root.querySelectorAll("a[data-i]").forEach(function (a) {
    a.addEventListener("click", function (e) { e.preventDefault(); sendPrompt(R[+a.dataset.i][3][1]); });
  });
  var md = "**" + T + "**\n" + (C ? C + "\n" : "") + R.map(function (r) { return "- **" + r[1] + "**: " + r[2]; }).join("\n");
  var b = root.querySelector("button");
  function done(ok) { b.textContent = ok ? "Copied" : "Couldn't copy"; setTimeout(function () { b.textContent = "Copy in markdown"; }, 1500); }
  function fb() {
    var t = document.createElement("textarea"); t.value = md; t.style.cssText = "position:absolute;left:-9999px";
    document.body.appendChild(t); t.select(); var ok = false;
    try { ok = document.execCommand("copy"); } catch (e) {}
    t.remove(); done(ok);
  }
  b.addEventListener("click", function (e) {
    e.preventDefault(); e.stopPropagation();
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(md).then(function () { done(true); }, fb);
    else fb();
  });
  }
  window.OYRr = render;
  render();
})();
