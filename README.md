# Widgets

Display scripts for my chat widgets: Sources list, change-control view, on-your-return list, not-checked list, status list (no change plus not checked), copy box, what's-waiting checklist, flight ticket, and the day cards' styles and sky icon. Each is loaded from a tagged release.

Copyright (c) 2026 caboho. All rights reserved.

No license is granted. You may not use, copy, modify or distribute this code without written permission.

## day-card.css and sky.js (open, update and close cards)

`day-card.css` holds the cards' styles (base and layout). `sky.js` fills each `<span data-sky data-t="YYYY-MM-DDTHH:MM">` with a small animated icon for that time's part of the day (morning 5–12, midday 12–17, evening 17–21, night 21–5), modeled on Focus Flow's completion sky. It plays once and holds; Reduce Motion shows it still. If either file can't load (offline), the icon simply isn't there: the span stays empty and the stylesheet hides it, with no error. `window.DSKYr(root)` fills icons inside a given root (e.g. a shadow root).

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/caboho/widgets@v1.14.0/day-card.css">
<div class="od"><div><div class="ey"><span data-sky data-t="2026-11-08T21:31"></span>Close the day · Sun Nov 8, 2026</div>…</div>…</div>
<script src="https://cdn.jsdelivr.net/gh/caboho/widgets@v1.14.0/sky.js"></script>
```

## ticket.js (flight ticket card)

Post with the chat's widget tool, changing only the data in `window.TK`. The script tag comes first and the data script calls `TKr()` itself, like the other widgets here (a data script placed before the script tag rendered an empty card in the chat) (one object per leg in `legs`; omit `via` for a nonstop; `theme` is `"light"` or `"auto"`):

```html
<div id="tk"></div><script src="https://cdn.jsdelivr.net/gh/caboho/widgets@v1.13.1/ticket.js"></script><script>window.TK={theme:"light",sr:"",airline:"Airline · Boarding itinerary",cabin:"Economy",passenger:"",date:"",booking:"",from:{code:"",city:""},to:{code:"",city:""},total:"",via:"",legs:[{flight:"",seat:"",dep:"",depAp:"",arr:"",arrAp:"",dur:"",op:"",plane:"",link:""}],conns:[],notes:[],foot:["",""]};window.TKr?TKr():document.getElementById("tk").textContent=TK.legs.map(function(l){return l.flight+" "+l.dep+" "+l.depAp+" → "+l.arr+" "+l.arrAp+(l.seat?" · seat "+l.seat:"")}).join(" | ")+" · booking "+TK.booking</script>
```

`notes` entries are `[Tabler icon name, text]`; `link` is a FlightAware page (ICAO airline code, e.g. AEA193 for UX193).
