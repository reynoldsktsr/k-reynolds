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
    title: "Swapped out the database",
    description:
      "The old loyalty system ran on MongoDB, and it just wasn't a great fit for points, tiers, and redemptions. Moved the whole thing to PostgreSQL.",
  },
  {
    title: "Closed a fraud hole",
    description:
      "Found a gap in how rewards got checked before they could be redeemed, and rebuilt that validation so it actually holds up.",
  },
  {
    title: "Built it to survive traffic spikes",
    description:
      "A raffle across four storefronts can pull thousands of entries in minutes. Cloud Functions and Pub/Sub let the system scale up on its own instead of falling over.",
  },
  {
    title: "Gave the team their own tools",
    description:
      "Raffles, earning bonuses, badges, tiers. All of it configurable by the Ghost team directly, no engineer needed every time they want to run a drop.",
  },
];

export function GhostLifestyleCaseStudy() {
  return (
    <>
      <CaseStudyHeader
        eyebrow="Case study"
        title="Ghost Lifestyle: fixing a loyalty program that couldn't keep up with launch day"
        lede="Ghost sells supplements and apparel to a genuinely loyal community. Drops, raffles, streaks, badges, the whole thing. The loyalty program behind it kept buckling whenever a raffle got popular, so I rebuilt it to actually hold up."
        meta={
          <CaseStudyMeta
            client="Ghost Lifestyle"
            via="Sparky (a Shopify agency)"
            role="Senior full-stack engineer"
            stack={["PostgreSQL", "Cloud Functions", "Pub/Sub", "Shopify Plus"]}
            liveUrl="https://ghostlifestyle.com"
            agencyUrl="https://sparky.us/work/ghost"
            notClient
          />
        }
      />

      <BuiltList items={builtItems} />

      <CaseStudySubhead>What members see</CaseStudySubhead>
      <DeviceFrame caption="Loyalty dashboard, customer view (recreated)">
        <div className="mb-5 flex items-center gap-3 border-b border-dashed border-edge pb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-deep font-mono text-xs">
            KR
          </div>
          <div className="text-sm text-muted">
            <b className="block font-mono text-[0.82rem] text-foreground">
              Kieran Reynolds
            </b>
            Member since 2024
          </div>
        </div>
        <div className="mb-6 grid grid-cols-3 gap-3.5">
          <div>
            <dt className="font-mono text-[0.66rem] uppercase tracking-wide text-faint">
              Points balance
            </dt>
            <dd className="mt-1 select-none font-display text-2xl font-bold text-accent blur-sm">
              50,302
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[0.66rem] uppercase tracking-wide text-faint">
              Lifetime earned
            </dt>
            <dd className="mt-1 select-none font-display text-2xl font-bold text-accent blur-sm">
              53,302
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[0.66rem] uppercase tracking-wide text-faint">
              Tier
            </dt>
            <dd className="mt-1 font-display text-2xl font-bold text-accent">
              Member
            </dd>
          </div>
        </div>
        <div className="grid max-w-sm grid-cols-6 gap-2" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className="aspect-square rounded-full border border-edge-soft bg-violet-deep/40"
            />
          ))}
        </div>
      </DeviceFrame>
      <RecreatedNote>
        Recreated for this page. Balances are blurred, but the real badge
        system alone runs more than 40 distinct badges.
      </RecreatedNote>

      <CaseStudySubhead>What the Ghost team sees</CaseStudySubhead>
      <DeviceFrame caption="Raffles admin, internal tool (recreated)">
        <table className="w-full border-collapse font-mono text-[0.74rem]">
          <thead>
            <tr className="text-left">
              <th className="whitespace-nowrap pb-2.5 pr-3 text-[0.63rem] font-medium uppercase tracking-wide text-faint">
                Name
              </th>
              <th className="whitespace-nowrap pb-2.5 pr-3 text-[0.63rem] font-medium uppercase tracking-wide text-faint">
                Status
              </th>
              <th className="whitespace-nowrap pb-2.5 pr-3 text-[0.63rem] font-medium uppercase tracking-wide text-faint">
                Entries
              </th>
              <th className="whitespace-nowrap pb-2.5 pr-3 text-[0.63rem] font-medium uppercase tracking-wide text-faint">
                Winners
              </th>
              <th className="whitespace-nowrap pb-2.5 text-[0.63rem] font-medium uppercase tracking-wide text-faint">
                Subscribed
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              { swatch: "bg-green", status: "active", statusClass: "bg-green/15 text-green" },
              { swatch: "bg-rose", status: "past", statusClass: "bg-violet/15 text-faint" },
              { swatch: "bg-sky-400", status: "past", statusClass: "bg-violet/15 text-faint" },
              { swatch: "bg-violet-deep", status: "draft", statusClass: "bg-rose/15 text-rose" },
            ].map((row, i) => (
              <tr key={i} className="border-t border-dashed border-edge">
                <td className="whitespace-nowrap py-2.5 pr-3">
                  <span className="flex items-center gap-2">
                    <span className={`h-3.5 w-3.5 shrink-0 rounded-sm ${row.swatch}`} />
                    <span className="select-none whitespace-normal text-faint blur-sm">
                      Raffle name goes here
                    </span>
                  </span>
                </td>
                <td className="whitespace-nowrap py-2.5 pr-3">
                  <span className={`rounded-full px-2 py-0.5 text-[0.66rem] ${row.statusClass}`}>
                    {row.status}
                  </span>
                </td>
                <td className="whitespace-nowrap py-2.5 pr-3 select-none text-faint blur-sm">
                  12,345
                </td>
                <td className="whitespace-nowrap py-2.5 pr-3 select-none text-faint blur-sm">
                  1,234
                </td>
                <td className="whitespace-nowrap py-2.5 select-none text-faint blur-sm">
                  1,234
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DeviceFrame>
      <RecreatedNote>
        Same columns as the real tool, names and numbers blurred out. This
        gets genuinely dense in production: entries, winners, and
        subscriptions tracked per raffle, per region.
      </RecreatedNote>

      <PullQuote>
        The real win wasn&apos;t adding a loyalty program.{" "}
        <span className="text-accent">
          It was giving the Ghost team tools they could run themselves
        </span>
        , no engineer required.
      </PullQuote>
    </>
  );
}
