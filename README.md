# Widgets

Display scripts for my chat widgets: Sources list, change-control view, on-your-return list, not-checked list, status list (no change plus not checked), copy box, what's-waiting checklist and flight ticket. Each is loaded from a tagged release.

Copyright (c) 2026 caboho. All rights reserved.

No license is granted. You may not use, copy, modify or distribute this code without written permission.

## ticket.js (flight ticket card)

Post with the chat's widget tool, changing only the data in `window.TK`. The script tag comes first and the data script calls `TKr()` itself, like the other widgets here (a data script placed before the script tag rendered an empty card in the chat) (one object per leg in `legs`; omit `via` for a nonstop; `theme` is `"light"` or `"auto"`):

```html
<div id="tk"></div><script src="https://cdn.jsdelivr.net/gh/caboho/widgets@v1.13.1/ticket.js"></script><script>window.TK={theme:"light",sr:"",airline:"Airline · Boarding itinerary",cabin:"Economy",passenger:"",date:"",booking:"",from:{code:"",city:""},to:{code:"",city:""},total:"",via:"",legs:[{flight:"",seat:"",dep:"",depAp:"",arr:"",arrAp:"",dur:"",op:"",plane:"",link:""}],conns:[],notes:[],foot:["",""]};window.TKr?TKr():document.getElementById("tk").textContent=TK.legs.map(function(l){return l.flight+" "+l.dep+" "+l.depAp+" → "+l.arr+" "+l.arrAp+(l.seat?" · seat "+l.seat:"")}).join(" | ")+" · booking "+TK.booking</script>
```

`notes` entries are `[Tabler icon name, text]`; `link` is a FlightAware page (ICAO airline code, e.g. AEA193 for UX193).
