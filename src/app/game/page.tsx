"use client";

import { Box, Link, Typography } from "@mui/material";
import dynamic from "next/dynamic";

const PortalRunnerGame = dynamic(() => import("@/components/game/PortalRunnerGame"), {
  ssr: false,
  loading: () => (
    <Box
      sx={{
        width: "min(100%, 1050px)",
        aspectRatio: "16 / 9",
        mx: "auto",
        display: "grid",
        placeItems: "center",
        border: "2px solid rgba(184, 255, 82, 0.55)",
        borderRadius: "8px",
        backgroundColor: "#080b12",
        color: "#e6ffb4",
        fontFamily: "Orbitron, sans-serif",
      }}
    >
      Carregando Portal Runner...
    </Box>
  ),
});

export default function GamePage() {
  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        px: { xs: 2, md: 4 },
        py: 4,
        background:
          "radial-gradient(circle at 50% 15%, rgba(57, 255, 136, 0.18), transparent 28%), linear-gradient(180deg, #080b12 0%, #151622 100%)",
      }}
    >
      <Box
        component="nav"
        sx={{
          maxWidth: 1050,
          mx: "auto",
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          color: "#e6ffb4",
          fontFamily: "Orbitron, sans-serif",
        }}
      >
        <Link href="/" underline="hover" color="inherit">
          Enciclopedia
        </Link>
        <Typography fontSize="0.9rem" color="rgba(230, 255, 180, 0.72)">
          Mini-game
        </Typography>
      </Box>

      <Box maxWidth={1050} mx="auto" mb={3} textAlign="center">
        <Typography
          component="h1"
          fontFamily="Orbitron, sans-serif"
          fontSize={{ xs: "2.25rem", md: "4rem" }}
          fontWeight={900}
          color="#b8ff52"
          sx={{ textShadow: "0 0 22px rgba(57, 255, 136, 0.48)" }}
        >
          Portal Runner
        </Typography>
        <Typography mt={1} color="#f4ffcf">
          Colete portais verdes, fuja dos inimigos e mantenha o Morty inteiro no multiverso.
        </Typography>
      </Box>

      <PortalRunnerGame />
    </Box>
  );
}

