/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ShoppingCart, Star, MessageCircle, Calendar, ChevronRight, Menu, X, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Data ---
const PRODUCTS = [
  {
    id: 1,
    name: 'Signature Daddies',
    price: 5000,
    crispFactor: 5,
    image: `${import.meta.env.BASE_URL}daddies.png`,
    description: 'Bite-sized, crunchy, and slightly sweet fried dough. A Ugandan classic.',
  },
  {
    id: 2,
    name: 'Choco-Chunk Cookies',
    price: 20000,
    crispFactor: 4,
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&q=80&w=800',
    description: 'Chewy on the inside, perfectly crisp edges. Loaded with chocolate.',
  },
  {
    id: 3,
    name: 'Red Velvet Cupcakes',
    price: 35000,
    crispFactor: 2,
    image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&q=80&w=800',
    description: 'Soft, moist, and topped with rich cream cheese frosting.',
  },
  {
    id: 4,
    name: 'Vanilla Bean Loaf',
    price: 15000,
    crispFactor: 3,
    image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&q=80&w=800',
    description: 'Perfect accompaniment for your afternoon tea or coffee.',
  },
];

const BLOG_POSTS = [
  {
    id: 1,
    title: 'Why our Daddies are the crunchiest in Kampala',
    excerpt: 'The secret is in the kneading process and keeping the oil at the exact right temperature...',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 2,
    title: '5 Ways to Elevate Your Afternoon Tea',
    excerpt: 'Pairing the right cookie with your tea can make all the difference in the world.',
    image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 3,
    title: 'Behind the Scenes: A Custom Cake Journey',
    excerpt: 'See how we transform a simple idea into a stunning, multi-tiered edible masterpiece.',
    image: `${import.meta.env.BASE_URL}behind-the-scenes.jpg`,
  },
];

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Sarah K.',
    text: 'These are hands down the best daddies I have had since I was a child. The crunch factor is real!',
  },
  {
    id: 2,
    name: 'Moses B.',
    text: 'Ordered a custom birthday cake for my daughter. Not only was it beautiful, but it tasted incredible.',
  },
  {
    id: 3,
    name: 'Joy W.',
    text: 'The cookies are to die for. Chewy, chunky, and irresistible.',
  },
];

// --- Formatter ---
const formatUGX = (amount: number) => {
  return new Intl.NumberFormat('en-UG', {
    style: 'currency',
    currency: 'UGX',
    minimumFractionDigits: 0,
  }).format(amount);
};

export default function App() {
  const [cart, setCart] = useState<{ id: number; quantity: number }[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  // Cart Logic
  const addToCart = (id: number) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === id);
      if (existing) {
        return prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { id, quantity: 1 }];
    });
  };

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Testimonial Autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((curr) => (curr + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen font-sans selection:bg-strawberry selection:text-white">
      {/* --- Navigation --- */}
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-vanilla border-b border-cookie/20 py-4' : 'bg-vanilla border-b border-cookie/20 py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#" className="font-display text-2xl font-black tracking-tighter uppercase text-cookie">
            Lynn's Crispy Corner
          </a>

          <div className="hidden md:flex items-center space-x-10 font-bold text-cookie uppercase tracking-widest text-sm">
            <a href="#menu" className="hover:text-strawberry transition-colors">Menu</a>
            <a href="#custom-cakes" className="hover:text-strawberry transition-colors">Cakes</a>
            <a href="#our-story" className="hover:text-strawberry transition-colors">Story</a>
            <a href="#blog" className="hover:text-strawberry transition-colors">Blog</a>
          </div>

          <div className="flex items-center space-x-6">
            <button className="relative group text-cookie font-black uppercase tracking-widest text-sm hover:text-strawberry transition-colors">
              CART
              {cartItemsCount > 0 && (
                <span className="absolute -top-3 -right-4 bg-strawberry text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full pointer-events-none">
                  {cartItemsCount}
                </span>
              )}
            </button>
            <button
              className="md:hidden text-cookie"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 bg-vanilla p-6 flex flex-col"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="font-display text-2xl font-bold text-cookie">Lynn's</span>
              <button onClick={() => setMobileMenuOpen(false)} className="text-cookie">
                <X className="w-8 h-8" />
              </button>
            </div>
            <div className="flex flex-col space-y-8 text-2xl font-medium text-cookie flex-1 justify-center items-center">
              <a href="#menu" onClick={() => setMobileMenuOpen(false)}>Menu</a>
              <a href="#custom-cakes" onClick={() => setMobileMenuOpen(false)}>Custom Cakes</a>
              <a href="#blog" onClick={() => setMobileMenuOpen(false)}>Blog</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Hero Section --- */}
      <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-[90vh] flex flex-col justify-center">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="order-2 md:order-1"
          >
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-cookie leading-[0.9] mb-6">
              The Crunch You Crave,<br />
              <span className="text-strawberry">The Sweetness You Love.</span>
            </h1>
            <p className="text-lg leading-relaxed mb-8 max-w-md text-cookie">
              Handcrafted confectionaries made with love in Kampala.
              From perfectly crunchy daddies to exquisite custom cakes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#menu"
                className="inline-flex items-center justify-center px-10 py-5 bg-strawberry text-white font-black uppercase tracking-tighter text-lg w-fit transition-transform hover:scale-95"
              >
                Order Now
              </a>
              <a
                href="#custom-cakes"
                className="inline-flex items-center justify-center px-10 py-5 border-2 border-cookie text-cookie font-black uppercase tracking-tighter text-lg w-fit transition-transform hover:scale-95"
              >
                Custom Cakes
              </a>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 md:order-2 w-full aspect-square md:aspect-[4/5] rounded-3xl relative overflow-hidden flex items-center justify-center p-8 bg-cookie/5"
          >
            {/* Artistic Image Composition Container */}
            <div className="absolute inset-0 w-full h-full">
               <img 
                 src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=1200" 
                 alt="Delicious slice of cake" 
                 className="w-full h-full object-cover"
               />
               <div className="absolute inset-0 bg-cookie/20 mix-blend-multiply" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- A Word from Lynn --- */}
      <section id="our-story" className="py-24 px-6 max-w-7xl mx-auto border-t border-cookie/20 mt-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden bg-cookie/5 relative order-2 md:order-1"
          >
            <img 
              src={`${import.meta.env.BASE_URL}lynn.jpeg`}
              alt="Lynn" 
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 md:order-2"
          >
            <h2 className="text-[10px] uppercase tracking-widest font-bold text-strawberry mb-4">
              Our Story
            </h2>
            <h3 className="font-display text-4xl md:text-5xl font-black uppercase tracking-tighter text-cookie mb-6">
              A Word from Lynn
            </h3>
            <p className="text-cookie text-lg leading-relaxed mb-6 font-medium">
              "When I started the Corner, it was out of a simple love for baking and the joy that a perfectly crunchy sweet treat brings. Today, seeing our 'Cakes' shared at weddings, offices, and family tables across Kampala is a dream come true."
            </p>
            <p className="text-cookie/70 text-lg leading-relaxed mb-8">
              Every single batch is made with the same love, care, and exact recipe that went into my very first batch. Thank you for making us a part of your moments.
            </p>
            <div className="font-display text-3xl font-black text-cookie opacity-80">
              — Lynn
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- Trust Signals (Counter) --- */}
      <section className="py-16 px-6 text-cookie border-y border-cookie/20 bg-vanilla text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl md:text-8xl font-display font-black mb-4"
          >
            5,000+
          </motion.div>
          <div className="text-xl md:text-2xl font-bold uppercase tracking-tight opacity-70">
            Daddies Crunched in Kampala
          </div>
        </div>
      </section>

      {/* --- The "Daily Crunch" Menu --- */}
      <section id="menu" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-cookie/20 pb-6">
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-black uppercase tracking-tighter text-cookie mb-2">
              Daily Crunch Menu
            </h2>
            <p className="text-cookie/70 max-w-xl text-lg relative z-0">
              Our signature bakes available every single day. Freshly made, perfectly packaged.
            </p>
          </div>
          <span className="text-xs font-bold uppercase opacity-50 relative z-0 tracking-widest">Available Today Only</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {PRODUCTS.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group flex flex-col"
            >
              <div className="w-full aspect-[3/4] rounded-2xl mb-6 overflow-hidden relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm shadow-sm rounded-xl text-cookie font-black text-[10px] px-3 py-1.5 uppercase tracking-widest z-10">
                  {formatUGX(product.price)}
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-black text-2xl uppercase tracking-tighter text-cookie mb-1 leading-tight">
                    {product.name}
                  </h3>
                  <div className="text-[10px] uppercase font-bold tracking-[2px] text-strawberry mb-3">
                    CRISP: {'★'.repeat(product.crispFactor)}{'☆'.repeat(5 - product.crispFactor)}
                  </div>
                  <p className="text-cookie/70 text-sm mb-6">
                    {product.description}
                  </p>
                </div>
                
                <button
                  onClick={() => addToCart(product.id)}
                  className="w-full py-4 border-2 border-cookie text-cookie font-black uppercase tracking-widest text-xs hover:bg-cookie hover:text-vanilla transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- The "Cake Calendar" Section --- */}
      <section id="custom-cakes" className="bg-vanilla py-24 border-y border-cookie/20">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-black uppercase tracking-tighter text-cookie mb-4">
              Cake Calendar
            </h2>
            <p className="text-xs mb-8 uppercase font-bold opacity-60 text-cookie tracking-widest">
              Custom cakes require 48h lead time. Reserve your spot.
            </p>

            <ul className="space-y-6 mb-10 text-cookie font-medium">
              <li className="flex items-start">
                <span className="w-8 h-8 border border-cookie bg-white flex items-center justify-center text-sm font-black mr-4 shrink-0">1</span>
                <div>
                  <h4 className="font-bold text-lg mb-1 uppercase tracking-tight">Pick your date</h4>
                  <p className="text-cookie/60 text-sm font-normal">Select a date at least 2 days from today.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-8 h-8 border border-cookie bg-white flex items-center justify-center text-sm font-black mr-4 shrink-0">2</span>
                <div>
                  <h4 className="font-bold text-lg mb-1 uppercase tracking-tight">Share your vision</h4>
                  <p className="text-cookie/60 text-sm font-normal">Flavors, colors, themes, allergies.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-8 h-8 border border-cookie bg-strawberry text-white flex items-center justify-center text-sm font-black mr-4 shrink-0">3</span>
                <div>
                  <h4 className="font-bold text-lg mb-1 uppercase tracking-tight">Confirm & Pay</h4>
                  <p className="text-cookie/60 text-sm font-normal">Secure your slot with Mobile Money.</p>
                </div>
              </li>
            </ul>

            <button className="px-10 py-5 bg-cookie text-vanilla font-black uppercase tracking-tighter transition-transform hover:scale-95 w-fit">
              Inquire Now
            </button>
          </div>

          <div className="bg-white p-8 border border-cookie">
            {/* Visual Mockup of a Form/Calendar */}
            <div className="w-full">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-black text-xl uppercase text-cookie">Book a Slot</h3>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-6 text-center text-[10px] font-bold text-cookie">
                <div className="pb-2 opacity-50 uppercase">Mo</div><div className="pb-2 opacity-50 uppercase">Tu</div><div className="pb-2 opacity-50 uppercase">We</div><div className="pb-2 opacity-50 uppercase">Th</div><div className="pb-2 opacity-50 uppercase">Fr</div><div className="pb-2 opacity-50 uppercase">Sa</div><div className="pb-2 opacity-50 uppercase">Su</div>
                
                {/* Mock Calendar Grid */}
                <div className="aspect-square flex items-center justify-center border border-cookie opacity-30">28</div>
                <div className="aspect-square flex items-center justify-center border border-cookie opacity-30">29</div>
                <div className="aspect-square flex items-center justify-center border border-cookie opacity-30">30</div>
                <div className="aspect-square flex items-center justify-center border border-cookie opacity-30 relative overflow-hidden">
                  <div className="absolute inset-0 w-full h-full bg-cookie/10" />
                  <span className="relative z-10">1</span>
                </div>
                <div className="aspect-square flex items-center justify-center border border-cookie opacity-30 relative overflow-hidden">
                  <div className="absolute inset-0 w-full h-full bg-cookie/10" />
                  <span className="relative z-10">2</span>
                </div>
                <div className="aspect-square flex items-center justify-center border border-cookie cursor-pointer hover:bg-cookie hover:text-vanilla transition-colors">3</div>
                <div className="aspect-square flex items-center justify-center border border-cookie cursor-pointer hover:bg-cookie hover:text-vanilla transition-colors">4</div>
                
                <div className="aspect-square flex items-center justify-center border border-cookie bg-cookie text-vanilla">5</div>
                <div className="aspect-square flex items-center justify-center border border-cookie cursor-pointer hover:bg-cookie hover:text-vanilla transition-colors">6</div>
                <div className="aspect-square flex items-center justify-center border border-cookie cursor-pointer hover:bg-cookie hover:text-vanilla transition-colors">7</div>
                <div className="aspect-square flex items-center justify-center border border-cookie cursor-pointer hover:bg-cookie hover:text-vanilla transition-colors">8</div>
                <div className="aspect-square flex items-center justify-center border border-cookie cursor-pointer hover:bg-cookie hover:text-vanilla transition-colors">9</div>
                <div className="aspect-square flex items-center justify-center border border-cookie cursor-pointer hover:bg-cookie hover:text-vanilla transition-colors">10</div>
                <div className="aspect-square flex items-center justify-center border border-cookie cursor-pointer hover:bg-cookie hover:text-vanilla transition-colors">11</div>
              </div>

              <div className="flex space-x-4 text-[10px] font-bold uppercase tracking-widest text-cookie/60">
                <span className="flex items-center"><div className="w-3 h-3 bg-cookie/10 border border-cookie/30 mr-2" /> Unavailable</span>
                <span className="flex items-center"><div className="w-3 h-3 bg-cookie border border-cookie mr-2" /> Selected</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Testimonials --- */}
      <section className="py-24 px-6 max-w-4xl mx-auto text-center border-b border-cookie/20">
        <h2 className="text-[10px] uppercase tracking-widest font-bold text-strawberry mb-12">
          Sweet Words
        </h2>
        
        <div className="relative h-48 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonialIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <div className="text-2xl text-strawberry mb-6 relative">★★★★★</div>
              <p className="font-display text-2xl md:text-3xl text-cookie leading-snug mb-6 max-w-3xl font-black">
                "{TESTIMONIALS[testimonialIndex].text}"
              </p>
              <div className="uppercase tracking-widest text-[10px] font-bold opacity-70">
                — {TESTIMONIALS[testimonialIndex].name}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* --- The "Corner Blog" Preview --- */}
      <section id="blog" className="py-24 px-6 bg-vanilla text-cookie border-b border-cookie/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-black uppercase tracking-tighter">
              The Corner Blog
            </h2>
            <a href="#" className="hidden md:flex items-center font-bold uppercase tracking-widest text-sm hover:text-strawberry transition-colors">
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post) => (
              <a href="#" key={post.id} className="group flex flex-col">
                <div className="w-full aspect-square rounded-2xl mb-6 overflow-hidden relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute bottom-4 left-4 bg-cookie text-vanilla px-3 py-1.5 rounded-lg font-bold text-[10px] uppercase tracking-widest">
                    Editorial
                  </div>
                </div>
                <h3 className="font-black text-3xl leading-[1.1] mb-4 group-hover:text-strawberry transition-colors uppercase tracking-tighter">
                  {post.title}
                </h3>
                <p className="opacity-70 text-sm border-l-2 border-strawberry pl-4">
                  {post.excerpt}
                </p>
              </a>
            ))}
          </div>
          
          <a href="#" className="mt-8 flex md:hidden items-center justify-center font-bold uppercase tracking-widest text-sm hover:text-strawberry transition-colors">
            View All <ChevronRight className="w-4 h-4 ml-1" />
          </a>
        </div>
      </section>

      {/* --- Bottom Bar / Footer --- */}
      <footer className="h-40 px-6 max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-8 bg-vanilla text-cookie">
        <div className="flex flex-col md:flex-row gap-10 overflow-hidden items-center">
          <span className="text-[10px] font-black uppercase whitespace-nowrap">The Corner Blog —</span>
          <div className="flex gap-6 overflow-hidden">
            <div className="text-xs font-bold whitespace-nowrap opacity-60">Why our Daddies are the crunchiest</div>
            <div className="text-xs font-bold whitespace-nowrap opacity-60 hidden lg:block">5 Secrets to perfect cupcakes</div>
            <div className="text-xs font-bold whitespace-nowrap opacity-60">Celebrating 5 years at the Corner</div>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-[10px] font-bold opacity-60 uppercase">
            © {new Date().getFullYear()} Lynn's
          </div>
        </div>
      </footer>

      {/* --- Floating WhatsApp --- */}
      <a
        href="https://wa.me/256786195662"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-6 md:bottom-6 md:right-6 bg-[#25D366] text-white p-4 rounded-full hover:scale-110 transition-transform z-[100] flex items-center justify-center border-2 border-transparent hover:border-cookie shadow-2xl"
        aria-label="Chat with us on WhatsApp"
      >
        <MessageCircle className="w-8 h-8 md:w-7 md:h-7" />
      </a>
    </div>
  );
}