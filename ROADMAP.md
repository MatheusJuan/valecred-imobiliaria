# ROADMAP — ValeCred Empreendimentos Imobiliários

Dois fluxos: **A) MVP visual local** (para o cliente aprovar) e **B) Construção final** (do MVP aprovado até o lançamento). Regras e decisões técnicas estão no [CLAUDE.md](CLAUDE.md); escopo funcional no [BASE-SITE-IMOBILIARIA.md](BASE-SITE-IMOBILIARIA.md).

---

## A) MVP visual local

**Objetivo:** o cliente navegar pelo site rodando localmente (ou em tela compartilhada) e aprovar layout, identidade e fluxo. Sem banco, sem login real, sem deploy, sem integrações.

**Referência visual:** identidade = site da matriz (`docs/referencias/matriz-*`, seção "Linguagem visual do grupo" do CLAUDE.md); estrutura da vitrine (home, listagem, detalhe, contato) = template Lalan (`lalan-*`, seção "Estrutura da vitrine"); estrutura do admin = Elizandra Soares (`elizandra-*`). Sem clonar.

**Escopo visual do MVP vindo do Lalan:** hero com cartão de busca (com "Mais opções"), imóveis por cidade/bairro, detalhe com cartão do corretor, "Agendar visita", plantas em acordeão e vídeo, página de contato com mapa. Home proposta: header, hero+busca, destaques, lançamentos/empreendimentos, abas Venda/Locação, imóveis por cidade, por que a ValeCred, faixa "Anuncie", blog, formulário final, rodapé.

**Regras do MVP**
- Dados vêm de um arquivo local isolado (`src/mvp-data/`), com o **mesmo formato** do modelo Prisma futuro. Esse diretório é a única exceção à regra "sem mock" do CLAUDE.md e **é apagado na fase B2**.
- Imagens de exemplo identificadas como ilustrativas; nada de preço/metragem inventado que possa ser confundido com real.
- Admin: telas navegáveis com dados fictícios, sem autenticação real.
- Código no repositório GitHub desde o início (branch `main`), commits pequenos.

| # | Etapa | Entrega | Pronto quando |
|---|---|---|---|
| A0 | Setup | Next.js 15 + TS strict + Tailwind, tokens de cor (`#FCBE2B`, `#165129`), fontes, logo provisório, `.gitignore`, `.env.example` | `npm run dev` abre página em branco com a identidade |
| A1 | Layout global | Navbar, rodapé, botão WhatsApp (número placeholder), `PropertyCard`, `Carousel`, `LazyImage` | Componentes reutilizáveis, responsivos |
| A2 | Home | Hero rotativo, busca rápida, destaques, lançamentos, carrosséis Venda/Locação, Big Numbers, blog | Home completa em mobile e desktop |
| A3 | Imóveis | Listagem com filtros, ordenação e paginação (sobre os dados locais) | Filtros funcionam, estados vazio/carregando |
| A4 | Detalhe do imóvel | Galeria + modal, características, sidebar de contato (visual), similares | Fluxo lista → detalhe → contato fechado |
| A5 | Páginas institucionais | Sobre, Serviços, Anuncie seu imóvel (formulário visual), Contato, Blog (lista + artigo), 404, legais (rascunho) | Todas navegáveis |
| A6 | Admin visual | Dashboard, lista/form de imóveis, leads, solicitações, banners, configurações (dados fictícios) | Cliente entende como vai administrar |
| A7 | QR Code (demo) | Botão no admin gerando QR real (PNG) do site e de um imóvel; PDF fica para a fase B | Demonstra a ideia ao cliente |
| A8 | Revisão | Teste em celular/tablet/desktop, `tsc --noEmit`, build, lista de ajustes | Sem erro de build e sem quebra de layout |
| A9 | Apresentação | Roteiro de demo + checklist de aprovação (cores, textos, seções, o que entra/sai) | Cliente aprova por escrito ou devolve lista de ajustes |

**Status (2026-10-26):** A0 a A9 concluídas; MVP aprovado internamente, falta a aprovação do cliente (portão A→B). Padrão de cantos arredondados aplicado. Revisão em [docs/revisao-mvp.md](docs/revisao-mvp.md); roteiro de demo e checklist de aprovação em [docs/apresentacao-mvp.md](docs/apresentacao-mvp.md) (A9).

**Portão A→B:** aprovação do cliente + lista de ajustes aplicada. Só então a fase B começa.

---

## B) Construção final até o lançamento

Cada fase termina com `npx tsc --noEmit`, build limpo, teste manual e commit/push. Deploy de staging no Easypanel a partir da B1.

| # | Fase | Entrega | Pronto quando |
|---|---|---|---|
| B0 | Pré-requisitos (paralelo) | Logo oficial e fontes; comprar domínio; contatos oficiais (e-mail, WhatsApp); VPS Contabo com Easypanel; conta Resend; Turnstile; buckets R2 (imagens públicas + backups privados) e token restrito | Itens de "Pendências" do CLAUDE.md resolvidos |
| B1 | Base técnica | Schema Prisma + migrations, `lib/prisma.ts`, Dockerfile (standalone, não-root), `/api/health`, serviço App + Postgres no Easypanel, deploy automático do GitHub (staging) | Staging no ar, conecta no banco, healthcheck verde |
| B2 | Dados reais | Trocar `src/mvp-data` por consultas Prisma nos fetchers de servidor (ISR `revalidate = 60`, timeout 8s, **erro em falha**, sem fallback vazio); apagar `mvp-data`; seed inicial | Páginas públicas leem do Postgres; nenhum mock restante |
| B3 | Auth do admin | Login `/login`, sessão em cookie seguro, hash de senha, rate limit, middleware protegendo `/admin`, 404 para rotas sondadas, script de criação/reset do admin | Admin entra; anônimo não acessa nada de `/admin` nem de API |
| B4 | Admin: imóveis + imagens | CRUD de imóveis (5 seções), código automático (VD0001/LC0001), destaque/privado, upload para R2 com validação, EXIF removido, reordenação | Cadastrar imóvel com fotos e vê-lo no site |
| B5 | Leads e solicitações | Formulários de lead e "Anuncie" gravando no banco, Turnstile + honeypot + limite por IP, aviso por Resend + link WhatsApp, telas de leads/solicitações com status, aprovar solicitação vira imóvel | Lead gravado mesmo se o e-mail falhar; aviso chega |
| B6 | Conteúdo do site | Admin de blog, banners da home, configurações (contato, rodapé, Big Numbers, flags), Sobre, Serviços; textos hoje hardcoded passam a vir de `site_settings` | Cliente edita todo o conteúdo sem código |
| B7 | QR Code final | Rota autenticada `png|pdf`, UTM por imóvel, bloqueio de imóvel privado; layout do PDF aprovado com o cliente | Baixar PNG/PDF de qualquer imóvel e do site; QR lê no celular |
| B8 | SEO | Metadata por rota, JSON-LD (`RealEstateAgent`, `RealEstateListing`, `BlogPosting`), `sitemap.ts`, `robots.ts`, títulos com a cidade, artigos de SEO local, imagens otimizadas | Rich Results Test sem erro; sitemap lista imóveis e posts |
| B9 | LGPD e analytics | Banner de consentimento, páginas de privacidade/termos/cookies reais, GA4/Pixel/Clarity só após aceite, retenção e exclusão de leads | Nenhum script de terceiro carrega antes do aceite |
| B10 | Hardening de segurança | Checklist de segurança do CLAUDE.md inteiro: cabeçalhos, CSP, CSRF, usuário de banco restrito, logs sem dados pessoais, GitHub (2FA, branch protegida, Dependabot, secret scanning) | Checklist 100% marcado |
| B11 | Infra de produção | Domínio + HTTPS + Cloudflare, remetente Resend verificado (SPF/DKIM/DMARC), backup Postgres no R2 e **teste de restauração**, firewall/SSH/`fail2ban`, monitoramento de uptime, limite de memória | Backup restaurado com sucesso; alerta de queda funcionando |
| B12 | Conteúdo real e QA | Cadastro dos imóveis reais, fotos próprias, textos finais, CRECI/dados legais no rodapé; QA em celulares reais, Lighthouse/Core Web Vitals, teste de todos os formulários, revisão de links | Sem bug aberto crítico; LCP e CLS aceitáveis |
| B13 | Aprovação final | Demo em staging para o cliente; ajustes finais | Aceite do cliente por escrito |
| B14 | Lançamento | Apontar DNS, deploy de produção, conferir deploy `Ready`/saudável, Search Console (enviar sitemap), Google Meu Negócio, conferir GA4 | Site público no ar, indexável, leads chegando |
| B15 | Pós-lançamento | Monitorar 1–2 semanas (erros, uptime, leads), corrigir, definir rotina de backup/atualizações, backlog (favoritos, simulador, agendamento de visita etc.) | Operação estável e backlog priorizado |

**Dependências críticas:** B0 (domínio e contatos) trava B5 (e-mail) e B11; B7 (PDF) depende do layout aprovado; B12 depende do cliente entregar fotos e dados dos imóveis, então pedir esse material cedo.
