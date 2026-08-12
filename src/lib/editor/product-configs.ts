export interface ProductEditorConfig {
  slug: string;
  label: string;
  previewType: "tshirt" | "frame" | "mug" | "card" | "poster" | "clock";
  supportsShapes: boolean;
  supportsShirtColor: boolean;
  supportsMugColor: boolean;
  supportsSize: boolean;
  supportsMaterial: boolean;
  supportsClockOptions: boolean;
  supportsCardFields: boolean;
  supportsCollage: boolean;
  defaultShape?: string;
}

export const PRODUCT_EDITOR_CONFIGS: Record<string, ProductEditorConfig> = {
  "custom-t-shirt": {
    slug: "custom-t-shirt",
    label: "Custom T-Shirt",
    previewType: "tshirt",
    supportsShapes: false,
    supportsShirtColor: true,
    supportsMugColor: false,
    supportsSize: true,
    supportsMaterial: true,
    supportsClockOptions: false,
    supportsCardFields: false,
    supportsCollage: false,
  },
  "acrylic-photo-frame": {
    slug: "acrylic-photo-frame",
    label: "Acrylic Photo Frame",
    previewType: "frame",
    supportsShapes: true,
    supportsShirtColor: false,
    supportsMugColor: false,
    supportsSize: true,
    supportsMaterial: false,
    supportsClockOptions: false,
    supportsCardFields: false,
    supportsCollage: true,
    defaultShape: "bean-portrait",
  },
  "custom-mug": {
    slug: "custom-mug",
    label: "Custom Mug",
    previewType: "mug",
    supportsShapes: false,
    supportsShirtColor: false,
    supportsMugColor: true,
    supportsSize: true,
    supportsMaterial: false,
    supportsClockOptions: false,
    supportsCardFields: false,
    supportsCollage: false,
  },
  "business-card": {
    slug: "business-card",
    label: "Business Cards",
    previewType: "card",
    supportsShapes: false,
    supportsShirtColor: false,
    supportsMugColor: false,
    supportsSize: false,
    supportsMaterial: true,
    supportsClockOptions: false,
    supportsCardFields: true,
    supportsCollage: false,
  },
  "custom-poster": {
    slug: "custom-poster",
    label: "Custom Poster",
    previewType: "poster",
    supportsShapes: false,
    supportsShirtColor: false,
    supportsMugColor: false,
    supportsSize: true,
    supportsMaterial: false,
    supportsClockOptions: false,
    supportsCardFields: false,
    supportsCollage: false,
  },
  "custom-clock": {
    slug: "custom-clock",
    label: "Custom Clock",
    previewType: "clock",
    supportsShapes: true,
    supportsShirtColor: false,
    supportsMugColor: false,
    supportsSize: true,
    supportsMaterial: true,
    supportsClockOptions: true,
    supportsCardFields: false,
    supportsCollage: false,
    defaultShape: "round",
  },
};

export function getEditorConfig(slug: string): ProductEditorConfig | null {
  return PRODUCT_EDITOR_CONFIGS[slug] ?? null;
}
