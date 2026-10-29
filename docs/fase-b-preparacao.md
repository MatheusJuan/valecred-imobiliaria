# Fase B: preparação (B0 e B1)

Tudo que **não depende de código** e pode andar enquanto o cliente analisa o MVP. O que já está pronto no repositório (branch `fase-b`) e o que falta fazer em contas e servidores.

## Já pronto no código (branch `fase-b`)

| Item | Onde |
|---|---|
| Modelo de dados (10 tabelas, 5 enums) e SQL inicial | `prisma/schema.prisma`, `prisma/migrations/20261029000000_init/` |
| Cliente Prisma único | `src/lib/prisma.ts` |
| Imagem Docker (multi-stage, usuário não-root, migrations na subida) | `Dockerfile`, `docker-entrypoint.sh`, `.dockerignore` |
| Saída `standalone` do Next.js | `next.config.ts` |
| Health check (`/api/health`, `?deep=1` testa o banco) | `src/app/api/health/route.ts` |
| Modelo das variáveis de ambiente | `.env.example` |
| `sharp` (otimização de imagens e remoção de GPS nos uploads) | `package.json` |

**Não testado ainda:** a imagem Docker e as migrations. A máquina de desenvolvimento não tem Docker nem Postgres. O primeiro teste real será o deploy no Easypanel (ou instalar Docker Desktop localmente).

## O que fazer fora do código

Ordem sugerida. Itens marcados com 🔒 dependem de decisão do cliente.

### 1. Servidor (Contabo + Easypanel)
- [ ] Escolher o plano da VPS. Sugestão: **pelo menos 4 GB de RAM**; o build do Next.js consome muita memória (com 2 GB, ativar swap ou gerar a imagem fora).
- [ ] Instalar o Easypanel seguindo o guia oficial deles e proteger o painel (senha forte, 2FA se houver).
- [ ] Firewall liberando só 80, 443 e SSH; SSH somente por chave; `fail2ban`.
- [ ] Criar o serviço **Postgres** no Easypanel. Não expor a porta 5432.
- [ ] Criar o serviço **App** a partir do repositório GitHub (branch `main`), build por Dockerfile, porta 3000, healthcheck em `/api/health`.
- [ ] Se o repositório for privado: gerar a *deploy key* no Easypanel e cadastrá-la em *GitHub, Settings, Deploy keys* (somente leitura).
- [ ] Variáveis de ambiente do App no painel (modelo em `.env.example`).
- [ ] Ativar o backup agendado do Postgres (diário, 7 diários e 4 semanais).

### 2. Cloudflare
- [ ] 🔒 Domínio comprado e apontado para a Cloudflare (DNS e proxy).
- [ ] **Dois buckets no R2**: `imagens` (público, com domínio `img.<dominio>`) e `backups` (privado).
- [ ] Token de API do R2 restrito ao bucket de imagens (outro, ou o mesmo com escopo separado, para os backups).
- [ ] Site no **Turnstile** (chave pública e secreta) para os formulários.

### 3. E-mail e contatos
- [ ] 🔒 Conta no **Resend** e verificação do domínio (SPF, DKIM e DMARC).
- [ ] 🔒 E-mail que recebe os avisos de lead e WhatsApp de captação.
- [ ] 🔒 Telefone, endereço e horário oficiais, CRECI, razão social e CNPJ.

### 4. Conteúdo (cliente)
- [ ] 🔒 Fotos reais, textos finais e lista inicial de imóveis.
- [ ] 🔒 Logo em SVG e versão branca; fontes da marca, se houver.
- [ ] 🔒 Validação jurídica das páginas de privacidade, termos e cookies.

## Próximos passos de código (depois dos itens acima)

1. **B2:** trocar `src/mvp-data` por consultas Prisma (ISR, erro em falha) e criar o seed inicial.
2. **B3:** login do admin (sessão em cookie assinado, hash de senha, limite de tentativas, middleware).
3. **B4:** CRUD de imóveis com upload para o R2.
4. Demais fases em [ROADMAP.md](../ROADMAP.md).

## Como testar localmente quando houver Postgres

```bash
cp .env.example .env.local        # preencher DATABASE_URL
npm run db:migrate                # aplica as migrations
npm run dev
```

Com Docker instalado, para testar a imagem:

```bash
docker build -t valecred-imobiliaria .
docker run --rm -p 3000:3000 -e DATABASE_URL=... valecred-imobiliaria
```
