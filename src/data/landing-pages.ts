import type { LandingAssetKey } from "@/lib/images/product-image";

export type ProductLandingRouteKey =
  | "t-shirts"
  | "acrylic-frames"
  | "mugs"
  | "business-cards"
  | "posters"
  | "clocks";

export interface LandingFAQ {
  question: string;
  answer: string;
}

export interface LandingUseCase {
  title: string;
  description: string;
}

export interface LandingStep {
  step: number;
  title: string;
  description: string;
}

export interface LandingInspirationImage {
  src: string;
  alt: string;
}

export interface ProductLandingConfig {
  routeKey: ProductLandingRouteKey;
  route: string;
  productSlug: string;
  assetKey: LandingAssetKey;
  navLabel: string;
  title: string;
  headline: string;
  heroEyebrow: string;
  description: string;
  longDescription: string;
  benefits: string[];
  features: string[];
  customizationOptions: string[];
  howItWorks: LandingStep[];
  useCases: LandingUseCase[];
  inspirationImages: LandingInspirationImage[];
  faqs: LandingFAQ[];
  ctaHeadline: string;
  ctaDescription: string;
  fallbackName: string;
  fallbackStartingPrice: number;
}

export const productLandingPages: ProductLandingConfig[] = [
  {
    routeKey: "t-shirts",
    route: "/t-shirts",
    productSlug: "custom-t-shirt",
    assetKey: "tshirt",
    navLabel: "Custom T-Shirts",
    title: "Custom T-Shirts",
    headline: "Wear Your Story on Premium Cotton",
    heroEyebrow: "Apparel Printing",
    description: "Soft cotton tees with vibrant, long-lasting prints tailored to your style.",
    longDescription:
      "Our custom t-shirts combine premium cotton comfort with professional-grade printing. Upload your design, add text, preview in real time, and order a tee that looks as good as it feels — perfect for events, teams, gifts, or everyday expression.",
    benefits: [
      "Breathable premium cotton that holds color wash after wash",
      "Full-front customization with photos, logos, and typography",
      "Real-time preview before you commit to an order",
      "Ideal for events, merch, gifts, and personal style",
    ],
    features: [
      "180 GSM premium cotton",
      "Direct-to-garment vivid prints",
      "Sizes from S to XXL",
      "Upload PNG, JPG, or SVG artwork",
    ],
    customizationOptions: [
      "Upload photos and artwork",
      "Add custom text with font control",
      "Resize and reposition elements",
      "Preview on a realistic tee mockup",
    ],
    howItWorks: [
      { step: 1, title: "Choose Your Tee", description: "Select size and start with a blank premium cotton canvas." },
      { step: 2, title: "Upload & Design", description: "Add your image, logo, or text using our intuitive editor." },
      { step: 3, title: "Preview", description: "See exactly how your design looks before ordering." },
      { step: 4, title: "Order", description: "Add to cart and checkout securely — we handle the rest." },
    ],
    useCases: [
      { title: "Event & Team Merch", description: "Unified designs for reunions, sports teams, and corporate outings." },
      { title: "Personal Gifts", description: "One-of-a-kind tees for birthdays, anniversaries, and celebrations." },
      { title: "Brand Apparel", description: "Startup merch, pop-up shops, and creator collections." },
    ],
    inspirationImages: [
      { src: "/product-assets/tshirt.jpg", alt: "Premium blank custom t-shirt" },
      { src: "/product-assets/mug.jpg", alt: "Custom mug with personalized design" },
    ],
    faqs: [
      { question: "What file types can I upload?", answer: "We accept PNG, JPG, and SVG files. For best results, use high-resolution artwork at 300 DPI." },
      { question: "Will the print fade after washing?", answer: "Our direct-to-garment prints are designed for durability. Follow care instructions for longest-lasting color." },
      { question: "Can I order just one shirt?", answer: "Yes — there is no minimum order quantity for custom t-shirts." },
    ],
    ctaHeadline: "Ready to Print Your Perfect Tee?",
    ctaDescription: "Upload your design, preview instantly, and order a premium custom t-shirt today.",
    fallbackName: "Custom T-Shirt",
    fallbackStartingPrice: 599,
  },
  {
    routeKey: "acrylic-frames",
    route: "/acrylic-frames",
    productSlug: "acrylic-photo-frame",
    assetKey: "acrylic-frame",
    navLabel: "Acrylic Photo Frames",
    title: "Acrylic Photo Frames",
    headline: "Display Memories in Crystal-Clear Acrylic",
    heroEyebrow: "Photo Printing",
    description: "Gallery-quality acrylic displays that showcase your memories with elegance.",
    longDescription:
      "Transform cherished photos into stunning desk and shelf displays. Our acrylic photo frames offer museum-like clarity with a modern, minimalist profile — personalize with your own high-resolution images in minutes.",
    benefits: [
      "Optically clear acrylic for true-to-life photo reproduction",
      "Sleek, modern design suited for desks and shelves",
      "High-resolution printing for sharp detail",
      "A meaningful gift for weddings, travel, and family moments",
    ],
    features: [
      "Crystal-clear acrylic panel",
      "UV-resistant photo printing",
      "Stable base for desk display",
      "Portrait and landscape orientation",
    ],
    customizationOptions: [
      "Upload your favorite photo",
      "Crop and position within the frame",
      "Add optional caption text",
      "Preview before ordering",
    ],
    howItWorks: [
      { step: 1, title: "Select Frame", description: "Choose the acrylic photo frame product." },
      { step: 2, title: "Upload Photo", description: "Add a high-resolution image from your device." },
      { step: 3, title: "Adjust Layout", description: "Crop and position your photo for the perfect fit." },
      { step: 4, title: "Order", description: "Review your preview and place your order." },
    ],
    useCases: [
      { title: "Wedding & Anniversary", description: "Celebrate milestones with an elegant photo display." },
      { title: "Office Desk Decor", description: "Personalize your workspace with meaningful imagery." },
      { title: "Gift Giving", description: "Thoughtful keepsakes for parents, friends, and colleagues." },
    ],
    inspirationImages: [
      { src: "/product-assets/acrylic-frame.jpg", alt: "Acrylic photo frame on desk" },
      { src: "/product-assets/clock.jpg", alt: "Custom acrylic and clock products" },
    ],
    faqs: [
      { question: "What photo resolution do I need?", answer: "We recommend at least 1200×1200 pixels for sharp results. Higher resolution is always better." },
      { question: "Is the acrylic shatterproof?", answer: "Acrylic is lighter and more impact-resistant than glass, making it ideal for homes with children or pets." },
      { question: "Can I use a vertical photo?", answer: "Yes — our editor supports both portrait and landscape orientations." },
    ],
    ctaHeadline: "Frame Your Favorite Moment",
    ctaDescription: "Upload a photo and create a crystal-clear acrylic display in minutes.",
    fallbackName: "Acrylic Photo Frame",
    fallbackStartingPrice: 499,
  },
  {
    routeKey: "mugs",
    route: "/mugs",
    productSlug: "custom-mug",
    assetKey: "mug",
    navLabel: "Custom Mugs",
    title: "Custom Mugs",
    headline: "Start Every Morning with Something Personal",
    heroEyebrow: "Drinkware",
    description: "Ceramic mugs with rich, dishwasher-safe prints perfect for gifts or daily use.",
    longDescription:
      "Design a mug that is uniquely yours — family photos, inside jokes, company logos, or original artwork. Premium ceramic with rich, full-wrap printing that stands up to daily use and makes every coffee break a little more special.",
    benefits: [
      "Premium ceramic with a comfortable handle and weight",
      "Dishwasher-safe prints that stay vibrant",
      "Perfect gift for birthdays, holidays, and office swaps",
      "Full-wrap design coverage for maximum impact",
    ],
    features: [
      "11 oz standard ceramic mug",
      "Full-wrap sublimation printing",
      "Dishwasher and microwave safe",
      "Glossy, vivid finish",
    ],
    customizationOptions: [
      "Upload photos or artwork",
      "Add names, dates, or quotes",
      "Wrap design around the mug",
      "Live preview in the editor",
    ],
    howItWorks: [
      { step: 1, title: "Pick Your Mug", description: "Start with our premium ceramic mug template." },
      { step: 2, title: "Design", description: "Upload images and add text around the wrap area." },
      { step: 3, title: "Preview", description: "See your mug design from every angle." },
      { step: 4, title: "Gift or Keep", description: "Order for yourself or send as a thoughtful gift." },
    ],
    useCases: [
      { title: "Personalized Gifts", description: "Photos, pet portraits, and family names make unforgettable presents." },
      { title: "Office & Corporate", description: "Branded mugs for teams, clients, and conference swag." },
      { title: "Holiday & Seasonal", description: "Festive designs for Christmas, Diwali, and special occasions." },
    ],
    inspirationImages: [
      { src: "/product-assets/mug.jpg", alt: "Custom ceramic mug" },
      { src: "/product-assets/poster.jpg", alt: "Custom poster print" },
    ],
    faqs: [
      { question: "Are the mugs dishwasher safe?", answer: "Yes — our sublimation prints are designed to withstand regular dishwasher use." },
      { question: "Can I put a photo on the whole mug?", answer: "Yes — our editor supports full-wrap designs around the mug surface." },
      { question: "What is the mug capacity?", answer: "Our standard mug holds approximately 11 oz (325 ml)." },
    ],
    ctaHeadline: "Create a Mug They'll Use Every Day",
    ctaDescription: "Design a personalized ceramic mug — the perfect gift or daily essential.",
    fallbackName: "Custom Mug",
    fallbackStartingPrice: 399,
  },
  {
    routeKey: "business-cards",
    route: "/business-cards",
    productSlug: "business-card",
    assetKey: "business-card",
    navLabel: "Business Cards",
    title: "Business Cards",
    headline: "Make a First Impression That Lasts",
    heroEyebrow: "Business Printing",
    description: "Premium cardstock with sharp typography and professional finishes.",
    longDescription:
      "Your business card is often the first tangible piece of your brand someone holds. Upload your logo, refine your layout, and order premium cardstock cards with crisp typography and professional finishes that reflect the quality of your work.",
    benefits: [
      "Premium cardstock with a substantial, professional feel",
      "Sharp, precise printing for logos and fine text",
      "Fast turnaround for networking events and launches",
      "Consistent branding across your stationery",
    ],
    features: [
      "350 GSM premium cardstock",
      "Matte and gloss finish options",
      "Standard 3.5 × 2 inch format",
      "Full-color front and back printing",
    ],
    customizationOptions: [
      "Upload your logo and brand assets",
      "Add contact details and social links",
      "Choose layout and typography",
      "Preview both sides before printing",
    ],
    howItWorks: [
      { step: 1, title: "Upload Brand Assets", description: "Add your logo and contact information." },
      { step: 2, title: "Design Layout", description: "Arrange elements with our editor or templates." },
      { step: 3, title: "Review Proof", description: "Check both sides for accuracy and alignment." },
      { step: 4, title: "Print & Ship", description: "We print on premium stock and deliver to your door." },
    ],
    useCases: [
      { title: "Freelancers & Consultants", description: "Professional cards that win trust at first handshake." },
      { title: "Startups & Small Business", description: "Affordable branding for founders and sales teams." },
      { title: "Events & Conferences", description: "Stock up before networking events and trade shows." },
    ],
    inspirationImages: [
      { src: "/product-assets/business-card.jpg", alt: "Premium business cards" },
      { src: "/product-assets/poster.jpg", alt: "Professional poster printing" },
    ],
    faqs: [
      { question: "What size are the cards?", answer: "Standard business card size: 3.5 × 2 inches (89 × 51 mm)." },
      { question: "Can I print on both sides?", answer: "Yes — full-color printing is available on front and back." },
      { question: "Is there a minimum order?", answer: "Minimum quantities may apply depending on finish — check the product page for details." },
    ],
    ctaHeadline: "Print Cards That Represent Your Brand",
    ctaDescription: "Upload your logo, design your layout, and order professional business cards.",
    fallbackName: "Business Cards",
    fallbackStartingPrice: 299,
  },
  {
    routeKey: "posters",
    route: "/posters",
    productSlug: "custom-poster",
    assetKey: "poster",
    navLabel: "Custom Posters",
    title: "Custom Posters",
    headline: "Turn Your Art Into Wall-Worthy Prints",
    heroEyebrow: "Wall Art",
    description: "Vivid color reproduction on premium paper for walls and interiors.",
    longDescription:
      "Whether it is original artwork, photography, or motivational typography — our custom posters deliver museum-quality color on premium paper. Perfect for bedrooms, studios, retail spaces, and event signage.",
    benefits: [
      "Vivid, accurate color reproduction on premium paper",
      "Multiple sizes for rooms, offices, and retail",
      "Affordable way to refresh any interior",
      "Great for artists, photographers, and decorators",
    ],
    features: [
      "200 GSM premium poster paper",
      "Full-bleed edge-to-edge printing",
      "Matte finish reduces glare",
      "Multiple size options",
    ],
    customizationOptions: [
      "Upload artwork or photography",
      "Add titles and typography",
      "Scale and crop to fit your space",
      "Preview at actual proportions",
    ],
    howItWorks: [
      { step: 1, title: "Choose Poster Size", description: "Pick the dimensions that fit your wall." },
      { step: 2, title: "Upload Artwork", description: "Add your image or design file." },
      { step: 3, title: "Fine-Tune", description: "Crop, scale, and adjust placement." },
      { step: 4, title: "Hang & Enjoy", description: "Receive your print ready to frame or mount." },
    ],
    useCases: [
      { title: "Home Decor", description: "Gallery walls, bedrooms, and living room statement pieces." },
      { title: "Studios & Workspaces", description: "Motivational prints and brand imagery for creative spaces." },
      { title: "Events & Promotions", description: "Eye-catching posters for launches, concerts, and sales." },
    ],
    inspirationImages: [
      { src: "/product-assets/poster.jpg", alt: "Framed poster on wall" },
      { src: "/product-assets/tshirt.jpg", alt: "Custom t-shirt with graphic design" },
    ],
    faqs: [
      { question: "Do posters come framed?", answer: "Posters are printed on premium paper — framing is not included but they are ready to frame." },
      { question: "What resolution should my file be?", answer: "For large prints, we recommend 300 DPI at the final print size for best clarity." },
      { question: "Can I use AI-generated artwork?", answer: "Yes — upload any artwork you have rights to use, including AI Studio creations." },
    ],
    ctaHeadline: "Print Something Worth Hanging",
    ctaDescription: "Upload your artwork and create a vivid custom poster for any space.",
    fallbackName: "Custom Poster",
    fallbackStartingPrice: 199,
  },
  {
    routeKey: "clocks",
    route: "/clocks",
    productSlug: "custom-clock",
    assetKey: "clock",
    navLabel: "Custom Clocks",
    title: "Custom Clocks",
    headline: "Every Hour, Your Design on Display",
    heroEyebrow: "Home Decor",
    description: "Custom wall clocks in multiple premium shapes — your design, every hour.",
    longDescription:
      "A custom wall clock is functional art for any room. Choose from multiple premium shapes, upload your photo or artwork, and create a timepiece that reflects your personality — quiet movement, bold design, and a conversation starter on any wall.",
    benefits: [
      "Multiple shape options — round, square, hexagon, heart, and more",
      "Quiet clock movement for bedrooms and offices",
      "Bold personalized designs that double as decor",
      "Unique gift for housewarmings and celebrations",
    ],
    features: [
      "Premium wall clock mechanism",
      "Multiple shape selections",
      "Full-face custom printing",
      "Silent sweep movement",
    ],
    customizationOptions: [
      "Choose your clock shape",
      "Upload photos or graphic designs",
      "Add text and decorative elements",
      "Preview on shape-accurate mockup",
    ],
    howItWorks: [
      { step: 1, title: "Pick a Shape", description: "Select from round, square, hexagon, heart, star, and more." },
      { step: 2, title: "Design the Face", description: "Upload artwork and customize the clock face." },
      { step: 3, title: "Preview", description: "See your design on the exact shape you chose." },
      { step: 4, title: "Order", description: "We assemble and ship your custom timepiece." },
    ],
    useCases: [
      { title: "Kids' Rooms", description: "Fun shapes and favorite characters for nurseries and playrooms." },
      { title: "Home Offices", description: "Motivational designs that keep you on schedule in style." },
      { title: "Unique Gifts", description: "Housewarming, wedding, and anniversary presents they'll actually use." },
    ],
    inspirationImages: [
      { src: "/product-assets/clock.jpg", alt: "Custom wall clock" },
      { src: "/product-assets/acrylic-frame.jpg", alt: "Acrylic photo frame display" },
    ],
    faqs: [
      { question: "What shapes are available?", answer: "Heart, Round, Square, Oval, Rhombus, Custom, and Rectangle — each with a real product preview. Select your shape in the customization editor." },
      { question: "Is the clock movement silent?", answer: "Yes — we use quiet sweep mechanisms suitable for bedrooms and quiet workspaces." },
      { question: "Does it include a battery?", answer: "Clocks ship ready to hang; battery requirements are listed on the product page." },
    ],
    ctaHeadline: "Design a Clock That's Uniquely Yours",
    ctaDescription: "Choose a shape, upload your design, and create custom wall art that tells time.",
    fallbackName: "Custom Clock",
    fallbackStartingPrice: 799,
  },
];

const landingByRouteKey = new Map(
  productLandingPages.map((p) => [p.routeKey, p]),
);

const landingByRoute = new Map(
  productLandingPages.map((p) => [p.route, p]),
);

const landingByProductSlug = new Map(
  productLandingPages.map((p) => [p.productSlug, p]),
);

export function getLandingPageConfig(
  routeKey: ProductLandingRouteKey,
): ProductLandingConfig {
  const config = landingByRouteKey.get(routeKey);
  if (!config) throw new Error(`Unknown landing route key: ${routeKey}`);
  return config;
}

export function getLandingPageByRoute(route: string): ProductLandingConfig | undefined {
  return landingByRoute.get(route);
}

export function getLandingPageByProductSlug(slug: string): ProductLandingConfig | undefined {
  return landingByProductSlug.get(slug);
}

export function getAllLandingRoutes(): string[] {
  return productLandingPages.map((p) => p.route);
}
