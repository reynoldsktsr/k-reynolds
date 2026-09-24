import { useEffect as e, useMemo as t, useRef as n, useState as r } from "react";
import * as i from "matter-js";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/PhysicsPlayground.tsx
var s = 80, c = "pp-shape", l = "pp-wall", u = [
	"#38bdf8",
	"#f472b6",
	"#facc15",
	"#4ade80",
	"#a78bfa",
	"#fb923c",
	"#2dd4bf"
];
function d() {
	return typeof window > "u" || !window.matchMedia ? !1 : window.matchMedia("(prefers-color-scheme: dark)").matches;
}
function f(e, t) {
	return e + Math.random() * (t - e);
}
function p() {
	return u[Math.floor(Math.random() * u.length)];
}
function m(e) {
	switch (e) {
		case "down": return {
			x: 0,
			y: 1
		};
		case "up": return {
			x: 0,
			y: -1
		};
		default: return {
			x: 0,
			y: 0
		};
	}
}
function h(e) {
	return e === "down" ? "up" : e === "up" ? "off" : "down";
}
function g(e, t, n) {
	let r = {
		isStatic: !0,
		label: l,
		friction: .5,
		render: {
			fillStyle: n,
			strokeStyle: "transparent"
		}
	}, a = s / 2;
	return [
		i.Bodies.rectangle(e / 2, t + a, e + 160, s, r),
		i.Bodies.rectangle(e / 2, -40, e + 160, s, r),
		i.Bodies.rectangle(-40, t / 2, s, t + 160, r),
		i.Bodies.rectangle(e + a, t / 2, s, t + 160, r)
	];
}
function _(e, t, n, r) {
	let a = {
		label: c,
		restitution: Math.min(1, Math.max(0, r)),
		friction: .05,
		frictionAir: .012,
		density: .0018,
		render: {
			fillStyle: p(),
			strokeStyle: "rgba(15, 23, 42, 0.25)",
			lineWidth: 1.5
		}
	};
	if (e === "circle") {
		let e = f(16, 40);
		return i.Bodies.circle(t, n, e, a, 24);
	}
	if (e === "box") {
		let e = f(32, 76), r = f(32, 76);
		return i.Bodies.rectangle(t, n, e, r, a);
	}
	let o = [
		3,
		5,
		6
	][Math.floor(Math.random() * 3)], s = f(20, 40);
	return i.Bodies.polygon(t, n, o, s, a);
}
function v({ className: s, height: l = "100%", background: u, initialGravity: p = "down", initialRestitution: v = .6, initialBodyCount: y = 10, showToolbar: b = !0 }) {
	let x = n(null), S = n(null), C = n(null), w = n([]), T = n({
		width: 0,
		height: 0
	}), [E, D] = r(p), [O, k] = r(v), [A, j] = r("circle"), M = n(O), N = n(A);
	M.current = O, N.current = A;
	let P = t(() => u || (d() ? "rgba(148, 163, 184, 0.12)" : "rgba(15, 23, 42, 0.06)"), [u]);
	e(() => {
		let e = x.current, t = S.current;
		if (!e || !t) return;
		let n = e.getBoundingClientRect(), r = Math.max(1, Math.round(n.width)), a = Math.max(1, Math.round(n.height));
		T.current = {
			width: r,
			height: a
		};
		let o = d(), s = u ?? (o ? "#0b1120" : "#f1f5f9"), c = i.Engine.create();
		c.gravity.x = m(p).x, c.gravity.y = m(p).y, C.current = c;
		let l = i.Render.create({
			canvas: t,
			engine: c,
			options: {
				width: r,
				height: a,
				background: s,
				wireframes: !1,
				pixelRatio: window.devicePixelRatio || 1,
				showAngleIndicator: !1
			}
		}), h = g(r, a, P);
		w.current = h, i.Composite.add(c.world, h);
		let v = [];
		for (let e = 0; e < y; e++) {
			let e = [
				"circle",
				"box",
				"polygon"
			], t = e[Math.floor(Math.random() * e.length)], n = f(r * .15, r * .85), i = f(-a * .6, a * .3);
			v.push(_(t, n, i, M.current));
		}
		i.Composite.add(c.world, v);
		let b = i.Mouse.create(t);
		b.pixelRatio = window.devicePixelRatio || 1;
		let E = i.MouseConstraint.create(c, {
			mouse: b,
			constraint: {
				stiffness: .2,
				damping: .1,
				render: { visible: !1 }
			}
		});
		i.Composite.add(c.world, E), l.mouse = b;
		let D = i.Runner.create();
		i.Runner.run(D, c), i.Render.run(l);
		let O = null, k = (e, n) => {
			let r = t.getBoundingClientRect();
			return {
				x: e - r.left,
				y: n - r.top
			};
		}, A = (e) => {
			let { x: t, y: n } = k(e.clientX, e.clientY), r = i.Composite.allBodies(c.world).filter((e) => !e.isStatic), a = i.Query.point(r, {
				x: t,
				y: n
			}).length > 0;
			O = {
				x: e.clientX,
				y: e.clientY,
				hitBody: a,
				worldX: t,
				worldY: n
			};
		}, j = (e) => {
			if (!O) return;
			let t = Math.hypot(e.clientX - O.x, e.clientY - O.y);
			if (!O.hitBody && t < 6) {
				let e = _(N.current, O.worldX, O.worldY, M.current);
				i.Composite.add(c.world, e);
			}
			O = null;
		};
		t.addEventListener("pointerdown", A), window.addEventListener("pointerup", j);
		let F = new ResizeObserver((e) => {
			let t = e[0];
			if (!t) return;
			let { width: n, height: r } = t.contentRect, a = Math.max(1, Math.round(n)), o = Math.max(1, Math.round(r));
			if (a === T.current.width && o === T.current.height) return;
			T.current = {
				width: a,
				height: o
			}, i.Render.setPixelRatio(l, window.devicePixelRatio || 1), i.Render.setSize(l, a, o), i.Composite.remove(c.world, w.current);
			let s = g(a, o, P);
			w.current = s, i.Composite.add(c.world, s);
		});
		return F.observe(e), () => {
			F.disconnect(), t.removeEventListener("pointerdown", A), window.removeEventListener("pointerup", j), i.Render.stop(l), i.Runner.stop(D), i.Composite.remove(c.world, E), i.Mouse.clearSourceEvents(b), i.World.clear(c.world, !1), i.Engine.clear(c), C.current = null, w.current = [];
		};
	}, []), e(() => {
		let e = C.current;
		if (!e) return;
		let t = m(E);
		e.gravity.x = t.x, e.gravity.y = t.y;
	}, [E]);
	let F = (e) => {
		j(e);
		let t = C.current;
		if (!t) return;
		let { width: n, height: r } = T.current, a = _(e, f(n * .2, n * .8), f(r * .05, r * .25), M.current);
		i.Composite.add(t.world, a);
	}, I = () => {
		let e = C.current;
		if (!e) return;
		let t = i.Composite.allBodies(e.world).filter((e) => e.label === c);
		i.Composite.remove(e.world, t);
	}, L = E === "down" ? "Gravity: Down ↓" : E === "up" ? "Gravity: Up ↑" : "Gravity: Off ○";
	return /* @__PURE__ */ o("div", {
		className: ["relative flex flex-col gap-3", s].filter(Boolean).join(" "),
		style: { height: l },
		children: [b && /* @__PURE__ */ o("div", {
			className: "flex flex-wrap items-center gap-2 rounded-lg border border-slate-200 bg-white/80 p-2.5 text-sm shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/80",
			children: [
				/* @__PURE__ */ o("div", {
					className: "flex items-center gap-1.5",
					children: [
						/* @__PURE__ */ a("span", {
							className: "mr-1 text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400",
							children: "Spawn"
						}),
						/* @__PURE__ */ a("button", {
							type: "button",
							onClick: () => F("circle"),
							className: `rounded-md border px-3 py-1.5 font-medium transition-colors ${A === "circle" ? "border-slate-900 bg-slate-900 text-white dark:border-slate-100 dark:bg-slate-100 dark:text-slate-900" : "border-slate-300 text-slate-700 hover:border-slate-400 dark:border-slate-600 dark:text-slate-200 dark:hover:border-slate-500"}`,
							children: "○ Circle"
						}),
						/* @__PURE__ */ a("button", {
							type: "button",
							onClick: () => F("box"),
							className: `rounded-md border px-3 py-1.5 font-medium transition-colors ${A === "box" ? "border-slate-900 bg-slate-900 text-white dark:border-slate-100 dark:bg-slate-100 dark:text-slate-900" : "border-slate-300 text-slate-700 hover:border-slate-400 dark:border-slate-600 dark:text-slate-200 dark:hover:border-slate-500"}`,
							children: "▢ Box"
						}),
						/* @__PURE__ */ a("button", {
							type: "button",
							onClick: () => F("polygon"),
							className: `rounded-md border px-3 py-1.5 font-medium transition-colors ${A === "polygon" ? "border-slate-900 bg-slate-900 text-white dark:border-slate-100 dark:bg-slate-100 dark:text-slate-900" : "border-slate-300 text-slate-700 hover:border-slate-400 dark:border-slate-600 dark:text-slate-200 dark:hover:border-slate-500"}`,
							children: "△ Polygon"
						})
					]
				}),
				/* @__PURE__ */ a("div", { className: "mx-1 h-6 w-px bg-slate-200 dark:bg-slate-700" }),
				/* @__PURE__ */ a("button", {
					type: "button",
					onClick: () => D((e) => h(e)),
					className: "rounded-md border border-slate-300 px-3 py-1.5 font-medium text-slate-700 transition-colors hover:border-slate-400 dark:border-slate-600 dark:text-slate-200 dark:hover:border-slate-500",
					children: L
				}),
				/* @__PURE__ */ o("label", {
					className: "flex items-center gap-2 px-1 text-xs text-slate-600 dark:text-slate-300",
					children: [
						"Bounciness",
						/* @__PURE__ */ a("input", {
							type: "range",
							min: 0,
							max: 1,
							step: .05,
							value: O,
							onChange: (e) => k(Number(e.target.value)),
							className: "h-1.5 w-24 cursor-pointer accent-slate-900 dark:accent-slate-100"
						}),
						/* @__PURE__ */ a("span", {
							className: "w-8 tabular-nums text-right",
							children: O.toFixed(2)
						})
					]
				}),
				/* @__PURE__ */ a("div", { className: "mx-1 h-6 w-px bg-slate-200 dark:bg-slate-700" }),
				/* @__PURE__ */ a("button", {
					type: "button",
					onClick: I,
					className: "rounded-md border border-rose-300 px-3 py-1.5 font-medium text-rose-600 transition-colors hover:border-rose-400 hover:bg-rose-50 dark:border-rose-800 dark:text-rose-400 dark:hover:bg-rose-950/40",
					children: "Clear all"
				})
			]
		}), /* @__PURE__ */ a("div", {
			ref: x,
			className: "relative min-h-0 flex-1 overflow-hidden rounded-lg",
			children: /* @__PURE__ */ a("canvas", {
				ref: S,
				className: "block h-full w-full touch-none"
			})
		})]
	});
}
//#endregion
export { v as PhysicsPlayground, v as default };
