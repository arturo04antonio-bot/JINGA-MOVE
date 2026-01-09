
import React from 'react';
import { Video } from '../types';
import { Play, Plus, Info } from 'lucide-react';

interface VideoCardProps {
  video: Video;
  onClick: (video: Video) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onClick }) => {
  return (
    <div 
      className="relative flex-none w-64 md:w-72 aspect-video rounded-lg overflow-hidden group cursor-pointer transition-all duration-300 video-card-hover bg-zinc-900"
      onClick={() => onClick(video)}
    >
      <img 
        src={video.thumbnail} 
        alt={video.title} 
        className="w-full h-full object-cover group-hover:opacity-40 transition-opacity"
      />
      
      <div className="absolute inset-0 p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black via-black/40 to-transparent">
        <h3 className="text-white font-bold text-lg mb-1 truncate">{video.title}</h3>
        <div className="flex items-center gap-2 text-xs text-zinc-300 mb-3">
          <span className="text-jinga-yellow font-bold">{video.rating}</span>
          <span>•</span>
          <span>{video.duration}</span>
          <span>•</span>
          <span className="border border-zinc-500 px-1 rounded text-[10px] uppercase">{video.category}</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="bg-white text-black p-2 rounded-full hover:bg-zinc-200 transition">
            <Play size={16} fill="currentColor" />
          </button>
          <button className="bg-zinc-700/80 text-white p-2 rounded-full hover:bg-zinc-600 transition">
            <Plus size={16} />
          </button>
          <button className="ml-auto bg-zinc-700/80 text-white p-2 rounded-full hover:bg-zinc-600 transition">
            <Info size={16} />
          </button>
        </div>
      </div>
      
      {video.isAfrican && (
        <div className="absolute top-2 right-2 bg-jinga-red text-white text-[10px] font-bold px-2 py-0.5 rounded">
          ÁFRICA
        </div>
      )}
    </div>
  );
};

export default VideoCard;
