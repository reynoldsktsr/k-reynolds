import { jsx as R, jsxs as q } from "react/jsx-runtime";
import { useRef as m, useState as h, useEffect as x, Children as k, isValidElement as C } from "react";
const E = {
  up: (e) => ({ x: 0, y: e }),
  down: (e) => ({ x: 0, y: -e }),
  left: (e) => ({ x: e, y: 0 }),
  right: (e) => ({ x: -e, y: 0 }),
  none: () => ({ x: 0, y: 0 })
};
function S({
  children: e,
  direction: l = "up",
  delay: f = 0,
  duration: d = 600,
  once: c = !0,
  distance: p = 24,
  threshold: y = 0.2,
  rootMargin: o = "0px",
  className: t = "",
  style: u
}) {
  const s = m(null), [n, r] = h(!1);
  x(() => {
    const F = s.current;
    if (!F) return;
    const w = new IntersectionObserver(
      ([g]) => {
        g.isIntersecting ? (r(!0), c && w.unobserve(F)) : c || r(!1);
      },
      { threshold: y, rootMargin: o }
    );
    return w.observe(F), () => w.disconnect();
  }, [c, y, o]);
  const { x: v, y: i } = E[l](p), a = {
    ...u,
    opacity: n ? 1 : 0,
    transform: n ? "translate3d(0, 0, 0)" : `translate3d(${v}px, ${i}px, 0)`,
    transition: `opacity ${d}ms ease-out, transform ${d}ms ease-out`,
    transitionDelay: `${f}ms`,
    willChange: "opacity, transform"
  };
  return /* @__PURE__ */ R("div", { ref: s, className: t, style: a, children: e });
}
function O({
  children: e,
  staggerMs: l = 100,
  direction: f = "up",
  duration: d = 600,
  once: c = !0,
  distance: p = 24,
  threshold: y = 0.2,
  className: o = "",
  style: t,
  itemClassName: u = ""
}) {
  const s = k.toArray(e);
  return /* @__PURE__ */ R("div", { className: o, style: t, children: s.map((n, r) => /* @__PURE__ */ R(
    S,
    {
      direction: f,
      delay: r * l,
      duration: d,
      once: c,
      distance: p,
      threshold: y,
      className: u,
      children: n
    },
    C(n) && n.key != null ? n.key : r
  )) });
}
function T({ children: e, speed: l = 0.3, className: f = "", style: d }) {
  const c = m(null), [p, y] = h(0), o = m(null);
  x(() => {
    const u = c.current;
    if (!u) return;
    const s = () => {
      o.current = null;
      const r = u.getBoundingClientRect(), v = window.innerHeight / 2, i = r.top + r.height / 2, a = v - i;
      y(a * l);
    }, n = () => {
      o.current === null && (o.current = requestAnimationFrame(s));
    };
    return s(), window.addEventListener("scroll", n, { passive: !0 }), window.addEventListener("resize", n), () => {
      window.removeEventListener("scroll", n), window.removeEventListener("resize", n), o.current !== null && cancelAnimationFrame(o.current);
    };
  }, [l]);
  const t = {
    ...d,
    transform: `translate3d(0, ${p}px, 0)`,
    willChange: "transform"
  };
  return /* @__PURE__ */ R("div", { ref: c, className: f, style: t, children: e });
}
const M = (e) => Math.round(e).toLocaleString(), $ = (e) => 1 - Math.pow(1 - e, 3);
function z({
  value: e,
  startValue: l = 0,
  duration: f = 1200,
  formatter: d = M,
  once: c = !0,
  threshold: p = 0.4,
  className: y = "",
  style: o
}) {
  const t = m(null), [u, s] = h(!1), [n, r] = h(l), v = m(null);
  return x(() => {
    const i = t.current;
    if (!i) return;
    const a = new IntersectionObserver(
      ([F]) => {
        F.isIntersecting ? (s(!0), c && a.unobserve(i)) : c || s(!1);
      },
      { threshold: p }
    );
    return a.observe(i), () => a.disconnect();
  }, [c, p]), x(() => {
    if (!u) {
      r(l);
      return;
    }
    const i = l, a = e, F = performance.now(), w = (g) => {
      const A = g - F, b = f <= 0 ? 1 : Math.min(A / f, 1);
      r(i + (a - i) * $(b)), b < 1 ? v.current = requestAnimationFrame(w) : v.current = null;
    };
    return v.current = requestAnimationFrame(w), () => {
      v.current !== null && cancelAnimationFrame(v.current);
    };
  }, [u, e, f, l]), /* @__PURE__ */ R("span", { ref: t, className: y, style: o, children: d(n) });
}
function D({
  children: e,
  speed: l = 60,
  direction: f = "left",
  pauseOnHover: d = !0,
  gap: c = 32,
  className: p = "",
  style: y
}) {
  const o = m(null), t = m(0), u = m(!1), s = m(null), n = m(null);
  return x(() => {
    const r = o.current;
    if (!r) return;
    const v = f === "left" ? -1 : 1, i = (a) => {
      n.current === null && (n.current = a);
      const F = (a - n.current) / 1e3;
      if (n.current = a, !u.current) {
        const w = r.scrollWidth / 2;
        if (w > 0) {
          t.current += l * F, t.current %= w;
          const g = v < 0 ? -t.current : t.current - w;
          r.style.transform = `translate3d(${g}px, 0, 0)`;
        }
      }
      s.current = requestAnimationFrame(i);
    };
    return s.current = requestAnimationFrame(i), () => {
      s.current !== null && cancelAnimationFrame(s.current), n.current = null;
    };
  }, [l, f]), /* @__PURE__ */ R(
    "div",
    {
      className: `mk-marquee ${p}`,
      style: y,
      onMouseEnter: () => {
        d && (u.current = !0);
      },
      onMouseLeave: () => {
        d && (u.current = !1);
      },
      children: /* @__PURE__ */ q("div", { ref: o, className: "mk-marquee-track", style: { gap: c }, children: [
        /* @__PURE__ */ R("div", { className: "mk-marquee-group", style: { gap: c }, children: e }),
        /* @__PURE__ */ R("div", { className: "mk-marquee-group", style: { gap: c }, "aria-hidden": "true", children: e })
      ] })
    }
  );
}
const L = {
  mass: 1,
  stiffness: 170,
  damping: 26,
  precision: 0.01
};
function j(e, l) {
  const { mass: f, stiffness: d, damping: c, precision: p } = {
    ...L,
    ...l
  }, [y, o] = h(e), t = m(e), u = m(0), s = m(e), n = m(null), r = m(null);
  return s.current = e, x(() => {
    const v = (i) => {
      r.current === null && (r.current = i);
      const a = Math.min((i - r.current) / 1e3, 1 / 30);
      r.current = i;
      const F = t.current - s.current, w = -d * F, g = -c * u.current, A = (w + g) / f;
      if (u.current += A * a, t.current += u.current * a, Math.abs(u.current) < p && Math.abs(t.current - s.current) < p) {
        t.current = s.current, u.current = 0, o(t.current), n.current = null, r.current = null;
        return;
      }
      o(t.current), n.current = requestAnimationFrame(v);
    };
    return n.current === null && (n.current = requestAnimationFrame(v)), () => {
      n.current !== null && (cancelAnimationFrame(n.current), n.current = null), r.current = null;
    };
  }, [e, f, d, c, p]), y;
}
export {
  z as AnimatedCounter,
  D as Marquee,
  T as Parallax,
  S as Reveal,
  O as Stagger,
  j as useSpring
};
//# sourceMappingURL=motion-kit.js.map
