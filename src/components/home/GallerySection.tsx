"use client";

import { Box, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { EffectCube, FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const GALLERY_COUNT = 35;

export default function GallerySection() {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  return (
    <Box p="2rem" sx={{ backgroundColor: "rgba(21, 22, 34, 1)" }}>
      <Grid container alignItems="center" justifyContent="center">
        <Grid size={{ md: 6 }}>
          <Swiper
            effect="cube"
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, EffectCube, Thumbs]}
            cubeEffect={{ shadow: true, slideShadows: true, shadowOffset: 20, shadowScale: 0.94 }}
            style={{ width: "400px", userSelect: "none" }}
          >
            {Array.from({ length: GALLERY_COUNT }).map((_, index) => (
              <SwiperSlide key={index} className="img">
                <img src={`/assets/images/gallery/${index + 1}.webp`} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Grid>

        <Grid size={{ md: 6 }} p="2rem">
          <Typography textAlign="center" variant="h2" fontFamily="Orbitron, sans-serif" fontSize="2rem" fontWeight={600} mb="6.25rem">
            Galeria Interdimensional
          </Typography>
          <Typography mt={2} textAlign="center">
            Explore a galeria visual do universo de Rick and Morty! Aqui você encontrará imagens estilizadas dos personagens, locais e criaturas mais icônicos da série, tudo reunido em um só lugar.
          </Typography>
          <Typography mt={2} textAlign="center">
            Deslize pelos cards, mergulhe em cenas malucas de diferentes dimensões e veja o multiverso ganhar vida com artes vibrantes e cheias de personalidade. A galeria também conta com imagens exclusivas de universos mesclados, onde realidades alternativas se cruzam, criando combinações inesperadas e visualmente incríveis.
          </Typography>
          <Typography mt={2} textAlign="center">
            Se você é fã do estilo visual da série, vai se sentir em casa aqui. Aproveite a viagem!
          </Typography>
        </Grid>

        <Grid size={{ md: 12 }} mt="2rem" textAlign="center">
          <Swiper
            spaceBetween={10}
            onSwiper={setThumbsSwiper}
            slidesPerView={6}
            navigation={true}
            modules={[FreeMode, Navigation, Thumbs]}
            style={{ height: "200px", marginTop: "1rem", userSelect: "none" }}
          >
            {Array.from({ length: GALLERY_COUNT }).map((_, index) => (
              <SwiperSlide key={index} className="img">
                <img src={`/assets/images/gallery/${index + 1}.webp`} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Grid>
      </Grid>
    </Box>
  );
}
