import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function FrescaFlowStory() {
  return (
    <Section padding="xl">
      <Container padding="lg">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="mb-4 block text-[11px] tracking-[0.2em] text-[var(--color-steel)] uppercase">
              01 · AGUA
            </span>
            <Heading as="h2" size="display-section" font="display">
              Agua pura para
              <br />
              cada momento
            </Heading>
            <Text as="p" size="lead" className="mt-6 max-w-lg">
              Royal Prestige® FrescaFlow™ es un sistema de filtración avanzado diseñado para ofrecer
              agua de mayor pureza para beber y preparar alimentos.
            </Text>
            <div className="mt-8">
              <Button as={Link} href="/productos/frescaflow" variant="primary" size="lg">
                Explorar FrescaFlow™ →
              </Button>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/assets/products/agua-frescaflow-main.jpg"
                alt="Purificador de agua Royal Prestige® FrescaFlow™"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
