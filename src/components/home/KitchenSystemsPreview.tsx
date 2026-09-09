import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";

export function KitchenSystemsPreview() {
  return (
    <Section padding="xl">
      <Container padding="lg">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="mb-4 block text-[11px] tracking-[0.2em] text-[var(--color-steel)] uppercase">
              04 · COCINA
            </span>
            <Heading as="h2" size="display-section" font="display">
              Sistemas para el centro de su hogar
            </Heading>
            <Text as="p" size="lead" className="mt-6 max-w-lg">
              Batería de acero inoxidable de grado quirúrgico, extractor de jugos y cuchillería.
              Cada pieza pensada para durar y para cocinar mejor cada día.
            </Text>
            <div className="mt-8">
              <Button as={Link} href="/productos?cat=cocina" variant="primary" size="lg">
                Ver cocina →
              </Button>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src="/assets/products/cocina-bateria-main.jpg"
                  alt="Batería de cocina Royal Prestige® en acero de grado quirúrgico"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 40vw"
                />
              </div>
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src="/assets/products/cocina-extractor-main.jpg"
                  alt="Extractor de jugos Royal Prestige®"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 40vw"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
