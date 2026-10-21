import Image from "next/image";
import Link from "next/link";
import { LeadForm } from "@/components/forms/LeadForm";
import { OpportunityHeroCarousel } from "@/components/home/OpportunityHeroCarousel";
import { DistributorBadge } from "@/components/layout/DistributorBadge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { companyData } from "@/data/company";
import { createMetadata } from "@/config/seo";
import { OPORTUNIDAD_FUENTE } from "@/lib/lead-schema";

export const metadata = createMetadata({
  title: "Forma parte de nuestro equipo — Oportunidad Royal",
  description:
    "Forma parte de nuestro equipo en RR All Services. Explore la Oportunidad Royal, conozca el modelo de negocio independiente y dé el primer paso en New York.",
  pathname: "/trabaja-con-nosotros",
});

const questions = [
  [
    "¿Es una oportunidad independiente o un empleo?",
    "Royal Prestige® presenta la Oportunidad Royal como una posibilidad de desarrollar un negocio propio mediante la distribución independiente de sus productos. Esta consulta no es una postulación a un empleo asalariado. Converse con RR All Services para conocer la relación comercial y las condiciones concretas antes de decidir.",
  ],
  [
    "¿Qué experiencia se necesita?",
    "Si le interesan las ventas, la atención al cliente o el emprendimiento, puede solicitar información. El equipo debe confirmar los requisitos de experiencia aplicables; esta página no establece una experiencia mínima.",
  ],
  [
    "¿Dónde opera el equipo?",
    "RR All Services opera en New York, Estados Unidos. Consulte con el equipo la cobertura y las condiciones que correspondan a su ubicación.",
  ],
  [
    "¿Cómo recibiré información?",
    "Envíe sus datos en el formulario de esta página para que el equipo pueda responder su consulta por teléfono o correo. Los mensajes de texto requieren su consentimiento opcional. El envío no implica incorporación automática ni reserva una demostración.",
  ],
  [
    "¿Existen costos o condiciones iniciales?",
    "Las condiciones iniciales deben revisarse con RR All Services antes de tomar una decisión. Solicite un detalle de cualquier costo, compromiso o acuerdo aplicable. Esta página no afirma que la participación sea gratuita.",
  ],
];

const steps = [
  [
    "Solicite información",
    "Comparta sus datos y, si lo desea, las preguntas que tiene sobre la oportunidad.",
  ],
  [
    "Converse con el equipo",
    "Conozca cómo se desarrolla la actividad comercial y aclare sus dudas con RR All Services.",
  ],
  [
    "Revise los siguientes pasos",
    "Conozca las condiciones, los acuerdos y los requisitos aplicables antes de decidir si desea continuar.",
  ],
];

const opportunityReasons = [
  [
    "Un proyecto propio",
    "Explore un modelo de distribución independiente para construir una actividad comercial, desarrollar relaciones con sus clientes y definir sus objetivos como emprendedor.",
  ],
  [
    "Productos para la vida cotidiana",
    "Conozca un catálogo de sistemas de cocina, electrodomésticos y soluciones de filtración Royal Prestige®. Las demostraciones acercan sus características y uso a cada cliente.",
  ],
  [
    "Opciones de financiamiento",
    "El modelo de Royal Prestige® contempla financiamiento de compras para clientes. Consulte los requisitos, la aprobación y las condiciones que correspondan a cada operación.",
  ],
  [
    "Entrega directa al cliente",
    "Royal Prestige® contempla el envío de los pedidos directamente a los clientes. Conozca cómo se coordinan las órdenes y qué cargos por servicios pueden aplicar.",
  ],
];

export default function OpportunityPage() {
  return (
    <main>
      <Section padding="lg" background="porcelain">
        <Container padding="lg">
          <Link href="/" className="text-sm text-[var(--color-deep-royal-blue)] hover:underline">
            Inicio
          </Link>
          <div className="mt-10 grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <p className="mb-5 text-[11px] tracking-[0.2em] text-[var(--color-steel)] uppercase">
                RR All Services · New York
              </p>
              <Heading as="h1" size="h1" font="display" className="max-w-4xl text-balance">
                Forma parte de nuestro equipo
              </Heading>
              <Heading as="h2" size="h3" font="display" className="mt-5 max-w-2xl">
                Dé el primer paso hacia su próximo proyecto
              </Heading>
              <Text size="lead" className="mt-6 max-w-2xl">
                En RR All Services queremos conocer a personas con iniciativa, interés por las
                ventas y ganas de emprender. Descubra la Oportunidad Royal y cómo puede desarrollar
                una actividad comercial independiente vinculada a Royal Prestige® en New York.
              </Text>
              <Text className="mt-4 max-w-2xl leading-relaxed">
                Conozca los productos, la dinámica del equipo y los pasos para comenzar. Estamos
                aquí para conversar sobre sus objetivos y responder sus preguntas.
              </Text>
              <Button as={Link} href="#solicitar-informacion" size="lg" className="mt-8">
                Quiero conocer la oportunidad
              </Button>
            </div>
            <div className="min-w-0 lg:col-span-5">
              <OpportunityHeroCarousel />
              <aside className="mt-6 flex items-start gap-4 border-t border-[var(--color-steel)]/30 pt-5">
                <Image
                  src="/assets/brand/rr-logo.png"
                  alt="RR All Services"
                  width={152}
                  height={182}
                  className="h-16 w-auto shrink-0"
                />
                <div>
                  <p className="text-sm leading-relaxed text-[var(--color-graphite)]">
                    Distribuidor Autorizado Independiente de Royal Prestige®.
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-steel)]">
                    Un primer contacto para informarse, aclarar sus dudas y decidir con calma.
                  </p>
                  <DistributorBadge className="mt-4 h-10 w-auto" />
                </div>
              </aside>
            </div>
          </div>
        </Container>
      </Section>

      <Section padding="lg">
        <Container padding="lg" className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="mb-4 text-[11px] tracking-[0.2em] text-[var(--color-steel)] uppercase">
              01 · La actividad
            </p>
            <Heading size="h2" font="display">
              Productos, personas y atención directa
            </Heading>
          </div>
          <div className="space-y-5 lg:col-span-7">
            <Text size="lead">
              La Oportunidad Royal está vinculada a la comercialización de productos Royal Prestige®
              a través de Distribuidores Autorizados Independientes.
            </Text>
            <Text className="leading-relaxed">
              El distribuidor presenta los productos a los clientes, explica su funcionamiento y
              responde sus preguntas. Las demostraciones permiten conocer los sistemas antes de
              decidir sobre una compra.
            </Text>
            <Text className="leading-relaxed">
              RR All Services es una empresa independiente en New York. En la conversación podrá
              conocer cómo se organiza esta actividad con su equipo y qué condiciones aplican.
            </Text>
            <a
              className="inline-block text-sm text-[var(--color-deep-royal-blue)] underline underline-offset-4"
              href="https://www.royalprestige.com/negocio/por-que-elegirnos"
            >
              Conozca el modelo en el sitio oficial de Royal Prestige®
            </a>
          </div>
        </Container>
      </Section>

      <Section padding="lg" background="mist">
        <Container padding="lg">
          <div className="max-w-3xl">
            <p className="mb-4 text-[11px] tracking-[0.2em] text-[var(--color-steel)] uppercase">
              02 · La oportunidad
            </p>
            <Heading size="h2" font="display">
              Más razones para dar el primer paso
            </Heading>
            <Text size="lead" className="mt-6">
              Emprender comienza por entender el modelo. Conozca algunos de los elementos que
              presenta Royal Prestige® y converse con nosotros sobre cómo se desarrolla la actividad
              en RR All Services.
            </Text>
          </div>
          <dl className="mt-10 grid gap-x-12 gap-y-8 md:grid-cols-2">
            {opportunityReasons.map(([title, description]) => (
              <div key={title} className="border-t border-[var(--color-steel)]/30 pt-6">
                <dt className="font-display text-2xl leading-tight text-[var(--color-ink)]">
                  {title}
                </dt>
                <dd className="mt-4 max-w-xl leading-relaxed text-[var(--color-graphite)]">
                  {description}
                </dd>
              </div>
            ))}
          </dl>
          <a
            className="mt-8 inline-block text-sm text-[var(--color-deep-royal-blue)] underline underline-offset-4"
            href="https://www.royalprestige.com/negocio/por-que-elegirnos"
          >
            Explore por qué elegir Royal Prestige® en su sitio oficial →
          </a>
        </Container>
      </Section>

      <Section padding="lg">
        <Container padding="lg" className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="mb-4 text-[11px] tracking-[0.2em] text-[var(--color-steel)] uppercase">
              03 · Su interés
            </p>
            <Heading size="h2" font="display">
              Para quienes quieren explorar el emprendimiento
            </Heading>
          </div>
          <div className="lg:col-span-7">
            <Text size="lead">
              Puede ser de su interés si disfruta conversar con personas, conocer sus necesidades y
              explorar una actividad comercial.
            </Text>
            <ul className="mt-7 divide-y divide-[var(--color-steel)]/25 border-y border-[var(--color-steel)]/25">
              {[
                ["Atención al cliente", "Escuchar y ofrecer información clara."],
                ["Ventas y comunicación", "Presentar productos y responder preguntas."],
                ["Emprendimiento", "Conocer cómo funciona una actividad independiente."],
              ].map(([title, description]) => (
                <li key={title} className="grid gap-2 py-5 sm:grid-cols-2">
                  <h3 className="font-medium">{title}</h3>
                  <Text>{description}</Text>
                </li>
              ))}
            </ul>
            <Text size="sm" className="mt-5 leading-relaxed">
              Estos son intereses y habilidades relacionados con la actividad. Los requisitos
              específicos se confirman con el equipo.
            </Text>
          </div>
        </Container>
      </Section>

      <Section padding="lg" background="mist">
        <Container padding="lg">
          <p className="mb-4 text-[11px] tracking-[0.2em] text-[var(--color-steel)] uppercase">
            04 · Cómo comenzar
          </p>
          <Heading size="h2" font="display">
            El primer paso es una conversación
          </Heading>
          <ol className="mt-10 grid gap-8 lg:grid-cols-3 lg:gap-12">
            {steps.map(([title, description], index) => (
              <li key={title} className="border-t border-[var(--color-steel)]/30 pt-6">
                <span className="text-sm text-[var(--color-steel)]">0{index + 1}</span>
                <Heading as="h3" size="h4" font="display" className="mt-4">
                  {title}
                </Heading>
                <Text className="mt-3 leading-relaxed">{description}</Text>
              </li>
            ))}
          </ol>
          <Text size="sm" className="mt-8 leading-relaxed">
            Solicitar información no le incorpora al equipo ni le compromete a participar. No se
            prometen ingresos ni resultados garantizados.
          </Text>
        </Container>
      </Section>

      <Section padding="lg" background="porcelain">
        <Container padding="lg" className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Image
              src={companyData.image.src}
              alt={companyData.image.alt}
              width={companyData.image.width}
              height={companyData.image.height}
              sizes="(max-width: 1024px) 90vw, 40vw"
              className="mx-auto max-h-[420px] w-auto max-w-full object-contain"
            />
            <p className="mt-3 text-center text-xs text-[var(--color-steel)]">
              Pieza de marca de RR All Services.
            </p>
          </div>
          <div className="lg:col-span-7">
            <p className="mb-4 text-[11px] tracking-[0.2em] text-[var(--color-steel)] uppercase">
              05 · El equipo
            </p>
            <Heading size="h2" font="display">
              Kellyn Reyes y el equipo de RR All Services
            </Heading>
            <Text size="lead" className="mt-6">
              Conozca a las personas detrás de RR All Services y cómo presentan los sistemas Royal
              Prestige® en New York.
            </Text>
            <Text className="mt-4 leading-relaxed">
              Durante la conversación podrá preguntar por la preparación necesaria, el
              acompañamiento disponible y la forma de trabajar con el equipo. Los apoyos y las
              condiciones se confirman directamente antes de continuar.
            </Text>
            <Link
              href="/nosotros"
              className="mt-6 inline-block text-sm text-[var(--color-deep-royal-blue)] hover:underline"
            >
              Conozca RR All Services →
            </Link>
          </div>
        </Container>
      </Section>

      <Section padding="lg">
        <Container padding="lg" className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="mb-4 text-[11px] tracking-[0.2em] text-[var(--color-steel)] uppercase">
              06 · Sus preguntas
            </p>
            <Heading size="h2" font="display">
              Información para decidir
            </Heading>
            <Text className="mt-5 leading-relaxed">
              Las condiciones particulares de RR All Services deben confirmarse en la conversación
              con el equipo.
            </Text>
          </div>
          <dl className="divide-y divide-[var(--color-steel)]/25 border-t border-[var(--color-steel)]/25 lg:col-span-7">
            {questions.map(([question, answer]) => (
              <div key={question} className="py-6">
                <dt className="text-lg font-medium text-[var(--color-ink)]">{question}</dt>
                <dd className="mt-3 leading-relaxed text-[var(--color-graphite)]">{answer}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      <Section
        id="solicitar-informacion"
        padding="lg"
        background="water"
        className="scroll-mt-20 lg:scroll-mt-24"
      >
        <Container padding="lg" className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="mb-4 text-[11px] tracking-[0.2em] text-[var(--color-steel)] uppercase">
              07 · Solicitar información
            </p>
            <Heading id="opportunity-form-title" size="h2" font="display">
              Su próximo paso comienza aquí
            </Heading>
            <Text size="lead" className="mt-6">
              Cuéntenos sobre su interés en formar parte de nuestro equipo. Deje sus datos y
              conversemos sobre sus objetivos, la Oportunidad Royal y los siguientes pasos.
            </Text>
            <Text className="mt-4 leading-relaxed">
              Este formulario es para conocer la oportunidad. Si desea una presentación de
              productos, puede{" "}
              <Link
                href="/demostraciones"
                className="text-[var(--color-deep-royal-blue)] underline"
              >
                solicitar una demostración
              </Link>
              .
            </Text>
          </div>
          <div className="bg-[var(--color-pure-white)] p-6 sm:p-8 lg:col-span-7">
            <LeadForm
              fuente={OPORTUNIDAD_FUENTE}
              variant="oportunidad"
              submitLabel="Solicitar información sobre Oportunidad Royal"
              successTitle="Hemos recibido su interés en Oportunidad Royal."
              successBody="El equipo revisará su consulta para ponerse en contacto con usted. Este envío no implica incorporación ni reserva una demostración."
            />
          </div>
        </Container>
      </Section>
    </main>
  );
}
