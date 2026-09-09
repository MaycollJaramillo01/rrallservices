import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";

export function BrandStatement() {
  return (
    <Section padding="xl" background="porcelain">
      <Container padding="lg">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-2" />
          <div className="lg:col-span-8">
            <span className="mb-4 block text-[11px] tracking-[0.2em] text-[var(--color-steel)] uppercase">
              QUIÉNES SOMOS
            </span>
            <Heading as="h2" size="display-section" font="display" align="left">
              Una experiencia personalizada
            </Heading>
            <Text as="p" size="lead" className="mt-6 max-w-xl">
              RR All Services presenta sistemas premium Royal Prestige® para cocina, agua y hogar.
              Con 5 años de experiencia como distribuidor autorizado en New York, ofrecemos asesoría
              personalizada para que conozca directamente cada sistema.
            </Text>
          </div>
        </div>
      </Container>
    </Section>
  );
}
