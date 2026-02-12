import { PageHeader } from "@/components/layout/PageHeader";
import { faq } from "@/lib/data";
import { AccordionItem } from "@/components/ui/Accordion";

export const metadata = {
  title: "FAQ | Dartford Holi Festival",
};

export default function FaqPage() {
  const categories = [...new Set(faq.map((item) => item.category))];

  return (
    <div>
      <PageHeader title="FAQ" subtitle="Everything you need to know" />

      <div className="px-4 space-y-6">
        {categories.map((category) => (
          <section key={category}>
            <h2 className="text-lg font-bold mb-2 text-holi-orange">{category}</h2>
            <div className="glass-card rounded-xl px-3">
              {faq
                .filter((item) => item.category === category)
                .map((item) => (
                  <AccordionItem key={item.id} title={item.question}>
                    {item.answer}
                  </AccordionItem>
                ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
