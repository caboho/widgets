/* Day card sky icon. Copyright (c) 2026 caboho. All rights reserved. No license is granted to use, copy, modify or distribute this code. */
/* Fills every <span data-sky data-t="YYYY-MM-DDTHH:MM"> with a small animated icon for that time's part of the day
   (morning 5–12, midday 12–17, evening 17–21, night 21–5), modeled on Focus Flow's completion sky.
   Any failure leaves the span empty, and day-card.css hides an empty span, so nothing shows instead of an error. */
(function () {
  var CSS =
    ".dsky{display:inline-flex;width:22px;height:22px;flex:none}.dsky svg{width:22px;height:22px;overflow:visible}" +
    ".dsky .hz{stroke:var(--border-strong,rgba(127,127,127,.4));stroke-width:1}" +
    ".dsky .m-sun{fill:#F2B552;transform:translateY(9px)}.dsky.go .m-sun{animation:dsky-rise 2.6s cubic-bezier(.2,.7,.3,1) forwards}" +
    "@keyframes dsky-rise{to{transform:none}}" +
    ".dsky .d-sun{fill:#F2A15F;transform-origin:12px 11px}.dsky.go .d-sun{animation:dsky-breath 3s ease-in-out forwards}" +
    "@keyframes dsky-breath{0%{transform:scale(.8)}50%{transform:scale(1.1)}100%{transform:scale(1)}}" +
    ".dsky .d-rays{stroke:#F2A15F;stroke-width:1.4;stroke-linecap:round;transform-origin:12px 11px;opacity:0}" +
    ".dsky.go .d-rays{animation:dsky-rays 3s ease-out .3s forwards}" +
    "@keyframes dsky-rays{0%{opacity:0;transform:rotate(-25deg)}40%{opacity:1}100%{opacity:1;transform:rotate(10deg)}}" +
    ".dsky .e-sun{fill:#F2C28E;transform:translateY(-8px)}.dsky.go .e-sun{animation:dsky-sink 3s cubic-bezier(.4,0,.4,1) forwards}" +
    "@keyframes dsky-sink{to{transform:none;fill:#D98E86}}" +
    ".dsky .n-moon{fill:#AFA9EC;transform:translate(6px,9px)}.dsky.go .n-moon{animation:dsky-moon 3.2s cubic-bezier(.2,.7,.3,1) forwards}" +
    "@keyframes dsky-moon{to{transform:none}}" +
    ".dsky .n-star{fill:#7F77DD;opacity:0}.dsky.go .n-star{animation:dsky-tw 1.2s ease-out forwards}" +
    "@keyframes dsky-tw{0%{opacity:0}60%{opacity:1}100%{opacity:.75}}" +
    "@media (prefers-color-scheme: dark){.dsky .n-moon,.dsky .n-star{fill:#CECBF6}}" +
    ":host(.dark) .dsky .n-moon,:host(.dark) .dsky .n-star{fill:#CECBF6}" +
    "@media (prefers-reduced-motion: reduce){.dsky *{animation:none!important;transform:none!important;opacity:1!important}}";

  var n = 0;
  function icon(part) {
    var id = "dsky" + (++n);
    var hz = '<line class="hz" x1="3" y1="17" x2="21" y2="17"/>';
    var clip = '<clipPath id="' + id + '"><rect x="0" y="0" width="24" height="17"/></clipPath>';
    if (part === "morning") return '<svg viewBox="0 0 24 24" aria-hidden="true">' + clip + '<g clip-path="url(#' + id + ')"><circle class="m-sun" cx="12" cy="14" r="5"/></g>' + hz + "</svg>";
    if (part === "midday") {
      var r = "", a = [[12, 2, 12, 3.8], [12, 18.2, 12, 20], [3, 11, 4.8, 11], [19.2, 11, 21, 11], [5.6, 4.6, 6.9, 5.9], [17.1, 16.1, 18.4, 17.4], [18.4, 4.6, 17.1, 5.9], [6.9, 16.1, 5.6, 17.4]];
      for (var i = 0; i < a.length; i++) r += '<line x1="' + a[i][0] + '" y1="' + a[i][1] + '" x2="' + a[i][2] + '" y2="' + a[i][3] + '"/>';
      return '<svg viewBox="0 0 24 24" aria-hidden="true"><g class="d-rays">' + r + '</g><circle class="d-sun" cx="12" cy="11" r="4.5"/></svg>';
    }
    if (part === "evening") return '<svg viewBox="0 0 24 24" aria-hidden="true">' + clip + '<g clip-path="url(#' + id + ')"><circle class="e-sun" cx="12" cy="17" r="5"/></g>' + hz + "</svg>";
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><mask id="' + id + '"><rect width="24" height="24" fill="#fff"/><circle cx="15.5" cy="9" r="5" fill="#000"/></mask>' +
      '<circle class="n-moon" cx="12" cy="11" r="6" mask="url(#' + id + ')"/>' +
      '<circle class="n-star" cx="20" cy="5" r=".9" style="animation-delay:1.2s"/><circle class="n-star" cx="4" cy="6" r=".8" style="animation-delay:1.8s"/>' +
      '<circle class="n-star" cx="19" cy="15" r=".7" style="animation-delay:2.3s"/></svg>';
  }
  /* The hour as written in data-t (the card's local time when posted), so a card keeps its sky wherever it is opened. */
  function hour(el) {
    var m = /T(\d{1,2}):/.exec(el.getAttribute("data-t") || "");
    return m ? +m[1] : new Date().getHours();
  }
  function part(h) { return h >= 5 && h < 12 ? "morning" : h >= 12 && h < 17 ? "midday" : h >= 17 && h < 21 ? "evening" : "night"; }
  function style(el) {
    var root = el.getRootNode ? el.getRootNode() : document;
    var host = root === document || !root.querySelector ? document.head : root;
    if (host.querySelector("style[data-dsky]")) return;
    var s = document.createElement("style"); s.setAttribute("data-dsky", ""); s.textContent = CSS; host.appendChild(s);
  }
  function run(scope) {
    var els;
    try { els = (scope || document).querySelectorAll("[data-sky]:not([data-sky-done])"); } catch (e) { return; }
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      try {
        style(el);
        var p = part(hour(el));
        el.innerHTML = icon(p);
        el.className = (el.className ? el.className + " " : "") + "dsky";
        el.setAttribute("data-sky-done", p);
        (function (x) { setTimeout(function () { x.className += " go"; }, 30); })(el);
      } catch (e) { try { el.innerHTML = ""; } catch (e2) {} }
    }
  }
  window.DSKYr = run;
  run();
})();
