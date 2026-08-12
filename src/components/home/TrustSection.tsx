import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const trustPoints = [
  {
    title: "Premium Materials",
    description: "Professional-grade cotton, acrylic, ceramic, and paper stocks on every product line.",
  },
  {
    title: "Color Accuracy",
    description: "Vivid, true-to-life prints with careful production and quality checks.",
  },
  {
    title: "Secure Checkout",
    description: "Encrypted payments via Razorpay with clear order confirmation.",
  },
  {
    title: "Dedicated Support",
    description: "Help with orders, customization, and shipping from our team.",
  },
];

export function TrustSection() {
  return (
    <section className="border-y border-card-border bg-surface/40 py-16 sm:py-20">
      <Container>
        <SectionHeading
          title="Built on Quality You Can Trust"
          description="Every Print World order is produced with premium materials, secure checkout, and care from start to delivery."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trustPoints.map((point) => (
            <article
              key={point.title}
              className="rounded-2xl border border-card-border bg-card p-6 text-center shadow-soft"
            >
              <h3 className="font-display text-lg font-semibold text-foreground">{point.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{point.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
