import { cn } from "@/lib/utils";
import Link from "next/link";

interface SectionWrapperProps {
  title: string;
  href?: string;
  className?: string;
  children: React.ReactNode;
  id?: string;
}

export function SectionWrapper({ title, href, className, children, id }: SectionWrapperProps) {
  return (
    <section id={id} className={cn("px-4 py-6", className)}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold font-[family-name:var(--font-heading)]">{title}</h2>
        {href && (
          <Link href={href} className="text-holi-pink text-sm font-medium hover:underline">
            View All &rarr;
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}
