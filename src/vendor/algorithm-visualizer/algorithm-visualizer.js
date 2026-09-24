import { useCallback as e, useEffect as t, useMemo as n, useRef as r, useState as i } from "react";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/sorting/algorithms.ts
var s = [
	{
		id: "bubble",
		label: "Bubble Sort"
	},
	{
		id: "selection",
		label: "Selection Sort"
	},
	{
		id: "insertion",
		label: "Insertion Sort"
	},
	{
		id: "merge",
		label: "Merge Sort"
	},
	{
		id: "quick",
		label: "Quick Sort"
	}
];
function c(e, t, n) {
	let r = e[t];
	e[t] = e[n], e[n] = r;
}
function* l(e) {
	let t = e.slice(), n = t.length, r = n - 1;
	for (let e = 0; e < n - 1; e++) {
		let i = !1;
		for (let r = 0; r < n - 1 - e; r++) yield {
			kind: "compare",
			indices: [r, r + 1]
		}, t[r] > t[r + 1] && (c(t, r, r + 1), yield {
			kind: "swap",
			indices: [r, r + 1]
		}, i = !0);
		if (yield {
			kind: "sorted",
			indices: [n - 1 - e]
		}, r = n - 2 - e, !i) break;
	}
	let i = [];
	for (let e = 0; e <= r; e++) i.push(e);
	i.length > 0 && (yield {
		kind: "sorted",
		indices: i
	});
}
function* u(e) {
	let t = e.slice(), n = t.length;
	for (let e = 0; e < n - 1; e++) {
		let r = e;
		for (let i = e + 1; i < n; i++) yield {
			kind: "compare",
			indices: [r, i]
		}, t[i] < t[r] && (r = i);
		r !== e && (c(t, e, r), yield {
			kind: "swap",
			indices: [e, r]
		}), yield {
			kind: "sorted",
			indices: [e]
		};
	}
	yield {
		kind: "sorted",
		indices: [n - 1]
	};
}
function* d(e) {
	let t = e.slice(), n = t.length;
	n > 0 && (yield {
		kind: "sorted",
		indices: [0]
	});
	for (let e = 1; e < n; e++) {
		let n = e;
		for (; n > 0 && (yield {
			kind: "compare",
			indices: [n - 1, n]
		}, t[n - 1] > t[n]);) c(t, n - 1, n), yield {
			kind: "swap",
			indices: [n - 1, n]
		}, n--;
		yield {
			kind: "sorted",
			indices: Array.from({ length: e + 1 }, (e, t) => t)
		};
	}
}
function* f(e, t, n, r) {
	let i = e.slice(t, n + 1), a = e.slice(n + 1, r + 1), o = 0, s = 0, c = t;
	for (; o < i.length && s < a.length;) yield {
		kind: "compare",
		indices: [t + o, n + 1 + s]
	}, i[o] <= a[s] ? (e[c] = i[o], yield {
		kind: "overwrite",
		index: c,
		value: i[o]
	}, o++) : (e[c] = a[s], yield {
		kind: "overwrite",
		index: c,
		value: a[s]
	}, s++), c++;
	for (; o < i.length;) e[c] = i[o], yield {
		kind: "overwrite",
		index: c,
		value: i[o]
	}, o++, c++;
	for (; s < a.length;) e[c] = a[s], yield {
		kind: "overwrite",
		index: c,
		value: a[s]
	}, s++, c++;
	yield {
		kind: "sorted",
		indices: Array.from({ length: r - t + 1 }, (e, n) => t + n)
	};
}
function* p(e, t, n) {
	if (t >= n) {
		t === n && (yield {
			kind: "sorted",
			indices: [t]
		});
		return;
	}
	let r = Math.floor((t + n) / 2);
	yield* p(e, t, r), yield* p(e, r + 1, n), yield* f(e, t, r, n);
}
function* m(e) {
	let t = e.slice();
	t.length !== 0 && (yield* p(t, 0, t.length - 1));
}
function* h(e, t, n) {
	let r = e[n], i = t;
	for (let a = t; a < n; a++) yield {
		kind: "compare",
		indices: [a, n]
	}, e[a] < r && (i !== a && (c(e, i, a), yield {
		kind: "swap",
		indices: [i, a]
	}), i++);
	return i !== n && (c(e, i, n), yield {
		kind: "swap",
		indices: [i, n]
	}), i;
}
function* g(e, t, n) {
	if (t > n) return;
	if (t === n) {
		yield {
			kind: "sorted",
			indices: [t]
		};
		return;
	}
	let r = yield* h(e, t, n);
	yield {
		kind: "sorted",
		indices: [r]
	}, yield* g(e, t, r - 1), yield* g(e, r + 1, n);
}
function* _(e) {
	let t = e.slice();
	t.length !== 0 && (yield* g(t, 0, t.length - 1));
}
var v = {
	bubble: l,
	selection: u,
	insertion: d,
	merge: m,
	quick: _
}, y = 5, b = 120, x = 5, S = 100;
function C(e) {
	return Array.from({ length: e }, () => Math.floor(Math.random() * 96) + x);
}
function w(e) {
	return Math.round(400 - (Math.min(100, Math.max(1, e)) - 1) / 99 * 396);
}
var T = {
	comparing: [],
	swapping: []
};
function E({ className: n, initialSize: c = 40, initialAlgorithm: l = "bubble" }) {
	let [u, d] = i(l), [f, p] = i(() => Math.min(b, Math.max(y, c))), [m, h] = i(55), [g, _] = i(() => C(c)), [x, E] = i(g), [D, O] = i(T), [k, A] = i(/* @__PURE__ */ new Set()), [j, M] = i(!1), [N, P] = i(!1), F = r([]), I = r(0), L = r([]), R = r(null), z = r(m);
	z.current = m;
	let B = e((e, t) => {
		R.current !== null && (clearTimeout(R.current), R.current = null), F.current = Array.from(v[t](e)), I.current = 0, L.current = e.slice(), E(e.slice()), O(T), A(/* @__PURE__ */ new Set()), M(!1), P(e.length <= 1);
	}, []);
	t(() => {
		B(g, u);
	}, [
		g,
		u,
		B
	]);
	let V = e(() => {
		let e = F.current, t = I.current;
		if (t >= e.length) return !1;
		let n = e[t];
		if (I.current = t + 1, n.kind === "compare") O({
			comparing: n.indices,
			swapping: []
		});
		else if (n.kind === "swap") {
			let [e, t] = n.indices, r = L.current, i = r[e];
			r[e] = r[t], r[t] = i, E(r.slice()), O({
				comparing: [],
				swapping: n.indices
			});
		} else if (n.kind === "overwrite") {
			let e = L.current;
			e[n.index] = n.value, E(e.slice()), O({
				comparing: [],
				swapping: [n.index]
			});
		} else n.kind === "sorted" && A((e) => {
			let t = new Set(e);
			for (let e of n.indices) t.add(e);
			return t;
		});
		return I.current >= e.length && (P(!0), O(T)), !0;
	}, []);
	t(() => {
		if (!j) return;
		let e = () => {
			if (!V()) {
				M(!1);
				return;
			}
			R.current = setTimeout(e, w(z.current));
		};
		return R.current = setTimeout(e, w(z.current)), () => {
			R.current !== null && (clearTimeout(R.current), R.current = null);
		};
	}, [j, V]);
	let H = e(() => {
		_(C(f));
	}, [f]), U = e((e) => {
		p(e), _(C(e));
	}, []), W = e((e) => {
		d(e);
	}, []), G = e(() => {
		N || M((e) => !e);
	}, [N]), K = e(() => {
		j && M(!1), V();
	}, [j, V]);
	return /* @__PURE__ */ o("div", {
		className: `flex w-full flex-col gap-4 ${n ?? ""}`,
		children: [/* @__PURE__ */ o("div", {
			className: "flex flex-wrap items-end gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800",
			children: [
				/* @__PURE__ */ o("label", {
					className: "flex flex-col gap-1 text-sm text-slate-600 dark:text-slate-300",
					children: ["Algorithm", /* @__PURE__ */ a("select", {
						value: u,
						onChange: (e) => W(e.target.value),
						className: "rounded border border-slate-300 bg-white px-2 py-1.5 text-slate-900 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100",
						children: s.map((e) => /* @__PURE__ */ a("option", {
							value: e.id,
							children: e.label
						}, e.id))
					})]
				}),
				/* @__PURE__ */ o("label", {
					className: "flex flex-col gap-1 text-sm text-slate-600 dark:text-slate-300",
					children: [
						"Array size: ",
						f,
						/* @__PURE__ */ a("input", {
							type: "range",
							min: y,
							max: b,
							value: f,
							disabled: j,
							onChange: (e) => U(Number(e.target.value)),
							className: "w-40"
						})
					]
				}),
				/* @__PURE__ */ o("label", {
					className: "flex flex-col gap-1 text-sm text-slate-600 dark:text-slate-300",
					children: [
						"Speed: ",
						m,
						/* @__PURE__ */ a("input", {
							type: "range",
							min: 1,
							max: 100,
							value: m,
							onChange: (e) => h(Number(e.target.value)),
							className: "w-40"
						})
					]
				}),
				/* @__PURE__ */ a("button", {
					type: "button",
					onClick: H,
					disabled: j,
					className: "rounded border border-slate-300 px-4 py-1.5 text-sm font-medium text-slate-700 hover:border-slate-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:text-slate-200",
					children: "Shuffle"
				}),
				/* @__PURE__ */ a("button", {
					type: "button",
					onClick: G,
					disabled: N,
					className: "rounded bg-slate-900 px-4 py-1.5 text-sm font-medium text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-indigo-600 dark:hover:bg-indigo-500",
					children: j ? "Pause" : "Play"
				}),
				/* @__PURE__ */ a("button", {
					type: "button",
					onClick: K,
					disabled: N,
					className: "rounded border border-slate-300 px-4 py-1.5 text-sm font-medium text-slate-700 hover:border-slate-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:text-slate-200",
					children: "Step"
				})
			]
		}), /* @__PURE__ */ a("div", {
			className: "flex h-72 w-full items-end gap-px rounded-xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-700 dark:bg-slate-800",
			children: x.map((e, t) => {
				let n = D.comparing.includes(t), r = D.swapping.includes(t), i = k.has(t), o = "bg-slate-400 dark:bg-slate-500";
				return i && (o = "bg-emerald-500"), n && (o = "bg-amber-400"), r && (o = "bg-rose-500"), /* @__PURE__ */ a("div", {
					className: `min-w-[2px] flex-1 rounded-t transition-colors duration-75 ${o}`,
					style: { height: `${e / S * 100}%` },
					title: String(e)
				}, t);
			})
		})]
	});
}
//#endregion
//#region src/pathfinding/algorithms.ts
var D = [
	{
		id: "bfs",
		label: "Breadth-First Search"
	},
	{
		id: "dijkstra",
		label: "Dijkstra's Algorithm"
	},
	{
		id: "astar",
		label: "A* Search"
	}
];
function O(e, t) {
	return `${e},${t}`;
}
function k(e, t, n) {
	let r = [
		[-1, 0],
		[1, 0],
		[0, -1],
		[0, 1]
	], i = [];
	for (let [a, o] of r) {
		let r = e.row + a, s = e.col + o;
		r >= 0 && r < t && s >= 0 && s < n && i.push({
			row: r,
			col: s
		});
	}
	return i;
}
function A(e, t, n) {
	let r = O(t.row, t.col), i = O(n.row, n.col);
	if (r === i) return [t];
	if (!e.has(i)) return [];
	let a = [], o = i;
	for (; o !== void 0 && o !== r;) {
		let [t, n] = o.split(",").map(Number);
		a.push({
			row: t,
			col: n
		}), o = e.get(o);
	}
	return o === r ? (a.push(t), a.reverse(), a) : [];
}
function j(e, t, n, r, i) {
	let a = [], o = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Set([O(r.row, r.col)]), c = [r], l = 0;
	for (; l < c.length;) {
		let r = c[l++];
		if (a.push(r), r.row === i.row && r.col === i.col) break;
		for (let i of k(r, e, t)) {
			let e = O(i.row, i.col);
			s.has(e) || n.has(e) || (s.add(e), o.set(e, O(r.row, r.col)), c.push(i));
		}
	}
	return {
		visitedOrder: a,
		path: s.has(O(i.row, i.col)) ? A(o, r, i) : []
	};
}
function M(e, t) {
	let n = 0, r = t.get(O(e[0].row, e[0].col)) ?? Infinity;
	for (let i = 1; i < e.length; i++) {
		let a = t.get(O(e[i].row, e[i].col)) ?? Infinity;
		a < r && (r = a, n = i);
	}
	return e.splice(n, 1)[0];
}
function N(e, t, n, r, i) {
	let a = O(r.row, r.col), o = /* @__PURE__ */ new Map([[a, 0]]), s = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Set(), l = [], u = [r];
	for (; u.length > 0;) {
		let r = M(u, o), a = O(r.row, r.col);
		if (c.has(a)) continue;
		if (c.add(a), l.push(r), r.row === i.row && r.col === i.col) break;
		let d = o.get(a) ?? Infinity;
		for (let i of k(r, e, t)) {
			let e = O(i.row, i.col);
			if (c.has(e) || n.has(e)) continue;
			let t = d + 1;
			t < (o.get(e) ?? Infinity) && (o.set(e, t), s.set(e, a), u.push(i));
		}
	}
	return {
		visitedOrder: l,
		path: c.has(O(i.row, i.col)) ? A(s, r, i) : []
	};
}
function P(e, t) {
	return Math.abs(e.row - t.row) + Math.abs(e.col - t.col);
}
function F(e, t, n, r, i) {
	let a = O(r.row, r.col), o = /* @__PURE__ */ new Map([[a, 0]]), s = /* @__PURE__ */ new Map([[a, P(r, i)]]), c = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Set(), u = [], d = [r], f = /* @__PURE__ */ new Set([a]);
	for (; d.length > 0;) {
		let r = M(d, s), a = O(r.row, r.col);
		if (f.delete(a), l.has(a)) continue;
		if (l.add(a), u.push(r), r.row === i.row && r.col === i.col) break;
		let p = o.get(a) ?? Infinity;
		for (let u of k(r, e, t)) {
			let e = O(u.row, u.col);
			if (l.has(e) || n.has(e)) continue;
			let t = p + 1;
			t < (o.get(e) ?? Infinity) && (c.set(e, a), o.set(e, t), s.set(e, t + P(u, i)), f.has(e) || (d.push(u), f.add(e)));
		}
	}
	return {
		visitedOrder: u,
		path: l.has(O(i.row, i.col)) ? A(c, r, i) : []
	};
}
var I = {
	bfs: j,
	dijkstra: N,
	astar: F
};
function L(e) {
	return O(e.row, e.col);
}
//#endregion
//#region src/pathfinding/PathfindingVisualizer.tsx
var R = 8, z = 36;
function B(e) {
	return Math.round(120 - (Math.min(100, Math.max(1, e)) - 1) / 99 * 118);
}
function V(e) {
	return {
		row: Math.floor(e / 2),
		col: Math.max(0, Math.floor(e * .2))
	};
}
function H(e) {
	return {
		row: Math.floor(e / 2),
		col: Math.min(e - 1, Math.floor(e * .8))
	};
}
function U({ className: s, initialGridSize: c = 20, initialAlgorithm: l = "bfs" }) {
	let u = Math.min(z, Math.max(R, c)), [d, f] = i(u), [p, m] = i(l), [h, g] = i(65), [_, v] = i(/* @__PURE__ */ new Set()), [y, b] = i(() => V(u)), [x, S] = i(() => H(u)), [C, w] = i([]), [T, E] = i([]), [O, k] = i(!1), [A, j] = i(!1), [M, N] = i(!1), P = r(h);
	P.current = h;
	let F = r(null), U = r(!1), W = r(null), G = r(y), K = r(x);
	G.current = y, K.current = x, t(() => {
		let e = () => {
			U.current = !1, W.current = null;
		};
		return window.addEventListener("mouseup", e), () => window.removeEventListener("mouseup", e);
	}, []), t(() => () => {
		F.current !== null && clearTimeout(F.current);
	}, []);
	let q = e(() => {
		F.current !== null && (clearTimeout(F.current), F.current = null), w([]), E([]), j(!1), N(!1), k(!1);
	}, []), J = e((e) => {
		O || (f(e), b(V(e)), S(H(e)), v(/* @__PURE__ */ new Set()), q());
	}, [O, q]), Y = e(() => {
		O || (v(/* @__PURE__ */ new Set()), q());
	}, [O, q]), X = e(() => {
		O || q();
	}, [O, q]), Z = e(() => {
		if (O) return;
		F.current !== null && (clearTimeout(F.current), F.current = null), w([]), E([]), j(!1), N(!1), k(!0);
		let e = I[p](d, d, _, y, x), t = 0, n = () => {
			if (t >= e.visitedOrder.length) {
				r();
				return;
			}
			let i = Math.min(e.visitedOrder.length, t + 1);
			w(e.visitedOrder.slice(0, i)), t = i, F.current = setTimeout(n, B(P.current));
		}, r = () => {
			if (e.path.length === 0) {
				k(!1), j(!0), N(!0);
				return;
			}
			let t = 0, n = () => {
				if (t >= e.path.length) {
					k(!1), j(!0);
					return;
				}
				let r = Math.min(e.path.length, t + 1);
				E(e.path.slice(0, r)), t = r, F.current = setTimeout(n, B(P.current) * 2);
			};
			n();
		};
		n();
	}, [
		O,
		p,
		d,
		_,
		y,
		x
	]), Q = e((e, t) => {
		if (e.row === G.current.row && e.col === G.current.col || e.row === K.current.row && e.col === K.current.col) return;
		let n = L(e);
		v((e) => {
			if (e.has(n) === t) return e;
			let r = new Set(e);
			return t ? r.add(n) : r.delete(n), r;
		}), A && q();
	}, [A, q]), ee = e((e) => {
		if (!O) {
			if (U.current = !0, e.row === y.row && e.col === y.col) W.current = "start";
			else if (e.row === x.row && e.col === x.col) W.current = "end";
			else {
				let t = _.has(L(e));
				W.current = t ? "wall-erase" : "wall-add", Q(e, !t);
			}
		}
	}, [
		O,
		y,
		x,
		_,
		Q
	]), te = e((e) => {
		if (!U.current || O) return;
		let t = W.current, n = L(e);
		if (t === "start") {
			if (_.has(n) || e.row === x.row && e.col === x.col) return;
			b(e), A && q();
		} else if (t === "end") {
			if (_.has(n) || e.row === y.row && e.col === y.col) return;
			S(e), A && q();
		} else t === "wall-add" ? Q(e, !0) : t === "wall-erase" && Q(e, !1);
	}, [
		O,
		_,
		y,
		x,
		A,
		q,
		Q
	]), ne = n(() => new Set(C.map(L)), [C]), re = n(() => new Set(T.map(L)), [T]), $ = n(() => {
		let e = Math.floor(620 / d);
		return Math.min(30, Math.max(10, e));
	}, [d]), ie = n(() => Array.from({ length: d }, (e, t) => t), [d]), ae = n(() => Array.from({ length: d }, (e, t) => t), [d]);
	return /* @__PURE__ */ o("div", {
		className: `flex w-full flex-col gap-4 ${s ?? ""}`,
		children: [/* @__PURE__ */ o("div", {
			className: "flex flex-wrap items-end gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800",
			children: [
				/* @__PURE__ */ o("label", {
					className: "flex flex-col gap-1 text-sm text-slate-600 dark:text-slate-300",
					children: ["Algorithm", /* @__PURE__ */ a("select", {
						value: p,
						onChange: (e) => m(e.target.value),
						className: "rounded border border-slate-300 bg-white px-2 py-1.5 text-slate-900 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100",
						children: D.map((e) => /* @__PURE__ */ a("option", {
							value: e.id,
							children: e.label
						}, e.id))
					})]
				}),
				/* @__PURE__ */ o("label", {
					className: "flex flex-col gap-1 text-sm text-slate-600 dark:text-slate-300",
					children: [
						"Grid size: ",
						d,
						/* @__PURE__ */ a("input", {
							type: "range",
							min: R,
							max: z,
							value: d,
							disabled: O,
							onChange: (e) => J(Number(e.target.value)),
							className: "w-40"
						})
					]
				}),
				/* @__PURE__ */ o("label", {
					className: "flex flex-col gap-1 text-sm text-slate-600 dark:text-slate-300",
					children: [
						"Speed: ",
						h,
						/* @__PURE__ */ a("input", {
							type: "range",
							min: 1,
							max: 100,
							value: h,
							onChange: (e) => g(Number(e.target.value)),
							className: "w-40"
						})
					]
				}),
				/* @__PURE__ */ a("button", {
					type: "button",
					onClick: Y,
					disabled: O,
					className: "rounded border border-slate-300 px-4 py-1.5 text-sm font-medium text-slate-700 hover:border-slate-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:text-slate-200",
					children: "Clear walls"
				}),
				/* @__PURE__ */ a("button", {
					type: "button",
					onClick: X,
					disabled: O,
					className: "rounded border border-slate-300 px-4 py-1.5 text-sm font-medium text-slate-700 hover:border-slate-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:text-slate-200",
					children: "Clear path"
				}),
				/* @__PURE__ */ a("button", {
					type: "button",
					onClick: Z,
					disabled: O,
					className: "rounded bg-slate-900 px-4 py-1.5 text-sm font-medium text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-indigo-600 dark:hover:bg-indigo-500",
					children: O ? "Running…" : "Run"
				})
			]
		}), /* @__PURE__ */ o("div", {
			className: "flex flex-col items-center gap-2",
			children: [
				/* @__PURE__ */ a("div", {
					className: "grid touch-none select-none gap-px rounded-lg border border-slate-300 bg-slate-300 p-px dark:border-slate-600 dark:bg-slate-600",
					style: { gridTemplateColumns: `repeat(${d}, ${$}px)` },
					children: ie.map((e) => ae.map((t) => {
						let n = `${e},${t}`, r = e === y.row && t === y.col, i = e === x.row && t === x.col, o = _.has(n), s = re.has(n), c = ne.has(n), l = "bg-white dark:bg-slate-800";
						return c && (l = "bg-sky-300 dark:bg-sky-700"), s && (l = "bg-amber-400"), o && (l = "bg-slate-800 dark:bg-slate-950"), i && (l = "bg-rose-500"), r && (l = "bg-emerald-500"), /* @__PURE__ */ a("div", {
							onMouseDown: () => ee({
								row: e,
								col: t
							}),
							onMouseEnter: () => te({
								row: e,
								col: t
							}),
							className: `transition-colors duration-100 ${l} ${r || i ? "cursor-grab" : "cursor-pointer"}`,
							style: {
								width: $,
								height: $
							}
						}, n);
					}))
				}),
				M && /* @__PURE__ */ a("p", {
					className: "text-sm font-medium text-rose-500",
					children: "No path exists between start and end."
				}),
				/* @__PURE__ */ a("p", {
					className: "max-w-lg text-center text-xs text-slate-400",
					children: "Click and drag on empty cells to draw walls. Drag the green (start) or red (end) marker to move it."
				})
			]
		})]
	});
}
//#endregion
export { D as PATH_ALGORITHMS, U as PathfindingVisualizer, U as PathfindingVisualizerDefault, s as SORT_ALGORITHMS, E as SortingVisualizer, E as SortingVisualizerDefault };
