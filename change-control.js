/* Change-control view. Copyright (c) 2026 caboho. All rights reserved. No license is granted to use, copy, modify or distribute this code. */
(function () {
  var TOK = /https?:\/\/[^\s)]+|[\p{L}\p{N}_][\p{L}\p{N}_'’]*|\s+|[^\p{L}\p{N}_\s]/gu;
  var CSS =
    "del{color:var(--text-danger);background:var(--bg-danger);text-decoration:line-through;padding:0 2px}" +
    "ins{color:var(--text-success);background:var(--bg-success);font-weight:500;text-decoration:none;padding:0 2px}" +
    ".r{display:grid;grid-template-columns:28px minmax(0,1fr);gap:8px;border-top:0.5px solid var(--border);padding:8px 0;font-size:14px;line-height:1.6}" +
    ".n,.l,.loc{color:var(--text-secondary);font-size:12px}" +
    ".b{font-size:11px;font-weight:500;padding:1px 7px;border-radius:10px;background:var(--bg-secondary);margin-right:6px}" +
    ".cc>div{display:grid;grid-template-columns:52px minmax(0,1fr);gap:6px;overflow-wrap:anywhere}" +
    ".cc>div>span{white-space:pre-wrap}";

  function esc(t) {
    return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
  }

  // Word-level matching, same algorithm as Python's difflib.SequenceMatcher (no junk).
  function opcodes(a, b) {
    var b2j = {}, j, i;
    for (j = 0; j < b.length; j++) (b2j[b[j]] = b2j[b[j]] || []).push(j);
    function longest(alo, ahi, blo, bhi) {
      var bi = alo, bj = blo, bs = 0, j2len = {}, nj, js, k, x;
      for (i = alo; i < ahi; i++) {
        nj = {}; js = b2j[a[i]] || [];
        for (x = 0; x < js.length; x++) {
          j = js[x];
          if (j < blo) continue;
          if (j >= bhi) break;
          k = nj[j] = (j2len[j - 1] || 0) + 1;
          if (k > bs) { bi = i - k + 1; bj = j - k + 1; bs = k; }
        }
        j2len = nj;
      }
      while (bi > alo && bj > blo && a[bi - 1] === b[bj - 1]) { bi--; bj--; bs++; }
      while (bi + bs < ahi && bj + bs < bhi && a[bi + bs] === b[bj + bs]) bs++;
      return [bi, bj, bs];
    }
    var queue = [[0, a.length, 0, b.length]], blocks = [], q, m;
    while (queue.length) {
      q = queue.pop(); m = longest(q[0], q[1], q[2], q[3]);
      if (m[2]) {
        blocks.push(m);
        if (q[0] < m[0] && q[2] < m[1]) queue.push([q[0], m[0], q[2], m[1]]);
        if (m[0] + m[2] < q[1] && m[1] + m[2] < q[3]) queue.push([m[0] + m[2], q[1], m[1] + m[2], q[3]]);
      }
    }
    blocks.sort(function (p, r) { return p[0] - r[0] || p[1] - r[1] || p[2] - r[2]; });
    var merged = [], c = [0, 0, 0];
    blocks.forEach(function (bl) {
      if (c[0] + c[2] === bl[0] && c[1] + c[2] === bl[1]) c[2] += bl[2];
      else { if (c[2]) merged.push(c); c = bl.slice(); }
    });
    if (c[2]) merged.push(c);
    merged.push([a.length, b.length, 0]);
    var out = [], ia = 0, jb = 0;
    merged.forEach(function (bl) {
      var tag = ia < bl[0] && jb < bl[1] ? "replace" : ia < bl[0] ? "delete" : jb < bl[1] ? "insert" : "";
      if (tag) out.push([tag, ia, bl[0], jb, bl[1]]);
      ia = bl[0] + bl[2]; jb = bl[1] + bl[2];
      if (bl[2]) out.push(["equal", bl[0], ia, bl[1], jb]);
    });
    return out;
  }

  function diff(a, b) {
    var A = a.match(TOK) || [], B = b.match(TOK) || [], before = "", after = "";
    opcodes(A, B).forEach(function (o) {
      var x = esc(A.slice(o[1], o[2]).join("")), y = esc(B.slice(o[3], o[4]).join(""));
      if (o[0] === "equal") { before += x; after += y; }
      else { if (x) before += "<del>" + x + "</del>"; if (y) after += "<ins>" + y + "</ins>"; }
    });
    return [before, after];
  }

  // Row: [number, badge, location, before, after]. Edit: both. Added block: before "". Removed block: after "".
  function row(r) {
    var a = r[3] || "", b = r[4] || "";
    var d = a && b ? diff(a, b) : [a ? "<del>" + esc(a) + "</del>" : "", b ? "<ins>" + esc(b) + "</ins>" : ""];
    var lines = "";
    if (d[0]) lines += '<div><span class="l">Before</span><span>' + d[0] + "</span></div>";
    if (d[1]) lines += '<div><span class="l">After</span><span>' + d[1] + "</span></div>";
    return '<div class="r"><span class="n">' + esc(r[0]) + '</span><div><span class="b">' + esc(r[1]) +
      '</span><span class="loc">' + esc(r[2]) + '</span><div class="cc">' + lines + "</div></div></div>";
  }

  function render() {
    var R = window.CC || [], root = document.getElementById("cc");
    if (!root || !R.length) return;
    root.style.whiteSpace = "normal";
    root.innerHTML = '<h2 class="sr-only">Proposed text changes, one numbered row each, with removed text struck through and added text highlighted.</h2>' +
      "<style>" + CSS + "</style>" + R.map(row).join("");
  }

  window.CCrow = row;
  window.CCr = render;
  render();
})();
