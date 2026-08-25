import { Container } from "@/components/ui/Container";

const trustBadges = [
  {
    title: "Secure Checkout",
    desc: "Razorpay SSL encrypted payments",
    icon: "🔒",
  },
  {
    title: "Multiple Payment Options",
    desc: "UPI, Google Pay, Cards, NetBanking, COD",
    icon: "💳",
  },
  {
    title: "Easy Customization",
    desc: "Live mockups and intuitive tools",
    icon: "🎨",
  },
  {
    title: "Order Tracking",
    desc: "Real-time updates via SMS & Email",
    icon: "📦",
  },
  {
    title: "Customer Support",
    desc: "Direct WhatsApp & Email assistance",
    icon: "💬",
  },
];

export function TrustBenefitsSection() {
  return (
    <section className="bg-[#F6F7FB] py-10 sm:py-14 border-b border-gray-200">
      <Container>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 sm:gap-4">
          {trustBadges.map((badge) => (
            <div
              key={badge.title}
              className="flex items-center gap-3 rounded-2xl border border-gray-200/80 bg-white p-3.5 shadow-xs"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F3E8FF] text-xl">
                {badge.icon}
              </div>
              <div>
                <h3 className="text-xs font-bold text-gray-900 sm:text-sm">
                  {badge.title}
                </h3>
                <p className="text-[11px] text-[#6B7280]">
                  {badge.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
