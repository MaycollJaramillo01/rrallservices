import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: "Cómo RR All Services recopila, utiliza y protege sus datos personales.",
};

const updated = "9 de septiembre de 2026";

export default function PrivacidadPage() {
  return (
    <Section padding="lg">
      <Container padding="lg">
        <div className="max-w-3xl">
          <Heading as="h1" size="h1" font="display">
            Política de privacidad
          </Heading>
          <Text as="p" size="sm" className="mt-4 text-[var(--color-steel)]">
            Última actualización: {updated}
          </Text>

          <div className="mt-12 space-y-10">
            <section>
              <h2 className="font-ui mb-3 text-base font-medium">1. Responsable del tratamiento</h2>
              <Text as="p">
                Este sitio es operado por {siteConfig.legalName} bajo la marca comercial{" "}
                {siteConfig.name}, {siteConfig.legalRelationship}, con operación en{" "}
                {siteConfig.serviceArea}. Puede contactarnos en{" "}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-[var(--color-deep-royal-blue)] hover:underline"
                >
                  {siteConfig.email}
                </a>{" "}
                o al {siteConfig.phone}.
              </Text>
            </section>

            <section>
              <h2 className="font-ui mb-3 text-base font-medium">2. Datos que recopilamos</h2>
              <Text as="p">
                Únicamente los datos que usted nos entrega voluntariamente en nuestros formularios:
                nombre, apellido, correo electrónico, teléfono, el producto que le interesa y el
                mensaje que decida escribirnos.
              </Text>
              <Text as="p" className="mt-3">
                No solicitamos ni almacenamos datos de tarjetas, cuentas bancarias ni documentos de
                identidad a través de este sitio.
              </Text>
            </section>

            <section>
              <h2 className="font-ui mb-3 text-base font-medium">3. Para qué los usamos</h2>
              <ul className="list-disc space-y-2 pl-5 text-[var(--color-graphite)]">
                <li>Contactarle y coordinar una demostración de los sistemas Royal Prestige®.</li>
                <li>Responder sus consultas y dar seguimiento como cliente potencial.</li>
                <li>Mantener el registro de la atención brindada.</li>
              </ul>
              <Text as="p" className="mt-3">
                No utilizamos sus datos para fines distintos a los aquí descritos ni tomamos
                decisiones automatizadas sobre usted.
              </Text>
            </section>

            <section>
              <h2 className="font-ui mb-3 text-base font-medium">4. Con quién los compartimos</h2>
              <Text as="p">
                No vendemos ni cedemos su información a terceros. Solo acceden a ella los
                proveedores tecnológicos que hacen funcionar el sitio y el envío de correo, y
                exclusivamente para prestarnos ese servicio.
              </Text>
            </section>

            <section>
              <h2 className="font-ui mb-3 text-base font-medium">
                5. Cuánto tiempo los conservamos
              </h2>
              <Text as="p">
                Conservamos sus datos mientras exista una relación comercial o un interés vigente, y
                los eliminamos cuando usted lo solicita o cuando dejan de ser necesarios para la
                finalidad que los originó.
              </Text>
            </section>

            <section>
              <h2 className="font-ui mb-3 text-base font-medium">6. Sus derechos</h2>
              <Text as="p">
                Puede solicitar en cualquier momento el acceso, la corrección o la eliminación de
                sus datos, así como dejar de recibir nuestras comunicaciones. Escríbanos a{" "}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-[var(--color-deep-royal-blue)] hover:underline"
                >
                  {siteConfig.email}
                </a>{" "}
                y atenderemos su solicitud.
              </Text>
            </section>

            <section>
              <h2 className="font-ui mb-3 text-base font-medium">7. Cookies</h2>
              <Text as="p">
                Este sitio no utiliza cookies publicitarias ni de seguimiento de terceros. Solo se
                emplean los datos técnicos mínimos necesarios para que las páginas se muestren
                correctamente y para limitar el envío abusivo de formularios.
              </Text>
            </section>

            <section>
              <h2 className="font-ui mb-3 text-base font-medium">8. Cambios en esta política</h2>
              <Text as="p">
                Si modificamos esta política, publicaremos la nueva versión en esta misma página con
                su fecha de actualización.
              </Text>
            </section>
          </div>

          <div className="mt-12 border-t border-[var(--color-steel)] pt-8">
            <Text as="p" size="sm">
              Consulte también nuestros{" "}
              <Link
                href="/terminos"
                className="text-[var(--color-deep-royal-blue)] hover:underline"
              >
                términos y condiciones
              </Link>
              .
            </Text>
          </div>
        </div>
      </Container>
    </Section>
  );
}
