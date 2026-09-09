import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { verificationData } from "@/data/verification";

export function TrajectoryData() {
  return (
    <Section padding="xl" background="white">
      <Container padding="lg">
        <div className="border-t border-[var(--color-steel)] pt-16">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {Object.entries(verificationData.trajectoryStats).map(([key, stat]) => (
              <div key={key} className="text-center">
                <span className="block font-display text-4xl sm:text-5xl">{stat.value}</span>
                <span className="mt-3 block text-sm text-[var(--color-steel)]">{stat.label}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <span className="text-[11px] text-[var(--color-steel)]">
              Cifras acumuladas de la trayectoria de RR All Services en New York.
            </span>
          </div>
        </div>
      </Container>
    </Section>
  );
}
