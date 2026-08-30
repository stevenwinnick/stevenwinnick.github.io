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

const LIFTS = { full: styles.lift, soft: styles.liftSoft } as const;

type ModuleImageProps = {
  src: string;
  alt: string;
  /** Crop to a portrait, two module rows tall, instead of a single module. */
  tall?: boolean;
  /**
   * Lighten the image before the blue wash, which a photograph of a person
   * needs to keep skin from reading as flat blue. `soft` suits a frame that is
   * already bright, which `full` would blow out.
   */
  lift?: keyof typeof LIFTS;
  className?: string;
};

/**
 * A photograph cropped to a module and washed to a single blue: `color`
 * blending keeps the photograph's luminosity and takes its hue from the
 * overlay, so every image on the site reads as the same blue.
 */
export default function ModuleImage({
  src,
  alt,
  tall,
  lift,
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
        className={`${lift ? LIFTS[lift] : ""} ${
          tall ? styles.cropTall : styles.crop
        }`}
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-blue mix-blend-color"
      />
    </figure>
  );
}
