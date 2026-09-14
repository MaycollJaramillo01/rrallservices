import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { LeadForm } from "@/components/forms/LeadForm";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/config/seo";

export const metadata: Metadata = createMetadata({
  title: "Contacto en New York",
  description:
    "Hable con RR All Services, Distribuidor Autorizado Independiente de Royal Prestige® en New York. Teléfono, correo y dirección para agendar su demostración.",
  pathname: "/contacto",
});

export default function ContactoPage() {
  const tel = siteConfig.phone.replace(/[^0-9+]/g, "");

  return (
    <Section padding="lg">
      <Container padding="lg">
        <Heading as="h1" size="h1" font="display">
          Contacto
        </Heading>
        <Text as="p" size="lead" className="mt-6 max-w-2xl">
          Escríbanos o llámenos. Atendemos a familias en {siteConfig.serviceArea}.
        </Text>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-5">
            <div>
              <h2 className="font-ui mb-2 text-sm tracking-wider text-[var(--color-steel)] uppercase">
                Teléfono
              </h2>
              <a
                href={`tel:${tel}`}
                className="font-display text-2xl transition-opacity hover:opacity-70"
              >
                {siteConfig.phone}
              </a>
            </div>
            <div>
              <h2 className="font-ui mb-2 text-sm tracking-wider text-[var(--color-steel)] uppercase">
                Email
              </h2>
              <a
                href={`mailto:${siteConfig.email}`}
                className="break-all text-[var(--color-deep-royal-blue)] hover:underline"
              >
                {siteConfig.email}
              </a>
            </div>
            <div>
              <h2 className="font-ui mb-2 text-sm tracking-wider text-[var(--color-steel)] uppercase">
                Dirección
              </h2>
              <address className="text-[var(--color-graphite)] not-italic">
                {siteConfig.address}
              </address>
            </div>
            <div>
              <h2 className="font-ui mb-2 text-sm tracking-wider text-[var(--color-steel)] uppercase">
                Distribución
              </h2>
              <Text as="p" size="sm">
                {siteConfig.legalRelationship}. Operado por {siteConfig.legalName}.
              </Text>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-[var(--color-warm-porcelain)] p-6 sm:p-10">
              <Heading as="h2" size="h4" font="display">
                Envíenos un mensaje
              </Heading>
              <div className="mt-6">
                <LeadForm
                  fuente="pagina-contacto"
                  variant="contacto"
                  submitLabel="Enviar mensaje"
                  successTitle="Gracias. Hemos recibido su mensaje."
                  successBody="Le responderemos a la brevedad."
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
