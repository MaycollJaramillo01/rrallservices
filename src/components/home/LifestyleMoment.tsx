import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";

export function LifestyleMoment() {
  return (
    <div className="relative h-[80vh] min-h-[500px]">
      <Image
        src="/assets/lifestyle/lifestyle-1.jpg"
        alt="Cuchillos, tabla y accesorios de cocina Royal Prestige®"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[var(--color-ink)]/40" />
      <Container padding="lg" className="h-full">
        <div className="flex h-full items-center">
          <div className="max-w-md">
            <span className="mb-4 block text-[11px] tracking-[0.2em] text-[var(--color-steel)] uppercase">
              LIFESTYLE
            </span>
            <Heading as="h2" size="h2" font="display" className="text-[var(--color-pure-white)]">
              El centro de su hogar,
              <br />
              transformado
            </Heading>
          </div>
        </div>
      </Container>
    </div>
  );
}
