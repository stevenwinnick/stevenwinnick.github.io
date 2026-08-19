import Image from "next/image";
import styles from "./ModuleImage.module.css";

export type ModuleImageSource = { src: string; width: number; height: number };

type ModuleImageProps = {
  image: ModuleImageSource;
  alt: string;
  /** Crop to a portrait module instead of a landscape one. */
  tall?: boolean;
  className?: string;
};

/**
 * A photograph cropped to a module and washed to a single blue: `color`
 * blending keeps the photograph's luminosity and takes its hue from the
 * overlay, so every image on the site reads as the same blue.
 */
export default function ModuleImage({
  image,
  alt,
  tall,
  className = "",
}: ModuleImageProps) {
  return (
    <figure className={`${styles.frame} relative isolate m-0 ${className}`}>
      <Image
        src={image.src}
        alt={alt}
        width={image.width}
        height={image.height}
        className={tall ? styles.cropTall : styles.crop}
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-blue mix-blend-color"
      />
    </figure>
  );
}
