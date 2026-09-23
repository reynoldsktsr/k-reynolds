"use client";

import { ForceGraphChart } from "@/vendor/d3-gallery/d3-gallery";
import { DemoFrame } from "@/components/showcase/demo-frame";

export function D3GalleryDemo() {
  return (
    <DemoFrame caption="D3 Gallery">
      <ForceGraphChart className="h-80 w-full" />
    </DemoFrame>
  );
}
