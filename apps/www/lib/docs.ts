export type DocHeading = {
  id: string;
  title: string;
  level: 2 | 3;
};

export function slugifyHeading(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function stripInlineMarkdown(value: string): string {
  return value
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/__([^_]+)__/g, "$1")
    .replace(/_([^_]+)_/g, "$1")
    .replace(/<[^>]*>/g, "")
    .trim();
}

export function extractHeadingsFromRawMdx(rawMdx: string): DocHeading[] {
  const lines = rawMdx.split("\n");
  const headings: DocHeading[] = [];
  let isInCodeFence = false;

  for (const line of lines) {
    const fence = line.trimStart().startsWith("```");
    if (fence) {
      isInCodeFence = !isInCodeFence;
      continue;
    }

    if (isInCodeFence) {
      continue;
    }

    const match = /^(##|###)\s+(.+?)\s*#*$/.exec(line.trim());
    if (!match) {
      continue;
    }

    const level = match[1] === "##" ? 2 : 3;
    const title = stripInlineMarkdown(match[2]);
    if (!title) {
      continue;
    }

    headings.push({
      id: slugifyHeading(title),
      title,
      level,
    });
  }

  return headings;
}
