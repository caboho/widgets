/* Flight ticket widget. Copyright (c) 2026 caboho. All rights reserved. No license is granted to use, copy, modify or distribute this code. */
(function () {
  var LIGHT = {
    bg: "#FFFFFF", text: "#2C2C2A", sec: "#5F5E5A", muted: "#888780", border: "#D3D1C7", strong: "#B4B2A9",
    band: "#F1EFE8", accBg: "#E6F1FB", acc: "#0C447C", acc2: "#185FA5", seatBg: "#EAF3DE", seat: "#27500A"
  };
  var AUTO = {
    bg: "var(--surface-2)", text: "var(--text-primary)", sec: "var(--text-secondary)", muted: "var(--text-muted)",
    border: "var(--border)", strong: "var(--border-strong)", band: "var(--surface-1)", accBg: "var(--bg-accent)",
    acc: "var(--text-accent)", acc2: "var(--text-accent)", seatBg: "var(--bg-success)", seat: "var(--text-success)"
  };
  function esc(t) { return String(t == null ? "" : t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function head() {
    if (document.getElementById("tk-fonts")) return;
    var a = document.createElement("link"); a.id = "tk-fonts"; a.rel = "stylesheet";
    a.href = "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@500&family=JetBrains+Mono:wght@500&display=swap";
    var b = document.createElement("link"); b.rel = "stylesheet";
    b.href = "https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.19.0/dist/tabler-icons.min.css";
    document.head.appendChild(a); document.head.appendChild(b);
  }
  function render() {
    var D = window.TK || {}, root = document.getElementById("tk");
    if (!root) return;
    head();
    var C = D.theme === "light" ? LIGHT : AUTO;
    var MONO = '"JetBrains Mono",var(--font-mono),monospace', DISP = '"Bricolage Grotesque",var(--font-sans),sans-serif';
    var css =
      "#tk .t{max-width:560px;margin:.5rem auto;border:0.5px solid " + C.strong + ";border-radius:16px;background:" + C.bg + ";color:" + C.text + ";overflow:hidden;font-family:var(--font-sans),sans-serif}" +
      "#tk .h{display:flex;justify-content:space-between;gap:10px;align-items:center;padding:14px 18px;background:" + C.accBg + ";color:" + C.acc + "}" +
      "#tk .m{font-family:" + MONO + ";font-size:11px;letter-spacing:.12em;text-transform:uppercase}" +
      "#tk .r{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;padding:22px 18px 4px;gap:8px}" +
      "#tk .c{font-family:" + DISP + ";font-weight:500;font-size:44px;line-height:1;color:" + C.text + "}" +
      "#tk .s{font-size:12px;color:" + C.sec + ";margin-top:5px}" +
      "#tk .mid{text-align:center;color:" + C.sec + ";font-size:12px}#tk .mid i{display:block;font-size:22px;margin-bottom:4px;color:" + C.acc2 + "}" +
      "#tk .g{display:grid;grid-template-columns:1fr 1fr;gap:14px 12px;padding:16px 18px 20px}#tk .g .p{grid-column:1/-1}@media(min-width:480px){#tk .g{grid-template-columns:1.6fr 1fr 1fr}#tk .g .p{grid-column:auto}}" +
      "#tk .k{font-family:" + MONO + ";font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:" + C.muted + "}" +
      "#tk .v{font-size:15px;font-weight:500;margin-top:4px;color:" + C.text + ";overflow-wrap:anywhere}" +
      "#tk .l{border-top:0.5px solid " + C.border + ";padding:18px 18px 20px}" +
      "#tk .lh{display:flex;justify-content:space-between;gap:10px;align-items:flex-end;margin-bottom:14px}#tk .lk{display:block;margin-bottom:6px}" +
      "#tk .fn{display:inline-block;font-family:" + MONO + ";font-size:22px;font-weight:500;line-height:1.1;letter-spacing:.02em;color:" + C.acc2 + "}" +
      "#tk .fa{margin-left:10px;font-size:12px;color:" + C.acc2 + ";text-decoration:underline;text-underline-offset:2px;white-space:nowrap}" +
      "#tk .lt{display:grid;grid-template-columns:auto 1fr auto;gap:10px;align-items:center}" +
      "#tk .tm{font-family:" + DISP + ";font-size:26px;font-weight:500;line-height:1;color:" + C.text + "}" +
      "#tk .ap{font-size:12px;color:" + C.sec + "}" +
      "#tk .ln{height:0;border-top:1.5px dashed " + C.strong + ";position:relative}" +
      "#tk .ln span{position:absolute;left:50%;top:-10px;transform:translateX(-50%);background:" + C.bg + ";padding:0 6px;font-size:11px;color:" + C.sec + ";font-family:" + MONO + "}" +
      "#tk .st{display:inline-block;font-family:" + MONO + ";font-size:12px;padding:3px 9px;border-radius:6px;background:" + C.seatBg + ";color:" + C.seat + ";white-space:nowrap}" +
      "#tk .cn{display:flex;align-items:center;gap:10px;padding:12px 18px;background:" + C.band + ";font-size:13px;color:" + C.sec + ";border-top:0.5px solid " + C.border + "}" +
      "#tk .tr{border-top:1.5px dashed " + C.strong + ";margin:0 14px}" +
      "#tk .n{padding:18px 18px 10px;font-size:13px;color:" + C.sec + ";line-height:1.5}#tk .n div{display:flex;gap:10px}#tk .n div+div{margin-top:8px}#tk .n i{font-size:15px;margin-top:2px;color:" + C.muted + "}" +
      "#tk .b{margin:14px 18px 14px;height:38px;background:repeating-linear-gradient(90deg," + C.text + " 0 2px,transparent 2px 4px," + C.text + " 4px 5px,transparent 5px 8px," + C.text + " 8px 11px,transparent 11px 13px);opacity:.85;border-radius:2px}" +
      "#tk .f{display:flex;justify-content:space-between;gap:10px;padding:0 18px 18px;font-size:11px;color:" + C.muted + "}";
    var F = D.from || {}, T = D.to || {}, legs = D.legs || [], conns = D.conns || [], notes = D.notes || [], foot = D.foot || [];
    var html = '<h2 class="sr-only">' + esc(D.sr || ("Flight itinerary " + (F.code || "") + " to " + (T.code || "") + ", " + (D.date || ""))) + "</h2>" +
      '<div class="t"><div class="h"><span class="m">' + esc(D.airline || "Boarding itinerary") + '</span><span class="m">' + esc(D.cabin || "") + "</span></div>" +
      '<div class="r"><div><div class="c">' + esc(F.code) + '</div><div class="s">' + esc(F.city) + "</div></div>" +
      '<div class="mid"><i class="ti ti-plane" aria-hidden="true"></i><div>' + esc(D.total || "") + "</div></div>" +
      '<div style="text-align:right"><div class="c">' + esc(T.code) + '</div><div class="s">' + esc(T.city) + "</div></div></div>" +
      '<div class="g"><div class="p"><div class="k">Passenger</div><div class="v">' + esc(D.passenger) + '</div></div><div><div class="k">Date</div><div class="v">' + esc(D.date) +
      '</div></div><div><div class="k">Booking</div><div class="v" style="font-family:' + MONO + '">' + esc(D.booking) + "</div></div></div>";
    legs.forEach(function (L, i) {
      var trk = /^https:\/\//.test(L.link || "") ? '<a class="fa" href="' + esc(L.link) + '" target="_blank" rel="noopener">Track ↗</a>' : "";
      html += '<div class="l"><div class="lh"><span><span class="k lk">Flight ' + (i + 1) + "</span>" +
        '<span class="fn">' + esc(L.flight) + "</span>" + trk + "</span>" +
        (L.seat ? '<span class="st">Seat ' + esc(L.seat) + "</span>" : "") + "</div>" +
        '<div class="lt"><div><div class="tm">' + esc(L.dep) + '</div><div class="ap">' + esc(L.depAp) + '</div></div><div class="ln"><span>' + esc(L.dur) +
        '</span></div><div style="text-align:right"><div class="tm">' + esc(L.arr) + '</div><div class="ap">' + esc(L.arrAp) + "</div></div></div>" +
        (L.op || L.plane ? '<div class="ap" style="margin-top:10px">' + esc(L.op) + (L.op && L.plane ? " · " : "") + (L.plane ? '<i class="ti ti-plane-tilt" aria-hidden="true" style="font-size:13px;margin-right:4px;position:relative;top:1px"></i>' + esc(L.plane) : "") + "</div>" : "") + "</div>";
      if (conns[i]) html += '<div class="cn"><i class="ti ti-clock-hour-2" aria-hidden="true"></i>' + esc(conns[i]) + "</div>";
    });
    if (notes.length) {
      html += '<div class="tr"></div><div class="n">' + notes.map(function (n) {
        return '<div><i class="ti ti-' + esc(n[0]) + '" aria-hidden="true"></i><span>' + esc(n[1]) + "</span></div>";
      }).join("") + "</div>";
    }
    html += '<div class="b" aria-hidden="true"></div><div class="f"><span>' + esc(foot[0] || "") + "</span><span>" + esc(foot[1] || "") + "</span></div></div>";
    root.innerHTML = "<style>" + css + "</style>" + html;
  }
  window.TKr = render;
  render();
})();
