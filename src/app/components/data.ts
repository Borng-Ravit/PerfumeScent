export type SizeOption = '10ml' | '15ml' | '30ml' | '50ml' | 'Full Box';
export type Gender = 'Unisex' | 'Men' | 'Women';
export type PageView = 'home' | 'listing' | 'detail';

export interface PerfumeSize {
  label: SizeOption;
  price: number;
  inStock: boolean;
}

export interface Review {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
  location: string;
}

export interface Perfume {
  id: number;
  name: string;
  brand: string;
  description: string;
  longDescription: string;
  topNotes: string[];
  middleNotes: string[];
  baseNotes: string[];
  sizes: PerfumeSize[];
  image: string;
  gallery: string[];
  gender: Gender;
  rating: number;
  reviewCount: number;
  isBestSeller: boolean;
  isNewArrival: boolean;
  tags: string[];
  season: string;
}

const IMG = {
  p1: 'https://images.unsplash.com/photo-1676951334972-2e65e67f4cbe?w=600&q=80',
  p2: 'https://images.unsplash.com/photo-1608721279136-cd41b752fa41?w=600&q=80',
  p3: 'https://images.unsplash.com/photo-1615160460366-2c9a41771b51?w=600&q=80',
  p4: 'https://images.unsplash.com/photo-1544006593-1a0b9255782d?w=600&q=80',
  p5: 'https://images.unsplash.com/photo-1598634222670-87c5f558119c?w=600&q=80',
  p6: 'https://images.unsplash.com/photo-1514557179557-9efc4d7949cc?w=600&q=80',
  p7: 'https://images.unsplash.com/photo-1656746678868-579bf6d7868d?w=600&q=80',
  p8: 'https://images.unsplash.com/photo-1677735476292-0fc57ab097b2?w=600&q=80',
  p9: 'https://images.unsplash.com/photo-1673710672680-944563ff9cce?w=600&q=80',
  p10: 'https://images.unsplash.com/photo-1681237398100-4d3b1618b6c4?w=600&q=80',
  p11: 'https://images.unsplash.com/photo-1711359022098-0652aba5c009?w=600&q=80',
  p12: 'https://images.unsplash.com/photo-1612871178341-33f941a841e3?w=600&q=80',
};

export const HERO_IMAGE = 'https://images.unsplash.com/photo-1612871178341-33f941a841e3?w=1400&q=80';
export const TELEGRAM_USERNAME = 'ravit_borng';
export const TELEGRAM_URL = `https://t.me/${TELEGRAM_USERNAME}`;

export function buildTelegramOrderUrl(brand: string, name: string, size: string, price: number, imageUrl?: string): string {
  const imageLine = imageUrl ? `\n🖼 Image: ${imageUrl}` : '';
  const message = encodeURIComponent(
    `Hello! I'd like to order:\n\n🌸 ${brand} - ${name}\n📦 Size: ${size}\n💰 Price: $${price}${imageLine}\n\nPlease confirm availability. Thank you! 🙏`
  );
  return `https://t.me/${TELEGRAM_USERNAME}?text=${message}`;
}

export const perfumes: Perfume[] = [
  {
    id: 1,
    name: 'Sauvage',
    brand: 'Dior',
    description: 'A raw and noble freshness. A wide-open space.',
    longDescription: 'Dior Sauvage opens with a radically fresh, crisp rush of Regent Bergamot from Calabria. A bold, noble signature and a raw, fresh accord make for an inspiring composition. The masculinity of the fragrance is driven by Ambroxan. Wild at heart, the perfume magnifies the natural freshness of an unspoiled land.',
    topNotes: ['Calabrian Bergamot', 'Pepper'],
    middleNotes: ['Sichuan Pepper', 'Lavender', 'Pink Pepper', 'Vetiver', 'Patchouli'],
    baseNotes: ['Ambroxan', 'Cedar', 'Labdanum'],
    sizes: [
      { label: '10ml', price: 8, inStock: true },
      { label: '15ml', price: 12, inStock: true },
      { label: '30ml', price: 22, inStock: true },
      { label: '50ml', price: 35, inStock: false },
      { label: 'Full Box', price: 75, inStock: true },
    ],
    image: IMG.p1,
    gallery: [IMG.p1, IMG.p12, IMG.p8],
    gender: 'Men',
    rating: 4.8,
    reviewCount: 342,
    isBestSeller: true,
    isNewArrival: false,
    tags: ['Fresh', 'Woody', 'Spicy'],
    season: 'All Season',
  },
  {
    id: 2,
    name: 'Miss Dior',
    brand: 'Dior',
    description: 'An ode to joy, an ode to love. For the woman who chooses her destiny.',
    longDescription: 'Miss Dior is a bold declaration of love. The luminous Eau de Parfum reveals a heart of Damascus Rose at full bloom, married with delicate white petals. The result is a floral, slightly powdery fragrance that is both timeless and intensely modern.',
    topNotes: ['Calabrian Mandarin', 'Neroli'],
    middleNotes: ['Damascus Rose', 'Peony'],
    baseNotes: ['White Musk', 'Patchouli'],
    sizes: [
      { label: '10ml', price: 9, inStock: true },
      { label: '15ml', price: 14, inStock: true },
      { label: '30ml', price: 25, inStock: true },
      { label: '50ml', price: 40, inStock: true },
      { label: 'Full Box', price: 85, inStock: false },
    ],
    image: IMG.p2,
    gallery: [IMG.p2, IMG.p9, IMG.p6],
    gender: 'Women',
    rating: 4.7,
    reviewCount: 289,
    isBestSeller: true,
    isNewArrival: false,
    tags: ['Floral', 'Fresh', 'Romantic'],
    season: 'Spring / Summer',
  },
  {
    id: 3,
    name: 'Bleu de Chanel',
    brand: 'Chanel',
    description: 'A woody aromatic fragrance for a man who defies convention.',
    longDescription: 'Bleu de Chanel is an olfactory statement of freedom for the man who refuses to be defined. The surprising contrast of citrus and woody notes creates a powerful, distinguished presence. A sophisticated blend that is both fresh and sensual.',
    topNotes: ['Citrus', 'Mint', 'Pink Pepper'],
    middleNotes: ['Ginger', 'Nutmeg', 'Jasmine'],
    baseNotes: ['Incense', 'Vetiver', 'Cedar', 'Sandalwood', 'Patchouli', 'White Musk'],
    sizes: [
      { label: '10ml', price: 10, inStock: true },
      { label: '15ml', price: 15, inStock: false },
      { label: '30ml', price: 28, inStock: true },
      { label: '50ml', price: 45, inStock: true },
      { label: 'Full Box', price: 95, inStock: true },
    ],
    image: IMG.p3,
    gallery: [IMG.p3, IMG.p5, IMG.p12],
    gender: 'Men',
    rating: 4.9,
    reviewCount: 512,
    isBestSeller: true,
    isNewArrival: false,
    tags: ['Woody', 'Aromatic', 'Fresh'],
    season: 'All Season',
  },
  {
    id: 4,
    name: 'Black Orchid',
    brand: 'Tom Ford',
    description: 'A luxurious, dark and sensual fragrance of rich, dark accords.',
    longDescription: "Tom Ford Black Orchid is a luxurious and sensual fragrance of rich, dark accords and an alluring, contradictory nature: both heavy and light, masculine and feminine. The opening is dark, rich and immediately seductive with a mouth-watering blend of black truffle, ylang ylang, bergamot and black currant.",
    topNotes: ['Black Truffle', 'Ylang Ylang', 'Bergamot', 'Black Currant'],
    middleNotes: ['Black Orchid', 'Spicy Notes', 'Jasmine', 'Fruity Notes'],
    baseNotes: ['Patchouli', 'Vetiver', 'Sandalwood', 'Dark Chocolate', 'Incense', 'Vanilla'],
    sizes: [
      { label: '10ml', price: 12, inStock: true },
      { label: '15ml', price: 18, inStock: true },
      { label: '30ml', price: 35, inStock: false },
      { label: '50ml', price: 55, inStock: true },
      { label: 'Full Box', price: 120, inStock: true },
    ],
    image: IMG.p4,
    gallery: [IMG.p4, IMG.p7, IMG.p11],
    gender: 'Unisex',
    rating: 4.6,
    reviewCount: 198,
    isBestSeller: false,
    isNewArrival: true,
    tags: ['Dark', 'Oriental', 'Sensual'],
    season: 'Autumn / Winter',
  },
  {
    id: 5,
    name: 'Oud Wood',
    brand: 'Tom Ford',
    description: 'Rare oud wood accord reveals exotic warmth and depth.',
    longDescription: 'Tom Ford Oud Wood is a captivating, mysterious fragrance with a rare oud wood accord at its heart. Warm and exotic spices of rosewood, cardamom and Chinese pepper meld seamlessly with oud wood, sandalwood and vetiver, creating an oriental masterpiece.',
    topNotes: ['Rosewood', 'Cardamom', 'Chinese Pepper'],
    middleNotes: ['Oud Wood', 'Sandalwood', 'Vetiver'],
    baseNotes: ['Tonka Bean', 'Amber', 'Musk'],
    sizes: [
      { label: '10ml', price: 15, inStock: true },
      { label: '15ml', price: 22, inStock: true },
      { label: '30ml', price: 42, inStock: true },
      { label: '50ml', price: 65, inStock: false },
      { label: 'Full Box', price: 140, inStock: true },
    ],
    image: IMG.p5,
    gallery: [IMG.p5, IMG.p4, IMG.p1],
    gender: 'Unisex',
    rating: 4.9,
    reviewCount: 276,
    isBestSeller: true,
    isNewArrival: false,
    tags: ['Woody', 'Oud', 'Luxury'],
    season: 'All Season',
  },
  {
    id: 6,
    name: 'La Vie Est Belle',
    brand: 'Lancôme',
    description: 'An iris and patchouli fragrance celebrating the beauty of life.',
    longDescription: "La vie est belle — life is beautiful. Lancôme's iconic fragrance is a declaration of happiness. An iris and patchouli fragrance enriched with gourmand praline and vanilla, creating a warm, feminine, and irresistibly sweet signature.",
    topNotes: ['Black Currant', 'Pear'],
    middleNotes: ['Iris', 'Jasmine', 'Orange Blossom'],
    baseNotes: ['Patchouli', 'Praline', 'Vanilla', 'Musk'],
    sizes: [
      { label: '10ml', price: 8, inStock: true },
      { label: '15ml', price: 13, inStock: true },
      { label: '30ml', price: 24, inStock: true },
      { label: '50ml', price: 38, inStock: true },
      { label: 'Full Box', price: 80, inStock: false },
    ],
    image: IMG.p6,
    gallery: [IMG.p6, IMG.p2, IMG.p9],
    gender: 'Women',
    rating: 4.5,
    reviewCount: 421,
    isBestSeller: false,
    isNewArrival: true,
    tags: ['Floral', 'Sweet', 'Elegant'],
    season: 'Spring / Summer',
  },
  {
    id: 7,
    name: 'Coco Mademoiselle',
    brand: 'Chanel',
    description: 'Fresh yet sensual, a very free and very feminine spirit.',
    longDescription: "Coco Mademoiselle by Chanel is the essence of a daring and free spirit. This Eau de Parfum Intense captures a very free, very feminine spirit with fresh bergamot and orange contrasted by a lingering oriental base of patchouli, vetiver and vanilla.",
    topNotes: ['Orange', 'Bergamot', 'Grapefruit'],
    middleNotes: ['Rose', 'Jasmine', 'Mimosa', 'Ylang Ylang'],
    baseNotes: ['Patchouli', 'Labdanum', 'Oud Wood', 'Vanilla', 'White Musk'],
    sizes: [
      { label: '10ml', price: 11, inStock: false },
      { label: '15ml', price: 16, inStock: true },
      { label: '30ml', price: 30, inStock: true },
      { label: '50ml', price: 48, inStock: true },
      { label: 'Full Box', price: 100, inStock: true },
    ],
    image: IMG.p7,
    gallery: [IMG.p7, IMG.p10, IMG.p6],
    gender: 'Women',
    rating: 4.8,
    reviewCount: 654,
    isBestSeller: true,
    isNewArrival: false,
    tags: ['Floral', 'Fruity', 'Sensual'],
    season: 'All Season',
  },
  {
    id: 8,
    name: 'Aventus',
    brand: 'Creed',
    description: 'Inspired by a life of achievement, strength and success.',
    longDescription: 'Creed Aventus celebrates strength, power, vision, and success. Opening with a burst of fruity freshness, this iconic fragrance transitions into a warm, earthy heart that speaks to the spirit of achievement.',
    topNotes: ['Pineapple', 'Bergamot', 'Black Currant', 'Apple'],
    middleNotes: ['Birch', 'Patchouli', 'Rose', 'Jasmine'],
    baseNotes: ['Musk', 'Oak Moss', 'Ambergris', 'Vanillin'],
    sizes: [
      { label: '10ml', price: 18, inStock: true },
      { label: '15ml', price: 27, inStock: true },
      { label: '30ml', price: 50, inStock: true },
      { label: '50ml', price: 80, inStock: false },
      { label: 'Full Box', price: 175, inStock: true },
    ],
    image: IMG.p8,
    gallery: [IMG.p8, IMG.p12, IMG.p5],
    gender: 'Men',
    rating: 4.9,
    reviewCount: 833,
    isBestSeller: true,
    isNewArrival: false,
    tags: ['Fresh', 'Fruity', 'Woody'],
    season: 'All Season',
  },
  {
    id: 9,
    name: 'Mon Guerlain',
    brand: 'Guerlain',
    description: 'A declaration of love, an ode to freedom and femininity.',
    longDescription: "Mon Guerlain is a tender and deeply personal fragrance from Guerlain. The Lavender, Sambac Jasmine and Tahitian Vanilla notes create a warm, romantic fragrance that embodies femininity in all its forms.",
    topNotes: ['Bergamot', 'Lavender'],
    middleNotes: ['Sambac Jasmine', 'Lavender'],
    baseNotes: ['Sandalwood', 'Tahitian Vanilla'],
    sizes: [
      { label: '10ml', price: 8, inStock: true },
      { label: '15ml', price: 12, inStock: false },
      { label: '30ml', price: 23, inStock: true },
      { label: '50ml', price: 37, inStock: true },
      { label: 'Full Box', price: 78, inStock: true },
    ],
    image: IMG.p9,
    gallery: [IMG.p9, IMG.p2, IMG.p7],
    gender: 'Women',
    rating: 4.6,
    reviewCount: 312,
    isBestSeller: false,
    isNewArrival: true,
    tags: ['Floral', 'Gourmand', 'Feminine'],
    season: 'Spring / Autumn',
  },
  {
    id: 10,
    name: 'N°5',
    brand: 'Chanel',
    description: 'The timeless fragrance. An iconic masterpiece of femininity.',
    longDescription: "Chanel N°5 is one of the world's most iconic fragrances — a timeless masterpiece since 1921. An audacious blend of aldehydes, floral bouquets and warm base notes creates an incomparable signature that has defined femininity for generations.",
    topNotes: ['Aldehydes', 'Neroli', 'Ylang Ylang', 'Bergamot'],
    middleNotes: ['Rose', 'Jasmine', 'Lily of the Valley', 'Iris'],
    baseNotes: ['Civet', 'Oakmoss', 'Sandalwood', 'Vetiver', 'Musk'],
    sizes: [
      { label: '10ml', price: 12, inStock: true },
      { label: '15ml', price: 18, inStock: true },
      { label: '30ml', price: 35, inStock: true },
      { label: '50ml', price: 55, inStock: true },
      { label: 'Full Box', price: 120, inStock: false },
    ],
    image: IMG.p10,
    gallery: [IMG.p10, IMG.p7, IMG.p9],
    gender: 'Women',
    rating: 4.7,
    reviewCount: 1024,
    isBestSeller: true,
    isNewArrival: false,
    tags: ['Floral', 'Aldehyde', 'Classic'],
    season: 'All Season',
  },
  {
    id: 11,
    name: 'Chance Eau Tendre',
    brand: 'Chanel',
    description: 'A fresh, delicate and intensely romantic floral fragrance.',
    longDescription: "Chance Eau Tendre is a fresh and tender interpretation of the iconic Chance. This light, delicate Eau de Toilette combines grapefruit and quince notes with jasmine and iris for a bright, airy floral. A fragrance for those who dare to dream.",
    topNotes: ['Grapefruit', 'Quince'],
    middleNotes: ['Jasmine', 'Iris'],
    baseNotes: ['Musk', 'Virginian Cedar'],
    sizes: [
      { label: '10ml', price: 9, inStock: false },
      { label: '15ml', price: 14, inStock: true },
      { label: '30ml', price: 26, inStock: true },
      { label: '50ml', price: 42, inStock: true },
      { label: 'Full Box', price: 90, inStock: true },
    ],
    image: IMG.p11,
    gallery: [IMG.p11, IMG.p2, IMG.p9],
    gender: 'Women',
    rating: 4.5,
    reviewCount: 387,
    isBestSeller: false,
    isNewArrival: false,
    tags: ['Floral', 'Fresh', 'Delicate'],
    season: 'Spring / Summer',
  },
  {
    id: 12,
    name: 'Good Girl',
    brand: 'Carolina Herrera',
    description: 'Duality of femininity: a good girl with a dark side.',
    longDescription: "Good Girl by Carolina Herrera embodies feminine duality: the bright, optimistic woman who shows the world her good side and her more mysterious, darker nature. Almond and coffee top notes contrast with jasmine and tonka bean in this unforgettable feminine statement.",
    topNotes: ['Almond', 'Coffee'],
    middleNotes: ['Tuberose', 'Jasmine Sambac'],
    baseNotes: ['Tonka Bean', 'Cacao', 'Cashmere Wood'],
    sizes: [
      { label: '10ml', price: 9, inStock: true },
      { label: '15ml', price: 14, inStock: true },
      { label: '30ml', price: 26, inStock: false },
      { label: '50ml', price: 42, inStock: true },
      { label: 'Full Box', price: 88, inStock: true },
    ],
    image: IMG.p12,
    gallery: [IMG.p12, IMG.p6, IMG.p2],
    gender: 'Women',
    rating: 4.7,
    reviewCount: 445,
    isBestSeller: false,
    isNewArrival: true,
    tags: ['Floral', 'Gourmand', 'Sensual'],
    season: 'Autumn / Winter',
  },
];

export const reviews: Review[] = [
  {
    id: 1,
    name: 'Sopheap K.',
    avatar: 'SK',
    rating: 5,
    comment: 'The perfumes are 100% authentic and smell exactly like the originals. Fast delivery and beautiful packaging. I will order again!',
    date: 'May 2026',
    location: 'Phnom Penh',
  },
  {
    id: 2,
    name: 'Channary M.',
    avatar: 'CM',
    rating: 5,
    comment: 'Ordered Coco Mademoiselle in 30ml — it arrived within 2 days. The Telegram ordering process was so easy and friendly. 100% recommend!',
    date: 'Apr 2026',
    location: 'Siem Reap',
  },
  {
    id: 3,
    name: 'Dara S.',
    avatar: 'DS',
    rating: 5,
    comment: 'Best perfume shop in Cambodia. Got Tom Ford Oud Wood and Dior Sauvage. Both smell absolutely amazing. Very trustworthy seller.',
    date: 'Apr 2026',
    location: 'Phnom Penh',
  },
  {
    id: 4,
    name: 'Bopha T.',
    avatar: 'BT',
    rating: 5,
    comment: 'I love how I can browse all the perfumes with sizes and prices right on the website. Telegram ordering is very convenient. Great service!',
    date: 'Mar 2026',
    location: 'Kampong Cham',
  },
  {
    id: 5,
    name: 'Virak L.',
    avatar: 'VL',
    rating: 4,
    comment: 'Good quality, authentic scent. Packaging was neat and secure. Will come back for more.',
    date: 'Mar 2026',
    location: 'Battambang',
  },
];

export const brands = [
  { name: 'Chanel', count: 4 },
  { name: 'Dior', count: 2 },
  { name: 'Tom Ford', count: 2 },
  { name: 'Creed', count: 1 },
  { name: 'Lancôme', count: 1 },
  { name: 'Guerlain', count: 1 },
  { name: 'Carolina Herrera', count: 1 },
];

export const SIZE_OPTIONS: SizeOption[] = ['10ml', '15ml', '30ml', '50ml', 'Full Box'];
export const GENDER_OPTIONS: Gender[] = ['Women', 'Men', 'Unisex'];
