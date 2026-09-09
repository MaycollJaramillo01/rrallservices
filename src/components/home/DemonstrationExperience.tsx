import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import Link from "next/link";

export function DemonstrationExperience() {
  return (
    <Section padding="xl" background="porcelain">
      <Container padding="lg">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="mb-4 block text-[11px] tracking-[0.2em] text-[var(--color-steel)] uppercase">
              03 · DEMOSTRACIÓN
            </span>
            <Heading as="h2" size="display-section" font="display">
              Conózcalos en persona
            </Heading>
            <Text as="p" size="lead" className="mt-6 max-w-lg">
              Experimente los sistemas Royal Prestige® directamente en su cocina. Nuestro proceso de
              demostración privada está diseñado para que conozca cada detalle antes de tomar una
              decisión.
            </Text>
            <div className="mt-8 space-y-6">
              {[
                { number: "01", text: "Complete su información" },
                { number: "02", text: "Una especialista se comunica con usted" },
                { number: "03", text: "Coordinan la presentación" },
                { number: "04", text: "Conozca los sistemas directamente" },
              ].map((step) => (
                <div key={step.number} className="flex items-start gap-4">
                  <span className="font-display text-2xl text-[var(--color-deep-royal-blue)]">
                    {step.number}
                  </span>
                  <span className="text-base text-[var(--color-graphite)]">{step.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="bg-[var(--color-pure-white)] p-8 sm:p-12">
              <Heading as="h3" size="h3" font="display">
                Una presentación privada, sin compromiso
              </Heading>
              <Text as="p" className="mt-4">
                La demostración se realiza en su hogar, con sus propios ingredientes, para que
                compruebe el funcionamiento y los beneficios de cada sistema antes de decidir.
              </Text>
              <Link
                href="/demostraciones"
                className="mt-8 inline-flex items-center bg-[var(--color-ink)] px-8 py-4 text-base font-medium text-[var(--color-pure-white)] transition-opacity hover:opacity-90"
              >
                Agendar mi demostración
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
