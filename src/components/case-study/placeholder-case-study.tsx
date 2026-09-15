import {
  CaseStudyHeader,
  CaseStudyMeta,
} from "@/components/case-study/case-study-parts";
import { Reveal } from "@/components/reveal";

export function PlaceholderCaseStudy({
  title,
  lede,
  client,
  stat,
  liveUrl,
  agencyUrl,
}: {
  title: string;
  lede: string;
  client: string;
  stat: string;
  liveUrl?: string;
  agencyUrl?: string;
}) {
  return (
    <>
      <CaseStudyHeader
        eyebrow="Work, still being written"
        title={title}
        lede={lede}
        meta={
          <CaseStudyMeta
            client={client}
            via="Sparky (a Shopify agency)"
            role="TBD, haven't confirmed my exact part yet"
            stack={["Shopify Plus", "Custom Theme"]}
            liveUrl={liveUrl}
            agencyUrl={agencyUrl}
            notClient
          />
        }
      />

      <Reveal className="mb-10 rounded-xl border border-dashed border-edge p-5">
        <p className="font-mono text-xs leading-relaxed text-faint">
          <b className="text-muted">Placeholder page:</b> pulled and
          reworded from what&apos;s publicly documented about this project,
          not my own account of it yet. I&apos;ll come back and fix this
          once I sort out exactly what I did here.
        </p>
      </Reveal>

      <Reveal delay={0.05}>
        <p className="mb-2 font-mono text-sm text-green">{stat}</p>
        <p className="max-w-[60ch] text-lg leading-relaxed text-muted">
          Full write-up coming soon.
        </p>
      </Reveal>
    </>
  );
}
