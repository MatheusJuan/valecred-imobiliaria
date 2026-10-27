# Base: o que um site de imobiliária completo tem

Texto de referência extraído do site da Elizandra Soares (Next.js 15 + Supabase + Vercel). Serve de checklist de escopo para o novo site. Tudo abaixo existe e funciona no site de origem, salvo onde marcado "faltou" ou "armadilha".

## 1. Visão geral

Site institucional + vitrine de imóveis + painel administrativo, para uma imobiliária local (SEO local é o principal canal de aquisição). Não há cadastro de clientes nem login público: o visitante navega, vê imóveis e entra em contato (WhatsApp / formulário de lead). Existe um único admin, autenticado.

Stack usada: Next.js 15 (App Router), React 19, TypeScript strict, Tailwind, Supabase (Postgres + Auth + Storage), Gemini (texto de descrição de imóvel, só no servidor), Vercel.

## 2. Páginas públicas

- **Home**: banner hero rotativo (troca a cada 8s, imagem + título + subtítulo + botão com link interno ou externo); busca rápida (tipo, finalidade, cidade/bairro); imóveis em destaque; 3 banners de empreendimentos; seção de lançamentos; carrossel de Locação e carrossel de Venda (menor para maior preço, "A Consultar" por último, máximo 12, cada um liga/desliga pelo admin); "Big Numbers" (4 números de credibilidade, ex.: anos de mercado, imóveis negociados); carrossel de Blog.
- **Imóveis (listagem)**: filtros por finalidade (Venda/Aluguel/Lançamento), categoria, busca textual, filtros avançados (faixa de preço, faixa de área, quartos, banheiros, vagas), ordenação (mais recentes etc.), paginação, estado de carregamento. Aceita parâmetros vindos da home (ex.: `status=Lançamento`).
- **Detalhe do imóvel** (`/imovel/[id]`): galeria com imagem principal e miniaturas, modal de tela cheia, descrição, características (lista), especificações (área, quartos, banheiros, vagas), preço + condomínio + seguro (opcionais, ou "A Consultar"), localização (bairro/cidade, link de mapa), código do imóvel, sidebar de contato (botão WhatsApp com mensagem pré-preenchida citando o imóvel + formulário nome/telefone que grava um lead), imóveis similares. Imóvel privado nunca aparece.
- **Blog** (lista + `/blog/[slug]`): artigos com título, resumo, autor, data, imagem, SEO próprio. Conteúdo em texto puro (sem markdown).
- **Sobre**: título, subtítulo, três blocos de texto, foto da fachada, números. Tudo editável no admin.
- **Serviços**: lista de serviços (título, descrição, ícone) editável no admin.
- **Anuncie seu imóvel**: formulário para proprietário (nome, telefone, e-mail, tipo, finalidade, preço, área, endereço, bairro, cidade, fotos, descrição). Vira uma "solicitação" no admin, com status pendente/aprovada/rejeitada.
- **Páginas de empreendimento** (3 rotas fixas com layout compartilhado `EmpreendimentoLayout`): cada uma pode ser ligada/desligada no admin. Só vale se a imobiliária tiver loteamentos/lançamentos próprios; senão, use apenas o filtro "Lançamento".
- **Legais**: `/privacidade`, `/termos-de-uso`, `/cookies` (LGPD), com banner de consentimento e página para mudar/revogar a escolha.
- **Login** (`/login`) e **Admin** (`/admin`): protegidos, sem indexação.
- Técnicos: `sitemap.ts` (inclui imóveis e posts), `robots.ts`, ícone, 404.

## 3. Elementos globais

Navbar com logo e links; rodapé (texto, citação, contato, horário, redes); botão/links de WhatsApp em vários pontos; telefone, endereço e horário vindos de configuração (não hardcoded); banner de cookies; carrossel genérico reutilizável (`Carousel`, scroll-snap); `PropertyCard` único usado em lista, destaque, carrossel e similares; `LazyImage`; toasts de feedback.

## 4. Modelo de dados (Supabase)

Tabelas: `properties`, `blog_articles`, `home_banners`, `property_leads`, `advertise_requests`, `site_settings` (chave/valor em grupos). Storage: bucket `property-images`.

Imóvel: código automático por finalidade (LC0001 locação, VD0001 venda...), título, descrição, preço numérico ou "A Consultar", condomínio e seguro opcionais, status (Venda/Aluguel/Lançamento), categoria (Casa, Apartamento, Terreno, Comercial, Casa em Condomínio), área, quartos, banheiros, vagas, localização (cidade, UF, bairro, endereço, lat/lng opcionais), imagens (array), características (array), destaque, privado, potencial de investimento, `createdAt`, `seoTitle`, `seoDescription`.

Lead: imóvel, nome, telefone, data, status (novo/contatado/convertido/arquivado).

Configurações: título e descrição do site, keywords, imagem OG, IDs de GA4/Meta Pixel/Clarity, chave de mapas, contato (endereço, telefone, WhatsApp, horário), textos de Sobre, serviços, rodapé, 4 big numbers, flags de visibilidade (empreendimentos, carrosséis da home).

## 5. Painel administrativo (`/admin`, abas)

- **Dashboard**: cards de números, leads recentes, solicitações recentes, imóveis recentes, estatísticas adicionais.
- **Imóveis**: busca e filtros, criar/editar/excluir; formulário em 5 seções (informações básicas, especificações técnicas + custos adicionais, localização, marketing e SEO, mídia). Upload de várias fotos com reordenação/remoção. Botão "gerar descrição com IA" (Gemini, via rota de API autenticada). Marcar destaque e privado.
- **Blog**: CRUD de artigos com SEO.
- **Solicitações**: fila de "Anuncie", aprovar/rejeitar; aprovar pode virar imóvel.
- **Leads**: lista de interessados por imóvel, mudar status, contato rápido.
- **Banners Home**: CRUD dos banners do hero e liga/desliga das seções da home.
- **Empreendimentos**: visibilidade de cada página de empreendimento.
- **Configurações**: contato, analytics/pixels, SEO básico, rodapé, big numbers.
- **SEO**: títulos, descrições, keywords e imagem OG.
- **Desempenho SEO**: iframe do Looker Studio (Search Console), sem API.
- **Sobre Nós** e **Serviços**: edição dos textos.
- **Suporte & Ajuda**: guia de uso do próprio painel.

## 6. SEO e performance (o que tornou o site "completo")

- Padrão por rota: `page.tsx` servidor fino (metadata, JSON-LD, dados mínimos) + `*Client.tsx` com interatividade. A home busca tudo no servidor.
- Tudo estático/ISR com `revalidate = 60`; `/imovel/[id]` e `/blog/[slug]` com `generateStaticParams() { return [] }`. Fetchers de servidor usam cliente Supabase anônimo sem cookies, `cache()` do React, timeout de 8s, e **lançam erro** em falha (nunca devolvem dado vazio, senão o ISR cacheia página vazia).
- JSON-LD: `RealEstateAgent` global, `RealEstateListing` por imóvel, `BlogPosting` por artigo; sempre via `jsonLdHtml()` (escapa `<`).
- SEO local: título/descrição estáticos por página citando a cidade; `areaServed`/`addressLocality` no schema; blog com artigos de SEO local (seed em SQL).
- Imagens: `next/image`, hosts liberados em `next.config.ts`, upload com cache de 1 ano e nome único.
- Segurança de cabeçalhos: CSP em `next.config.ts` (qualquer script/iframe de terceiro precisa entrar ali).

## 7. Segurança e privacidade

- Imóvel privado protegido por RLS (`is_private IS NOT TRUE` para anônimo; política separada para `authenticated` ver tudo). Filtro no front é só defesa extra. Conferir duplicatas de política com `pg_policies`.
- Escrita só para usuário autenticado; **modelo de um único admin**: desligar "Allow new users to sign up" no Supabase.
- Middleware: protege `/admin`, redireciona `/login`, responde 404 vazio para rotas que bots sondam.
- Chave do Gemini só no servidor; rota exige sessão e limita 15 req/min por usuário.
- LGPD: analytics (GA4, Meta Pixel, Clarity) só carregam após aceite e só com ID de formato válido. Textos legais devem refletir o que o site realmente faz.

## 8. Armadilhas aprendidas (evitar no novo projeto)

1. Um único `cookies()`/`headers()` na árvore pública derruba todas as rotas para renderização por request.
2. Fallback de dados vazios em erro + ISR = site vazio em produção.
3. Apertar RLS pública sem política para `authenticated` quebra o admin.
4. `SiteDataContext` busca leads e solicitações de admin para todo visitante; no novo projeto, só buscar isso no admin.
5. Home client-only gerou LCP de 14s; fazer SSR dos dados da home desde o início.
6. Conexão Git da Vercel pode cair em silêncio; checar a lista de deploys.
7. Dados de exemplo/mock em `constants.tsx` como fallback escondem erro de configuração; evitar.
8. Textos hardcoded com o nome da imobiliária (ex.: mensagem do WhatsApp) devem sair de configuração.
9. Foto de fachada tirada do Street View não pode ser reutilizada; usar foto própria.
10. Newsletter decorativa no rodapé: não incluir se não coleta nada.

## 9. Ideias que o site de origem não tem (considerar no escopo)

Favoritos, comparar imóveis, simulador de financiamento, mapa embutido com pins, agendamento de visita, vários corretores, CRM/exportação de leads, notificação de lead por e-mail/WhatsApp, filtro por bairro com autocomplete, markdown no blog, painel multiusuário com papéis (exigiria trocar o modelo de RLS por identidade/papel).

## 10. Convenções de trabalho

Interface, copy, commits e textos legais em pt-BR; identificadores em inglês. Fluxo: implementar, `npx tsc --noEmit`, build, conferir no navegador, commit e push, confirmar deploy `Ready`. Não adicionar framework de testes sem pedido. Nunca commitar `.env.local`.
