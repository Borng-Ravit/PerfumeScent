import { useState } from "react";

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallback?: string;
}

export function ImageWithFallback({ src, alt, fallback, className, ...props }: ImageWithFallbackProps) {
  const [error, setError] = useState(false);
  const fallbackSrc = fallback || `https://images.unsplash.com/photo-1612871178341-33f941a841e3?w=600&q=80`;

  return (
    <img
      src={error ? fallbackSrc : src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
      {...props}
    />
  );
}
