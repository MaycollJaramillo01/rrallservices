import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { companyData } from "@/data/company";

export function RRAllServicesStory() {
  return (
    <Section padding="xl" background="white">
      <Container padding="lg">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={companyData.image.src}
                alt={companyData.image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
          <div className="lg:col-span-5">
            <span className="mb-4 block text-[11px] tracking-[0.2em] text-[var(--color-steel)] uppercase">
              LA MARCA
            </span>
            <Heading as="h2" size="display-section" font="display">
              Kellyn Reyes
            </Heading>
            <Text as="p" size="lead" className="mt-6 max-w-lg">
              Con 5 años de experiencia como Distribuidora Autorizada de Royal Prestige® en New
              York, RR All Services presenta sistemas premium para cocina, agua y hogar con asesoría
              personalizada.
            </Text>
            <Text as="p" className="mt-4 max-w-lg">
              {companyData.mission}
            </Text>
            <Link
              href="/nosotros"
              className="mt-8 inline-block text-sm font-medium text-[var(--color-deep-royal-blue)] hover:underline"
            >
              Conozca nuestra historia →
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
