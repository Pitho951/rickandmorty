 # 🌤️ Rickandmorty

**Rickandmorty** Projeto de portfólio que captura todos os personagens e lugares do Rick and Morty, joga umas infos secretas na mistura e ainda deixa você trocar ideia com as personalidades deles — tipo uma conversa interdimensional sem precisar de portal gun. Simples, louco e do jeito que a gente gosta.

🚧 **Projeto em andamento!** 🚧  
Esta aplicação ainda está em desenvolvimento e muitas funcionalidades podem estar incompletas ou instáveis.

⚠️ **Aviso:** O código ainda **não está refatorado**, pode conter trechos provisórios, duplicados ou pouco organizados.

![Rickandmorty preview](https://github.com/user-attachments/assets/fe0a893e-91ef-4862-a42e-76a3a23e4ebe) 

---

## 🚀 Tecnologias utilizadas

- Next.js 15  
- React 19  
- TypeScript  
- Material UI (MUI) 
- FastAverageColor
- Lodash  
- Swiper  
- Phaser 3
- The Rick and Morty API

---

## 📸 Demonstração

Você pode testar o app aqui:  
👉 Não Disponível
---

## ✨ Funcionalidades
👉 Não Disponível
---

## 🛠️ Como rodar localmente

1. Clone o repositório:

```bash
git clone https://github.com/kaiquecode/rickandmorty.git rickandmorty
cd rickandmorty
```

2. Instale as dependências

```bash
npm install
# ou
yarn install
```

3. Configure a variável de ambiente para a API (crie um arquivo .env.local):

```env
NEXT_PUBLIC_API_URL="http://localhost:3000/api"
RICKANDMORTY_API=https://rickandmortyapi.com/api
```

4. Rode o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

5. Abra http://localhost:3000 no navegador.

## Mini-game Portal Runner

O projeto inclui uma rota `/game` com o mini-game **Portal Runner**, criado com Phaser 3 e integrado ao Next.js com carregamento apenas no client para evitar problemas de SSR com `window` e `document`.

Objetivo: controlar o Morty, coletar cristais/portais verdes para somar pontos e evitar inimigos vermelhos/roxos. A dificuldade aumenta gradualmente conforme a pontuacao sobe.

Controles:

- `Enter`: iniciar o jogo
- `WASD` ou setas: mover o Morty
- `R` ou `Enter`: reiniciar apos Game Over

Visualmente, o jogo usa assets locais do projeto e formas geradas pelo Phaser para cristais, inimigos, brilho neon e fundo sci-fi/cartoon. Nenhum asset externo pago foi adicionado.


## 👤 Autor

Feito com ❤️ por [Kaique Fabrício](https://github.com/kaiquecode)

---

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
