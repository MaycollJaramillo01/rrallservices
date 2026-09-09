import Image from "next/image";

interface ProductGalleryProps {
  images: Array<{ src: string; alt: string; width: number; height: number }>;
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const primaryImage = images[0];
  const secondaryImages = images.slice(1);

  if (!primaryImage) return null;

  return (
    <div className="space-y-4">
      <div className="relative aspect-[4/5] overflow-hidden bg-[var(--color-mist)]">
        <Image
          src={primaryImage.src}
          alt={primaryImage.alt || productName}
          width={primaryImage.width}
          height={primaryImage.height}
          priority
          className="h-full w-full object-cover"
          sizes="(max-width: 768px) 100vw, 58vw"
        />
      </div>
      {secondaryImages.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          {secondaryImages.map((image, index) => (
            <div
              key={index}
              className="relative aspect-[4/5] overflow-hidden bg-[var(--color-mist)]"
            >
              <Image
                src={image.src}
                alt={image.alt || productName}
                width={image.width}
                height={image.height}
                className="h-full w-full object-cover"
                sizes="(max-width: 768px) 50vw, 20vw"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
