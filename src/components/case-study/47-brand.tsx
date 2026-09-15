import {
  CaseStudyHeader,
  CaseStudyMeta,
  CaseStudySubhead,
  BuiltList,
  PullQuote,
} from "@/components/case-study/case-study-parts";
import { DeviceFrame, RecreatedNote } from "@/components/case-study/device-frame";

const builtItems = [
  {
    title: "A rules engine that reads every product webhook",
    description:
      "Shopify fires a webhook on every product create and update. Built a listener that runs a configurable set of audit rules against each payload as it arrives, instead of waiting for someone to notice a bad listing after the fact.",
  },
  {
    title: "Reconstructing data, not just flagging it",
    description:
      "Inbound product data from an external source regularly landed in Shopify missing fields or carrying the wrong tags. The system didn't just flag those gaps, it worked out what the correct value should be from the rest of the product's data and rewrote it.",
  },
  {
    title: "If-this-then-that rules instead of one hardcoded script",
    description:
      "Each audit is its own rule: a condition to match and a fix to apply. A new bad-data pattern gets a new rule added to the set, not a new deploy or a rewritten script.",
  },
  {
    title: "Writes straight back to Shopify, no manual queue",
    description:
      "Once a rule fires, the corrected product data saves back to Shopify automatically through the Admin API. No spreadsheet, no manual review pass, no one chasing bad listings by hand.",
  },
];

export function FortySevenBrandCaseStudy() {
  return (
    <>
      <CaseStudyHeader
        eyebrow="Case study"
        title="'47 Brand: catching bad product data before it hit the storefront"
        lede="Product data came in from an external source and out the other side into Shopify, and along the way it regularly lost or scrambled information: missing fields, wrong tags, inconsistent attributes. I built an auto-tagging system that audits every product as it comes through and rebuilds what's wrong, automatically."
        meta={
          <CaseStudyMeta
            client="'47 Brand"
            via="Sparky (a Shopify agency)"
            role="Senior full-stack engineer"
            stack={["Shopify Webhooks", "Shopify Admin API", "Node.js"]}
            liveUrl="https://www.47brand.com"
            agencyUrl="https://sparky.us/work/47"
            notClient
          />
        }
      />

      <BuiltList items={builtItems} />

      <CaseStudySubhead>What an audit catches</CaseStudySubhead>
      <DeviceFrame caption="Audit run, on a real product import (recreated)">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="mb-1.5 font-mono text-[0.63rem] uppercase tracking-wide text-rose">
              Inbound (as received)
            </p>
            <ul className="flex flex-col gap-1.5 text-[0.82rem] text-muted">
              <li>
                Material: <span className="text-rose">Cotton</span>
              </li>
              <li>
                Size: <span className="text-rose">missing</span>
              </li>
              <li>
                Care instructions: <span className="text-rose">missing</span>
              </li>
            </ul>
          </div>
          <div>
            <p className="mb-1.5 font-mono text-[0.63rem] uppercase tracking-wide text-green">
              After the audit
            </p>
            <ul className="flex flex-col gap-1.5 text-[0.82rem] text-muted">
              <li>
                Material: <span className="text-green">Poly-cotton blend</span>
              </li>
              <li>
                Size: <span className="text-green">M</span>
              </li>
              <li>
                Care instructions: <span className="text-green">Machine wash cold</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-4 rounded-lg border border-dashed border-edge bg-surface-2 p-3.5">
          <p className="mb-1.5 font-mono text-[0.63rem] uppercase tracking-wide text-faint">
            Rules fired
          </p>
          <div className="flex flex-wrap gap-1.5">
            {["material-mismatch", "size-backfill-from-sku", "care-default-by-category"].map((rule) => (
              <span
                key={rule}
                className="rounded-full border border-edge-soft bg-surface px-2.5 py-1 font-mono text-[0.7rem] text-muted"
              >
                {rule}
              </span>
            ))}
          </div>
        </div>
      </DeviceFrame>
      <RecreatedNote>
        Recreated layout, generic example data. Every rule is scoped and
        logged, so a fix can be traced back to exactly which condition
        matched and what it changed.
      </RecreatedNote>

      <PullQuote>
        The goal wasn&apos;t to catch bad data faster.{" "}
        <span className="text-accent">It was to stop anyone from having to catch it at all.</span>
      </PullQuote>
    </>
  );
}
