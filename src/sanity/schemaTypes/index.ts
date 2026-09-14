import type { SchemaTypeDefinition } from "sanity";
import { caseStudy } from "./caseStudy";
import { siteSettings } from "./siteSettings";
import { blockContent } from "./blockContent";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [caseStudy, siteSettings, blockContent],
};
