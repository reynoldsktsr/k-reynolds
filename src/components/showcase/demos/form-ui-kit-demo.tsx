"use client";

import { MultiStepForm } from "@/vendor/form-ui-kit/form-ui-kit.es";
import "@/vendor/form-ui-kit/style.css";
import { DemoFrame } from "@/components/showcase/demo-frame";

export function FormUiKitDemo() {
  return (
    <DemoFrame caption="Form UI Kit">
      <MultiStepForm />
    </DemoFrame>
  );
}
