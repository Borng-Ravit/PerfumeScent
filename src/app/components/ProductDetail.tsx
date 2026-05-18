import { useState } from "react";
import { Heart, Star, Share2, Send, ArrowLeft, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { perfumes, buildTelegramOrderUrl, PerfumeSize } from "./data";
import { ProductCard } from "./ProductCard";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ProductDetailProps {
  perfumeId: number;
  darkMode: boolean;
  favorites: number[];
  onToggleFavorite: (id: number) => void;
  onViewDetail: (id: number) => void;
  onBack: () => void;
}

export function ProductDetail({
  perfumeId,
  darkMode,
  favorites,
  onToggleFavorite,
  onViewDetail,
  onBack,
}: ProductDetailProps) {
  const perfume = perfumes.find((p) => p.id === perfumeId);
  if (!perfume) return null;

  const defaultSize = perfume.sizes.find((s) => s.inStock) || perfume.sizes[0];
  const [selectedSize, setSelectedSize] = useState<PerfumeSize>(defaultSize);
  const [activeImage, setActiveImage] = useState(0);
  const [copied, setCopied] = useState(false);

  const related = perfumes.filter((p) => p.id !== perfume.id && (p.brand === perfume.brand || p.gender === perfume.gender)).slice(0, 4);

  const bg = darkMode ? '#12110F' : '#FAF9F7';
  const surface = darkMode ? '#1C1B19' : '#FFFFFF';
  const border = darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  const textPrimary = darkMode ? '#FAF9F7' : '#1C1B19';
  const textSecondary = darkMode ? 'rgba(250,249,247,0.5)' : 'rgba(28,27,25,0.5)';

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOrder = () => {
    const url = buildTelegramOrderUrl(perfume.brand, perfume.name, selectedSize.label, selectedSize.price, perfume.image);
    window.open(url, '_blank');
  };

  const NoteGroup = ({ title, notes }: { title: string; notes: string[] }) => (
    <div className="flex flex-col gap-2">
      <p
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '10px',
          fontWeight: 600,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: '#C4A76B',
        }}
      >
        {title}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {notes.map((note) => (
          <span
            key={note}
            className="px-3 py-1 rounded-full"
            style={{
              background: darkMode ? 'rgba(196,167,107,0.1)' : 'rgba(196,167,107,0.08)',
              border: '1px solid rgba(196,167,107,0.2)',
              color: darkMode ? 'rgba(250,249,247,0.8)' : 'rgba(28,27,25,0.75)',
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
            }}
          >
            {note}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-16" style={{ background: bg }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Breadcrumb */}
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 mb-8 group transition-colors duration-200"
          style={{ color: textSecondary }}
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px' }}>
            Back to Perfumes
          </span>
        </button>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left: Image Gallery */}
          <div className="flex flex-col gap-4">
            {/* Main Image */}
            <div
              className="relative rounded-2xl overflow-hidden aspect-[4/5]"
              style={{ background: darkMode ? '#1C1B19' : '#F5F3F0' }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <ImageWithFallback
                    src={perfume.gallery[activeImage] || perfume.image}
                    alt={`${perfume.brand} ${perfume.name}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Prev/Next */}
              {perfume.gallery.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImage((i) => (i - 1 + perfume.gallery.length) % perfume.gallery.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-105"
                    style={{
                      background: 'rgba(255,255,255,0.85)',
                      backdropFilter: 'blur(8px)',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    }}
                  >
                    <ChevronLeft size={16} style={{ color: '#1C1B19' }} />
                  </button>
                  <button
                    onClick={() => setActiveImage((i) => (i + 1) % perfume.gallery.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-105"
                    style={{
                      background: 'rgba(255,255,255,0.85)',
                      backdropFilter: 'blur(8px)',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    }}
                  >
                    <ChevronRight size={16} style={{ color: '#1C1B19' }} />
                  </button>
                </>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {perfume.isBestSeller && (
                  <span
                    className="px-3 py-1 rounded-full"
                    style={{
                      background: 'linear-gradient(135deg, #C4A76B 0%, #8B6914 100%)',
                      color: '#fff',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '10px',
                      fontWeight: 500,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Best Seller
                  </span>
                )}
                {perfume.isNewArrival && (
                  <span
                    className="px-3 py-1 rounded-full"
                    style={{
                      background: 'rgba(34,158,217,0.9)',
                      color: '#fff',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '10px',
                      fontWeight: 500,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                    }}
                  >
                    New Arrival
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnails */}
            {perfume.gallery.length > 1 && (
              <div className="flex gap-3">
                {perfume.gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className="w-20 h-24 rounded-xl overflow-hidden flex-shrink-0 transition-all duration-200"
                    style={{
                      border: `2px solid ${i === activeImage ? '#C4A76B' : border}`,
                      opacity: i === activeImage ? 1 : 0.65,
                    }}
                  >
                    <ImageWithFallback
                      src={img}
                      alt={`View ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Details */}
          <div className="flex flex-col gap-6">
            {/* Brand + Name */}
            <div className="flex flex-col gap-1">
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 400,
                  fontSize: '12px',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#C4A76B',
                }}
              >
                {perfume.brand}
              </p>
              <h1
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontWeight: 400,
                  fontSize: 'clamp(32px, 5vw, 52px)',
                  color: textPrimary,
                  lineHeight: 1.1,
                }}
              >
                {perfume.name}
              </h1>
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 300,
                  fontSize: '14px',
                  color: textSecondary,
                  fontStyle: 'italic',
                  marginTop: '4px',
                }}
              >
                {perfume.description}
              </p>
            </div>

            {/* Rating + Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={14}
                      fill={s <= Math.round(perfume.rating) ? '#C4A76B' : 'none'}
                      stroke={s <= Math.round(perfume.rating) ? '#C4A76B' : textSecondary}
                    />
                  ))}
                </div>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: textPrimary, fontWeight: 500 }}>
                  {perfume.rating}
                </span>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: textSecondary }}>
                  ({perfume.reviewCount.toLocaleString()} reviews)
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onToggleFavorite(perfume.id)}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{
                    background: favorites.includes(perfume.id)
                      ? 'rgba(239,68,68,0.12)'
                      : darkMode
                      ? 'rgba(255,255,255,0.07)'
                      : 'rgba(0,0,0,0.05)',
                    border: `1px solid ${favorites.includes(perfume.id) ? 'rgba(239,68,68,0.3)' : border}`,
                  }}
                >
                  <Heart
                    size={15}
                    fill={favorites.includes(perfume.id) ? 'rgb(239,68,68)' : 'none'}
                    stroke={favorites.includes(perfume.id) ? 'rgb(239,68,68)' : textSecondary}
                  />
                </button>
                <button
                  onClick={handleShare}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{
                    background: darkMode ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.05)',
                    border: `1px solid ${border}`,
                  }}
                >
                  {copied ? (
                    <Check size={15} style={{ color: '#22C55E' }} />
                  ) : (
                    <Share2 size={15} style={{ color: textSecondary }} />
                  )}
                </button>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {[perfume.gender, perfume.season, ...perfume.tags].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full"
                  style={{
                    background: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
                    border: `1px solid ${border}`,
                    color: textSecondary,
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '11px',
                    letterSpacing: '0.06em',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Divider */}
            <div style={{ height: '1px', background: border }} />

            {/* Size Selection */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: textSecondary,
                  }}
                >
                  Select Size
                </span>
                <span
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '22px',
                    color: textPrimary,
                  }}
                >
                  ${selectedSize.price}
                </span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {perfume.sizes.map((size) => (
                  <button
                    key={size.label}
                    disabled={!size.inStock}
                    onClick={() => size.inStock && setSelectedSize(size)}
                    className="py-3 rounded-xl flex flex-col items-center gap-1 transition-all duration-150"
                    style={{
                      background:
                        selectedSize.label === size.label
                          ? '#C4A76B'
                          : !size.inStock
                          ? 'transparent'
                          : darkMode
                          ? 'rgba(255,255,255,0.06)'
                          : 'rgba(0,0,0,0.04)',
                      border: `1.5px solid ${
                        selectedSize.label === size.label
                          ? '#C4A76B'
                          : !size.inStock
                          ? border
                          : border
                      }`,
                      cursor: !size.inStock ? 'not-allowed' : 'pointer',
                      opacity: !size.inStock ? 0.4 : 1,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '11px',
                        fontWeight: selectedSize.label === size.label ? 500 : 400,
                        color: selectedSize.label === size.label ? '#fff' : textPrimary,
                      }}
                    >
                      {size.label}
                    </span>
                    <span
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '10px',
                        color: selectedSize.label === size.label ? 'rgba(255,255,255,0.8)' : textSecondary,
                      }}
                    >
                      ${size.price}
                    </span>
                  </button>
                ))}
              </div>
              {!selectedSize.inStock && (
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'rgb(239,68,68)' }}>
                  This size is currently out of stock
                </p>
              )}
            </div>

            {/* Order Button */}
            <button
              onClick={handleOrder}
              disabled={!selectedSize.inStock}
              className="w-full py-4 rounded-2xl flex items-center justify-center gap-3 transition-all duration-200 hover:opacity-90 active:scale-[0.99]"
              style={{
                background: selectedSize.inStock
                  ? 'linear-gradient(135deg, #229ED9 0%, #1A86BA 100%)'
                  : darkMode
                  ? 'rgba(255,255,255,0.1)'
                  : 'rgba(0,0,0,0.1)',
                color: selectedSize.inStock ? '#fff' : textSecondary,
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                fontSize: '15px',
                letterSpacing: '0.04em',
                boxShadow: selectedSize.inStock ? '0 4px 20px rgba(34,158,217,0.4)' : 'none',
                cursor: selectedSize.inStock ? 'pointer' : 'not-allowed',
              }}
            >
              <Send size={16} />
              Order via Telegram · ${selectedSize.price} ({selectedSize.label})
            </button>

            {/* Notes */}
            <div
              className="rounded-2xl p-5 flex flex-col gap-5"
              style={{
                background: darkMode ? 'rgba(196,167,107,0.05)' : 'rgba(196,167,107,0.04)',
                border: '1px solid rgba(196,167,107,0.15)',
              }}
            >
              <p
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontWeight: 500,
                  fontSize: '18px',
                  color: textPrimary,
                }}
              >
                Fragrance Notes
              </p>
              <NoteGroup title="Top Notes" notes={perfume.topNotes} />
              <NoteGroup title="Heart Notes" notes={perfume.middleNotes} />
              <NoteGroup title="Base Notes" notes={perfume.baseNotes} />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2">
              <p
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontWeight: 500,
                  fontSize: '18px',
                  color: textPrimary,
                }}
              >
                About this Fragrance
              </p>
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 300,
                  fontSize: '14px',
                  color: textSecondary,
                  lineHeight: 1.75,
                }}
              >
                {perfume.longDescription}
              </p>
            </div>

            {/* Guarantee */}
            <div
              className="flex items-center gap-3 p-4 rounded-xl"
              style={{
                background: darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
                border: `1px solid ${border}`,
              }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #C4A76B 0%, #8B6914 100%)' }}
              >
                <Check size={16} style={{ color: '#fff' }} />
              </div>
              <div>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 500, color: textPrimary }}>
                  100% Authentic Guarantee
                </p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: textSecondary }}>
                  All perfumes are genuine and sourced directly from authorized distributors.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-16">
            <div className="mb-6 flex items-end justify-between">
              <div>
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '11px',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#C4A76B',
                    marginBottom: '4px',
                  }}
                >
                  You might also like
                </p>
                <h3
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontWeight: 400,
                    fontSize: 'clamp(24px, 3vw, 36px)',
                    color: textPrimary,
                  }}
                >
                  Related Perfumes
                </h3>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((p) => (
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
        )}
      </div>

      {/* Sticky Mobile Order Button */}
      <div
        className="fixed bottom-16 left-0 right-0 z-30 lg:hidden px-4 pb-2"
        style={{ pointerEvents: 'none' }}
      >
        <button
          onClick={handleOrder}
          className="w-full py-4 rounded-2xl flex items-center justify-center gap-3 transition-all duration-200 hover:opacity-90 active:scale-[0.99]"
          style={{
            background: 'linear-gradient(135deg, #229ED9 0%, #1A86BA 100%)',
            color: '#fff',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
            fontSize: '14px',
            boxShadow: '0 4px 24px rgba(34,158,217,0.5)',
            pointerEvents: 'all',
          }}
        >
          <Send size={16} />
          Order via Telegram · ${selectedSize.price} ({selectedSize.label})
        </button>
      </div>
    </div>
  );
}
