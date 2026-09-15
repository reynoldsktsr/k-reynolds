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
    title: "Built the customizer",
    description:
      "Where you attach your story to a print and see exactly what you're getting before it ships.",
  },
  {
    title: "Built a landing page system meant to last",
    description:
      "Scan the glass and it opens a page that plays back a video, an audio file, or a link from YouTube, Vimeo, or SoundCloud. Built with the goal of never going down.",
  },
  {
    title: "Positioned the QR code live, through Cloudinary",
    description:
      "The code gets placed onto the product preview in real time, right where you put it. What you see while customizing is what actually gets printed.",
  },
];

export function FractureCaseStudy() {
  return (
    <>
      <CaseStudyHeader
        eyebrow="Case study"
        title="Fracture: a QR code that has to work forever"
        lede="Fracture prints your photos onto glass. Their StoryGlass feature adds a small QR code to the print that opens up a video or audio memory. Once that glass is printed, it's permanent, so the link behind that code has to keep working forever, not just until somebody migrates a server."
        meta={
          <CaseStudyMeta
            client="Fracture"
            via="Sparky (a Shopify agency)"
            role="Senior full-stack engineer"
            stack={["Shopify (Headless)", "Cloudinary", "Custom Landing Pages"]}
          />
        }
      />

      <BuiltList items={builtItems} />

      <CaseStudySubhead>The customizer</CaseStudySubhead>
      <DeviceFrame caption="StoryGlass customizer (recreated)">
        <div className="grid grid-cols-[110px_1fr] gap-5">
          <div className="flex flex-col gap-3.5">
            <div className="rounded-md px-2.5 py-2 font-mono text-xs text-faint">
              Edit
            </div>
            <div className="rounded-md px-2.5 py-2 font-mono text-xs text-faint">
              Size
            </div>
            <div className="rounded-md border border-edge-soft bg-surface-2 px-2.5 py-2 font-mono text-xs text-foreground">
              Story
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="rounded-lg border border-dashed border-edge p-5 text-center font-mono text-xs text-faint">
              Upload video or audio
              <br />
              or add a link
            </div>
            <div className="flex flex-wrap gap-1.5">
              {["YouTube", "Vimeo", "SoundCloud", "MP4 / MP3"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-edge-soft bg-surface-2 px-2.5 py-1 font-mono text-xs text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="relative flex aspect-[4/5] max-w-[170px] items-center justify-center rounded-lg border border-edge bg-surface-2">
              <span className="absolute left-3.5 top-3.5 h-6 w-6 rounded bg-[repeating-conic-gradient(var(--foreground)_0%_25%,transparent_0%_50%)] bg-[length:8px_8px]" />
              <span className="font-mono text-xs text-faint">
                live print preview
              </span>
            </div>
          </div>
        </div>
      </DeviceFrame>
      <RecreatedNote>
        Recreated layout only. No customer content involved.
      </RecreatedNote>

      <PullQuote>
        A physical product with a digital piece attached{" "}
        <span className="text-accent">only works if that piece never breaks.</span>
      </PullQuote>
    </>
  );
}
