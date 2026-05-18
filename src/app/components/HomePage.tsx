import { useRef } from "react";
import { ChevronLeft, ChevronRight, Star, Shield, Truck, MessageCircle, Award } from "lucide-react";
import { motion } from "motion/react";
import { perfumes, reviews, brands, TELEGRAM_URL, PageView } from "./data";
import { ProductCard } from "./ProductCard";
import { Hero } from "./Hero";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface HomePageProps {
  darkMode: boolean;
  favorites: number[];
  onToggleFavorite: (id: number) => void;
  onViewDetail: (id: number) => void;
  onNavigate: (page: PageView) => void;
}

export function HomePage({
  darkMode,
  favorites,
  onToggleFavorite,
  onViewDetail,
  onNavigate,
}: HomePageProps) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const bestSellers = perfumes.filter((p) => p.isBestSeller);
  const newArrivals = perfumes.filter((p) => p.isNewArrival);

  const bg = darkMode ? '#12110F' : '#FAF9F7';
  const surface = darkMode ? '#1C1B19' : '#FFFFFF';
  const border = darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  const textPrimary = darkMode ? '#FAF9F7' : '#1C1B19';
  const textSecondary = darkMode ? 'rgba(250,249,247,0.5)' : 'rgba(28,27,25,0.5)';

  const scrollCarousel = (dir: 'left' | 'right') => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: dir === 'right' ? 320 : -320, behavior: 'smooth' });
    }
  };

  const SectionLabel = ({ text }: { text: string }) => (
    <p
      style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '11px',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: '#C4A76B',
        marginBottom: '6px',
      }}
    >
      {text}
    </p>
  );

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h2
      style={{
        fontFamily: 'Cormorant Garamond, serif',
        fontWeight: 400,
        fontSize: 'clamp(28px, 4vw, 48px)',
        color: textPrimary,
        lineHeight: 1.1,
      }}
    >
      {children}
    </h2>
  );

  return (
    <div style={{ background: bg }}>
      {/* Hero */}
      <Hero onNavigate={onNavigate} darkMode={darkMode} />

      {/* Features Strip */}
      <section
        className="py-10 border-t border-b"
        style={{
          borderColor: border,
          background: surface,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: '100% Authentic', desc: 'Genuine designer perfumes only' },
              { icon: Truck, title: 'Fast Delivery', desc: 'Ship across all of Cambodia' },
              { icon: MessageCircle, title: 'Easy Telegram Order', desc: 'Message us to order instantly' },
              { icon: Award, title: 'Premium Quality', desc: 'Curated luxury fragrances' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex flex-col items-center text-center gap-2 py-2">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(196,167,107,0.1)', border: '1px solid rgba(196,167,107,0.2)' }}
                >
                  <Icon size={18} style={{ color: '#C4A76B' }} />
                </div>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 500, color: textPrimary }}>
                  {title}
                </p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: textSecondary }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <SectionLabel text="Top Picks" />
              <SectionTitle>Best Sellers</SectionTitle>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollCarousel('left')}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-105"
                style={{ background: surface, border: `1px solid ${border}` }}
              >
                <ChevronLeft size={16} style={{ color: textPrimary }} />
              </button>
              <button
                onClick={() => scrollCarousel('right')}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-105"
                style={{ background: surface, border: `1px solid ${border}` }}
              >
                <ChevronRight size={16} style={{ color: textPrimary }} />
              </button>
              <button
                onClick={() => onNavigate('listing')}
                className="hidden sm:block px-4 py-2 rounded-full transition-opacity hover:opacity-70"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '12px',
                  color: textSecondary,
                  border: `1px solid ${border}`,
                }}
              >
                View All →
              </button>
            </div>
          </div>

          {/* Horizontal scroll carousel */}
          <div
            ref={carouselRef}
            className="flex gap-5 overflow-x-auto pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {bestSellers.map((p) => (
              <div key={p.id} className="flex-shrink-0 w-64">
                <ProductCard
                  perfume={p}
                  darkMode={darkMode}
                  isFavorite={favorites.includes(p.id)}
                  onToggleFavorite={onToggleFavorite}
                  onViewDetail={onViewDetail}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Banner */}
      <section className="py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="relative rounded-3xl overflow-hidden"
            style={{ minHeight: '300px' }}
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1598634222670-87c5f558119c?w=1200&q=80"
              alt="Featured collection"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to right, rgba(28,27,25,0.85) 40%, rgba(28,27,25,0.3))',
              }}
            />
            <div className="relative z-10 flex flex-col justify-center h-full px-8 py-12 sm:px-12">
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '11px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#C4A76B',
                  marginBottom: '8px',
                }}
              >
                Exclusive Collection
              </p>
              <h3
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontWeight: 400,
                  fontSize: 'clamp(28px, 4vw, 52px)',
                  color: '#FAF9F7',
                  lineHeight: 1.1,
                  marginBottom: '12px',
                  maxWidth: '420px',
                }}
              >
                Tom Ford
                <br />
                <em>Private Blend</em>
              </h3>
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 300,
                  fontSize: '14px',
                  color: 'rgba(250,249,247,0.65)',
                  marginBottom: '24px',
                  maxWidth: '340px',
                  lineHeight: 1.6,
                }}
              >
                Rare oud, black orchid and bespoke woods. Experience luxury in every drop.
              </p>
              <button
                onClick={() => onNavigate('listing')}
                className="w-fit px-7 py-3 rounded-full transition-all hover:opacity-90 active:scale-95"
                style={{
                  background: '#FAF9F7',
                  color: '#1C1B19',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 500,
                  fontSize: '13px',
                  letterSpacing: '0.04em',
                }}
              >
                Explore Collection
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <SectionLabel text="Just Arrived" />
              <SectionTitle>New Arrivals</SectionTitle>
            </div>
            <button
              onClick={() => onNavigate('listing')}
              className="hidden sm:block px-4 py-2 rounded-full transition-opacity hover:opacity-70"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '12px',
                color: textSecondary,
                border: `1px solid ${border}`,
              }}
            >
              View All →
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {newArrivals.map((p) => (
              <ProductCard
                key={p.id}
                perfume={p}
                darkMode={darkMode}
                isFavorite={favorites.includes(p.id)}
                onToggleFavorite={onToggleFavorite}
                onViewDetail={onViewDetail}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section
        className="py-16 border-t"
        style={{ borderColor: border }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <SectionLabel text="We Carry" />
            <SectionTitle>Luxury Brands</SectionTitle>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {brands.map((brand) => (
              <motion.button
                key={brand.name}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onNavigate('listing')}
                className="px-6 py-4 rounded-2xl flex flex-col items-center gap-1 transition-colors"
                style={{
                  background: surface,
                  border: `1px solid ${border}`,
                  minWidth: '120px',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontWeight: 500,
                    fontSize: '18px',
                    color: textPrimary,
                  }}
                >
                  {brand.name}
                </span>
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '10px',
                    color: textSecondary,
                    letterSpacing: '0.1em',
                  }}
                >
                  {brand.count} {brand.count === 1 ? 'perfume' : 'perfumes'}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section
        className="py-16 lg:py-24 border-t"
        style={{ borderColor: border }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <SectionLabel text="What Customers Say" />
            <SectionTitle>Reviews</SectionTitle>
            <p
              className="mt-3"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 300,
                fontSize: '14px',
                color: textSecondary,
              }}
            >
              Trusted by 1,000+ customers across Cambodia
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="rounded-2xl p-5 flex flex-col gap-4"
                style={{
                  background: surface,
                  border: `1px solid ${border}`,
                  boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
                }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #C4A76B 0%, #8B6914 100%)' }}
                  >
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#fff', fontWeight: 500 }}>
                      {review.avatar}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 500, color: textPrimary }}>
                        {review.name}
                      </p>
                      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: textSecondary }}>
                        {review.date}
                      </p>
                    </div>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: textSecondary }}>
                      {review.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={12}
                      fill={s <= review.rating ? '#C4A76B' : 'none'}
                      stroke={s <= review.rating ? '#C4A76B' : textSecondary}
                    />
                  ))}
                </div>

                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 300,
                    fontSize: '13px',
                    color: textSecondary,
                    lineHeight: 1.65,
                    fontStyle: 'italic',
                  }}
                >
                  "{review.comment}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="py-16 border-t"
        style={{ borderColor: border, background: surface }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <SectionLabel text="Support" />
            <SectionTitle>FAQ</SectionTitle>
          </div>
          <div className="flex flex-col gap-4">
            {[
              {
                q: 'Are all perfumes 100% authentic?',
                a: 'Yes! Every perfume we sell is 100% authentic and sourced from authorized distributors. We guarantee genuine products only.',
              },
              {
                q: 'How do I order?',
                a: 'Simply browse our collection, select your perfume and size, then click "Order via Telegram". You\'ll be redirected to our Telegram chat with your order pre-filled.',
              },
              {
                q: 'Do you deliver across Cambodia?',
                a: 'Yes, we ship to Phnom Penh, Siem Reap, Battambang, and all major cities across Cambodia. Delivery times vary by location.',
              },
              {
                q: 'What sizes are available?',
                a: 'We offer 10ml, 15ml, 30ml, 50ml travel decants and Full Box options. Availability varies by perfume.',
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept ABA Bank, ACLEDA, Wing, and cash on delivery. Payment details are confirmed via Telegram.',
              },
            ].map((item, i) => (
              <details
                key={i}
                className="group rounded-xl overflow-hidden"
                style={{ border: `1px solid ${border}` }}
              >
                <summary
                  className="flex items-center justify-between p-4 cursor-pointer list-none"
                  style={{ background: darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)' }}
                >
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 500, color: textPrimary }}>
                    {item.q}
                  </span>
                  <ChevronRight
                    size={16}
                    style={{ color: textSecondary, flexShrink: 0, transition: 'transform 0.2s' }}
                    className="group-open:rotate-90"
                  />
                </summary>
                <div
                  className="px-4 pb-4 pt-2"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '13px',
                    color: textSecondary,
                    lineHeight: 1.7,
                  }}
                >
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Telegram CTA */}
      <section className="py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className="rounded-3xl p-10 sm:p-14"
            style={{
              background: 'linear-gradient(135deg, #229ED9 0%, #1A75A8 100%)',
              boxShadow: '0 16px 60px rgba(34,158,217,0.3)',
            }}
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
              style={{ background: 'rgba(255,255,255,0.15)' }}
            >
              <MessageCircle size={26} style={{ color: '#fff' }} />
            </div>
            <h3
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontWeight: 400,
                fontSize: 'clamp(28px, 4vw, 44px)',
                color: '#fff',
                marginBottom: '10px',
                lineHeight: 1.1,
              }}
            >
              Order via Telegram
            </h3>
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 300,
                fontSize: '14px',
                color: 'rgba(255,255,255,0.75)',
                marginBottom: '28px',
                lineHeight: 1.65,
              }}
            >
              Message us directly on Telegram to order, ask questions,
              or request custom perfume recommendations. Fast, friendly service!
            </p>
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full transition-all hover:opacity-95 active:scale-95"
              style={{
                background: '#fff',
                color: '#1A86BA',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '14px',
                letterSpacing: '0.04em',
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.01 9.474c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.17 14.6 4.197 13.7c-.645-.203-.658-.645.136-.953l10.878-4.194c.537-.194 1.006.131.351.695z"/>
              </svg>
              Chat on Telegram
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
