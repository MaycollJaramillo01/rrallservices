import Image from "next/image";

// Logo oficial de Distribuidor Autorizado. El manual de Royal Prestige® pide no
// alterarlo y que nunca sea más grande ni más visible que el logo de RR All Services,
// así que siempre se muestra más bajo que ese logo (h-10 como máximo).
export function DistributorBadge({ className = "h-10 w-auto" }: { className?: string }) {
  return (
    <Image
      src="/assets/brand/distribuidor-autorizado.png"
      alt="Royal Prestige® Distribuidor Autorizado"
      width={240}
      height={65}
      className={className}
    />
  );
}
