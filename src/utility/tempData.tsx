import DemoImage from '@assets/images/hood.png';
import { Image } from 'react-native';

const image = Image.resolveAssetSource(DemoImage).uri;

export const products = [
  {
    id: 1,
    title: 'Nike Sportswear Club Hoodie',
    price: 89,
    image:
      'http://localhost:8081/assets/src/assets/images/hood.png?platform=ios&hash=d1623f0f0cd394eedaf9156afc11dfb0',
    brand: 'nike',
    description:
      'A classic staple combining soft fleece with a simple, street-ready style.',
    totalRating: 4.8,
    reviewCount: 154,
    size: { s: 87, m: 37, l: 8, xl: 56 },
    reviews: [
      {
        user: 'Alex M.',
        rating: 5,
        comment: 'Super soft inside and fits perfectly.',
        date: '2024-02-12',
      },
      {
        user: 'Jordan P.',
        rating: 4,
        comment: 'Classic Nike quality. Slightly long in the sleeves.',
        date: '2024-01-05',
      },
    ],
  },
  {
    id: 2,
    title: 'Adidas Cotton Training T-Shirt',
    price: 79,
    image:
      'http://localhost:8081/assets/src/assets/images/hood.png?platform=ios&hash=d1623f0f0cd394eedaf9156afc11dfb0',
    brand: 'adidas',
    description:
      'Breathable cotton tee designed to keep you cool during intense gym sessions.',
    totalRating: 4.5,
    reviewCount: 92,
    size: { s: 87, m: 37, l: 80, xl: 56 },
    reviews: [
      {
        user: 'Sarah L.',
        rating: 5,
        comment: "Great for workouts, doesn't shrink in the wash.",
        date: '2024-03-01',
      },
    ],
  },
  {
    id: 3,
    title: 'Puma Active Sports Jacket',
    price: 95,
    image:
      'http://localhost:8081/assets/src/assets/images/hood.png?platform=ios&hash=d1623f0f0cd394eedaf9156afc11dfb0',
    brand: 'puma',
    description:
      'Lightweight windbreaker featuring moisture-wicking technology for outdoor runs.',
    totalRating: 4.2,
    reviewCount: 61,
    size: { s: 87, m: 37, l: 8, xl: 56 },
    reviews: [
      {
        user: 'Mike R.',
        rating: 4,
        comment: 'Stylish and keeps the wind out. A bit noisy.',
        date: '2024-02-20',
      },
    ],
  },
  {
    id: 4,
    title: 'Levis Casual Denim Shirt',
    price: 92,
    image:
      'http://localhost:8081/assets/src/assets/images/hood.png?platform=ios&hash=d1623f0f0cd394eedaf9156afc11dfb0',
    brand: 'levis',
    description:
      'Timeless denim craftsmanship with a modern, tailored silhouette.',
    totalRating: 4.9,
    reviewCount: 210,
    size: { s: 87, m: 37, l: 18, xl: 56 },
    reviews: [
      {
        user: 'Chris T.',
        rating: 5,
        comment: 'Authentic feel, goes with everything.',
        date: '2024-01-15',
      },
    ],
  },
  {
    id: 5,
    title: 'Allen Solly Slim Fit Formal Shirt',
    price: 88,
    image:
      'http://localhost:8081/assets/src/assets/images/hood.png?platform=ios&hash=d1623f0f0cd394eedaf9156afc11dfb0',
    brand: 'allen solly',
    description: 'Sharp, sophisticated look for the modern professional.',
    totalRating: 4.6,
    reviewCount: 78,
    size: { s: 87, m: 37, l: 8, xl: 56 },
    reviews: [
      {
        user: 'David W.',
        rating: 5,
        comment: 'The slim fit is perfect for my build.',
        date: '2024-02-28',
      },
    ],
  },
  {
    id: 6,
    title: 'Peter England Office Wear Shirt',
    price: 83,
    image:
      'http://localhost:8081/assets/src/assets/images/hood.png?platform=ios&hash=d1623f0f0cd394eedaf9156afc11dfb0',
    brand: 'peter england',
    description:
      'Durable, easy-to-iron fabric designed for the daily 9-to-5 grind.',
    totalRating: 3.9,
    reviewCount: 45,
    size: { s: 87, m: 37, l: 8, xl: 56 },
    reviews: [
      {
        user: 'Kevin G.',
        rating: 3,
        comment: 'Decent shirt, but wrinkles easily.',
        date: '2024-03-10',
      },
    ],
  },
  {
    id: 7,
    title: 'Snitch Streetwear Oversized Tee',
    price: 72,
    image:
      'http://localhost:8081/assets/src/assets/images/hood.png?platform=ios&hash=d1623f0f0cd394eedaf9156afc11dfb0',
    brand: 'snitch',
    description:
      'Drop-shoulder aesthetic for the ultimate urban streetwear look.',
    totalRating: 4.7,
    reviewCount: 189,
    size: { s: 87, m: 37, l: 8, xl: 56 },
    reviews: [
      {
        user: 'Leo X.',
        rating: 5,
        comment: 'The oversized fit is exactly what I wanted.',
        date: '2024-02-05',
      },
    ],
  },
  {
    id: 8,
    title: 'Nike Running Performance Jacket',
    price: 97,
    image:
      'http://localhost:8081/assets/src/assets/images/hood.png?platform=ios&hash=d1623f0f0cd394eedaf9156afc11dfb0',
    brand: 'nike',
    description:
      'Weather-resistant shell with reflective elements for night visibility.',
    totalRating: 4.9,
    reviewCount: 84,
    size: { s: 87, m: 7, l: 98, xl: 56 },
    reviews: [
      {
        user: 'Ryan B.',
        rating: 5,
        comment: 'Worth every penny for winter runs.',
        date: '2024-01-22',
      },
    ],
  },
  {
    id: 9,
    title: 'Adidas Essentials Cotton Hoodie',
    price: 91,
    image:
      'http://localhost:8081/assets/src/assets/images/hood.png?platform=ios&hash=d1623f0f0cd394eedaf9156afc11dfb0',
    brand: 'adidas',
    description:
      'The iconic three-stripe design in a cozy, heavy-weight cotton blend.',
    totalRating: 4.4,
    reviewCount: 112,
    size: { s: 87, m: 7, l: 98, xl: 56 },
    reviews: [
      {
        user: 'Emma S.',
        rating: 4,
        comment: 'Very warm and high quality.',
        date: '2024-02-14',
      },
    ],
  },
  {
    id: 10,
    size: { s: 87, m: 7, l: 98, xl: 56 },
    title: 'Puma Classic Training Sweatshirt',
    price: 85,
    image:
      'http://localhost:8081/assets/src/assets/images/hood.png?platform=ios&hash=d1623f0f0cd394eedaf9156afc11dfb0',
    brand: 'puma',
    description:
      'Minimalist design with a focus on range of motion and comfort.',
    totalRating: 4.1,
    reviewCount: 56,
    reviews: [
      {
        user: 'Tom H.',
        rating: 4,
        comment: 'Good mid-layer for autumn.',
        date: '2024-03-05',
      },
    ],
  },
  {
    id: 11,
    title: 'Levis Regular Fit Polo Shirt',
    size: { s: 87, m: 7, l: 98, xl: 56 },
    price: 74,
    image:
      'http://localhost:8081/assets/src/assets/images/hood.png?platform=ios&hash=d1623f0f0cd394eedaf9156afc11dfb0',
    brand: 'levis',
    description:
      'Versatile polo that transitions easily from the golf course to dinner.',
    totalRating: 4.3,
    reviewCount: 95,
    reviews: [
      {
        user: 'James D.',
        rating: 4,
        comment: "Solid polo, colors don't fade.",
        date: '2024-02-11',
      },
    ],
  },
  {
    id: 12,
    title: 'Allen Solly Casual Weekend Shirt',
    price: 78,
    size: { s: 87, m: 7, l: 98, xl: 56 },
    image:
      'http://localhost:8081/assets/src/assets/images/hood.png?platform=ios&hash=d1623f0f0cd394eedaf9156afc11dfb0',
    brand: 'allen solly',
    description: 'Relaxed fabrics and playful patterns for your time off.',
    totalRating: 4.5,
    reviewCount: 67,
    reviews: [
      {
        user: 'Liam W.',
        rating: 5,
        comment: 'Great weekend vibe.',
        date: '2024-01-30',
      },
    ],
  },
  {
    id: 13,
    title: 'Peter England Smart Formal Shirt',
    price: 96,
    size: { s: 87, m: 7, l: 98, xl: 56 },
    image:
      'http://localhost:8081/assets/src/assets/images/hood.png?platform=ios&hash=d1623f0f0cd394eedaf9156afc11dfb0',
    brand: 'peter england',
    description: 'Premium cotton finish for high-stakes meetings and events.',
    totalRating: 4.8,
    reviewCount: 120,
    reviews: [
      {
        user: 'Robert K.',
        rating: 5,
        comment: 'Premium feel, very impressive.',
        date: '2024-03-02',
      },
    ],
  },
  {
    id: 14,
    title: 'Snitch Printed Streetwear Shirt',
    price: 69,
    size: { s: 87, m: 7, l: 98, xl: 56 },
    image:
      'http://localhost:8081/assets/src/assets/images/hood.png?platform=ios&hash=d1623f0f0cd394eedaf9156afc11dfb0',
    brand: 'snitch',
    description:
      'Bold graphics and edgy prints to make a statement in the crowd.',
    totalRating: 4.0,
    reviewCount: 88,
    reviews: [
      {
        user: 'Zane L.',
        rating: 4,
        comment: 'Cool print, fabric is a bit thin.',
        date: '2024-02-18',
      },
    ],
  },
  {
    id: 15,
    title: 'Nike Flex Training T-Shirt',
    price: 73,
    size: { s: 87, m: 7, l: 98, xl: 56 },
    image:
      'http://localhost:8081/assets/src/assets/images/hood.png?platform=ios&hash=d1623f0f0cd394eedaf9156afc11dfb0',
    brand: 'nike',
    description: 'Highly stretchable fabric that moves with your body.',
    totalRating: 4.7,
    reviewCount: 143,
    reviews: [
      {
        user: 'Ben S.',
        rating: 5,
        comment: 'Stretchy and stays dry.',
        date: '2024-01-10',
      },
    ],
  },
  {
    id: 16,
    title: 'Adidas Running Club Tee',
    price: 90,
    size: { s: 87, m: 7, l: 98, xl: 56 },
    image:
      'http://localhost:8081/assets/src/assets/images/hood.png?platform=ios&hash=d1623f0f0cd394eedaf9156afc11dfb0',
    brand: 'adidas',
    description: 'Lightweight tech-fabric with AEROREADY moisture management.',
    totalRating: 4.6,
    reviewCount: 77,
    reviews: [
      {
        user: 'Claire O.',
        rating: 5,
        comment: 'Wicks sweat perfectly.',
        date: '2024-03-04',
      },
    ],
  },
  {
    id: 17,
    size: { s: 87, m: 7, l: 98, xl: 56 },
    title: 'Puma Training Gym T-Shirt',
    price: 86,
    image:
      'http://localhost:8081/assets/src/assets/images/hood.png?platform=ios&hash=d1623f0f0cd394eedaf9156afc11dfb0',
    brand: 'puma',
    description: 'Ergonomic cut lines for effortless movement during training.',
    totalRating: 4.4,
    reviewCount: 52,
    reviews: [
      {
        user: 'Victor P.',
        rating: 4,
        comment: 'Good athletic fit.',
        date: '2024-02-25',
      },
    ],
  },
  {
    id: 18,
    title: 'Levis Classic Cotton Shirt',
    price: 93,
    size: { s: 87, m: 7, l: 98, xl: 56 },
    image:
      'http://localhost:8081/assets/src/assets/images/hood.png?platform=ios&hash=d1623f0f0cd394eedaf9156afc11dfb0',
    brand: 'levis',
    description: 'The fundamental button-down every wardrobe needs.',
    totalRating: 4.8,
    reviewCount: 165,
    reviews: [
      {
        user: 'Nate G.',
        rating: 5,
        comment: 'Total classic. Durable.',
        date: '2024-01-20',
      },
    ],
  },
  {
    id: 19,
    title: 'Allen Solly Formal Slim Shirt',
    price: 87,
    size: { s: 87, m: 7, l: 98, xl: 56 },
    image:
      'http://localhost:8081/assets/src/assets/images/hood.png?platform=ios&hash=d1623f0f0cd394eedaf9156afc11dfb0',
    brand: 'allen solly',
    description: 'Contoured fit that provides a sharp, modern silhouette.',
    totalRating: 4.5,
    reviewCount: 81,
    reviews: [
      {
        user: 'Henry B.',
        rating: 4,
        comment: 'Very sharp look for weddings.',
        date: '2024-03-07',
      },
    ],
  },
  {
    id: 20,
    size: { s: 87, m: 7, l: 98, xl: 56 },
    title: 'Peter England Office Cotton Shirt',
    price: 80,
    image:
      'http://localhost:8081/assets/src/assets/images/hood.png?platform=ios&hash=d1623f0f0cd394eedaf9156afc11dfb0',
    brand: 'peter england',
    description: 'Soft-touch cotton that stays comfortable all day long.',
    totalRating: 4.2,
    reviewCount: 94,
    reviews: [
      {
        user: 'Aaron F.',
        rating: 4,
        comment: 'Breathable and comfy.',
        date: '2024-02-14',
      },
    ],
  },
  {
    id: 21,
    size: { s: 87, m: 7, l: 98, xl: 56 },
    title: 'Snitch Modern Street Hoodie',
    price: 94,
    image:
      'http://localhost:8081/assets/src/assets/images/hood.png?platform=ios&hash=d1623f0f0cd394eedaf9156afc11dfb0',
    brand: 'snitch',
    description: 'Heavyweight fabric with a contemporary boxy fit.',
    totalRating: 4.9,
    reviewCount: 204,
    reviews: [
      {
        user: 'Kaleb W.',
        rating: 5,
        comment: 'The heaviest hoodie I own. Love it.',
        date: '2024-01-11',
      },
    ],
  },
  {
    id: 22,
    title: 'Nike Dri-Fit Performance Tee',
    price: 76,
    size: { s: 87, m: 7, l: 98, xl: 56 },
    image:
      'http://localhost:8081/assets/src/assets/images/hood.png?platform=ios&hash=d1623f0f0cd394eedaf9156afc11dfb0',
    brand: 'nike',
    description: 'Signature sweat-wicking technology for dry comfort.',
    totalRating: 4.7,
    reviewCount: 130,
    reviews: [
      {
        user: 'John D.',
        rating: 5,
        comment: 'Best performance tee.',
        date: '2024-02-09',
      },
    ],
  },
  {
    id: 23,
    size: { s: 87, m: 7, l: 98, xl: 56 },
    title: 'Adidas Originals Casual Hoodie',
    price: 98,
    image:
      'http://localhost:8081/assets/src/assets/images/hood.png?platform=ios&hash=d1623f0f0cd394eedaf9156afc11dfb0',
    brand: 'adidas',
    description: 'Retro-inspired design with the iconic Trefoil logo.',
    totalRating: 4.8,
    reviewCount: 156,
    reviews: [
      {
        user: 'Marcus T.',
        rating: 5,
        comment: 'Legendary style and comfort.',
        date: '2024-03-01',
      },
    ],
  },
  {
    id: 24,
    size: { s: 87, m: 7, l: 98, xl: 56 },
    title: 'Puma Street Style Hoodie',
    price: 84,
    image:
      'http://localhost:8081/assets/src/assets/images/hood.png?platform=ios&hash=d1623f0f0cd394eedaf9156afc11dfb0',
    brand: 'puma',
    description: 'Bold branding and a cozy fleece interior for everyday wear.',
    totalRating: 4.3,
    reviewCount: 44,
    reviews: [
      {
        user: 'Sami J.',
        rating: 4,
        comment: 'Cool design, runs a bit small.',
        date: '2024-02-22',
      },
    ],
  },
  {
    id: 25,
    size: { s: 87, m: 7, l: 98, xl: 56 },
    title: 'Levis Classic Denim Jacket',
    price: 99,
    image:
      'http://localhost:8081/assets/src/assets/images/hood.png?platform=ios&hash=d1623f0f0cd394eedaf9156afc11dfb0',
    brand: 'levis',
    description: 'The original denim jacket since 1967. A true icon.',
    totalRating: 5.0,
    reviewCount: 312,
    reviews: [
      {
        user: 'Derek E.',
        rating: 5,
        comment: 'Will last a lifetime.',
        date: '2024-01-05',
      },
    ],
  },
  {
    id: 26,
    size: { s: 87, m: 7, l: 98, xl: 56 },
    title: 'Allen Solly Casual Polo T-Shirt',
    price: 75,
    image:
      'http://localhost:8081/assets/src/assets/images/hood.png?platform=ios&hash=d1623f0f0cd394eedaf9156afc11dfb0',
    brand: 'allen solly',
    description: 'Vibrant colors and a relaxed fit for social outings.',
    totalRating: 4.1,
    reviewCount: 63,
    reviews: [
      {
        user: 'Owen M.',
        rating: 4,
        comment: 'Great color options.',
        date: '2024-02-28',
      },
    ],
  },
  {
    id: 27,
    size: { s: 87, m: 7, l: 98, xl: 56 },
    title: 'Peter England Premium Formal Shirt',
    price: 89,
    image:
      'http://localhost:8081/assets/src/assets/images/hood.png?platform=ios&hash=d1623f0f0cd394eedaf9156afc11dfb0',
    brand: 'peter england',
    description: 'High-thread-count fabric for a luxurious feel and look.',
    totalRating: 4.6,
    reviewCount: 82,
    reviews: [
      {
        user: 'William S.',
        rating: 5,
        comment: 'Feels very high quality.',
        date: '2024-03-08',
      },
    ],
  },
  {
    id: 28,
    size: { s: 87, m: 7, l: 98, xl: 56 },
    title: 'Snitch Oversized Cotton Tee',
    price: 77,
    image:
      'http://localhost:8081/assets/src/assets/images/hood.png?platform=ios&hash=d1623f0f0cd394eedaf9156afc11dfb0',
    brand: 'snitch',
    description: 'Extra-roomy fit made from premium 100% cotton.',
    totalRating: 4.7,
    reviewCount: 110,
    reviews: [
      {
        user: 'Tyler R.',
        rating: 5,
        comment: 'Perfect summer tee.',
        date: '2024-02-15',
      },
    ],
  },
  {
    id: 29,
    size: { s: 87, m: 7, l: 98, xl: 56 },
    title: 'Nike Sportswear Essential Hoodie',
    price: 92,
    image:
      'http://localhost:8081/assets/src/assets/images/hood.png?platform=ios&hash=d1623f0f0cd394eedaf9156afc11dfb0',
    brand: 'nike',
    description: 'Simple, effective, and incredibly comfortable.',
    totalRating: 4.5,
    reviewCount: 98,
    reviews: [
      {
        user: 'Isaac V.',
        rating: 4,
        comment: 'Solid everyday hoodie.',
        date: '2024-01-14',
      },
    ],
  },
  {
    id: 30,
    size: { s: 87, m: 7, l: 98, xl: 56 },
    title: 'Adidas Club Training Jacket',
    price: 81,
    image:
      'http://localhost:8081/assets/src/assets/images/hood.png?platform=ios&hash=d1623f0f0cd394eedaf9156afc11dfb0',
    brand: 'adidas',
    description: 'Tapered fit jacket designed for athletes on the move.',
    totalRating: 4.4,
    reviewCount: 57,
    reviews: [
      {
        user: 'Xavier C.',
        rating: 4,
        comment: 'Great for light rain.',
        date: '2024-02-01',
      },
    ],
  },
  {
    id: 31,
    title: 'Puma Running Lightweight Jacket',
    price: 97,
    size: { s: 87, m: 7, l: 98, xl: 56 },
    image:
      'http://localhost:8081/assets/src/assets/images/hood.png?platform=ios&hash=d1623f0f0cd394eedaf9156afc11dfb0',
    brand: 'puma',
    description: 'Ultra-lightweight protection against the elements.',
    totalRating: 4.8,
    reviewCount: 42,
    reviews: [
      {
        user: 'Gavin N.',
        rating: 5,
        comment: 'Unbelievably light.',
        date: '2024-03-11',
      },
    ],
  },
  {
    id: 32,
    title: 'Levis Relaxed Fit Cotton Shirt',
    price: 73,
    size: { s: 87, m: 7, l: 98, xl: 56 },
    image:
      'http://localhost:8081/assets/src/assets/images/hood.png?platform=ios&hash=d1623f0f0cd394eedaf9156afc11dfb0',
    brand: 'levis',
    description: 'Easy-going style with a roomier fit for all-day comfort.',
    totalRating: 4.3,
    reviewCount: 71,
    reviews: [
      {
        user: 'Miles P.',
        rating: 4,
        comment: 'Comfortable and casual.',
        date: '2024-02-05',
      },
    ],
  },
  {
    id: 33,
    size: { s: 87, m: 7, l: 98, xl: 56 },
    title: 'Allen Solly Office Slim Shirt',
    price: 88,
    image:
      'http://localhost:8081/assets/src/assets/images/hood.png?platform=ios&hash=d1623f0f0cd394eedaf9156afc11dfb0',
    brand: 'allen solly',
    description: 'A perfect blend of style and professionalism.',
    totalRating: 4.6,
    reviewCount: 89,
    reviews: [
      {
        user: 'Julian A.',
        rating: 5,
        comment: "Fits like it's tailored.",
        date: '2024-01-18',
      },
    ],
  },
  {
    id: 34,
    size: { s: 87, m: 7, l: 98, xl: 56 },
    title: 'Peter England Executive Shirt',
    price: 91,
    image:
      'http://localhost:8081/assets/src/assets/images/hood.png?platform=ios&hash=d1623f0f0cd394eedaf9156afc11dfb0',
    brand: 'peter england',
    description: 'A prestigious look for the modern executive.',
    totalRating: 4.7,
    reviewCount: 104,
    reviews: [
      {
        user: 'Eli T.',
        rating: 5,
        comment: 'Very professional look.',
        date: '2024-03-09',
      },
    ],
  },
  {
    id: 35,
    size: { s: 87, m: 7, l: 98, xl: 56 },
    title: 'Snitch Street Style Printed Tee',
    price: 70,
    image:
      'http://localhost:8081/assets/src/assets/images/hood.png?platform=ios&hash=d1623f0f0cd394eedaf9156afc11dfb0',
    brand: 'snitch',
    description: 'Abstract prints designed for those who lead the trends.',
    totalRating: 4.1,
    reviewCount: 52,
    reviews: [
      {
        user: 'Zion H.',
        rating: 4,
        comment: 'Love the abstract art.',
        date: '2024-02-12',
      },
    ],
  },
  {
    id: 36,
    title: 'Nike Training Flex Hoodie',
    price: 95,
    size: { s: 87, m: 7, l: 98, xl: 56 },
    image:
      'http://localhost:8081/assets/src/assets/images/hood.png?platform=ios&hash=d1623f0f0cd394eedaf9156afc11dfb0',
    brand: 'nike',
    description: 'Advanced stretch fabric for gym performance and recovery.',
    totalRating: 4.9,
    reviewCount: 64,
    reviews: [
      {
        user: 'Quinn F.',
        rating: 5,
        comment: 'Best hoodie for training.',
        date: '2024-03-14',
      },
    ],
  },
];
