/* Flight ticket widget. Copyright (c) 2026 caboho. All rights reserved. No license is granted to use, copy, modify or distribute this code. */
(function () {
  var LIGHT = {
    bg: "#FFFFFF", text: "#2C2C2A", sec: "#5F5E5A", muted: "#888780", border: "#D3D1C7", strong: "#B4B2A9",
    band: "#F1EFE8", top: "#F7F9FC", bar: "#B5D4F4", accBg: "#E6F1FB", acc: "#0C447C", acc2: "#185FA5", seatBg: "#EAF3DE", seat: "#27500A"
  };
  var AUTO = {
    bg: "var(--surface-2)", text: "var(--text-primary)", sec: "var(--text-secondary)", muted: "var(--text-muted)",
    border: "var(--border)", strong: "var(--border-strong)", band: "var(--surface-1)", top: "var(--surface-1)", bar: "var(--border-strong)", accBg: "var(--bg-accent)",
    acc: "var(--text-accent)", acc2: "var(--text-accent)", seatBg: "var(--bg-success)", seat: "var(--text-success)"
  };
  function flag(cc) { return /^[a-z]{2}$/i.test(cc || "") ? '<span class="fi fi-' + cc.toLowerCase() + ' tkf" aria-hidden="true"></span>' : ""; }
  function apt(t, cc, right) {
    var p = String(t == null ? "" : t).split(" · "), f = flag(cc);
    var code = f + "<b>" + esc(p[0]) + "</b>";
    return code + (p.length > 1 ? " · " + esc(p.slice(1).join(" · ")) : "");
  }
  function esc(t) { return String(t == null ? "" : t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function head() {
    if (document.getElementById("tk-fonts")) return;
    var a = document.createElement("link"); a.id = "tk-fonts"; a.rel = "stylesheet";
    a.href = "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@500&family=JetBrains+Mono:wght@500&display=swap";
    var b = document.createElement("link"); b.rel = "stylesheet";
    b.href = "https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.19.0/dist/tabler-icons.min.css";
    var c = document.createElement("link"); c.rel = "stylesheet";
    c.href = "https://cdn.jsdelivr.net/npm/flag-icons@7.2.3/css/flag-icons.min.css";
    document.head.appendChild(a); document.head.appendChild(b); document.head.appendChild(c);
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
      "#tk .sum{background:" + C.top + ";border-bottom:0.5px solid " + C.strong + "}" +
      "#tk .sec{display:flex;align-items:center;gap:8px;padding:16px 18px 0}#tk .sec span{font-family:" + MONO + ";font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:" + C.muted + "}#tk .sec i{font-size:14px;color:" + C.muted + "}" +
      "#tk .legs{padding:8px 0 0}#tk .lg{margin:0 18px;border-left:3px solid " + C.acc2 + ";background:" + C.top + "}" +
      "#tk .r{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;padding:22px 18px 4px;gap:8px}" +
      "#tk .c{font-family:" + DISP + ";font-weight:500;font-size:44px;line-height:1;color:" + C.text + "}" +
      "#tk .s{font-size:12px;color:" + C.sec + ";margin-top:5px}" +
      "#tk .tkf{display:inline-block;width:20px;height:15px;border-radius:2px;background-size:cover;background-position:center;box-shadow:0 0 0 0.5px " + C.strong + ";vertical-align:-2px}" +
      "#tk .c{white-space:nowrap}#tk .c .tkf{width:20px;height:15px;margin:0 0 0 6px;vertical-align:8px}#tk .rt .c .tkf{margin:0 6px 0 0}#tk .apt .tkf{width:16px;height:12px;margin:0 5px 0 0;vertical-align:0}" +
      "#tk .mid{text-align:center;color:" + C.sec + ";font-size:12px;line-height:1.4}#tk .mid i{display:block;font-size:22px;margin-bottom:4px;color:" + C.acc2 + "}#tk .via{font-family:" + MONO + ";font-size:11px;color:" + C.acc2 + "}" +
      "#tk .g{display:grid;grid-template-columns:1fr 1fr;gap:14px 12px;padding:16px 18px 20px}#tk .g .p{grid-column:1/-1}@media(min-width:480px){#tk .g{grid-template-columns:1.6fr 1fr 1fr}#tk .g .p{grid-column:auto}}" +
      "#tk .k{font-family:" + MONO + ";font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:" + C.muted + "}" +
      "#tk .v{font-size:15px;font-weight:500;margin-top:4px;color:" + C.text + ";overflow-wrap:anywhere}" +
      "#tk .l{padding:14px 14px 16px 14px}" +
      "#tk .lh{display:flex;justify-content:space-between;gap:10px;align-items:flex-end;margin-bottom:14px}#tk .lk{display:block;margin-bottom:6px}" +
      "#tk .fn{display:inline-block;font-family:" + MONO + ";font-size:22px;font-weight:500;line-height:1.1;letter-spacing:.02em;color:" + C.acc2 + "}" +
      "#tk .fa{margin-left:10px;font-size:12px;color:" + C.acc2 + ";text-decoration:underline;text-underline-offset:2px;white-space:nowrap}" +
      "#tk .lt{display:grid;grid-template-columns:auto 1fr auto;gap:12px;align-items:center}#tk .aps{display:flex;justify-content:space-between;gap:10px}#tk .aps .rt{text-align:right}" +
      "#tk .tl{display:flex;gap:3px;padding:16px 18px 2px}#tk .tl .sg{min-width:48px}#tk .tl .bar{height:6px;border-radius:3px;background:" + C.acc2 + "}#tk .tl .cx .bar{background:repeating-linear-gradient(90deg," + C.strong + " 0 4px,transparent 4px 7px)}" +
      "#tk .tl .lb{margin-top:6px;font-family:" + MONO + ";font-size:10px;line-height:1.35;color:" + C.muted + ";white-space:nowrap}#tk .tl .lb b{display:block;font-weight:500;color:" + C.acc2 + "}#tk .tl .cx .lb b{color:" + C.sec + "}" +
      "#tk .tm{font-family:" + DISP + ";font-size:26px;font-weight:500;line-height:1;font-variant-numeric:tabular-nums;color:" + C.text + "}" +
      "#tk .ap{font-size:12px;color:" + C.sec + "}" +
      "#tk .apt{margin-top:6px;font-size:13px;color:" + C.sec + "}#tk .apt b{font-family:" + DISP + ";font-size:17px;font-weight:500;letter-spacing:.02em;color:" + C.text + "}" +
      "#tk .ln{height:0;border-top:1.5px dashed " + C.strong + ";position:relative}" +
      "#tk .ln span{position:absolute;left:50%;top:-10px;transform:translateX(-50%);background:" + C.top + ";padding:0 6px;font-size:11px;color:" + C.sec + ";font-family:" + MONO + "}" +
      "#tk .st{display:inline-block;font-family:" + MONO + ";font-size:12px;padding:3px 9px;border-radius:6px;background:" + C.seatBg + ";color:" + C.seat + ";white-space:nowrap}" +
      "#tk .cn{display:flex;align-items:center;gap:8px;margin:0 18px;padding:10px 14px;font-size:12px;line-height:1.4;color:" + C.muted + ";border-left:3px dashed " + C.strong + "}#tk .cn i{font-size:14px}" +
      "#tk .tr{border-top:1.5px dashed " + C.strong + ";margin:18px 14px 0}" +
      "#tk .n{padding:18px 18px 10px;font-size:13px;color:" + C.sec + ";line-height:1.5}#tk .n div{display:flex;gap:10px}#tk .n div+div{margin-top:8px}#tk .n i{font-size:15px;margin-top:2px;color:" + C.muted + "}" +
      "#tk .fb{display:flex;align-items:flex-end;justify-content:space-between;gap:12px;padding:14px 18px 18px}#tk .fb .ft{text-align:right;font-size:11px;color:" + C.muted + ";line-height:1.5}" +
      "#tk .b{display:block;width:150px;height:30px;flex:none;background:repeating-linear-gradient(90deg," + C.text + " 0 2px,transparent 2px 4px," + C.text + " 4px 5px,transparent 5px 8px," + C.text + " 8px 11px,transparent 11px 13px);opacity:.85;border-radius:2px}#tk a.b:hover{opacity:1}" +
      "";
    var FM = D.flags || "legs", FS = FM === "summary" || FM === "both", FL = FM === "legs" || FM === "both";
    var F = D.from || {}, T = D.to || {}, legs = D.legs || [], conns = D.conns || [], notes = D.notes || [], foot = D.foot || [];
    function mins(t) { var m = /(\d+)\s*h\s*(\d+)?/.exec(t || ""); return m ? (+m[1]) * 60 + (+(m[2] || 0)) : 0; }
    var segs = [], ok = legs.length > 1;
    legs.forEach(function (L, i) {
      segs.push({ c: "", b: L.flight, d: L.dur, m: mins(L.dur) });
      var cd = conns[i] && /(\d+h\d*)/.exec(conns[i]);
      if (i < legs.length - 1) segs.push({ c: "cx", b: String(L.arrAp || "").split(" · ")[0], d: cd ? cd[1] : "", m: cd ? mins(cd[1]) : 0 });
    });
    segs.forEach(function (g) { if (!g.m) ok = false; });
    var tl = ok ? '<div class="tl" aria-hidden="true">' + segs.map(function (g) {
      return '<div class="sg ' + g.c + '" style="flex:' + g.m + ' 1 0"><div class="bar"></div><div class="lb"><b>' + esc(g.b) + "</b>" + esc(g.d) + "</div></div>";
    }).join("") + "</div>" : "";
    var html = '<h2 class="sr-only">' + esc(D.sr || ("Flight itinerary " + (F.code || "") + " to " + (T.code || "") + ", " + (D.date || ""))) + "</h2>" +
      '<div class="t"><div class="h"><span class="m">' + esc(D.airline || "Boarding itinerary") + '</span><span class="m">' + esc(D.cabin || "") + "</span></div>" +
      '<div class="sum"><div class="r"><div><div class="c">' + esc(F.code) + (FS ? flag(F.cc) : "") + '</div><div class="s">' + esc(F.city) + "</div></div>" +
      '<div class="mid"><i class="ti ti-plane" aria-hidden="true"></i><div>' + esc(D.total || "") + "</div>" + (D.via ? '<div class="via">' + esc(D.via) + "</div>" : "") + "</div>" +
      '<div class="rt" style="text-align:right"><div class="c">' + (FS ? flag(T.cc) : "") + esc(T.code) + '</div><div class="s">' + esc(T.city) + "</div></div></div>" +
      tl + '<div class="g"><div class="p"><div class="k">Passenger</div><div class="v">' + esc(D.passenger) + '</div></div><div><div class="k">Date</div><div class="v">' + esc(D.date) +
      '</div></div><div><div class="k">Booking</div><div class="v" style="font-family:' + MONO + '">' + esc(D.booking) + "</div></div></div></div>" +
      '<div class="sec"><i class="ti ti-route" aria-hidden="true"></i><span>' + (legs.length === 1 ? "1 flight" : legs.length + " flights") + " in this trip</span></div><div class=\"legs\">";
    legs.forEach(function (L, i) {
      var trk = /^https:\/\//.test(L.link || "") ? '<a class="fa" href="' + esc(L.link) + '" target="_blank" rel="noopener">Track ↗</a>' : "";
      html += '<div class="lg"><div class="l"><div class="lh"><span><span class="k lk">Flight ' + (i + 1) + "</span>" +
        '<span class="fn">' + esc(L.flight) + "</span>" + trk + "</span>" +
        (L.seat ? '<span class="st">Seat ' + esc(L.seat) + "</span>" : "") + "</div>" +
        '<div class="lt"><div class="tm">' + esc(L.dep) + '</div><div class="ln"><span>' + esc(L.dur) + '</span></div><div class="tm">' + esc(L.arr) + "</div></div>" +
        '<div class="aps"><div class="apt">' + apt(L.depAp, FL && L.depCc) + '</div><div class="apt rt">' + apt(L.arrAp, FL && L.arrCc) + "</div></div>" +
        (L.op || L.plane ? '<div class="ap" style="margin-top:10px">' + esc(L.op) + (L.op && L.plane ? " · " : "") + (L.plane ? '<i class="ti ti-plane-tilt" aria-hidden="true" style="font-size:13px;margin-right:4px;position:relative;top:1px"></i>' + esc(L.plane) : "") + "</div>" : "") + "</div></div>";
      if (conns[i]) html += '<div class="cn"><i class="ti ti-clock-hour-2" aria-hidden="true"></i>' + esc(conns[i]) + "</div>";
    });
    html += "</div>";
    if (notes.length) {
      html += '<div class="tr"></div><div class="n">' + notes.map(function (n) {
        return '<div><i class="ti ti-' + esc(n[0]) + '" aria-hidden="true"></i><span>' + esc(n[1]) + "</span></div>";
      }).join("") + "</div>";
    }
    var bl = /^https:\/\//.test(D.barLink || "") ? D.barLink : "https://caboho.co";
    html += '<div class="fb"><a class="b" href="' + esc(bl) + '" target="_blank" rel="noopener" aria-label="caboho.co" title="caboho.co"></a><div class="ft">' + esc(foot[0] || "") + (foot[1] ? "<br>" + esc(foot[1]) : "") + "</div></div></div>";
    root.innerHTML = "<style>" + css + "</style>" + html;
  }
  window.TKr = render;
  if (window.TK) render();
})();
