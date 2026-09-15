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
    title: "Background and Angles, not just resumes",
    description:
      "Your work history lives in one place, called your Background. Angles are lightweight overlays on top of it, one per job type, so the same experience can lead with different things depending on whether you're applying for a senior IC role or a management one. No rewriting from scratch every time.",
  },
  {
    title: "Logging work like it's social media, not a spreadsheet",
    description:
      "Nobody writes down what they did at work until they need a resume, and by then half of it is forgotten. So you can just vent or brag in plain language, something like \"shipped a gnarly migration this week and it went way better than expected,\" and it gets parsed into a real, usable work event.",
  },
  {
    title: "An AI tailoring pipeline that doesn't hang",
    description:
      "The first version streamed the response live, which worked fine until a slow generation ran past the function timeout and left people staring at a stuck spinner with no error and no way to retry. Rebuilt it as a background job with polling so long generations finish cleanly.",
  },
  {
    title: "Everything a real product needs, built solo",
    description:
      "Stripe billing with a credit system, an admin dashboard with its own separate login, GDPR data export and account deletion, error tracking, analytics, a full end to end test suite. Not just the exciting parts.",
  },
];

export function TailorFitCaseStudy() {
  return (
    <>
      <CaseStudyHeader
        eyebrow="Case study"
        title="TailorFit: what I built while trying to get hired myself"
        lede="I was deep in my own job search, staring down hundreds of applications, doing what most people do: reusing one generic resume because tailoring each one by hand is too much work. So I built a workflow with Claude to speed it up. It grew into a full platform for tracking both the applications and the career story behind them."
        meta={
          <CaseStudyMeta
            client="Personal project"
            via="Solo, nights and weekends"
            role="Founder, product, and sole engineer"
            stack={["React", "Supabase", "Netlify Functions", "Claude API", "Stripe"]}
          />
        }
      />

      <BuiltList items={builtItems} />

      <CaseStudySubhead>Logging a highlight</CaseStudySubhead>
      <DeviceFrame caption="Tai, the in-app assistant (concept)">
        <div className="flex flex-col gap-3">
          <div className="ml-auto max-w-[80%] rounded-2xl rounded-tr-sm bg-surface-2 px-4 py-2.5 text-[0.85rem] text-foreground">
            ugh long week, but I finally got the checkout migration shipped
            and it actually went smoother than I expected
          </div>
          <div className="max-w-[85%] rounded-2xl rounded-tl-sm border border-edge-soft bg-ground-deep px-4 py-2.5 text-[0.85rem] text-muted">
            Logged that as a highlight on your Background. Want me to add any
            metrics before it's saved?
          </div>
          <div className="mt-1 rounded-lg border border-dashed border-edge bg-surface-2 p-3.5">
            <p className="mb-2 font-mono text-[0.63rem] uppercase tracking-wide text-faint">
              Work event logged
            </p>
            <p className="text-[0.85rem] font-medium text-foreground">
              Led a checkout migration that shipped ahead of schedule
            </p>
            <p className="mt-1 text-[0.78rem] text-muted">
              Tagged: leadership, systems migration
            </p>
          </div>
        </div>
      </DeviceFrame>
      <RecreatedNote>
        Conceptual mockup based on the actual product spec, not a real
        screenshot yet. The parsing and tagging shown here reflect how Tai
        actually works.
      </RecreatedNote>

      <CaseStudySubhead>Tracking the search</CaseStudySubhead>
      <DeviceFrame caption="Application tracker (concept)">
        <table className="w-full border-collapse font-mono text-[0.74rem]">
          <thead>
            <tr className="text-left">
              <th className="whitespace-nowrap pb-2.5 pr-3 text-[0.63rem] font-medium uppercase tracking-wide text-faint">
                Company
              </th>
              <th className="whitespace-nowrap pb-2.5 pr-3 text-[0.63rem] font-medium uppercase tracking-wide text-faint">
                Stage
              </th>
              <th className="whitespace-nowrap pb-2.5 text-[0.63rem] font-medium uppercase tracking-wide text-faint">
                Last activity
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              { company: "Series B fintech startup", stage: "Interviewing", stageClass: "bg-green/15 text-green", activity: "2 days ago" },
              { company: "Mid-size SaaS company", stage: "Applied", stageClass: "bg-violet/15 text-faint", activity: "1 week ago" },
              { company: "Enterprise retail brand", stage: "Offer", stageClass: "bg-accent/15 text-accent", activity: "Today" },
              { company: "Early-stage AI startup", stage: "Follow up due", stageClass: "bg-rose/15 text-rose", activity: "5 days ago" },
            ].map((row) => (
              <tr key={row.company} className="border-t border-dashed border-edge">
                <td className="whitespace-nowrap py-2.5 pr-3 text-muted">{row.company}</td>
                <td className="whitespace-nowrap py-2.5 pr-3">
                  <span className={`rounded-full px-2 py-0.5 text-[0.66rem] ${row.stageClass}`}>
                    {row.stage}
                  </span>
                </td>
                <td className="whitespace-nowrap py-2.5 text-faint">{row.activity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </DeviceFrame>
      <RecreatedNote>
        Also a concept mockup, companies made up for illustration. The real
        tracker adds enrichment (auto-fetched logos), touchpoints, and stage
        history per application.
      </RecreatedNote>

      <PullQuote>
        It doesn&apos;t remove the busywork of applying.{" "}
        <span className="text-accent">
          It removes the excuse to only have one resume.
        </span>
      </PullQuote>
    </>
  );
}
