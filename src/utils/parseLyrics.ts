import { marked } from "marked";

export interface LyricEntry {
  title: string;
  link: string;
  lyrics: string;
}

export function parseLyrics(markdown: string): LyricEntry[] {
  // Remove frontmatter if present (typically enclosed between --- or +++ lines)
  const cleanMarkdown = markdown.replace(/^(---|\+\+\+)[\s\S]*?\1/m, "").trim();

  const tokens = marked.lexer(cleanMarkdown);
  const lyrics: LyricEntry[] = [];
  let currentEntry: Partial<LyricEntry> = {};

  tokens.forEach((token) => {
    if (token.type === "heading" && token.depth === 2) {
      if (currentEntry.title) {
        lyrics.push(currentEntry as LyricEntry);
        currentEntry = {};
      }

      const linkToken = token.tokens[0] as marked.Tokens.Link;
      currentEntry.title = linkToken.text;
      currentEntry.link = linkToken.href;
      currentEntry.lyrics = "";
    } else if (token.type === "paragraph" && currentEntry.title) {
      currentEntry.lyrics += (currentEntry.lyrics ? "\n" : "") + token.text;
    }
  });

  if (currentEntry.title) {
    lyrics.push(currentEntry as LyricEntry);
  }

  return lyrics;
}
