import { Send, Instagram, Facebook, Youtube } from "lucide-react";
import { TELEGRAM_URL, PageView } from "./data";

interface FooterProps {
  darkMode: boolean;
  onNavigate: (page: PageView) => void;
}

export function Footer({ darkMode, onNavigate }: FooterProps) {
  const bg = darkMode ? '#0D0C0A' : '#1C1B19';
  const textPrimary = 'rgba(250,249,247,0.9)';
  const textSecondary = 'rgba(250,249,247,0.4)';
  const border = 'rgba(255,255,255,0.08)';

  return (
    <footer style={{ background: bg }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-4 col-span-1 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #C4A76B 0%, #8B6914 100%)' }}
              >
                <span style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 600, fontSize: '14px', color: '#fff' }}>
                  S
                </span>
              </div>
              <div className="flex flex-col leading-none">
                <span
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontWeight: 600,
                    fontSize: '15px',
                    color: textPrimary,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                  }}
                >
                  Scent
                </span>
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 300,
                    fontSize: '8px',
                    letterSpacing: '0.3em',
                    color: '#C4A76B',
                    textTransform: 'uppercase',
                  }}
                >
                  Cambodia
                </span>
              </div>
            </div>
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 300,
                fontSize: '13px',
                color: textSecondary,
                lineHeight: 1.7,
                maxWidth: '240px',
              }}
            >
              Premium authentic designer perfumes, available in travel-friendly decants. Serving Cambodia with love. 🇰🇭
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              {[
                {
                  href: TELEGRAM_URL,
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.01 9.474c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.17 14.6 4.197 13.7c-.645-.203-.658-.645.136-.953l10.878-4.194c.537-.194 1.006.131.351.695z" />
                    </svg>
                  ),
                  color: '#229ED9',
                },
                {
                  href: 'https://instagram.com',
                  icon: <Instagram size={16} />,
                  color: '#E1306C',
                },
                {
                  href: 'https://facebook.com',
                  icon: <Facebook size={16} />,
                  color: '#1877F2',
                },
                {
                  href: 'https://tiktok.com',
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.54V6.79a4.85 4.85 0 01-1.02-.1z" />
                    </svg>
                  ),
                  color: '#fff',
                },
              ].map(({ href, icon, color }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  style={{
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: color,
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '11px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'rgba(250,249,247,0.6)',
              }}
            >
              Quick Links
            </p>
            <div className="flex flex-col gap-2.5">
              {[
                { label: 'Home', action: () => onNavigate('home') },
                { label: 'All Perfumes', action: () => onNavigate('listing') },
                { label: 'Best Sellers', action: () => onNavigate('listing') },
                { label: 'New Arrivals', action: () => onNavigate('listing') },
              ].map((link) => (
                <button
                  key={link.label}
                  onClick={link.action}
                  className="text-left transition-colors hover:opacity-80"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 300,
                    fontSize: '13px',
                    color: textSecondary,
                  }}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Brands */}
          <div className="flex flex-col gap-4">
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '11px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'rgba(250,249,247,0.6)',
              }}
            >
              Brands
            </p>
            <div className="flex flex-col gap-2.5">
              {['Chanel', 'Dior', 'Tom Ford', 'Creed', 'Lancôme', 'Guerlain'].map((brand) => (
                <button
                  key={brand}
                  onClick={() => onNavigate('listing')}
                  className="text-left transition-colors hover:opacity-80"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 300,
                    fontSize: '13px',
                    color: textSecondary,
                  }}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '11px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'rgba(250,249,247,0.6)',
              }}
            >
              Contact Us
            </p>
            <div className="flex flex-col gap-3">
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: textSecondary, lineHeight: 1.5 }}>
                📍 Phnom Penh, Cambodia
              </p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: textSecondary }}>
                🕐 Mon–Sun: 8AM – 9PM
              </p>
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 w-fit px-4 py-2.5 rounded-full transition-all hover:opacity-90 mt-1"
                style={{
                  background: 'linear-gradient(135deg, #229ED9 0%, #1A86BA 100%)',
                  color: '#fff',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 500,
                  fontSize: '12px',
                  boxShadow: '0 2px 12px rgba(34,158,217,0.3)',
                }}
              >
                <Send size={13} />
                Message on Telegram
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="py-5 border-t flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderColor: border }}
        >
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 300,
              fontSize: '12px',
              color: textSecondary,
            }}
          >
            © 2026 Scent Cambodia. All rights reserved.
          </p>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 300,
              fontSize: '12px',
              color: 'rgba(250,249,247,0.25)',
            }}
          >
            Authentic Luxury Fragrances · Made with ♥ in Cambodia
          </p>
        </div>
      </div>
    </footer>
  );
}
