"use client";

export function CampaignTrustSection() {
  const trustFeatures = [
    {
      title: "Premium Print Quality",
      description: "Industrial HD printing with crisp vivid colors and fade-resistant durability.",
      icon: "✨",
    },
    {
      title: "Personalized Just For You",
      description: "Every item is custom-crafted to order with your selected photos and text.",
      icon: "🎁",
    },
    {
      title: "Fast Delivery Across India",
      description: "Express insured shipping covering 25,000+ pin codes with live package tracking.",
      icon: "🚀",
    },
    {
      title: "Secure Payments & COD",
      description: "Pay with ease using UPI (GPay/PhonePe), Credit/Debit Cards, Net Banking or COD.",
      icon: "🔒",
    },
    {
      title: "Easy Real-Time Preview",
      description: "Visual live design editor with realistic mockup rendering before purchasing.",
      icon: "🎨",
    },
    {
      title: "100% Satisfaction Assured",
      description: "Dedicated customer support ready to assist you via WhatsApp and phone.",
      icon: "🛡️",
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-[#F6F7FB] border-t border-gray-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h3 className="font-display text-xl sm:text-2xl font-bold text-gray-900">
            Why Thousands of Indian Families Trust Print World
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-gray-600">
            Over 50,000+ personalized gifts delivered with love and 5-star verified reviews.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {trustFeatures.map((feat) => (
            <div
              key={feat.title}
              className="flex flex-col items-center text-center p-4 rounded-xl bg-white border border-gray-200/80 shadow-xs hover:border-[#6C2BD9]/30 transition-all"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-xl text-[#6C2BD9] mb-3">
                {feat.icon}
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">
                {feat.title}
              </h4>
              <p className="mt-1 text-[11px] text-gray-500 leading-snug hidden sm:block">
                {feat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
