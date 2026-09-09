import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function FrescaPureFeature() {
  return (
    <Section padding="xl" background="white">
      <Container padding="lg">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          <div className="order-2 lg:order-1 lg:col-span-7">
            <span className="mb-4 block text-[11px] tracking-[0.2em] text-[var(--color-steel)] uppercase">
              02 · SHOWER
            </span>
            <Heading as="h2" size="display-section" font="display">
              Proteja la piel
              <br />y el cabello
            </Heading>
            <Text as="p" size="lead" className="mt-6 max-w-lg">
              FrescaPure™ Shower Filter reduce el cloro y las impurezas en el agua de la ducha,
              cuidando la barrera natural de su piel y preservando la salud de su cabello.
            </Text>
            <div className="mt-8">
              <Button as={Link} href="/productos/frescapure" variant="primary" size="lg">
                Explorar FrescaPure™ →
              </Button>
            </div>
          </div>
          <div className="order-1 lg:order-2 lg:col-span-5">
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="/assets/products/agua-frescapure-main.jpg"
                alt="Filtro de ducha FrescaPure™ instalado en la regadera"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
