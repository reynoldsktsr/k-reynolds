import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { dataset, projectId } from "@/sanity/env";

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || "placeholder-project",
  dataset,
});

export function urlForImage(source: SanityImageSource) {
  return imageBuilder.image(source);
}
