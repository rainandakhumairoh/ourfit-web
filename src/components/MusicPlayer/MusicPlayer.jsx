import { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, ChevronDown, ChevronUp } from "lucide-react";

export default function MusicPlayer({ music }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  


    useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.volume = 0.3;

    audioRef.current
        .play()
        .then(() => setPlaying(true))
        .catch((err) => {
        console.log("Autoplay diblokir:", err);
        setPlaying(false);
        });

    return () => {
        if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        }
    };
    }, []);


    async function toggleMusic() {
    if (!audioRef.current) return;

    if (playing) {
        audioRef.current.pause();
        setPlaying(false);
    } else {
        try {
        await audioRef.current.play();
        setPlaying(true);
        } catch (err) {
        console.log(err);
        }
    }
    }

  return (
    <>
        <audio
        ref={audioRef}
        src={music}
        loop
        autoPlay
        preload="auto"
        />

        <div className="fixed bottom-6 right-6 z-50">

        {collapsed ? (
            <button
            onClick={() => setCollapsed(false)}
            className="w-14 h-14 rounded-full bg-white text-white shadow-xl flex items-center justify-center hover:scale-105 transition-all"
            >
            <div
                className={`text-xl ${playing ? "animate-spin" : ""}`}
                style={{ animationDuration: "4s" }}
            >
                🎵
            </div>
            </button>
        ) : (
            <div
            className="
                flex items-center gap-3
                px-5 py-3
                rounded-full
                bg-pink1
                text-white
                shadow-xl
                transition-all
            "
            >
            {/* Icon Musik */}
            <div
                className={`w-10 h-10 rounded-full bg-white flex items-center justify-center
                ${playing ? "animate-spin" : ""}`}
                style={{ animationDuration: "4s" }}
            >
                🎵
            </div>

            {/* Info */}
            <div className="text-left">
                <p className="text-xs opacity-80">
                Background Music
                </p>

                <p className="font-medium text-sm">
                {playing ? "Playing" : "Paused"}
                </p>
            </div>

            {/* Play Pause */}
            <button
                onClick={toggleMusic}
                className="hover:scale-110 transition"
            >
                {playing ? (
                <Pause size={20} />
                ) : (
                <Play size={20} />
                )}
            </button>

            {/* Volume */}
            <Volume2 size={18} />

            {/* Minimize */}
            <button
                onClick={() => setCollapsed(true)}
                className="ml-1 hover:scale-110 transition"
            >
                <ChevronDown size={18} />
            </button>
            </div>
        )}

        </div>
    </>
  );
}