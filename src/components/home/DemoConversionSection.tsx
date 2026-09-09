import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { LeadForm } from "@/components/forms/LeadForm";
import { siteConfig } from "@/config/site";

export function DemoConversionSection() {
  return (
    <Section padding="xl" background="porcelain">
      <Container padding="lg">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Heading as="h2" size="display-section" font="display">
              Solicite su demostración
            </Heading>
            <Text as="p" size="lead" className="mt-6 max-w-lg">
              Complete el formulario y una especialista se comunicará con usted para coordinar una
              presentación privada de los sistemas Royal Prestige®.
            </Text>
            <div className="mt-6 space-y-2">
              <p className="text-sm text-[var(--color-graphite)]">{siteConfig.serviceArea}</p>
              <a
                href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, "")}`}
                className="block text-sm text-[var(--color-deep-royal-blue)] hover:underline"
              >
                {siteConfig.phone}
              </a>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="bg-[var(--color-pure-white)] p-6 sm:p-8">
              <LeadForm fuente="home-demo" />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
