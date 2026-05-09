"use client";

import { Box, Grid, Typography } from "@mui/material";

export default function AboutSection() {
  return (
    <Box id="sobre" p="2rem" mt="4rem" sx={{ backgroundColor: "#151622" }}>
      <Grid container alignItems="center" justifyContent="center">
        <Grid size={{ md: 6 }}>
          <Typography textAlign="center" variant="h2" fontFamily="Orbitron, sans-serif" fontSize="2rem" fontWeight={600}>
            Sobre o Projeto
          </Typography>
          <Typography mt={2}>
            Rick and Morty Enciclopédia é uma aplicação web interativa que reúne informações detalhadas sobre personagens, episódios, localizações e espécies do universo caótico de Rick and Morty. Todos os dados são consumidos em tempo real a partir da Rick and Morty API, apresentados em um layout moderno, responsivo e com efeitos visuais estilizados.
          </Typography>
          <Typography mt={2}>
            Você pode navegar por cards ilustrados dos personagens, ver de onde vieram, onde estão, em quais episódios apareceram — tudo organizado de forma prática e visual. E, para deixar a experiência mais divertida, o projeto ainda conta com um mini-jogo temático que adiciona uma camada extra de interação para os fãs da série.
          </Typography>
          <Typography mt={2}>
            🚀 Se você curtiu o projeto, considere deixar uma ⭐ lá no GitHub — isso ajuda muito a divulgar e valorizar o trabalho!
          </Typography>
        </Grid>
        <Grid size={{ md: 6 }}>
          <img src="/assets/images/about_side_2.webp" style={{ width: "100%" }} />
        </Grid>
      </Grid>
    </Box>
  );
}
