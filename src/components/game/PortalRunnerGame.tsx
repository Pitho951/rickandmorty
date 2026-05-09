"use client";

import { Box, Typography } from "@mui/material";
import Phaser from "phaser";
import { useEffect, useRef } from "react";

import { PortalRunnerScene } from "@/game/scenes/PortalRunnerScene";

export default function PortalRunnerGame() {
  const gameParentRef = useRef<HTMLDivElement | null>(null);
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (!gameParentRef.current || gameRef.current) {
      return;
    }

    gameRef.current = new Phaser.Game({
      type: Phaser.AUTO,
      parent: gameParentRef.current,
      width: 960,
      height: 540,
      backgroundColor: "#080b12",
      scene: [PortalRunnerScene],
      physics: {
        default: "arcade",
        arcade: {
          debug: false,
        },
      },
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 960,
        height: 540,
      },
      render: {
        antialias: true,
        pixelArt: false,
      },
    });

    return () => {
      gameRef.current?.destroy(true);
      gameRef.current = null;
    };
  }, []);

  return (
    <Box
      sx={{
        width: "min(100%, 1050px)",
        mx: "auto",
      }}
    >
      <Box
        ref={gameParentRef}
        sx={{
          width: "100%",
          aspectRatio: "16 / 9",
          border: "2px solid rgba(184, 255, 82, 0.75)",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 0 30px rgba(57, 255, 136, 0.25), inset 0 0 24px rgba(0, 255, 251, 0.08)",
          backgroundColor: "#080b12",
          "& canvas": {
            display: "block",
            width: "100% !important",
            height: "100% !important",
          },
        }}
      />
      <Typography
        mt={2}
        textAlign="center"
        color="#e6ffb4"
        fontFamily="Orbitron, sans-serif"
        fontSize="0.95rem"
      >
        Controles: WASD ou setas para mover. Enter inicia. R ou Enter reinicia no Game Over.
      </Typography>
    </Box>
  );
}

