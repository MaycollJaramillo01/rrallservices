import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Preguntas frecuentes",
  description:
    "Respuestas sobre las demostraciones, los sistemas Royal Prestige® y cómo trabaja RR All Services en New York.",
};

const faqs = [
  {
    question: "¿Quién es RR All Services?",
    answer: `${siteConfig.name} es ${siteConfig.legalRelationship}, con operación en ${siteConfig.serviceArea}. Presentamos los sistemas de cocina, agua y hogar de la marca mediante asesoría personalizada.`,
  },
  {
    question: "¿Cómo puedo conocer los productos?",
    answer:
      "A través de una demostración privada. Una especialista coordina con usted día y hora, y le muestra el funcionamiento de los sistemas en su propia cocina, sin compromiso de compra.",
  },
  {
    question: "¿Por qué no aparecen los precios en el sitio?",
    answer:
      "Cada hogar arma una configuración distinta de sistemas. El detalle de la inversión y las opciones disponibles se presentan durante la demostración, con la información oficial de la marca.",
  },
  {
    question: "¿Puedo comprar en línea?",
    answer:
      "No. Este sitio es un catálogo informativo: la compra se realiza a través de la asesoría personalizada tras la demostración.",
  },
  {
    question: "¿Qué zona atienden?",
    answer: `Atendemos a familias en ${siteConfig.serviceArea}. Si no está seguro de que su zona esté cubierta, escríbanos y se lo confirmamos.`,
  },
  {
    question: "¿Los sistemas tienen garantía?",
    answer:
      "Sí. Royal Prestige® respalda sus sistemas con garantía del fabricante. Los términos y la cobertura exacta se entregan por escrito con la documentación oficial durante la presentación.",
  },
  {
    question: "¿Qué hacen con mis datos?",
    answer:
      "Los usamos únicamente para contactarle y coordinar la demostración. No se comparten con terceros y puede solicitar su eliminación cuando quiera.",
  },
  {
    question: "¿Cuánto dura una demostración?",
    answer:
      "Depende de los sistemas que le interesen y de sus preguntas. La especialista acuerda con usted la duración al momento de coordinar la visita.",
  },
];

export default function FAQPage() {
  return (
    <Section padding="lg">
      <Container padding="lg">
        <div className="max-w-3xl">
          <Heading as="h1" size="h1" font="display">
            Preguntas frecuentes
          </Heading>
          <Text as="p" size="lead" className="mt-6">
            Lo que más nos preguntan antes de agendar una demostración.
          </Text>
          <FAQAccordion items={faqs} className="mt-12" />
          <div className="mt-12 border-t border-[var(--color-steel)] pt-8">
            <Text as="p">
              ¿No encontró su respuesta?{" "}
              <Link
                href="/contacto"
                className="text-[var(--color-deep-royal-blue)] hover:underline"
              >
                Escríbanos
              </Link>{" "}
              o llame al{" "}
              <a
                href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, "")}`}
                className="text-[var(--color-deep-royal-blue)] hover:underline"
              >
                {siteConfig.phone}
              </a>
              .
            </Text>
          </div>
        </div>
      </Container>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          }),
        }}
      />
    </Section>
  );
}
