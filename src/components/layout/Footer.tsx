import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { footerColumns, socialLinks } from "@/data/footer-links";

export function Footer() {
  return (
    <footer className="border-t border-card-border bg-surface/50">
      <Container className="py-16">
        <div className="mb-12 flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Link
              href="/"
              className="font-display text-xl font-semibold tracking-[0.15em] text-foreground"
            >
              PRINT WORLD
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Premium personalized printing and AI-powered design. Turn your ideas
              into something real.
            </p>
          </div>

          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-card-border bg-card text-xs font-medium text-muted transition-all hover:border-accent hover:text-foreground"
                aria-label={social.label}
              >
                {social.label.charAt(0)}
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="mb-4 text-sm font-semibold text-foreground">
                {column.title}
              </h3>
              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-card-border pt-8 sm:flex-row">
          <p className="text-sm text-muted">
            &copy; {new Date().getFullYear()} Print World. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/about#contact" className="text-sm text-muted hover:text-foreground">
              Privacy
            </Link>
            <Link href="/about#contact" className="text-sm text-muted hover:text-foreground">
              Terms
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
