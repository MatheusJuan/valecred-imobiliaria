# CLAUDE.md — ValeCred Empreendimentos Imobiliários

## Sobre o projeto

Site institucional + vitrine de imóveis + painel administrativo da **ValeCred Empreendimentos Imobiliários**, do mesmo grupo da ValeCred Soluções Financeiras (https://www.valecred.com.br/). SEO local é o principal canal de aquisição.

Escopo funcional = o do site de referência (Elizandra Soares), descrito em [BASE-SITE-IMOBILIARIA.md](BASE-SITE-IMOBILIARIA.md): páginas públicas, admin, modelo de dados, SEO, segurança e armadilhas. **Ler esse arquivo antes de implementar qualquer módulo.** Este CLAUDE.md só registra o que muda.

Sem cadastro de clientes nem login público. Um único admin autenticado. Visitante navega, vê imóveis e contata (WhatsApp / formulário de lead).

Plano de execução (MVP visual local → construção final → lançamento): [ROADMAP.md](ROADMAP.md). Trabalhar sempre na fase corrente do roadmap.

## Referências visuais (portfólio)

Screenshots do site da Elizandra Soares em `docs/referencias/`, usados só para entender estrutura e organização. **Não clonar**: layout, textos, imagens e identidade da ValeCred são próprios (verde `#165129` e amarelo `#FCBE2B`).

- [elizandra-home.webp](docs/referencias/elizandra-home.webp): home completa. Ordem das seções: hero com foto e busca sobreposta (localização, tipo, finalidade), vitrine de destaques, faixa escura de lançamentos, carrosséis de Locação e Venda, Big Numbers, blog, rodapé (navegação, serviços, contato). Tipografia: serifada nos títulos, sans no corpo. Cards com selo de status e preço "A Consultar".
- [elizandra-admin-dashboard.png](docs/referencias/elizandra-admin-dashboard.png): dashboard do admin ("Console"). Sidebar com as abas (Dashboard, Imóveis, Blog, Solicitações, Leads, Banners, Empreendimentos, SEO, Desempenho SEO, Sobre, Serviços, Configurações, Suporte), cards de números (imóveis ativos, solicitações, leads, posts, valor do portfólio), listas de leads, solicitações e imóveis recentes.
- Pontos a **melhorar/diferenciar** na ValeCred: rodapé sem newsletter decorativa; barra superior do site mais enxuta; admin com identidade própria; hero com foto própria (sem pessoas de banco de imagem sem licença).

## Linguagem visual do grupo (site da matriz)

Screenshots em `docs/referencias/`: [matriz-home](docs/referencias/matriz-home.webp), [matriz-antecipacao](docs/referencias/matriz-antecipacao.webp), [matriz-oportunidades](docs/referencias/matriz-oportunidades.webp), [matriz-carreira](docs/referencias/matriz-carreira.webp). **Esta é a referência principal de identidade** (a da Elizandra é só de estrutura). A imobiliária deve parecer da mesma família, sem copiar seções nem textos.

**Cores (observadas nos screenshots)**
- Verde escuro `#165129`: faixas de seção, rodapé, botões. Amarelo `#FCBE2B`: faixas de destaque (FAQ, depoimento, CTA), item ativo do menu, botão flutuante de chat. Os hex que o cliente passou vêm daqui; o verde mais vivo do logo (`#0C7E35`) fica só no logo.
- Fundos alternando: branco, cinza claro (~`#F1F0F0`), verde escuro, amarelo. Texto escuro sobre branco/cinza/amarelo; branco sobre verde. Amarelo nunca com texto branco.
- Botão primário: verde escuro, texto branco, cantos pouco arredondados (quase retos). Sobre faixa verde, botão amarelo com texto escuro.

**Layout e alinhamento**
- Cabeçalho branco, logo à esquerda, menu horizontal em texto pequeno cinza-escuro, item ativo em amarelo.
- Container central estreito (~1100–1200 px), muito respiro vertical entre seções.
- Títulos de seção **centralizados**, curtos, com subtítulo pequeno centralizado; conteúdo de cartões alinhado à esquerda.
- Bloco "foto grande + cartão branco sobreposto" alternando lado (esquerda/direita) sobre fundo cinza, com título, texto curto e botão "Saiba mais". Bom padrão para empreendimentos, lançamentos e serviços.
- Grade de 3–4 colunas com **ícones de linha** verde escuro, título em negrito pequeno e texto curto (benefícios, diferenciais, passos).
- Faixa de FAQ/depoimento em amarelo, 2 colunas de perguntas com ícone.
- Formulário centralizado: labels pequenas acima, campos com borda fina e retos, botão verde. Título convidativo acima ("Que tal…?").
- Rodapé verde escuro, 4 colunas em texto branco pequeno (empresa, produtos, transparência, links úteis), redes sociais, logo centralizado e linha legal com razão social/CNPJ. Botão flutuante amarelo de contato no canto direito.
- Ilustrações vetoriais leves (estilo unDraw) em verde/amarelo nas faixas institucionais; fotos de pessoas reais sorrindo nas seções principais.

**Tipografia:** sans-serif geométrica tipo Inter, títulos em negrito escuro, corpo pequeno e leve com bom espaçamento entre linhas. (A serifada da Elizandra **não** entra.)

**Tom de voz:** próximo e informal, 2ª pessoa ("sua empresa", "você"), perguntas retóricas nos títulos, reticências nas aberturas ("…"), "Time que Vale a Pena", `#vempravale`, "Vem pra Vale". Frases curtas, sem jargão pesado. Adaptar para imóveis ("Que tal encontrar o seu lugar?"), mantendo a mesma voz.

**Adaptação para a imobiliária:** manter paleta, tipografia, botões, rodapé e o padrão foto+cartão; trocar conteúdo por imóveis, empreendimentos e leads. Admin e vitrine de imóveis seguem a estrutura da Elizandra, vestidos com esta identidade.

## Estrutura da vitrine (template "Lalan") com as cores da ValeCred

Screenshots em `docs/referencias/lalan-*` (cards, hero+busca, imóveis por cidade, rodapé, listagem, detalhe em 5 partes, contato). **Decidido: seguir esta ideia de estrutura para as páginas de imóveis, vestida com a identidade da matriz** (cores, tipografia e tom da seção "Linguagem visual do grupo"). Sem copiar o template; a ideia é o padrão de UX.

**O que adotar**
- **Header:** transparente sobre o hero, branco nas demais páginas (sombra leve); logo horizontal à esquerda, menu centralizado, à direita botão de destaque "+ Anuncie seu imóvel". Sem "Login" público (não há conta de cliente).
- **Hero:** foto de fundo em tela cheia com overlay escuro, título central e **cartão branco de busca** sobreposto: local, tipo, status (finalidade) e botão; link "Mais opções" expande quartos, banheiros, vagas e faixa de preço (slider).
- **Card de imóvel:** foto com selo de status no canto superior esquerdo, título, endereço curto, preço em destaque e rodapé com quartos / banheiros / área. É o `PropertyCard` único do projeto.
- **Imóveis por cidade/bairro:** mosaico de blocos com foto, nome e contagem de imóveis. Útil para SEO local e navegação (cada bloco leva à listagem filtrada).
- **Listagem:** cartão de filtros no topo, barra lateral com tipos e contagem por tipo, ordenação e alternância grade/lista.
- **Detalhe do imóvel:** topo com título, endereço, preço e finalidade; código do imóvel e compartilhar; galeria com miniaturas; coluna lateral com **cartão do corretor** e formulário **"Agendar visita"**; descrição com ícones de especificações (área, quartos, banheiros, cômodos, andares, vagas); lista de características com check; localização com mapa; **plantas** em acordeão por pavimento; vídeo; imóveis em destaque/similares.
- **Contato:** banner de topo com breadcrumb, endereço/telefone/e-mail e mapa.
- **Rodapé:** 4 colunas (marca + endereço/contato, empresa, saiba mais, contato/redes) com divisória e linha de direitos. **Sem newsletter** (decorativa).

**Mapeamento de cores (Lalan → ValeCred)**
- Verde-menta de ação/preço do Lalan → **verde `#165129`** em botões, links e preço; amarelo `#FCBE2B` para selos de destaque, item ativo e faixas de CTA (texto escuro sobre amarelo).
- Azul-marinho dos títulos → texto escuro neutro; fundo azul-claro das seções → cinza claro `#F1F0F0`/branco.
- Selo "Venda/Aluguel" escuro sobre a foto: verde escuro ou preto translúcido com texto branco.
- Tipografia: **Inter** (família do grupo), não Poppins.

**Novidades de escopo vindas deste template (não estavam no BASE)** — todas entram no modelo de dados e no admin na fase B:
- **Plantas** por pavimento (imagem + área/quartos/banheiros) e **vídeo** (YouTube/Vimeo) no imóvel; relevantes para lançamentos.
- **Cartão do corretor** (foto, nome, telefone/WhatsApp, CRECI) no detalhe; um corretor padrão no início, vários depois.
- **Agendar visita** no detalhe (nome, e-mail, telefone, mensagem, data/horário preferido opcionais) gerando lead do tipo visita.
- Campos extras do imóvel: cômodos e andares. Selos/botões de compartilhar (WhatsApp, Facebook, copiar link). Breadcrumb nas páginas internas.
- Favoritos (coração) aparece no template mas fica no backlog (exige armazenamento local ou conta).
- **Mapa:** o template mostra erro de Google Maps; evitar chave paga/CSP quebrada. Usar embed simples do Google Maps (iframe, liberado na CSP) ou OpenStreetMap/Leaflet; endereço/bairro exibido mesmo sem mapa.

## O que muda em relação ao site de referência

| Item | Referência | Este projeto |
|---|---|---|
| Hospedagem | Vercel | **VPS Contabo com Easypanel** (Docker) |
| Banco | Supabase Postgres | **Postgres** (serviço do Easypanel) |
| Auth | Supabase Auth | Auth própria, admin único (ver abaixo) |
| Storage de fotos | Supabase Storage | **Cloudflare R2** (API S3) |
| Segurança de dados | RLS | Regras na camada de servidor (não há RLS por usuário) |
| Deploy | Git push na Vercel | Git → Easypanel (build Dockerfile/Nixpacks) |

O resto segue igual: Next.js 15 (App Router), React 19, TypeScript strict, Tailwind, pt-BR, geração de descrição com IA só no servidor.

## Stack

- Next.js 15 + React 19 + TypeScript strict + Tailwind.
- Postgres via **Prisma** (`schema.prisma` + migrations versionadas em `prisma/migrations`). Deploy aplica `prisma migrate deploy`; `prisma generate` no build do Dockerfile. Cliente único (singleton) em `lib/prisma.ts`.
- Auth do admin: sessão em cookie httpOnly assinado, senha com hash (argon2/bcrypt), login em `/login`, rate limit. Sem cadastro público; admin criado por seed/script.
- Imagens: `next/image` com otimização ativa; upload via rota de API autenticada (valida tipo e tamanho), nome único, enviado ao **Cloudflare R2** com `@aws-sdk/client-s3` e servido por domínio público do bucket (ex.: `img.<dominio>`) com `Cache-Control` de 1 ano. Domínio entra em `images.remotePatterns` e na CSP. Sem disco local: o container continua descartável. Bucket **exclusivo deste projeto** (não reutilizar o de outro projeto); credenciais R2 só em env do Easypanel, token com permissão apenas nesse bucket. MinIO e volume descartados.
- IA (descrição de imóvel): chave só no servidor, rota exige sessão, limite 15 req/min por usuário.

## Infra (Easypanel / Contabo)

- App Next.js como serviço "App" no Easypanel, build por Dockerfile (`output: "standalone"` no `next.config.ts`).
- Postgres como serviço do Easypanel na mesma rede interna; app conecta pelo host interno via `DATABASE_URL`. **Não expor a porta 5432 publicamente.**
- Variáveis de ambiente configuradas no painel do Easypanel; `.env.example` no repo, nunca commitar `.env*` reais.
- Backup (destino **fora da VPS**, Cloudflare R2, bucket **separado** do das imagens e privado):
  - Postgres: backup agendado nativo do Easypanel (aba Backups do serviço) diário, retenção ~7 diários + 4 semanais. Testar restauração ao menos uma vez.
  - Imagens já ficam no R2 (durável); sem backup de volume. Opcional: versionamento ou cópia periódica do bucket de imagens.
  - Snapshot da VPS na Contabo é complemento, não substitui.
- Código no **GitHub**; Easypanel faz o build a partir do repositório (branch `main`). Repo privado se houver segredo de negócio; nunca commitar `.env*`.
- Domínio + HTTPS pelo proxy do Easypanel (Traefik/Let's Encrypt).
- ISR com cache em disco no container: com mais de uma réplica o cache não é compartilhado; manter 1 réplica ou configurar cache handler.
- Healthcheck simples (`/api/health`) para o Easypanel.
- Deploy: confirmar no Easypanel que o build novo subiu e está saudável (webhook/Git pode falhar em silêncio, como na Vercel).

## Dados e acesso

- Tabelas conforme seção 4 do BASE: `properties`, `blog_articles`, `home_banners`, `property_leads`, `advertise_requests`, `site_settings`.
- Sem RLS por usuário: **toda leitura pública passa por funções de servidor que já filtram `is_private IS NOT TRUE`**. Escrita e leitura de leads/solicitações só em rotas/Server Actions que validam sessão do admin. Opcional: role de Postgres somente-leitura para as consultas públicas.
- Validar toda entrada (formulário de lead, "Anuncie seu imóvel", uploads: tipo e tamanho) no servidor.

## Operação, segurança e leads

- **Aviso de lead (obrigatório):** todo lead e toda solicitação de "Anuncie" dispara notificação imediata por e-mail (**Resend**, SDK `resend`, chave só no servidor/env; remetente no domínio do site com SPF/DKIM/DMARC configurados após comprar o domínio; até lá, só testes com o domínio de sandbox) e link/aviso de WhatsApp para o contato de captação em `site_settings`. Falha no envio é logada, nunca perde o lead (grava no banco primeiro, notifica depois).
- **Anti-spam nos formulários:** Cloudflare Turnstile (validado no servidor) + honeypot + limite de envios por IP.
- **Segurança da VPS:** painel do Easypanel com senha forte (2FA se possível); SSH só por chave; firewall liberando apenas 80, 443 e SSH; `fail2ban`; atualizações do SO em dia. Login do admin com limite de tentativas.
- **Cloudflare na frente do domínio:** DNS, proxy e proteção contra bots. Decidir junto com a compra do domínio.
- **Monitoramento:** uptime check externo (UptimeRobot ou similar) com alerta, apontando para `/api/health`. Sentry só se virar necessário.
- **Migrations em produção:** `prisma migrate deploy` roda no deploy. Migration que remove/altera coluna ou tabela exige backup do Postgres antes e revisão do SQL.
- **Memória da VPS:** build do Next consome muita RAM. Se a VPS for pequena, usar swap ou gerar a imagem fora (GitHub Actions) e só puxar no Easypanel. Definir limite de memória do serviço.
- **LGPD dos leads:** definir prazo de retenção e rotina para pedido de exclusão (admin consegue apagar/anonimizar lead). Dados de leads da imobiliária ficam separados dos sistemas financeiros do grupo.
- **Relação com valecred.com.br:** link cruzado entre os sites; decidir domínio próprio vs subdomínio (impacta marca e SEO); não duplicar texto entre os dois sites. No lançamento: Google Search Console e Google Meu Negócio.
- **Ambiente de teste (opcional):** segundo serviço no Easypanel com banco e bucket próprios, para validar antes de publicar.

## Checklist de segurança de código

- **Sessão:** cookie `httpOnly`, `Secure`, `SameSite=Lax` (ou `Strict`), expiração curta com renovação. Rotas de API que alteram dados conferem `Origin`/`Host` (proteção CSRF); Server Actions já fazem essa checagem, não desligar.
- **Upload de imagem:** validar o conteúdo real (magic bytes), não só o MIME declarado; aceitar apenas JPEG/PNG/WebP; **bloquear SVG**; limite de tamanho; remover EXIF/GPS antes de enviar ao R2 (ex.: reprocessar com `sharp`).
- **Cabeçalhos HTTP** em `next.config.ts`: CSP, HSTS, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `frame-ancestors 'none'` (ou `X-Frame-Options: DENY`), `Permissions-Policy`.
- **Container:** Dockerfile multi-stage, rodando como usuário não-root, imagem enxuta (standalone), sem segredos no build/imagem.
- **Banco:** usuário do Postgres da aplicação só com o necessário (sem superuser; migrations podem usar usuário separado). **Proibido `$queryRaw`/`$executeRaw` com entrada do usuário**; se for inevitável, só com template tagged parametrizado.
- **GitHub:** 2FA na conta, proteção da branch `main`, secret scanning e push protection, Dependabot (alertas e updates), `npm audit` antes de subir dependência nova.
- **Recuperação do admin:** sem "esqueci a senha" público. Reset por script na VPS (`prisma db seed`/CLI) executado por quem tem acesso ao servidor.
- **Logs:** nunca registrar dados pessoais de leads, senhas, tokens ou chaves; logar só IDs e status.

## Gerador de QR Code (novo, não existe no site de referência)

Admin gera QR Code para **cada imóvel** (`/imovel/[id]`) e para o **site principal** (home). Uso previsto: placas, banners, folders, cartões.

- Biblioteca: `qrcode` (npm), uma dependência só. Sem serviço externo (a URL do imóvel não sai do servidor).
- Onde fica no admin: botão "QR Code" na lista e no formulário de imóveis; QR do site principal em Configurações.
- Geração: rota de API autenticada (`/api/admin/qrcode?target=site|property&id=...&format=png|pdf`) que devolve o arquivo para download: **PNG** (digital/redes) ou **PDF** (impressão). Validar `id` existente e `target` por allowlist; nunca gerar QR de URL arbitrária vinda do cliente.
- URL base vem de `site_settings`/env (domínio oficial), nunca do header da requisição nem hardcoded.
- A URL codificada leva `?utm_source=qr&utm_medium=print&utm_campaign=<codigo-do-imovel|site>` para medir acessos vindos do QR no GA4. Imóvel identificado pelo código (ex.: VD0001) na campanha.
- PDF: página A4 com o QR centralizado, nome/código do imóvel e URL curta legíveis abaixo; gerado no servidor embutindo o PNG com `pdf-lib` (segunda e última dependência da feature). QR do PDF em ~10 cm de lado.
- Qualidade para impressão: PNG em alta resolução (≥1024px, sem suavização/interpolação); correção de erro nível M ou Q; margem (quiet zone) mínima de 4 módulos; contraste escuro sobre fundo claro. Cores da marca só se o contraste continuar alto e o QR for testado com leitor real; padrão é preto sobre branco.
- Imóvel privado: não gera QR (a página não é pública).
- Se o imóvel for excluído, o QR impresso cai em 404. Preferir despublicar a excluir, ou redirecionar para a listagem.

## Regras herdadas das armadilhas do BASE (resumo)

1. Nada de `cookies()`/`headers()` na árvore pública; páginas públicas estáticas/ISR (`revalidate = 60`), `generateStaticParams` vazio em `/imovel/[id]` e `/blog/[slug]`.
2. Fetchers de servidor **lançam erro** em falha (nunca devolvem dado vazio, senão o ISR cacheia página vazia). Timeout de 8s, `cache()` do React.
3. Home com SSR dos dados desde o início (LCP).
4. Dados de admin (leads, solicitações) só no admin, nunca no contexto público.
5. Sem mock/fallback em `constants`; erro de configuração tem que aparecer.
6. Nome da imobiliária, telefone, WhatsApp, endereço e horário vêm de `site_settings`, nunca hardcoded.
7. Fotos próprias; sem Street View. Sem newsletter decorativa.
8. Analytics (GA4, Meta Pixel, Clarity) só após consentimento (LGPD) e só com ID válido. Textos legais refletem o que o site faz.
9. JSON-LD sempre via `jsonLdHtml()` (escapa `<`). CSP em `next.config.ts`: todo script/iframe de terceiro entra lá.
10. Middleware: protege `/admin`, redireciona `/login`, 404 vazio para rotas sondadas por bots.

## Identidade e tom

- Cores da marca definidas pelo cliente: **amarelo `#FCBE2B`** e **verde `#165129`** (tokens Tailwind/CSS em um só lugar; checar contraste do texto sobre cada cor, amarelo com texto verde escuro/preto).
- **Logos oficiais da imobiliária** (PNG com fundo transparente, com a legenda "Empreendimentos imobiliários"):
  - Horizontal: `docs/brand/valecred-imobiliaria-horizontal.png` (1169x234). Usar no cabeçalho e rodapé.
  - Vertical: `docs/brand/valecred-imobiliaria-vertical.png` (1148x593). Usar no PDF do QR Code, favicon/OG, login do admin e materiais impressos.
  - Favicon: `docs/brand/favicon-source.jpg` (192x192, JPG com fundo branco, usa o logo antigo "ValeCred" sem legenda). Serve de origem para `app/icon.png`/`apple-icon.png` (Next.js gera as tags). Limitações: JPG sem transparência e só 192px; para o lançamento gerar também 512x512 e `favicon.ico` (32/48px), preferindo recorte só do retângulo/“V” legível em tamanho pequeno.
  - `docs/brand/valecred-logo.png` é o logo antigo do grupo (fundo branco, sem legenda); só referência, não usar no site.
- Verde do logo ≈ `#0C7E35` e amarelo ≈ `#F9DA29`, **diferentes** das cores do site (`#165129`/`#FCBE2B`, que vêm da matriz). O logo fica como está; o resto do site segue as cores da matriz (ver "Linguagem visual do grupo"). Em fundo verde escuro, o logo atual (verde) perde contraste: usar sobre fundo branco/claro ou pedir versão em branco/monocromática para o rodapé.
- Tom: acolhedor, informal sem ser displicente, transparente. `#vempravale`, "time que vale a pena".
- Contatos do grupo (confirmar quais valem para a imobiliária; devem ir para `site_settings`): (15) 3259-8800, (15) 3324-8800, (15) 99794-9772, comercial@valecred.com.br. Sede do grupo: Tatuí-SP.
- Compliance imobiliário: imagens ilustrativas identificadas como tal; exibir CRECI/registro de incorporação quando aplicável; não inventar preços, metragens ou prazos.

## Convenções de trabalho

- **Cantos arredondados (padrão do projeto):** usar só os tokens de `globals.css`: `rounded-control` (botões, campos, abas, miniaturas), `rounded-card` (cards, formulários, avisos), `rounded-panel` (hero, faixas coloridas, galeria, rodapé, imagens grandes) e `rounded-full` (selos e contadores). Não usar `rounded-sm/lg/xl/2xl/3xl` direto. Faixas coloridas e rodapé são painéis inset (`px-3 md:px-6` + `rounded-panel`).

- Interface, copy, commits e textos legais em **pt-BR**; identificadores em inglês.
- Padrão por rota: `page.tsx` de servidor fino (metadata, JSON-LD, dados) + `*Client.tsx` para interatividade. `PropertyCard` único reutilizado.
- Fluxo: implementar → `npx tsc --noEmit` → build → conferir no navegador → commit e push → confirmar deploy saudável no Easypanel.
- Sem framework de testes sem pedido. Seguir o estilo do código existente. Preferir a solução mais simples; sem dependência nova para o que poucas linhas resolvem.

## Comandos

- `npm run dev` / `npm run build` / `npm run start` / `npm run lint` / `npx tsc --noEmit`.
- `npm run db:migrate` (`prisma migrate dev`, com `DATABASE_URL` apontando para um Postgres local) e `npm run db:deploy` (`prisma migrate deploy`, usado na subida do container).
- `postinstall` roda `prisma generate`. Seed do admin (`prisma db seed`) vem na fase B3.
- Trabalho da fase B fica na branch `fase-b`; a `main` publica a demonstração do MVP na Vercel. Detalhes e pendências externas em [docs/fase-b-preparacao.md](docs/fase-b-preparacao.md).

## Pendências em aberto

- Logo em SVG (hoje só PNG transparente), versão branca/monocromática para fundo verde (rodapé) e fontes da marca.
- Domínio, e-mail/WhatsApp de captação de leads e contatos oficiais: **ainda não existem**; criar e colocar em `site_settings`. Até lá, não usar os contatos do grupo como se fossem da imobiliária.
- Empreendimentos próprios: haverá páginas dedicadas (como as 3 do site de referência) ou só o filtro "Lançamento"?
- Itens da seção 9 do BASE a incluir no escopo (agendamento de visita, simulador, notificação de lead, etc.).
- QR Code: incluir logo da ValeCred no centro? (exige correção de erro Q/H e teste de leitura) e layout final do PDF (só QR + código, ou com logo/telefone da ValeCred).
- Definir prazo de retenção LGPD, tamanho da VPS e se haverá ambiente de teste.
- Criar no R2 dois buckets (imagens públicas e backups privados) e o token de API restrito.
