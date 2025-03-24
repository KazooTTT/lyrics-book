import { Copy, ExternalLink } from "lucide-react";
import React, { useRef, useState } from "react";
import { useCopyToClipboard } from "usehooks-ts";

interface LyricsCardProps {
  title: string;
  link: string;
  lyrics: string;
}

export const LyricsCard: React.FC<LyricsCardProps> = ({
  title,
  link,
  lyrics,
}) => {
  const [copiedText, copy] = useCopyToClipboard();
  const [copyStatus, setCopyStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleCopy = (text: string) => {
    setCopyStatus("loading");
    copy(text)
      .then(() => {
        setCopyStatus("success");
        setTimeout(() => {
          setCopyStatus("idle");
        }, 1000);
      })
      .catch(() => {
        setCopyStatus("error");
        setTimeout(() => {
          setCopyStatus("idle");
        }, 2000);
      });
  };

  const ref = useRef<HTMLDivElement>(null);
  const handleSaveAsImage = () => {
    if (ref.current) {
      domtoimage
        .toPng(ref.current)
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = `${title}.png`;
          link.href = dataUrl;
          link.click();
        })
        .catch((error) => {
          console.error("Error saving as image:", error);
        });
    }
  };
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6 hover:shadow-xl transition-shadow flex flex-col">
      <div className="flex flex-col flex-1 " ref={ref}>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
        <div className="whitespace-pre-line text-gray-700 leading-relaxed mb-6 flex-1">
          {lyrics}
        </div>
      </div>
      <div className="flex gap-3 pt-4 border-t border-gray-100 flex-shrink-0">
        {link && (
          <button
            onClick={() => window.open(link, "_blank")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>去听歌</span>
          </button>
        )}
        <button
          onClick={() => {
            handleCopy(lyrics);
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <Copy className="w-4 h-4" />
          {copyStatus === "idle"
            ? "复制"
            : copyStatus === "loading"
            ? "复制中..."
            : copyStatus === "success"
            ? "复制成功"
            : "复制失败"}
        </button>
      </div>
    </div>
  );
};
