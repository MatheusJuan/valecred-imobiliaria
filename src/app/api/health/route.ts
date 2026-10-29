// Health check do Easypanel/uptime. Sem parametro: so confirma que o app responde (liveness).
// `?deep=1`: tambem testa o banco (usar so em monitoramento manual, nao no restart automatico).
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  if (new URL(req.url).searchParams.get("deep") === "1") {
    try {
      const { prisma } = await import("@/lib/prisma");
      await prisma.$queryRaw`SELECT 1`;
    } catch {
      return Response.json({ status: "error", db: "down" }, { status: 503 });
    }
    return Response.json({ status: "ok", db: "up" });
  }
  return Response.json({ status: "ok" });
}
