import { useState } from "react";
import { Heart, Star, Send } from "lucide-react";
import { motion } from "motion/react";
import { Perfume, buildTelegramOrderUrl } from "./data";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ProductCardProps {
  perfume: Perfume;
  darkMode: boolean;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onViewDetail: (id: number) => void;
}

export function ProductCard({
  perfume,
  darkMode,
  isFavorite,
  onToggleFavorite,
  onViewDetail,
}: ProductCardProps) {
  const [hoveredSize, setHoveredSize] = useState<string | null>(null);
  const defaultSize = perfume.sizes.find((s) => s.inStock) || perfume.sizes[0];
  const [selectedSize, setSelectedSize] = useState(defaultSize);

  const handleOrder = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = buildTelegramOrderUrl(perfume.brand, perfume.name, selectedSize.label, selectedSize.price, perfume.image);
    window.open(url, '_blank');
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      onClick={() => onViewDetail(perfume.id)}
      className="cursor-pointer group rounded-2xl overflow-hidden flex flex-col"
      style={{
        background: darkMode ? '#1C1B19' : '#FFFFFF',
        border: `1px solid ${darkMode ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)'}`,
        boxShadow: darkMode
          ? '0 4px 24px rgba(0,0,0,0.3)'
          : '0 4px 24px rgba(0,0,0,0.06)',
        transition: 'box-shadow 0.25s',
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[3/4]">
        <ImageWithFallback
          src={perfume.image}
          alt={`${perfume.brand} ${perfume.name}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Overlay on hover */}
        <div
          className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
          style={{
            background: 'linear-gradient(to top, rgba(28,27,25,0.5) 0%, transparent 60%)',
          }}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {perfume.isBestSeller && (
            <span
              className="px-2 py-0.5 rounded-full"
              style={{
                background: 'linear-gradient(135deg, #C4A76B 0%, #8B6914 100%)',
                color: '#fff',
                fontFamily: 'Inter, sans-serif',
                fontSize: '9px',
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
              className="px-2 py-0.5 rounded-full"
              style={{
                background: 'rgba(34,158,217,0.9)',
                color: '#fff',
                fontFamily: 'Inter, sans-serif',
                fontSize: '9px',
                fontWeight: 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              New
            </span>
          )}
        </div>

        {/* Favorite */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(perfume.id);
          }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-90"
          style={{
            background: isFavorite
              ? 'rgba(239, 68, 68, 0.9)'
              : 'rgba(255,255,255,0.85)',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
          }}
        >
          <Heart
            size={14}
            fill={isFavorite ? '#fff' : 'none'}
            stroke={isFavorite ? '#fff' : '#6B7280'}
          />
        </button>

        {/* Gender badge */}
        <div
          className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <span
            className="px-2 py-0.5 rounded-full"
            style={{
              background: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.3)',
              color: '#fff',
              fontFamily: 'Inter, sans-serif',
              fontSize: '10px',
              letterSpacing: '0.08em',
            }}
          >
            {perfume.gender}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-col gap-3 p-4 flex-1">
        {/* Brand & Name */}
        <div className="flex flex-col gap-0.5">
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              fontSize: '11px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#C4A76B',
            }}
          >
            {perfume.brand}
          </p>
          <h3
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontWeight: 500,
              fontSize: '18px',
              color: darkMode ? '#FAF9F7' : '#1C1B19',
              lineHeight: 1.2,
            }}
          >
            {perfume.name}
          </h3>
          <p
            className="line-clamp-1"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 300,
              fontSize: '12px',
              color: darkMode ? 'rgba(250,249,247,0.45)' : 'rgba(28,27,25,0.45)',
              lineHeight: 1.5,
              marginTop: '2px',
            }}
          >
            {perfume.description}
          </p>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={11}
                fill={star <= Math.round(perfume.rating) ? '#C4A76B' : 'none'}
                stroke={star <= Math.round(perfume.rating) ? '#C4A76B' : darkMode ? 'rgba(250,249,247,0.25)' : 'rgba(0,0,0,0.2)'}
              />
            ))}
          </div>
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '11px',
              color: darkMode ? 'rgba(250,249,247,0.4)' : 'rgba(28,27,25,0.4)',
            }}
          >
            ({perfume.reviewCount})
          </span>
        </div>

        {/* Size Selector */}
        <div className="flex flex-wrap gap-1.5">
          {perfume.sizes.map((size) => (
            <button
              key={size.label}
              disabled={!size.inStock}
              onClick={(e) => {
                e.stopPropagation();
                if (size.inStock) setSelectedSize(size);
              }}
              onMouseEnter={() => setHoveredSize(size.label)}
              onMouseLeave={() => setHoveredSize(null)}
              className="px-2 py-1 rounded-full transition-all duration-150 text-xs"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '10px',
                fontWeight: selectedSize.label === size.label ? 500 : 400,
                background:
                  selectedSize.label === size.label
                    ? '#C4A76B'
                    : !size.inStock
                    ? 'transparent'
                    : darkMode
                    ? 'rgba(255,255,255,0.07)'
                    : 'rgba(0,0,0,0.05)',
                color:
                  selectedSize.label === size.label
                    ? '#fff'
                    : !size.inStock
                    ? darkMode
                      ? 'rgba(250,249,247,0.2)'
                      : 'rgba(28,27,25,0.2)'
                    : darkMode
                    ? 'rgba(250,249,247,0.6)'
                    : 'rgba(28,27,25,0.6)',
                border: `1px solid ${
                  selectedSize.label === size.label
                    ? '#C4A76B'
                    : !size.inStock
                    ? darkMode
                      ? 'rgba(255,255,255,0.1)'
                      : 'rgba(0,0,0,0.1)'
                    : darkMode
                    ? 'rgba(255,255,255,0.12)'
                    : 'rgba(0,0,0,0.12)'
                }`,
                textDecoration: !size.inStock ? 'line-through' : 'none',
                cursor: !size.inStock ? 'not-allowed' : 'pointer',
              }}
            >
              {size.label}
            </button>
          ))}
        </div>

        {/* Price + Order */}
        <div className="flex items-center justify-between mt-auto pt-1">
          <div className="flex flex-col">
            <span
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontWeight: 500,
                fontSize: '20px',
                color: darkMode ? '#FAF9F7' : '#1C1B19',
                lineHeight: 1,
              }}
            >
              ${selectedSize.price}
            </span>
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '10px',
                color: darkMode ? 'rgba(250,249,247,0.35)' : 'rgba(28,27,25,0.35)',
              }}
            >
              {selectedSize.label}
            </span>
          </div>

          <button
            onClick={handleOrder}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full transition-all duration-200 hover:opacity-90 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #229ED9 0%, #1A86BA 100%)',
              color: '#fff',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              fontSize: '11px',
              letterSpacing: '0.03em',
              boxShadow: '0 2px 10px rgba(34,158,217,0.3)',
            }}
          >
            <Send size={11} />
            Order
          </button>
        </div>
      </div>
    </motion.div>
  );
}
