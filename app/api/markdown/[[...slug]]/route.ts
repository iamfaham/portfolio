import { markdownPages, notFoundMarkdown } from "@/lib/agent-content";

export const dynamic = "force-dynamic";

export function GET(_request: Request, { params }: { params: { slug?: string[] } }) {
  const pathname = `/${params.slug?.join("/") ?? ""}`.replace(/\/$/, "") || "/";
  const body = markdownPages[pathname];
  return new Response(body ?? notFoundMarkdown, { status: body ? 200 : 404, headers: { "Content-Type": "text/markdown; charset=utf-8", Vary: "Accept, Accept-Encoding", "Cache-Control": "public, s-maxage=300, stale-while-revalidate=86400" } });
}
