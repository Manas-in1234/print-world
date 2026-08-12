import { designSteps } from "@/data/design-steps";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const stepIconKeys = ["upload", "customize", "ai-generate"] as const;

function StepIcon({ name }: { name: (typeof stepIconKeys)[number] }) {
  if (name === "upload") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
      </svg>
    );
  }
  if (name === "customize") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
      </svg>
    );
  }
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
    </svg>
  );
}

export function DesignSteps() {
  return (
    <section className="bg-surface/50 py-16 sm:py-20">
      <Container>
        <SectionHeading
          title="Design It Your Way"
          description="Three simple steps from idea to finished product — upload, customize, and let AI elevate your design."
        />
        <div className="relative grid gap-10 md:grid-cols-3 md:gap-8">
          <div className="absolute left-[16.67%] right-[16.67%] top-12 hidden h-px bg-gradient-to-r from-transparent via-card-border to-transparent md:block" aria-hidden="true" />
          {designSteps.map((step, index) => (
            <article key={step.id} className="relative flex flex-col items-center text-center">
              <div className="relative z-10 mb-6">
                <span className="font-display text-5xl font-light text-accent/30">
                  {String(step.step).padStart(2, "0")}
                </span>
                <div className="absolute -bottom-2 left-1/2 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-2xl border border-card-border bg-card text-accent shadow-soft">
                  <StepIcon name={stepIconKeys[index]} />
                </div>
              </div>
              <h3 className="mt-4 font-display text-xl font-semibold text-foreground">{step.title}</h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">{step.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
