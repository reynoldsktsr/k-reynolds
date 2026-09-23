"use client";

import { ParticleField } from "@/vendor/threejs-gallery/threejs-gallery";
import { DemoFrame } from "@/components/showcase/demo-frame";

export function ThreejsGalleryDemo() {
  return (
    <DemoFrame caption="Three.js Gallery">
      <div className="h-80 w-full">
        <ParticleField className="h-full w-full" count={1400} color="#6d3ea6" secondaryColor="#a97ee0" />
      </div>
    </DemoFrame>
  );
}
