import { useCallback as e, useEffect as t, useMemo as n, useRef as r, useState as i } from "react";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/Minesweeper.tsx
var s = {
	classic: {
		panel: "bg-slate-200 border-slate-400",
		header: "bg-slate-300 border-slate-400",
		counter: "bg-black text-red-500 border-slate-500",
		board: "bg-slate-300",
		cellHidden: "bg-slate-300 border-slate-100 border-b-slate-500 border-r-slate-500 hover:bg-slate-200 active:bg-slate-400",
		cellRevealed: "bg-slate-200 border-slate-300",
		cellRevealedMine: "bg-red-300 border-slate-300",
		cellExploded: "bg-red-500 border-red-700",
		cellWrongFlag: "bg-red-200 border-slate-300",
		restartButton: "bg-slate-300 border-slate-100 border-b-slate-500 border-r-slate-500 hover:bg-slate-200",
		numbers: [
			"",
			"text-blue-600",
			"text-green-600",
			"text-red-600",
			"text-indigo-800",
			"text-rose-800",
			"text-teal-600",
			"text-slate-900",
			"text-slate-500"
		]
	},
	midnight: {
		panel: "bg-slate-900 border-slate-700",
		header: "bg-slate-800 border-slate-700",
		counter: "bg-black text-violet-400 border-slate-600",
		board: "bg-slate-800",
		cellHidden: "bg-slate-700 border-slate-600 border-b-slate-900 border-r-slate-900 hover:bg-slate-600 active:bg-slate-800",
		cellRevealed: "bg-slate-800 border-slate-700",
		cellRevealedMine: "bg-rose-900 border-slate-700",
		cellExploded: "bg-rose-600 border-rose-800",
		cellWrongFlag: "bg-rose-950 border-slate-700",
		restartButton: "bg-slate-700 border-slate-600 border-b-slate-900 border-r-slate-900 hover:bg-slate-600",
		numbers: [
			"",
			"text-sky-400",
			"text-emerald-400",
			"text-rose-400",
			"text-violet-400",
			"text-amber-400",
			"text-cyan-400",
			"text-slate-100",
			"text-slate-400"
		]
	},
	ocean: {
		panel: "bg-sky-100 border-sky-300",
		header: "bg-sky-200 border-sky-300",
		counter: "bg-slate-900 text-sky-300 border-sky-500",
		board: "bg-sky-200",
		cellHidden: "bg-sky-300 border-sky-100 border-b-sky-600 border-r-sky-600 hover:bg-sky-200 active:bg-sky-400",
		cellRevealed: "bg-sky-50 border-sky-200",
		cellRevealedMine: "bg-red-300 border-sky-200",
		cellExploded: "bg-red-500 border-red-700",
		cellWrongFlag: "bg-red-200 border-sky-200",
		restartButton: "bg-sky-300 border-sky-100 border-b-sky-600 border-r-sky-600 hover:bg-sky-200",
		numbers: [
			"",
			"text-blue-700",
			"text-emerald-700",
			"text-red-700",
			"text-indigo-900",
			"text-rose-900",
			"text-teal-700",
			"text-slate-900",
			"text-slate-600"
		]
	},
	forest: {
		panel: "bg-emerald-100 border-emerald-300",
		header: "bg-emerald-200 border-emerald-300",
		counter: "bg-slate-900 text-emerald-300 border-emerald-600",
		board: "bg-emerald-200",
		cellHidden: "bg-emerald-300 border-emerald-100 border-b-emerald-700 border-r-emerald-700 hover:bg-emerald-200 active:bg-emerald-400",
		cellRevealed: "bg-emerald-50 border-emerald-200",
		cellRevealedMine: "bg-red-300 border-emerald-200",
		cellExploded: "bg-red-500 border-red-700",
		cellWrongFlag: "bg-red-200 border-emerald-200",
		restartButton: "bg-emerald-300 border-emerald-100 border-b-emerald-700 border-r-emerald-700 hover:bg-emerald-200",
		numbers: [
			"",
			"text-blue-700",
			"text-green-800",
			"text-red-700",
			"text-indigo-900",
			"text-rose-900",
			"text-teal-700",
			"text-slate-900",
			"text-slate-600"
		]
	}
}, c = 450;
function l(...e) {
	return e.filter(Boolean).join(" ");
}
function u(e, t, n) {
	let r = e * t;
	return Math.max(1, Math.min(n, r - 1));
}
function d(e, t, n, r) {
	let i = [];
	for (let a = -1; a <= 1; a++) for (let o = -1; o <= 1; o++) {
		if (a === 0 && o === 0) continue;
		let s = e + a, c = t + o;
		s >= 0 && s < n && c >= 0 && c < r && i.push([s, c]);
	}
	return i;
}
function f(e, t, n, r) {
	let i = e * t, a = [];
	for (let e = 0; e < i; e++) r.has(e) || a.push(e);
	for (let e = a.length - 1; e > 0; e--) {
		let t = Math.floor(Math.random() * (e + 1)), n = a[e];
		a[e] = a[t], a[t] = n;
	}
	let o = Math.min(n, a.length);
	return new Set(a.slice(0, o));
}
function p(e, t, n) {
	let r = [];
	for (let i = 0; i < e; i++) {
		let e = [];
		for (let r = 0; r < t; r++) {
			let a = i * t + r;
			e.push({
				isMine: n.has(a),
				adjacent: 0,
				revealed: !1,
				flagged: !1
			});
		}
		r.push(e);
	}
	for (let n = 0; n < e; n++) for (let i = 0; i < t; i++) {
		if (r[n][i].isMine) continue;
		let a = 0;
		for (let [o, s] of d(n, i, e, t)) r[o][s].isMine && a++;
		r[n][i].adjacent = a;
	}
	return r;
}
function m(e) {
	return e.map((e) => e.map((e) => ({ ...e })));
}
function h(e, t, n) {
	let r = e.length, i = e[0]?.length ?? 0, a = m(e), o = [[t, n]], s = /* @__PURE__ */ new Set();
	for (; o.length > 0;) {
		let [e, t] = o.pop(), n = e * i + t;
		if (s.has(n)) continue;
		s.add(n);
		let c = a[e][t];
		if (!(c.flagged || c.revealed) && (c.revealed = !0, !c.isMine && c.adjacent === 0)) for (let [n, s] of d(e, t, r, i)) !a[n][s].revealed && !a[n][s].flagged && o.push([n, s]);
	}
	return a;
}
function g(e) {
	let t = 0;
	for (let n of e) for (let e of n) e.revealed && !e.isMine && t++;
	return t;
}
function _(e) {
	let t = Math.max(-99, Math.min(999, e)), n = t < 0, r = Math.abs(t).toString().padStart(n ? 2 : 3, "0");
	return n ? `-${r}` : r;
}
function v({ rows: v = 9, cols: y = 9, mineCount: b = 10, theme: x = "classic", className: S, onWin: C, onLose: w }) {
	let T = Math.max(1, Math.floor(v)), E = Math.max(1, Math.floor(y)), D = u(T, E, Math.floor(b)), O = s[x] ?? s.classic, [k, A] = i(() => p(T, E, f(T, E, D, /* @__PURE__ */ new Set()))), [j, M] = i("ready"), [N, P] = i(null), [F, I] = i(0), L = r(null), R = r(!1), z = e(() => {
		let e = f(T, E, D, /* @__PURE__ */ new Set());
		A(p(T, E, e)), M("ready"), P(null), I(0);
	}, [
		T,
		E,
		D
	]);
	t(() => {
		z();
	}, [
		T,
		E,
		D
	]), t(() => {
		if (j !== "playing") return;
		let e = setInterval(() => {
			I((e) => e >= 999 ? e : e + 1);
		}, 1e3);
		return () => clearInterval(e);
	}, [j]);
	let B = D - n(() => {
		let e = 0;
		for (let t of k) for (let n of t) n.flagged && e++;
		return e;
	}, [k]), V = e((e, t) => {
		j !== "won" && j !== "lost" && A((n) => {
			let r = n[e][t];
			if (r.flagged || r.revealed) return n;
			let i = n;
			if (j === "ready") {
				let r = new Set(d(e, t, T, E).map(([e, t]) => e * E + t));
				if (r.add(e * E + t), Array.from(r).some((e) => {
					let t = Math.floor(e / E), r = e % E;
					return n[t][r].isMine;
				})) {
					let n = r;
					T * E - n.size < D && (n = /* @__PURE__ */ new Set([e * E + t]));
					let a = f(T, E, D, n);
					i = p(T, E, a);
				}
			}
			let a = h(i, e, t);
			if (a[e][t].isMine) {
				for (let e of a) for (let t of e) t.isMine && (t.revealed = !0);
				P(e * E + t), M("lost"), w?.();
			} else {
				let e = T * E - D;
				if (g(a) === e) {
					for (let e of a) for (let t of e) t.isMine && (t.flagged = !0);
					M("won"), C?.();
				} else j === "ready" && M("playing");
			}
			return a;
		});
	}, [
		j,
		T,
		E,
		D,
		C,
		w
	]), H = e((e, t) => {
		j !== "won" && j !== "lost" && A((n) => {
			if (n[e][t].revealed) return n;
			let r = m(n);
			return r[e][t].flagged = !r[e][t].flagged, r;
		});
	}, [j]), U = () => {
		L.current &&= (clearTimeout(L.current), null);
	}, W = (e, t) => {
		R.current = !1, U(), L.current = setTimeout(() => {
			R.current = !0, H(e, t);
		}, c);
	}, G = (e, t, n) => {
		if (U(), R.current) {
			e.preventDefault(), R.current = !1;
			return;
		}
		e.preventDefault(), V(t, n);
	}, K = j === "lost" ? "😵" : j === "won" ? "😎" : "🙂";
	return /* @__PURE__ */ o("div", {
		className: l("inline-block select-none rounded-lg border-4 p-3 font-sans shadow-xl", O.panel, S),
		children: [/* @__PURE__ */ o("div", {
			className: l("mb-3 flex items-center justify-between gap-3 rounded border-2 px-3 py-2", O.header),
			children: [
				/* @__PURE__ */ a("div", {
					className: l("rounded border-2 px-2 py-1 font-mono text-xl font-bold tabular-nums", O.counter),
					"aria-label": "Mines remaining",
					children: _(B)
				}),
				/* @__PURE__ */ a("button", {
					type: "button",
					onClick: z,
					"aria-label": "Restart game",
					className: l("flex h-9 w-9 items-center justify-center rounded border-2 text-lg leading-none", O.restartButton),
					children: K
				}),
				/* @__PURE__ */ a("div", {
					className: l("rounded border-2 px-2 py-1 font-mono text-xl font-bold tabular-nums", O.counter),
					"aria-label": "Elapsed time",
					children: _(F)
				})
			]
		}), /* @__PURE__ */ a("div", {
			role: "grid",
			"aria-label": "Minesweeper board",
			className: l("grid gap-[2px] rounded border-2 border-transparent p-1", O.board),
			style: { gridTemplateColumns: `repeat(${E}, minmax(1.75rem, 2.25rem))` },
			children: k.map((e, t) => e.map((e, n) => {
				let r = t * E + n, i = j === "lost" && e.flagged && !e.isMine, o = r === N, s = O.cellHidden, c = "";
				e.revealed ? e.isMine ? (s = o ? O.cellExploded : O.cellRevealedMine, c = o ? "💥" : "💣") : (s = O.cellRevealed, c = e.adjacent > 0 ? String(e.adjacent) : "") : i ? (s = O.cellWrongFlag, c = "❌") : e.flagged && (c = "🚩");
				let u = e.revealed && !e.isMine && e.adjacent > 0 ? O.numbers[e.adjacent] : "";
				return /* @__PURE__ */ a("button", {
					type: "button",
					role: "gridcell",
					"aria-label": `Row ${t + 1}, column ${n + 1}`,
					disabled: j === "won" || j === "lost",
					className: l("flex aspect-square items-center justify-center rounded-[2px] border-2 text-sm font-bold sm:text-base", s, u),
					onClick: () => V(t, n),
					onContextMenu: (e) => {
						e.preventDefault(), H(t, n);
					},
					onTouchStart: () => W(t, n),
					onTouchEnd: (e) => G(e, t, n),
					onTouchMove: U,
					children: c
				}, r);
			}))
		})]
	});
}
//#endregion
export { v as Minesweeper, v as default };
