import { jsxs as y, jsx as a } from "react/jsx-runtime";
import { useState as b, useRef as Y, useMemo as $, useCallback as S, useEffect as T } from "react";
const _ = Array(9).fill(null), B = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // columns
  [0, 4, 8],
  [2, 4, 6]
  // diagonals
];
function k(t) {
  for (const e of B) {
    const [n, o, s] = e, r = t[n];
    if (r && r === t[o] && r === t[s])
      return { winner: r, line: e };
  }
  return null;
}
function j(t) {
  return t.every((e) => e !== null) && k(t) === null;
}
function M(t) {
  const e = [];
  for (let n = 0; n < t.length; n++)
    t[n] === null && e.push(n);
  return e;
}
function N(t) {
  return t === "X" ? "O" : "X";
}
function R(t, e, n, o, s, r) {
  const i = k(t);
  if (i)
    return i.winner === n ? 10 - o : o - 10;
  if (j(t)) return 0;
  const u = M(t);
  if (e === n) {
    let x = -1 / 0;
    for (const h of u) {
      t[h] = e;
      const p = R(t, N(e), n, o + 1, s, r);
      if (t[h] = null, x = Math.max(x, p), s = Math.max(s, p), r <= s) break;
    }
    return x;
  }
  let g = 1 / 0;
  for (const x of u) {
    t[x] = e;
    const h = R(t, N(e), n, o + 1, s, r);
    if (t[x] = null, g = Math.min(g, h), r = Math.min(r, h), r <= s) break;
  }
  return g;
}
function z(t, e) {
  const n = M(t);
  if (n.length === 0) return -1;
  if (n.length === 9)
    return 0;
  let o = -1 / 0, s = n[0], r = -1 / 0;
  const i = 1 / 0;
  for (const u of n) {
    t[u] = e;
    const d = R(t, N(e), e, 0, r, i);
    t[u] = null, d > o && (o = d, s = u), r = Math.max(r, d);
  }
  return s;
}
function q(t, e) {
  const o = M(t).map((s) => {
    t[s] = e;
    const r = R(t, N(e), e, 0, -1 / 0, 1 / 0);
    return t[s] = null, { index: s, score: r };
  });
  return o.sort((s, r) => r.score - s.score), o;
}
function V(t) {
  const e = M(t);
  return e[Math.floor(Math.random() * e.length)];
}
function F(t, e, n) {
  var s, r;
  const o = M(t);
  for (const i of o) {
    t[i] = e;
    const u = ((s = k(t)) == null ? void 0 : s.winner) === e;
    if (t[i] = null, u) return i;
  }
  for (const i of o) {
    t[i] = n;
    const u = ((r = k(t)) == null ? void 0 : r.winner) === n;
    if (t[i] = null, u) return i;
  }
  return null;
}
function H(t, e) {
  const n = q(t, e);
  if (!(Math.random() < 0.3 && n.length > 1))
    return n[0].index;
  const s = n.filter((i) => i.score < n[0].score), r = s.length > 0 ? s : n;
  return r[Math.floor(Math.random() * r.length)].index;
}
function J(t, e, n) {
  if (Math.random() < 0.35) {
    const s = F(t, e, n);
    if (s !== null) return s;
  }
  return V(t);
}
function K(t, e, n, o) {
  switch (e) {
    case "easy":
      return J(t, n, o);
    case "medium":
      return H(t, n);
    case "unbeatable":
    default:
      return z(t, n);
  }
}
const Q = 500;
function U(t, e, n, o) {
  return t ? t.winner === n ? "You win!" : "AI wins!" : e ? "It's a draw!" : o ? "AI is thinking…" : "Your move";
}
function et({
  difficulty: t = "unbeatable",
  firstPlayer: e = "human",
  onGameEnd: n,
  className: o
}) {
  const s = e === "human" ? "X" : "O", r = s === "X" ? "O" : "X", [i, u] = b(() => [..._]), [d, g] = b("X"), [x, h] = b({ wins: 0, losses: 0, draws: 0 }), [p, A] = b(!1), I = Y(!1), l = $(() => k(i), [i]), w = $(() => j(i), [i]), v = d === r && !l && !w, O = S(() => {
    u([..._]), g("X"), A(!1), I.current = !1;
  }, []), D = S(() => {
    h({ wins: 0, losses: 0, draws: 0 });
  }, []);
  T(() => {
    O();
  }, [t, e]);
  const E = S(
    (m) => {
      l || w || d === s && i[m] === null && (u((c) => {
        const f = [...c];
        return f[m] = s, f;
      }), g(r));
    },
    [i, d, w, l, s, r]
  );
  T(() => {
    if (!v) return;
    const m = window.setTimeout(() => {
      u((c) => {
        if (k(c) || M(c).length === 0) return c;
        const f = K(c, t, r, s);
        if (f === -1 || f === void 0) return c;
        const X = [...c];
        return X[f] = r, X;
      }), g(s);
    }, Q);
    return () => window.clearTimeout(m);
  }, [v, t, r, s]), T(() => {
    if (!l && !w || I.current) return;
    I.current = !0, A(!0);
    const m = l ? l.winner === s ? "human" : "ai" : "draw";
    h((c) => {
      const f = {
        wins: c.wins + (m === "human" ? 1 : 0),
        losses: c.losses + (m === "ai" ? 1 : 0),
        draws: c.draws + (m === "draw" ? 1 : 0)
      };
      return n == null || n({ outcome: m, humanMark: s, score: f }), f;
    });
  }, [l, w, s]);
  const L = U(l, w, s, v), W = (l == null ? void 0 : l.line) ?? [];
  return /* @__PURE__ */ y("div", { className: `flex w-full max-w-sm flex-col items-center gap-5 ${o ?? ""}`, children: [
    /* @__PURE__ */ a(G, { score: x, onReset: D }),
    /* @__PURE__ */ a(
      "div",
      {
        role: "status",
        "aria-live": "polite",
        className: `text-sm font-medium tracking-wide ${(l == null ? void 0 : l.winner) === s ? "text-emerald-500" : (l == null ? void 0 : l.winner) === r ? "text-rose-500" : w ? "text-amber-500" : "text-slate-500 dark:text-slate-400"}`,
        children: L
      }
    ),
    /* @__PURE__ */ a(
      "div",
      {
        className: "grid grid-cols-3 gap-2 rounded-2xl bg-slate-200/70 p-2 shadow-inner dark:bg-slate-800/70",
        "aria-disabled": p || v,
        children: i.map((m, c) => /* @__PURE__ */ a(
          Z,
          {
            value: m,
            highlighted: W.includes(c),
            disabled: m !== null || p || v,
            onClick: () => E(c),
            label: `Cell ${c + 1}`
          },
          c
        ))
      }
    ),
    /* @__PURE__ */ a(
      "button",
      {
        type: "button",
        onClick: O,
        className: "rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-slate-700 active:scale-95 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200",
        children: "New round"
      }
    )
  ] });
}
function Z({ value: t, highlighted: e, disabled: n, onClick: o, label: s }) {
  return /* @__PURE__ */ a(
    "button",
    {
      type: "button",
      "aria-label": s,
      onClick: o,
      disabled: n,
      className: `flex h-20 w-20 items-center justify-center rounded-xl bg-white text-4xl font-bold shadow transition dark:bg-slate-900 sm:h-24 sm:w-24 ${e ? "animate-win-pulse bg-amber-100 text-amber-600 dark:bg-amber-900/60 dark:text-amber-300" : "text-slate-800 dark:text-slate-100"} ${n ? "cursor-default" : "cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800"}`,
      children: t && /* @__PURE__ */ a(
        "span",
        {
          className: `animate-pop-in ${t === "X" ? "text-sky-500" : "text-rose-500"}`,
          children: t
        }
      )
    }
  );
}
function G({ score: t, onReset: e }) {
  return /* @__PURE__ */ y("div", { className: "flex w-full items-center justify-between rounded-xl bg-slate-100 px-4 py-3 text-sm dark:bg-slate-800", children: [
    /* @__PURE__ */ a(C, { label: "Wins", value: t.wins, accent: "text-emerald-500" }),
    /* @__PURE__ */ a(C, { label: "Draws", value: t.draws, accent: "text-amber-500" }),
    /* @__PURE__ */ a(C, { label: "Losses", value: t.losses, accent: "text-rose-500" }),
    /* @__PURE__ */ a(
      "button",
      {
        type: "button",
        onClick: e,
        title: "Reset score",
        "aria-label": "Reset score",
        className: "ml-2 rounded-md px-2 py-1 text-xs font-medium text-slate-500 underline decoration-dotted hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100",
        children: "Reset"
      }
    )
  ] });
}
function C({ label: t, value: e, accent: n }) {
  return /* @__PURE__ */ y("div", { className: "flex flex-col items-center", children: [
    /* @__PURE__ */ a("span", { className: `text-lg font-bold ${n}`, children: e }),
    /* @__PURE__ */ a("span", { className: "text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400", children: t })
  ] });
}
export {
  et as TicTacToe
};
