import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, CloudRain, Music2 } from 'lucide-react';
import type { AmbientSound } from '../types';

interface AmbientPlayerProps {
  sound: AmbientSound;
  onSoundChange: (s: AmbientSound) => void;
}

const SOURCES: Record<Exclude<AmbientSound, 'none'>, string> = {
  rain: 'https://cdn.pixabay.com/download/audio/2022/03/24/audio_c8c8a73467.mp3?filename=rain-and-thunder-nature-sounds-17811.mp3',
  lofi: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3',
};

export function AmbientPlayer({ sound, onSoundChange }: AmbientPlayerProps) {
  const [volume, setVolume] = useState(0.35);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (sound === 'none') {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      return;
    }

    const src = SOURCES[sound];
    if (!audioRef.current || audioRef.current.src !== src) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      const audio = new Audio(src);
      audio.loop = true;
      audio.volume = isMuted ? 0 : volume;
      audio.play().catch(() => {});
      audioRef.current = audio;
    } else {
      audioRef.current.volume = isMuted ? 0 : volume;
      if (audioRef.current.paused) {
        audioRef.current.play().catch(() => {});
      }
    }
  }, [sound]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleSound = (s: AmbientSound) => {
    onSoundChange(sound === s ? 'none' : s);
  };

  return (
    <div className="glass rounded-2xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-1.5">
          <Volume2 size={14} className="text-cyan-400" />
          Ambient
        </h3>
        <button
          onClick={() => setIsMuted((m) => !m)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 transition-smooth"
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      </div>

      <div className="flex gap-2 mb-3">
        <button
          onClick={() => toggleSound('lofi')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium transition-smooth ${
            sound === 'lofi'
              ? 'bg-violet-500/25 text-violet-300 border border-violet-500/40'
              : 'bg-slate-800/40 text-slate-400 hover:text-slate-200 border border-transparent'
          }`}
        >
          <Music2 size={14} />
          Lo-Fi
        </button>
        <button
          onClick={() => toggleSound('rain')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium transition-smooth ${
            sound === 'rain'
              ? 'bg-sky-500/25 text-sky-300 border border-sky-500/40'
              : 'bg-slate-800/40 text-slate-400 hover:text-slate-200 border border-transparent'
          }`}
        >
          <CloudRain size={14} />
          Yağmur
        </button>
      </div>

      {sound !== 'none' && (
        <div className="flex items-center gap-2">
          <VolumeX size={12} className="text-slate-500 shrink-0" />
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-full h-1 accent-cyan-400 cursor-pointer"
          />
          <Volume2 size={12} className="text-slate-500 shrink-0" />
        </div>
      )}

      {sound === 'none' && (
        <p className="text-[11px] text-slate-500 text-center">Ses seçerek arka plan müz iği aç</p>
      )}
    </div>
  );
}
