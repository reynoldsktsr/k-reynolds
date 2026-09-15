import {
  CaseStudyHeader,
  CaseStudyMeta,
  CaseStudySubhead,
  BuiltList,
  PullQuote,
} from "@/components/case-study/case-study-parts";
import { DeviceFrame, RecreatedNote } from "@/components/case-study/device-frame";
import { Reveal } from "@/components/reveal";

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

const pricingTiers = [
  { tier: "Free", price: "$0", period: "forever", credits: "5 credits / mo", featured: false },
  { tier: "Starter", price: "$9", period: "/ month", credits: "25 credits / mo", featured: true },
  { tier: "Pro", price: "$22", period: "/ month", credits: "75 credits / mo", featured: false },
];

const revenueStats = [
  { label: "Est. MRR", value: "$75.00" },
  { label: "Paid subscribers", value: "4" },
  { label: "Starter subs", value: "1" },
  { label: "Pro subs", value: "3" },
];

const creditCosts = [
  { action: "Resume tailoring", credits: 2 },
  { action: "Cover letter", credits: 2 },
  { action: "Interview prep pack", credits: 2 },
  { action: "Interview session", credits: 5 },
  { action: "Screening questions", credits: 1 },
  { action: "Thank-you email", credits: 1 },
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
            liveUrl="https://tailorfit.io"
          />
        }
      />

      <BuiltList items={builtItems} />

      <CaseStudySubhead>Where it started</CaseStudySubhead>
      <Reveal>
        <p className="mb-12 max-w-[62ch] text-[0.95rem] leading-relaxed text-muted">
          The workflow came before the product. Mid search, I started dumping my
          whole work history into Claude as word vomit: half-remembered
          projects, metrics I had to go dig up, context that only made sense in
          my own head. Claude and a couple of other AI agents would parse that
          into something usable, then tailor a resume and write a specific,
          custom cover letter for whatever role I was looking at next. It
          worked, but it lived entirely in scattered chats and local files, and
          every new application meant re-explaining myself from zero. TailorFit
          is that workflow rebuilt as an actual product: the brain dump becomes
          a structured Background once, and every resume, cover letter, and job
          analysis after that draws from it instead of starting over.
        </p>
      </Reveal>

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

      <CaseStudySubhead>Making the pitch, not just the app</CaseStudySubhead>
      <Reveal>
        <p className="mb-6 max-w-[62ch] text-[0.95rem] leading-relaxed text-muted">
          A tool nobody can find is a tool nobody uses, so the marketing site
          got the same attention as the product. The homepage leads with the
          actual problem instead of a generic AI pitch, and pricing is built
          around credits instead of a flat per-generation cap, so an
          occasional job seeker and someone running a hundred applications
          both pay for what they actually use.
        </p>
      </Reveal>
      <DeviceFrame caption="Homepage">
        <div className="flex flex-col items-start gap-3.5">
          <span className="rounded-full bg-green/15 px-3 py-1 font-mono text-[0.63rem] uppercase tracking-wide text-green">
            Early access, free to start
          </span>
          <h3 className="max-w-[18ch] font-display text-xl font-bold leading-tight text-foreground sm:text-2xl">
            Your background qualifies you for more than you&apos;re applying
            for.
          </h3>
          <p className="max-w-[46ch] text-[0.85rem] leading-relaxed text-muted">
            Most searches are too narrow and too hard to keep track of.
            TailorFit builds a real professional profile from your
            experience, sizes up every role you&apos;re looking at, and keeps
            everything organized from the first application to the final
            interview.
          </p>
          <div className="flex flex-wrap gap-2.5 pt-1">
            <span className="rounded-full bg-accent px-4 py-2 font-mono text-[0.7rem] text-background">
              Get started free
            </span>
            <span className="rounded-full border border-edge px-4 py-2 font-mono text-[0.7rem] text-muted">
              See how it works
            </span>
          </div>
          <p className="font-mono text-[0.66rem] text-faint">
            No credit card required. 7-day free trial, then free forever.
          </p>
        </div>
      </DeviceFrame>
      <RecreatedNote>
        Recreated from the real homepage, real copy. The headline is the
        whole positioning: this isn&apos;t about applying faster, it&apos;s
        about applying like you actually mean it.
      </RecreatedNote>

      <DeviceFrame caption="Pricing">
        <div className="mb-5">
          <h3 className="font-display text-lg font-bold text-foreground">
            Simple, credit-based pricing
          </h3>
          <p className="mt-1.5 max-w-[46ch] text-[0.85rem] leading-relaxed text-muted">
            Every account starts with a 7-day free trial. Every AI feature
            runs on credits from a monthly allowance, and topping up with a
            one-time pack never expires.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {pricingTiers.map((plan) => (
            <div
              key={plan.tier}
              className={`rounded-lg border p-3.5 ${
                plan.featured
                  ? "border-accent bg-accent/10"
                  : "border-edge-soft bg-surface-2"
              }`}
            >
              <p className="font-mono text-[0.63rem] uppercase tracking-wide text-faint">
                {plan.tier}
              </p>
              <p className="mt-1 font-display text-xl font-bold text-foreground">
                {plan.price}
                <span className="ml-1 text-[0.7rem] font-normal text-faint">
                  {plan.period}
                </span>
              </p>
              <p className="mt-1.5 font-mono text-[0.68rem] text-muted">
                {plan.credits}
              </p>
            </div>
          ))}
        </div>
      </DeviceFrame>
      <RecreatedNote>
        Recreated from the real pricing page. Credit costs are tuned per
        action (a full interview prep pack costs more than a thank-you email)
        instead of charging the same for everything.
      </RecreatedNote>

      <CaseStudySubhead>Running it like a business, not a side project</CaseStudySubhead>
      <Reveal>
        <p className="mb-6 max-w-[62ch] text-[0.95rem] leading-relaxed text-muted">
          A product with real subscribers needs real operating visibility, so
          there&apos;s a second application entirely: an admin dashboard
          behind its own separate login, with no shared session against the
          main app. It tracks revenue, subscriber tiers, AI usage, and the
          actual cost of every generation, not just what users see.
        </p>
      </Reveal>
      <DeviceFrame caption="Admin: revenue overview">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {revenueStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-edge-soft bg-surface-2 p-3"
            >
              <p className="font-display text-xl font-bold text-foreground">
                {stat.value}
              </p>
              <p className="mt-0.5 font-mono text-[0.63rem] uppercase tracking-wide text-faint">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <p className="mb-1.5 font-mono text-[0.63rem] uppercase tracking-wide text-faint">
            Tier distribution
          </p>
          <div className="flex h-2 overflow-hidden rounded-full bg-surface-2">
            <span className="h-full w-[17%] bg-faint/40" />
            <span className="h-full w-[17%] bg-accent/50" />
            <span className="h-full w-[50%] bg-accent" />
          </div>
          <p className="mt-1.5 font-mono text-[0.66rem] text-faint">
            Free 17% · Starter 17% · Pro 50%
          </p>
        </div>
      </DeviceFrame>
      <RecreatedNote>
        Recreated from the real admin dashboard (generic demo data). Same
        panel also tracks total generations, tokens burned, and estimated AI
        cost, all pulled from production rather than estimated after the
        fact.
      </RecreatedNote>

      <DeviceFrame caption="Admin: credit economy">
        <table className="w-full border-collapse text-[0.74rem]">
          <thead>
            <tr className="text-left">
              <th className="whitespace-nowrap pb-2.5 pr-3 font-mono text-[0.63rem] font-medium uppercase tracking-wide text-faint">
                Action
              </th>
              <th className="whitespace-nowrap pb-2.5 text-[0.63rem] font-mono font-medium uppercase tracking-wide text-faint">
                Credits
              </th>
            </tr>
          </thead>
          <tbody>
            {creditCosts.map((row) => (
              <tr key={row.action} className="border-t border-dashed border-edge">
                <td className="whitespace-nowrap py-2.5 pr-3 text-muted">
                  {row.action}
                </td>
                <td className="whitespace-nowrap py-2.5 font-mono text-[0.7rem] text-accent">
                  {row.credits}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DeviceFrame>
      <RecreatedNote>
        Recreated from the real billing config. Every credit cost is editable
        from this screen, so pricing can move with actual AI spend instead of
        a hardcoded guess from launch day.
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
