import { jsxs as s, jsx as e, Fragment as F } from "react/jsx-runtime";
import { useId as O, forwardRef as R, useState as w } from "react";
function C(a) {
  const o = O();
  return a ?? o;
}
function i(...a) {
  return a.filter(Boolean).join(" ");
}
const D = {
  default: "border-slate-300 focus:border-brand-500 focus:ring-brand-500/30 dark:border-slate-600 dark:focus:border-brand-400",
  success: "border-emerald-500 focus:border-emerald-500 focus:ring-emerald-500/30",
  error: "border-red-500 focus:border-red-500 focus:ring-red-500/30"
}, I = R(function({
  label: o,
  status: d = "default",
  helperText: r,
  disabled: t,
  required: n,
  floatingLabel: c = !1,
  id: x,
  value: m,
  defaultValue: f,
  onFocus: u,
  onBlur: g,
  type: v = "text",
  ...b
}, N) {
  const p = C(x), P = r ? `${p}-helper` : void 0, [S, l] = w(!1), [h, k] = w(!!(f || m)), B = c && (S || h);
  return /* @__PURE__ */ s("div", { className: "w-full", children: [
    /* @__PURE__ */ s("div", { className: "relative", children: [
      !c && /* @__PURE__ */ s(
        "label",
        {
          htmlFor: p,
          className: i(
            "mb-1.5 block text-sm font-medium",
            t ? "text-slate-400 dark:text-slate-600" : "text-slate-700 dark:text-slate-200"
          ),
          children: [
            o,
            n && /* @__PURE__ */ e("span", { className: "ml-0.5 text-red-500", children: "*" })
          ]
        }
      ),
      /* @__PURE__ */ e(
        "input",
        {
          ...b,
          ref: N,
          id: p,
          type: v,
          disabled: t,
          required: n,
          value: m,
          defaultValue: f,
          "aria-invalid": d === "error" || void 0,
          "aria-describedby": P,
          onFocus: (y) => {
            l(!0), u == null || u(y);
          },
          onBlur: (y) => {
            l(!1), g == null || g(y);
          },
          onChange: (y) => {
            var $;
            k(y.target.value.length > 0), ($ = b.onChange) == null || $.call(b, y);
          },
          placeholder: c ? " " : b.placeholder,
          className: i(
            "peer w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition-all duration-200 ease-out",
            "placeholder:text-slate-400 focus:ring-4",
            "dark:bg-slate-900 dark:text-slate-100",
            c && "pt-5 pb-2",
            D[d],
            t && "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400 shadow-none dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-500"
          )
        }
      ),
      c && /* @__PURE__ */ s(
        "label",
        {
          htmlFor: p,
          className: i(
            "pointer-events-none absolute left-3.5 origin-left transition-all duration-200 ease-out",
            B ? "top-2 text-[11px]" : "top-1/2 -translate-y-1/2 text-sm",
            t ? "text-slate-400 dark:text-slate-600" : d === "error" ? "text-red-500" : d === "success" ? "text-emerald-600 dark:text-emerald-400" : S ? "text-brand-600 dark:text-brand-400" : "text-slate-500 dark:text-slate-400"
          ),
          children: [
            o,
            n && /* @__PURE__ */ e("span", { className: "ml-0.5 text-red-500", children: "*" })
          ]
        }
      ),
      /* @__PURE__ */ e(V, { status: d, floating: c })
    ] }),
    r && /* @__PURE__ */ e(
      "p",
      {
        id: P,
        className: i(
          "mt-1.5 text-xs transition-colors duration-200",
          d === "error" ? "text-red-500" : d === "success" ? "text-emerald-600 dark:text-emerald-400" : "text-slate-500 dark:text-slate-400"
        ),
        children: r
      }
    )
  ] });
});
function V({ status: a, floating: o }) {
  return a === "default" ? null : /* @__PURE__ */ e(
    "span",
    {
      className: i(
        "pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 animate-fade-in",
        o && "top-1/2"
      ),
      children: a === "success" ? /* @__PURE__ */ e("svg", { viewBox: "0 0 20 20", fill: "currentColor", className: "h-4 w-4 text-emerald-500", children: /* @__PURE__ */ e(
        "path",
        {
          fillRule: "evenodd",
          d: "M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z",
          clipRule: "evenodd"
        }
      ) }) : /* @__PURE__ */ e("svg", { viewBox: "0 0 20 20", fill: "currentColor", className: "h-4 w-4 text-red-500", children: /* @__PURE__ */ e(
        "path",
        {
          fillRule: "evenodd",
          d: "M18 10A8 8 0 112 10a8 8 0 0116 0zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z",
          clipRule: "evenodd"
        }
      ) })
    }
  );
}
const q = {
  default: "border-slate-300 focus:border-brand-500 focus:ring-brand-500/30 dark:border-slate-600 dark:focus:border-brand-400",
  success: "border-emerald-500 focus:border-emerald-500 focus:ring-emerald-500/30",
  error: "border-red-500 focus:border-red-500 focus:ring-red-500/30"
}, W = R(function({ label: o, status: d = "default", helperText: r, disabled: t, required: n, id: c, rows: x = 4, ...m }, f) {
  const u = C(c), g = r ? `${u}-helper` : void 0;
  return /* @__PURE__ */ s("div", { className: "w-full", children: [
    /* @__PURE__ */ s(
      "label",
      {
        htmlFor: u,
        className: i(
          "mb-1.5 block text-sm font-medium",
          t ? "text-slate-400 dark:text-slate-600" : "text-slate-700 dark:text-slate-200"
        ),
        children: [
          o,
          n && /* @__PURE__ */ e("span", { className: "ml-0.5 text-red-500", children: "*" })
        ]
      }
    ),
    /* @__PURE__ */ e(
      "textarea",
      {
        ...m,
        ref: f,
        id: u,
        rows: x,
        disabled: t,
        required: n,
        "aria-invalid": d === "error" || void 0,
        "aria-describedby": g,
        className: i(
          "w-full resize-y rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition-all duration-200 ease-out",
          "placeholder:text-slate-400 focus:ring-4",
          "dark:bg-slate-900 dark:text-slate-100",
          q[d],
          t && "cursor-not-allowed resize-none border-slate-200 bg-slate-100 text-slate-400 shadow-none dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-500"
        )
      }
    ),
    r && /* @__PURE__ */ e(
      "p",
      {
        id: g,
        className: i(
          "mt-1.5 text-xs transition-colors duration-200",
          d === "error" ? "text-red-500" : d === "success" ? "text-emerald-600 dark:text-emerald-400" : "text-slate-500 dark:text-slate-400"
        ),
        children: r
      }
    )
  ] });
}), _ = {
  default: "border-slate-300 focus:border-brand-500 focus:ring-brand-500/30 dark:border-slate-600 dark:focus:border-brand-400",
  success: "border-emerald-500 focus:border-emerald-500 focus:ring-emerald-500/30",
  error: "border-red-500 focus:border-red-500 focus:ring-red-500/30"
}, G = R(function({ label: o, status: d = "default", helperText: r, disabled: t, required: n, id: c, options: x, placeholder: m, ...f }, u) {
  const g = C(c), v = r ? `${g}-helper` : void 0;
  return /* @__PURE__ */ s("div", { className: "w-full", children: [
    /* @__PURE__ */ s(
      "label",
      {
        htmlFor: g,
        className: i(
          "mb-1.5 block text-sm font-medium",
          t ? "text-slate-400 dark:text-slate-600" : "text-slate-700 dark:text-slate-200"
        ),
        children: [
          o,
          n && /* @__PURE__ */ e("span", { className: "ml-0.5 text-red-500", children: "*" })
        ]
      }
    ),
    /* @__PURE__ */ s("div", { className: "relative", children: [
      /* @__PURE__ */ s(
        "select",
        {
          ...f,
          ref: u,
          id: g,
          disabled: t,
          required: n,
          "aria-invalid": d === "error" || void 0,
          "aria-describedby": v,
          defaultValue: f.defaultValue ?? (m ? "" : void 0),
          className: i(
            "w-full appearance-none rounded-lg border bg-white px-3.5 py-2.5 pr-9 text-sm text-slate-900 shadow-sm outline-none transition-all duration-200 ease-out",
            "focus:ring-4",
            "dark:bg-slate-900 dark:text-slate-100",
            _[d],
            t && "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400 shadow-none dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-500"
          ),
          children: [
            m && /* @__PURE__ */ e("option", { value: "", disabled: !0, children: m }),
            x.map((b) => /* @__PURE__ */ e("option", { value: b.value, disabled: b.disabled, children: b.label }, b.value))
          ]
        }
      ),
      /* @__PURE__ */ e(
        "svg",
        {
          viewBox: "0 0 20 20",
          fill: "currentColor",
          className: i(
            "pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2",
            t ? "text-slate-300 dark:text-slate-600" : "text-slate-400"
          ),
          children: /* @__PURE__ */ e(
            "path",
            {
              fillRule: "evenodd",
              d: "M5.23 7.21a.75.75 0 011.06.02L10 10.939l3.71-3.71a.75.75 0 111.06 1.061l-4.24 4.24a.75.75 0 01-1.06 0l-4.24-4.24a.75.75 0 01.02-1.06z",
              clipRule: "evenodd"
            }
          )
        }
      )
    ] }),
    r && /* @__PURE__ */ e(
      "p",
      {
        id: v,
        className: i(
          "mt-1.5 text-xs transition-colors duration-200",
          d === "error" ? "text-red-500" : d === "success" ? "text-emerald-600 dark:text-emerald-400" : "text-slate-500 dark:text-slate-400"
        ),
        children: r
      }
    )
  ] });
}), Y = R(function({ id: o, label: d, status: r = "default", helperText: t, disabled: n, ...c }, x) {
  const m = C(o), f = t ? `${m}-helper` : void 0;
  return /* @__PURE__ */ s("div", { children: [
    /* @__PURE__ */ s(
      "label",
      {
        htmlFor: m,
        className: i("flex cursor-pointer items-start gap-2.5", n && "cursor-not-allowed"),
        children: [
          /* @__PURE__ */ s("span", { className: "relative mt-0.5 inline-flex h-[18px] w-[18px] shrink-0", children: [
            /* @__PURE__ */ e(
              "input",
              {
                ...c,
                ref: x,
                id: m,
                type: "checkbox",
                disabled: n,
                "aria-invalid": r === "error" || void 0,
                "aria-describedby": f,
                className: i(
                  "peer h-[18px] w-[18px] shrink-0 cursor-pointer appearance-none rounded-[5px] border bg-white shadow-sm transition-all duration-150 ease-out",
                  "checked:border-brand-600 checked:bg-brand-600",
                  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/30",
                  "dark:bg-slate-900",
                  r === "error" && "border-red-500",
                  r === "success" && "border-emerald-500",
                  r === "default" && "border-slate-300 dark:border-slate-600",
                  n && "cursor-not-allowed border-slate-200 bg-slate-100 checked:bg-slate-300 dark:border-slate-800 dark:bg-slate-800/60"
                )
              }
            ),
            /* @__PURE__ */ e(
              "svg",
              {
                viewBox: "0 0 16 16",
                fill: "none",
                className: "pointer-events-none absolute inset-0 m-auto h-3 w-3 scale-0 text-white transition-transform duration-150 ease-out peer-checked:scale-100",
                children: /* @__PURE__ */ e(
                  "path",
                  {
                    d: "M3 8.5L6.2 11.5L13 4.5",
                    stroke: "currentColor",
                    strokeWidth: "2",
                    strokeLinecap: "round",
                    strokeLinejoin: "round"
                  }
                )
              }
            )
          ] }),
          /* @__PURE__ */ e("span", { className: "text-sm", children: /* @__PURE__ */ e("span", { className: n ? "text-slate-400 dark:text-slate-600" : "text-slate-700 dark:text-slate-200", children: d }) })
        ]
      }
    ),
    t && /* @__PURE__ */ e(
      "p",
      {
        id: f,
        className: i(
          "ml-[26px] mt-1 text-xs transition-colors duration-200",
          r === "error" ? "text-red-500" : r === "success" ? "text-emerald-600 dark:text-emerald-400" : "text-slate-500 dark:text-slate-400"
        ),
        children: t
      }
    )
  ] });
});
function Z({
  label: a,
  name: o,
  options: d,
  value: r,
  defaultValue: t,
  onChange: n,
  status: c = "default",
  helperText: x,
  disabled: m,
  required: f,
  id: u
}) {
  const g = C(u), v = x ? `${g}-helper` : void 0;
  return /* @__PURE__ */ s("fieldset", { "aria-describedby": v, children: [
    /* @__PURE__ */ s(
      "legend",
      {
        className: i(
          "mb-2 text-sm font-medium",
          m ? "text-slate-400 dark:text-slate-600" : "text-slate-700 dark:text-slate-200"
        ),
        children: [
          a,
          f && /* @__PURE__ */ e("span", { className: "ml-0.5 text-red-500", children: "*" })
        ]
      }
    ),
    /* @__PURE__ */ e("div", { className: "flex flex-col gap-2", children: d.map((b) => {
      const N = `${g}-${b.value}`, p = m || b.disabled;
      return /* @__PURE__ */ s(
        "label",
        {
          htmlFor: N,
          className: i("flex cursor-pointer items-center gap-2.5", p && "cursor-not-allowed"),
          children: [
            /* @__PURE__ */ e("span", { className: "relative inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center", children: /* @__PURE__ */ e(
              "input",
              {
                id: N,
                type: "radio",
                name: o,
                value: b.value,
                disabled: p,
                checked: r !== void 0 ? r === b.value : void 0,
                defaultChecked: r === void 0 ? t === b.value : void 0,
                onChange: () => n == null ? void 0 : n(b.value),
                "aria-invalid": c === "error" || void 0,
                className: i(
                  "peer h-[18px] w-[18px] cursor-pointer appearance-none rounded-full border bg-white shadow-sm transition-all duration-150 ease-out",
                  "checked:border-[5px] checked:border-brand-600",
                  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/30",
                  "dark:bg-slate-900",
                  c === "error" && "border-red-500",
                  c === "success" && "border-emerald-500",
                  c === "default" && "border-slate-300 dark:border-slate-600",
                  p && "cursor-not-allowed border-slate-200 checked:border-slate-300 dark:border-slate-800"
                )
              }
            ) }),
            /* @__PURE__ */ e("span", { className: p ? "text-sm text-slate-400 dark:text-slate-600" : "text-sm text-slate-700 dark:text-slate-200", children: b.label })
          ]
        },
        b.value
      );
    }) }),
    x && /* @__PURE__ */ e(
      "p",
      {
        id: v,
        className: i(
          "mt-1.5 text-xs transition-colors duration-200",
          c === "error" ? "text-red-500" : c === "success" ? "text-emerald-600 dark:text-emerald-400" : "text-slate-500 dark:text-slate-400"
        ),
        children: x
      }
    )
  ] });
}
const z = R(function({ id: o, label: d, status: r = "default", helperText: t, disabled: n, ...c }, x) {
  const m = C(o), f = t ? `${m}-helper` : void 0, u = r === "error" ? "peer-checked:bg-red-500" : r === "success" ? "peer-checked:bg-emerald-500" : "peer-checked:bg-brand-600";
  return /* @__PURE__ */ s("div", { children: [
    /* @__PURE__ */ s(
      "label",
      {
        htmlFor: m,
        className: i("flex cursor-pointer items-center gap-3", n && "cursor-not-allowed"),
        children: [
          /* @__PURE__ */ s("span", { className: "relative inline-flex h-6 w-11 shrink-0 items-center", children: [
            /* @__PURE__ */ e(
              "input",
              {
                ...c,
                ref: x,
                id: m,
                type: "checkbox",
                role: "switch",
                disabled: n,
                "aria-invalid": r === "error" || void 0,
                "aria-describedby": f,
                className: "peer sr-only"
              }
            ),
            /* @__PURE__ */ e(
              "span",
              {
                className: i(
                  "h-6 w-11 rounded-full bg-slate-300 transition-colors duration-200 ease-out dark:bg-slate-600",
                  u,
                  "peer-focus-visible:ring-4 peer-focus-visible:ring-brand-500/30",
                  n && "bg-slate-200 peer-checked:bg-slate-300 dark:bg-slate-800 dark:peer-checked:bg-slate-700"
                )
              }
            ),
            /* @__PURE__ */ e(
              "span",
              {
                className: i(
                  "pointer-events-none absolute left-0.5 h-5 w-5 translate-x-0 rounded-full bg-white shadow-md transition-transform duration-200 ease-out",
                  "peer-checked:translate-x-5",
                  n && "bg-slate-100"
                )
              }
            )
          ] }),
          /* @__PURE__ */ e("span", { className: i("text-sm", n ? "text-slate-400 dark:text-slate-600" : "text-slate-700 dark:text-slate-200"), children: d })
        ]
      }
    ),
    t && /* @__PURE__ */ e(
      "p",
      {
        id: f,
        className: i(
          "ml-14 mt-1 text-xs transition-colors duration-200",
          r === "error" ? "text-red-500" : r === "success" ? "text-emerald-600 dark:text-emerald-400" : "text-slate-500 dark:text-slate-400"
        ),
        children: t
      }
    )
  ] });
}), ee = z;
function H({ steps: a, currentStep: o }) {
  return /* @__PURE__ */ e("ol", { className: "flex w-full items-center", "aria-label": "Progress", children: a.map((d, r) => {
    const t = r < o, n = r === o;
    return /* @__PURE__ */ s("li", { className: i("flex items-center", r !== a.length - 1 && "flex-1"), children: [
      /* @__PURE__ */ s("div", { className: "flex flex-col items-center gap-1.5", children: [
        /* @__PURE__ */ e(
          "span",
          {
            className: i(
              "flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-semibold transition-all duration-300 ease-out",
              t && "border-brand-600 bg-brand-600 text-white",
              n && "border-brand-600 bg-white text-brand-600 ring-4 ring-brand-500/20 dark:bg-slate-900",
              !t && !n && "border-slate-300 bg-white text-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-500"
            ),
            "aria-current": n ? "step" : void 0,
            children: t ? /* @__PURE__ */ e("svg", { viewBox: "0 0 20 20", fill: "currentColor", className: "h-4 w-4", children: /* @__PURE__ */ e(
              "path",
              {
                fillRule: "evenodd",
                d: "M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z",
                clipRule: "evenodd"
              }
            ) }) : r + 1
          }
        ),
        /* @__PURE__ */ e(
          "span",
          {
            className: i(
              "hidden text-xs font-medium sm:block",
              n ? "text-brand-600 dark:text-brand-400" : "text-slate-500 dark:text-slate-400"
            ),
            children: d
          }
        )
      ] }),
      r !== a.length - 1 && /* @__PURE__ */ e("div", { className: "mx-2 h-0.5 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700", children: /* @__PURE__ */ e(
        "div",
        {
          className: i(
            "h-full bg-brand-600 transition-all duration-500 ease-out",
            t ? "w-full" : "w-0"
          )
        }
      ) })
    ] }, d);
  }) });
}
function A(a) {
  if (!a) return { score: 0, label: "Enter a password" };
  let o = 0;
  a.length >= 8 && (o += 1), a.length >= 12 && (o += 1), /[A-Z]/.test(a) && /[a-z]/.test(a) && (o += 1), /\d/.test(a) && (o += 1), /[^A-Za-z0-9]/.test(a) && (o += 1);
  const d = Math.min(o, 4);
  return { score: d, label: ["Very weak", "Weak", "Fair", "Strong", "Very strong"][d] };
}
const U = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-lime-500", "bg-emerald-500"];
function X({ password: a }) {
  const { score: o, label: d } = A(a);
  return /* @__PURE__ */ s("div", { className: "mt-2", "aria-live": "polite", children: [
    /* @__PURE__ */ e("div", { className: "flex gap-1.5", children: [0, 1, 2, 3].map((r) => /* @__PURE__ */ e(
      "span",
      {
        className: i(
          "h-1.5 flex-1 rounded-full transition-colors duration-300 ease-out",
          a && r < o ? U[o - 1] : "bg-slate-200 dark:bg-slate-700"
        )
      },
      r
    )) }),
    /* @__PURE__ */ e("p", { className: "mt-1 text-xs text-slate-500 dark:text-slate-400", children: d })
  ] });
}
const J = /^[^\s@]+@[^\s@]+\.[^\s@]+$/, M = {
  email: "",
  password: "",
  confirmPassword: "",
  fullName: "",
  role: "",
  bio: "",
  plan: "starter",
  notifications: !0,
  agreeToTerms: !1
}, T = ["Account", "Profile", "Review"], L = [
  { value: "engineer", label: "Engineer" },
  { value: "designer", label: "Designer" },
  { value: "product", label: "Product manager" },
  { value: "other", label: "Other" }
], j = [
  { value: "starter", label: "Starter — free" },
  { value: "pro", label: "Pro — $12/mo" },
  { value: "team", label: "Team — $29/mo" }
];
function te() {
  var P, S;
  const [a, o] = w(0), [d, r] = w(!1), [t, n] = w(M), [c, x] = w({}), [m, f] = w("forward");
  function u(l, h) {
    n((k) => ({ ...k, [l]: h })), x((k) => ({ ...k, [l]: void 0 }));
  }
  function g(l) {
    const h = {};
    return l === 0 && (t.email ? J.test(t.email) || (h.email = "Enter a valid email address.") : h.email = "Email is required.", t.password ? A(t.password).score < 2 && (h.password = "Choose a stronger password.") : h.password = "Password is required.", t.confirmPassword ? t.confirmPassword !== t.password && (h.confirmPassword = "Passwords do not match.") : h.confirmPassword = "Please confirm your password."), l === 1 && (t.fullName.trim() || (h.fullName = "Full name is required."), t.role || (h.role = "Please select a role.")), l === 2 && (t.agreeToTerms || (h.agreeToTerms = "You must agree to the terms to continue.")), h;
  }
  function v(l) {
    l.preventDefault();
    const h = g(a);
    if (x(h), !(Object.keys(h).length > 0)) {
      if (a === T.length - 1) {
        r(!0);
        return;
      }
      f("forward"), o((k) => k + 1);
    }
  }
  function b() {
    f("back"), x({}), o((l) => Math.max(0, l - 1));
  }
  function N() {
    n(M), x({}), o(0), r(!1);
  }
  const p = (l) => c[l] ? "error" : "default";
  return d ? /* @__PURE__ */ s("div", { className: "animate-fade-in rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900", children: [
    /* @__PURE__ */ e("div", { className: "mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400", children: /* @__PURE__ */ e("svg", { viewBox: "0 0 20 20", fill: "currentColor", className: "h-7 w-7", children: /* @__PURE__ */ e(
      "path",
      {
        fillRule: "evenodd",
        d: "M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z",
        clipRule: "evenodd"
      }
    ) }) }),
    /* @__PURE__ */ s("h3", { className: "mt-4 text-lg font-semibold text-slate-900 dark:text-slate-100", children: [
      "Welcome aboard, ",
      t.fullName.split(" ")[0] || "friend",
      "!"
    ] }),
    /* @__PURE__ */ s("p", { className: "mx-auto mt-1.5 max-w-sm text-sm text-slate-500 dark:text-slate-400", children: [
      "Your account for ",
      /* @__PURE__ */ e("span", { className: "font-medium text-slate-700 dark:text-slate-200", children: t.email }),
      " has been created on the ",
      (P = j.find((l) => l.value === t.plan)) == null ? void 0 : P.label,
      " plan."
    ] }),
    /* @__PURE__ */ e(
      "button",
      {
        type: "button",
        onClick: N,
        className: "mt-6 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors duration-150 hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/30",
        children: "Start over"
      }
    )
  ] }) : /* @__PURE__ */ s("div", { className: "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900", children: [
    /* @__PURE__ */ e(H, { steps: T, currentStep: a }),
    /* @__PURE__ */ s("form", { onSubmit: v, noValidate: !0, className: "mt-8", children: [
      /* @__PURE__ */ s("div", { className: i("flex flex-col gap-5", m === "forward" ? "animate-fade-slide-in" : "animate-fade-in"), children: [
        a === 0 && /* @__PURE__ */ s(F, { children: [
          /* @__PURE__ */ e(
            I,
            {
              label: "Email address",
              type: "email",
              autoComplete: "email",
              value: t.email,
              onChange: (l) => u("email", l.target.value),
              status: p("email"),
              helperText: c.email ?? "We will send a confirmation link to this address.",
              required: !0,
              floatingLabel: !0
            }
          ),
          /* @__PURE__ */ s("div", { children: [
            /* @__PURE__ */ e(
              I,
              {
                label: "Password",
                type: "password",
                autoComplete: "new-password",
                value: t.password,
                onChange: (l) => u("password", l.target.value),
                status: p("password"),
                helperText: c.password,
                required: !0,
                floatingLabel: !0
              }
            ),
            /* @__PURE__ */ e(X, { password: t.password })
          ] }),
          /* @__PURE__ */ e(
            I,
            {
              label: "Confirm password",
              type: "password",
              autoComplete: "new-password",
              value: t.confirmPassword,
              onChange: (l) => u("confirmPassword", l.target.value),
              status: p("confirmPassword"),
              helperText: c.confirmPassword,
              required: !0,
              floatingLabel: !0
            }
          )
        ] }),
        a === 1 && /* @__PURE__ */ s(F, { children: [
          /* @__PURE__ */ e(
            I,
            {
              label: "Full name",
              value: t.fullName,
              onChange: (l) => u("fullName", l.target.value),
              status: p("fullName"),
              helperText: c.fullName,
              required: !0,
              floatingLabel: !0
            }
          ),
          /* @__PURE__ */ e(
            G,
            {
              label: "Role",
              placeholder: "Select your role",
              options: L,
              value: t.role,
              onChange: (l) => u("role", l.target.value),
              status: p("role"),
              helperText: c.role,
              required: !0
            }
          ),
          /* @__PURE__ */ e(
            W,
            {
              label: "Short bio",
              placeholder: "Tell us a little about yourself (optional)",
              value: t.bio,
              onChange: (l) => u("bio", l.target.value),
              helperText: "Shown on your public profile.",
              rows: 3
            }
          ),
          /* @__PURE__ */ e(
            z,
            {
              label: "Email me product updates",
              checked: t.notifications,
              onChange: (l) => u("notifications", l.target.checked)
            }
          )
        ] }),
        a === 2 && /* @__PURE__ */ s(F, { children: [
          /* @__PURE__ */ e(
            Z,
            {
              label: "Choose a plan",
              name: "plan",
              options: j,
              value: t.plan,
              onChange: (l) => u("plan", l)
            }
          ),
          /* @__PURE__ */ s("dl", { className: "grid grid-cols-1 gap-x-4 gap-y-2 rounded-lg bg-slate-50 p-4 text-sm sm:grid-cols-2 dark:bg-slate-800/50", children: [
            /* @__PURE__ */ e(E, { label: "Name", value: t.fullName }),
            /* @__PURE__ */ e(E, { label: "Email", value: t.email }),
            /* @__PURE__ */ e(E, { label: "Role", value: ((S = L.find((l) => l.value === t.role)) == null ? void 0 : S.label) ?? "—" }),
            /* @__PURE__ */ e(E, { label: "Updates", value: t.notifications ? "Subscribed" : "Not subscribed" })
          ] }),
          /* @__PURE__ */ e(
            Y,
            {
              label: "I agree to the Terms of Service and Privacy Policy",
              checked: t.agreeToTerms,
              onChange: (l) => u("agreeToTerms", l.target.checked),
              status: p("agreeToTerms"),
              helperText: c.agreeToTerms
            }
          )
        ] })
      ] }, a),
      /* @__PURE__ */ s("div", { className: "mt-8 flex items-center justify-between", children: [
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            onClick: b,
            disabled: a === 0,
            className: i(
              "rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-150",
              a === 0 ? "cursor-not-allowed text-slate-300 dark:text-slate-700" : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            ),
            children: "Back"
          }
        ),
        /* @__PURE__ */ s("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ s("span", { className: "text-xs text-slate-400 dark:text-slate-500", children: [
            "Step ",
            a + 1,
            " of ",
            T.length
          ] }),
          /* @__PURE__ */ e(
            "button",
            {
              type: "submit",
              className: "rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors duration-150 hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/30",
              children: a === T.length - 1 ? "Create account" : "Continue"
            }
          )
        ] })
      ] })
    ] })
  ] });
}
function E({ label: a, value: o }) {
  return /* @__PURE__ */ s("div", { className: "flex justify-between gap-2 sm:block", children: [
    /* @__PURE__ */ e("dt", { className: "text-slate-500 dark:text-slate-400", children: a }),
    /* @__PURE__ */ e("dd", { className: "font-medium text-slate-800 dark:text-slate-100", children: o || "—" })
  ] });
}
export {
  Y as Checkbox,
  te as MultiStepForm,
  X as PasswordStrengthMeter,
  Z as RadioGroup,
  G as Select,
  H as StepIndicator,
  ee as Switch,
  W as TextArea,
  I as TextField,
  z as Toggle,
  A as scorePassword
};
//# sourceMappingURL=form-ui-kit.es.js.map
