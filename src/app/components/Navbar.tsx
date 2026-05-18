import { useState, useRef, useEffect } from "react";
import { Search, Menu, X, Sun, Moon, Send } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { TELEGRAM_URL, PageView } from "./data";

interface NavbarProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  darkMode: boolean;
  onToggleDark: () => void;
  searchQuery: string;
  onSearch: (q: string) => void;
  onSearchSubmit: () => void;
}

export function Navbar({
  currentPage,
  onNavigate,
  darkMode,
  onToggleDark,
  searchQuery,
  onSearch,
  onSearchSubmit,
}: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  const navLinks = [
    { label: 'Home', page: 'home' as PageView },
    { label: 'Perfumes', page: 'listing' as PageView },
    { label: 'Best Sellers', page: 'listing' as PageView },
    { label: 'Contact', page: 'home' as PageView },
  ];

  const handleSearchKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearchSubmit();
      setSearchOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div
        className="border-b backdrop-blur-xl"
        style={{
          background: darkMode
            ? 'rgba(18, 17, 15, 0.92)'
            : 'rgba(250, 249, 247, 0.92)',
          borderColor: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Logo */}
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 group"
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #C4A76B 0%, #8B6914 100%)' }}
              >
                <span className="text-white text-xs" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 600 }}>
                  S
                </span>
              </div>
              <div className="flex flex-col leading-none">
                <span
                  className="tracking-[0.15em] uppercase"
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontWeight: 600,
                    fontSize: '15px',
                    color: darkMode ? '#FAF9F7' : '#1C1B19',
                  }}
                >
                  Scent
                </span>
                <span
                  className="tracking-[0.3em] uppercase"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 300,
                    fontSize: '8px',
                    letterSpacing: '0.3em',
                    color: '#C4A76B',
                  }}
                >
                  Cambodia
                </span>
              </div>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => onNavigate(link.page)}
                  className="relative group py-1"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 400,
                    fontSize: '13px',
                    letterSpacing: '0.08em',
                    color:
                      currentPage === link.page
                        ? '#C4A76B'
                        : darkMode
                        ? 'rgba(250,249,247,0.7)'
                        : 'rgba(28,27,25,0.65)',
                    transition: 'color 0.2s',
                  }}
                >
                  {link.label}
                  <span
                    className="absolute bottom-0 left-0 h-px transition-all duration-300"
                    style={{
                      width: currentPage === link.page ? '100%' : '0%',
                      background: '#C4A76B',
                    }}
                  />
                </button>
              ))}
            </nav>

            {/* Right Controls */}
            <div className="flex items-center gap-2">
              {/* Search Expanded */}
              <AnimatePresence>
                {searchOpen && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 200, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <input
                      ref={searchRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => onSearch(e.target.value)}
                      onKeyDown={handleSearchKey}
                      placeholder="Search perfumes…"
                      className="w-full px-3 py-1.5 rounded-full outline-none text-sm"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        background: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                        color: darkMode ? '#FAF9F7' : '#1C1B19',
                        border: '1px solid',
                        borderColor: darkMode ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)',
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                onClick={() => {
                  setSearchOpen((v) => !v);
                  if (searchOpen && searchQuery) onSearchSubmit();
                }}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
                style={{
                  color: darkMode ? 'rgba(250,249,247,0.7)' : 'rgba(28,27,25,0.6)',
                  background: searchOpen
                    ? darkMode
                      ? 'rgba(255,255,255,0.1)'
                      : 'rgba(0,0,0,0.06)'
                    : 'transparent',
                }}
              >
                <Search size={17} />
              </button>

              <button
                onClick={onToggleDark}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hidden md:flex"
                style={{ color: darkMode ? 'rgba(250,249,247,0.7)' : 'rgba(28,27,25,0.6)' }}
              >
                {darkMode ? <Sun size={17} /> : <Moon size={17} />}
              </button>

              {/* Telegram CTA */}
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-full transition-all duration-200 hover:opacity-90 active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, #229ED9 0%, #1A86BA 100%)',
                  color: '#fff',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 500,
                  fontSize: '13px',
                  letterSpacing: '0.03em',
                  boxShadow: '0 2px 12px rgba(34,158,217,0.3)',
                }}
              >
                <Send size={13} />
                <span>Order via Telegram</span>
              </a>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="md:hidden w-9 h-9 rounded-full flex items-center justify-center"
                style={{ color: darkMode ? 'rgba(250,249,247,0.8)' : 'rgba(28,27,25,0.7)' }}
              >
                {menuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden md:hidden border-t"
              style={{ borderColor: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)' }}
            >
              <div className="px-4 py-4 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => {
                      onNavigate(link.page);
                      setMenuOpen(false);
                    }}
                    className="text-left px-3 py-2.5 rounded-lg transition-colors"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '14px',
                      color: darkMode ? 'rgba(250,249,247,0.85)' : 'rgba(28,27,25,0.8)',
                      background:
                        currentPage === link.page
                          ? darkMode
                            ? 'rgba(196,167,107,0.12)'
                            : 'rgba(196,167,107,0.1)'
                          : 'transparent',
                    }}
                  >
                    {link.label}
                  </button>
                ))}
                <div className="pt-2 border-t mt-1" style={{ borderColor: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)' }}>
                  <div className="flex items-center justify-between">
                    <a
                      href={TELEGRAM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 rounded-full"
                      style={{
                        background: 'linear-gradient(135deg, #229ED9 0%, #1A86BA 100%)',
                        color: '#fff',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '13px',
                        fontWeight: 500,
                      }}
                    >
                      <Send size={13} />
                      Order via Telegram
                    </a>
                    <button
                      onClick={onToggleDark}
                      className="w-9 h-9 rounded-full flex items-center justify-center"
                      style={{ color: darkMode ? 'rgba(250,249,247,0.7)' : 'rgba(28,27,25,0.6)' }}
                    >
                      {darkMode ? <Sun size={17} /> : <Moon size={17} />}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
