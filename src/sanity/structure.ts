import type { StructureResolver } from "sanity/structure";

/**
 * Custom desk structure: Site Settings is pinned as a singleton document,
 * Case Studies lists everything else.
 * https://www.sanity.io/docs/structure-builder-cheat-sheet
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site Settings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings"),
        ),
      S.divider(),
      S.documentTypeListItem("caseStudy").title("Case Studies"),
    ]);
