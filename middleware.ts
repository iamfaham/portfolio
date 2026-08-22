import { NextRequest, NextResponse } from "next/server";
import { appendVaryAccept, preferredType } from "@/lib/content-negotiation";

export function middleware(request: NextRequest) {
  // Next.js uses RSC requests for client-side navigation. They are internal
  // representations, not agent content-negotiation requests.
  if (request.headers.get("rsc") === "1") return NextResponse.next();

  const selectedType = preferredType(request.headers.get("accept"));
  if (selectedType === "text/markdown") {
    const url = request.nextUrl.clone();
    url.pathname = `/api/markdown${request.nextUrl.pathname}`;
    const response = NextResponse.rewrite(url);
    appendVaryAccept(response.headers);
    return response;
  }
  if (selectedType === null) return new NextResponse("Not Acceptable\n\nAvailable: text/html, text/markdown\n", { status: 406, headers: { "Content-Type": "text/plain; charset=utf-8", Vary: "Accept" } });
  const response = NextResponse.next();
  appendVaryAccept(response.headers);
  return response;
}

export const config = { matcher: ["/((?!api/|_next/|_vercel/|.*\\..*).*)"] };
