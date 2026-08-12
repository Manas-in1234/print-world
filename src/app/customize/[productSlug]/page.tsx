import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/catalog/products";
import { getEditorConfig } from "@/lib/editor/product-configs";
import { createClient } from "@/lib/supabase/server";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { DesignEditor } from "@/components/editor/DesignEditor";
import type { DesignState } from "@/lib/editor/types";
import { normalizeShapeSlug } from "@/lib/catalog/shape-utils";

export const dynamic = "force-dynamic";

interface CustomizePageProps {
  params: Promise<{ productSlug: string }>;
  searchParams: Promise<{ shape?: string; designId?: string; aiImage?: string }>;
}

export default async function CustomizePage({ params, searchParams }: CustomizePageProps) {
  const { productSlug } = await params;
  const { shape, designId, aiImage } = await searchParams;
  const product = await getProductBySlug(productSlug);
  const config = getEditorConfig(productSlug);

  if (!product || !config) notFound();

  const editorShapes = product.shapes.filter(
    (s) => s.shapeType === "acrylic" || s.shapeType === "clock",
  );

  let initialDesign: DesignState | undefined;
  if (designId) {
    const supabase = await createClient();
    if (supabase) {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from("saved_designs")
          .select("design_data")
          .eq("id", designId)
          .eq("user_id", user.id)
          .maybeSingle();
        if (data?.design_data) {
          initialDesign = data.design_data as unknown as DesignState;
        }
      }
    }
  }

  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-1 py-8 sm:py-12">
        <Container>
          <div className="mb-8">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">Customize</p>
            <h1 className="font-display text-3xl font-semibold text-foreground">{product.name}</h1>
          </div>
          <DesignEditor
            product={product}
            config={config}
            shapes={editorShapes}
            initialShapeSlug={normalizeShapeSlug(shape ?? initialDesign?.options.shapeSlug ?? "") || undefined}
            initialDesign={initialDesign}
            savedDesignId={designId}
            initialAiImage={aiImage}
          />
        </Container>
      </main>
      <Footer />
    </>
  );
}
