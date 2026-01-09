
import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Video } from '../types';
import VideoCard from './VideoCard';

interface VideoCarouselProps {
  title: string;
  videos: Video[];
  onVideoClick: (video: Video) => void;
}

const VideoCarousel: React.FC<VideoCarouselProps> = ({ title, videos, onVideoClick }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="mb-8 relative group">
      <h2 className="text-xl font-heading font-bold text-white mb-4 px-4 md:px-12 flex items-center gap-2">
        {title}
        <span className="h-1 w-12 bg-jinga-red rounded"></span>
      </h2>
      
      <div className="relative">
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-0 bottom-0 z-40 bg-black/40 hover:bg-black/60 text-white px-2 opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex items-center"
        >
          <ChevronLeft size={40} />
        </button>

        <div 
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto no-scrollbar px-4 md:px-12 py-4"
        >
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} onClick={onVideoClick} />
          ))}
        </div>

        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-0 bottom-0 z-40 bg-black/40 hover:bg-black/60 text-white px-2 opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex items-center"
        >
          <ChevronRight size={40} />
        </button>
      </div>
    </div>
  );
};

export default VideoCarousel;
