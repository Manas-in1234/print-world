import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-1 overflow-x-hidden">
        {children}
      </main>
      <Footer />
    </>
  );
}
