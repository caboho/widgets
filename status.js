/* Status widget (No change + Not checked). Copyright (c) 2026 caboho. All rights reserved. No license is granted to use, copy, modify or distribute this code. */
(function () {
  function render() {
    var D = window.ST || {}, root = document.getElementById("st");
    var K = D.k || [], Q = D.q || [], Dd = D.d || [], E = D.e || [];
    if (!root || !(K.length + Q.length + Dd.length + E.length)) return;
    function esc(t) { return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;"); }
    function txt(x) { return typeof x === "string" ? x : x[0] + ": " + x[1]; }
    function row(x) {
      var inner = typeof x === "string" ? esc(x) : '<span style="font-weight:500;color:var(--text-primary)">' + esc(x[0]) + ":</span> " + esc(x[1]);
      return '<div style="border-top:0.5px solid var(--border);padding:7px 0 7px 1.6em;font-size:13px;line-height:1.5;overflow-wrap:anywhere;color:var(--text-secondary)">' + inner + "</div>";
    }
    var nNo = K.length + Q.length, nNot = Dd.length + E.length, title = [];
    if (nNo) title.push("⚪️ No change (" + nNo + ")");
    if (nNot) title.push("Not checked (" + nNot + ")");
    var G = [["", "Quiet", Q], ["💤", "Deferred", Dd], ["⚠️", "Error", E]].filter(function (g) { return g[2].length; });
    var groups = G.map(function (g) {
      return '<details><summary style="cursor:pointer;list-style:none;font-size:13px;font-weight:500;padding:7px 0;border-top:0.5px solid var(--border)">' +
        '<span class="st-a" style="display:inline-block;width:1.6em;color:var(--text-muted)">›</span>' + (g[0] ? g[0] + " " : "") + g[1] + " (" + g[2].length + ")</summary>" +
        g[2].map(row).join("") + "</details>";
    }).join("");
    root.innerHTML =
      "<style>#st summary::-webkit-details-marker{display:none}</style>" +
      '<h2 class="sr-only">Briefing status: topics checked with no change, shown first, then collapsible groups of quiet topics and of checks that were deferred or failed, with a button to copy them as markdown.</h2>' +
      '<div style="border:0.5px solid var(--border);border-radius:var(--radius,12px);padding:0.5rem 0.75rem">' +
      '<div style="font-size:14px;font-weight:500;display:flex;align-items:center;flex-wrap:wrap;gap:10px;padding:2px 0 6px">' +
      "<span>" + title.join(" · ") + '</span><button type="button" style="font-size:12px;padding:2px 10px">Copy in markdown</button></div>' +
      K.map(row).join("") + groups + "</div>";
    Array.prototype.forEach.call(root.querySelectorAll("details"), function (d) {
      d.addEventListener("toggle", function () { d.querySelector(".st-a").textContent = d.open ? "⌄" : "›"; });
    });
    var md = [];
    if (K.length) md.push("*⚪️ No change:*\n" + K.map(function (x) { return "- *" + txt(x) + "*"; }).join("\n"));
    G.forEach(function (g) { md.push("*" + (g[0] ? g[0] + " " : "") + g[1] + " (" + g[2].length + "):*\n" + g[2].map(function (x) { return "- *" + txt(x) + "*"; }).join("\n")); });
    md = md.join("\n\n");
    var b = root.querySelector("button");
    function done(ok) { b.textContent = ok ? "Copied" : "Select and copy"; setTimeout(function () { b.textContent = "Copy in markdown"; }, 1500); }
    b.addEventListener("click", function (e) {
      e.preventDefault(); e.stopPropagation();
      var ok = false;
      try {
        var t = document.createElement("textarea"); t.value = md; t.style.cssText = "position:absolute;left:-9999px";
        document.body.appendChild(t); t.select(); ok = document.execCommand("copy"); t.remove();
      } catch (err) {}
      if (ok) return done(true);
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(md).then(function () { done(true); }, function () { done(false); });
      else done(false);
    });
  }
  window.STr = render;
  render();
})();
