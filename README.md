# ValeCred Empreendimentos Imobiliários

Site institucional, vitrine de imóveis e painel administrativo da ValeCred Empreendimentos Imobiliários (grupo ValeCred).

> **Status: MVP visual.** Dados e imagens são ilustrativos, formulários não enviam nada e o painel não tem login real. Serve para aprovação do cliente. O plano até o lançamento está em [ROADMAP.md](ROADMAP.md).

## Stack

Next.js 15 (App Router), React 19, TypeScript strict e Tailwind CSS 4. Na fase final: Postgres (Prisma), Cloudflare R2, Resend, VPS Contabo com Easypanel.

## Como rodar

Requisitos: Node.js 20+.

```bash
npm install
npm run dev
```

Site em `http://localhost:3000` e painel em `http://localhost:3000/admin`.

Outros comandos: `npm run build`, `npm run start`, `npm run lint` e `npx tsc --noEmit`.

Opcional: defina `SITE_URL` (domínio do site) para o endereço que o QR Code do painel codifica.

## Documentação

- [CLAUDE.md](CLAUDE.md): decisões do projeto, identidade visual, segurança e convenções.
- [ROADMAP.md](ROADMAP.md): fluxo do MVP e da construção final.
- [docs/apresentacao-mvp.md](docs/apresentacao-mvp.md): roteiro de demonstração e checklist de aprovação.
- [docs/revisao-mvp.md](docs/revisao-mvp.md): revisão geral e pendências.
