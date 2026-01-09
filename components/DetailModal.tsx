
import React from 'react';
import { X, Play, Plus, ThumbsUp, Volume2, Share2 } from 'lucide-react';
import { Video } from '../types';

interface DetailModalProps {
  video: Video | null;
  onClose: () => void;
  onPlay: (video: Video) => void;
}

const DetailModal: React.FC<DetailModalProps> = ({ video, onClose, onPlay }) => {
  if (!video) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl bg-jinga-black rounded-xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 bg-black/60 p-2 rounded-full hover:bg-black transition text-white"
        >
          <X size={24} />
        </button>

        <div className="relative aspect-video w-full">
          <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-jinga-black via-transparent to-transparent"></div>
          
          <div className="absolute bottom-8 left-8 right-8">
            <h1 className="text-3xl md:text-5xl font-heading font-extrabold mb-4 text-white drop-shadow-lg">
              {video.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <button 
                onClick={() => onPlay(video)}
                className="flex items-center gap-2 bg-jinga-yellow text-black px-8 py-3 rounded font-bold hover:bg-white transition"
              >
                <Play fill="currentColor" size={20} /> Assistir Agora
              </button>
              <button className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-zinc-500 text-white hover:border-white transition">
                <Plus size={24} />
              </button>
              <button className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-zinc-500 text-white hover:border-white transition">
                <ThumbsUp size={24} />
              </button>
              <button className="ml-auto flex items-center justify-center w-12 h-12 rounded-full border-2 border-zinc-500 text-white hover:border-white transition">
                <Volume2 size={24} />
              </button>
            </div>
          </div>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 text-sm mb-4">
              <span className="text-green-500 font-bold">98% Relevante</span>
              <span className="text-zinc-400">{video.year}</span>
              <span className="border border-zinc-600 px-1.5 rounded text-xs">{video.rating}</span>
              <span className="text-zinc-400">{video.duration}</span>
              <span className="bg-zinc-800 px-2 rounded text-[10px] text-white font-bold uppercase">4K ULTRA HD</span>
            </div>
            <p className="text-zinc-300 text-lg leading-relaxed mb-6">
              {video.description}
            </p>
          </div>
          
          <div className="space-y-4">
            <div>
              <span className="text-zinc-500 text-sm">Elenco:</span>
              <p className="text-zinc-300 text-sm">{video.cast.join(', ')}</p>
            </div>
            <div>
              <span className="text-zinc-500 text-sm">Categorias:</span>
              <p className="text-zinc-300 text-sm">{video.category}, {video.tags.join(', ')}</p>
            </div>
            <div className="pt-4">
              <button className="flex items-center gap-2 text-zinc-400 hover:text-white transition text-sm">
                <Share2 size={18} /> Partilhar Conteúdo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
