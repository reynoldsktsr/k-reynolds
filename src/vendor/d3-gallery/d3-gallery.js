import { jsx as w, jsxs as H } from "react/jsx-runtime";
import { useRef as T, useEffect as $, useState as _ } from "react";
import * as r from "d3";
const D = {
  nodes: [
    { id: "ava", group: "design", value: 3, label: "Ava" },
    { id: "ben", group: "design", value: 2, label: "Ben" },
    { id: "cleo", group: "design", value: 1, label: "Cleo" },
    { id: "drew", group: "engineering", value: 4, label: "Drew" },
    { id: "elle", group: "engineering", value: 3, label: "Elle" },
    { id: "finn", group: "engineering", value: 2, label: "Finn" },
    { id: "gina", group: "engineering", value: 2, label: "Gina" },
    { id: "hugo", group: "engineering", value: 1, label: "Hugo" },
    { id: "iris", group: "product", value: 3, label: "Iris" },
    { id: "jax", group: "product", value: 2, label: "Jax" },
    { id: "kira", group: "product", value: 1, label: "Kira" },
    { id: "liam", group: "marketing", value: 2, label: "Liam" },
    { id: "maya", group: "marketing", value: 2, label: "Maya" },
    { id: "noah", group: "marketing", value: 1, label: "Noah" },
    { id: "opal", group: "sales", value: 2, label: "Opal" },
    { id: "pia", group: "sales", value: 1, label: "Pia" }
  ],
  links: [
    { source: "ava", target: "ben", value: 3 },
    { source: "ava", target: "cleo", value: 2 },
    { source: "ben", target: "cleo", value: 1 },
    { source: "ava", target: "iris", value: 2 },
    { source: "drew", target: "elle", value: 3 },
    { source: "drew", target: "finn", value: 2 },
    { source: "drew", target: "gina", value: 2 },
    { source: "elle", target: "hugo", value: 1 },
    { source: "finn", target: "gina", value: 2 },
    { source: "finn", target: "hugo", value: 1 },
    { source: "iris", target: "jax", value: 3 },
    { source: "iris", target: "kira", value: 2 },
    { source: "jax", target: "kira", value: 1 },
    { source: "iris", target: "drew", value: 2 },
    { source: "jax", target: "liam", value: 1 },
    { source: "liam", target: "maya", value: 2 },
    { source: "liam", target: "noah", value: 1 },
    { source: "maya", target: "noah", value: 1 },
    { source: "maya", target: "opal", value: 1 },
    { source: "opal", target: "pia", value: 2 },
    { source: "pia", target: "jax", value: 1 },
    { source: "kira", target: "opal", value: 1 },
    { source: "gina", target: "iris", value: 1 }
  ]
};
function re({
  data: d = D,
  width: u = 640,
  height: o = 480,
  className: P
}) {
  const A = T(null);
  return $(() => {
    const M = A.current;
    if (!M) return;
    const x = r.select(M);
    x.selectAll("*").remove();
    const c = d.nodes.map((a) => ({ ...a })), f = d.links.map((a) => ({ ...a })), k = Array.from(new Set(c.map((a) => String(a.group)))), h = r.scaleOrdinal().domain(k).range(r.schemeTableau10), g = r.scaleSqrt().domain([0, r.max(c, (a) => a.value ?? 1) || 1]).range([6, 18]), v = r.forceSimulation(c).force(
      "link",
      r.forceLink(f).id((a) => a.id).distance(70)
    ).force("charge", r.forceManyBody().strength(-220)).force("center", r.forceCenter(u / 2, o / 2)).force(
      "collide",
      r.forceCollide((a) => g(a.value ?? 1) + 4)
    ), y = x.attr("viewBox", `0 0 ${u} ${o}`).attr("width", "100%").attr("height", "100%"), R = y.append("g").attr("stroke", "#94a3b8").attr("stroke-opacity", 0.5).selectAll("line").data(f).join("line").attr("stroke-width", (a) => Math.sqrt(a.value ?? 1)), b = y.append("g").attr("stroke", "#fff").attr("stroke-width", 1.5).selectAll("circle").data(c).join("circle").attr("r", (a) => g(a.value ?? 1)).attr("fill", (a) => h(String(a.group))).style("cursor", "grab"), l = y.append("g").selectAll("text").data(c).join("text").text((a) => a.label ?? a.id).attr("font-size", 11).attr("font-family", "ui-sans-serif, system-ui, sans-serif").attr("fill", "currentColor").attr("text-anchor", "middle").attr("dy", (a) => -(g(a.value ?? 1) + 6)).attr("opacity", 0).style("pointer-events", "none");
    return b.on("mouseenter", function(a, s) {
      l.filter((n) => n.id === s.id).attr("opacity", 1), r.select(this).attr("stroke", "#0f172a");
    }).on("mouseleave", function(a, s) {
      l.filter((n) => n.id === s.id).attr("opacity", 0), r.select(this).attr("stroke", "#fff");
    }), b.call(
      r.drag().on("start", (a, s) => {
        a.active || v.alphaTarget(0.3).restart(), s.fx = s.x, s.fy = s.y;
      }).on("drag", (a, s) => {
        s.fx = a.x, s.fy = a.y;
      }).on("end", (a, s) => {
        a.active || v.alphaTarget(0), s.fx = null, s.fy = null;
      })
    ), v.on("tick", () => {
      R.attr("x1", (a) => a.source.x ?? 0).attr("y1", (a) => a.source.y ?? 0).attr("x2", (a) => a.target.x ?? 0).attr("y2", (a) => a.target.y ?? 0), b.attr("cx", (a) => a.x ?? 0).attr("cy", (a) => a.y ?? 0), l.attr("x", (a) => a.x ?? 0).attr("y", (a) => a.y ?? 0);
    }), () => {
      v.stop(), x.selectAll("*").remove();
    };
  }, [d, u, o]), /* @__PURE__ */ w("svg", { ref: A, className: P, role: "img", "aria-label": "Force-directed graph" });
}
const Q = {
  name: "project",
  children: [
    {
      name: "src",
      children: [
        {
          name: "components",
          children: [
            { name: "Button.tsx", value: 1800 },
            { name: "Modal.tsx", value: 3200 },
            { name: "Navbar.tsx", value: 2600 },
            { name: "Sidebar.tsx", value: 2100 }
          ]
        },
        {
          name: "hooks",
          children: [
            { name: "useAuth.ts", value: 1400 },
            { name: "useFetch.ts", value: 900 }
          ]
        },
        {
          name: "utils",
          children: [
            { name: "format.ts", value: 700 },
            { name: "validate.ts", value: 1100 },
            { name: "constants.ts", value: 400 }
          ]
        },
        { name: "App.tsx", value: 2400 },
        { name: "main.tsx", value: 300 }
      ]
    },
    {
      name: "tests",
      children: [
        { name: "components.test.ts", value: 2200 },
        { name: "hooks.test.ts", value: 1500 },
        { name: "utils.test.ts", value: 900 }
      ]
    },
    {
      name: "public",
      children: [
        { name: "favicon.ico", value: 1500 },
        { name: "logo.svg", value: 2600 },
        { name: "og-image.png", value: 8200 }
      ]
    },
    {
      name: "docs",
      children: [
        { name: "README.md", value: 3400 },
        { name: "CONTRIBUTING.md", value: 1900 }
      ]
    },
    { name: "package.json", value: 1100 },
    { name: "tsconfig.json", value: 600 }
  ]
};
function ne({
  data: d = Q,
  width: u = 500,
  height: o = 500,
  className: P
}) {
  const A = T(null), M = T(null), [x, c] = _({ visible: !1, x: 0, y: 0, name: "", value: 0 });
  return $(() => {
    const f = A.current, k = M.current;
    if (!f || !k) return;
    const h = r.select(f);
    h.selectAll("*").remove();
    const g = Math.min(u, o) / 2, v = r.hierarchy(d).sum((e) => e.value ?? 0).sort((e, t) => (t.value ?? 0) - (e.value ?? 0));
    r.partition().size([2 * Math.PI, g])(v), v.each((e) => {
      e.current = { x0: e.x0, x1: e.x1, y0: e.y0, y1: e.y1 };
    });
    const y = r.scaleOrdinal(r.schemeTableau10), R = r.arc().startAngle((e) => e.x0).endAngle((e) => e.x1).padAngle((e) => Math.min((e.x1 - e.x0) / 2, 5e-3)).padRadius(g / 2).innerRadius((e) => Math.sqrt(e.y0)).outerRadius((e) => Math.sqrt(e.y1) - 1), b = h.attr("viewBox", `${-u / 2} ${-o / 2} ${u} ${o}`).attr("width", "100%").attr("height", "100%").append("g");
    let l = v;
    const a = v.descendants().filter((e) => e.depth), s = b.append("g").selectAll("path").data(a).join("path").attr("fill", (e) => {
      let t = e;
      for (; t.depth > 1 && t.parent; ) t = t.parent;
      return y(t.data.name);
    }).attr("fill-opacity", (e) => m(e.current) ? e.children ? 0.85 : 0.65 : 0).attr("pointer-events", (e) => m(e.current) ? "auto" : "none").attr("d", (e) => R(e.current) ?? "").style("cursor", "pointer");
    s.on("mouseenter", function(e, t) {
      r.select(this).attr("fill-opacity", t.children ? 1 : 0.85);
      const [p, S] = r.pointer(e, k);
      c({ visible: !0, x: p, y: S, name: t.data.name, value: t.value ?? 0 });
    }).on("mousemove", (e) => {
      const [t, p] = r.pointer(e, k);
      c((S) => S.visible ? { ...S, x: t, y: p } : S);
    }).on("mouseleave", function(e, t) {
      r.select(this).attr("fill-opacity", m(t.current) ? t.children ? 0.85 : 0.65 : 0), c((p) => ({ ...p, visible: !1 }));
    }).on("click", (e, t) => I(t));
    const n = b.append("g").attr("pointer-events", "none").attr("text-anchor", "middle").style("user-select", "none").selectAll("text").data(a).join("text").attr("fill", "currentColor").attr("font-size", 10).attr("font-family", "ui-sans-serif, system-ui, sans-serif").attr("dy", "0.35em").attr("fill-opacity", (e) => +C(e.current)).attr("transform", (e) => j(e.current)).text((e) => e.data.name);
    b.append("circle").datum(v).attr("r", g / 6).attr("fill", "none").attr("pointer-events", "all").style("cursor", "pointer").on("click", (e, t) => I(t));
    function m(e) {
      return e.y1 <= g * g && e.y0 >= 0 && e.x1 > e.x0;
    }
    function C(e) {
      return e.y1 <= g * g && e.y0 >= 0 && (e.y1 - e.y0) * (e.x1 - e.x0) > 0.03;
    }
    function j(e) {
      const t = (Math.sqrt(e.y0) + Math.sqrt(e.y1)) / 2, p = (e.x0 + e.x1) / 2 * (180 / Math.PI);
      return `rotate(${p - 90}) translate(${t},0) rotate(${p < 180 ? 0 : 180})`;
    }
    function I(e) {
      l = l === e ? e.parent ?? v : e, v.each((t) => {
        const p = t;
        p.target = {
          x0: Math.max(0, Math.min(1, (p.x0 - l.x0) / (l.x1 - l.x0))) * 2 * Math.PI,
          x1: Math.max(0, Math.min(1, (p.x1 - l.x0) / (l.x1 - l.x0))) * 2 * Math.PI,
          y0: Math.max(0, p.y0 - l.y0),
          y1: Math.max(0, p.y1 - l.y0)
        };
      }), s.transition().duration(650).tween("data", (t) => {
        const p = r.interpolate(t.current, t.target);
        return (S) => {
          t.current = p(S);
        };
      }).filter(function(t) {
        return !!(+this.getAttribute("fill-opacity") || m(t.target));
      }).attr("fill-opacity", (t) => m(t.target) ? t.children ? 0.85 : 0.65 : 0).attr("pointer-events", (t) => m(t.target) ? "auto" : "none").attrTween("d", (t) => () => R(t.current) ?? ""), n.filter(function(t) {
        return !!(+this.getAttribute("fill-opacity") || C(t.target));
      }).transition().duration(650).attr("fill-opacity", (t) => +C(t.target)).attrTween("transform", (t) => () => j(t.current)), c((t) => ({ ...t, visible: !1 }));
    }
    return () => {
      h.selectAll("*").remove();
    };
  }, [d, u, o]), /* @__PURE__ */ H("div", { ref: M, className: `relative ${P ?? ""}`, children: [
    /* @__PURE__ */ w("svg", { ref: A, role: "img", "aria-label": "Zoomable sunburst chart", className: "w-full h-auto" }),
    x.visible && /* @__PURE__ */ H(
      "div",
      {
        className: "pointer-events-none absolute z-10 rounded-md bg-slate-900/90 px-2 py-1 text-xs text-white shadow-lg dark:bg-slate-100/90 dark:text-slate-900",
        style: { left: x.x + 12, top: x.y + 12 },
        children: [
          /* @__PURE__ */ w("div", { className: "font-medium", children: x.name }),
          /* @__PURE__ */ w("div", { className: "opacity-80", children: x.value.toLocaleString() })
        ]
      }
    )
  ] });
}
const X = [
  "North America",
  "Europe",
  "Asia-Pacific",
  "South America",
  "Africa"
], Y = [
  [0, 42, 68, 15, 9],
  [38, 0, 51, 12, 18],
  [72, 46, 0, 21, 14],
  [17, 10, 19, 0, 6],
  [8, 16, 11, 5, 0]
];
function le({
  data: d = Y,
  labels: u = X,
  width: o = 520,
  height: P = 520,
  className: A
}) {
  const M = T(null);
  return $(() => {
    const x = M.current;
    if (!x) return;
    const c = r.select(x);
    c.selectAll("*").remove();
    const f = Math.min(o, P) * 0.5 - 60, k = f - 16, h = r.scaleOrdinal().domain(u).range(r.schemeTableau10), v = r.chord().padAngle(0.05).sortSubgroups(r.descending)(d), y = r.arc().innerRadius(k).outerRadius(f), R = r.ribbon().radius(k), b = c.attr("viewBox", `${-o / 2} ${-P / 2} ${o} ${P}`).attr("width", "100%").attr("height", "100%").append("g"), l = b.append("g").attr("fill-opacity", 0.75).selectAll("path").data(v).join("path").attr("d", R).attr("fill", (n) => h(u[n.target.index])).attr("stroke", "rgba(0,0,0,0.15)").style("cursor", "pointer"), a = b.append("g").selectAll("g").data(v.groups).join("g");
    a.append("path").attr("d", y).attr("fill", (n) => h(u[n.index])).attr("stroke", "rgba(0,0,0,0.2)").style("cursor", "pointer"), a.append("text").each((n) => {
      n.angle = (n.startAngle + n.endAngle) / 2;
    }).attr("dy", "0.35em").attr("transform", (n) => {
      const m = n.angle, C = m > Math.PI;
      return `rotate(${m * 180 / Math.PI - 90}) translate(${f + 8}) ${C ? "rotate(180)" : ""}`;
    }).attr("text-anchor", (n) => n.angle > Math.PI ? "end" : "start").attr("font-size", 12).attr("font-family", "ui-sans-serif, system-ui, sans-serif").attr("fill", "currentColor").text((n) => u[n.index]);
    function s(n) {
      l.transition().duration(150).attr("fill-opacity", (m) => n === null || m.source.index === n || m.target.index === n ? 0.85 : 0.08), a.selectAll("path").transition().duration(150).attr("opacity", (m) => n === null || m.index === n ? 1 : 0.35);
    }
    return a.on("mouseenter", (n, m) => s(m.index)).on("mouseleave", () => s(null)), l.on("mouseenter", (n, m) => s(m.source.index)).on("mouseleave", () => s(null)), () => {
      c.selectAll("*").remove();
    };
  }, [d, u, o, P]), /* @__PURE__ */ w("svg", { ref: M, className: A, role: "img", "aria-label": "Chord diagram" });
}
const ee = {
  frames: [
    {
      date: "2016",
      values: [
        { name: "JavaScript", value: 320 },
        { name: "Java", value: 290 },
        { name: "Python", value: 180 },
        { name: "PHP", value: 210 },
        { name: "C#", value: 195 },
        { name: "TypeScript", value: 40 },
        { name: "Go", value: 25 },
        { name: "Rust", value: 8 }
      ]
    },
    {
      date: "2017",
      values: [
        { name: "JavaScript", value: 355 },
        { name: "Java", value: 300 },
        { name: "Python", value: 215 },
        { name: "PHP", value: 205 },
        { name: "C#", value: 200 },
        { name: "TypeScript", value: 62 },
        { name: "Go", value: 34 },
        { name: "Rust", value: 12 }
      ]
    },
    {
      date: "2018",
      values: [
        { name: "JavaScript", value: 385 },
        { name: "Java", value: 305 },
        { name: "Python", value: 260 },
        { name: "PHP", value: 195 },
        { name: "C#", value: 205 },
        { name: "TypeScript", value: 95 },
        { name: "Go", value: 46 },
        { name: "Rust", value: 18 }
      ]
    },
    {
      date: "2019",
      values: [
        { name: "JavaScript", value: 410 },
        { name: "Java", value: 300 },
        { name: "Python", value: 300 },
        { name: "PHP", value: 180 },
        { name: "C#", value: 210 },
        { name: "TypeScript", value: 140 },
        { name: "Go", value: 60 },
        { name: "Rust", value: 26 }
      ]
    },
    {
      date: "2020",
      values: [
        { name: "JavaScript", value: 430 },
        { name: "Python", value: 340 },
        { name: "Java", value: 295 },
        { name: "C#", value: 215 },
        { name: "PHP", value: 165 },
        { name: "TypeScript", value: 190 },
        { name: "Go", value: 78 },
        { name: "Rust", value: 38 }
      ]
    },
    {
      date: "2021",
      values: [
        { name: "JavaScript", value: 445 },
        { name: "Python", value: 375 },
        { name: "Java", value: 285 },
        { name: "TypeScript", value: 250 },
        { name: "C#", value: 218 },
        { name: "PHP", value: 150 },
        { name: "Go", value: 96 },
        { name: "Rust", value: 55 }
      ]
    },
    {
      date: "2022",
      values: [
        { name: "JavaScript", value: 450 },
        { name: "Python", value: 405 },
        { name: "TypeScript", value: 310 },
        { name: "Java", value: 270 },
        { name: "C#", value: 220 },
        { name: "PHP", value: 132 },
        { name: "Go", value: 118 },
        { name: "Rust", value: 80 }
      ]
    },
    {
      date: "2023",
      values: [
        { name: "Python", value: 440 },
        { name: "JavaScript", value: 448 },
        { name: "TypeScript", value: 365 },
        { name: "Java", value: 255 },
        { name: "C#", value: 222 },
        { name: "Go", value: 142 },
        { name: "PHP", value: 118 },
        { name: "Rust", value: 108 }
      ]
    }
  ]
};
function se({
  data: d = ee,
  topN: u = 8,
  frameDuration: o = 900,
  width: P = 640,
  height: A = 420,
  className: M
}) {
  var b;
  const x = T(null), c = T(null), [f, k] = _(0), [h, g] = _(!1), v = T(f);
  v.current = f;
  const y = d.frames.length;
  $(() => {
    k(0), g(!1);
  }, [d]), $(() => {
    const l = x.current;
    if (!l || y === 0) return;
    const a = r.select(l);
    a.selectAll("*").remove();
    const s = { top: 28, right: 90, bottom: 8, left: 130 }, n = Math.max(0, P - s.left - s.right), C = Math.max(0, A - s.top - s.bottom) / u, j = C * 0.72, I = Array.from(new Set(d.frames.flatMap((O) => O.values.map((J) => J.name)))), e = r.scaleOrdinal().domain(I).range(r.schemeTableau10), t = a.attr("viewBox", `0 0 ${P} ${A}`).attr("width", "100%").attr("height", "100%").append("g").attr("transform", `translate(${s.left},${s.top})`), p = t.append("g").attr("class", "x-axis").attr("color", "currentColor").style("opacity", 0.5), S = t.append("g").attr("class", "bars");
    function q(O) {
      const J = d.frames[O];
      if (!J) return;
      const E = [...J.values].sort((i, G) => G.value - i.value).slice(0, u), F = new Map(E.map((i, G) => [i.name, G])), K = r.max(E, (i) => i.value) ?? 1, L = r.scaleLinear().domain([0, K]).nice().range([0, n]), U = r.axisTop(L).ticks(Math.max(2, n / 90));
      p.transition().duration(o).call(U);
      const z = S.selectAll("g.bar").data(E, (i) => i.name), N = z.enter().append("g").attr("class", "bar").attr("transform", (i) => `translate(0, ${(F.get(i.name) ?? u) * C})`);
      N.append("rect").attr("height", j).attr("width", 0).attr("rx", 3), N.append("text").attr("class", "name-label").attr("x", -8).attr("y", j / 2).attr("dy", "0.35em").attr("text-anchor", "end").attr("font-size", 12).attr("font-family", "ui-sans-serif, system-ui, sans-serif").attr("fill", "currentColor"), N.append("text").attr("class", "value-label").attr("y", j / 2).attr("dy", "0.35em").attr("x", 8).attr("font-size", 12).attr("font-family", "ui-sans-serif, system-ui, sans-serif").attr("fill", "currentColor");
      const B = N.merge(z);
      B.transition().duration(o).ease(r.easeCubicInOut).attr("transform", (i) => `translate(0, ${(F.get(i.name) ?? u) * C})`), B.select("rect").attr("fill", (i) => e(i.name)).transition().duration(o).ease(r.easeCubicInOut).attr("width", (i) => Math.max(0, L(i.value))), B.select("text.name-label").text((i) => i.name), B.select("text.value-label").transition().duration(o).ease(r.easeCubicInOut).attr("x", (i) => L(i.value) + 8).textTween(function(i) {
        var V;
        const G = Number((V = this.textContent) == null ? void 0 : V.replace(/,/g, "")) || 0, W = r.interpolateNumber(G, i.value);
        return (Z) => Math.round(W(Z)).toLocaleString();
      }), z.exit().transition().duration(o).ease(r.easeCubicInOut).attr("transform", "translate(0, -40)").style("opacity", 0).remove();
    }
    return q(v.current), c.current = q, () => {
      c.current = null, a.selectAll("*").remove();
    };
  }, [d, P, A, u, y, o]), $(() => {
    var l;
    (l = c.current) == null || l.call(c, f);
  }, [f]), $(() => {
    if (!h) return;
    const l = window.setInterval(() => {
      k((a) => a >= y - 1 ? (g(!1), a) : a + 1);
    }, o);
    return () => window.clearInterval(l);
  }, [h, y, o]);
  const R = ((b = d.frames[f]) == null ? void 0 : b.date) ?? "";
  return /* @__PURE__ */ H("div", { className: M, children: [
    /* @__PURE__ */ H("div", { className: "mb-3 flex items-center gap-3", children: [
      /* @__PURE__ */ w(
        "button",
        {
          type: "button",
          onClick: () => g((l) => !l),
          className: "inline-flex items-center justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400",
          "aria-label": h ? "Pause" : "Play",
          children: h ? "Pause" : "Play"
        }
      ),
      /* @__PURE__ */ w(
        "input",
        {
          type: "range",
          min: 0,
          max: Math.max(0, y - 1),
          value: f,
          onChange: (l) => {
            g(!1), k(Number(l.target.value));
          },
          className: "h-1.5 flex-1 cursor-pointer accent-indigo-600",
          "aria-label": "Scrub through time"
        }
      ),
      /* @__PURE__ */ w("span", { className: "w-16 shrink-0 text-right text-sm font-semibold tabular-nums text-slate-600 dark:text-slate-300", children: R })
    ] }),
    /* @__PURE__ */ w("svg", { ref: x, role: "img", "aria-label": "Animated bar chart race", className: "w-full h-auto" })
  ] });
}
export {
  se as AnimatedBarRace,
  se as BarRace,
  le as Chord,
  le as ChordDiagram,
  re as ForceGraph,
  re as ForceGraphChart,
  ne as Sunburst,
  ne as SunburstChart,
  ee as sampleBarRaceData,
  X as sampleChordLabels,
  Y as sampleChordMatrix,
  D as sampleForceGraphData,
  Q as sampleSunburstData
};
//# sourceMappingURL=d3-gallery.js.map
