"use client";

import type { ComponentType } from "react";
import {
  MagneticButton as MagneticButtonRaw,
  RippleButton as RippleButtonRaw,
  GlowBorderButton as GlowBorderButtonRaw,
  TiltButton as TiltButtonRaw,
  UnderlineDrawButton as UnderlineDrawButtonRaw,
  ScalePopButton as ScalePopButtonRaw,
  IconSlideButton as IconSlideButtonRaw,
  MorphLoadingButton as MorphLoadingButtonRaw,
} from "@/vendor/hover-button-lab/hover-button-lab";
import type {
  MagneticButtonProps,
  RippleButtonProps,
  GlowBorderButtonProps,
  TiltButtonProps,
  UnderlineDrawButtonProps,
  ScalePopButtonProps,
  IconSlideButtonProps,
  MorphLoadingButtonProps,
} from "@/vendor/hover-button-lab/index";
import "@/vendor/hover-button-lab/style.css";
import { DemoFrame } from "@/components/showcase/demo-frame";

// The vendored .d.ts marks these destructured, defaulted props as
// required; the actual components treat them all as optional.
const MagneticButton = MagneticButtonRaw as ComponentType<MagneticButtonProps>;
const RippleButton = RippleButtonRaw as ComponentType<RippleButtonProps>;
const GlowBorderButton = GlowBorderButtonRaw as ComponentType<GlowBorderButtonProps>;
const TiltButton = TiltButtonRaw as ComponentType<TiltButtonProps>;
const UnderlineDrawButton = UnderlineDrawButtonRaw as ComponentType<UnderlineDrawButtonProps>;
const ScalePopButton = ScalePopButtonRaw as ComponentType<ScalePopButtonProps>;
const IconSlideButton = IconSlideButtonRaw as ComponentType<IconSlideButtonProps>;
const MorphLoadingButton = MorphLoadingButtonRaw as ComponentType<MorphLoadingButtonProps>;

export function HoverButtonLabDemo() {
  return (
    <DemoFrame caption="Hover Button Lab">
      <div className="flex flex-wrap items-center justify-center gap-4 py-4">
        <MagneticButton className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background">
          Magnetic
        </MagneticButton>
        <RippleButton className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background">
          Ripple
        </RippleButton>
        <GlowBorderButton className="rounded-full bg-surface-2 px-5 py-2.5 text-sm font-medium text-foreground">
          Glow border
        </GlowBorderButton>
        <TiltButton className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background">
          Tilt
        </TiltButton>
        <UnderlineDrawButton className="px-2 py-2.5 text-sm font-medium text-foreground">
          Underline
        </UnderlineDrawButton>
        <ScalePopButton className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background">
          Scale pop
        </ScalePopButton>
        <IconSlideButton
          icon={<span aria-hidden>→</span>}
          className="rounded-full bg-surface-2 px-5 py-2.5 text-sm font-medium text-foreground"
        >
          Icon slide
        </IconSlideButton>
        <MorphLoadingButton
          onClick={() => new Promise((r) => setTimeout(r, 1200))}
          className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background"
        >
          Morph loading
        </MorphLoadingButton>
      </div>
    </DemoFrame>
  );
}
