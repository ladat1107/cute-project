import { useEffect, useState } from "react";
import sticker from "./assets/cute.gif";
import music from "./assets/music.mp3";

export default function App() {

  const [tab, setTab] = useState("home");

  const [noPos, setNoPos] = useState({ top: "auto", left: "auto" });
  const [isMoved, setIsMoved] = useState(false);

  useEffect(() => {
    if (tab !== "home") {
      const audio = new Audio(music);
      audio.play();
      audio.loop = true;
      return () => {
        audio.pause();
      };
    }

  }, [tab]);

  const randomPosition = () => {
    setIsMoved(true);
    const top = Math.floor(Math.random() * 90) + "%";
    const left = Math.floor(Math.random() * 90) + "%";
    setNoPos({ top, left });
  };

  if (tab !== "home") {
    return (
      <div className="bg-pink-200 w-[100vw] min-h-screen flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-4xl font-bold text-pink-700 mb-4">Tui biết mà 💖</h1>
        <img
          src="https://media.giphy.com/media/MDJ9IbxxvDUQM/giphy.gif"
          alt="cute"
          className="w-56 h-56 animate-fadeIn"
        />
      </div>
    )
  }

  return (
    <div className="bg-pink-200 w-screen h-screen relative overflow-hidden">
      {/* Ảnh */}
      <div
        className="absolute left-1/2 top-1/3 transform -translate-x-1/2 -translate-y-1/2"
      >
        <img src={sticker} alt="cute" className="w-32 h-32 sm:w-48 sm:h-48" />
      </div>

      {/* Text */}
      <h1 className="absolute left-1/2 top-1/2 transform -translate-x-1/2 text-2xl font-bold text-center">
        Bạn có thích tui hông?
      </h1>

      {/* Nút Có (cố định) */}
      <button
        onClick={() => setTab("love")}
        className="absolute left-1/2 bottom-1/3 transform -translate-x-[100%] px-6 py-2 bg-pink-500 text-white rounded-full text-lg shadow-md hover:scale-105 transition"
      >
        Thích lắm luôn!
      </button>

      {/* Nút Không (di chuyển riêng, không ảnh hưởng nút Có) */}
      <button
        style={{
          position: isMoved ? "absolute" : "absolute",
          top: isMoved ? noPos.top : "calc(100% - 40%)",
          left: isMoved ? noPos.left : "calc(50% + 100px)",
          transform: isMoved ? "translate(-50%, -50%)" : "translate(-50%, 0)",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={randomPosition}
        onClick={randomPosition}
        className="px-6 py-2 bg-gray-400 text-white rounded-full text-lg shadow-md"
      >
        Hông thích
      </button>
    </div>
  );
}
