export type LayerType = "text" | "image";
export type ImageFitMode = "fit" | "fill";

export interface ImageCropSettings {
  fitMode: ImageFitMode;
  cropX: number;
  cropY: number;
  cropScale: number;
  cropActive: boolean;
}

export interface DesignLayer {
  id: string;
  type: LayerType;
  x: number;
  y: number;
  /** Width as percentage of the design canvas (5–100). */
  width: number;
  /** Height as percentage of the design canvas (5–100). */
  height: number;
  rotation: number;
  zIndex: number;
  /** Layer opacity 0–100. Default 100. */
  opacity?: number;
  /** When true, width/height scale proportionally. Default true. */
  aspectLocked?: boolean;
  content?: string;
  fontFamily?: string;
  fontSize?: number;
  color?: string;
  bold?: boolean;
  italic?: boolean;
  align?: "left" | "center" | "right";
  src?: string;
  originalSrc?: string;
  crop?: ImageCropSettings;
}

export interface ProductOptions {
  shirtColor?: string;
  mugColor?: string;
  shapeSlug?: string;
  size?: string;
  material?: string;
  handStyle?: string;
  numberStyle?: string;
  template?: string;
  cardName?: string;
  cardTitle?: string;
  cardPhone?: string;
  cardEmail?: string;
}

export interface DesignState {
  productSlug: string;
  layers: DesignLayer[];
  options: ProductOptions;
  zoom: number;
}

export const HAND_STYLES = ["Classic", "Modern", "Minimal"];
export const NUMBER_STYLES = ["Standard", "Roman", "None"];
export const COLLAGE_LAYOUTS = ["Single", "Grid 5", "Large + Square", "Couple", "Hexagon 7"];

export const FONT_OPTIONS = [
  "Georgia, serif",
  "Arial, sans-serif",
  "Helvetica, sans-serif",
  "Times New Roman, serif",
  "Courier New, monospace",
];

export const SHIRT_COLORS = ["#ffffff", "#1a1a1a", "#2d4a3e", "#1e3a5f", "#8b2635"];
export const MUG_COLORS = ["#ffffff", "#1a1a1a", "#c4a77d", "#2d4a3e", "#1e3a5f"];

export function createDefaultDesign(productSlug: string): DesignState {
  return {
    productSlug,
    layers: [],
    options: {},
    zoom: 1,
  };
}

export function createTextLayer(content = "Your Text"): DesignLayer {
  return {
    id: crypto.randomUUID(),
    type: "text",
    x: 50,
    y: 50,
    width: 60,
    height: 15,
    rotation: 0,
    zIndex: 1,
    opacity: 100,
    aspectLocked: false,
    content,
    fontFamily: FONT_OPTIONS[0],
    fontSize: 24,
    color: "#2c2c2c",
    bold: false,
    italic: false,
    align: "center",
  };
}

export function createImageLayer(src: string, originalSrc?: string): DesignLayer {
  return {
    id: crypto.randomUUID(),
    type: "image",
    x: 20,
    y: 20,
    width: 60,
    height: 60,
    rotation: 0,
    zIndex: 0,
    opacity: 100,
    aspectLocked: true,
    src,
    originalSrc: originalSrc ?? src,
    crop: {
      fitMode: "fit",
      cropX: 0,
      cropY: 0,
      cropScale: 1,
      cropActive: false,
    },
  };
}
