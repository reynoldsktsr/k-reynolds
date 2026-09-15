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
    title: "A lot more than a resume generator",
    description:
      "A Chrome extension that tracks jobs while you browse, a public MCP server so your own AI client can query your data directly, a status page with real per-feature AI latency pulled from production instead of synthetic pings, credit-based billing instead of flat per-generation pricing. Built and shipped solo.",
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

      <CaseStudySubhead>Tracking the search</CaseStudySubhead>
      <DeviceFrame caption="Applications">
        <table className="w-full border-collapse text-[0.74rem]">
          <thead>
            <tr className="text-left">
              <th className="whitespace-nowrap pb-2.5 pr-3 font-mono text-[0.63rem] font-medium uppercase tracking-wide text-faint">
                Company / Role
              </th>
              <th className="whitespace-nowrap pb-2.5 pr-3 font-mono text-[0.63rem] font-medium uppercase tracking-wide text-faint">
                Stage
              </th>
              <th className="whitespace-nowrap pb-2.5 pr-3 font-mono text-[0.63rem] font-medium uppercase tracking-wide text-faint">
                Tags
              </th>
              <th className="whitespace-nowrap pb-2.5 text-[0.63rem] font-mono font-medium uppercase tracking-wide text-faint">
                Fill
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              { company: "Vertex Robotics", role: "Design Systems Lead", stage: "Screening", stageClass: "bg-violet/15 text-accent", fill: "25", fillClass: "text-rose" },
              { company: "Lumen Health", role: "Senior Product Designer", stage: "Offer", stageClass: "bg-green/15 text-green", fill: "25", fillClass: "text-rose" },
              { company: "Cascade Robotics", role: "Principal Designer", stage: "Rejected", stageClass: "bg-rose/15 text-rose", fill: "25", fillClass: "text-rose" },
              { company: "Beacon Analytics", role: "Senior Product Designer", stage: "Interview", stageClass: "bg-foreground/15 text-foreground", fill: "75", fillClass: "text-accent" },
            ].map((row) => (
              <tr key={row.company} className="border-t border-dashed border-edge">
                <td className="whitespace-nowrap py-2.5 pr-3">
                  <span className="font-medium text-foreground">{row.company}</span>
                  <span className="block font-mono text-[0.68rem] text-faint">{row.role}</span>
                </td>
                <td className="whitespace-nowrap py-2.5 pr-3">
                  <span className={`rounded-full px-2 py-0.5 font-mono text-[0.66rem] uppercase ${row.stageClass}`}>
                    {row.stage}
                  </span>
                </td>
                <td className="whitespace-nowrap py-2.5 pr-3">
                  <span className="rounded-full border border-edge-soft px-2 py-0.5 font-mono text-[0.63rem] text-faint">
                    No JD
                  </span>
                </td>
                <td className={`whitespace-nowrap py-2.5 font-mono text-[0.7rem] ${row.fillClass}`}>{row.fill}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </DeviceFrame>
      <RecreatedNote>
        Recreated from the real product (generic demo data). Every application
        carries a completeness score, plus the stage pills, tags, and filters
        shown in the real tracker.
      </RecreatedNote>

      <CaseStudySubhead>What the AI actually reads</CaseStudySubhead>
      <DeviceFrame caption="Job analysis, on a real application">
        <div className="mb-4">
          <p className="mb-1.5 font-mono text-[0.63rem] uppercase tracking-wide text-faint">
            Must-haves
          </p>
          <ul className="list-disc pl-4 text-[0.82rem] text-muted marker:text-faint">
            <li>6+ years product design experience</li>
            <li>Expertise with complex B2B data products</li>
          </ul>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="mb-1.5 font-mono text-[0.63rem] uppercase tracking-wide text-green">
              Highlights
            </p>
            <p className="text-[0.82rem] leading-relaxed text-muted">
              Remote-friendly arrangement, B2B data product expertise is a
              specialized, high-demand skill set.
            </p>
          </div>
          <div>
            <p className="mb-1.5 font-mono text-[0.63rem] uppercase tracking-wide text-rose">
              Watch out
            </p>
            <p className="text-[0.82rem] leading-relaxed text-muted">
              No explicit compensation range, vague on team structure and
              reporting.
            </p>
          </div>
        </div>
        <div className="mt-4 rounded-lg border border-dashed border-edge bg-surface-2 p-3.5">
          <p className="mb-1 font-mono text-[0.63rem] uppercase tracking-wide text-faint">
            Question to ask
          </p>
          <p className="text-[0.82rem] text-muted">
            What&apos;s the current design team structure, and who would I
            report to?
          </p>
        </div>
      </DeviceFrame>
      <RecreatedNote>
        Recreated from the real product (generic demo data). Tai reads the
        job listing itself and pulls out must-haves, red flags, and market
        context, not just keyword matches.
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
