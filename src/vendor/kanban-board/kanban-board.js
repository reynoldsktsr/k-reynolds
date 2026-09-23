import { jsxs as c, jsx as r } from "react/jsx-runtime";
import { useState as u } from "react";
function O(s) {
  return typeof crypto < "u" && "randomUUID" in crypto ? `${s}-${crypto.randomUUID()}` : `${s}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
function q(s, f, v, p, k) {
  const n = s.map((i) => ({ ...i, cards: [...i.cards] })), x = n.find((i) => i.id === f), d = n.find((i) => i.id === p);
  if (!x || !d) return s;
  const g = x.cards.findIndex((i) => i.id === v);
  if (g === -1) return s;
  const [y] = x.cards.splice(g, 1);
  let o = k;
  return x === d && g < o && (o -= 1), o = Math.max(0, Math.min(o, d.cards.length)), d.cards.splice(o, 0, y), n;
}
function L({
  columns: s,
  onChange: f,
  allowAddColumn: v = !0,
  allowRenameColumn: p = !0,
  className: k
}) {
  const [n, x] = u(null), [d, g] = u(null), [y, o] = u(null), [i, w] = u(""), [U, C] = u(null), [D, N] = u(""), [B, m] = u(!1), [T, I] = u(""), E = () => {
    x(null), g(null);
  }, F = (e, t, a) => {
    e.dataTransfer.effectAllowed = "move", e.dataTransfer.setData("text/plain", t.id), x({ cardId: t.id, fromColumnId: a });
  }, M = (e, t, a) => {
    if (!n) return;
    e.preventDefault(), e.stopPropagation(), e.dataTransfer.dropEffect = "move";
    const l = e.currentTarget.getBoundingClientRect(), j = e.clientY - l.top < l.height / 2 ? a : a + 1;
    g(
      (h) => h && h.columnId === t && h.index === j ? h : { columnId: t, index: j }
    );
  }, H = (e, t, a) => {
    n && (e.preventDefault(), e.dataTransfer.dropEffect = "move", g(
      (l) => l && l.columnId === t && l.index === a ? l : { columnId: t, index: a }
    ));
  }, z = (e, t) => {
    if (e.preventDefault(), n && d && d.columnId === t) {
      const a = q(
        s,
        n.fromColumnId,
        n.cardId,
        t,
        d.index
      );
      a !== s && f(a);
    }
    E();
  }, P = (e, t) => {
    f(
      s.map(
        (a) => a.id === e ? { ...a, cards: a.cards.filter((l) => l.id !== t) } : a
      )
    );
  }, R = (e) => {
    o(e), w("");
  }, $ = (e, t) => {
    e.preventDefault();
    const a = i.trim();
    if (!a) {
      o(null);
      return;
    }
    const l = { id: O("card"), title: a };
    f(
      s.map((b) => b.id === t ? { ...b, cards: [...b.cards, l] } : b)
    ), w("");
  }, Y = (e) => {
    p && (C(e.id), N(e.title));
  }, A = (e) => {
    const t = D.trim();
    t && f(s.map((a) => a.id === e ? { ...a, title: t } : a)), C(null);
  }, S = (e) => {
    e.preventDefault();
    const t = T.trim();
    if (!t) {
      m(!1);
      return;
    }
    const a = { id: O("col"), title: t, cards: [] };
    f([...s, a]), I(""), m(!1);
  }, K = (e, t, a) => {
    e.key === "Enter" ? (e.preventDefault(), t()) : e.key === "Escape" && (e.preventDefault(), a());
  };
  return /* @__PURE__ */ c(
    "div",
    {
      className: `flex h-full w-full gap-4 overflow-x-auto px-1 pb-4 ${k ?? ""}`,
      onDragEnd: E,
      children: [
        s.map((e) => /* @__PURE__ */ c(
          "div",
          {
            className: "flex w-72 shrink-0 flex-col rounded-xl bg-slate-100 dark:bg-slate-800/60 sm:w-80",
            children: [
              /* @__PURE__ */ c("div", { className: "flex items-center justify-between gap-2 px-3 pt-3 pb-2", children: [
                U === e.id ? /* @__PURE__ */ r(
                  "input",
                  {
                    autoFocus: !0,
                    value: D,
                    onChange: (t) => N(t.target.value),
                    onBlur: () => A(e.id),
                    onKeyDown: (t) => K(
                      t,
                      () => A(e.id),
                      () => C(null)
                    ),
                    className: "w-full rounded border border-slate-300 bg-white px-2 py-1 text-sm font-semibold text-slate-900 outline-none focus:border-indigo-400 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
                  }
                ) : /* @__PURE__ */ r(
                  "button",
                  {
                    type: "button",
                    onClick: () => Y(e),
                    className: `truncate text-left text-sm font-semibold text-slate-700 dark:text-slate-200 ${p ? "cursor-text hover:text-slate-900 dark:hover:text-white" : "cursor-default"}`,
                    disabled: !p,
                    children: e.title
                  }
                ),
                /* @__PURE__ */ r("span", { className: "shrink-0 rounded-full bg-slate-200 px-2 py-0.5 text-xs font-medium text-slate-500 dark:bg-slate-700 dark:text-slate-300", children: e.cards.length })
              ] }),
              /* @__PURE__ */ c(
                "div",
                {
                  className: "flex min-h-[2rem] flex-1 flex-col gap-2 overflow-y-auto px-3 pb-2",
                  onDragOver: (t) => H(t, e.id, e.cards.length),
                  onDrop: (t) => z(t, e.id),
                  children: [
                    e.cards.map((t, a) => /* @__PURE__ */ c("div", { children: [
                      (d == null ? void 0 : d.columnId) === e.id && d.index === a && /* @__PURE__ */ r("div", { className: "mb-2 h-1 rounded-full bg-indigo-400 dark:bg-indigo-500" }),
                      /* @__PURE__ */ c(
                        "div",
                        {
                          draggable: !0,
                          onDragStart: (l) => F(l, t, e.id),
                          onDragOver: (l) => M(l, e.id, a),
                          className: `group relative rounded-lg border border-slate-200 bg-white p-3 shadow-sm transition-opacity dark:border-slate-700 dark:bg-slate-900 ${(n == null ? void 0 : n.cardId) === t.id ? "opacity-40" : "opacity-100"} cursor-grab active:cursor-grabbing`,
                          children: [
                            /* @__PURE__ */ r(
                              "button",
                              {
                                type: "button",
                                onClick: () => P(e.id, t.id),
                                "aria-label": `Delete card "${t.title}"`,
                                className: "absolute right-1.5 top-1.5 hidden h-5 w-5 items-center justify-center rounded text-slate-400 hover:bg-slate-100 hover:text-slate-600 group-hover:flex dark:hover:bg-slate-800 dark:hover:text-slate-200",
                                children: "×"
                              }
                            ),
                            /* @__PURE__ */ r("p", { className: "pr-5 text-sm font-medium text-slate-800 dark:text-slate-100", children: t.title }),
                            t.description && /* @__PURE__ */ r("p", { className: "mt-1 text-xs text-slate-500 dark:text-slate-400", children: t.description })
                          ]
                        }
                      )
                    ] }, t.id)),
                    (d == null ? void 0 : d.columnId) === e.id && d.index === e.cards.length && /* @__PURE__ */ r("div", { className: "h-1 rounded-full bg-indigo-400 dark:bg-indigo-500" })
                  ]
                }
              ),
              /* @__PURE__ */ r("div", { className: "px-3 pb-3 pt-1", children: y === e.id ? /* @__PURE__ */ c("form", { onSubmit: (t) => $(t, e.id), className: "flex flex-col gap-2", children: [
                /* @__PURE__ */ r(
                  "textarea",
                  {
                    autoFocus: !0,
                    value: i,
                    onChange: (t) => w(t.target.value),
                    onKeyDown: (t) => {
                      t.key === "Enter" && !t.shiftKey ? (t.preventDefault(), $(t, e.id)) : t.key === "Escape" && o(null);
                    },
                    placeholder: "Enter a title for this card...",
                    rows: 2,
                    className: "w-full resize-none rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-sm text-slate-800 outline-none focus:border-indigo-400 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
                  }
                ),
                /* @__PURE__ */ c("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ r(
                    "button",
                    {
                      type: "submit",
                      className: "rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-500",
                      children: "Add card"
                    }
                  ),
                  /* @__PURE__ */ r(
                    "button",
                    {
                      type: "button",
                      onClick: () => o(null),
                      className: "rounded-lg px-3 py-1.5 text-sm text-slate-500 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-700",
                      children: "Cancel"
                    }
                  )
                ] })
              ] }) : /* @__PURE__ */ r(
                "button",
                {
                  type: "button",
                  onClick: () => R(e.id),
                  className: "w-full rounded-lg px-2 py-1.5 text-left text-sm text-slate-500 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-700",
                  children: "+ Add a card"
                }
              ) })
            ]
          },
          e.id
        )),
        v && /* @__PURE__ */ r("div", { className: "w-72 shrink-0 sm:w-80", children: B ? /* @__PURE__ */ c(
          "form",
          {
            onSubmit: S,
            className: "flex flex-col gap-2 rounded-xl bg-slate-100 p-3 dark:bg-slate-800/60",
            children: [
              /* @__PURE__ */ r(
                "input",
                {
                  autoFocus: !0,
                  value: T,
                  onChange: (e) => I(e.target.value),
                  onKeyDown: (e) => K(
                    e,
                    () => S(e),
                    () => m(!1)
                  ),
                  placeholder: "Column name...",
                  className: "w-full rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-sm text-slate-800 outline-none focus:border-indigo-400 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
                }
              ),
              /* @__PURE__ */ c("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ r(
                  "button",
                  {
                    type: "submit",
                    className: "rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-500",
                    children: "Add column"
                  }
                ),
                /* @__PURE__ */ r(
                  "button",
                  {
                    type: "button",
                    onClick: () => m(!1),
                    className: "rounded-lg px-3 py-1.5 text-sm text-slate-500 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-700",
                    children: "Cancel"
                  }
                )
              ] })
            ]
          }
        ) : /* @__PURE__ */ r(
          "button",
          {
            type: "button",
            onClick: () => m(!0),
            className: "w-full rounded-xl border-2 border-dashed border-slate-300 px-3 py-3 text-sm font-medium text-slate-400 hover:border-slate-400 hover:text-slate-500 dark:border-slate-700 dark:text-slate-500 dark:hover:border-slate-600 dark:hover:text-slate-400",
            children: "+ Add column"
          }
        ) })
      ]
    }
  );
}
export {
  L as KanbanBoard
};
//# sourceMappingURL=kanban-board.js.map
