import { Github, Music4 } from "lucide-react";
import { useEffect, useState } from "react";
import { LyricsCard } from "./components/LyricsCard";
import lyricsText from "./data/lyrics.md?raw";
import { LyricEntry, parseLyrics } from "./utils/parseLyrics";

function App() {
  const [lyrics, setLyrics] = useState<LyricEntry[]>([]);

  useEffect(() => {
    const parsedLyrics = parseLyrics(lyricsText);
    setLyrics(parsedLyrics);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8 pb-24">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Music4 className="w-10 h-10 text-purple-600" />
            <h1 className="text-4xl font-bold text-gray-800">歌词本</h1>
          </div>
          <p className="text-gray-600">
            <a
              className="hover:underline underline-offset-4"
              href="https://github.com/kazoottt"
              target="_blank"
              rel="noopener noreferrer"
            >
              KazooTTT
            </a>
            的歌词本
          </p>
        </header>

        <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lyrics.map((entry, index) => (
            <LyricsCard
              key={[entry.title, index].join("-")}
              title={entry.title}
              link={entry.link}
              lyrics={entry.lyrics}
            />
          ))}
        </div>
      </div>
      <footer className="fixed bottom-0 left-0 right-0 text-center py-4 bg-opacity-90 shadow-md w-full z-10">
        <a
          href="https://github.com/kazoottt/lyrics-book"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1 hover:text-purple-600 transition-colors"
        >
          <Github className="inline" />
          <span>LyricsBook</span>
        </a>
      </footer>
    </div>
  );
}

export default App;
