import { jsx as e, jsxs as h } from "react/jsx-runtime";
import { useRef as g, useMemo as v, useState as M, useCallback as T, useEffect as A } from "react";
import { Canvas as x, useFrame as C, useThree as j } from "@react-three/fiber";
import * as l from "three";
import { OrbitControls as F, shaderMaterial as z } from "@react-three/drei";
const B = (
  /* glsl */
  `
  uniform float uTime;
  uniform vec2 uPointer;
  uniform float uSize;
  uniform float uPointerInfluence;

  attribute float aRandom;
  attribute vec3 color;

  varying vec3 vColor;

  void main() {
    vColor = color;

    vec3 pos = position;
    float phase = aRandom * 6.28318;
    pos.x += sin(uTime * 0.25 + phase) * 0.18;
    pos.y += cos(uTime * 0.2 + phase * 1.3) * 0.18;
    pos.z += sin(uTime * 0.18 + phase * 0.7) * 0.18;

    // subtle parallax toward the pointer, varied per-particle by depth
    pos.xy += uPointer * uPointerInfluence * (0.4 + aRandom * 0.6);

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = uSize * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`
), E = (
  /* glsl */
  `
  varying vec3 vColor;

  void main() {
    vec2 fromCenter = gl_PointCoord - vec2(0.5);
    float dist = length(fromCenter);
    if (dist > 0.5) discard;
    float alpha = smoothstep(0.5, 0.0, dist);
    gl_FragColor = vec4(vColor, alpha);
  }
`
);
function G({ count: o, color: n, secondaryColor: a, size: r, pointerInfluence: s }) {
  const t = g(null), u = g(null), { positions: m, colors: c, randoms: y } = v(() => {
    const i = new Float32Array(o * 3), f = new Float32Array(o * 3), P = new Float32Array(o), R = new l.Color(n), S = new l.Color(a);
    for (let p = 0; p < o; p++) {
      const d = p * 3;
      i[d] = (Math.random() - 0.5) * 12, i[d + 1] = (Math.random() - 0.5) * 12, i[d + 2] = (Math.random() - 0.5) * 12;
      const w = R.clone().lerp(S, Math.random());
      f[d] = w.r, f[d + 1] = w.g, f[d + 2] = w.b, P[p] = Math.random();
    }
    return { positions: i, colors: f, randoms: P };
  }, [o, n, a]), b = v(
    () => ({
      uTime: { value: 0 },
      uPointer: { value: new l.Vector2(0, 0) },
      uSize: { value: r },
      uPointerInfluence: { value: s }
    }),
    [r, s]
  );
  return C((i) => {
    const f = i.clock.getElapsedTime();
    u.current && (u.current.uniforms.uTime.value = f, u.current.uniforms.uPointer.value.set(i.pointer.x, i.pointer.y)), t.current && (t.current.rotation.y = f * 0.02 + i.pointer.x * 0.15, t.current.rotation.x = i.pointer.y * 0.08);
  }), /* @__PURE__ */ h("points", { ref: t, children: [
    /* @__PURE__ */ h("bufferGeometry", { children: [
      /* @__PURE__ */ e("bufferAttribute", { attach: "attributes-position", args: [m, 3] }),
      /* @__PURE__ */ e("bufferAttribute", { attach: "attributes-color", args: [c, 3] }),
      /* @__PURE__ */ e("bufferAttribute", { attach: "attributes-aRandom", args: [y, 1] })
    ] }),
    /* @__PURE__ */ e(
      "shaderMaterial",
      {
        ref: u,
        transparent: !0,
        depthWrite: !1,
        blending: l.AdditiveBlending,
        uniforms: b,
        vertexShader: B,
        fragmentShader: E
      }
    )
  ] });
}
function $({
  count: o = 4e3,
  color: n = "#38bdf8",
  secondaryColor: a = "#a855f7",
  size: r = 6,
  pointerInfluence: s = 0.6,
  className: t
}) {
  return /* @__PURE__ */ e(
    x,
    {
      className: t,
      camera: { position: [0, 0, 6], fov: 60 },
      dpr: [1, 2],
      gl: { antialias: !0, alpha: !0 },
      children: /* @__PURE__ */ e(
        G,
        {
          count: o,
          color: n,
          secondaryColor: a,
          size: r,
          pointerInfluence: s
        }
      )
    }
  );
}
function U({ shape: o }) {
  switch (o) {
    case "icosahedron":
      return /* @__PURE__ */ e("icosahedronGeometry", { args: [1.4, 1] });
    case "octahedron":
      return /* @__PURE__ */ e("octahedronGeometry", { args: [1.6, 0] });
    case "sphere":
      return /* @__PURE__ */ e("sphereGeometry", { args: [1.35, 64, 64] });
    case "torusKnot":
    default:
      return /* @__PURE__ */ e("torusKnotGeometry", { args: [1, 0.32, 220, 32] });
  }
}
function _({ shape: o, color: n, wireframe: a }) {
  const r = g(null);
  return C((s, t) => {
    r.current.rotation.y += t * 0.15, r.current.rotation.x += t * 0.04;
  }), /* @__PURE__ */ h("mesh", { ref: r, children: [
    /* @__PURE__ */ e(U, { shape: o ?? "torusKnot" }),
    /* @__PURE__ */ e(
      "meshPhysicalMaterial",
      {
        color: n,
        wireframe: a,
        roughness: 0.28,
        metalness: 0.65,
        clearcoat: 0.5,
        clearcoatRoughness: 0.25
      }
    )
  ] });
}
function H({
  shape: o = "torusKnot",
  color: n = "#22d3ee",
  wireframe: a = !1,
  autoRotateSpeed: r = 0.6,
  className: s
}) {
  const [t, u] = M(!0), m = g(void 0), c = T(() => {
    window.clearTimeout(m.current), u(!1);
  }, []), y = T(() => {
    window.clearTimeout(m.current), m.current = window.setTimeout(() => u(!0), 1500);
  }, []);
  A(() => () => window.clearTimeout(m.current), []);
  const b = v(() => [3, 4, 2], []), i = v(() => [-4, -2, -3], []);
  return /* @__PURE__ */ h(x, { className: s, camera: { position: [0, 0, 4.5], fov: 45 }, dpr: [1, 2], children: [
    /* @__PURE__ */ e("ambientLight", { intensity: 0.55 }),
    /* @__PURE__ */ e("directionalLight", { position: b, intensity: 1.3 }),
    /* @__PURE__ */ e("pointLight", { position: i, intensity: 0.7, color: "#a855f7" }),
    /* @__PURE__ */ e("hemisphereLight", { args: ["#8fd3ff", "#0a0a0f", 0.35] }),
    /* @__PURE__ */ e(_, { shape: o, color: n, wireframe: a }),
    /* @__PURE__ */ e(
      F,
      {
        enablePan: !1,
        minDistance: 2.5,
        maxDistance: 9,
        autoRotate: t,
        autoRotateSpeed: r,
        onStart: c,
        onEnd: y
      }
    )
  ] });
}
const L = (
  /* glsl */
  `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`
), O = (
  /* glsl */
  `
  uniform float uTime;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec2 uResolution;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(41.3, 289.1))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  void main() {
    float aspect = uResolution.x / max(uResolution.y, 1.0);
    vec2 p = vec2(vUv.x * aspect, vUv.y);

    float wave = sin(p.x * 2.6 + uTime * 0.5) * 0.14;
    wave += sin(p.y * 3.4 - uTime * 0.35 + p.x * 1.5) * 0.09;

    float n = noise(p * 2.2 + uTime * 0.12);

    float mixFactor = clamp(vUv.y + wave + (n - 0.5) * 0.35, 0.0, 1.0);
    vec3 color = mix(uColorA, uColorB, mixFactor);

    float band = smoothstep(0.85, 0.0, abs(vUv.y - 0.5 + wave * 0.6));
    color += band * 0.06;

    gl_FragColor = vec4(color, 1.0);
  }
`
), V = z(
  {
    uTime: 0,
    uColorA: new l.Color("#0f172a"),
    uColorB: new l.Color("#7c3aed"),
    uResolution: new l.Vector2(1, 1)
  },
  L,
  O
);
function k({ colorA: o, colorB: n, speed: a }) {
  const { viewport: r, size: s } = j(), t = v(() => {
    const c = new V();
    return c.depthTest = !1, c.depthWrite = !1, c.toneMapped = !1, c;
  }, []), u = v(() => new l.Color(o), [o]), m = v(() => new l.Color(n), [n]);
  return C((c) => {
    t.uniforms.uTime.value = c.clock.getElapsedTime() * a, t.uniforms.uColorA.value.copy(u), t.uniforms.uColorB.value.copy(m), t.uniforms.uResolution.value.set(s.width, s.height);
  }), /* @__PURE__ */ h("mesh", { scale: [r.width, r.height, 1], children: [
    /* @__PURE__ */ e("planeGeometry", { args: [1, 1] }),
    /* @__PURE__ */ e("primitive", { object: t, attach: "material" })
  ] });
}
function q({
  colorA: o = "#0f172a",
  colorB: n = "#7c3aed",
  speed: a = 1,
  className: r
}) {
  return /* @__PURE__ */ e(
    x,
    {
      className: r,
      orthographic: !0,
      camera: { position: [0, 0, 1], zoom: 1, near: 0.1, far: 10 },
      dpr: [1, 2],
      gl: { antialias: !1 },
      children: /* @__PURE__ */ e(k, { colorA: o, colorB: n, speed: a })
    }
  );
}
export {
  H as ObjectViewer,
  $ as ParticleField,
  q as ShaderBackground
};
//# sourceMappingURL=threejs-gallery.js.map
