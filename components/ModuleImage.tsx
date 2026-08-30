import Image from "next/image";
import styles from "./ModuleImage.module.css";

/*
 * Every photograph in `public/img` is cropped to a module's ratio when it is
 * added, so the dimensions `next/image` asks for follow from the orientation
 * rather than the file. They describe the ratio and the ceiling, not the file's
 * own pixels: an image whose source is smaller than the ceiling keeps its own
 * resolution instead of being upscaled, and the crop below sizes the element
 * either way.
 */
const WIDE_SIZE = { width: 1600, height: 1200 };
const TALL_SIZE = { width: 1024, height: 1600 };

type ModuleImageProps = {
  src: string;
  alt: string;
  /** Crop to a portrait, two module rows tall, instead of a single module. */
  tall?: boolean;
  className?: string;
};

/**
 * A photograph cropped to a module and washed towards a single blue: `color`
 * blending keeps the photograph's luminosity and pulls its hue towards the
 * overlay, so every image on the site reads as the same blue. The overlay stops
 * short of opaque, since a full wash turns skin the same flat blue as the sky.
 */
export default function ModuleImage({
  src,
  alt,
  tall,
  className = "",
}: ModuleImageProps) {
  const { width, height } = tall ? TALL_SIZE : WIDE_SIZE;

  return (
    <figure className={`${styles.frame} relative isolate m-0 ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={tall ? styles.cropTall : styles.crop}
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-blue/65 mix-blend-color"
      />
    </figure>
  );
}
