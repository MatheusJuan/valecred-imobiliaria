# Apresentação do MVP ao cliente (A9)

ValeCred Empreendimentos Imobiliários. Este documento tem duas partes: o **roteiro de demonstração** (para quem apresenta) e o **checklist de aprovação** (para o cliente preencher). Veja também [revisao-mvp.md](revisao-mvp.md) e o [ROADMAP.md](../ROADMAP.md).

---

## Parte 1: Roteiro de demonstração (30 a 40 min)

### Antes de começar

- Rodar `npm run dev` e abrir `http://localhost:3000` (ou usar a prévia do app). Testar a conexão antes.
- Abrir duas abas: o site (`/`) e o painel (`/admin`). Deixar o navegador em tela cheia.
- Para mostrar o celular: ferramentas do navegador (F12), modo dispositivo, 375 px.
- Combinar com o cliente o que é MVP: **só o visual**. Fotos, contatos e textos são de exemplo; formulários e painel não gravam nada.

### Parte A: Site público (20 min)

| # | Onde | O que mostrar | O que perguntar |
|---|---|---|---|
| 1 | `/` topo | Identidade: logo, cores verde e amarelo, hero com cantos arredondados e busca (abas Comprar/Alugar/Lançamento, "Mais opções"). | A frase "Que tal encontrar o seu lugar?" combina com a marca? |
| 2 | `/` rolando | Destaques, lançamentos (foto + cartão), abas Venda/Aluguel, imóveis por cidade, "Por que a ValeCred?", faixa "Anuncie", blog, contato. | Alguma seção sobra ou falta? A ordem faz sentido? |
| 3 | Busca da home | Escolher Comprar + tipo Casa + cidade Tatuí e buscar. | As cidades e os tipos estão certos? |
| 4 | `/imoveis` | Filtros avançados, barra de tipos com contagem, ordenação, paginação. Mostrar uma busca sem resultado. | Falta algum filtro (ex.: condomínio, andar)? |
| 5 | `/imovel/1` | Galeria em tela cheia, especificações com ícones, características, mapa, **plantas**, vídeo, cartão do corretor, **Agendar visita**, imóveis similares. | Querem um corretor só ou vários? Plantas e vídeo serão usados? |
| 6 | `/imovel/4` (lançamento) | Preço "A Consultar" e plantas por tipo de apartamento. | Como querem apresentar os empreendimentos? Páginas próprias? |
| 7 | `/anuncie` | Passo a passo e formulário do proprietário (com envio de fotos). | Os campos do formulário estão completos? |
| 8 | `/blog`, `/sobre`, `/contato` | Blog com artigo, página Sobre, contato com mapa. | Textos de Sobre e "Por que a ValeCred?" estão corretos? |
| 9 | Celular (375 px) | Home, listagem e detalhe no modo celular; botão flutuante de WhatsApp. | Boa parte dos acessos costuma vir do celular: algo a priorizar? |

### Parte B: Painel administrativo (10 min)

Abrir `/login` e clicar em Entrar (no MVP não há senha).

| # | Onde | O que mostrar |
|---|---|---|
| 1 | `/admin` | Dashboard: números, leads, solicitações e imóveis recentes. |
| 2 | Imóveis | Lista com busca e filtros; **Novo imóvel** (5 seções, preço "A Consultar", destaque/privado, botão "Gerar descrição com IA", fotos com reordenação). |
| 3 | Solicitações | Aprovar e rejeitar pedidos de "Anuncie". Explicar que, na versão final, aprovar cria o imóvel já preenchido. |
| 4 | Leads | Mudar status (Novo, Contatado, Convertido, Arquivado) e chamar no WhatsApp. |
| 5 | Banners Home e Configurações | Ligar/desligar banners e seções; contato, SEO e códigos de analytics editáveis sem programador. |
| 6 | **QR Code** | Gerar o QR do site e de um imóvel, baixar o PNG. Mostrar o QR na tela e ler com o celular (o QR aponta para `localhost`, então o celular só abre o site se estiver na mesma rede e `SITE_URL` for o IP do computador; senão, basta mostrar que ele lê e exibe o endereço). Explicar o PDF para impressão (versão final). |

### Fechamento (5 min)

- Mostrar o que **não** está pronto (lista abaixo) e o que vem na versão final.
- Entregar o checklist da Parte 2 e combinar um prazo de retorno.

### O que NÃO está no MVP (dizer com clareza)

- Fotos reais, contatos oficiais, textos finais e dados legais (CRECI, CNPJ): hoje são exemplos.
- Formulários que enviam de verdade, avisos por e-mail/WhatsApp, banco de dados e login real.
- Banner de cookies, Google Analytics, SEO completo (sitemap, dados estruturados) e domínio.
- PDF do QR Code, favoritos, simulador de financiamento e comparar imóveis (backlog).

### Se algo der errado na demo

- Se uma página travar em "Carregando": recarregar (F5). Se persistir, parar o servidor, apagar a pasta `.next` e rodar `npm run dev` de novo.
- Se o mapa não abrir: faltou internet (usa o Google Maps embutido). Continuar a demo sem ele.
- Ter à mão capturas de tela das telas principais como plano B.

---

## Parte 2: Checklist de aprovação do cliente

Marque **OK** ou **Ajustar** em cada linha e escreva o pedido na coluna de observações.

### 1. Identidade

| Item | OK | Ajustar | Observações |
|---|:-:|:-:|---|
| Cores (verde escuro e amarelo da marca) | ☐ | ☐ | |
| Logo no cabeçalho e rodapé (versões colorida e branca) | ☐ | ☐ | |
| Tipografia (Inter) e estilo geral | ☐ | ☐ | |
| Tom de voz dos textos ("Que tal encontrar o seu lugar?", #vempravale) | ☐ | ☐ | |

### 2. Site público

| Item | OK | Ajustar | Observações |
|---|:-:|:-:|---|
| Menu e botão "Anuncie seu imóvel" | ☐ | ☐ | |
| Hero e busca da home | ☐ | ☐ | |
| Imóveis em destaque | ☐ | ☐ | |
| Lançamentos e empreendimentos | ☐ | ☐ | |
| Abas Venda e Aluguel | ☐ | ☐ | |
| Imóveis por cidade | ☐ | ☐ | |
| "Por que a ValeCred?" | ☐ | ☐ | |
| Faixa "Anuncie" e blog | ☐ | ☐ | |
| Listagem e filtros | ☐ | ☐ | |
| Página do imóvel (galeria, plantas, vídeo, corretor, agendar visita) | ☐ | ☐ | |
| Anuncie seu imóvel (formulário) | ☐ | ☐ | |
| Sobre, Contato e Blog | ☐ | ☐ | |
| Versão para celular | ☐ | ☐ | |
| Botão flutuante de WhatsApp | ☐ | ☐ | |

### 3. Painel administrativo

| Item | OK | Ajustar | Observações |
|---|:-:|:-:|---|
| Dashboard | ☐ | ☐ | |
| Cadastro e edição de imóveis | ☐ | ☐ | |
| Solicitações de anúncio | ☐ | ☐ | |
| Leads e status | ☐ | ☐ | |
| Banners e seções da home | ☐ | ☐ | |
| Configurações (contato, SEO, analytics) | ☐ | ☐ | |
| QR Code (site e imóvel, PNG) | ☐ | ☐ | |

### 4. Escopo: o que entra, sai ou muda

| Item | Entra | Sai | Depois | Observações |
|---|:-:|:-:|:-:|---|
| Plantas e vídeo no imóvel | ☐ | ☐ | ☐ | |
| Cartão do corretor / vários corretores | ☐ | ☐ | ☐ | |
| Agendar visita | ☐ | ☐ | ☐ | |
| Páginas próprias para empreendimentos | ☐ | ☐ | ☐ | |
| Favoritos | ☐ | ☐ | ☐ | |
| Simulador de financiamento | ☐ | ☐ | ☐ | |
| Comparar imóveis | ☐ | ☐ | ☐ | |
| Alternar grade/lista na listagem | ☐ | ☐ | ☐ | |
| PDF do QR Code (layout: só QR e código, ou com logo e telefone) | ☐ | ☐ | ☐ | |

### 5. O que o cliente precisa entregar

| Item | Responsável | Prazo |
|---|---|---|
| Fotos reais dos imóveis, dos empreendimentos e da equipe | | |
| Telefone, WhatsApp, e-mail e endereço oficiais da imobiliária | | |
| Domínio do site (ex.: nome desejado) e e-mail de captação de leads | | |
| CRECI, razão social e CNPJ para o rodapé | | |
| Textos finais: Sobre, diferenciais, blog | | |
| Lista inicial de imóveis (dados e fotos) | | |
| Logo em SVG e fontes da marca, se houver manual | | |
| Cidades e bairros atendidos | | |
| Validação dos textos legais (privacidade, termos, cookies) | | |

### 6. Aprovação

- ☐ **MVP aprovado**, sem ajustes.
- ☐ **MVP aprovado com os ajustes** listados acima.
- ☐ **Nova rodada de revisão** necessária.

Responsável pelo cliente: ______________________  Data: ____/____/______

---

## Próximos passos após a aprovação

Segue o [ROADMAP.md](../ROADMAP.md), fase B: base técnica e banco de dados, login do admin, cadastro de imóveis com fotos, leads com aviso por e-mail, conteúdo editável, QR Code final com PDF, SEO, LGPD e cookies, segurança, infraestrutura de produção, cadastro dos imóveis reais, aprovação final e lançamento.
