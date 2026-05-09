"use client";

import { Character } from "@/app/types";
import { getStatusName, hexToRgb } from "@/app/utils/functions";
import { Box, Divider, styled, Typography } from "@mui/material";
import { FastAverageColor } from "fast-average-color";
import { useCallback, useEffect, useMemo, useState } from "react";
import { EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";

const CharacterImage = styled("img")(({ boxShadowColor }: { boxShadowColor: string }) => ({
  borderRadius: "50%",
  boxShadow: `0 0 10px ${boxShadowColor}`,
  display: "block",
  margin: "auto",
  width: "9.37rem",
  filter: `drop-shadow(0 0 5px ${boxShadowColor})`,
  border: `2px solid ${boxShadowColor}`,
  outline: `3px solid ${boxShadowColor}`,
  outlineOffset: "2px",
}));

const TypographyCharacterDescription = styled(Typography)(({ color }) => ({
  fontSize: "1rem",
  fontWeight: 500,
  textAlign: "center",
  color: color || "#00fffb",
}));

type CharacterWithColor = Character & { color: string };
type ApiResponse = { info: { page: number; next: number | null; prev: number | null }; results: CharacterWithColor[] };

const fac = new FastAverageColor();

async function loadColors(items: CharacterWithColor[]): Promise<CharacterWithColor[]> {
  return Promise.all(
    items.map(async (item) => {
      const color = await fac.getColorAsync(item.image);
      return { ...item, color: color.hex };
    })
  );
}

export default function CharactersSection() {
  const [characters, setCharacters] = useState<Map<number, CharacterWithColor>>(new Map());
  const [characterProperties, setCharacterProperties] = useState({ color: "#151622", index: 0 });
  const [page, setPage] = useState(1);

  const rgbaByHex = (hex: string, alpha = 1) => {
    const { r, g, b } = hexToRgb(hex);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const fetchCharacters = useCallback(async () => {
    const response = await fetch(`https://rickandmortyapi.com/api/character?page=1`);
    const data = await response.json() as ApiResponse;
    const colored = await loadColors(data.results);

    setCharacters((prev) => {
      const next = new Map(prev);
      colored.forEach((item) => next.set(item.id, item));
      return next;
    });
  }, []);

  const loadNextPage = async (nextPage: number) => {
    const response = await fetch(`https://rickandmortyapi.com/api/character?page=${nextPage}`);
    const data = await response.json() as ApiResponse;
    const colored = await loadColors(data.results);

    setCharacters((prev) => {
      const next = new Map(prev);
      colored.forEach((item) => next.set(item.id, item));
      return next;
    });
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  const charactersArr = useMemo(() => {
    return Array.from(characters.values()).map((character) => {
      const color = character.color || "#00fffb";
      return (
        <SwiperSlide key={`${character.name}-${character.id}`} style={{ height: 500, padding: "1rem" }}>
          <Box position="relative" height={200}>
            <CharacterImage src={character.image} boxShadowColor={color} />
          </Box>
          <Typography variant="h2" fontSize="1.2rem" fontWeight={600} textAlign="center" color={color} fontFamily="Orbitron, sans-serif">
            {character.name}
          </Typography>
          <Box my="1rem">
            <Divider sx={{ background: color, padding: "2px", boxShadow: `0px 0px 10px ${color}` }} />
          </Box>
          <Box>
            <TypographyCharacterDescription color={color}>Status: {getStatusName(character.status)}</TypographyCharacterDescription>
            <TypographyCharacterDescription color={color}>
              Espécie: {character.species}{character.type && ` - ${character.type}`}
            </TypographyCharacterDescription>
            <TypographyCharacterDescription color={color}>Genero: {character.gender}</TypographyCharacterDescription>
            <TypographyCharacterDescription color={color}>Origem: {character.origin.name}</TypographyCharacterDescription>
            <TypographyCharacterDescription color={color}>Local: {character.location.name}</TypographyCharacterDescription>
          </Box>
        </SwiperSlide>
      );
    });
  }, [characters]);

  const handleSlideChange = async (swiper: SwiperClass) => {
    const activeIndex = swiper.activeIndex;
    setCharacterProperties({
      color: characters.get(activeIndex + 1)?.color || "#151622",
      index: activeIndex + 1,
    });

    const remaining = charactersArr.length - (activeIndex + 1);
    if (remaining < 10 && charactersArr.length > 0) {
      const nextPage = page + 1;
      setPage(nextPage);
      await loadNextPage(nextPage);
    }
  };

  return (
    <>
      <Box id="personagens" p="2rem">
        <Typography textAlign="center" variant="h2" fontFamily="Orbitron, sans-serif" fontSize="2rem" fontWeight={600}>
          Personagens do Multiverso
        </Typography>
        <Typography textAlign="center" mt={2}>
          Prepare-se para conhecer os personagens mais icônicos (e bizarros) do universo de Rick and Morty — todos reunidos em um só lugar!<br />
          De cientistas geniais a criaturas interdimensionais totalmente fora da realidade, essa lista traz o melhor (e o pior) que o multiverso tem a oferecer.<br />
          Seja para encontrar aliados, inimigos, ou só o próximo ser que o Rick acidentalmente transformou em alguma aberração cósmica… essa é a sua central de referência.<br />
          Cada personagem vem com uma breve descrição, sprite personalizado e, claro, uma pitada generosa de loucura sci-fi.
        </Typography>
      </Box>

      <Box sx={{ padding: "2rem", backgroundImage: `linear-gradient(0deg, transparent, ${rgbaByHex(characterProperties.color, 0.1)} 10%, transparent 60%)` }}>
        <Swiper
          modules={[EffectCoverflow]}
          effect="coverflow"
          spaceBetween={30}
          style={{ padding: "2rem 0", userSelect: "none" }}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={5}
          initialSlide={10}
          coverflowEffect={{ rotate: 20, stretch: 0, depth: 300, slideShadows: true }}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 10 },
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 30 },
            1024: { slidesPerView: 4, spaceBetween: 40 },
            1280: { slidesPerView: 5, spaceBetween: 50 },
          }}
          onActiveIndexChange={handleSlideChange}
        >
          {charactersArr}
        </Swiper>
      </Box>
    </>
  );
}
