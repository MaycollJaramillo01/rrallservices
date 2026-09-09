import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Términos y condiciones",
  description: "Condiciones de uso del sitio web de RR All Services.",
};

const updated = "9 de septiembre de 2026";

export default function TerminosPage() {
  return (
    <Section padding="lg">
      <Container padding="lg">
        <div className="max-w-3xl">
          <Heading as="h1" size="h1" font="display">
            Términos y condiciones
          </Heading>
          <Text as="p" size="sm" className="mt-4 text-[var(--color-steel)]">
            Última actualización: {updated}
          </Text>

          <div className="mt-12 space-y-10">
            <section>
              <h2 className="font-ui mb-3 text-base font-medium">1. Quiénes somos</h2>
              <Text as="p">
                Este sitio es operado por {siteConfig.legalName} bajo la marca comercial{" "}
                {siteConfig.name}, {siteConfig.legalRelationship}. Somos un negocio independiente:
                no somos el fabricante de los productos ni actuamos en su representación legal.
              </Text>
            </section>

            <section>
              <h2 className="font-ui mb-3 text-base font-medium">2. Finalidad del sitio</h2>
              <Text as="p">
                Este sitio tiene fines informativos y de contacto con clientes potenciales. No es
                una tienda en línea: no se realizan ventas, cobros ni envíos a través de estas
                páginas. Toda compra se formaliza fuera del sitio, con la documentación oficial
                correspondiente.
              </Text>
            </section>

            <section>
              <h2 className="font-ui mb-3 text-base font-medium">3. Información de productos</h2>
              <Text as="p">
                Las descripciones, imágenes y características publicadas son orientativas y pueden
                variar según el modelo, la configuración y la disponibilidad. La información
                vinculante es la que se entrega por escrito durante la presentación y en la
                documentación del fabricante.
              </Text>
            </section>

            <section>
              <h2 className="font-ui mb-3 text-base font-medium">4. Demostraciones</h2>
              <Text as="p">
                Solicitar una demostración no genera obligación de compra para usted ni obligación
                de venta para nosotros. Las visitas se coordinan previamente por teléfono y están
                sujetas a disponibilidad de agenda y zona de cobertura.
              </Text>
            </section>

            <section>
              <h2 className="font-ui mb-3 text-base font-medium">
                5. Garantías, devoluciones y financiamiento
              </h2>
              <Text as="p">
                Las garantías de los sistemas son otorgadas por el fabricante y se rigen por sus
                propios términos. Las condiciones de devolución y las opciones de pago o
                financiamiento, cuando existan, se detallan en el contrato de compra que se firma
                fuera de este sitio.
              </Text>
            </section>

            <section>
              <h2 className="font-ui mb-3 text-base font-medium">6. Marcas</h2>
              <Text as="p">
                Royal Prestige®, FrescaFlow™ y FrescaPure™ son marcas de sus respectivos titulares y
                se utilizan aquí para identificar los productos que distribuimos. El uso de este
                sitio no le otorga derecho alguno sobre esas marcas.
              </Text>
            </section>

            <section>
              <h2 className="font-ui mb-3 text-base font-medium">7. Uso del sitio</h2>
              <Text as="p">
                Usted se compromete a usar este sitio de forma lícita y a no enviar datos falsos ni
                datos de terceros sin su consentimiento a través de nuestros formularios.
              </Text>
            </section>

            <section>
              <h2 className="font-ui mb-3 text-base font-medium">8. Contacto</h2>
              <Text as="p">
                Para cualquier consulta sobre estos términos escríbanos a{" "}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-[var(--color-deep-royal-blue)] hover:underline"
                >
                  {siteConfig.email}
                </a>{" "}
                o llame al {siteConfig.phone}.
              </Text>
            </section>
          </div>

          <div className="mt-12 border-t border-[var(--color-steel)] pt-8">
            <Text as="p" size="sm">
              Consulte también nuestra{" "}
              <Link
                href="/privacidad"
                className="text-[var(--color-deep-royal-blue)] hover:underline"
              >
                política de privacidad
              </Link>
              .
            </Text>
          </div>
        </div>
      </Container>
    </Section>
  );
}
