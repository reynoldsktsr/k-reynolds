"use client";

import type { ComponentType } from "react";
import { PhysicsPlayground as PhysicsPlaygroundRaw } from "@/vendor/physics-playground/physics-playground";
import type { PhysicsPlaygroundProps } from "@/vendor/physics-playground/index";
import "@/vendor/physics-playground/physics-playground.css";
import { DemoFrame } from "@/components/showcase/demo-frame";

// The vendored .d.ts marks these destructured, defaulted props as
// required (and narrows `height` to just `string`); the actual
// component treats them all as optional and accepts number | string.
const PhysicsPlayground = PhysicsPlaygroundRaw as ComponentType<PhysicsPlaygroundProps>;

export function PhysicsPlaygroundDemo() {
  return (
    <DemoFrame caption="Physics Playground">
      <PhysicsPlayground height={320} initialBodyCount={12} />
    </DemoFrame>
  );
}
