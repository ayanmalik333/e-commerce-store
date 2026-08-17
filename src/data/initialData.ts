import { Product, Category, BlogPost, Order, Inquiry } from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    name: 'Linen & Textiles',
    slug: 'linen-textiles',
    description: 'Woven from 100% organic European flax for raw, tactile elegance.',
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80',
    itemCount: 4,
  },
  {
    id: 'cat-2',
    name: 'Ceramics & Stoneware',
    slug: 'ceramics-stoneware',
    description: 'Hand-thrown stoneware vessels with subtle natural matte glazes.',
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80',
    itemCount: 5,
  },
  {
    id: 'cat-3',
    name: 'Home Fragrance & Living',
    slug: 'home-fragrance',
    description: 'Botanical soy candles and essential clay diffusers for calm spaces.',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80',
    itemCount: 3,
  },
  {
    id: 'cat-4',
    name: 'Wooden Tableware',
    slug: 'wooden-tableware',
    description: 'Sustainably harvested teak and walnut serveware finished with organic wax.',
    image: 'https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=800&q=80',
    itemCount: 3,
  },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Artisanal Clay Water Carafe & Tumbler',
    category: 'Ceramics & Stoneware',
    price: 88,
    originalPrice: 110,
    description: 'Handcrafted by master potters using natural terra clays from southern Portugal. Unglazed exterior gives a warm tactile finish while food-safe glazed interior keeps beverages naturally cool.',
    shortDescription: 'Unrefined terra clay carafe set with matching hand-turned drinking cup.',
    specs: {
      'Material': 'Natural Terra Clay',
      'Capacity': '1.2 Liters',
      'Dimensions': '24cm x 12cm',
      'Care': 'Hand wash with mild soap',
      'Origin': 'Made in Portugal'
    },
    rating: 4.9,
    reviewCount: 42,
    images: [
      'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1000&q=80',
    ],
    isFeatured: true,
    sequenceOrder: 1,
    stock: 18,
    inStock: true,
    tags: ['Best Seller', 'Handmade', 'Earthy'],
  },
  {
    id: 'prod-2',
    name: 'Organic Stoneware Ribbed Teapot',
    category: 'Ceramics & Stoneware',
    price: 95,
    originalPrice: 120,
    description: 'Minimalist stoneware teapot featuring subtle fluted ribs and a solid wooden handle. Comes with a removable fine stainless steel infuser for whole-leaf botanical teas.',
    shortDescription: 'Fluted ceramic tea vessel with steam vent wooden lid knob.',
    specs: {
      'Material': 'Speckled Stoneware & Teak Wood',
      'Capacity': '850 ml',
      'Infuser': 'Removable 304 Stainless Steel',
      'Origin': 'Kyoto, Japan'
    },
    rating: 5.0,
    reviewCount: 29,
    images: [
      'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1000&q=80',
    ],
    isFeatured: true,
    sequenceOrder: 2,
    stock: 12,
    inStock: true,
    tags: ['Featured', 'Artisanal'],
  },
  {
    id: 'prod-3',
    name: 'Washed Pure Linen Throw Blanket - Oatmeal',
    category: 'Linen & Textiles',
    price: 135,
    originalPrice: 150,
    description: 'Stone-washed European flax linen throw blanket in an earthy oatmeal tone. Ultra-soft, breathable, and pre-shrunk for effortless drape over sofa or bed.',
    shortDescription: '100% French flax linen throw with delicate eyelash fringe trim.',
    specs: {
      'Material': '100% French Flax Linen (220 GSM)',
      'Dimensions': '140cm x 200cm',
      'Care': 'Machine wash cold, tumble dry low',
      'Certifications': 'OEKO-TEX Standard 100'
    },
    rating: 4.8,
    reviewCount: 68,
    images: [
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80',
    ],
    isFeatured: true,
    sequenceOrder: 3,
    stock: 25,
    inStock: true,
    tags: ['Cozy Essential', 'Sustainable'],
  },
  {
    id: 'prod-4',
    name: 'Wild Cypress & Amber Botanical Soy Candle',
    category: 'Home Fragrance & Living',
    price: 42,
    description: 'Hand-poured 100% soy wax candle in a custom textured ceramic bowl. Fragranced with pure cypress, smoked amber, vetiver, and subtle cedarwood notes.',
    shortDescription: 'Poured in re-usable ceramic pot with crackling wooden wick.',
    specs: {
      'Wax': '100% U.S. Grown Soy Wax',
      'Burn Time': '60 Hours',
      'Weight': '320g / 11.2 oz',
      'Container': 'Hand-carved reusable ceramic jar'
    },
    rating: 4.9,
    reviewCount: 54,
    images: [
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80',
    ],
    isFeatured: true,
    sequenceOrder: 4,
    stock: 30,
    inStock: true,
    tags: ['Aromatherapy', 'Hand-Poured'],
  },
  {
    id: 'prod-5',
    name: 'Solid Walnut Carved Salad Bowls & Servers',
    category: 'Wooden Tableware',
    price: 110,
    originalPrice: 130,
    description: 'Carved from a single block of sustainably managed black walnut. Finished with natural beeswax and organic olive oil to highlight rich natural wood grain.',
    shortDescription: 'Deep heirloom walnut salad bowl with two ergonomic serving hands.',
    specs: {
      'Wood': 'American Black Walnut',
      'Diameter': '30cm Bowl',
      'Finish': 'Food-Grade Beeswax & Walnut Oil',
      'Crafting': 'Hand-turned in Oregon, USA'
    },
    rating: 4.7,
    reviewCount: 31,
    images: [
      'https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1615865417236-d67f189d7866?auto=format&fit=crop&w=1000&q=80',
    ],
    isFeatured: true,
    sequenceOrder: 5,
    stock: 10,
    inStock: true,
    tags: ['Organic', 'Heirloom Quality'],
  },
  {
    id: 'prod-6',
    name: 'Textured Stoneware Dinnerware Set (12-Piece)',
    category: 'Ceramics & Stoneware',
    price: 245,
    originalPrice: 280,
    description: 'Complete 12-piece artisanal dining set including 4 dinner plates, 4 salad plates, and 4 wide pasta bowls in our signature warm cream matte glaze.',
    shortDescription: 'Rustic organic rim stoneware dining set for four place settings.',
    specs: {
      'Includes': '4x Dinner (27cm), 4x Salad (21cm), 4x Bowls (18cm)',
      'Care': 'Dishwasher and Microwave safe',
      'Glaze': 'Non-toxic, lead-free silk matte'
    },
    rating: 4.9,
    reviewCount: 88,
    images: [
      'https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1565183997392-2f6f122e5912?auto=format&fit=crop&w=1000&q=80',
    ],
    isFeatured: false,
    sequenceOrder: 6,
    stock: 15,
    inStock: true,
    tags: ['Dining', 'Set'],
  },
  {
    id: 'prod-7',
    name: 'Artisan Raw Linen Cross-Back Apron',
    category: 'Linen & Textiles',
    price: 65,
    description: 'Japanese-style Japanese cross-back apron crafted from heavyweight 100% natural linen. No ties, no buckles—just effortless slip-on comfort with deep front patch pockets.',
    shortDescription: 'Ergonomic cross-back apron in warm olive or natural taupe linen.',
    specs: {
      'Fabric': '100% Unbleached Heavy Linen (260 GSM)',
      'Style': 'Japanese Ergonomic Cross-Back',
      'Pockets': '2 Oversized Front Utility Pockets',
      'Size': 'One Size Fits Most (Unisex)'
    },
    rating: 4.8,
    reviewCount: 45,
    images: [
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1000&q=80',
    ],
    isFeatured: false,
    sequenceOrder: 7,
    stock: 22,
    inStock: true,
    tags: ['Kitchen', 'Unisex'],
  },
  {
    id: 'prod-8',
    name: 'Passive Terracotta Essential Oil Aroma Stone',
    category: 'Home Fragrance & Living',
    price: 34,
    description: 'Electricity-free diffuser disk crafted from porous red clay. Simply add 3-5 drops of pure essential oil onto the stone to naturally diffuse soft aromas in cozy corners.',
    shortDescription: 'Heat-free porous clay diffuser stone with brass tray dish.',
    specs: {
      'Material': 'Raw Porous Terracotta & Solid Brass',
      'Dimensions': '10cm diameter disk',
      'Includes': '10ml Cypress Wood Pure Essential Oil'
    },
    rating: 4.6,
    reviewCount: 19,
    images: [
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1000&q=80',
    ],
    isFeatured: false,
    sequenceOrder: 8,
    stock: 40,
    inStock: true,
    tags: ['Aroma', 'Zero-Electricity'],
  }
];

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'The Art of Slow Living: Curating Earthy Spaces',
    slug: 'art-of-slow-living-earthy-spaces',
    excerpt: 'How tactile raw linen, unglazed clay ceramics, and organic wood textures bring grounding tranquility to modern home sanctuaries.',
    content: `
# The Philosophy of Earthy Interior Living

In an increasingly digitized world, our physical living environments serve as vital sanctuaries of tactile reset. Surrounding ourselves with unrefined, organic materials—such as stone-washed flax linen, raw terra-cotta, and solid hand-turned wood—reconnects our senses to natural rhythms.

## 1. Prioritize Tactile Authenticity
When selecting pieces for your home, pay attention to how materials feel underfoot and against fingertips. Synthetic fibers and mass-produced plastic surfaces reflect harsh light and cold temperatures. Conversely, **pure washed linen** absorbs noise, drapes softly, and matures in elegance with every wash cycle.

## 2. Embrace Imperfection (Wabi-Sabi)
Artisanal pottery features natural variations in grain, subtle thrown ridges, and tone shifts. These subtle anomalies are not defects; they are authentic markers of human craftsmanship. Displaying a hand-carved clay water carafe or fluted stoneware teapot introduces warmth that machine-stamped items can never replicate.

## 3. Light, Shadow, and Warm Neutrals
Opt for background palettes of warm linen (#FDFBF7), soft taupe, and deep espresso. Allow natural sunlight to filter softly through sheer linen drapes, casting gentle shadows across raw ceramic surfaces.
    `,
    category: 'Interior & Design',
    readTime: '4 min read',
    date: 'August 2, 2026',
    author: 'Evelyn Vane, Creative Director',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80',
    recommendedProductIds: ['prod-1', 'prod-3', 'prod-4'],
    metaTitle: 'The Art of Slow Living & Earthy Interior Design | Terra & Linen',
    metaDescription: 'Discover how tactile raw linen, organic stoneware ceramics, and natural wood bring grounding serenity to modern home sanctuaries.'
  },
  {
    id: 'blog-2',
    title: 'Caring for Organic Linen: A Complete Longevity Guide',
    slug: 'caring-for-organic-linen-guide',
    excerpt: 'Essential laundering techniques, natural softening tips, and storage secrets to preserve French flax textiles for generations.',
    content: `
# Preserving the Softness of French Flax Linen

French flax linen is renowned for its remarkable tensile strength and natural breathability. Unlike synthetic fabrics that degrade over time, high-grade linen becomes noticeably softer and more supple with every gentle wash.

## Wash Cold with Gentle Botanicals
Always wash your linen throw blankets, table runners, and aprons in cool or lukewarm water (below 30°C / 86°F). Use mild, pH-balanced liquid soaps free from artificial optical brighteners or harsh bleach.

## Avoid Harsh Heat Drying
Whenever possible, line-dry your linen in shaded outdoor breezes or tumble-dry on the lowest air-fluff setting. High dryer heat damages flax fibers, causing brittle stiffness.

## Embrace Natural Wrinkles
The beauty of washed linen lies in its relaxed, rumpled texture. Avoid rigid ironing; instead, steam lightly while slightly damp if desired.
    `,
    category: 'Craftsmanship & Care',
    readTime: '3 min read',
    date: 'July 28, 2026',
    author: 'Julian Mercer, Master Weaver',
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1000&q=80',
    recommendedProductIds: ['prod-3', 'prod-7'],
    metaTitle: 'Organic Linen Care & Maintenance Guide | Terra & Linen',
    metaDescription: 'Learn expert tips for laundering, line-drying, and softening French flax linen throw blankets, aprons, and home textiles.'
  },
  {
    id: 'blog-3',
    title: 'From Mud to Vessel: The Journey of Portuguese Stoneware',
    slug: 'journey-of-portuguese-stoneware',
    excerpt: 'Step inside our partner atelier in Sintra, Portugal, where raw clay is transformed through ancient wheel-turning and high-fire kilns.',
    content: `
# The Pottery Ateliers of Sintra

Nestled between foggy pine forests and Atlantic coastal cliffs, the pottery traditions of southern Portugal span centuries of heritage. Each vessel at Terra & Linen begins as native terra clay sourced from local mineral pits.

## Hand-Wheeled Precision
Every clay carafe, mug, and dinner plate is hand-thrown on traditional electric and kick wheels. Master potters shape the profile by ear and memory, relying on decadal muscle rhythm to maintain consistency while leaving subtle finger grooves along the body.

## High-Temperature Bisque Firing
After air-drying under shady linen sheets for seven days, pieces undergo an initial bisque fire at 980°C, followed by hand-dipping into custom mineral glazes made from pulverized feldspar and ash. A final fire at 1,280°C seals the glaze into non-porous, food-safe perfection.
    `,
    category: 'Artisan Heritage',
    readTime: '5 min read',
    date: 'July 15, 2026',
    author: 'Clara Santos, Lead Ceramicist',
    image: 'https://images.unsplash.com/photo-1565183997392-2f6f122e5912?auto=format&fit=crop&w=1000&q=80',
    recommendedProductIds: ['prod-1', 'prod-2', 'prod-6'],
    metaTitle: 'Handcrafted Portuguese Stoneware Pottery | Terra & Linen',
    metaDescription: 'Explore how master ceramicists in Sintra, Portugal shape native terra clay into high-fire water carafes, teapots, and dinnerware.'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-9481',
    customerName: 'Sophia Montgomery',
    phone: '+1 (555) 234-5678',
    email: 'sophia.m@example.com',
    shippingAddress: '742 Evergreen Terrace, Apt 4B',
    city: 'Portland, OR',
    orderNotes: 'Please leave package near back patio porch door.',
    paymentMethod: 'Cash on Delivery',
    items: [
      {
        productId: 'prod-1',
        productName: 'Artisanal Clay Water Carafe & Tumbler',
        price: 88,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=400&q=80',
      },
      {
        productId: 'prod-4',
        productName: 'Wild Cypress & Amber Botanical Soy Candle',
        price: 42,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=400&q=80',
      }
    ],
    totalAmount: 172,
    orderDate: '2026-08-08 14:22',
    status: 'Processing',
  },
  {
    id: 'ORD-9482',
    customerName: 'Marcus Sterling',
    phone: '+1 (555) 876-5432',
    email: 'm.sterling@example.com',
    shippingAddress: '120 Ocean View Drive',
    city: 'Santa Barbara, CA',
    orderNotes: 'Call upon arrival.',
    paymentMethod: 'Cash on Delivery',
    items: [
      {
        productId: 'prod-3',
        productName: 'Washed Pure Linen Throw Blanket - Oatmeal',
        price: 135,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=400&q=80',
      }
    ],
    totalAmount: 135,
    orderDate: '2026-08-09 09:15',
    status: 'Pending',
  }
];

export const INITIAL_INQUIRIES: Inquiry[] = [
  {
    id: 'INQ-101',
    name: 'Elena Rostova',
    email: 'elena@designstudio.com',
    phone: '+1 (555) 432-1098',
    subject: 'Wholesale & Interior Design Trade Inquiry',
    message: 'Hello Terra & Linen team! I am an interior designer based in San Francisco curating a luxury boutique hotel project. We would love to order 30x Linen Throw Blankets and custom clay carafes. Do you offer trade pricing?',
    date: '2026-08-07 11:30',
    status: 'Unread',
  },
  {
    id: 'INQ-102',
    name: 'David Hayes',
    email: 'dhayes@example.com',
    phone: '+1 (555) 321-7654',
    subject: 'Question regarding custom wooden bowl sizes',
    message: 'Greetings. I am interested in the solid walnut salad bowl set. Is it possible to request custom engraving on the underside for a wedding gift?',
    date: '2026-08-05 16:40',
    status: 'Read',
  }
];
