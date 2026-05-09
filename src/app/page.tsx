import AboutSection from "@/components/home/AboutSection";
import CharactersSection from "@/components/home/CharactersSection";
import AppFooter from "@/components/home/Footer";
import GallerySection from "@/components/home/GallerySection";
import HeroSection from "@/components/home/HeroSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <main style={{ backgroundColor: "var(--window-background)" }}>
        <CharactersSection />
        <GallerySection />
        <AboutSection />
      </main>
      <AppFooter />
    </>
  );
}
