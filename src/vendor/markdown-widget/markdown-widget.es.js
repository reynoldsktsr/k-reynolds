var Pr = Object.defineProperty;
var zr = (a, e, t) => e in a ? Pr(a, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : a[e] = t;
var E = (a, e, t) => zr(a, typeof e != "symbol" ? e + "" : e, t);
import { jsxs as nt, jsx as he } from "react/jsx-runtime";
import { useState as An, useRef as Mr, useMemo as $r } from "react";
function $t() {
  return {
    async: !1,
    breaks: !1,
    extensions: null,
    gfm: !0,
    hooks: null,
    pedantic: !1,
    renderer: null,
    silent: !1,
    tokenizer: null,
    walkTokens: null
  };
}
let be = $t();
function Gn(a) {
  be = a;
}
const qn = /[&<>"']/, vr = new RegExp(qn.source, "g"), Yn = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/, Ur = new RegExp(Yn.source, "g"), Fr = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
}, En = (a) => Fr[a];
function Y(a, e) {
  if (e) {
    if (qn.test(a))
      return a.replace(vr, En);
  } else if (Yn.test(a))
    return a.replace(Ur, En);
  return a;
}
const Br = /(^|[^\[])\^/g;
function A(a, e) {
  let t = typeof a == "string" ? a : a.source;
  e = e || "";
  const n = {
    replace: (i, s) => {
      let o = typeof s == "string" ? s : s.source;
      return o = o.replace(Br, "$1"), t = t.replace(i, o), n;
    },
    getRegex: () => new RegExp(t, e)
  };
  return n;
}
function Sn(a) {
  try {
    a = encodeURI(a).replace(/%25/g, "%");
  } catch {
    return null;
  }
  return a;
}
const Ue = { exec: () => null };
function Rn(a, e) {
  const t = a.replace(/\|/g, (s, o, c) => {
    let u = !1, m = o;
    for (; --m >= 0 && c[m] === "\\"; )
      u = !u;
    return u ? "|" : " |";
  }), n = t.split(/ \|/);
  let i = 0;
  if (n[0].trim() || n.shift(), n.length > 0 && !n[n.length - 1].trim() && n.pop(), e)
    if (n.length > e)
      n.splice(e);
    else
      for (; n.length < e; )
        n.push("");
  for (; i < n.length; i++)
    n[i] = n[i].trim().replace(/\\\|/g, "|");
  return n;
}
function Ne(a, e, t) {
  const n = a.length;
  if (n === 0)
    return "";
  let i = 0;
  for (; i < n && a.charAt(n - i - 1) === e; )
    i++;
  return a.slice(0, n - i);
}
function Hr(a, e) {
  if (a.indexOf(e[1]) === -1)
    return -1;
  let t = 0;
  for (let n = 0; n < a.length; n++)
    if (a[n] === "\\")
      n++;
    else if (a[n] === e[0])
      t++;
    else if (a[n] === e[1] && (t--, t < 0))
      return n;
  return -1;
}
function On(a, e, t, n) {
  const i = e.href, s = e.title ? Y(e.title) : null, o = a[1].replace(/\\([\[\]])/g, "$1");
  if (a[0].charAt(0) !== "!") {
    n.state.inLink = !0;
    const c = {
      type: "link",
      raw: t,
      href: i,
      title: s,
      text: o,
      tokens: n.inlineTokens(o)
    };
    return n.state.inLink = !1, c;
  }
  return {
    type: "image",
    raw: t,
    href: i,
    title: s,
    text: Y(o)
  };
}
function Wr(a, e) {
  const t = a.match(/^(\s+)(?:```)/);
  if (t === null)
    return e;
  const n = t[1];
  return e.split(`
`).map((i) => {
    const s = i.match(/^\s+/);
    if (s === null)
      return i;
    const [o] = s;
    return o.length >= n.length ? i.slice(n.length) : i;
  }).join(`
`);
}
class ot {
  // set by the lexer
  constructor(e) {
    E(this, "options");
    E(this, "rules");
    // set by the lexer
    E(this, "lexer");
    this.options = e || be;
  }
  space(e) {
    const t = this.rules.block.newline.exec(e);
    if (t && t[0].length > 0)
      return {
        type: "space",
        raw: t[0]
      };
  }
  code(e) {
    const t = this.rules.block.code.exec(e);
    if (t) {
      const n = t[0].replace(/^(?: {1,4}| {0,3}\t)/gm, "");
      return {
        type: "code",
        raw: t[0],
        codeBlockStyle: "indented",
        text: this.options.pedantic ? n : Ne(n, `
`)
      };
    }
  }
  fences(e) {
    const t = this.rules.block.fences.exec(e);
    if (t) {
      const n = t[0], i = Wr(n, t[3] || "");
      return {
        type: "code",
        raw: n,
        lang: t[2] ? t[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : t[2],
        text: i
      };
    }
  }
  heading(e) {
    const t = this.rules.block.heading.exec(e);
    if (t) {
      let n = t[2].trim();
      if (/#$/.test(n)) {
        const i = Ne(n, "#");
        (this.options.pedantic || !i || / $/.test(i)) && (n = i.trim());
      }
      return {
        type: "heading",
        raw: t[0],
        depth: t[1].length,
        text: n,
        tokens: this.lexer.inline(n)
      };
    }
  }
  hr(e) {
    const t = this.rules.block.hr.exec(e);
    if (t)
      return {
        type: "hr",
        raw: Ne(t[0], `
`)
      };
  }
  blockquote(e) {
    const t = this.rules.block.blockquote.exec(e);
    if (t) {
      let n = Ne(t[0], `
`).split(`
`), i = "", s = "";
      const o = [];
      for (; n.length > 0; ) {
        let c = !1;
        const u = [];
        let m;
        for (m = 0; m < n.length; m++)
          if (/^ {0,3}>/.test(n[m]))
            u.push(n[m]), c = !0;
          else if (!c)
            u.push(n[m]);
          else
            break;
        n = n.slice(m);
        const h = u.join(`
`), b = h.replace(/\n {0,3}((?:=+|-+) *)(?=\n|$)/g, `
    $1`).replace(/^ {0,3}>[ \t]?/gm, "");
        i = i ? `${i}
${h}` : h, s = s ? `${s}
${b}` : b;
        const T = this.lexer.state.top;
        if (this.lexer.state.top = !0, this.lexer.blockTokens(b, o, !0), this.lexer.state.top = T, n.length === 0)
          break;
        const y = o[o.length - 1];
        if ((y == null ? void 0 : y.type) === "code")
          break;
        if ((y == null ? void 0 : y.type) === "blockquote") {
          const w = y, M = w.raw + `
` + n.join(`
`), U = this.blockquote(M);
          o[o.length - 1] = U, i = i.substring(0, i.length - w.raw.length) + U.raw, s = s.substring(0, s.length - w.text.length) + U.text;
          break;
        } else if ((y == null ? void 0 : y.type) === "list") {
          const w = y, M = w.raw + `
` + n.join(`
`), U = this.list(M);
          o[o.length - 1] = U, i = i.substring(0, i.length - y.raw.length) + U.raw, s = s.substring(0, s.length - w.raw.length) + U.raw, n = M.substring(o[o.length - 1].raw.length).split(`
`);
          continue;
        }
      }
      return {
        type: "blockquote",
        raw: i,
        tokens: o,
        text: s
      };
    }
  }
  list(e) {
    let t = this.rules.block.list.exec(e);
    if (t) {
      let n = t[1].trim();
      const i = n.length > 1, s = {
        type: "list",
        raw: "",
        ordered: i,
        start: i ? +n.slice(0, -1) : "",
        loose: !1,
        items: []
      };
      n = i ? `\\d{1,9}\\${n.slice(-1)}` : `\\${n}`, this.options.pedantic && (n = i ? n : "[*+-]");
      const o = new RegExp(`^( {0,3}${n})((?:[	 ][^\\n]*)?(?:\\n|$))`);
      let c = !1;
      for (; e; ) {
        let u = !1, m = "", h = "";
        if (!(t = o.exec(e)) || this.rules.block.hr.test(e))
          break;
        m = t[0], e = e.substring(m.length);
        let b = t[2].split(`
`, 1)[0].replace(/^\t+/, (Z) => " ".repeat(3 * Z.length)), T = e.split(`
`, 1)[0], y = !b.trim(), w = 0;
        if (this.options.pedantic ? (w = 2, h = b.trimStart()) : y ? w = t[1].length + 1 : (w = t[2].search(/[^ ]/), w = w > 4 ? 1 : w, h = b.slice(w), w += t[1].length), y && /^[ \t]*$/.test(T) && (m += T + `
`, e = e.substring(T.length + 1), u = !0), !u) {
          const Z = new RegExp(`^ {0,${Math.min(3, w - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`), R = new RegExp(`^ {0,${Math.min(3, w - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`), j = new RegExp(`^ {0,${Math.min(3, w - 1)}}(?:\`\`\`|~~~)`), X = new RegExp(`^ {0,${Math.min(3, w - 1)}}#`), ee = new RegExp(`^ {0,${Math.min(3, w - 1)}}<(?:[a-z].*>|!--)`, "i");
          for (; e; ) {
            const V = e.split(`
`, 1)[0];
            let te;
            if (T = V, this.options.pedantic ? (T = T.replace(/^ {1,4}(?=( {4})*[^ ])/g, "  "), te = T) : te = T.replace(/\t/g, "    "), j.test(T) || X.test(T) || ee.test(T) || Z.test(T) || R.test(T))
              break;
            if (te.search(/[^ ]/) >= w || !T.trim())
              h += `
` + te.slice(w);
            else {
              if (y || b.replace(/\t/g, "    ").search(/[^ ]/) >= 4 || j.test(b) || X.test(b) || R.test(b))
                break;
              h += `
` + T;
            }
            !y && !T.trim() && (y = !0), m += V + `
`, e = e.substring(V.length + 1), b = te.slice(w);
          }
        }
        s.loose || (c ? s.loose = !0 : /\n[ \t]*\n[ \t]*$/.test(m) && (c = !0));
        let M = null, U;
        this.options.gfm && (M = /^\[[ xX]\] /.exec(h), M && (U = M[0] !== "[ ] ", h = h.replace(/^\[[ xX]\] +/, ""))), s.items.push({
          type: "list_item",
          raw: m,
          task: !!M,
          checked: U,
          loose: !1,
          text: h,
          tokens: []
        }), s.raw += m;
      }
      s.items[s.items.length - 1].raw = s.items[s.items.length - 1].raw.trimEnd(), s.items[s.items.length - 1].text = s.items[s.items.length - 1].text.trimEnd(), s.raw = s.raw.trimEnd();
      for (let u = 0; u < s.items.length; u++)
        if (this.lexer.state.top = !1, s.items[u].tokens = this.lexer.blockTokens(s.items[u].text, []), !s.loose) {
          const m = s.items[u].tokens.filter((b) => b.type === "space"), h = m.length > 0 && m.some((b) => /\n.*\n/.test(b.raw));
          s.loose = h;
        }
      if (s.loose)
        for (let u = 0; u < s.items.length; u++)
          s.items[u].loose = !0;
      return s;
    }
  }
  html(e) {
    const t = this.rules.block.html.exec(e);
    if (t)
      return {
        type: "html",
        block: !0,
        raw: t[0],
        pre: t[1] === "pre" || t[1] === "script" || t[1] === "style",
        text: t[0]
      };
  }
  def(e) {
    const t = this.rules.block.def.exec(e);
    if (t) {
      const n = t[1].toLowerCase().replace(/\s+/g, " "), i = t[2] ? t[2].replace(/^<(.*)>$/, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", s = t[3] ? t[3].substring(1, t[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : t[3];
      return {
        type: "def",
        tag: n,
        raw: t[0],
        href: i,
        title: s
      };
    }
  }
  table(e) {
    const t = this.rules.block.table.exec(e);
    if (!t || !/[:|]/.test(t[2]))
      return;
    const n = Rn(t[1]), i = t[2].replace(/^\||\| *$/g, "").split("|"), s = t[3] && t[3].trim() ? t[3].replace(/\n[ \t]*$/, "").split(`
`) : [], o = {
      type: "table",
      raw: t[0],
      header: [],
      align: [],
      rows: []
    };
    if (n.length === i.length) {
      for (const c of i)
        /^ *-+: *$/.test(c) ? o.align.push("right") : /^ *:-+: *$/.test(c) ? o.align.push("center") : /^ *:-+ *$/.test(c) ? o.align.push("left") : o.align.push(null);
      for (let c = 0; c < n.length; c++)
        o.header.push({
          text: n[c],
          tokens: this.lexer.inline(n[c]),
          header: !0,
          align: o.align[c]
        });
      for (const c of s)
        o.rows.push(Rn(c, o.header.length).map((u, m) => ({
          text: u,
          tokens: this.lexer.inline(u),
          header: !1,
          align: o.align[m]
        })));
      return o;
    }
  }
  lheading(e) {
    const t = this.rules.block.lheading.exec(e);
    if (t)
      return {
        type: "heading",
        raw: t[0],
        depth: t[2].charAt(0) === "=" ? 1 : 2,
        text: t[1],
        tokens: this.lexer.inline(t[1])
      };
  }
  paragraph(e) {
    const t = this.rules.block.paragraph.exec(e);
    if (t) {
      const n = t[1].charAt(t[1].length - 1) === `
` ? t[1].slice(0, -1) : t[1];
      return {
        type: "paragraph",
        raw: t[0],
        text: n,
        tokens: this.lexer.inline(n)
      };
    }
  }
  text(e) {
    const t = this.rules.block.text.exec(e);
    if (t)
      return {
        type: "text",
        raw: t[0],
        text: t[0],
        tokens: this.lexer.inline(t[0])
      };
  }
  escape(e) {
    const t = this.rules.inline.escape.exec(e);
    if (t)
      return {
        type: "escape",
        raw: t[0],
        text: Y(t[1])
      };
  }
  tag(e) {
    const t = this.rules.inline.tag.exec(e);
    if (t)
      return !this.lexer.state.inLink && /^<a /i.test(t[0]) ? this.lexer.state.inLink = !0 : this.lexer.state.inLink && /^<\/a>/i.test(t[0]) && (this.lexer.state.inLink = !1), !this.lexer.state.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(t[0]) ? this.lexer.state.inRawBlock = !0 : this.lexer.state.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(t[0]) && (this.lexer.state.inRawBlock = !1), {
        type: "html",
        raw: t[0],
        inLink: this.lexer.state.inLink,
        inRawBlock: this.lexer.state.inRawBlock,
        block: !1,
        text: t[0]
      };
  }
  link(e) {
    const t = this.rules.inline.link.exec(e);
    if (t) {
      const n = t[2].trim();
      if (!this.options.pedantic && /^</.test(n)) {
        if (!/>$/.test(n))
          return;
        const o = Ne(n.slice(0, -1), "\\");
        if ((n.length - o.length) % 2 === 0)
          return;
      } else {
        const o = Hr(t[2], "()");
        if (o > -1) {
          const u = (t[0].indexOf("!") === 0 ? 5 : 4) + t[1].length + o;
          t[2] = t[2].substring(0, o), t[0] = t[0].substring(0, u).trim(), t[3] = "";
        }
      }
      let i = t[2], s = "";
      if (this.options.pedantic) {
        const o = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(i);
        o && (i = o[1], s = o[3]);
      } else
        s = t[3] ? t[3].slice(1, -1) : "";
      return i = i.trim(), /^</.test(i) && (this.options.pedantic && !/>$/.test(n) ? i = i.slice(1) : i = i.slice(1, -1)), On(t, {
        href: i && i.replace(this.rules.inline.anyPunctuation, "$1"),
        title: s && s.replace(this.rules.inline.anyPunctuation, "$1")
      }, t[0], this.lexer);
    }
  }
  reflink(e, t) {
    let n;
    if ((n = this.rules.inline.reflink.exec(e)) || (n = this.rules.inline.nolink.exec(e))) {
      const i = (n[2] || n[1]).replace(/\s+/g, " "), s = t[i.toLowerCase()];
      if (!s) {
        const o = n[0].charAt(0);
        return {
          type: "text",
          raw: o,
          text: o
        };
      }
      return On(n, s, n[0], this.lexer);
    }
  }
  emStrong(e, t, n = "") {
    let i = this.rules.inline.emStrongLDelim.exec(e);
    if (!i || i[3] && n.match(/[\p{L}\p{N}]/u))
      return;
    if (!(i[1] || i[2] || "") || !n || this.rules.inline.punctuation.exec(n)) {
      const o = [...i[0]].length - 1;
      let c, u, m = o, h = 0;
      const b = i[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
      for (b.lastIndex = 0, t = t.slice(-1 * e.length + o); (i = b.exec(t)) != null; ) {
        if (c = i[1] || i[2] || i[3] || i[4] || i[5] || i[6], !c)
          continue;
        if (u = [...c].length, i[3] || i[4]) {
          m += u;
          continue;
        } else if ((i[5] || i[6]) && o % 3 && !((o + u) % 3)) {
          h += u;
          continue;
        }
        if (m -= u, m > 0)
          continue;
        u = Math.min(u, u + m + h);
        const T = [...i[0]][0].length, y = e.slice(0, o + i.index + T + u);
        if (Math.min(o, u) % 2) {
          const M = y.slice(1, -1);
          return {
            type: "em",
            raw: y,
            text: M,
            tokens: this.lexer.inlineTokens(M)
          };
        }
        const w = y.slice(2, -2);
        return {
          type: "strong",
          raw: y,
          text: w,
          tokens: this.lexer.inlineTokens(w)
        };
      }
    }
  }
  codespan(e) {
    const t = this.rules.inline.code.exec(e);
    if (t) {
      let n = t[2].replace(/\n/g, " ");
      const i = /[^ ]/.test(n), s = /^ /.test(n) && / $/.test(n);
      return i && s && (n = n.substring(1, n.length - 1)), n = Y(n, !0), {
        type: "codespan",
        raw: t[0],
        text: n
      };
    }
  }
  br(e) {
    const t = this.rules.inline.br.exec(e);
    if (t)
      return {
        type: "br",
        raw: t[0]
      };
  }
  del(e) {
    const t = this.rules.inline.del.exec(e);
    if (t)
      return {
        type: "del",
        raw: t[0],
        text: t[2],
        tokens: this.lexer.inlineTokens(t[2])
      };
  }
  autolink(e) {
    const t = this.rules.inline.autolink.exec(e);
    if (t) {
      let n, i;
      return t[2] === "@" ? (n = Y(t[1]), i = "mailto:" + n) : (n = Y(t[1]), i = n), {
        type: "link",
        raw: t[0],
        text: n,
        href: i,
        tokens: [
          {
            type: "text",
            raw: n,
            text: n
          }
        ]
      };
    }
  }
  url(e) {
    var n;
    let t;
    if (t = this.rules.inline.url.exec(e)) {
      let i, s;
      if (t[2] === "@")
        i = Y(t[0]), s = "mailto:" + i;
      else {
        let o;
        do
          o = t[0], t[0] = ((n = this.rules.inline._backpedal.exec(t[0])) == null ? void 0 : n[0]) ?? "";
        while (o !== t[0]);
        i = Y(t[0]), t[1] === "www." ? s = "http://" + t[0] : s = t[0];
      }
      return {
        type: "link",
        raw: t[0],
        text: i,
        href: s,
        tokens: [
          {
            type: "text",
            raw: i,
            text: i
          }
        ]
      };
    }
  }
  inlineText(e) {
    const t = this.rules.inline.text.exec(e);
    if (t) {
      let n;
      return this.lexer.state.inRawBlock ? n = t[0] : n = Y(t[0]), {
        type: "text",
        raw: t[0],
        text: n
      };
    }
  }
}
const jr = /^(?:[ \t]*(?:\n|$))+/, Gr = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, qr = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, Be = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, Yr = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, Zn = /(?:[*+-]|\d{1,9}[.)])/, Xn = A(/^(?!bull |blockCode|fences|blockquote|heading|html)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html))+?)\n {0,3}(=+|-+) *(?:\n+|$)/).replace(/bull/g, Zn).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).getRegex(), vt = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/, Zr = /^[^\n]+/, Ut = /(?!\s*\])(?:\\.|[^\[\]\\])+/, Xr = A(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", Ut).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), Vr = A(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, Zn).getRegex(), ct = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", Ft = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, Qr = A("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", Ft).replace("tag", ct).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), Vn = A(vt).replace("hr", Be).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", ct).getRegex(), Kr = A(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", Vn).getRegex(), Bt = {
  blockquote: Kr,
  code: Gr,
  def: Xr,
  fences: qr,
  heading: Yr,
  hr: Be,
  html: Qr,
  lheading: Xn,
  list: Vr,
  newline: jr,
  paragraph: Vn,
  table: Ue,
  text: Zr
}, Ln = A("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", Be).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", ct).getRegex(), Jr = {
  ...Bt,
  table: Ln,
  paragraph: A(vt).replace("hr", Be).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", Ln).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", ct).getRegex()
}, ei = {
  ...Bt,
  html: A(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", Ft).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
  heading: /^(#{1,6})(.*)(?:\n+|$)/,
  fences: Ue,
  // fences not supported
  lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
  paragraph: A(vt).replace("hr", Be).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", Xn).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex()
}, Qn = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, ti = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, Kn = /^( {2,}|\\)\n(?!\s*$)/, ni = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, He = "\\p{P}\\p{S}", ri = A(/^((?![*_])[\spunctuation])/, "u").replace(/punctuation/g, He).getRegex(), ii = /\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g, si = A(/^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/, "u").replace(/punct/g, He).getRegex(), oi = A("^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)[punct](\\*+)(?=[\\s]|$)|[^punct\\s](\\*+)(?!\\*)(?=[punct\\s]|$)|(?!\\*)[punct\\s](\\*+)(?=[^punct\\s])|[\\s](\\*+)(?!\\*)(?=[punct])|(?!\\*)[punct](\\*+)(?!\\*)(?=[punct])|[^punct\\s](\\*+)(?=[^punct\\s])", "gu").replace(/punct/g, He).getRegex(), li = A("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)[punct](_+)(?=[\\s]|$)|[^punct\\s](_+)(?!_)(?=[punct\\s]|$)|(?!_)[punct\\s](_+)(?=[^punct\\s])|[\\s](_+)(?!_)(?=[punct])|(?!_)[punct](_+)(?!_)(?=[punct])", "gu").replace(/punct/g, He).getRegex(), ai = A(/\\([punct])/, "gu").replace(/punct/g, He).getRegex(), ci = A(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), ui = A(Ft).replace("(?:-->|$)", "-->").getRegex(), pi = A("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", ui).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), lt = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/, fi = A(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/).replace("label", lt).replace("href", /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), Jn = A(/^!?\[(label)\]\[(ref)\]/).replace("label", lt).replace("ref", Ut).getRegex(), er = A(/^!?\[(ref)\](?:\[\])?/).replace("ref", Ut).getRegex(), hi = A("reflink|nolink(?!\\()", "g").replace("reflink", Jn).replace("nolink", er).getRegex(), Ht = {
  _backpedal: Ue,
  // only used for GFM url
  anyPunctuation: ai,
  autolink: ci,
  blockSkip: ii,
  br: Kn,
  code: ti,
  del: Ue,
  emStrongLDelim: si,
  emStrongRDelimAst: oi,
  emStrongRDelimUnd: li,
  escape: Qn,
  link: fi,
  nolink: er,
  punctuation: ri,
  reflink: Jn,
  reflinkSearch: hi,
  tag: pi,
  text: ni,
  url: Ue
}, di = {
  ...Ht,
  link: A(/^!?\[(label)\]\((.*?)\)/).replace("label", lt).getRegex(),
  reflink: A(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", lt).getRegex()
}, Pt = {
  ...Ht,
  escape: A(Qn).replace("])", "~|])").getRegex(),
  url: A(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, "i").replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),
  _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
  del: /^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,
  text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
}, mi = {
  ...Pt,
  br: A(Kn).replace("{2,}", "*").getRegex(),
  text: A(Pt.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
}, rt = {
  normal: Bt,
  gfm: Jr,
  pedantic: ei
}, Ce = {
  normal: Ht,
  gfm: Pt,
  breaks: mi,
  pedantic: di
};
class K {
  constructor(e) {
    E(this, "tokens");
    E(this, "options");
    E(this, "state");
    E(this, "tokenizer");
    E(this, "inlineQueue");
    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = e || be, this.options.tokenizer = this.options.tokenizer || new ot(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = {
      inLink: !1,
      inRawBlock: !1,
      top: !0
    };
    const t = {
      block: rt.normal,
      inline: Ce.normal
    };
    this.options.pedantic ? (t.block = rt.pedantic, t.inline = Ce.pedantic) : this.options.gfm && (t.block = rt.gfm, this.options.breaks ? t.inline = Ce.breaks : t.inline = Ce.gfm), this.tokenizer.rules = t;
  }
  /**
   * Expose Rules
   */
  static get rules() {
    return {
      block: rt,
      inline: Ce
    };
  }
  /**
   * Static Lex Method
   */
  static lex(e, t) {
    return new K(t).lex(e);
  }
  /**
   * Static Lex Inline Method
   */
  static lexInline(e, t) {
    return new K(t).inlineTokens(e);
  }
  /**
   * Preprocessing
   */
  lex(e) {
    e = e.replace(/\r\n|\r/g, `
`), this.blockTokens(e, this.tokens);
    for (let t = 0; t < this.inlineQueue.length; t++) {
      const n = this.inlineQueue[t];
      this.inlineTokens(n.src, n.tokens);
    }
    return this.inlineQueue = [], this.tokens;
  }
  blockTokens(e, t = [], n = !1) {
    this.options.pedantic && (e = e.replace(/\t/g, "    ").replace(/^ +$/gm, ""));
    let i, s, o;
    for (; e; )
      if (!(this.options.extensions && this.options.extensions.block && this.options.extensions.block.some((c) => (i = c.call({ lexer: this }, e, t)) ? (e = e.substring(i.raw.length), t.push(i), !0) : !1))) {
        if (i = this.tokenizer.space(e)) {
          e = e.substring(i.raw.length), i.raw.length === 1 && t.length > 0 ? t[t.length - 1].raw += `
` : t.push(i);
          continue;
        }
        if (i = this.tokenizer.code(e)) {
          e = e.substring(i.raw.length), s = t[t.length - 1], s && (s.type === "paragraph" || s.type === "text") ? (s.raw += `
` + i.raw, s.text += `
` + i.text, this.inlineQueue[this.inlineQueue.length - 1].src = s.text) : t.push(i);
          continue;
        }
        if (i = this.tokenizer.fences(e)) {
          e = e.substring(i.raw.length), t.push(i);
          continue;
        }
        if (i = this.tokenizer.heading(e)) {
          e = e.substring(i.raw.length), t.push(i);
          continue;
        }
        if (i = this.tokenizer.hr(e)) {
          e = e.substring(i.raw.length), t.push(i);
          continue;
        }
        if (i = this.tokenizer.blockquote(e)) {
          e = e.substring(i.raw.length), t.push(i);
          continue;
        }
        if (i = this.tokenizer.list(e)) {
          e = e.substring(i.raw.length), t.push(i);
          continue;
        }
        if (i = this.tokenizer.html(e)) {
          e = e.substring(i.raw.length), t.push(i);
          continue;
        }
        if (i = this.tokenizer.def(e)) {
          e = e.substring(i.raw.length), s = t[t.length - 1], s && (s.type === "paragraph" || s.type === "text") ? (s.raw += `
` + i.raw, s.text += `
` + i.raw, this.inlineQueue[this.inlineQueue.length - 1].src = s.text) : this.tokens.links[i.tag] || (this.tokens.links[i.tag] = {
            href: i.href,
            title: i.title
          });
          continue;
        }
        if (i = this.tokenizer.table(e)) {
          e = e.substring(i.raw.length), t.push(i);
          continue;
        }
        if (i = this.tokenizer.lheading(e)) {
          e = e.substring(i.raw.length), t.push(i);
          continue;
        }
        if (o = e, this.options.extensions && this.options.extensions.startBlock) {
          let c = 1 / 0;
          const u = e.slice(1);
          let m;
          this.options.extensions.startBlock.forEach((h) => {
            m = h.call({ lexer: this }, u), typeof m == "number" && m >= 0 && (c = Math.min(c, m));
          }), c < 1 / 0 && c >= 0 && (o = e.substring(0, c + 1));
        }
        if (this.state.top && (i = this.tokenizer.paragraph(o))) {
          s = t[t.length - 1], n && (s == null ? void 0 : s.type) === "paragraph" ? (s.raw += `
` + i.raw, s.text += `
` + i.text, this.inlineQueue.pop(), this.inlineQueue[this.inlineQueue.length - 1].src = s.text) : t.push(i), n = o.length !== e.length, e = e.substring(i.raw.length);
          continue;
        }
        if (i = this.tokenizer.text(e)) {
          e = e.substring(i.raw.length), s = t[t.length - 1], s && s.type === "text" ? (s.raw += `
` + i.raw, s.text += `
` + i.text, this.inlineQueue.pop(), this.inlineQueue[this.inlineQueue.length - 1].src = s.text) : t.push(i);
          continue;
        }
        if (e) {
          const c = "Infinite loop on byte: " + e.charCodeAt(0);
          if (this.options.silent) {
            console.error(c);
            break;
          } else
            throw new Error(c);
        }
      }
    return this.state.top = !0, t;
  }
  inline(e, t = []) {
    return this.inlineQueue.push({ src: e, tokens: t }), t;
  }
  /**
   * Lexing/Compiling
   */
  inlineTokens(e, t = []) {
    let n, i, s, o = e, c, u, m;
    if (this.tokens.links) {
      const h = Object.keys(this.tokens.links);
      if (h.length > 0)
        for (; (c = this.tokenizer.rules.inline.reflinkSearch.exec(o)) != null; )
          h.includes(c[0].slice(c[0].lastIndexOf("[") + 1, -1)) && (o = o.slice(0, c.index) + "[" + "a".repeat(c[0].length - 2) + "]" + o.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
    }
    for (; (c = this.tokenizer.rules.inline.blockSkip.exec(o)) != null; )
      o = o.slice(0, c.index) + "[" + "a".repeat(c[0].length - 2) + "]" + o.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    for (; (c = this.tokenizer.rules.inline.anyPunctuation.exec(o)) != null; )
      o = o.slice(0, c.index) + "++" + o.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
    for (; e; )
      if (u || (m = ""), u = !1, !(this.options.extensions && this.options.extensions.inline && this.options.extensions.inline.some((h) => (n = h.call({ lexer: this }, e, t)) ? (e = e.substring(n.raw.length), t.push(n), !0) : !1))) {
        if (n = this.tokenizer.escape(e)) {
          e = e.substring(n.raw.length), t.push(n);
          continue;
        }
        if (n = this.tokenizer.tag(e)) {
          e = e.substring(n.raw.length), i = t[t.length - 1], i && n.type === "text" && i.type === "text" ? (i.raw += n.raw, i.text += n.text) : t.push(n);
          continue;
        }
        if (n = this.tokenizer.link(e)) {
          e = e.substring(n.raw.length), t.push(n);
          continue;
        }
        if (n = this.tokenizer.reflink(e, this.tokens.links)) {
          e = e.substring(n.raw.length), i = t[t.length - 1], i && n.type === "text" && i.type === "text" ? (i.raw += n.raw, i.text += n.text) : t.push(n);
          continue;
        }
        if (n = this.tokenizer.emStrong(e, o, m)) {
          e = e.substring(n.raw.length), t.push(n);
          continue;
        }
        if (n = this.tokenizer.codespan(e)) {
          e = e.substring(n.raw.length), t.push(n);
          continue;
        }
        if (n = this.tokenizer.br(e)) {
          e = e.substring(n.raw.length), t.push(n);
          continue;
        }
        if (n = this.tokenizer.del(e)) {
          e = e.substring(n.raw.length), t.push(n);
          continue;
        }
        if (n = this.tokenizer.autolink(e)) {
          e = e.substring(n.raw.length), t.push(n);
          continue;
        }
        if (!this.state.inLink && (n = this.tokenizer.url(e))) {
          e = e.substring(n.raw.length), t.push(n);
          continue;
        }
        if (s = e, this.options.extensions && this.options.extensions.startInline) {
          let h = 1 / 0;
          const b = e.slice(1);
          let T;
          this.options.extensions.startInline.forEach((y) => {
            T = y.call({ lexer: this }, b), typeof T == "number" && T >= 0 && (h = Math.min(h, T));
          }), h < 1 / 0 && h >= 0 && (s = e.substring(0, h + 1));
        }
        if (n = this.tokenizer.inlineText(s)) {
          e = e.substring(n.raw.length), n.raw.slice(-1) !== "_" && (m = n.raw.slice(-1)), u = !0, i = t[t.length - 1], i && i.type === "text" ? (i.raw += n.raw, i.text += n.text) : t.push(n);
          continue;
        }
        if (e) {
          const h = "Infinite loop on byte: " + e.charCodeAt(0);
          if (this.options.silent) {
            console.error(h);
            break;
          } else
            throw new Error(h);
        }
      }
    return t;
  }
}
class at {
  // set by the parser
  constructor(e) {
    E(this, "options");
    E(this, "parser");
    this.options = e || be;
  }
  space(e) {
    return "";
  }
  code({ text: e, lang: t, escaped: n }) {
    var o;
    const i = (o = (t || "").match(/^\S*/)) == null ? void 0 : o[0], s = e.replace(/\n$/, "") + `
`;
    return i ? '<pre><code class="language-' + Y(i) + '">' + (n ? s : Y(s, !0)) + `</code></pre>
` : "<pre><code>" + (n ? s : Y(s, !0)) + `</code></pre>
`;
  }
  blockquote({ tokens: e }) {
    return `<blockquote>
${this.parser.parse(e)}</blockquote>
`;
  }
  html({ text: e }) {
    return e;
  }
  heading({ tokens: e, depth: t }) {
    return `<h${t}>${this.parser.parseInline(e)}</h${t}>
`;
  }
  hr(e) {
    return `<hr>
`;
  }
  list(e) {
    const t = e.ordered, n = e.start;
    let i = "";
    for (let c = 0; c < e.items.length; c++) {
      const u = e.items[c];
      i += this.listitem(u);
    }
    const s = t ? "ol" : "ul", o = t && n !== 1 ? ' start="' + n + '"' : "";
    return "<" + s + o + `>
` + i + "</" + s + `>
`;
  }
  listitem(e) {
    let t = "";
    if (e.task) {
      const n = this.checkbox({ checked: !!e.checked });
      e.loose ? e.tokens.length > 0 && e.tokens[0].type === "paragraph" ? (e.tokens[0].text = n + " " + e.tokens[0].text, e.tokens[0].tokens && e.tokens[0].tokens.length > 0 && e.tokens[0].tokens[0].type === "text" && (e.tokens[0].tokens[0].text = n + " " + e.tokens[0].tokens[0].text)) : e.tokens.unshift({
        type: "text",
        raw: n + " ",
        text: n + " "
      }) : t += n + " ";
    }
    return t += this.parser.parse(e.tokens, !!e.loose), `<li>${t}</li>
`;
  }
  checkbox({ checked: e }) {
    return "<input " + (e ? 'checked="" ' : "") + 'disabled="" type="checkbox">';
  }
  paragraph({ tokens: e }) {
    return `<p>${this.parser.parseInline(e)}</p>
`;
  }
  table(e) {
    let t = "", n = "";
    for (let s = 0; s < e.header.length; s++)
      n += this.tablecell(e.header[s]);
    t += this.tablerow({ text: n });
    let i = "";
    for (let s = 0; s < e.rows.length; s++) {
      const o = e.rows[s];
      n = "";
      for (let c = 0; c < o.length; c++)
        n += this.tablecell(o[c]);
      i += this.tablerow({ text: n });
    }
    return i && (i = `<tbody>${i}</tbody>`), `<table>
<thead>
` + t + `</thead>
` + i + `</table>
`;
  }
  tablerow({ text: e }) {
    return `<tr>
${e}</tr>
`;
  }
  tablecell(e) {
    const t = this.parser.parseInline(e.tokens), n = e.header ? "th" : "td";
    return (e.align ? `<${n} align="${e.align}">` : `<${n}>`) + t + `</${n}>
`;
  }
  /**
   * span level renderer
   */
  strong({ tokens: e }) {
    return `<strong>${this.parser.parseInline(e)}</strong>`;
  }
  em({ tokens: e }) {
    return `<em>${this.parser.parseInline(e)}</em>`;
  }
  codespan({ text: e }) {
    return `<code>${e}</code>`;
  }
  br(e) {
    return "<br>";
  }
  del({ tokens: e }) {
    return `<del>${this.parser.parseInline(e)}</del>`;
  }
  link({ href: e, title: t, tokens: n }) {
    const i = this.parser.parseInline(n), s = Sn(e);
    if (s === null)
      return i;
    e = s;
    let o = '<a href="' + e + '"';
    return t && (o += ' title="' + t + '"'), o += ">" + i + "</a>", o;
  }
  image({ href: e, title: t, text: n }) {
    const i = Sn(e);
    if (i === null)
      return n;
    e = i;
    let s = `<img src="${e}" alt="${n}"`;
    return t && (s += ` title="${t}"`), s += ">", s;
  }
  text(e) {
    return "tokens" in e && e.tokens ? this.parser.parseInline(e.tokens) : e.text;
  }
}
class Wt {
  // no need for block level renderers
  strong({ text: e }) {
    return e;
  }
  em({ text: e }) {
    return e;
  }
  codespan({ text: e }) {
    return e;
  }
  del({ text: e }) {
    return e;
  }
  html({ text: e }) {
    return e;
  }
  text({ text: e }) {
    return e;
  }
  link({ text: e }) {
    return "" + e;
  }
  image({ text: e }) {
    return "" + e;
  }
  br() {
    return "";
  }
}
class J {
  constructor(e) {
    E(this, "options");
    E(this, "renderer");
    E(this, "textRenderer");
    this.options = e || be, this.options.renderer = this.options.renderer || new at(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new Wt();
  }
  /**
   * Static Parse Method
   */
  static parse(e, t) {
    return new J(t).parse(e);
  }
  /**
   * Static Parse Inline Method
   */
  static parseInline(e, t) {
    return new J(t).parseInline(e);
  }
  /**
   * Parse Loop
   */
  parse(e, t = !0) {
    let n = "";
    for (let i = 0; i < e.length; i++) {
      const s = e[i];
      if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[s.type]) {
        const c = s, u = this.options.extensions.renderers[c.type].call({ parser: this }, c);
        if (u !== !1 || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(c.type)) {
          n += u || "";
          continue;
        }
      }
      const o = s;
      switch (o.type) {
        case "space": {
          n += this.renderer.space(o);
          continue;
        }
        case "hr": {
          n += this.renderer.hr(o);
          continue;
        }
        case "heading": {
          n += this.renderer.heading(o);
          continue;
        }
        case "code": {
          n += this.renderer.code(o);
          continue;
        }
        case "table": {
          n += this.renderer.table(o);
          continue;
        }
        case "blockquote": {
          n += this.renderer.blockquote(o);
          continue;
        }
        case "list": {
          n += this.renderer.list(o);
          continue;
        }
        case "html": {
          n += this.renderer.html(o);
          continue;
        }
        case "paragraph": {
          n += this.renderer.paragraph(o);
          continue;
        }
        case "text": {
          let c = o, u = this.renderer.text(c);
          for (; i + 1 < e.length && e[i + 1].type === "text"; )
            c = e[++i], u += `
` + this.renderer.text(c);
          t ? n += this.renderer.paragraph({
            type: "paragraph",
            raw: u,
            text: u,
            tokens: [{ type: "text", raw: u, text: u }]
          }) : n += u;
          continue;
        }
        default: {
          const c = 'Token with "' + o.type + '" type was not found.';
          if (this.options.silent)
            return console.error(c), "";
          throw new Error(c);
        }
      }
    }
    return n;
  }
  /**
   * Parse Inline Tokens
   */
  parseInline(e, t) {
    t = t || this.renderer;
    let n = "";
    for (let i = 0; i < e.length; i++) {
      const s = e[i];
      if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[s.type]) {
        const c = this.options.extensions.renderers[s.type].call({ parser: this }, s);
        if (c !== !1 || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(s.type)) {
          n += c || "";
          continue;
        }
      }
      const o = s;
      switch (o.type) {
        case "escape": {
          n += t.text(o);
          break;
        }
        case "html": {
          n += t.html(o);
          break;
        }
        case "link": {
          n += t.link(o);
          break;
        }
        case "image": {
          n += t.image(o);
          break;
        }
        case "strong": {
          n += t.strong(o);
          break;
        }
        case "em": {
          n += t.em(o);
          break;
        }
        case "codespan": {
          n += t.codespan(o);
          break;
        }
        case "br": {
          n += t.br(o);
          break;
        }
        case "del": {
          n += t.del(o);
          break;
        }
        case "text": {
          n += t.text(o);
          break;
        }
        default: {
          const c = 'Token with "' + o.type + '" type was not found.';
          if (this.options.silent)
            return console.error(c), "";
          throw new Error(c);
        }
      }
    }
    return n;
  }
}
class Fe {
  constructor(e) {
    E(this, "options");
    E(this, "block");
    this.options = e || be;
  }
  /**
   * Process markdown before marked
   */
  preprocess(e) {
    return e;
  }
  /**
   * Process HTML after marked is finished
   */
  postprocess(e) {
    return e;
  }
  /**
   * Process all tokens before walk tokens
   */
  processAllTokens(e) {
    return e;
  }
  /**
   * Provide function to tokenize markdown
   */
  provideLexer() {
    return this.block ? K.lex : K.lexInline;
  }
  /**
   * Provide function to parse tokens
   */
  provideParser() {
    return this.block ? J.parse : J.parseInline;
  }
}
E(Fe, "passThroughHooks", /* @__PURE__ */ new Set([
  "preprocess",
  "postprocess",
  "processAllTokens"
]));
class gi {
  constructor(...e) {
    E(this, "defaults", $t());
    E(this, "options", this.setOptions);
    E(this, "parse", this.parseMarkdown(!0));
    E(this, "parseInline", this.parseMarkdown(!1));
    E(this, "Parser", J);
    E(this, "Renderer", at);
    E(this, "TextRenderer", Wt);
    E(this, "Lexer", K);
    E(this, "Tokenizer", ot);
    E(this, "Hooks", Fe);
    this.use(...e);
  }
  /**
   * Run callback for every token
   */
  walkTokens(e, t) {
    var i, s;
    let n = [];
    for (const o of e)
      switch (n = n.concat(t.call(this, o)), o.type) {
        case "table": {
          const c = o;
          for (const u of c.header)
            n = n.concat(this.walkTokens(u.tokens, t));
          for (const u of c.rows)
            for (const m of u)
              n = n.concat(this.walkTokens(m.tokens, t));
          break;
        }
        case "list": {
          const c = o;
          n = n.concat(this.walkTokens(c.items, t));
          break;
        }
        default: {
          const c = o;
          (s = (i = this.defaults.extensions) == null ? void 0 : i.childTokens) != null && s[c.type] ? this.defaults.extensions.childTokens[c.type].forEach((u) => {
            const m = c[u].flat(1 / 0);
            n = n.concat(this.walkTokens(m, t));
          }) : c.tokens && (n = n.concat(this.walkTokens(c.tokens, t)));
        }
      }
    return n;
  }
  use(...e) {
    const t = this.defaults.extensions || { renderers: {}, childTokens: {} };
    return e.forEach((n) => {
      const i = { ...n };
      if (i.async = this.defaults.async || i.async || !1, n.extensions && (n.extensions.forEach((s) => {
        if (!s.name)
          throw new Error("extension name required");
        if ("renderer" in s) {
          const o = t.renderers[s.name];
          o ? t.renderers[s.name] = function(...c) {
            let u = s.renderer.apply(this, c);
            return u === !1 && (u = o.apply(this, c)), u;
          } : t.renderers[s.name] = s.renderer;
        }
        if ("tokenizer" in s) {
          if (!s.level || s.level !== "block" && s.level !== "inline")
            throw new Error("extension level must be 'block' or 'inline'");
          const o = t[s.level];
          o ? o.unshift(s.tokenizer) : t[s.level] = [s.tokenizer], s.start && (s.level === "block" ? t.startBlock ? t.startBlock.push(s.start) : t.startBlock = [s.start] : s.level === "inline" && (t.startInline ? t.startInline.push(s.start) : t.startInline = [s.start]));
        }
        "childTokens" in s && s.childTokens && (t.childTokens[s.name] = s.childTokens);
      }), i.extensions = t), n.renderer) {
        const s = this.defaults.renderer || new at(this.defaults);
        for (const o in n.renderer) {
          if (!(o in s))
            throw new Error(`renderer '${o}' does not exist`);
          if (["options", "parser"].includes(o))
            continue;
          const c = o, u = n.renderer[c], m = s[c];
          s[c] = (...h) => {
            let b = u.apply(s, h);
            return b === !1 && (b = m.apply(s, h)), b || "";
          };
        }
        i.renderer = s;
      }
      if (n.tokenizer) {
        const s = this.defaults.tokenizer || new ot(this.defaults);
        for (const o in n.tokenizer) {
          if (!(o in s))
            throw new Error(`tokenizer '${o}' does not exist`);
          if (["options", "rules", "lexer"].includes(o))
            continue;
          const c = o, u = n.tokenizer[c], m = s[c];
          s[c] = (...h) => {
            let b = u.apply(s, h);
            return b === !1 && (b = m.apply(s, h)), b;
          };
        }
        i.tokenizer = s;
      }
      if (n.hooks) {
        const s = this.defaults.hooks || new Fe();
        for (const o in n.hooks) {
          if (!(o in s))
            throw new Error(`hook '${o}' does not exist`);
          if (["options", "block"].includes(o))
            continue;
          const c = o, u = n.hooks[c], m = s[c];
          Fe.passThroughHooks.has(o) ? s[c] = (h) => {
            if (this.defaults.async)
              return Promise.resolve(u.call(s, h)).then((T) => m.call(s, T));
            const b = u.call(s, h);
            return m.call(s, b);
          } : s[c] = (...h) => {
            let b = u.apply(s, h);
            return b === !1 && (b = m.apply(s, h)), b;
          };
        }
        i.hooks = s;
      }
      if (n.walkTokens) {
        const s = this.defaults.walkTokens, o = n.walkTokens;
        i.walkTokens = function(c) {
          let u = [];
          return u.push(o.call(this, c)), s && (u = u.concat(s.call(this, c))), u;
        };
      }
      this.defaults = { ...this.defaults, ...i };
    }), this;
  }
  setOptions(e) {
    return this.defaults = { ...this.defaults, ...e }, this;
  }
  lexer(e, t) {
    return K.lex(e, t ?? this.defaults);
  }
  parser(e, t) {
    return J.parse(e, t ?? this.defaults);
  }
  parseMarkdown(e) {
    return (n, i) => {
      const s = { ...i }, o = { ...this.defaults, ...s }, c = this.onError(!!o.silent, !!o.async);
      if (this.defaults.async === !0 && s.async === !1)
        return c(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
      if (typeof n > "u" || n === null)
        return c(new Error("marked(): input parameter is undefined or null"));
      if (typeof n != "string")
        return c(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(n) + ", string expected"));
      o.hooks && (o.hooks.options = o, o.hooks.block = e);
      const u = o.hooks ? o.hooks.provideLexer() : e ? K.lex : K.lexInline, m = o.hooks ? o.hooks.provideParser() : e ? J.parse : J.parseInline;
      if (o.async)
        return Promise.resolve(o.hooks ? o.hooks.preprocess(n) : n).then((h) => u(h, o)).then((h) => o.hooks ? o.hooks.processAllTokens(h) : h).then((h) => o.walkTokens ? Promise.all(this.walkTokens(h, o.walkTokens)).then(() => h) : h).then((h) => m(h, o)).then((h) => o.hooks ? o.hooks.postprocess(h) : h).catch(c);
      try {
        o.hooks && (n = o.hooks.preprocess(n));
        let h = u(n, o);
        o.hooks && (h = o.hooks.processAllTokens(h)), o.walkTokens && this.walkTokens(h, o.walkTokens);
        let b = m(h, o);
        return o.hooks && (b = o.hooks.postprocess(b)), b;
      } catch (h) {
        return c(h);
      }
    };
  }
  onError(e, t) {
    return (n) => {
      if (n.message += `
Please report this to https://github.com/markedjs/marked.`, e) {
        const i = "<p>An error occurred:</p><pre>" + Y(n.message + "", !0) + "</pre>";
        return t ? Promise.resolve(i) : i;
      }
      if (t)
        return Promise.reject(n);
      throw n;
    };
  }
}
const ge = new gi();
function _(a, e) {
  return ge.parse(a, e);
}
_.options = _.setOptions = function(a) {
  return ge.setOptions(a), _.defaults = ge.defaults, Gn(_.defaults), _;
};
_.getDefaults = $t;
_.defaults = be;
_.use = function(...a) {
  return ge.use(...a), _.defaults = ge.defaults, Gn(_.defaults), _;
};
_.walkTokens = function(a, e) {
  return ge.walkTokens(a, e);
};
_.parseInline = ge.parseInline;
_.Parser = J;
_.parser = J.parse;
_.Renderer = at;
_.TextRenderer = Wt;
_.Lexer = K;
_.lexer = K.lex;
_.Tokenizer = ot;
_.Hooks = Fe;
_.parse = _;
_.options;
_.setOptions;
_.use;
_.walkTokens;
_.parseInline;
J.parse;
K.lex;
/*! @license DOMPurify 3.4.15 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.4.15/LICENSE */
function In(a, e) {
  (e == null || e > a.length) && (e = a.length);
  for (var t = 0, n = Array(e); t < e; t++) n[t] = a[t];
  return n;
}
function bi(a) {
  if (Array.isArray(a)) return a;
}
function ki(a, e) {
  var t = a == null ? null : typeof Symbol < "u" && a[Symbol.iterator] || a["@@iterator"];
  if (t != null) {
    var n, i, s, o, c = [], u = !0, m = !1;
    try {
      if (s = (t = t.call(a)).next, e !== 0) for (; !(u = (n = s.call(t)).done) && (c.push(n.value), c.length !== e); u = !0) ;
    } catch (h) {
      m = !0, i = h;
    } finally {
      try {
        if (!u && t.return != null && (o = t.return(), Object(o) !== o)) return;
      } finally {
        if (m) throw i;
      }
    }
    return c;
  }
}
function Ti() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function xi(a, e) {
  return bi(a) || ki(a, e) || yi(a, e) || Ti();
}
function yi(a, e) {
  if (a) {
    if (typeof a == "string") return In(a, e);
    var t = {}.toString.call(a).slice(8, -1);
    return t === "Object" && a.constructor && (t = a.constructor.name), t === "Map" || t === "Set" ? Array.from(a) : t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? In(a, e) : void 0;
  }
}
const tr = Object.entries, Dn = Object.setPrototypeOf, wi = Object.isFrozen, _i = Object.getPrototypeOf, Ai = Object.getOwnPropertyDescriptor;
let P = Object.freeze, z = Object.seal, Ee = Object.create, nr = typeof Reflect < "u" && Reflect, zt = nr.apply, Mt = nr.construct;
P || (P = function(e) {
  return e;
});
z || (z = function(e) {
  return e;
});
zt || (zt = function(e, t) {
  for (var n = arguments.length, i = new Array(n > 2 ? n - 2 : 0), s = 2; s < n; s++)
    i[s - 2] = arguments[s];
  return e.apply(t, i);
});
Mt || (Mt = function(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
    n[i - 1] = arguments[i];
  return new e(...n);
});
const me = C(Array.prototype.forEach), Ei = C(Array.prototype.lastIndexOf), Nn = C(Array.prototype.pop), Pe = C(Array.prototype.push), Si = C(Array.prototype.splice), Se = Array.isArray, ve = C(String.prototype.toLowerCase), Ot = C(String.prototype.toString), Cn = C(String.prototype.match), ze = C(String.prototype.replace), Pn = C(String.prototype.indexOf), Ri = C(String.prototype.trim), Oi = C(Number.prototype.toString), Li = C(Boolean.prototype.toString), zn = typeof BigInt > "u" ? null : C(BigInt.prototype.toString), Mn = typeof Symbol > "u" ? null : C(Symbol.prototype.toString), W = C(Object.prototype.hasOwnProperty), Me = C(Object.prototype.toString), $ = C(RegExp.prototype.test), de = Ii(TypeError);
function C(a) {
  return function(e) {
    e instanceof RegExp && (e.lastIndex = 0);
    for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
      n[i - 1] = arguments[i];
    return zt(a, e, n);
  };
}
function Ii(a) {
  return function() {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
      t[n] = arguments[n];
    return Mt(a, t);
  };
}
function x(a, e) {
  let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : ve;
  if (Dn && Dn(a, null), !Se(e))
    return a;
  let n = e.length;
  for (; n--; ) {
    let i = e[n];
    if (typeof i == "string") {
      const s = t(i);
      s !== i && (wi(e) || (e[n] = s), i = s);
    }
    a[i] = !0;
  }
  return a;
}
function Di(a) {
  for (let e = 0; e < a.length; e++)
    W(a, e) || (a[e] = null);
  return a;
}
function q(a) {
  const e = Ee(null);
  for (const n of tr(a)) {
    var t = xi(n, 2);
    const i = t[0], s = t[1];
    W(a, i) && (Se(s) ? e[i] = Di(s) : s && typeof s == "object" && s.constructor === Object ? e[i] = q(s) : e[i] = s);
  }
  return e;
}
function Ni(a) {
  switch (typeof a) {
    case "string":
      return a;
    case "number":
      return Oi(a);
    case "boolean":
      return Li(a);
    case "bigint":
      return zn ? zn(a) : "0";
    case "symbol":
      return Mn ? Mn(a) : "Symbol()";
    case "undefined":
      return Me(a);
    case "function":
    case "object": {
      if (a === null)
        return Me(a);
      const e = a, t = Q(e, "toString");
      if (typeof t == "function") {
        const n = t(e);
        return typeof n == "string" ? n : Me(n);
      }
      return Me(a);
    }
    default:
      return Me(a);
  }
}
function Q(a, e) {
  for (; a !== null; ) {
    const n = Ai(a, e);
    if (n) {
      if (n.get)
        return C(n.get);
      if (typeof n.value == "function")
        return C(n.value);
    }
    a = _i(a);
  }
  function t() {
    return null;
  }
  return t;
}
function Ci(a) {
  try {
    return $(a, ""), !0;
  } catch {
    return !1;
  }
}
const $n = P(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), Lt = P(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), It = P(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), Pi = P(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), Dt = P(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), zi = P(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), vn = P(["#text"]), Un = P(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "command", "commandfor", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns"]), Nt = P(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dominant-baseline", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "pointer-events", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-orientation", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "vector-effect", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), Fn = P(["accent", "accentunder", "align", "bevelled", "close", "columnalign", "columnlines", "columnspacing", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lquote", "lspace", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), it = P(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), Mi = z(/{{[\w\W]*|^[\w\W]*}}/g), $i = z(/<%[\w\W]*|^[\w\W]*%>/g), vi = z(/\${[\w\W]*/g), Ui = z(/^data-[\-\w.\u00B7-\uFFFF]+$/), Fi = z(/^aria-[\-\w]+$/), Bn = z(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), Bi = z(/^(?:\w+script|data):/i), Hi = z(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), Wi = z(/^html$/i), ji = z(/^[a-z][.\w]*(-[.\w]+)+$/i), Hn = z(/<[/\w!]/g), Wn = z(/<[/\w]/g), Gi = z(/<\/no(script|embed|frames)/i), qi = z(/\/>/i), G = {
  element: 1,
  attribute: 2,
  text: 3,
  cdataSection: 4,
  entityReference: 5,
  // Deprecated
  entityNode: 6,
  // Deprecated
  processingInstruction: 7,
  comment: 8,
  document: 9,
  documentType: 10,
  documentFragment: 11,
  notation: 12
  // Deprecated
}, rr = ["style", "script", "xmp", "iframe", "noembed", "noframes", "plaintext", "noscript"], Yi = P(x({}, rr)), Zi = function() {
  const a = {};
  return me(rr, (e) => {
    a[e] = z(new RegExp("</" + e + "(?=[\\t\\n\\f\\r />])", "i"));
  }), P(a);
}(), Xi = function() {
  return typeof window > "u" ? null : window;
}, Vi = function(e, t) {
  if (typeof e != "object" || typeof e.createPolicy != "function")
    return null;
  let n = null;
  const i = "data-tt-policy-suffix";
  t && t.hasAttribute(i) && (n = t.getAttribute(i));
  const s = "dompurify" + (n ? "#" + n : "");
  try {
    return e.createPolicy(s, {
      createHTML(o) {
        return o;
      },
      createScriptURL(o) {
        return o;
      }
    });
  } catch {
    return console.warn("TrustedTypes policy " + s + " could not be created."), null;
  }
}, jn = function() {
  return {
    afterSanitizeAttributes: [],
    afterSanitizeElements: [],
    afterSanitizeShadowDOM: [],
    beforeSanitizeAttributes: [],
    beforeSanitizeElements: [],
    beforeSanitizeShadowDOM: [],
    uponSanitizeAttribute: [],
    uponSanitizeElement: [],
    uponSanitizeShadowNode: []
  };
}, ae = function(e, t, n, i) {
  return W(e, t) && Se(e[t]) ? x(i.base ? q(i.base) : {}, e[t], i.transform) : n;
}, Ct = function(e, t, n) {
  const i = W(e, t) ? e[t] : void 0;
  return i && typeof i == "object" ? q(i) : n();
};
function ir() {
  let a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Xi();
  const e = (f) => ir(f);
  if (e.version = "3.4.15", e.removed = [], !a || !a.document || a.document.nodeType !== G.document || !a.Element)
    return e.isSupported = !1, e;
  let t = a.document;
  const n = t, i = n.currentScript;
  a.DocumentFragment;
  const s = a.HTMLTemplateElement, o = a.Node, c = a.Element, u = a.NodeFilter, m = a.NamedNodeMap;
  m === void 0 && (a.NamedNodeMap || a.MozNamedAttrMap), a.HTMLFormElement;
  const h = a.DOMParser, b = a.trustedTypes, T = c.prototype, y = Q(T, "cloneNode"), w = Q(T, "remove"), M = Q(T, "removeAttributeNode"), U = Q(T, "nextSibling"), Z = Q(T, "childNodes"), R = Q(T, "parentNode"), j = Q(T, "shadowRoot"), X = Q(T, "attributes"), ee = o && o.prototype ? Q(o.prototype, "nodeType") : null, V = o && o.prototype ? Q(o.prototype, "nodeName") : null, te = o && o.prototype ? Q(o.prototype, "ownerDocument") : null, Re = function(r) {
    return ee ? ee(r) : r.nodeType;
  }, ut = function(r) {
    return V ? V(r) : r.nodeName;
  };
  if (typeof s == "function") {
    const f = t.createElement("template");
    f.content && f.content.ownerDocument && (t = f.content.ownerDocument);
  }
  let F, ce = "", pt, jt = !1, Oe = 0;
  const Gt = function() {
    if (Oe > 0)
      throw de('A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.');
  }, ke = function(r) {
    Gt(), Oe++;
    try {
      return F.createHTML(r);
    } finally {
      Oe--;
    }
  }, or = function(r) {
    Gt(), Oe++;
    try {
      return F.createScriptURL(r);
    } finally {
      Oe--;
    }
  }, lr = function() {
    return jt || (pt = Vi(b, i), jt = !0), pt;
  }, We = t, ft = We.implementation, qt = We.createNodeIterator, ar = We.createDocumentFragment, cr = We.getElementsByTagName, ur = n.importNode;
  let O = jn();
  e.isSupported = typeof tr == "function" && typeof R == "function" && ft && ft.createHTMLDocument !== void 0;
  const pr = Mi, fr = $i, hr = vi, dr = Ui, mr = Fi, gr = Bi, Yt = Hi, br = ji;
  let Zt = Bn, L = null;
  const ht = x({}, [...$n, ...Lt, ...It, ...Dt, ...vn]);
  let I = null;
  const dt = x({}, [...Un, ...Nt, ...Fn, ...it]);
  let ne = Object.seal(Ee(null, {
    tagNameCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    },
    attributeNameCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    },
    allowCustomizedBuiltInElements: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: !1
    }
  })), Le = null, Xt = null;
  const se = Object.seal(Ee(null, {
    tagCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    },
    attributeCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    }
  }));
  let Vt = !0, mt = !0, Qt = !1, Kt = !0, oe = !1, ue = !0, pe = !1, gt = !1, je = null, Ge = null, bt = !1, Te = !1, qe = !1, Ye = !1, Jt = !0, en = !1;
  const tn = "user-content-";
  let kt = !0, Tt = !1, xe = {}, ye = null;
  const nn = x({}, [
    "annotation-xml",
    "audio",
    "colgroup",
    "desc",
    "foreignobject",
    "head",
    "iframe",
    "math",
    "mi",
    "mn",
    "mo",
    "ms",
    "mtext",
    "noembed",
    "noframes",
    "noscript",
    "plaintext",
    "script",
    // <selectedcontent> mirrors the selected <option>'s subtree, cloned by
    // the UA (customizable <select>) — including any on* handlers — and the
    // engine re-mirrors synchronously whenever a removal changes which
    // option/selectedcontent is current, even inside DOMPurify's inert
    // DOMParser document. Hoisting its children on removal re-inserts a fresh
    // mirror target ahead of the walk, which the engine refills, looping
    // forever (DoS) and amplifying output. Dropping its content on removal
    // (rather than hoisting) breaks that cascade; the content is a duplicate
    // of the option, which is sanitized on its own. See campaign-3 F1/F6.
    "selectedcontent",
    "style",
    "svg",
    "template",
    "thead",
    "title",
    "video",
    "xmp"
  ]);
  let rn = null;
  const sn = x({}, ["audio", "video", "img", "source", "image", "track"]);
  let on = null;
  const ln = x({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), Ze = "http://www.w3.org/1998/Math/MathML", Xe = "http://www.w3.org/2000/svg", re = "http://www.w3.org/1999/xhtml";
  let we = re, xt = !1, yt = null;
  const kr = x({}, [Ze, Xe, re], Ot), an = P(["mi", "mo", "mn", "ms", "mtext"]);
  let wt = x({}, an);
  const cn = P(["annotation-xml"]);
  let _t = x({}, cn);
  const Tr = x({}, ["title", "style", "font", "a", "script"]);
  let Ie = null;
  const xr = ["application/xhtml+xml", "text/html"], yr = "text/html";
  let N = null, _e = null;
  const wr = t.createElement("form"), un = function(r) {
    return r instanceof RegExp || r instanceof Function;
  }, At = function() {
    let r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (_e && _e === r)
      return;
    (!r || typeof r != "object") && (r = {}), r = q(r), Ie = // eslint-disable-next-line unicorn/prefer-includes
    xr.indexOf(r.PARSER_MEDIA_TYPE) === -1 ? yr : r.PARSER_MEDIA_TYPE, N = Ie === "application/xhtml+xml" ? Ot : ve, L = ae(r, "ALLOWED_TAGS", ht, {
      transform: N
    }), I = ae(r, "ALLOWED_ATTR", dt, {
      transform: N
    }), yt = ae(r, "ALLOWED_NAMESPACES", kr, {
      transform: Ot
    }), on = ae(r, "ADD_URI_SAFE_ATTR", ln, {
      transform: N,
      base: ln
    }), rn = ae(r, "ADD_DATA_URI_TAGS", sn, {
      transform: N,
      base: sn
    }), ye = ae(r, "FORBID_CONTENTS", nn, {
      transform: N
    }), Le = ae(r, "FORBID_TAGS", q({}), {
      transform: N
    }), Xt = ae(r, "FORBID_ATTR", q({}), {
      transform: N
    }), xe = W(r, "USE_PROFILES") ? r.USE_PROFILES && typeof r.USE_PROFILES == "object" ? q(r.USE_PROFILES) : r.USE_PROFILES : !1, Vt = r.ALLOW_ARIA_ATTR !== !1, mt = r.ALLOW_DATA_ATTR !== !1, Qt = r.ALLOW_UNKNOWN_PROTOCOLS || !1, Kt = r.ALLOW_SELF_CLOSE_IN_ATTR !== !1, oe = r.SAFE_FOR_TEMPLATES || !1, ue = r.SAFE_FOR_XML !== !1, pe = r.WHOLE_DOCUMENT || !1, Te = r.RETURN_DOM || !1, qe = r.RETURN_DOM_FRAGMENT || !1, Ye = r.RETURN_TRUSTED_TYPE || !1, bt = r.FORCE_BODY || !1, Jt = r.SANITIZE_DOM !== !1, en = r.SANITIZE_NAMED_PROPS || !1, kt = r.KEEP_CONTENT !== !1, Tt = r.IN_PLACE || !1, Zt = Ci(r.ALLOWED_URI_REGEXP) ? r.ALLOWED_URI_REGEXP : Bn, we = typeof r.NAMESPACE == "string" ? r.NAMESPACE : re, wt = Ct(
      r,
      "MATHML_TEXT_INTEGRATION_POINTS",
      () => x({}, an)
      // Default built-in map
    ), _t = Ct(
      r,
      "HTML_INTEGRATION_POINTS",
      () => x({}, cn)
      // Default built-in map
    );
    const l = Ct(r, "CUSTOM_ELEMENT_HANDLING", () => Ee(null));
    if (ne = Ee(null), W(l, "tagNameCheck") && un(l.tagNameCheck) && (ne.tagNameCheck = l.tagNameCheck), W(l, "attributeNameCheck") && un(l.attributeNameCheck) && (ne.attributeNameCheck = l.attributeNameCheck), W(l, "allowCustomizedBuiltInElements") && typeof l.allowCustomizedBuiltInElements == "boolean" && (ne.allowCustomizedBuiltInElements = l.allowCustomizedBuiltInElements), z(ne), oe && (mt = !1), qe && (Te = !0), xe && (L = x({}, vn), I = Ee(null), xe.html === !0 && (x(L, $n), x(I, Un)), xe.svg === !0 && (x(L, Lt), x(I, Nt), x(I, it)), xe.svgFilters === !0 && (x(L, It), x(I, Nt), x(I, it)), xe.mathMl === !0 && (x(L, Dt), x(I, Fn), x(I, it))), se.tagCheck = null, se.attributeCheck = null, W(r, "ADD_TAGS") && (typeof r.ADD_TAGS == "function" ? se.tagCheck = r.ADD_TAGS : Se(r.ADD_TAGS) && (L === ht && (L = q(L)), x(L, r.ADD_TAGS, N))), W(r, "ADD_ATTR") && (typeof r.ADD_ATTR == "function" ? se.attributeCheck = r.ADD_ATTR : Se(r.ADD_ATTR) && (I === dt && (I = q(I)), x(I, r.ADD_ATTR, N))), W(r, "ADD_FORBID_CONTENTS") && Se(r.ADD_FORBID_CONTENTS) && (ye === nn && (ye = q(ye)), x(ye, r.ADD_FORBID_CONTENTS, N)), kt && (L["#text"] = !0), pe && x(L, ["html", "head", "body"]), L.table && (x(L, ["tbody"]), delete Le.tbody), r.TRUSTED_TYPES_POLICY) {
      if (typeof r.TRUSTED_TYPES_POLICY.createHTML != "function")
        throw de('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
      if (typeof r.TRUSTED_TYPES_POLICY.createScriptURL != "function")
        throw de('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
      const p = F;
      F = r.TRUSTED_TYPES_POLICY;
      try {
        ce = ke("");
      } catch (d) {
        throw F = p, d;
      }
    } else r.TRUSTED_TYPES_POLICY === null ? (F = void 0, ce = "") : (F === void 0 && (F = lr()), F && typeof ce == "string" && (ce = ke("")));
    P && P(r), _e = r;
  }, pn = x({}, [...Lt, ...It, ...Pi]), fn = x({}, [...Dt, ...zi]), _r = function(r, l, p) {
    return l.namespaceURI === re ? r === "svg" : l.namespaceURI === Ze ? r === "svg" && (p === "annotation-xml" || wt[p]) : !!pn[r];
  }, Ar = function(r, l, p) {
    return l.namespaceURI === re ? r === "math" : l.namespaceURI === Xe ? r === "math" && _t[p] : !!fn[r];
  }, Er = function(r, l, p) {
    return l.namespaceURI === Xe && !_t[p] || l.namespaceURI === Ze && !wt[p] ? !1 : !fn[r] && (Tr[r] || !pn[r]);
  }, Sr = function(r) {
    let l = R(r);
    (!l || !l.tagName) && (l = {
      namespaceURI: we,
      tagName: "template"
    });
    const p = ve(r.tagName), d = ve(l.tagName);
    return yt[r.namespaceURI] ? r.namespaceURI === Xe ? _r(p, l, d) : r.namespaceURI === Ze ? Ar(p, l, d) : r.namespaceURI === re ? Er(p, l, d) : !!(Ie === "application/xhtml+xml" && yt[r.namespaceURI]) : !1;
  }, le = function(r) {
    Pe(e.removed, {
      element: r
    });
    try {
      R(r).removeChild(r);
    } catch {
      if (w(r), !R(r))
        throw de("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place");
    }
  }, hn = function(r, l, p) {
    try {
      M(r, l);
    } catch {
      try {
        r.removeAttribute(p);
      } catch {
      }
    }
  }, Ve = function(r) {
    Qe(r);
    const l = Z(r);
    if (l) {
      const d = [];
      me(l, (g) => {
        Pe(d, g);
      }), me(d, (g) => {
        try {
          w(g);
        } catch {
        }
      });
    }
    const p = X(r);
    if (p)
      for (let d = p.length - 1; d >= 0; --d) {
        const g = p[d], k = g && g.name;
        typeof k == "string" && hn(r, g, k);
      }
  }, fe = function(r, l, p) {
    if (!p)
      try {
        p = l.getAttributeNode(r);
      } catch {
        p = null;
      }
    Pe(e.removed, {
      attribute: p || null,
      from: l
    });
    try {
      p ? M(l, p) : l.removeAttribute(r);
    } catch {
      try {
        l.removeAttribute(r);
      } catch {
      }
    }
    if (r === "is")
      if (Te || qe)
        try {
          le(l);
        } catch {
        }
      else
        try {
          l.setAttribute(r, "");
        } catch {
        }
  }, Rr = function(r) {
    const l = X(r);
    if (l)
      for (let p = l.length - 1; p >= 0; --p) {
        const d = l[p], g = d && d.name;
        typeof g != "string" || I[N(g)] || hn(r, d, g);
      }
  }, Qe = function(r) {
    const l = [r];
    for (; l.length > 0; ) {
      const p = l.pop();
      Re(p) === G.element && Rr(p);
      const g = Z(p);
      if (g)
        for (let k = g.length - 1; k >= 0; --k)
          l.push(g[k]);
    }
  }, dn = function(r, l) {
    return ue ? r === "patchsrc" ? !0 : r === "for" && l !== "label" && l !== "output" : !1;
  }, Or = function(r) {
    if (!ue)
      return;
    const l = [r];
    for (; l.length > 0; ) {
      const p = l.pop(), d = Re(p);
      if (d === G.processingInstruction || d === G.comment && $(Wn, p.data)) {
        try {
          w(p);
        } catch {
        }
        continue;
      }
      if (d === G.element) {
        const k = p, S = N(ut(p));
        try {
          k.hasAttribute && k.hasAttribute("patchsrc") && k.removeAttribute("patchsrc"), k.hasAttribute && k.hasAttribute("for") && dn("for", S) && k.removeAttribute("for");
        } catch {
        }
      }
      const g = Z(p);
      if (g)
        for (let k = g.length - 1; k >= 0; --k)
          l.push(g[k]);
    }
  }, mn = function(r) {
    let l = null, p = null;
    if (bt)
      r = "<remove></remove>" + r;
    else {
      const k = Cn(r, /^[\r\n\t ]+/);
      p = k && k[0];
    }
    Ie === "application/xhtml+xml" && we === re && (r = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + r + "</body></html>");
    const d = F ? ke(r) : r;
    if (we === re)
      try {
        l = new h().parseFromString(d, Ie);
      } catch {
      }
    if (!l || !l.documentElement) {
      l = ft.createDocument(we, "template", null);
      try {
        l.documentElement.innerHTML = xt ? ce : d;
      } catch {
      }
    }
    const g = l.body || l.documentElement;
    return r && p && g.insertBefore(t.createTextNode(p), g.childNodes[0] || null), we === re ? cr.call(l, pe ? "html" : "body")[0] : pe ? l.documentElement : g;
  }, gn = function(r) {
    const l = te ? te(r) : r.ownerDocument;
    return qt.call(
      l || r,
      r,
      // eslint-disable-next-line no-bitwise
      u.SHOW_ELEMENT | u.SHOW_COMMENT | u.SHOW_TEXT | u.SHOW_PROCESSING_INSTRUCTION | u.SHOW_CDATA_SECTION,
      null
    );
  }, Ke = function(r) {
    return r = ze(r, pr, " "), r = ze(r, fr, " "), r = ze(r, hr, " "), r;
  }, Et = function(r) {
    var l;
    r.normalize();
    const p = te ? te(r) : r.ownerDocument, d = qt.call(
      p || r,
      r,
      // eslint-disable-next-line no-bitwise
      u.SHOW_TEXT | u.SHOW_COMMENT | u.SHOW_CDATA_SECTION | u.SHOW_PROCESSING_INSTRUCTION,
      null
    );
    let g = d.nextNode();
    for (; g; )
      g.data = Ke(g.data), g = d.nextNode();
    const k = (l = r.querySelectorAll) === null || l === void 0 ? void 0 : l.call(r, "template");
    k && me(k, (S) => {
      Ae(S.content) && Et(S.content);
    });
  }, Je = function(r) {
    const l = V ? V(r) : null;
    return typeof l != "string" || N(l) !== "form" ? !1 : typeof r.nodeName != "string" || typeof r.textContent != "string" || typeof r.removeChild != "function" || // Realm-safe NamedNodeMap detection: equality against the cached
    // prototype getter. Clobbered .attributes (e.g. <input name="attributes">)
    // makes the direct read diverge from the cached read; a clean form
    // (same-realm OR foreign-realm) has both reads pointing at the same
    // canonical NamedNodeMap.
    r.attributes !== X(r) || typeof r.removeAttribute != "function" || // A form descendant named "removeAttributeNode" or "getAttributeNode"
    // shadows these Attr-node methods via [LegacyOverrideBuiltIns].
    // _removeAttribute() / _stripAttributeNode() reach for
    // element.removeAttributeNode(attr) first; when it is shadowed the call
    // throws and the name-based fallback element.removeAttribute(name)
    // ASCII-lowercases its lookup key in an HTML document, silently missing
    // a case-preserved event-handler attribute (e.g. an ONANIMATIONSTART
    // that reached the sanitizer through an XML/XHTML parse). Flag the form
    // so it is removed wholesale, exactly as for the other shadowed methods.
    typeof r.removeAttributeNode != "function" || typeof r.getAttributeNode != "function" || typeof r.setAttribute != "function" || typeof r.namespaceURI != "string" || typeof r.insertBefore != "function" || typeof r.hasChildNodes != "function" || // NodeType clobbering probe. Cached Node.prototype.nodeType getter
    // returns the integer 1 for any Element regardless of realm; direct
    // read on a clobbered form (e.g. <input name="nodeType">) returns
    // the named child element. Cheap addition — nodeType is read from
    // an internal slot, no serialization cost — and removes a residual
    // clobbering surface used by several mXSS / PI / comment branches
    // in _sanitizeElements that compare currentNode.nodeType directly.
    r.nodeType !== ee(r) || // HTMLFormElement has [LegacyOverrideBuiltIns]: a descendant named
    // "childNodes" shadows the prototype getter. Direct reads of
    // form.childNodes from a clobbered form return the named child
    // instead of the real NodeList, so any walk that reads it directly
    // skips the form's real children. Compare the direct read to the
    // cached Node.prototype getter — when the form's named-property
    // getter intercepts the read, the two values differ and we flag
    // the form. This catches every clobbering child type (input,
    // select, etc.) regardless of whether the named child happens to
    // carry a numeric .length, which a typeof-based probe would miss
    // (e.g. HTMLSelectElement.length is a defined unsigned-long).
    r.childNodes !== Z(r);
  }, Ae = function(r) {
    if (!ee || typeof r != "object" || r === null)
      return !1;
    try {
      return ee(r) === G.documentFragment;
    } catch {
      return !1;
    }
  }, De = function(r) {
    if (!ee || typeof r != "object" || r === null)
      return !1;
    try {
      return typeof ee(r) == "number";
    } catch {
      return !1;
    }
  };
  function ie(f, r, l) {
    f.length !== 0 && me(f, (p) => {
      p.call(e, r, l, _e);
    });
  }
  const Lr = function(r, l) {
    return !!(ue && r.hasChildNodes() && !De(r.firstElementChild) && $(Hn, r.textContent) && $(Hn, r.innerHTML) || ue && r.namespaceURI === re && Yi[l] && (De(r.firstElementChild) || typeof r.textContent == "string" && $(Zi[l], r.textContent)) || r.nodeType === G.processingInstruction || ue && r.nodeType === G.comment && $(Wn, r.data));
  }, et = function(r, l) {
    if (r instanceof RegExp)
      return $(r, l);
    if (r instanceof Function) {
      for (var p = arguments.length, d = new Array(p > 2 ? p - 2 : 0), g = 2; g < p; g++)
        d[g - 2] = arguments[g];
      return !!r(l, ...d);
    }
    return !1;
  }, Ir = function(r, l, p) {
    if (!Le[l] && yn(l) && et(ne.tagNameCheck, l))
      return !1;
    if (kt && !ye[l]) {
      const d = R(r), g = Z(r);
      if (g && d) {
        const k = g.length;
        for (let S = k - 1; S >= 0; --S) {
          const D = r === p ? y(g[S], !0) : g[S];
          d.insertBefore(D, U(r));
        }
      }
    }
    return le(r), !0;
  }, bn = function(r, l, p, d) {
    return r.length === 0 ? l : l === p || l === d ? q(l) : l;
  }, kn = function(r, l) {
    return r === l || R(r) !== null ? !1 : (Tt && Qe(r), !0);
  }, Tn = function(r, l) {
    if (ie(O.beforeSanitizeElements, r, null), kn(r, l))
      return !0;
    if (Je(r))
      return le(r), !0;
    const p = N(ut(r));
    if (L = bn(O.uponSanitizeElement, L, ht, je), ie(O.uponSanitizeElement, r, {
      tagName: p,
      allowedTags: L
    }), kn(r, l))
      return !0;
    if (Lr(r, p))
      return le(r), !0;
    if (Le[p] || !(se.tagCheck instanceof Function && se.tagCheck(p)) && !L[p]) {
      const g = Ir(r, p, l);
      return g === !1 && ie(O.afterSanitizeElements, r, null), g;
    }
    if (Re(r) === G.element && !Sr(r) || (p === "noscript" || p === "noembed" || p === "noframes") && $(Gi, r.innerHTML))
      return le(r), !0;
    if (oe && r.nodeType === G.text) {
      const g = Ke(r.textContent);
      r.textContent !== g && (Pe(e.removed, {
        element: r.cloneNode()
      }), r.textContent = g);
    }
    return ie(O.afterSanitizeElements, r, null), !1;
  }, xn = function(r, l, p) {
    if (Xt[l] || dn(l, r) || Jt && (l === "id" || l === "name") && (p in t || p in wr))
      return !1;
    const d = I[l] || se.attributeCheck instanceof Function && se.attributeCheck(l, r);
    return mt && $(dr, l) || Vt && $(mr, l) ? !0 : d ? on[l] || $(Zt, ze(p, Yt, "")) || (l === "src" || l === "xlink:href" || l === "href") && r !== "script" && Pn(p, "data:") === 0 && rn[r] || Qt && !$(gr, ze(p, Yt, "")) ? !0 : !p : (
      // Condition a) covers a basically valid custom element tag name whose
      // tag passes the configured tagNameCheck and whose attribute name
      // passes the configured attributeNameCheck ...
      yn(r) && et(ne.tagNameCheck, r) && et(ne.attributeNameCheck, l, r) || // Condition b) covers an `is` attribute whose value passes the
      // configured tagNameCheck while customized built-in elements are
      // allowed.
      l === "is" && ne.allowCustomizedBuiltInElements && et(ne.tagNameCheck, p)
    );
  }, Dr = x({}, ["annotation-xml", "color-profile", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "missing-glyph"]), yn = function(r) {
    return !Dr[ve(r)] && $(br, r);
  }, Nr = function(r, l, p, d) {
    if (F && typeof b == "object" && typeof b.getAttributeType == "function" && !p)
      switch (b.getAttributeType(r, l)) {
        case "TrustedHTML":
          return ke(d);
        case "TrustedScriptURL":
          return or(d);
      }
    return d;
  }, Cr = function(r, l, p, d) {
    try {
      return p ? r.setAttributeNS(p, l, d) : r.setAttribute(l, d), Je(r) ? (le(r), !1) : !0;
    } catch {
      return fe(l, r), !1;
    }
  }, wn = function(r) {
    ie(O.beforeSanitizeAttributes, r, null);
    const l = r.attributes;
    if (!l || Je(r))
      return;
    I = bn(O.uponSanitizeAttribute, I, dt, Ge);
    const p = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: I,
      forceKeepAttr: void 0
    };
    let d = l.length;
    const g = N(r.nodeName);
    for (; d--; ) {
      const k = l[d], S = k.name, D = k.namespaceURI, B = k.value, H = N(S), Rt = B;
      let v = S === "value" ? Rt : Ri(Rt), _n = !1;
      if (p.attrName = H, p.attrValue = v, p.keepAttr = !0, p.forceKeepAttr = void 0, ie(O.uponSanitizeAttribute, r, p), v = p.attrValue, en && (H === "id" || H === "name") && Pn(v, tn) !== 0 && (fe(S, r, k), v = tn + v, _n = !0), ue && $(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i, v)) {
        fe(S, r, k);
        continue;
      }
      if (H === "attributename" && Cn(v, "href")) {
        fe(S, r, k);
        continue;
      }
      if (!p.forceKeepAttr) {
        if (!p.keepAttr) {
          fe(S, r, k);
          continue;
        }
        if (!Kt && $(qi, v)) {
          fe(S, r, k);
          continue;
        }
        if (oe && (v = Ke(v)), !xn(g, H, v)) {
          fe(S, r, k);
          continue;
        }
        v = Nr(g, H, D, v), v !== Rt && Cr(r, S, D, v) && _n && Nn(e.removed);
      }
    }
    ie(O.afterSanitizeAttributes, r, null);
  }, tt = function(r) {
    let l = null;
    const p = gn(r);
    for (ie(O.beforeSanitizeShadowDOM, r, null); l = p.nextNode(); )
      if (ie(O.uponSanitizeShadowNode, l, null), Tn(l, r), wn(l), Ae(l.content) && tt(l.content), Re(l) === G.element) {
        const d = j(l);
        Ae(d) && (St(d), tt(d));
      }
    ie(O.afterSanitizeShadowDOM, r, null);
  }, St = function(r) {
    const l = [{
      node: r,
      shadow: null
    }];
    for (; l.length > 0; ) {
      const p = l.pop();
      if (p.shadow) {
        tt(p.shadow);
        continue;
      }
      const d = p.node, k = Re(d) === G.element, S = Z(d);
      if (S)
        for (let D = S.length - 1; D >= 0; --D)
          l.push({
            node: S[D],
            shadow: null
          });
      if (k) {
        const D = V ? V(d) : null;
        if (typeof D == "string" && N(D) === "template") {
          const B = d.content;
          Ae(B) && l.push({
            node: B,
            shadow: null
          });
        }
      }
      if (k) {
        const D = j(d);
        Ae(D) && l.push({
          node: null,
          shadow: D
        }, {
          node: D,
          shadow: null
        });
      }
    }
  };
  return e.sanitize = function(f) {
    let r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, l = null, p = null, d = null, g = null;
    if (xt = !f, xt && (f = "<!-->"), typeof f != "string" && !De(f) && (f = Ni(f), typeof f != "string"))
      throw de("dirty is not a string, aborting");
    if (!e.isSupported)
      return f;
    gt ? (L = je, I = Ge) : At(r), (O.uponSanitizeElement.length > 0 || O.uponSanitizeAttribute.length > 0) && (L = q(L)), O.uponSanitizeAttribute.length > 0 && (I = q(I)), e.removed = [];
    const k = Tt && typeof f != "string" && De(f);
    if (k) {
      Or(f);
      const B = ut(f);
      if (typeof B == "string") {
        const H = N(B);
        if (!L[H] || Le[H])
          throw Ve(f), de("root node is forbidden and cannot be sanitized in-place");
      }
      if (Je(f))
        throw Ve(f), de("root node is clobbered and cannot be sanitized in-place");
      try {
        St(f);
      } catch (H) {
        throw Ve(f), H;
      }
    } else if (De(f))
      l = mn("<!---->"), p = l.ownerDocument.importNode(f, !0), p.nodeType === G.element && p.nodeName === "BODY" || p.nodeName === "HTML" ? l = p : l.appendChild(p), St(l);
    else {
      if (!Te && !oe && !pe && // eslint-disable-next-line unicorn/prefer-includes
      f.indexOf("<") === -1)
        return F && Ye ? ke(f) : f;
      if (l = mn(f), !l)
        return Te ? null : Ye ? ce : "";
    }
    l && bt && le(l.firstChild);
    const S = k ? f : l;
    try {
      const B = gn(S);
      for (; d = B.nextNode(); )
        Tn(d, S), wn(d), Ae(d.content) && tt(d.content);
    } catch (B) {
      throw k && (Ve(f), me(e.removed, (H) => {
        H.element && Qe(H.element);
      })), B;
    }
    if (k)
      return me(e.removed, (B) => {
        B.element && Qe(B.element);
      }), oe && Et(f), f;
    if (Te) {
      if (oe && Et(l), qe)
        for (g = ar.call(l.ownerDocument); l.firstChild; )
          g.appendChild(l.firstChild);
      else
        g = l;
      return (I.shadowroot || I.shadowrootmode) && (g = ur.call(n, g, !0)), g;
    }
    let D = pe ? l.outerHTML : l.innerHTML;
    return pe && L["!doctype"] && l.ownerDocument && l.ownerDocument.doctype && l.ownerDocument.doctype.name && $(Wi, l.ownerDocument.doctype.name) && (D = "<!DOCTYPE " + l.ownerDocument.doctype.name + `>
` + D), oe && (D = Ke(D)), F && Ye ? ke(D) : D;
  }, e.setConfig = function() {
    let f = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    At(f), gt = !0, je = L, Ge = I;
  }, e.clearConfig = function() {
    _e = null, gt = !1, je = null, Ge = null, F = pt, ce = "";
  }, e.isValidAttribute = function(f, r, l) {
    _e || At({});
    const p = N(f), d = N(r);
    return xn(p, d, l);
  }, e.addHook = function(f, r) {
    typeof r == "function" && W(O, f) && Pe(O[f], r);
  }, e.removeHook = function(f, r) {
    if (W(O, f)) {
      if (r !== void 0) {
        const l = Ei(O[f], r);
        return l === -1 ? void 0 : Si(O[f], l, 1)[0];
      }
      return Nn(O[f]);
    }
  }, e.removeHooks = function(f) {
    W(O, f) && (O[f] = []);
  }, e.removeAllHooks = function() {
    O = jn();
  }, e;
}
var Qi = ir();
const sr = [
  { key: "bold", label: "B", title: "Bold" },
  { key: "italic", label: "I", title: "Italic" },
  { key: "h1", label: "H1", title: "Heading 1" },
  { key: "h2", label: "H2", title: "Heading 2" },
  { key: "link", label: "🔗", title: "Link" },
  { key: "ul", label: "•", title: "Bulleted list" },
  { key: "ol", label: "1.", title: "Numbered list" },
  { key: "code", label: "</>", title: "Code" },
  { key: "quote", label: "❝", title: "Quote" }
], Ki = sr.map((a) => a.key);
function st(a, e, t, n, i) {
  const s = a.slice(e.start, e.end) || i, o = a.slice(0, e.start), c = a.slice(e.end), u = `${o}${t}${s}${n}${c}`, m = o.length + t.length, h = m + s.length;
  return { next: u, selection: { start: m, end: h } };
}
function $e(a, e, t) {
  const i = a.slice(0, e.start).lastIndexOf(`
`) + 1;
  let s = a.indexOf(`
`, e.end);
  s === -1 && (s = a.length);
  const o = a.slice(i, s), u = o.split(`
`).map((T, y) => `${t(y)}${T}`).join(`
`), m = a.slice(0, i) + u + a.slice(s), h = e.start + t(0).length, b = e.end + (u.length - o.length);
  return { next: m, selection: { start: h, end: b } };
}
function Ji(a, e, t) {
  switch (a) {
    case "bold":
      return st(e, t, "**", "**", "bold text");
    case "italic":
      return st(e, t, "*", "*", "italic text");
    case "link": {
      const n = e.slice(t.start, t.end) || "link text", i = e.slice(0, t.start), s = e.slice(t.end), o = `${i}[${n}](https://)${s}`, c = i.length + n.length + 3, u = c + 8;
      return { next: o, selection: { start: c, end: u } };
    }
    case "code":
      return e.slice(t.start, t.end).includes(`
`) ? st(e, t, "```\n", "\n```", "code") : st(e, t, "`", "`", "code");
    case "h1":
      return $e(e, t, (n) => n === 0 ? "# " : "");
    case "h2":
      return $e(e, t, (n) => n === 0 ? "## " : "");
    case "quote":
      return $e(e, t, () => "> ");
    case "ul":
      return $e(e, t, () => "- ");
    case "ol":
      return $e(e, t, (n) => `${n + 1}. `);
    default:
      return { next: e, selection: t };
  }
}
function es(a) {
  const e = _.parse(a, { async: !1, breaks: !0 });
  return Qi.sanitize(e);
}
function ss({
  initialValue: a = "",
  onChange: e,
  toolbar: t = !0,
  previewMode: n = "live",
  className: i = "",
  placeholder: s = "Write some markdown…"
}) {
  const [o, c] = An(a), [u, m] = An("write"), h = Mr(null), b = Array.isArray(t) ? t : t ? Ki : [], T = $r(
    () => n === "none" ? "" : es(o),
    [o, n]
  );
  function y(R, j) {
    c(R), e == null || e(R), j && requestAnimationFrame(() => {
      const X = h.current;
      X && (X.focus(), X.setSelectionRange(j.start, j.end));
    });
  }
  function w(R) {
    y(R.target.value);
  }
  function M(R) {
    const j = h.current, X = j ? { start: j.selectionStart, end: j.selectionEnd } : { start: o.length, end: o.length }, { next: ee, selection: V } = Ji(R, o, X);
    y(ee, V);
  }
  const U = n !== "tab" || u === "write", Z = n !== "none" && (n !== "tab" || u === "preview");
  return /* @__PURE__ */ nt("div", { className: `flex flex-col overflow-hidden rounded-lg border border-slate-300 bg-white shadow-sm ${i}`, children: [
    (b.length > 0 || n === "tab") && /* @__PURE__ */ nt("div", { className: "flex items-center justify-between border-b border-slate-200 bg-slate-50 px-2 py-1.5", children: [
      b.length > 0 ? /* @__PURE__ */ he("div", { className: "flex flex-wrap gap-1", children: sr.filter((R) => b.includes(R.key)).map((R) => /* @__PURE__ */ he(
        "button",
        {
          type: "button",
          title: R.title,
          "aria-label": R.title,
          onClick: () => M(R.key),
          className: "min-w-[2rem] rounded px-2 py-1 text-sm font-medium text-slate-600 hover:bg-slate-200 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500",
          children: R.label
        },
        R.key
      )) }) : /* @__PURE__ */ he("div", {}),
      n === "tab" && /* @__PURE__ */ nt("div", { className: "flex gap-1 rounded-md bg-slate-200 p-0.5 text-sm", children: [
        /* @__PURE__ */ he(
          "button",
          {
            type: "button",
            onClick: () => m("write"),
            className: `rounded px-3 py-1 font-medium transition-colors ${u === "write" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"}`,
            children: "Write"
          }
        ),
        /* @__PURE__ */ he(
          "button",
          {
            type: "button",
            onClick: () => m("preview"),
            className: `rounded px-3 py-1 font-medium transition-colors ${u === "preview" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"}`,
            children: "Preview"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ nt("div", { className: `flex flex-1 ${n === "live" ? "flex-col md:flex-row" : ""}`, children: [
      U && /* @__PURE__ */ he(
        "textarea",
        {
          ref: h,
          value: o,
          onChange: w,
          placeholder: s,
          spellCheck: !1,
          className: `min-h-[16rem] flex-1 resize-y bg-white p-4 font-mono text-sm leading-relaxed text-slate-800 outline-none ${n === "live" ? "md:border-r md:border-slate-200" : ""}`
        }
      ),
      Z && /* @__PURE__ */ he(
        "div",
        {
          className: "prose prose-sm sm:prose-base min-h-[16rem] max-w-none flex-1 overflow-auto p-4",
          dangerouslySetInnerHTML: { __html: T }
        }
      )
    ] })
  ] });
}
export {
  ss as MarkdownEditor
};
