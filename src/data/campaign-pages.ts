export interface CampaignCategoryItem {
  name: string;
  image: string;
  href: string;
  price: string;
  desc: string;
  badge?: string;
}

export interface CampaignGiftGuideItem {
  recipient: string;
  image: string;
  desc: string;
  href: string;
  tag: string;
}

export interface CampaignData {
  slug: string;
  title: string;
  subtitle: string;
  eyebrow: string;
  offer: string;
  offerCode: string;
  primaryCta: string;
  primaryCtaHref: string;
  secondaryCta: string;
  secondaryCtaHref: string;
  theme: "diwali" | "rakhi" | "wedding";
  heroVisualProducts: {
    title: string;
    image: string;
    slug: string;
    tag: string;
    price: string;
  }[];
  categories: CampaignCategoryItem[];
  trendingProductSlugs: string[];
  giftGuideTitle: string;
  giftGuideSubtitle: string;
  giftGuide: CampaignGiftGuideItem[];
  offerBanner: {
    headline: string;
    subheadline: string;
    discount: string;
    code: string;
    startingPrice: string;
    cta: string;
    href: string;
  };
  finalCta: {
    headline: string;
    subheadline: string;
    primaryCta: string;
    primaryHref: string;
    secondaryCta: string;
    secondaryHref: string;
  };
  seo: {
    title: string;
    description: string;
  };
}

export interface CampaignSlide {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  offer: string;
  tags: string[];
  cta: string;
  href: string;
  icon: string;
  theme: "diwali" | "rakhi" | "wedding";
  badgeBg: string;
  badgeText: string;
  btnBg: string;
  bgGradient: string;
  borderColor: string;
  glowColor: string;
  images: {
    src: string;
    alt: string;
    label: string;
    price?: string;
  }[];
}

export const campaignSlides: CampaignSlide[] = [
  {
    id: "diwali",
    slug: "diwali",
    title: "Diwali Festive Offers",
    subtitle: "Light up celebrations with personalized gifts",
    offer: "UP TO 40% OFF",
    tags: ["Custom Photo Frames", "Festive Mugs", "Shubh Diwali Clocks"],
    cta: "Shop Diwali Gifts →",
    href: "/diwali",
    icon: "🪔",
    theme: "diwali",
    badgeBg: "bg-[#FFD200]",
    badgeText: "text-gray-950",
    btnBg: "bg-[#E5007D] hover:bg-[#c9006e] text-white",
    bgGradient: "from-[#200336] via-[#3B075C] to-[#160226]",
    borderColor: "border-amber-400/40 hover:border-amber-400",
    glowColor: "bg-amber-400/20",
    images: [
      {
        src: "/product-assets/acrylic-frame.jpg",
        alt: "Personalized Photo Frame",
        label: "Photo Frames",
        price: "₹499",
      },
      {
        src: "/product-assets/mug.jpg",
        alt: "Festive Personalized Mug",
        label: "Festive Mug",
        price: "₹299",
      },
      {
        src: "/product-assets/clock.jpg",
        alt: "Custom Wall Clock",
        label: "Shubh Diwali Clock",
        price: "₹799",
      },
    ],
  },
  {
    id: "raksha-bandhan",
    slug: "raksha-bandhan",
    title: "Raksha Bandhan Special",
    subtitle: "Celebrate the sibling bond with gifts they'll cherish",
    offer: "UP TO 30% OFF",
    tags: ["Best Brother Tees", "Superhero Mugs", "Sibling Keepsakes"],
    cta: "Shop Rakhi Gifts →",
    href: "/raksha-bandhan",
    icon: "🌸",
    theme: "rakhi",
    badgeBg: "bg-pink-100 border border-pink-300",
    badgeText: "text-pink-900 font-black",
    btnBg: "bg-[#E5007D] hover:bg-[#c9006e] text-white",
    bgGradient: "from-[#380424] via-[#5C0A3B] to-[#240319]",
    borderColor: "border-pink-300/40 hover:border-pink-300",
    glowColor: "bg-pink-500/20",
    images: [
      {
        src: "/product-assets/tshirt.jpg",
        alt: "Best Brother Custom T-Shirt",
        label: "Brother Tees",
        price: "₹499",
      },
      {
        src: "/product-assets/mug.jpg",
        alt: "Superhero Sibling Mug",
        label: "Superhero Mug",
        price: "₹299",
      },
      {
        src: "/product-assets/acrylic-frame.jpg",
        alt: "Sibling Keepsake Frame",
        label: "Memory Frame",
        price: "₹499",
      },
    ],
  },
  {
    id: "wedding-gifts",
    slug: "wedding-gifts",
    title: "Wedding Gifts Made Memorable",
    subtitle: "Personalized gifts for the most beautiful beginnings",
    offer: "UP TO 40% OFF",
    tags: ["Acrylic Couple Frames", "Heirloom Clocks", "Couple Mug Pairs"],
    cta: "Explore Wedding Gifts →",
    href: "/wedding-gifts",
    icon: "💍",
    theme: "wedding",
    badgeBg: "bg-amber-100 border border-amber-300",
    badgeText: "text-amber-950 font-black",
    btnBg: "bg-[#881337] hover:bg-[#680e29] text-white",
    bgGradient: "from-[#2A0E2A] via-[#481845] to-[#1A091A]",
    borderColor: "border-amber-300/40 hover:border-amber-300",
    glowColor: "bg-amber-300/20",
    images: [
      {
        src: "/product-assets/clock.jpg",
        alt: "Custom Heirloom Wall Clock",
        label: "Heirloom Clock",
        price: "₹799",
      },
      {
        src: "/product-assets/acrylic-frame.jpg",
        alt: "Acrylic Couple Photo Frame",
        label: "Couple Frame",
        price: "₹499",
      },
      {
        src: "/product-assets/mug.jpg",
        alt: "Couple Ceramic Mug Pair",
        label: "Couple Mug",
        price: "₹299",
      },
    ],
  },
];

export const campaignPages: Record<string, CampaignData> = {
  diwali: {
    slug: "diwali",
    title: "Diwali Gifts Made Personal",
    subtitle: "Light up every celebration with gifts made especially for the people who matter.",
    eyebrow: "✨ Festival of Lights Special",
    offer: "Up to 40% OFF",
    offerCode: "DIWALI40",
    primaryCta: "Shop Diwali Gifts",
    primaryCtaHref: "#categories",
    secondaryCta: "Explore All Gifts",
    secondaryCtaHref: "/products",
    theme: "diwali",
    heroVisualProducts: [
      {
        title: "Happy Diwali Mug",
        image: "/product-assets/mug.jpg",
        slug: "custom-mug",
        tag: "Bestseller",
        price: "₹299",
      },
      {
        title: "Acrylic Festive Frame",
        image: "/product-assets/acrylic-frame.jpg",
        slug: "acrylic-photo-frame",
        tag: "Premium",
        price: "₹499",
      },
      {
        title: "Shubh Diwali Wall Clock",
        image: "/product-assets/clock.jpg",
        slug: "custom-clock",
        tag: "Festive Special",
        price: "₹799",
      },
      {
        title: "Family Celebration Tee",
        image: "/product-assets/tshirt.jpg",
        slug: "custom-t-shirt",
        tag: "Bio-Washed",
        price: "₹499",
      },
    ],
    categories: [
      {
        name: "Personalized Mugs",
        image: "/product-assets/mug.jpg",
        href: "/customize/custom-mug",
        price: "From ₹299",
        desc: "Festive ceramic & magic mugs with traditional festive designs & family photos.",
        badge: "Popular",
      },
      {
        name: "Photo Frames",
        image: "/product-assets/acrylic-frame.jpg",
        href: "/customize/acrylic-photo-frame",
        price: "From ₹499",
        desc: "High-gloss crystal acrylic frames to preserve warm Diwali puja & family moments.",
        badge: "High Gloss",
      },
      {
        name: "Custom Clocks",
        image: "/product-assets/clock.jpg",
        href: "/customize/custom-clock",
        price: "From ₹799",
        desc: "Shubh Diwali themed wall clocks available in round, square, star & custom shapes.",
        badge: "Handcrafted",
      },
      {
        name: "Personalized T-Shirts",
        image: "/product-assets/tshirt.jpg",
        href: "/customize/custom-t-shirt",
        price: "From ₹499",
        desc: "100% bio-washed cotton tees customized for Diwali get-togethers & team events.",
        badge: "100% Cotton",
      },
      {
        name: "Gift Sets & Hampers",
        image: "/product-assets/hero-products.jpg",
        href: "/services#personalized-products",
        price: "From ₹699",
        desc: "Thoughtful curated gift packs with personalized mugs, frames & celebratory cards.",
        badge: "Special Combo",
      },
      {
        name: "Business & Client Gifts",
        image: "/product-assets/business-card.jpg",
        href: "/business",
        price: "Volume Rates",
        desc: "Custom corporate Diwali gifts, gold foil cards, and branded merchandise with GST invoices.",
        badge: "Bulk Discounts",
      },
    ],
    trendingProductSlugs: [
      "custom-mug",
      "acrylic-photo-frame",
      "custom-clock",
      "custom-t-shirt",
      "custom-poster",
    ],
    giftGuideTitle: "Find the Perfect Diwali Gift",
    giftGuideSubtitle: "Thoughtfully curated personalized surprises for everyone celebrating this festive season",
    giftGuide: [
      {
        recipient: "For Parents",
        image: "/product-assets/acrylic-frame.jpg",
        desc: "Cherished family portrait framed in gallery-quality crystal acrylic.",
        href: "/customize/acrylic-photo-frame",
        tag: "Most Cherished",
      },
      {
        recipient: "For Friends",
        image: "/product-assets/mug.jpg",
        desc: "Personalized photo mugs with festive greetings and shared memories.",
        href: "/customize/custom-mug",
        tag: "Fun & Festive",
      },
      {
        recipient: "For Couples",
        image: "/product-assets/clock/heart.jpg",
        desc: "Heart-shaped custom wall clocks marking their festive celebrations.",
        href: "/customize/custom-clock",
        tag: "Warm & Cozy",
      },
      {
        recipient: "For Colleagues",
        image: "/product-assets/tshirt.jpg",
        desc: "Custom printed festive tees for Diwali office celebrations & parties.",
        href: "/customize/custom-t-shirt",
        tag: "Team Spirit",
      },
      {
        recipient: "For Clients",
        image: "/product-assets/business-card.jpg",
        desc: "Executive gift kits, gold foil greeting cards, and branded desk accessories.",
        href: "/business",
        tag: "Corporate Elite",
      },
    ],
    offerBanner: {
      headline: "Celebrate More. Save More.",
      subheadline: "Personalized Diwali gifts starting from ₹299 with free express shipping across India",
      discount: "UP TO 40% OFF",
      code: "DIWALI40",
      startingPrice: "₹299",
      cta: "Shop Diwali Offers",
      href: "#trending",
    },
    finalCta: {
      headline: "Make This Diwali More Personal.",
      subheadline: "Create one-of-a-kind gifts that bring smiles, light up living rooms, and stay cherished for years.",
      primaryCta: "Start Creating",
      primaryHref: "/customize/custom-mug",
      secondaryCta: "Explore Products",
      secondaryHref: "/products",
    },
    seo: {
      title: "Diwali Personalized Gifts & Offers | Print World",
      description: "Celebrate Diwali with up to 40% off on personalized gifts, custom photo frames, Diwali mugs, clocks, and corporate hampers. Fast delivery across India.",
    },
  },

  "raksha-bandhan": {
    slug: "raksha-bandhan",
    title: "Gifts That Celebrate Your Bond",
    subtitle: "Make Raksha Bandhan unforgettable with personalized gifts for your favourite people.",
    eyebrow: "🌸 Rakhi Special Collection",
    offer: "Up to 30% OFF",
    offerCode: "RAKHI30",
    primaryCta: "Shop Raksha Bandhan Gifts",
    primaryCtaHref: "#categories",
    secondaryCta: "Explore Gifts",
    secondaryCtaHref: "/products",
    theme: "rakhi",
    heroVisualProducts: [
      {
        title: "Best Brother Ever Tee",
        image: "/product-assets/tshirt.jpg",
        slug: "custom-t-shirt",
        tag: "Top Sibling Pick",
        price: "₹499",
      },
      {
        title: "Superhero Sister Mug",
        image: "/product-assets/mug.jpg",
        slug: "custom-mug",
        tag: "Bestseller",
        price: "₹299",
      },
      {
        title: "Sibling Memory Frame",
        image: "/product-assets/acrylic-frame.jpg",
        slug: "acrylic-photo-frame",
        tag: "Cherished",
        price: "₹499",
      },
      {
        title: "Childhood Moments Clock",
        image: "/product-assets/clock.jpg",
        slug: "custom-clock",
        tag: "Handcrafted",
        price: "₹799",
      },
    ],
    categories: [
      {
        name: "Personalized Mugs",
        image: "/product-assets/mug.jpg",
        href: "/customize/custom-mug",
        price: "From ₹299",
        desc: "'Best Brother Ever' & 'World's Best Sister' mugs with your cherished photos.",
        badge: "Most Loved",
      },
      {
        name: "Custom T-Shirts",
        image: "/product-assets/tshirt.jpg",
        href: "/customize/custom-t-shirt",
        price: "From ₹499",
        desc: "Fun matching sibling quotes, anime designs, and bio-washed comfy cotton tees.",
        badge: "100% Cotton",
      },
      {
        name: "Photo Frames",
        image: "/product-assets/acrylic-frame.jpg",
        href: "/customize/acrylic-photo-frame",
        price: "From ₹499",
        desc: "Frameless acrylic photos capturing childhood nostalgia & sibling adventures.",
        badge: "High Gloss",
      },
      {
        name: "Gift Sets",
        image: "/product-assets/hero-products.jpg",
        href: "/services#personalized-products",
        price: "From ₹649",
        desc: "Personalized combo boxes with custom mug, sibling card, and customized keepsakes.",
        badge: "Complete Combo",
      },
      {
        name: "Custom Clocks",
        image: "/product-assets/clock.jpg",
        href: "/customize/custom-clock",
        price: "From ₹799",
        desc: "Heart and round shaped sibling wall clocks that turn memories into daily decor.",
        badge: "7 Shapes",
      },
      {
        name: "Keepsakes & Posters",
        image: "/product-assets/poster.jpg",
        href: "/customize/custom-poster",
        price: "From ₹249",
        desc: "Vivid HD photo posters and personalized wall art printed on archival cardstock.",
        badge: "Vibrant",
      },
    ],
    trendingProductSlugs: [
      "custom-t-shirt",
      "custom-mug",
      "acrylic-photo-frame",
      "custom-clock",
      "custom-poster",
    ],
    giftGuideTitle: "Made for Every Kind of Bond",
    giftGuideSubtitle: "Personalized tokens crafted with love for brothers, sisters, and lifelong partners in crime",
    giftGuide: [
      {
        recipient: "Brother",
        image: "/product-assets/tshirt.jpg",
        desc: "Superhero graphics and witty sibling quotes on premium cotton apparel.",
        href: "/customize/custom-t-shirt",
        tag: "For Bhai",
      },
      {
        recipient: "Sister",
        image: "/product-assets/mug.jpg",
        desc: "Personalized coffee mug with childhood memories and sweet heartfelt messages.",
        href: "/customize/custom-mug",
        tag: "For Behen",
      },
      {
        recipient: "Best Friend",
        image: "/product-assets/acrylic-frame.jpg",
        desc: "Frameless crystal acrylic portrait celebrating your unbreakable friendship.",
        href: "/customize/acrylic-photo-frame",
        tag: "Like Family",
      },
      {
        recipient: "Cousin",
        image: "/product-assets/poster.jpg",
        desc: "High-definition custom wall art collage featuring family vacations and get-togethers.",
        href: "/customize/custom-poster",
        tag: "Nostalgic",
      },
      {
        recipient: "Family",
        image: "/product-assets/clock.jpg",
        desc: "Custom wall clock uniting all siblings' memories in a stylish decorative piece.",
        href: "/customize/custom-clock",
        tag: "Everlasting",
      },
    ],
    offerBanner: {
      headline: "Celebrate the Bond. Save More.",
      subheadline: "Special sibling combos with up to 30% OFF & guaranteed express delivery across India",
      discount: "UP TO 30% OFF",
      code: "RAKHI30",
      startingPrice: "₹299",
      cta: "Shop Rakhi Specials",
      href: "#trending",
    },
    finalCta: {
      headline: "Celebrate the Bond. Gift Something Personal.",
      subheadline: "Turn silly childhood photos and warm heartfelt wishes into gifts they will proudly keep forever.",
      primaryCta: "Start Creating",
      primaryHref: "/customize/custom-t-shirt",
      secondaryCta: "Explore Products",
      secondaryHref: "/products",
    },
    seo: {
      title: "Raksha Bandhan Personalized Gifts | Print World",
      description: "Celebrate sibling love with custom Raksha Bandhan gifts. Personalized sibling t-shirts, custom photo mugs, acrylic frames & gifts sets with express delivery across India.",
    },
  },

  "wedding-gifts": {
    slug: "wedding-gifts",
    title: "Make Their Big Day Even More Special",
    subtitle: "Personalized wedding gifts made for unforgettable beginnings.",
    eyebrow: "💍 Luxury Wedding Collection",
    offer: "Up to 40% OFF",
    offerCode: "WEDDING40",
    primaryCta: "Shop Wedding Gifts",
    primaryCtaHref: "#categories",
    secondaryCta: "Explore Wedding Collection",
    secondaryCtaHref: "/products",
    theme: "wedding",
    heroVisualProducts: [
      {
        title: "Acrylic Couple Portrait",
        image: "/product-assets/acrylic-frame.jpg",
        slug: "acrylic-photo-frame",
        tag: "Gallery Finish",
        price: "₹699",
      },
      {
        title: "Custom Wedding Clock",
        image: "/product-assets/clock.jpg",
        slug: "custom-clock",
        tag: "Heirloom Piece",
        price: "₹799",
      },
      {
        title: "Mr & Mrs Mug Pair",
        image: "/product-assets/mug.jpg",
        slug: "custom-mug",
        tag: "Couple Classic",
        price: "₹299",
      },
      {
        title: "Wedding Vows Poster",
        image: "/product-assets/poster.jpg",
        slug: "custom-poster",
        tag: "Museum Matte",
        price: "₹249",
      },
    ],
    categories: [
      {
        name: "Acrylic Frames",
        image: "/product-assets/acrylic-frame.jpg",
        href: "/customize/acrylic-photo-frame",
        price: "From ₹499",
        desc: "Frameless high-gloss acrylic wedding portrait prints with unmatched depth and clarity.",
        badge: "Most Loved",
      },
      {
        name: "Custom Clocks",
        image: "/product-assets/clock.jpg",
        href: "/customize/custom-clock",
        price: "From ₹799",
        desc: "Handcrafted round, heart & Roman numeral couple clocks engraved with wedding dates.",
        badge: "Handcrafted",
      },
      {
        name: "Personalized Mugs",
        image: "/product-assets/mug.jpg",
        href: "/customize/custom-mug",
        price: "From ₹299",
        desc: "Pair mugs customized with couple portraits, wedding dates, and heartfelt monograms.",
        badge: "Couple Set",
      },
      {
        name: "Wedding Gift Sets",
        image: "/product-assets/hero-products.jpg",
        href: "/services#personalized-products",
        price: "From ₹899",
        desc: "Luxury gift hampers with bespoke memory keepsakes, greeting scrolls & keepsake frames.",
        badge: "Premium Hamper",
      },
      {
        name: "Photo Gifts & Keepsakes",
        image: "/product-assets/poster.jpg",
        href: "/customize/custom-poster",
        price: "From ₹249",
        desc: "Museum-grade matte wedding vow & reception prints made for bedroom and living walls.",
        badge: "Vibrant Finish",
      },
      {
        name: "Premium Keepsakes & Favors",
        image: "/product-assets/business-card.jpg",
        href: "/business",
        price: "Volume Rates",
        desc: "Custom foil wedding invitations, thank you cards, and personalized return favors.",
        badge: "Bulk Rates",
      },
    ],
    trendingProductSlugs: [
      "acrylic-photo-frame",
      "custom-clock",
      "custom-mug",
      "custom-poster",
      "custom-t-shirt",
    ],
    giftGuideTitle: "Gift Them Something They'll Remember",
    giftGuideSubtitle: "Thoughtfully curated heirloom gifts for newly married couples and wedding guests",
    giftGuide: [
      {
        recipient: "For the Couple",
        image: "/product-assets/acrylic-frame.jpg",
        desc: "Large frameless acrylic portrait featuring wedding vows and their milestone date.",
        href: "/customize/acrylic-photo-frame",
        tag: "Heirloom Gift",
      },
      {
        recipient: "For Bride",
        image: "/product-assets/mug.jpg",
        desc: "Personalized bridal morning coffee mug & cherish memory frame.",
        href: "/customize/custom-mug",
        tag: "Elegant Keepsake",
      },
      {
        recipient: "For Groom",
        image: "/product-assets/tshirt.jpg",
        desc: "Custom bio-washed couple apparel made for honeymoon journeys.",
        href: "/customize/custom-t-shirt",
        tag: "Modern Lifestyle",
      },
      {
        recipient: "For Friends",
        image: "/product-assets/clock/round.jpg",
        desc: "Designer couple clock capturing engagement & sangeet highlights.",
        href: "/customize/custom-clock",
        tag: "Cherished Token",
      },
      {
        recipient: "For Family",
        image: "/product-assets/poster.jpg",
        desc: "Grand format family union portrait prints with museum-grade archival matte finish.",
        href: "/customize/custom-poster",
        tag: "Family Treasure",
      },
    ],
    offerBanner: {
      headline: "Celebrate More. Save More.",
      subheadline: "Luxury personalized wedding gifts starting from ₹399 with premium gift box packaging",
      discount: "UP TO 40% OFF",
      code: "WEDDING40",
      startingPrice: "₹399",
      cta: "Shop Wedding Offers",
      href: "#trending",
    },
    finalCta: {
      headline: "Give Them a Memory They'll Keep Forever.",
      subheadline: "From the wedding mandap to their new home walls — give the gift of personalized art that lasts a lifetime.",
      primaryCta: "Start Creating",
      primaryHref: "/customize/acrylic-photo-frame",
      secondaryCta: "Explore Wedding Collection",
      secondaryHref: "/products",
    },
    seo: {
      title: "Personalized Wedding Gifts | Print World",
      description: "Discover bespoke personalized wedding gifts, custom acrylic couple portraits, wedding clocks, engraved keepsakes, and return gift favors. Fast shipping across India.",
    },
  },
};
