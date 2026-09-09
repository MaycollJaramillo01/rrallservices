import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { companyData } from "@/data/company";
import { verificationData } from "@/data/verification";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/config/seo";

export const metadata: Metadata = createMetadata({
  title: "Quiénes somos: distribuidor de Royal Prestige® en New York",
  description:
    "Cinco años presentando los sistemas Royal Prestige® a familias de New York. Conozca a RR All Services y su forma de trabajar.",
  pathname: "/nosotros",
});

const stats = [
  verificationData.trajectoryStats.presentations,
  verificationData.trajectoryStats.homes,
  verificationData.trajectoryStats.investments,
];

export default function NosotrosPage() {
  return (
    <>
      <Section padding="lg">
        <Container padding="lg">
          <span className="mb-4 block text-[11px] tracking-[0.2em] text-[var(--color-steel)] uppercase">
            NUESTRA HISTORIA
          </span>
          <Heading as="h1" size="h1" font="display">
            Sistemas que se quedan en la familia
          </Heading>
          <Text as="p" size="lead" className="mt-6 max-w-2xl">
            {companyData.description}
          </Text>
        </Container>
      </Section>

      <Section padding="md" background="porcelain">
        <Container padding="lg">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Image
                src={companyData.image.src}
                alt={companyData.image.alt}
                width={companyData.image.width}
                height={companyData.image.height}
                className="w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="lg:col-span-6">
              <Heading as="h2" size="h3" font="display">
                {companyData.founder}
              </Heading>
              <Text as="p" className="mt-2 text-[var(--color-steel)]">
                Fundadora · {companyData.role}
              </Text>
              <Text as="p" className="mt-6">
                Con {companyData.experienceYears} años como distribuidora autorizada en{" "}
                {companyData.location}, {companyData.founder} ha acompañado a miles de familias en
                la decisión de cambiar la forma en que cocinan, se hidratan y cuidan su hogar.
              </Text>
              <Text as="p" className="mt-4">
                {companyData.mission}
              </Text>
            </div>
          </div>
        </Container>
      </Section>

      <Section padding="md">
        <Container padding="lg">
          <div className="grid grid-cols-1 gap-8 border-t border-[var(--color-steel)] pt-12 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-4xl sm:text-5xl">{stat.value}</div>
                <Text as="p" size="sm" className="mt-2 text-[var(--color-steel)]">
                  {stat.label}
                </Text>
              </div>
            ))}
          </div>
          <Text as="p" size="sm" className="mt-8 text-[var(--color-steel)]">
            Cifras acumuladas de la trayectoria de {siteConfig.name} declaradas por la
            distribuidora.
          </Text>
        </Container>
      </Section>

      <Section padding="md" background="mist">
        <Container padding="lg">
          <div className="max-w-2xl">
            <Heading as="h2" size="h3" font="display">
              Conozca los sistemas en su propia cocina
            </Heading>
            <Text as="p" className="mt-4">
              La mejor forma de entender la diferencia es verla funcionar. Agende una demostración
              privada, sin compromiso de compra.
            </Text>
            <Link
              href="/demostraciones"
              className="mt-8 inline-flex items-center bg-[var(--color-ink)] px-8 py-4 text-base font-medium text-[var(--color-pure-white)] transition-opacity hover:opacity-90"
            >
              Solicitar demostración
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
