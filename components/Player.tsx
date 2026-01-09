
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, RotateCcw, RotateCw, Volume2, VolumeX, Maximize, ArrowLeft, Settings, Subtitles } from 'lucide-react';
import { Video } from '../types';

interface PlayerProps {
  video: Video;
  onBack: () => void;
}

const Player: React.FC<PlayerProps> = ({ video, onBack }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true);
      if (controlsTimeoutRef.current) window.clearTimeout(controlsTimeoutRef.current);
      controlsTimeoutRef.current = window.setTimeout(() => setShowControls(false), 3000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const p = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(p);
    }
  };

  const skip = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current?.parentElement?.requestFullscreen) {
      videoRef.current.parentElement.requestFullscreen();
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-[200] flex flex-col items-center justify-center overflow-hidden">
      <video
        ref={videoRef}
        src={video.videoUrl}
        autoPlay
        className="w-full h-full object-contain"
        onTimeUpdate={handleTimeUpdate}
        onClick={togglePlay}
      />

      {/* Back Button */}
      <button 
        onClick={onBack}
        className={`absolute top-8 left-8 z-[210] flex items-center gap-2 text-white hover:text-jinga-yellow transition-all duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
      >
        <ArrowLeft size={32} />
        <span className="text-xl font-heading font-bold">Voltar</span>
      </button>

      {/* Center Title */}
      <div className={`absolute top-8 text-center transition-all duration-300 ${showControls ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
        <h2 className="text-xl md:text-2xl font-heading font-bold text-white uppercase tracking-widest">{video.title}</h2>
      </div>

      {/* Controls */}
      <div className={`absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/90 to-transparent transition-all duration-300 ${showControls ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-zinc-700 rounded-full mb-8 cursor-pointer group relative">
          <div 
            className="h-full bg-jinga-red rounded-full transition-all duration-100" 
            style={{ width: `${progress}%` }}
          ></div>
          <div 
            className="absolute top-1/2 -translate-y-1/2 h-4 w-4 bg-jinga-red rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ left: `${progress}%` }}
          ></div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button onClick={() => skip(-10)} className="text-white hover:text-jinga-yellow transition">
              <RotateCcw size={28} />
            </button>
            <button onClick={togglePlay} className="text-white hover:scale-110 transition p-2 bg-white/10 rounded-full">
              {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" />}
            </button>
            <button onClick={() => skip(10)} className="text-white hover:text-jinga-yellow transition">
              <RotateCw size={28} />
            </button>
            <div className="flex items-center gap-3 group ml-4">
              <button onClick={() => setIsMuted(!isMuted)} className="text-white hover:text-jinga-yellow transition">
                {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
              </button>
              <input 
                type="range" 
                min="0" max="1" step="0.1" 
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-0 group-hover:w-24 transition-all duration-300 h-1 accent-jinga-yellow"
              />
            </div>
            <span className="text-zinc-400 text-sm font-mono">{video.duration}</span>
          </div>

          <div className="flex items-center gap-6">
            <button className="text-white hover:text-jinga-yellow transition">
              <Subtitles size={24} />
            </button>
            <button className="text-white hover:text-jinga-yellow transition">
              <Settings size={24} />
            </button>
            <button onClick={toggleFullscreen} className="text-white hover:text-jinga-yellow transition">
              <Maximize size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
