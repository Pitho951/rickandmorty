"use client";

import { Box, Link, Typography } from "@mui/material";

export default function AppFooter() {
  return (
    <Box component="footer" sx={{ backgroundColor: "var(--window-background)", padding: "2rem" }}>
      <Box textAlign="center">
        <Typography textAlign="center" variant="h2" fontFamily="Orbitron, sans-serif" fontSize="2rem" fontWeight={600}>
          Desenvolvido por
        </Typography>
        <Typography textAlign="center" mt={2} fontSize="1.2rem" fontWeight={600}>
          Kaique Fabricio ❤️{" "}
          <Link href="https://github.com/Pitho951/rickandmorty">Ver Repositório</Link>
        </Typography>
      </Box>
    </Box>
  );
}
