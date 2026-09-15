import { jsx as c, jsxs as y } from "react/jsx-runtime";
import { useRef as x, useState as w } from "react";
function T({
  strength: e = 24,
  className: n = "",
  children: l,
  onMouseMove: t,
  onMouseLeave: i,
  ...p
}) {
  const b = x(null), [o, d] = w({ x: 0, y: 0 }), s = (r) => {
    const a = b.current;
    if (a) {
      const h = a.getBoundingClientRect(), u = r.clientX - h.left - h.width / 2, m = r.clientY - h.top - h.height / 2;
      d({
        x: u / h.width * e,
        y: m / h.height * e
      });
    }
    t == null || t(r);
  }, f = (r) => {
    d({ x: 0, y: 0 }), i == null || i(r);
  };
  return /* @__PURE__ */ c(
    "button",
    {
      ref: b,
      className: `hbl-btn hbl-magnetic ${n}`,
      style: { transform: `translate(${o.x}px, ${o.y}px)` },
      onMouseMove: s,
      onMouseLeave: f,
      ...p,
      children: l
    }
  );
}
let $ = 0;
function S({
  rippleColor: e = "rgba(255, 255, 255, 0.55)",
  className: n = "",
  children: l,
  onClick: t,
  style: i,
  ...p
}) {
  const [b, o] = w([]), d = (s) => {
    const r = s.currentTarget.getBoundingClientRect(), a = Math.max(r.width, r.height) * 2, h = s.clientX - r.left - a / 2, u = s.clientY - r.top - a / 2, m = $++;
    o((g) => [...g, { id: m, x: h, y: u, size: a }]), window.setTimeout(() => {
      o((g) => g.filter((N) => N.id !== m));
    }, 650), t == null || t(s);
  };
  return /* @__PURE__ */ y(
    "button",
    {
      className: `hbl-btn hbl-ripple ${n}`,
      style: { ...i, position: "relative", overflow: "hidden" },
      onClick: d,
      ...p,
      children: [
        /* @__PURE__ */ c("span", { className: "hbl-ripple-content", children: l }),
        b.map((s) => /* @__PURE__ */ c(
          "span",
          {
            className: "hbl-ripple-circle",
            style: {
              left: s.x,
              top: s.y,
              width: s.size,
              height: s.size,
              background: e
            }
          },
          s.id
        ))
      ]
    }
  );
}
function X({
  gradient: e = "linear-gradient(120deg, #7c5cff, #22d3ee, #f472b6, #7c5cff)",
  className: n = "",
  children: l,
  style: t,
  ...i
}) {
  return /* @__PURE__ */ c(
    "button",
    {
      className: `hbl-btn hbl-glow-border ${n}`,
      style: { ...t, "--hbl-glow-gradient": e },
      ...i,
      children: /* @__PURE__ */ c("span", { className: "hbl-glow-border-fill", children: l })
    }
  );
}
function Y({
  maxTilt: e = 14,
  className: n = "",
  children: l,
  onMouseMove: t,
  onMouseLeave: i,
  style: p,
  ...b
}) {
  const o = x(null), [d, s] = w({ rx: 0, ry: 0 }), f = (a) => {
    const h = o.current;
    if (h) {
      const u = h.getBoundingClientRect(), m = (a.clientX - u.left) / u.width, g = (a.clientY - u.top) / u.height;
      s({
        rx: (0.5 - g) * e,
        ry: (m - 0.5) * e
      });
    }
    t == null || t(a);
  }, r = (a) => {
    s({ rx: 0, ry: 0 }), i == null || i(a);
  };
  return /* @__PURE__ */ c(
    "button",
    {
      ref: o,
      className: `hbl-btn hbl-tilt ${n}`,
      style: {
        ...p,
        transform: `perspective(400px) rotateX(${d.rx}deg) rotateY(${d.ry}deg)`
      },
      onMouseMove: f,
      onMouseLeave: r,
      ...b,
      children: l
    }
  );
}
function z({
  underlineColor: e = "currentColor",
  className: n = "",
  children: l,
  style: t,
  ...i
}) {
  return /* @__PURE__ */ c(
    "button",
    {
      className: `hbl-btn hbl-underline-draw ${n}`,
      style: { ...t, "--hbl-underline-color": e },
      ...i,
      children: l
    }
  );
}
function j({
  className: e = "",
  children: n,
  ...l
}) {
  return /* @__PURE__ */ c("button", { className: `hbl-btn hbl-scale-pop ${e}`, ...l, children: n });
}
function I({
  icon: e = "→",
  iconPosition: n = "right",
  className: l = "",
  children: t,
  ...i
}) {
  return /* @__PURE__ */ y(
    "button",
    {
      className: `hbl-btn hbl-icon-slide hbl-icon-slide--${n} ${l}`,
      ...i,
      children: [
        n === "left" && /* @__PURE__ */ c("span", { className: "hbl-icon-slide-icon", "aria-hidden": "true", children: e }),
        /* @__PURE__ */ c("span", { className: "hbl-icon-slide-label", children: t }),
        n === "right" && /* @__PURE__ */ c("span", { className: "hbl-icon-slide-icon", "aria-hidden": "true", children: e })
      ]
    }
  );
}
function D({
  className: e = "",
  children: n,
  onClick: l,
  loadingDuration: t = 1200,
  successDuration: i = 900,
  disabled: p,
  ...b
}) {
  const [o, d] = w("idle"), s = async (f) => {
    if (o !== "idle") return;
    d("loading");
    const r = l == null ? void 0 : l(f);
    r && typeof r.then == "function" ? await r : await new Promise((a) => window.setTimeout(a, t)), d("done"), window.setTimeout(() => d("idle"), i);
  };
  return /* @__PURE__ */ y(
    "button",
    {
      className: `hbl-btn hbl-morph-loading hbl-morph-loading--${o} ${e}`,
      onClick: s,
      disabled: p || o !== "idle",
      "aria-busy": o === "loading",
      ...b,
      children: [
        /* @__PURE__ */ c("span", { className: "hbl-morph-loading-label", children: n }),
        /* @__PURE__ */ c("span", { className: "hbl-morph-loading-spinner", "aria-hidden": "true" }),
        /* @__PURE__ */ c("span", { className: "hbl-morph-loading-check", "aria-hidden": "true", children: "✓" })
      ]
    }
  );
}
export {
  X as GlowBorderButton,
  I as IconSlideButton,
  T as MagneticButton,
  D as MorphLoadingButton,
  S as RippleButton,
  j as ScalePopButton,
  Y as TiltButton,
  z as UnderlineDrawButton
};
//# sourceMappingURL=hover-button-lab.js.map
