"use client";

import { Box, Link, styled } from "@mui/material";

const ImageTitle = styled("img")(() => ({
  height: "6.25rem",
  display: "block",
  margin: "auto",
  animation: "pulseDropShadow 1s infinite alternate ease",
}));

const H1 = styled("h1")(() => ({
  fontSize: "clamp(1.4rem, 4.5vw, 3rem)",
  fontWeight: 900,
  fontFamily: "Orbitron, sans-serif",
  textAlign: "center",
  textTransform: "uppercase",
  margin: "0 1rem",
}));

const H1Emphasis = styled("span")(() => ({
  color: "#00fffb",
  textShadow: "0 0 20px rgba(0, 255, 251, .5)",
  textDecoration: "underline",
}));

const Header = styled("header")(() => ({
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  position: "relative",
  overflow: "hidden",
  backgroundImage: "url('/assets/images/background.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
}));

const HeaderCard = styled(Box)(({ delay }: { delay: number }) => ({
  width: 200,
  height: 200,
  boxShadow: "0 0 20px rgba(0, 255, 251, .5)",
  border: ".312rem solid #00fffb",
  borderRadius: "1rem",
  textAlign: "center",
  fontFamily: "Orbitron, sans-serif",
  fontSize: "1.2rem",
  fontWeight: 900,
  textTransform: "uppercase",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 10,
  position: "relative",
  animation: `moveHeaderCard 4s infinite ${delay}s alternate ease`,
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    backgroundImage: "url('/assets/images/header_card_background.webp')",
    backgroundSize: "cover",
    filter: "blur(5px)",
    zIndex: -1,
    opacity: 0.3,
  },
  "@media (max-width: 899px)": {
    width: 160,
    height: 160,
    fontSize: "1rem",
  },
  "@media (max-width: 599px)": {
    width: 100,
    height: 100,
    fontSize: "0.65rem",
    gap: 5,
    borderWidth: "0.2rem",
    borderRadius: "0.6rem",
  },
}));

export default function HeroSection() {
  return (
    <Header>
      <Box
        component="nav"
        padding="2rem"
        position="relative"
        sx={{ backgroundColor: "var(--window-background)", display: "flex", justifyContent: "flex-end" }}
      >
        <Link
          href="/game"
          sx={{
            color: "#E6FFB4",
            fontFamily: "Orbitron, sans-serif",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: 0,
            textShadow: "0 0 12px rgba(184, 255, 82, .45)",
            "&:hover": { color: "#00fffb" },
          }}
        >
          Portal Runner
        </Link>
      </Box>

      <Box>
        <ImageTitle src="/assets/images/title.webp" />
        <H1>
          Explorador de perfis<br />
          do <H1Emphasis>Multiverso</H1Emphasis>
        </H1>
      </Box>

      <Box
        display="flex"
        flexGrow={1}
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        px={{ xs: 2, md: 0 }}
        sx={{ gap: { xs: "1rem", sm: "2.5rem", md: "5rem" } }}
      >
        <HeaderCard
          delay={0}
          onClick={() => document.getElementById("personagens")?.scrollIntoView({ behavior: "smooth" })}
          sx={{ cursor: "pointer" }}
        >
          <span>Explore personagens</span>
          <img src="/assets/images/portal.webp" style={{ width: "52%", height: "auto", filter: "drop-shadow(0 0 5px #E6FFB4)" }} />
          <Box component="img" src="/assets/images/morty.webp" sx={{ position: "absolute", top: "-139px", filter: "drop-shadow(0 0 5px rgba(0, 255, 251, .5))" }} />
        </HeaderCard>

        <HeaderCard
          delay={1}
          onClick={() => document.getElementById("sobre")?.scrollIntoView({ behavior: "smooth" })}
          sx={{ cursor: "pointer" }}
        >
          <span>Sobre o Projeto</span>
          <img src="/assets/images/hat.webp" style={{ width: "52%", height: "auto", filter: "drop-shadow(0 0 5px rgba(0, 255, 251, .5))" }} />
        </HeaderCard>

        <a href="/game" style={{ textDecoration: "none", color: "inherit" }}>
          <HeaderCard delay={2} sx={{ cursor: "pointer" }}>
            <span>Get Started</span>
            <img src="/assets/images/ship.webp" style={{ width: "72%", height: "auto", filter: "drop-shadow(0 0 5px rgba(0, 255, 251, .5))" }} />
            <Box component="img" src="/assets/images/rick.webp" sx={{ position: "absolute", top: "-161px", filter: "drop-shadow(0 0 5px rgba(0, 255, 251, .5))" }} />
          </HeaderCard>
        </a>
      </Box>
    </Header>
  );
}
