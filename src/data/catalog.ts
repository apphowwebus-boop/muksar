export type Audience = 'All' | 'Women' | 'Men' | 'Unisex';

export type ProductCategory =
  | 'All'
  | 'Tracksuits'
  | 'Seamless Sets'
  | 'Hoodies'
  | 'Compression'
  | 'Windbreakers'
  | 'Joggers'
  | 'Team Kits'
  | 'Active Sets';

export interface HeroSlide {
  id: string;
  indexLabel: string;
  audienceLabel: string;
  audienceFilter: Audience;
  headline: string;
  subtitle: string;
  ctaLabel: string;
  image: string;
  imageAlt: string;
  objectPosition: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: Exclude<ProductCategory, 'All'>;
  audience: Exclude<Audience, 'All'>;
  moq: number;
  colorway: string;
  swatchHex: string;
  secondaryHex: string;
  fabric: string;
  fit: string;
  sizes: string[];
  image: string;
  imageAlt: string;
  tag?: string;
  specs: string[];
  description: string;
}

export const BRAND_LOGO_URL = '/assets/aistudio/IMG-20261117-WA0032_e945cfd1.jpg';

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-women',
    indexLabel: '01 / Women',
    audienceLabel: 'Women Performance Division',
    audienceFilter: 'Women',
    headline: 'Engineered For Women In Motion',
    subtitle:
      'High-compression seamless sets and sculpted training silhouettes built in our own production lines with signature Muksar Sports durability.',
    ctaLabel: 'Shop Women',
    image: '/src/assets/images/hero_slide_women_1794935708559.jpg',
    imageAlt:
      'Female athlete model wearing black and crimson Muksar Sports performance bra and compression leggings',
    objectPosition: 'object-top',
  },
  {
    id: 'slide-men',
    indexLabel: '02 / Men',
    audienceLabel: 'Men Training & Combat Division',
    audienceFilter: 'Men',
    headline: 'Built For Heavy Output',
    subtitle:
      'Moisture-wicking raglan compression tees, reinforced flatlock seams, and breathable technical training shorts crafted for pro athletes.',
    ctaLabel: 'Shop Men',
    image: '/src/assets/images/hero_slide_men_1794935708818.jpg',
    imageAlt:
      'Male athlete model running in obsidian black, white, and red Muksar Sports compression shirt and shorts',
    objectPosition: 'object-center',
  },
  {
    id: 'slide-duo',
    indexLabel: '03 / Men & Women',
    audienceLabel: 'Unified Team & Street Drop',
    audienceFilter: 'All',
    headline: 'One Brand. Dual Dominance.',
    subtitle:
      'Coordinated men and women team tracksuits and heavyweight fleece hoodies—available ready-to-ship or custom manufactured for your club.',
    ctaLabel: 'Explore All Apparel',
    image: '/src/assets/images/hero_slide_duo_1794935710351.jpg',
    imageAlt:
      'Male and female models together wearing coordinated black, white, and crimson Muksar Sports tracksuits and hoodies',
    objectPosition: 'object-top',
  },
];

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  'All',
  'Tracksuits',
  'Seamless Sets',
  'Hoodies',
  'Compression',
  'Windbreakers',
  'Joggers',
  'Team Kits',
  'Active Sets',
];

export const PRODUCTS: Product[] = [
  {
    id: 'ms-ts-01',
    sku: 'MS-TS-240',
    name: 'Apex Paneled Pro Tracksuit',
    category: 'Tracksuits',
    audience: 'Men',
    moq: 50,
    colorway: 'Crimson / Jet Black',
    swatchHex: '#E10600',
    secondaryHex: '#0A0A0B',
    fabric: '260 GSM Poly-Spandex Tricot',
    fit: 'Athletic Tapered Fit',
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    image: '/src/assets/images/prod_tracksuit_crimson_1794935710151.jpg',
    imageAlt:
      'Male model wearing crimson red and black Muksar Sports full-zip tracksuit jacket and tapered pants',
    tag: 'Direct Factory',
    specs: [
      '4-way mechanical stretch interlock knit',
      'High-density embroidered Muksar Sports crest',
      'YKK matte black concealed zip pockets',
      'Contrast white piping with ribbed ankle cuffs',
    ],
    description:
      'Cut and sewn in our primary sportswear facility, the Apex Paneled Pro Tracksuit balances warm-up mobility with crisp street-ready structure.',
  },
  {
    id: 'ms-ws-02',
    sku: 'MS-WS-190',
    name: 'Sculpt Ribbed Seamless Set',
    category: 'Seamless Sets',
    audience: 'Women',
    moq: 50,
    colorway: 'Arctic Chalk / Red Trim',
    swatchHex: '#F3F2EE',
    secondaryHex: '#E10600',
    fabric: '280 GSM Nylon-Elastane Knit',
    fit: 'Second-Skin Compression',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    image: '/src/assets/images/prod_women_set_white_1794935711371.jpg',
    imageAlt:
      'Female athlete model wearing arctic white Muksar Sports seamless sports bra and biker shorts with red trim',
    tag: 'Best Seller',
    specs: [
      'Squat-proof high-density seamless circular knit',
      'Breathable micro-mesh chest ventilation zone',
      'Wide contoured high-rise waistband',
      'Heat-transferred Muksar Sports emblem',
    ],
    description:
      'Engineered on seamless circular knitting machines for zero side-seam chafing, pairing an arctic chalk finish with sharp black and red athletic binding.',
  },
  {
    id: 'ms-hd-03',
    sku: 'MS-HD-460',
    name: 'Heavyweight Boxy Fleece Hoodie',
    category: 'Hoodies',
    audience: 'Unisex',
    moq: 30,
    colorway: 'Washed Charcoal',
    swatchHex: '#3F4246',
    secondaryHex: '#FFFFFF',
    fabric: '460 GSM 100% Combed French Terry',
    fit: 'Oversized Drop-Shoulder',
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    image: '/src/assets/images/prod_hoodie_charcoal_1794935711787.jpg',
    imageAlt:
      'Male model wearing heavyweight washed charcoal Muksar Sports oversized athletic hoodie',
    tag: '460 GSM Heavy',
    specs: [
      'Pre-shrunk enzyme-washed organic cotton fleece',
      'Double-layered structured hood with no drawcord',
      'High-build puff & screen-printed chest mark',
      'Heavy 2x2 ribbed cuffs and hem',
    ],
    description:
      'Our heaviest streetwear-meets-gym staple. Built from 460 GSM brushed fleece with dropped shoulders and bold Muksar Sports chest branding.',
  },
  {
    id: 'ms-cp-04',
    sku: 'MS-CP-175',
    name: 'Tactical Raglan Compression Kit',
    category: 'Compression',
    audience: 'Men',
    moq: 50,
    colorway: 'Tactical Olive / Obsidian',
    swatchHex: '#465239',
    secondaryHex: '#0A0A0B',
    fabric: '185 GSM Dry-Fit Micro-Mesh',
    fit: 'Ergonomic Muscle Compression',
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    image: '/src/assets/images/prod_compression_olive_1794935712176.jpg',
    imageAlt:
      'Male model wearing deep olive and black raglan Muksar Sports compression shirt and 5-inch training shorts',
    specs: [
      'Rapid moisture-wicking antimicrobial yarn',
      'Chafe-free flatlock ergonomic shoulder seams',
      '5-inch 2-in-1 shorts with compression liner',
      'Reflective Muksar Sports heat-seal crest',
    ],
    description:
      'Designed for high-output conditioning and combat training. Tactical olive body panels combine with breathable black mesh raglan sleeves.',
  },
  {
    id: 'ms-wb-05',
    sku: 'MS-WB-110',
    name: 'Aero Ripstop Half-Zip Windbreaker',
    category: 'Windbreakers',
    audience: 'Women',
    moq: 40,
    colorway: 'Chalk White / Matte Black',
    swatchHex: '#E5E7EB',
    secondaryHex: '#111114',
    fabric: '110 GSM DWR Nylon Ripstop',
    fit: 'Relaxed Cropped Athletic',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    image: '/src/assets/images/prod_windbreaker_jacket_1794935712714.jpg',
    imageAlt:
      'Female model wearing two-tone white and black Muksar Sports half-zip windbreaker jacket and black leggings',
    tag: 'Water Repellent',
    specs: [
      'DWR water-repellent & wind-blocking nylon shell',
      'Contrast crimson waterproof center half-zip',
      'Internal mesh back vent for heat release',
      'Elasticated storm cuffs and bungee hem',
    ],
    description:
      'Two-tone outdoor running shell tailored for transitional weather, finished with a crimson waterproof zipper and crisp chest crest.',
  },
  {
    id: 'ms-jg-06',
    sku: 'MS-JG-380',
    name: 'Utility Fleece Cargo Joggers',
    category: 'Joggers',
    audience: 'Women',
    moq: 50,
    colorway: 'Heather Slate / Black',
    swatchHex: '#6B7280',
    secondaryHex: '#0A0A0B',
    fabric: '380 GSM Brushed Cotton Fleece',
    fit: 'Relaxed Tapered Jogger',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    image: '/src/assets/images/prod_joggers_slate_1794935714249.jpg',
    imageAlt:
      'Female model wearing heather slate grey Muksar Sports cargo joggers and black cropped tank top',
    specs: [
      'Gusseted side cargo pockets with hidden snaps',
      'Triple-stitched elasticated drawcord waistband',
      'Paired with ribbed Muksar Sports cropped tank',
      'Zero-pilling ring-spun fleece construction',
    ],
    description:
      'Street-sport cargo joggers engineered with 380 GSM brushed fleece for post-session warmth and everyday utility styling.',
  },
  {
    id: 'ms-jk-07',
    sku: 'MS-JK-150',
    name: 'Velocity Sublimated Team Kit',
    category: 'Team Kits',
    audience: 'Men',
    moq: 25,
    colorway: 'Midnight Navy / Crimson',
    swatchHex: '#1E293B',
    secondaryHex: '#E10600',
    fabric: '155 GSM Jacquard Honeycomb Mesh',
    fit: 'Pro Match Cut',
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    image: '/src/assets/images/prod_jersey_teamkit_1794935715313.jpg',
    imageAlt:
      'Male athlete model wearing midnight navy and crimson geometric sublimated Muksar Sports match jersey and shorts',
    tag: 'Custom Teamwear',
    specs: [
      'Full-bleed permanent dye sublimation (zero fade)',
      'Custom club crests, player names & numbers ready',
      'Breathable jacquard honeycomb airflow mesh',
      'Reinforced contrast rib-knit V-neck collar',
    ],
    description:
      'Our flagship teamwear kit for football clubs, academies, and corporate leagues. Built for full custom sublimation and rapid bulk dispatch.',
  },
  {
    id: 'ms-as-08',
    sku: 'MS-AS-230',
    name: 'Studio Halter & Flared Legging Set',
    category: 'Active Sets',
    audience: 'Women',
    moq: 50,
    colorway: 'Crimson Red / Onyx Black',
    swatchHex: '#B91C1C',
    secondaryHex: '#0A0A0B',
    fabric: '240 GSM Brushed Matte Interlock',
    fit: 'Sculpted Studio Flare',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    image: '/src/assets/images/prod_tank_flared_set_1794935717621.jpg',
    imageAlt:
      'Female athlete model wearing crimson red Muksar Sports cropped halter tank and black flared studio leggings',
    specs: [
      'Buttery soft double-brushed interlock compression',
      'Supportive racerback halter top with removable pads',
      'High-waisted flared leg silhouette',
      'Centered Muksar Sports waistband & chest branding',
    ],
    description:
      'Designed for Pilates, studio conditioning, and elevated athleisure—combining our signature crimson top with a sculpted matte black flared leg.',
  },
];

export const SIZE_CHART_ROWS = [
  { size: 'XS', chest: '33 - 35"', waist: '25 - 27"', hip: '34 - 36"', length: '26.0"' },
  { size: 'S', chest: '36 - 38"', waist: '28 - 30"', hip: '37 - 39"', length: '27.0"' },
  { size: 'M', chest: '39 - 41"', waist: '31 - 33"', hip: '40 - 42"', length: '28.0"' },
  { size: 'L', chest: '42 - 44"', waist: '34 - 36"', hip: '43 - 45"', length: '29.0"' },
  { size: 'XL', chest: '45 - 48"', waist: '37 - 40"', hip: '46 - 48"', length: '30.0"' },
  { size: '2XL', chest: '49 - 52"', waist: '41 - 44"', hip: '49 - 52"', length: '31.0"' },
];
