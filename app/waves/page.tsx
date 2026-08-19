import type { Metadata } from "next";
import WavesCanvas from "@/components/WavesCanvas";

export const metadata: Metadata = {
  title: "Sonic Canvas",
};

export default function WavesPage() {
  return (
    <section className="page-grid">
      <WavesCanvas />
    </section>
  );
}
