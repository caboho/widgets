/* Sources widget. Copyright (c) 2026 caboho. All rights reserved. No license is granted to use, copy, modify or distribute this code. */
(function () {
  function render() {
  var S = window.SW || [], root = document.getElementById("sw");
  if (!root || !S.length) return;
  var sup = {"0":"⁰","1":"¹","2":"²","3":"³","4":"⁴","5":"⁵","6":"⁶","7":"⁷","8":"⁸","9":"⁹",k:"ᵏ",s:"ˢ",d:"ᵈ",u:"ᵘ",e:"ᵉ",m:"ᵐ",p:"ᵖ",c:"ᶜ"};
  function toSup(m) { return String(m).split("").map(function (c) { return sup[c] || c; }).join(""); }
  function esc(t) { return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;"); }
  var rows = S.map(function (r) {
    var m = r[0], n = r[1], u = r[2], w = r[3];
    function L(t) { return u ? '<a href="' + esc(u) + '" target="_blank">' + t + "</a>" : t; }
    return '<div style="display:grid;grid-template-columns:32px minmax(0,1fr);gap:8px;border-top:0.5px solid var(--border);padding:6px 0;font-size:13px;line-height:1.5;overflow-wrap:anywhere">' +
      '<span style="color:var(--text-secondary)">' + L(esc(m)) + "</span>" +
      '<span><span style="font-weight:500">' + L(esc(n)) + '</span><span style="color:var(--text-secondary)">: ' + esc(w) + "</span></span></div>";
  }).join("");
  root.innerHTML =
    '<h2 class="sr-only">Collapsible list of the sources used in this reply, with a button to copy them as markdown.</h2>' +
    '<details style="border:0.5px solid var(--border);border-radius:var(--radius,12px);padding:0.5rem 0.75rem">' +
    '<summary style="cursor:pointer;list-style:none;font-size:14px;font-weight:500;display:flex;align-items:center;gap:10px">' +
    "<span>Sources (" + S.length + ')</span><button type="button" style="font-size:12px;padding:2px 10px">Copy in markdown</button></summary>' +
    '<div style="margin-top:6px">' + rows + "</div></details>";
  var md = "**Sources (" + S.length + ")**\n" + S.map(function (r) {
    return "- " + toSup(r[0]) + " " + (r[2] ? "[" + r[1] + "](" + r[2] + ")" : r[1]) + ": " + r[3];
  }).join("\n");
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
  window.SWr = render;
  render();
})();
