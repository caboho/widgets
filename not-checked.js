/* Not-checked widget. Copyright (c) 2026 ca-boh. All rights reserved. No license is granted to use, copy, modify or distribute this code. */
(function () {
  function render() {
  var D = window.NC || {}, G = [["💤", "Deferred", "deferred", D.d || []], ["⚠️", "Error", "error", D.e || []]], root = document.getElementById("nc");
  G = G.filter(function (g) { return g[3].length; });
  if (!root || !G.length) return;
  var N = G.reduce(function (n, g) { return n + g[3].length; }, 0);
  function esc(t) { return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;"); }
  var body = G.map(function (g, i) {
    return '<div style="font-size:13px;font-weight:500;padding:' + (i ? "10px" : "4px") + ' 0 4px"><span style="display:inline-block;width:1.6em">' + g[0] + "</span>" + g[1] + " (" + g[3].length + ")</div>" +
      g[3].map(function (x) {
        return '<div style="border-top:0.5px solid var(--border);padding:6px 0 6px 1.6em;font-size:13px;line-height:1.5;overflow-wrap:anywhere;color:var(--text-secondary)">' + esc(x) + "</div>";
      }).join("");
  }).join("");
  root.innerHTML =
    "<style>#nc summary::-webkit-details-marker{display:none}</style>" +
    '<h2 class="sr-only">Collapsible list of the checks this briefing could not make, deferred and failed, with a button to copy them as markdown.</h2>' +
    '<details style="border:0.5px solid var(--border);border-radius:var(--radius,12px);padding:0.5rem 0.75rem">' +
    '<summary style="cursor:pointer;list-style:none;font-size:14px;font-weight:500;display:flex;align-items:center;gap:10px">' +
    "<span>Not checked (" + N + ')</span><button type="button" style="font-size:12px;padding:2px 10px">Copy in markdown</button></summary>' +
    '<div style="margin-top:2px">' + body + "</div></details>";
  var md = G.map(function (g) { return "*" + g[0] + " Not checked (" + g[2] + "): " + g[3].join("; ") + "*"; }).join("\n\n");
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
  window.NCr = render;
  render();
})();
