import { motion } from "motion/react";
import { Send, ChevronDown, Sparkles } from "lucide-react";
import { TELEGRAM_URL, PageView } from "./data";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface HeroProps {
  onNavigate: (page: PageView) => void;
  darkMode: boolean;
}

export function Hero({ onNavigate, darkMode }: HeroProps) {
  const images = [
    'https://images.unsplash.com/photo-1612871178341-33f941a841e3?w=800&q=80',
    'https://images.unsplash.com/photo-1677735476292-0fc57ab097b2?w=800&q=80',
    'https://images.unsplash.com/photo-1598634222670-87c5f558119c?w=800&q=80',
  ];

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: darkMode ? '#12110F' : '#FAF9F7' }}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: darkMode
            ? 'radial-gradient(ellipse 80% 60% at 70% 50%, rgba(196,167,107,0.06) 0%, transparent 70%)'
            : 'radial-gradient(ellipse 80% 60% at 70% 50%, rgba(196,167,107,0.12) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* Left: Text Content */}
          <div className="flex flex-col gap-6 lg:gap-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 w-fit"
            >
              <div
                className="flex items-center gap-2 px-4 py-1.5 rounded-full"
                style={{
                  background: darkMode ? 'rgba(196,167,107,0.12)' : 'rgba(196,167,107,0.1)',
                  border: '1px solid rgba(196,167,107,0.25)',
                }}
              >
                <Sparkles size={12} style={{ color: '#C4A76B' }} />
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 400,
                    fontSize: '11px',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: '#C4A76B',
                  }}
                >
                  Authentic Luxury Fragrances
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="flex flex-col gap-2"
            >
              <h1
                className="leading-none"
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontWeight: 400,
                  fontSize: 'clamp(48px, 8vw, 88px)',
                  color: darkMode ? '#FAF9F7' : '#1C1B19',
                  lineHeight: 1.0,
                }}
              >
                Find Your
              </h1>
              <h1
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  fontSize: 'clamp(48px, 8vw, 88px)',
                  color: '#C4A76B',
                  lineHeight: 1.0,
                }}
              >
                Signature Scent
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 300,
                fontSize: 'clamp(14px, 2vw, 16px)',
                color: darkMode ? 'rgba(250,249,247,0.55)' : 'rgba(28,27,25,0.55)',
                lineHeight: 1.7,
                maxWidth: '420px',
              }}
            >
              100% authentic designer perfumes, available in travel-friendly sizes.
              Browse our curated collection and order easily via Telegram.
              <br />
              <span style={{ color: darkMode ? 'rgba(250,249,247,0.35)' : 'rgba(28,27,25,0.35)', fontStyle: 'italic', fontSize: '13px' }}>
                ប្រឡាកហ្គ្រីមខ្ទុំ · Ship across Cambodia 🇰🇭
              </span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-3"
            >
              <button
                onClick={() => onNavigate('listing')}
                className="flex items-center gap-2 px-7 py-3.5 rounded-full transition-all duration-200 hover:opacity-90 active:scale-95"
                style={{
                  background: darkMode ? '#FAF9F7' : '#1C1B19',
                  color: darkMode ? '#1C1B19' : '#FAF9F7',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 500,
                  fontSize: '14px',
                  letterSpacing: '0.04em',
                  boxShadow: darkMode
                    ? '0 4px 20px rgba(250,249,247,0.12)'
                    : '0 4px 20px rgba(28,27,25,0.18)',
                }}
              >
                Shop Now
              </button>

              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-7 py-3.5 rounded-full transition-all duration-200 hover:opacity-90 active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, #229ED9 0%, #1A86BA 100%)',
                  color: '#fff',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 500,
                  fontSize: '14px',
                  letterSpacing: '0.04em',
                  boxShadow: '0 4px 20px rgba(34,158,217,0.35)',
                }}
              >
                <Send size={15} />
                Contact via Telegram
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-8 pt-2"
            >
              {[
                { value: '50+', label: 'Brands' },
                { value: '200+', label: 'Perfumes' },
                { value: '1000+', label: 'Happy Customers' },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col gap-0.5">
                  <span
                    style={{
                      fontFamily: 'Cormorant Garamond, serif',
                      fontWeight: 500,
                      fontSize: '24px',
                      color: darkMode ? '#FAF9F7' : '#1C1B19',
                      lineHeight: 1,
                    }}
                  >
                    {stat.value}
                  </span>
                  <span
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 300,
                      fontSize: '11px',
                      letterSpacing: '0.08em',
                      color: darkMode ? 'rgba(250,249,247,0.4)' : 'rgba(28,27,25,0.4)',
                      textTransform: 'uppercase',
                    }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Image Collage */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="relative h-[480px] lg:h-[600px] hidden sm:block"
          >
            {/* Main large image */}
            <div
              className="absolute top-0 right-0 w-4/5 h-4/5 rounded-2xl overflow-hidden"
              style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.15)' }}
            >
              <ImageWithFallback
                src={images[0]}
                alt="Hero perfume"
                className="w-full h-full object-cover"
              />
              {/* Overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to bottom right, transparent 40%, rgba(28,27,25,0.25))',
                }}
              />
            </div>

            {/* Secondary image — overlapping bottom left */}
            <div
              className="absolute bottom-0 left-0 w-2/5 h-2/5 rounded-2xl overflow-hidden"
              style={{
                boxShadow: '0 16px 40px rgba(0,0,0,0.18)',
                border: `4px solid ${darkMode ? '#12110F' : '#FAF9F7'}`,
              }}
            >
              <ImageWithFallback
                src={images[1]}
                alt="Perfume 2"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Third image — overlapping middle left */}
            <div
              className="absolute top-1/2 -translate-y-1/2 left-4 w-28 h-36 rounded-xl overflow-hidden"
              style={{
                boxShadow: '0 12px 32px rgba(0,0,0,0.2)',
                border: `3px solid ${darkMode ? '#12110F' : '#FAF9F7'}`,
              }}
            >
              <ImageWithFallback
                src={images[2]}
                alt="Perfume 3"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating glass card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute top-8 left-12 rounded-2xl px-4 py-3"
              style={{
                background: darkMode
                  ? 'rgba(250,249,247,0.07)'
                  : 'rgba(255,255,255,0.72)',
                backdropFilter: 'blur(20px)',
                border: darkMode
                  ? '1px solid rgba(255,255,255,0.1)'
                  : '1px solid rgba(255,255,255,0.8)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              }}
            >
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', color: '#C4A76B', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                Most Popular
              </p>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '16px', color: darkMode ? '#FAF9F7' : '#1C1B19', marginTop: '2px' }}>
                Dior Sauvage
              </p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#C4A76B', marginTop: '1px' }}>
                From $8 · 10ml
              </p>
            </motion.div>

            {/* Guarantee badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
              className="absolute bottom-12 right-4 rounded-full w-20 h-20 flex flex-col items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #C4A76B 0%, #8B6914 100%)',
                boxShadow: '0 8px 24px rgba(196,167,107,0.4)',
              }}
            >
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '8px', color: 'rgba(255,255,255,0.9)', letterSpacing: '0.1em', textTransform: 'uppercase', textAlign: 'center', lineHeight: 1.3 }}>
                100%<br />Authentic
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '10px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: darkMode ? 'rgba(250,249,247,0.3)' : 'rgba(28,27,25,0.3)',
          }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ color: darkMode ? 'rgba(250,249,247,0.3)' : 'rgba(28,27,25,0.3)' }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
