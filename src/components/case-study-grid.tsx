import { RevealGroup, RevealItem } from "@/components/reveal";
import { CaseStudyCard } from "@/components/case-study-card";
import type { CaseStudy } from "@/lib/content/types";

export function CaseStudyGrid({ studies }: { studies: CaseStudy[] }) {
  return (
    <RevealGroup className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2">
      {studies.map((study, i) => (
        <RevealItem key={study._id}>
          <CaseStudyCard study={study} priority={i < 2} />
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
