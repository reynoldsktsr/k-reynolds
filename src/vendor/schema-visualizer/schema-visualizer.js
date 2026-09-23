import { jsxs as x, jsx as c } from "react/jsx-runtime";
import { forwardRef as V, useRef as S, useState as z, useLayoutEffect as W, useCallback as k, useImperativeHandle as q } from "react";
const R = 236, G = 34, X = 26, J = 6, A = 0.35, E = 2.5, Q = 90, tt = 70;
function et(n) {
  return G + n.columns.length * X + J;
}
function N(...n) {
  return n.filter(Boolean).join(" ");
}
function _(n, a, i) {
  return Math.min(i, Math.max(a, n));
}
function L(n) {
  const a = Math.max(1, Math.ceil(Math.sqrt(n.length))), i = {};
  let h = 0, d = 0, s = 0, l = 0;
  for (const r of n)
    i[r.name] = { x: d, y: s }, l = Math.max(l, et(r)), h += 1, d += R + Q, h >= a && (h = 0, d = 0, s += l + tt, l = 0);
  return i;
}
function D(n, a, i, h, d) {
  const s = n[i], l = a.get(i);
  if (!s || !l) return null;
  const r = l.columns.findIndex((b) => b.name === h), g = r >= 0 ? r : 0, f = s.y + G + g * X + X / 2;
  return { x: d === "left" ? s.x : s.x + R, y: f };
}
function nt({ className: n }) {
  return /* @__PURE__ */ x("svg", { viewBox: "0 0 16 16", width: "10", height: "10", className: n, fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ c("circle", { cx: "5", cy: "8", r: "3", stroke: "currentColor", strokeWidth: "1.4" }),
    /* @__PURE__ */ c("path", { d: "M7.3 8h7M11.5 8v2.3M13.6 8v1.6", stroke: "currentColor", strokeWidth: "1.4", strokeLinecap: "round" })
  ] });
}
function rt(n) {
  switch (n) {
    case "one-to-one":
      return { start: "url(#sv-one)", end: "url(#sv-one)", dashed: !1 };
    case "many-to-many":
      return { start: "url(#sv-many)", end: "url(#sv-many)", dashed: !0 };
    case "one-to-many":
    default:
      return { start: "url(#sv-many)", end: "url(#sv-one)", dashed: !1 };
  }
}
function at(n, a, i) {
  if (n.from.table === n.to.table) {
    const y = D(a, i, n.from.table, n.from.column, "right"), v = D(a, i, n.to.table, n.to.column, "right");
    if (!y || !v) return null;
    const C = 70;
    return `M ${y.x} ${y.y} C ${y.x + C} ${y.y}, ${v.x + C} ${v.y}, ${v.x} ${v.y}`;
  }
  const d = a[n.from.table], s = a[n.to.table];
  if (!d || !s) return null;
  const l = d.x <= s.x, r = l ? "right" : "left", g = l ? "left" : "right", f = D(a, i, n.from.table, n.from.column, r), p = D(a, i, n.to.table, n.to.column, g);
  if (!f || !p) return null;
  const b = _(Math.abs(p.x - f.x) / 2, 40, 160), $ = r === "right" ? f.x + b : f.x - b, M = g === "left" ? p.x - b : p.x + b;
  return `M ${f.x} ${f.y} C ${$} ${f.y}, ${M} ${p.y}, ${p.x} ${p.y}`;
}
function ot({ table: n, x: a, y: i, isDragging: h, onDragStart: d, onDragMove: s, onDragEnd: l }) {
  return /* @__PURE__ */ x(
    "div",
    {
      className: N(
        "absolute select-none overflow-hidden rounded-lg border shadow-sm",
        "border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900",
        h && "z-50 shadow-xl ring-2 ring-indigo-400 dark:ring-indigo-500"
      ),
      style: { left: a, top: i, width: R, touchAction: "none" },
      children: [
        /* @__PURE__ */ x(
          "div",
          {
            className: N(
              "flex items-center justify-between gap-2 border-b px-3 py-2",
              "border-neutral-200 bg-neutral-50 text-sm font-semibold text-neutral-800",
              "dark:border-neutral-700 dark:bg-neutral-800/60 dark:text-neutral-100",
              h ? "cursor-grabbing" : "cursor-grab"
            ),
            onPointerDown: (r) => d(r, n.name),
            onPointerMove: s,
            onPointerUp: l,
            onPointerCancel: l,
            children: [
              /* @__PURE__ */ c("span", { className: "truncate", children: n.name }),
              /* @__PURE__ */ c("span", { className: "shrink-0 rounded bg-neutral-200 px-1.5 py-0.5 text-[10px] font-normal text-neutral-500 dark:bg-neutral-700 dark:text-neutral-400", children: n.columns.length })
            ]
          }
        ),
        /* @__PURE__ */ c("div", { className: "divide-y divide-neutral-100 dark:divide-neutral-800", children: n.columns.map((r) => /* @__PURE__ */ x(
          "div",
          {
            className: "flex items-center justify-between gap-3 px-3 text-xs",
            style: { height: X },
            children: [
              /* @__PURE__ */ x("span", { className: "flex min-w-0 items-center gap-1.5", children: [
                r.isPrimaryKey && /* @__PURE__ */ c(nt, { className: "shrink-0 text-amber-500" }),
                /* @__PURE__ */ c(
                  "span",
                  {
                    className: N(
                      "truncate font-mono",
                      r.isPrimaryKey && "font-semibold text-amber-600 dark:text-amber-400",
                      r.isForeignKey && !r.isPrimaryKey && "text-sky-600 dark:text-sky-400",
                      !r.isPrimaryKey && !r.isForeignKey && "text-neutral-700 dark:text-neutral-300"
                    ),
                    children: r.name
                  }
                ),
                r.isForeignKey && /* @__PURE__ */ c("span", { className: "shrink-0 rounded-sm bg-sky-100 px-1 text-[9px] font-semibold uppercase tracking-wide text-sky-700 dark:bg-sky-900/50 dark:text-sky-300", children: "fk" })
              ] }),
              /* @__PURE__ */ x("span", { className: "shrink-0 font-mono text-[10px] text-neutral-400 dark:text-neutral-500", children: [
                r.type,
                r.nullable ? "?" : ""
              ] })
            ]
          },
          r.name
        )) })
      ]
    }
  );
}
const it = V(
  function({ schema: a, className: i }, h) {
    const d = S(null), [s, l] = z({}), [r, g] = z({ zoom: 1, pan: { x: 0, y: 0 } }), [f, p] = z(null), [b, $] = z(!1), M = S(null), y = S(null), v = new Map(a.tables.map((t) => [t.name, t]));
    W(() => {
      l((t) => {
        const e = a.tables.filter((u) => !(u.name in t));
        if (e.length === 0) return t;
        const o = L(e);
        return { ...t, ...o };
      });
    }, [a.tables]);
    const C = k(() => {
      l(L(a.tables)), g({ zoom: 1, pan: { x: 0, y: 0 } });
    }, [a.tables]);
    q(h, () => ({ resetLayout: C }), [C]), W(() => {
      const t = d.current;
      if (!t) return;
      const e = (o) => {
        o.preventDefault();
        const u = t.getBoundingClientRect(), m = o.clientX - u.left, P = o.clientY - u.top;
        g((w) => {
          const Y = Math.exp(-o.deltaY * 15e-4), I = _(w.zoom * Y, A, E), F = (m - w.pan.x) / w.zoom, U = (P - w.pan.y) / w.zoom;
          return {
            zoom: I,
            pan: { x: m - I * F, y: P - I * U }
          };
        });
      };
      return t.addEventListener("wheel", e, { passive: !1 }), () => t.removeEventListener("wheel", e);
    }, []);
    const K = k(
      (t, e) => {
        t.stopPropagation(), t.currentTarget.setPointerCapture(t.pointerId);
        const o = s[e] ?? { x: 0, y: 0 };
        M.current = {
          tableName: e,
          startScreenX: t.clientX,
          startScreenY: t.clientY,
          startX: o.x,
          startY: o.y
        }, p(e);
      },
      [s]
    ), O = k(
      (t) => {
        const e = M.current;
        if (!e) return;
        const o = (t.clientX - e.startScreenX) / r.zoom, u = (t.clientY - e.startScreenY) / r.zoom;
        l((m) => ({
          ...m,
          [e.tableName]: { x: e.startX + o, y: e.startY + u }
        }));
      },
      [r.zoom]
    ), j = k((t) => {
      t.currentTarget.hasPointerCapture(t.pointerId) && t.currentTarget.releasePointerCapture(t.pointerId), M.current = null, p(null);
    }, []), Z = k(
      (t) => {
        t.currentTarget.setPointerCapture(t.pointerId), y.current = {
          startScreenX: t.clientX,
          startScreenY: t.clientY,
          startPanX: r.pan.x,
          startPanY: r.pan.y
        }, $(!0);
      },
      [r.pan]
    ), B = k((t) => {
      const e = y.current;
      if (!e) return;
      const o = t.clientX - e.startScreenX, u = t.clientY - e.startScreenY;
      g((m) => ({ ...m, pan: { x: e.startPanX + o, y: e.startPanY + u } }));
    }, []), T = k((t) => {
      t.currentTarget.hasPointerCapture(t.pointerId) && t.currentTarget.releasePointerCapture(t.pointerId), y.current = null, $(!1);
    }, []), H = k((t) => {
      g((e) => {
        const o = d.current, u = o ? o.clientWidth / 2 : 0, m = o ? o.clientHeight / 2 : 0, P = _(e.zoom * t, A, E), w = (u - e.pan.x) / e.zoom, Y = (m - e.pan.y) / e.zoom;
        return {
          zoom: P,
          pan: { x: u - P * w, y: m - P * Y }
        };
      });
    }, []);
    return /* @__PURE__ */ x(
      "div",
      {
        ref: d,
        className: N(
          "relative h-full w-full overflow-hidden bg-neutral-50 dark:bg-neutral-950",
          "bg-[radial-gradient(circle,theme(colors.neutral.300)_1px,transparent_1px)] dark:bg-[radial-gradient(circle,theme(colors.neutral.800)_1px,transparent_1px)]",
          "[background-size:22px_22px]",
          i
        ),
        style: { touchAction: "none", cursor: b ? "grabbing" : "default" },
        onPointerDown: Z,
        onPointerMove: B,
        onPointerUp: T,
        onPointerCancel: T,
        children: [
          /* @__PURE__ */ x(
            "div",
            {
              className: "absolute inset-0",
              style: {
                transform: `translate(${r.pan.x}px, ${r.pan.y}px) scale(${r.zoom})`,
                transformOrigin: "0 0"
              },
              children: [
                /* @__PURE__ */ x(
                  "svg",
                  {
                    className: "absolute left-0 top-0 overflow-visible",
                    width: 1,
                    height: 1,
                    style: { pointerEvents: "none" },
                    children: [
                      /* @__PURE__ */ x("defs", { children: [
                        /* @__PURE__ */ c(
                          "marker",
                          {
                            id: "sv-one",
                            viewBox: "0 0 10 10",
                            refX: "5",
                            refY: "5",
                            markerWidth: "9",
                            markerHeight: "9",
                            orient: "auto-start-reverse",
                            children: /* @__PURE__ */ c("path", { d: "M5,1 L5,9", className: "stroke-neutral-400 dark:stroke-neutral-500", strokeWidth: "1.4" })
                          }
                        ),
                        /* @__PURE__ */ c(
                          "marker",
                          {
                            id: "sv-many",
                            viewBox: "0 0 10 10",
                            refX: "8.5",
                            refY: "5",
                            markerWidth: "11",
                            markerHeight: "11",
                            orient: "auto-start-reverse",
                            children: /* @__PURE__ */ c(
                              "path",
                              {
                                d: "M1,1 L9,5 L1,9 M1,5 L9,5",
                                className: "stroke-neutral-400 dark:stroke-neutral-500",
                                fill: "none",
                                strokeWidth: "1.2"
                              }
                            )
                          }
                        )
                      ] }),
                      a.relationships.map((t, e) => {
                        const o = at(t, s, v);
                        if (!o) return null;
                        const u = t.cardinality ?? "one-to-many", m = rt(u);
                        return /* @__PURE__ */ c(
                          "path",
                          {
                            d: o,
                            fill: "none",
                            className: "stroke-neutral-300 dark:stroke-neutral-600",
                            strokeWidth: 1.6,
                            strokeDasharray: m.dashed ? "5 4" : void 0,
                            markerStart: m.start,
                            markerEnd: m.end
                          },
                          `${t.from.table}.${t.from.column}-${t.to.table}.${t.to.column}-${e}`
                        );
                      })
                    ]
                  }
                ),
                a.tables.map((t) => {
                  const e = s[t.name];
                  return e ? /* @__PURE__ */ c(
                    ot,
                    {
                      table: t,
                      x: e.x,
                      y: e.y,
                      isDragging: f === t.name,
                      onDragStart: K,
                      onDragMove: O,
                      onDragEnd: j
                    },
                    t.name
                  ) : null;
                })
              ]
            }
          ),
          /* @__PURE__ */ x("div", { className: "absolute bottom-3 right-3 flex items-center gap-1 rounded-lg border border-neutral-200 bg-white/90 p-1 text-xs shadow-sm backdrop-blur dark:border-neutral-700 dark:bg-neutral-900/90", children: [
            /* @__PURE__ */ c(
              "button",
              {
                type: "button",
                onClick: () => H(1 / 1.2),
                className: "flex h-6 w-6 items-center justify-center rounded text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800",
                "aria-label": "Zoom out",
                children: "−"
              }
            ),
            /* @__PURE__ */ x("span", { className: "w-10 select-none text-center font-mono text-[11px] text-neutral-500 dark:text-neutral-400", children: [
              Math.round(r.zoom * 100),
              "%"
            ] }),
            /* @__PURE__ */ c(
              "button",
              {
                type: "button",
                onClick: () => H(1.2),
                className: "flex h-6 w-6 items-center justify-center rounded text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800",
                "aria-label": "Zoom in",
                children: "+"
              }
            )
          ] })
        ]
      }
    );
  }
);
export {
  it as SchemaVisualizer
};
