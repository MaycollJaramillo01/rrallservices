import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";

export function OpportunityInvitation() {
  return (
    <Section padding="md" background="water">
      <Container padding="lg" className="grid items-center gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <p className="mb-4 text-[11px] tracking-[0.2em] text-[var(--color-steel)] uppercase">
            Forma parte de nuestro equipo
          </p>
          <Heading size="h2" font="display">
            ¿Le interesa emprender con RR All Services?
          </Heading>
          <Text className="mt-4 max-w-2xl leading-relaxed">
            Conozca la actividad comercial vinculada a Royal Prestige® en New York y solicite
            información para conversar con nuestro equipo.
          </Text>
        </div>
        <div className="lg:col-span-4 lg:justify-self-end">
          <Button as={Link} href="/trabaja-con-nosotros" size="lg">
            Conocer la oportunidad →
          </Button>
        </div>
      </Container>
    </Section>
  );
}
