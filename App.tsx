
import React, { useState, useEffect } from 'react';
import { Search, Bell, User as UserIcon, LogOut, Menu, Play, Info, Sparkles, Loader2 } from 'lucide-react';
import { Video, SectionType } from './types';
import { MOCK_VIDEOS } from './constants';
import VideoCarousel from './components/VideoCarousel';
import DetailModal from './components/DetailModal';
import Player from './components/Player';
import Auth from './components/Auth';
import { getSmartRecommendations } from './geminiService';
import { supabase } from './supabase';

const App: React.FC = () => {
  const [session, setSession] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [playingVideo, setPlayingVideo] = useState<Video | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [smartRecs, setSmartRecs] = useState<any[]>([]);
  const [loadingRecs, setLoadingRecs] = useState(false);

  useEffect(() => {
    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setAuthLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSmartSuggest = async () => {
    setLoadingRecs(true);
    const recs = await getSmartRecommendations("African urban lifestyle, modern rhythms, and historical greatness");
    setSmartRecs(recs);
    setLoadingRecs(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-jinga-black flex items-center justify-center">
        <Loader2 className="text-jinga-yellow animate-spin" size={48} />
      </div>
    );
  }

  if (!session) {
    return <Auth onSuccess={() => {}} />;
  }

  const trendingVideos = MOCK_VIDEOS.slice(0, 4);
  const africanVideos = MOCK_VIDEOS.filter(v => v.isAfrican);
  const newReleases = MOCK_VIDEOS.filter(v => v.year === '2024');

  if (playingVideo) {
    return <Player video={playingVideo} onBack={() => setPlayingVideo(null)} />;
  }

  return (
    <div className="min-h-screen bg-jinga-black selection:bg-jinga-yellow selection:text-black">
      {/* Navbar */}
      <nav className={`fixed top-0 inset-x-0 z-[100] px-4 md:px-12 py-4 flex items-center justify-between transition-all duration-500 ${isScrolled ? 'bg-jinga-black shadow-xl' : 'bg-transparent'}`}>
        <div className="flex items-center gap-8">
          <div className="text-3xl font-heading font-black tracking-tighter flex items-center gap-1">
            <span className="text-jinga-yellow">JINGA</span>
            <span className="text-jinga-red">MOVE</span>
          </div>
          
          <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-zinc-300">
            <button className="hover:text-white transition">Início</button>
            <button className="hover:text-white transition">Séries</button>
            <button className="hover:text-white transition">Filmes</button>
            <button className="hover:text-white transition">Bombando</button>
            <button className="hover:text-white transition">Minha Jinga</button>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
            <input 
              type="text" 
              placeholder="Títulos, atores..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-zinc-900/50 border border-zinc-700/50 rounded-full py-1.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-jinga-yellow w-48 lg:w-64 transition-all"
            />
          </div>
          <button className="text-white hover:text-jinga-yellow transition">
            <Bell size={22} />
          </button>
          <div className="group relative">
            <div className="w-8 h-8 rounded bg-jinga-red flex items-center justify-center text-white cursor-pointer hover:ring-2 ring-white transition overflow-hidden">
               {session.user.user_metadata?.avatar_url ? (
                 <img src={session.user.user_metadata.avatar_url} className="w-full h-full object-cover" />
               ) : (
                 <UserIcon size={18} />
               )}
            </div>
            
            {/* Dropdown Logout */}
            <div className="absolute right-0 top-full mt-2 w-48 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all py-2 z-[110]">
              <div className="px-4 py-2 border-b border-zinc-800 mb-2">
                <p className="text-xs text-zinc-500 font-bold uppercase truncate">{session.user.email}</p>
              </div>
              <button 
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left text-sm text-zinc-300 hover:bg-zinc-800 hover:text-jinga-red flex items-center gap-2 transition"
              >
                <LogOut size={16} /> Sair da conta
              </button>
            </div>
          </div>
          <button className="md:hidden text-white">
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Hero Banner */}
      <section className="relative h-[85vh] w-full">
        <div className="absolute inset-0">
          <img 
            src={MOCK_VIDEOS[0].thumbnail} 
            alt="Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-jinga-black via-jinga-black/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-jinga-black via-transparent to-transparent"></div>
        </div>

        <div className="relative h-full flex flex-col justify-center px-4 md:px-12 max-w-2xl pt-20">
          <div className="flex items-center gap-2 text-jinga-yellow font-bold text-sm mb-4 uppercase tracking-widest">
            <span className="w-8 h-1 bg-jinga-yellow rounded"></span>
            Destaque Jinga
          </div>
          <h1 className="text-5xl md:text-7xl font-heading font-extrabold text-white mb-6 leading-tight drop-shadow-2xl">
            {MOCK_VIDEOS[0].title}
          </h1>
          <p className="text-lg md:text-xl text-zinc-300 mb-10 leading-relaxed max-w-xl">
            {MOCK_VIDEOS[0].description}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <button 
              onClick={() => setPlayingVideo(MOCK_VIDEOS[0])}
              className="bg-white text-black px-8 py-3.5 rounded font-bold flex items-center gap-2 hover:bg-jinga-yellow hover:text-black transition transform active:scale-95"
            >
              <Play fill="currentColor" size={24} /> Assistir Agora
            </button>
            <button 
              onClick={() => setSelectedVideo(MOCK_VIDEOS[0])}
              className="bg-zinc-700/60 backdrop-blur-md text-white px-8 py-3.5 rounded font-bold flex items-center gap-2 hover:bg-zinc-600 transition transform active:scale-95"
            >
              <Info size={24} /> Mais Informações
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <main className="relative -mt-32 pb-20 space-y-12">
        <VideoCarousel 
          title={SectionType.TRENDING} 
          videos={trendingVideos} 
          onVideoClick={setSelectedVideo} 
        />
        
        {/* AI Smart Feature section */}
        <div className="mx-4 md:mx-12 py-10 px-8 bg-gradient-to-br from-zinc-900 to-black rounded-2xl border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center md:text-left">
            <h3 className="text-2xl font-heading font-bold text-white mb-2 flex items-center justify-center md:justify-start gap-2">
              <Sparkles className="text-jinga-yellow" /> Sugestões Inteligentes Jinga AI
            </h3>
            <p className="text-zinc-400">
              Descubra novos ritmos e histórias africanas baseadas na sua essência cultural. Deixe nossa IA guiar seu próximo movimento.
            </p>
          </div>
          <button 
            onClick={handleSmartSuggest}
            disabled={loadingRecs}
            className="whitespace-nowrap bg-jinga-red hover:bg-jinga-red/80 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-jinga-red/20 transition-all flex items-center gap-3 disabled:opacity-50"
          >
            {loadingRecs ? "Gerando Essência..." : "Explorar Novo Ritmo"}
          </button>
        </div>

        {/* Dynamic AI Results */}
        {smartRecs.length > 0 && (
          <div className="px-4 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-bottom duration-700">
            {smartRecs.map((rec, i) => (
              <div key={i} className="p-6 bg-zinc-800/40 border border-jinga-yellow/20 rounded-xl">
                <h4 className="text-jinga-yellow font-bold text-lg mb-2 uppercase tracking-tight">{rec.theme}</h4>
                <p className="text-zinc-300 text-sm mb-4">{rec.description}</p>
                <div className="text-[10px] text-zinc-500 font-bold uppercase py-1 px-2 bg-zinc-900 rounded inline-block">
                  Porque combina com JINGA: {rec.reason}
                </div>
              </div>
            ))}
          </div>
        )}

        <VideoCarousel 
          title={SectionType.AFRICAN_CONTENT} 
          videos={africanVideos} 
          onVideoClick={setSelectedVideo} 
        />
        <VideoCarousel 
          title={SectionType.NEW_RELEASES} 
          videos={newReleases} 
          onVideoClick={setSelectedVideo} 
        />
        <VideoCarousel 
          title={SectionType.MOVIES} 
          videos={MOCK_VIDEOS.slice(2, 6)} 
          onVideoClick={setSelectedVideo} 
        />
      </main>

      {/* Footer */}
      <footer className="bg-black py-16 px-4 md:px-12 border-t border-zinc-900">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12 max-w-6xl mx-auto">
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-widest">Sobre Jinga</h4>
            <ul className="text-zinc-500 text-sm space-y-2">
              <li className="hover:text-jinga-yellow cursor-pointer transition">Nossa História</li>
              <li className="hover:text-jinga-yellow cursor-pointer transition">Cultura Africana</li>
              <li className="hover:text-jinga-yellow cursor-pointer transition">Carreiras</li>
              <li className="hover:text-jinga-yellow cursor-pointer transition">Imprensa</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-widest">Suporte</h4>
            <ul className="text-zinc-500 text-sm space-y-2">
              <li className="hover:text-jinga-yellow cursor-pointer transition">Central de Ajuda</li>
              <li className="hover:text-jinga-yellow cursor-pointer transition">Termos de Uso</li>
              <li className="hover:text-jinga-yellow cursor-pointer transition">Privacidade</li>
              <li className="hover:text-jinga-yellow cursor-pointer transition">Contactos</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-widest">Explorar</h4>
            <ul className="text-zinc-500 text-sm space-y-2">
              <li className="hover:text-jinga-yellow cursor-pointer transition">Filmes</li>
              <li className="hover:text-jinga-yellow cursor-pointer transition">Séries</li>
              <li className="hover:text-jinga-yellow cursor-pointer transition">Podcasts</li>
              <li className="hover:text-jinga-yellow cursor-pointer transition">Ao Vivo</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-widest">Social</h4>
            <ul className="text-zinc-500 text-sm space-y-2">
              <li className="hover:text-jinga-yellow cursor-pointer transition">Instagram</li>
              <li className="hover:text-jinga-yellow cursor-pointer transition">TikTok</li>
              <li className="hover:text-jinga-yellow cursor-pointer transition">YouTube</li>
              <li className="hover:text-jinga-yellow cursor-pointer transition">LinkedIn</li>
            </ul>
          </div>
        </div>
        <div className="text-center pt-8 border-t border-zinc-900/50 max-w-6xl mx-auto">
          <div className="text-2xl font-heading font-black tracking-tighter mb-4">
            <span className="text-jinga-yellow">JINGA</span>
            <span className="text-jinga-red">MOVE</span>
          </div>
          <p className="text-zinc-600 text-xs uppercase tracking-widest">
            © 2024 Jinga Move Entertainment. Todos os direitos reservados. Orgulhosamente Africano.
          </p>
        </div>
      </footer>

      {/* Modals */}
      {selectedVideo && (
        <DetailModal 
          video={selectedVideo} 
          onClose={() => setSelectedVideo(null)} 
          onPlay={(video) => {
            setSelectedVideo(null);
            setPlayingVideo(video);
          }}
        />
      )}
    </div>
  );
};

export default App;
