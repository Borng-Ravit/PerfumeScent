import { useState, useEffect } from "react";
import { Home, Grid, Heart, Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { PageView, TELEGRAM_URL } from "./components/data";
import { Navbar } from "./components/Navbar";
import { HomePage } from "./components/HomePage";
import { ProductGrid } from "./components/ProductGrid";
import { ProductDetail } from "./components/ProductDetail";
import { Footer } from "./components/Footer";

export default function App() {
  const [page, setPage] = useState<PageView>('home');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [pendingSearch, setPendingSearch] = useState('');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    document.body.style.background = darkMode ? '#12110F' : '#FAF9F7';
  }, [darkMode]);

  const handleNavigate = (p: PageView) => {
    setPage(p);
    if (p !== 'detail') setSelectedId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewDetail = (id: number) => {
    setSelectedId(id);
    setPage('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const handleSearchSubmit = () => {
    setSearchQuery(pendingSearch);
    handleNavigate('listing');
  };

  const bg = darkMode ? '#12110F' : '#FAF9F7';
  const border = darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  const textPrimary = darkMode ? '#FAF9F7' : '#1C1B19';

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: bg,
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {/* Top Navbar */}
      <Navbar
        currentPage={page}
        onNavigate={handleNavigate}
        darkMode={darkMode}
        onToggleDark={() => setDarkMode((v) => !v)}
        searchQuery={pendingSearch}
        onSearch={setPendingSearch}
        onSearchSubmit={handleSearchSubmit}
      />

      {/* Main Content */}
      <main className="flex-1 pb-16 md:pb-0">
        <AnimatePresence mode="wait">
          {page === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <HomePage
                darkMode={darkMode}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                onViewDetail={handleViewDetail}
                onNavigate={handleNavigate}
              />
              <Footer darkMode={darkMode} onNavigate={handleNavigate} />
            </motion.div>
          )}

          {page === 'listing' && (
            <motion.div
              key="listing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <ProductGrid
                darkMode={darkMode}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                onViewDetail={handleViewDetail}
                initialSearch={searchQuery}
              />
              <Footer darkMode={darkMode} onNavigate={handleNavigate} />
            </motion.div>
          )}

          {page === 'detail' && selectedId !== null && (
            <motion.div
              key={`detail-${selectedId}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <ProductDetail
                perfumeId={selectedId}
                darkMode={darkMode}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                onViewDetail={handleViewDetail}
                onBack={() => handleNavigate('listing')}
              />
              <Footer darkMode={darkMode} onNavigate={handleNavigate} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating Telegram Button (Desktop) */}
      <motion.a
        href={TELEGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="fixed bottom-6 right-6 z-40 hidden md:flex items-center justify-center w-14 h-14 rounded-full"
        style={{
          background: 'linear-gradient(135deg, #229ED9 0%, #1A86BA 100%)',
          boxShadow: '0 6px 24px rgba(34,158,217,0.45)',
        }}
        title="Order via Telegram"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.01 9.474c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.17 14.6 4.197 13.7c-.645-.203-.658-.645.136-.953l10.878-4.194c.537-.194 1.006.131.351.695z" />
        </svg>
      </motion.a>

      {/* Mobile Bottom Navigation */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-40 md:hidden border-t"
        style={{
          background: darkMode ? 'rgba(18,17,15,0.96)' : 'rgba(250,249,247,0.96)',
          backdropFilter: 'blur(20px)',
          borderColor: border,
        }}
      >
        <div className="grid grid-cols-5 h-16">
          {[
            { icon: Home, label: 'Home', action: () => handleNavigate('home'), active: page === 'home' },
            { icon: Grid, label: 'Shop', action: () => handleNavigate('listing'), active: page === 'listing' },
            {
              icon: null,
              label: 'Telegram',
              action: () => window.open(TELEGRAM_URL, '_blank'),
              active: false,
              isCTA: true,
            },
            {
              icon: Heart,
              label: `Saved${favorites.length > 0 ? ` (${favorites.length})` : ''}`,
              action: () => handleNavigate('listing'),
              active: false,
            },
            {
              icon: darkMode ? Sun : Moon,
              label: darkMode ? 'Light' : 'Dark',
              action: () => setDarkMode((v) => !v),
              active: false,
            },
          ].map((item, i) =>
            item.isCTA ? (
              <button
                key={i}
                onClick={item.action}
                className="flex items-center justify-center"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center -mt-4"
                  style={{
                    background: 'linear-gradient(135deg, #229ED9 0%, #1A86BA 100%)',
                    boxShadow: '0 4px 16px rgba(34,158,217,0.5)',
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.01 9.474c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.17 14.6 4.197 13.7c-.645-.203-.658-.645.136-.953l10.878-4.194c.537-.194 1.006.131.351.695z" />
                  </svg>
                </div>
              </button>
            ) : (
              <button
                key={i}
                onClick={item.action}
                className="flex flex-col items-center justify-center gap-1 transition-opacity"
              >
                {item.icon && (
                  <item.icon
                    size={19}
                    style={{
                      color: item.active ? '#C4A76B' : darkMode ? 'rgba(250,249,247,0.5)' : 'rgba(28,27,25,0.5)',
                      fill: item.active && item.icon === Heart ? '#C4A76B' : 'none',
                    }}
                  />
                )}
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '9px',
                    letterSpacing: '0.04em',
                    color: item.active ? '#C4A76B' : darkMode ? 'rgba(250,249,247,0.4)' : 'rgba(28,27,25,0.4)',
                  }}
                >
                  {item.label}
                </span>
              </button>
            )
          )}
        </div>
      </nav>
    </div>
  );
}
