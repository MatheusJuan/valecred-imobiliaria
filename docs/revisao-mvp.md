# Revisão geral do MVP (A8)

Data da revisão: 2026-10-26. Base para a apresentação ao cliente (A9).

## Verificações feitas

- `npx tsc --noEmit`, `npm run lint` e `npm run build`: sem erros nem avisos (30 rotas).
- Estouro horizontal e imagens quebradas testados em **25 rotas × 3 larguras** (375, 768 e 1280 px): nenhuma pendência após as correções abaixo.
- Conferência visual em celular (home, listagem, detalhe), tablet e desktop (home, listagem, detalhe, contato, anuncie, painel e QR Code).

## Corrigido na revisão

- Painel (dashboard) estourava a largura no celular (375 px); corrigido.
- Listagem no celular mostrava filtros e a barra "Tipo de imóvel" antes dos imóveis; agora os resultados vêm primeiro.
- Detalhe do imóvel: bloco de preço ficava alinhado à direita no celular; agora à esquerda.
- Datas com um dia a menos (fuso); corrigido.
- Link de vídeo de exemplo trocado por bloco ilustrativo; plurais ("1 quarto") e "0 quartos" em comerciais.

## Para o cliente decidir ou entregar

1. **Fotos reais** de imóveis, empreendimentos, cidades, corretor e página Sobre (hoje: placeholders "Imagem ilustrativa").
2. **Contatos oficiais** (telefone, WhatsApp, e-mail, endereço, horário): hoje fictícios.
3. **Textos**: Sobre, "Por que a ValeCred?", valores, blog (exemplos) e páginas legais (rascunho, exigem revisão jurídica).
4. **Logo**: versão em SVG e versão branca para fundo verde (rodapé usa caixa branca); favicon em tamanho legível.
5. **Dados legais**: CRECI, razão social e CNPJ no rodapé.
6. **Cidades atendidas** e **empreendimentos reais** (e se terão página própria).
7. **Diferenciais e números de credibilidade** só se forem reais (omitidos no MVP).
8. **Layout do PDF do QR Code** (só QR + código, ou com logo e telefone).
9. Itens opcionais do backlog: favoritos, simulador de financiamento, comparar imóveis, grade/lista na listagem.

## Pendências técnicas (fase B)

- Formulários (contato, anúncio, agendar visita) não enviam nada: B5.
- Login real e proteção de `/admin` e da API de QR Code: B3. Dados fictícios saem na B2.
- SEO (metadata por rota, JSON-LD, sitemap, robots): B8. Banner de cookies e analytics: B9.
- Ordenação "maior/menor preço" mistura venda e aluguel quando não há filtro de finalidade; avaliar separar por finalidade.
- Painel: faltam telas de Sobre Nós, Serviços, SEO global e Suporte.
- Mapa usa embed do Google (precisa entrar na CSP); avaliar OpenStreetMap.
- `npm audit`: 2 alertas ligados ao Next 15.5.x; atualizar para o último 15.x na B10 (não forçar o Next 16 sem teste).
- PDF do QR Code e domínio definitivo (`SITE_URL`).
