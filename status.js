/* Status widget (Checked, no change + Not checked, each split into Key and Routine checks). Copyright (c) 2026 caboho. All rights reserved. No license is granted to use, copy, modify or distribute this code. */
(function () {
  function render() {
    var D = window.ST || {}, root = document.getElementById("st");
    var K = D.k || [], Q = D.q || [], NK = (D.nk || []).slice(), NR = (D.nr || []).slice();
    (D.d || []).forEach(function (x) { NR.push(["💤", x[0], x[1]]); });
    (D.e || []).forEach(function (x) { NR.push(["⚠️", x[0], x[1]]); });
    if (!root || !(K.length + Q.length + NK.length + NR.length)) return;
    function esc(t) { return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;"); }
    function txt(x) { return x.length === 3 ? x[0] + " " + x[1] + ": " + x[2] : x[0] + ": " + x[1]; }
    function row(x) {
      var n = x.length === 3, inner = (n ? x[0] + " " : "") + '<span style="font-weight:500;color:var(--text-primary)">' + esc(n ? x[1] : x[0]) + ":</span> " + esc(n ? x[2] : x[1]);
      return '<div style="border-top:0.5px solid var(--border);padding:7px 0 7px 1.6em;font-size:13px;line-height:1.5;overflow-wrap:anywhere;color:var(--text-secondary)">' + inner + "</div>";
    }
    function count(a, tagged) {
      if (!tagged) return String(a.length);
      var w = a.filter(function (x) { return x[0] === "⚠️"; }).length, z = a.length - w, p = [String(a.length)];
      if (w) p.push("⚠️ " + w);
      if (z) p.push("💤 " + z);
      return p.join(" · ");
    }
    var arrow = function (open) { return '<span class="st-a" style="display:inline-block;width:1.6em;color:var(--text-muted)">' + (open ? "⌄" : "›") + "</span>"; };
    var btn = '<button type="button" style="font-size:12px;padding:2px 10px;margin-left:auto">Copy in markdown</button>';
    function sub(g, tagged) {
      return "<details" + (g[2] ? " open" : "") + '><summary style="cursor:pointer;list-style:none;font-size:13px;font-weight:500;padding:7px 0;border-top:0.5px solid var(--border)">' +
        arrow(g[2]) + g[0] + " (" + count(g[1], tagged) + ")</summary>" + g[1].map(row).join("") + "</details>";
    }
    var T = [["✅ Checked, no change", [["Key checks", K, 1], ["Routine checks", Q, 0]], 0], ["⚪️ Not checked", [["Key checks", NK, 1], ["Routine checks", NR, 0]], 1]].map(function (t) {
      t[1] = t[1].filter(function (g) { return g[1].length; });
      t[3] = t[1].reduce(function (n, g) { return n + g[1].length; }, 0);
      return t;
    }).filter(function (t) { return t[3]; });
    var html = T.map(function (t, i) {
      return "<details" + (i ? ' style="border-top:0.5px solid var(--border)"' : "") + '><summary style="cursor:pointer;list-style:none;font-size:14px;font-weight:500;display:flex;align-items:center;flex-wrap:wrap;gap:10px;padding:7px 0">' +
        "<span>" + arrow(0) + t[0] + " (" + t[3] + ")</span>" + (i ? "" : btn) + "</summary>" +
        '<div style="margin-left:1.6em">' + t[1].map(function (g) { return sub(g, t[2]); }).join("") + "</div></details>";
    }).join("");
    root.innerHTML =
      "<style>#st summary::-webkit-details-marker{display:none}</style>" +
      '<h2 class="sr-only">Briefing status: two collapsible sections, checked with no change and not checked, each split into key checks (shown open) and routine checks, with a button to copy them as markdown.</h2>' +
      '<div style="border:0.5px solid var(--border);border-radius:var(--radius,12px);padding:0.25rem 0.75rem">' + html + "</div>";
    Array.prototype.forEach.call(root.querySelectorAll("details"), function (d) {
      d.addEventListener("toggle", function () { d.querySelector(".st-a").textContent = d.open ? "⌄" : "›"; });
    });
    var md = [];
    T.forEach(function (t) {
      md.push("*" + t[0] + " (" + t[3] + "):*");
      t[1].forEach(function (g) { md.push("*" + g[0] + " (" + count(g[1], t[2]) + "):*\n" + g[1].map(function (x) { return "- *" + txt(x) + "*"; }).join("\n")); });
    });
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
