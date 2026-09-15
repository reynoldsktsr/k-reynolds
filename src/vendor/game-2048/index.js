import { jsxs as h, jsx as a } from "react/jsx-runtime";
import { useMemo as W, useState as N, useRef as L, useCallback as D, useEffect as I } from "react";
const $ = 2048, F = 130, G = "game-2048:best-score", X = {
  2: { background: "#eee4da", text: "#776e65" },
  4: { background: "#ede0c8", text: "#776e65" },
  8: { background: "#f2b179", text: "#f9f6f2" },
  16: { background: "#f59563", text: "#f9f6f2" },
  32: { background: "#f67c5f", text: "#f9f6f2" },
  64: { background: "#f65e3b", text: "#f9f6f2" },
  128: { background: "#edcf72", text: "#f9f6f2" },
  256: { background: "#edcc61", text: "#f9f6f2" },
  512: { background: "#edc850", text: "#f9f6f2" },
  1024: { background: "#edc53f", text: "#f9f6f2" },
  2048: { background: "#edc22e", text: "#f9f6f2" }
}, q = { background: "#3c3a32", text: "#f9f6f2" }, R = {
  boardBackground: "#bbada0",
  cellBackground: "rgba(238, 228, 218, 0.35)",
  accent: "#8f7a66"
};
let H = 0;
function O() {
  return H += 1, H;
}
function J(o) {
  return Array.from({ length: o }, () => Array(o).fill(null));
}
function j(o, e) {
  const l = J(e);
  for (const r of o) l[r.row][r.col] = r;
  return l;
}
function _(o, e) {
  const l = j(o, e), r = [];
  for (let t = 0; t < e; t += 1)
    for (let i = 0; i < e; i += 1)
      l[t][i] || r.push({ row: t, col: i });
  if (r.length === 0) return o;
  const s = r[Math.floor(Math.random() * r.length)], n = Math.random() < 0.9 ? 2 : 4;
  return [...o, { id: O(), value: n, row: s.row, col: s.col, isNew: !0 }];
}
function K(o) {
  return _(_([], o), o);
}
function Q(o, e, l) {
  const r = [];
  for (let s = 0; s < e; s += 1)
    switch (o) {
      case "left":
        r.push({ row: l, col: s });
        break;
      case "right":
        r.push({ row: l, col: e - 1 - s });
        break;
      case "up":
        r.push({ row: s, col: l });
        break;
      case "down":
        r.push({ row: e - 1 - s, col: l });
        break;
    }
  return r;
}
function Z(o, e, l) {
  const r = j(o, e), s = [], n = [];
  let t = !1, i = 0;
  for (let g = 0; g < e; g += 1) {
    const m = Q(l, e, g), w = m.map(({ row: u, col: b }) => r[u][b]).filter((u) => u !== null);
    let k = 0, y = 0;
    for (; y < w.length; ) {
      const u = w[y], b = w[y + 1], f = m[k];
      if (b && b.value === u.value) {
        s.push({ ...u, row: f.row, col: f.col }), s.push({ ...b, row: f.row, col: f.col });
        const v = u.value * 2;
        n.push({ id: O(), value: v, row: f.row, col: f.col, isMerged: !0 }), i += v, t = !0, y += 2;
      } else
        s.push({ ...u, row: f.row, col: f.col }), n.push({ ...u, row: f.row, col: f.col }), (u.row !== f.row || u.col !== f.col) && (t = !0), y += 1;
      k += 1;
    }
  }
  return { slid: s, settled: n, moved: t, scoreGained: i };
}
function z(o, e) {
  var r, s, n;
  if (o.length < e * e) return !1;
  const l = j(o, e);
  for (let t = 0; t < e; t += 1)
    for (let i = 0; i < e; i += 1) {
      const g = (r = l[t][i]) == null ? void 0 : r.value;
      if (g === void 0) return !1;
      const m = i + 1 < e ? (s = l[t][i + 1]) == null ? void 0 : s.value : void 0, w = t + 1 < e ? (n = l[t + 1][i]) == null ? void 0 : n.value : void 0;
      if (m === g || w === g) return !1;
    }
  return !0;
}
function ee() {
  try {
    const o = window.localStorage.getItem(G), e = o ? Number(o) : 0;
    return Number.isFinite(e) ? e : 0;
  } catch {
    return 0;
  }
}
function U({ label: o, value: e, accent: l }) {
  return /* @__PURE__ */ h(
    "div",
    {
      className: "flex min-w-[4.5rem] flex-col items-center rounded-md px-3 py-1.5",
      style: { backgroundColor: l },
      children: [
        /* @__PURE__ */ a("span", { className: "text-[0.65rem] font-bold uppercase tracking-wide text-white/70", children: o }),
        /* @__PURE__ */ a("span", { className: "text-lg font-bold text-white", children: e })
      ]
    }
  );
}
function re({ gridSize: o = 4, theme: e, onWin: l, onGameOver: r, className: s }) {
  const n = Math.max(2, Math.min(12, Math.round(o))), t = W(
    () => ({
      boardBackground: (e == null ? void 0 : e.boardBackground) ?? R.boardBackground,
      cellBackground: (e == null ? void 0 : e.cellBackground) ?? R.cellBackground,
      accent: (e == null ? void 0 : e.accent) ?? R.accent,
      tileColors: { ...X, ...e == null ? void 0 : e.tileColors }
    }),
    [e]
  ), [i, g] = N(() => K(n)), [m, w] = N(0), [k, y] = N(() => ee()), [u, b] = N("playing"), [f, v] = N(!1), B = L(!1), S = L(!1), A = L(null), T = D(() => {
    S.current = !1, B.current = !1, g(K(n)), w(0), b("playing"), v(!1);
  }, [n]);
  I(() => {
    T();
  }, [n]), I(() => {
    try {
      window.localStorage.setItem(G, String(k));
    } catch {
    }
  }, [k]);
  const C = D(
    (d) => {
      if (S.current || u === "over" || u === "won" && !f) return;
      const c = Z(i, n, d);
      c.moved && (S.current = !0, g(c.slid), window.setTimeout(() => {
        const x = _(c.settled, n);
        g(x);
        const p = m + c.scoreGained;
        w(p), y((M) => Math.max(M, p)), !B.current && c.settled.some((M) => M.value >= $) ? (B.current = !0, b("won"), l == null || l()) : z(x, n) && (b("over"), r == null || r(p)), S.current = !1;
      }, F));
    },
    [i, n, u, f, m, l, r]
  );
  I(() => {
    const d = {
      ArrowUp: "up",
      ArrowDown: "down",
      ArrowLeft: "left",
      ArrowRight: "right",
      w: "up",
      s: "down",
      a: "left",
      d: "right"
    }, c = (x) => {
      const p = d[x.key];
      p && (x.preventDefault(), C(p));
    };
    return window.addEventListener("keydown", c), () => window.removeEventListener("keydown", c);
  }, [C]);
  const P = (d) => {
    const c = d.touches[0];
    A.current = { x: c.clientX, y: c.clientY };
  }, Y = (d) => {
    const c = A.current;
    if (A.current = null, !c) return;
    const x = d.changedTouches[0], p = x.clientX - c.x, E = x.clientY - c.y;
    Math.max(Math.abs(p), Math.abs(E)) < 24 || (Math.abs(p) > Math.abs(E) ? C(p > 0 ? "right" : "left") : C(E > 0 ? "down" : "up"));
  }, V = (d) => {
    const c = String(d).length;
    return n >= 7 ? c > 3 ? "0.75rem" : "1rem" : c > 3 ? "1.1rem" : c > 2 ? "1.4rem" : "1.75rem";
  };
  return /* @__PURE__ */ h("div", { className: `inline-flex w-full max-w-md flex-col gap-4 select-none ${s ?? ""}`, children: [
    /* @__PURE__ */ h("div", { className: "flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ h("div", { children: [
        /* @__PURE__ */ a("h2", { className: "text-3xl font-extrabold", style: { color: t.accent }, children: "2048" }),
        /* @__PURE__ */ h("p", { className: "text-sm text-gray-500", children: [
          "Join the tiles, reach ",
          $,
          "!"
        ] })
      ] }),
      /* @__PURE__ */ h("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ a(U, { label: "Score", value: m, accent: t.accent }),
        /* @__PURE__ */ a(U, { label: "Best", value: k, accent: t.accent })
      ] })
    ] }),
    /* @__PURE__ */ a("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ a(
      "button",
      {
        type: "button",
        onClick: T,
        className: "rounded-md px-4 py-2 text-sm font-bold text-white transition-opacity hover:opacity-90",
        style: { backgroundColor: t.accent },
        children: "New Game"
      }
    ) }),
    /* @__PURE__ */ h(
      "div",
      {
        className: "relative aspect-square w-full touch-none rounded-lg",
        style: { backgroundColor: t.boardBackground },
        onTouchStart: P,
        onTouchEnd: Y,
        children: [
          /* @__PURE__ */ a("div", { className: "absolute inset-0", style: { padding: "3%" }, children: /* @__PURE__ */ a(
            "div",
            {
              className: "grid h-full w-full",
              style: {
                gridTemplateColumns: `repeat(${n}, 1fr)`,
                gridTemplateRows: `repeat(${n}, 1fr)`
              },
              children: Array.from({ length: n * n }).map((d, c) => /* @__PURE__ */ a("div", { className: "relative", children: /* @__PURE__ */ a(
                "div",
                {
                  className: "absolute rounded-md",
                  style: { inset: "6%", backgroundColor: t.cellBackground }
                }
              ) }, c))
            }
          ) }),
          /* @__PURE__ */ a("div", { className: "absolute inset-0", style: { padding: "3%" }, children: i.map((d) => {
            const c = t.tileColors[d.value] ?? q;
            return /* @__PURE__ */ a(
              "div",
              {
                className: "absolute top-0 left-0",
                style: {
                  width: `${100 / n}%`,
                  height: `${100 / n}%`,
                  transform: `translate(${d.col * 100}%, ${d.row * 100}%)`,
                  transition: `transform ${F}ms ease-in-out`
                },
                children: /* @__PURE__ */ a(
                  "div",
                  {
                    className: `absolute flex items-center justify-center rounded-md font-bold shadow-sm ${d.isMerged || d.isNew ? "animate-pop-in" : ""}`,
                    style: {
                      inset: "6%",
                      backgroundColor: c.background,
                      color: c.text,
                      fontSize: V(d.value)
                    },
                    children: d.value
                  }
                )
              },
              d.id
            );
          }) }),
          u === "won" && !f && /* @__PURE__ */ h("div", { className: "absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-lg bg-white/85 backdrop-blur-sm", children: [
            /* @__PURE__ */ a("p", { className: "text-2xl font-extrabold text-gray-700", children: "You win!" }),
            /* @__PURE__ */ h("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ a(
                "button",
                {
                  type: "button",
                  onClick: () => v(!0),
                  className: "rounded-md px-4 py-2 text-sm font-bold text-white transition-opacity hover:opacity-90",
                  style: { backgroundColor: t.accent },
                  children: "Keep playing"
                }
              ),
              /* @__PURE__ */ a(
                "button",
                {
                  type: "button",
                  onClick: T,
                  className: "rounded-md px-4 py-2 text-sm font-bold text-white transition-opacity hover:opacity-90",
                  style: { backgroundColor: t.accent },
                  children: "New game"
                }
              )
            ] })
          ] }),
          u === "over" && /* @__PURE__ */ h("div", { className: "absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-lg bg-white/85 backdrop-blur-sm", children: [
            /* @__PURE__ */ a("p", { className: "text-2xl font-extrabold text-gray-700", children: "Game over!" }),
            /* @__PURE__ */ a(
              "button",
              {
                type: "button",
                onClick: T,
                className: "rounded-md px-4 py-2 text-sm font-bold text-white transition-opacity hover:opacity-90",
                style: { backgroundColor: t.accent },
                children: "Try again"
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ a("p", { className: "text-center text-xs text-gray-400", children: "Use the arrow keys (or WASD) to play, or swipe on touch devices." })
  ] });
}
export {
  re as Game2048,
  re as default
};
//# sourceMappingURL=index.js.map
