const PRODUCES = ["text/html", "text/markdown"];
type AcceptEntry = { type: string; q: number; specificity: number };

function parseAccept(header: string): AcceptEntry[] {
  return header.split(",").map((raw) => {
    const parts = raw.trim().split(";").map((part) => part.trim());
    const type = parts[0].toLowerCase();
    let q = 1;
    for (const parameter of parts.slice(1)) {
      const [name, value] = parameter.split("=").map((part) => part.trim());
      if (name.toLowerCase() === "q") {
        const parsed = Number(value);
        if (!Number.isNaN(parsed)) q = Math.max(0, Math.min(1, parsed));
      }
    }
    return { type, q, specificity: type === "*/*" ? 0 : type.endsWith("/*") ? 1 : 2 };
  });
}

function matches(entry: AcceptEntry, candidate: string): boolean {
  return entry.type === "*/*" || (entry.type.endsWith("/*") && candidate.startsWith(entry.type.slice(0, -1))) || entry.type === candidate;
}

export function preferredType(header: string | null): string | null {
  if (!header || header.trim() === "") return "text/html";
  const entries = parseAccept(header);
  let bestType: string | null = null;
  let bestQ = -1;
  let bestPosition = Infinity;
  for (const candidate of PRODUCES) {
    let matched: AcceptEntry | null = null;
    let matchedPosition = Infinity;
    for (let index = 0; index < entries.length; index += 1) {
      const entry = entries[index];
      if (!matches(entry, candidate)) continue;
      if (matched === null || entry.specificity > matched.specificity || (entry.specificity === matched.specificity && index < matchedPosition)) {
        matched = entry;
        matchedPosition = index;
      }
    }
    if (matched === null || matched.q <= 0) continue;
    if (matched.q > bestQ || (matched.q === bestQ && matchedPosition < bestPosition)) {
      bestType = candidate;
      bestQ = matched.q;
      bestPosition = matchedPosition;
    }
  }
  return bestType;
}

export function appendVaryAccept(headers: Headers): void {
  const existing = headers.get("Vary");
  if (!existing) { headers.set("Vary", "Accept"); return; }
  if (!existing.split(",").some((value) => value.trim().toLowerCase() === "accept")) headers.set("Vary", `${existing}, Accept`);
}
