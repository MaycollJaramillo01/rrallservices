import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { LeadForm } from "@/components/forms/LeadForm";
import { getProduct } from "@/data/products";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/config/seo";
import { JsonLd, serviceSchema } from "@/lib/structured-data";

export const metadata: Metadata = createMetadata({
  title: "Agendar demostración de Royal Prestige® en New York",
  description:
    "Agende una demostración privada de los sistemas Royal Prestige® en su hogar de New York: cocina, purificación de agua y filtración de aire. Sin compromiso de compra.",
  pathname: "/demostraciones",
});

const steps = [
  {
    number: "01",
    title: "Complete su información",
    text: "Cuéntenos qué sistema le interesa y cómo prefiere que le contactemos.",
  },
  {
    number: "02",
    title: "Una especialista se comunica con usted",
    text: "Le llamamos para conocer sus necesidades y resolver sus primeras dudas.",
  },
  {
    number: "03",
    title: "Coordinan la presentación",
    text: "Elegimos juntos día y hora, en su hogar o donde le resulte más cómodo.",
  },
  {
    number: "04",
    title: "Conozca los sistemas directamente",
    text: "Vea la tecnología en funcionamiento, con sus propios alimentos y su propia agua.",
  },
];

export default async function DemostracionesPage({
  searchParams,
}: {
  searchParams: Promise<{ producto?: string }>;
}) {
  const { producto } = await searchParams;
  const preselected = producto ? getProduct(producto) : undefined;

  return (
    <>
      <JsonLd data={serviceSchema()} />
      <Section padding="lg">
        <Container padding="lg">
          <span className="mb-4 block text-[11px] tracking-[0.2em] text-[var(--color-steel)] uppercase">
            DEMOSTRACIÓN PRIVADA
          </span>
          <Heading as="h1" size="h1" font="display">
            Solicite su demostración
          </Heading>
          <Text as="p" size="lead" className="mt-6 max-w-2xl">
            {preselected
              ? `Agende una presentación privada de ${preselected.name}. Una especialista se comunicará con usted para coordinar la visita, sin compromiso de compra.`
              : "Una especialista se comunicará con usted para coordinar una presentación privada de los sistemas Royal Prestige®, sin compromiso de compra."}
          </Text>
        </Container>
      </Section>

      <Section padding="md" background="porcelain">
        <Container padding="lg">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Heading as="h2" size="h3" font="display">
                Cómo funciona
              </Heading>
              <ol className="mt-8 space-y-8">
                {steps.map((step) => (
                  <li key={step.number} className="flex items-start gap-4">
                    <span className="font-display text-2xl text-[var(--color-deep-royal-blue)]">
                      {step.number}
                    </span>
                    <div>
                      <h3 className="font-ui text-base font-medium">{step.title}</h3>
                      <p className="mt-1 text-sm text-[var(--color-graphite)]">{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="mt-10 border-t border-[var(--color-steel)] pt-6">
                <Text as="p" size="sm">
                  ¿Prefiere hablar antes? Llámenos al{" "}
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
            <div className="lg:col-span-7">
              <div className="bg-[var(--color-pure-white)] p-6 sm:p-10">
                <LeadForm fuente="pagina-demostraciones" defaultProduct={preselected?.slug} />
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
