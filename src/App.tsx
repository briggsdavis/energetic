/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { 
  Search, 
  Truck, 
  ShieldCheck, 
  CreditCard, 
  Headphones, 
  Menu, 
  X, 
  ChevronDown, 
  ChevronRight,
  Star, 
  ArrowRight,
  ChevronUp,
  Compass,
  Package,
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  Calendar,
  User,
  CheckCircle2,
  Check,
  Target,
  Eye,
  Grid,
  List
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

function Counter({ value }: { value: string }) {
  const numericValue = parseInt(value.replace(/\D/g, ''));
  const suffix = value.replace(/[0-9]/g, '');
  const [count, setCount] = useState(0);
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const end = numericValue;
          const duration = 2000;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOutQuad = (t: number) => t * (2 - t);
            const currentCount = Math.floor(easeOutQuad(progress) * end);
            
            setCount(currentCount);

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (nodeRef.current) observer.observe(nodeRef.current);
    return () => observer.disconnect();
  }, [numericValue]);

  return <span ref={nodeRef}>{count}{suffix}</span>;
}

function ComingSoon({ title }: { title: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8 bg-white"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <Package size={80} className="text-gray-200 mb-6 mx-auto" />
        <h1 className="text-2xl md:text-4xl font-display font-bold mb-4 uppercase tracking-tighter">
          {title}
        </h1>
        <div className="w-24 h-1 bg-black mx-auto mb-8" />
        <p className="text-xl text-gray-500 max-w-md mx-auto leading-relaxed">
          We are currently crafting something exceptional for this collection. 
          Stay tuned for the launch of our premium leather goods.
        </p>
      </motion.div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-black text-white px-12 py-5 rounded-none font-bold text-xs uppercase tracking-[0.3em] shadow-2xl"
        onClick={() => window.location.href = '#'}
      >
        Notify Me
      </motion.button>
    </motion.div>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [blogFilter, setBlogFilter] = useState('All');
  const [blogView, setBlogView] = useState<'grid' | 'list'>('grid');
  const [selectedFilters, setSelectedFilters] = useState<string[]>(['All']);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = 'hidden';
      const detailView = document.getElementById('product-detail-view');
      if (detailView) detailView.scrollTop = 0;
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedProduct]);

  const ProductDetail = ({ product, onClose, onSelectProduct }: { product: any, onClose: () => void, onSelectProduct: (p: any) => void }) => {
    const recommended = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);

    return (
      <motion.div
        id="product-detail-view"
        key={product.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] bg-white overflow-y-auto"
      >
        <div className="flex flex-col md:flex-row min-h-screen">
          {/* Left: Image */}
          <div className="md:w-3/5 bg-white relative overflow-hidden min-h-[60vh] md:min-h-screen">
            <motion.img
              key={product.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileTap={{ scale: 1.5 }}
              transition={{ 
                opacity: { duration: 0.5 },
                scale: { type: "spring", stiffness: 300, damping: 30 }
              }}
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover cursor-zoom-in origin-center"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Right: Details */}
          <div className="md:w-2/5 p-8 md:p-24 flex flex-col">
            <div className="max-w-md">
              <div className="flex justify-between items-start mb-8">
                <h1 className="text-2xl font-display font-bold uppercase tracking-tight leading-tight w-3/4">
                  {product.name}
                </h1>
                <div className="flex items-center space-x-2">
                  <button className="p-2 hover:bg-gray-50 transition-colors">
                    <Star size={20} />
                  </button>
                  <button 
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              <div className="text-xl font-medium mb-8">
                {product.price}
              </div>

              <div className="mb-12">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 block mb-4">Available Colors</span>
                <div className="flex gap-4">
                  {product.colors.map((color: string) => (
                    <div key={color} className="flex flex-col items-center gap-2">
                      <div className={`w-8 h-8 border border-gray-200 ${color === 'Black' ? 'bg-black' : color === 'Brown' ? 'bg-[#5D4037]' : 'bg-white border-dashed'}`} />
                      <span className="text-[10px] font-medium uppercase tracking-widest">{color}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 mb-12">
                <button className="flex-1 bg-black text-white py-5 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-900 transition-colors">
                  Add to Inquiry
                </button>
                <button className="flex-1 border border-black text-black py-5 text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors">
                  Custom Order
                </button>
              </div>

              <div className="space-y-12 mb-16">
                <div>
                  <p className="text-sm text-gray-600 leading-relaxed font-light">
                    {product.description}
                  </p>
                </div>

                {/* Recommended / Complete Your Look */}
                <div className="pt-8 border-t border-gray-100">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-8">Complete Your Look</h4>
                  <div className="grid grid-cols-3 gap-4">
                    {recommended.map((rec: any) => (
                      <div 
                        key={rec.id} 
                        className="group cursor-pointer"
                        onClick={() => onSelectProduct(rec)}
                      >
                        <div className="aspect-[3/4] bg-gray-50 mb-4 overflow-hidden">
                          <img 
                            src={rec.image} 
                            alt={rec.name} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <h5 className="text-[9px] font-bold uppercase tracking-tight truncate">{rec.name}</h5>
                        <span className="text-[9px] text-gray-400">{rec.price}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 pt-8 border-t border-gray-100">
                  <details className="group">
                    <summary className="flex justify-between items-center cursor-pointer list-none py-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest">Product Specifications</span>
                      <ChevronRight size={14} className="group-open:rotate-90 transition-transform" />
                    </summary>
                    <p className="text-xs text-gray-500 py-4 leading-relaxed">{product.specifications}</p>
                  </details>
                  <details className="group">
                    <summary className="flex justify-between items-center cursor-pointer list-none py-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest">Key Features</span>
                      <ChevronRight size={14} className="group-open:rotate-90 transition-transform" />
                    </summary>
                    <ul className="list-disc list-inside text-xs text-gray-500 py-4 space-y-2">
                      {product.features.map((f: string) => <li key={f}>{f}</li>)}
                    </ul>
                  </details>
                  <details className="group">
                    <summary className="flex justify-between items-center cursor-pointer list-none py-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest">Attributes</span>
                      <ChevronRight size={14} className="group-open:rotate-90 transition-transform" />
                    </summary>
                    <p className="text-xs text-gray-500 py-4 leading-relaxed">{product.attributes}</p>
                  </details>
                  <details className="group">
                    <summary className="flex justify-between items-center cursor-pointer list-none py-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest">Product Measurements</span>
                      <ChevronRight size={14} className="group-open:rotate-90 transition-transform" />
                    </summary>
                    <div className="text-xs text-gray-500 py-4 space-y-2">
                      <p>Standard fit based on international sizing charts.</p>
                      <p>Available in sizes: S, M, L, XL, XXL, XXXL.</p>
                      <p>Custom sizing available upon request.</p>
                    </div>
                  </details>
                  <details className="group">
                    <summary className="flex justify-between items-center cursor-pointer list-none py-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest">Composition, Care & Origin</span>
                      <ChevronRight size={14} className="group-open:rotate-90 transition-transform" />
                    </summary>
                    <div className="text-xs text-gray-500 py-4 space-y-4">
                      <div>
                        <p className="font-bold mb-1">COMPOSITION</p>
                        <p>Outer: 100% Genuine Leather</p>
                        <p>Lining: 100% Polyester / Cotton Blend</p>
                      </div>
                      <div>
                        <p className="font-bold mb-1">CARE</p>
                        <p>Do not wash. Do not bleach. Do not iron. Professional leather clean only.</p>
                      </div>
                      <div>
                        <p className="font-bold mb-1">ORIGIN</p>
                        <p>Handcrafted in Sialkot, Pakistan.</p>
                      </div>
                    </div>
                  </details>
                  <details className="group">
                    <summary className="flex justify-between items-center cursor-pointer list-none py-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest">Shipping, Exchanges and Returns</span>
                      <ChevronRight size={14} className="group-open:rotate-90 transition-transform" />
                    </summary>
                    <div className="text-xs text-gray-500 py-4 space-y-2">
                      <p>Free global shipping on orders over $500.</p>
                      <p>Standard delivery: 7-14 business days.</p>
                      <p>Returns accepted within 30 days of delivery.</p>
                    </div>
                  </details>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 block mb-4">SKU</span>
                    <span className="text-sm font-medium">{product.sku}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 block mb-4">Tags</span>
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag: string) => (
                        <span key={tag} className="px-3 py-1 bg-gray-50 text-[10px] font-medium uppercase tracking-widest text-gray-500">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks: { name: string; id: string }[] = [];

  const secondaryNavLinks = [
    { name: "About Us", id: "about" },
    { name: "Blogs", id: "blogs" },
    { name: "Collection", id: "shop" },
    { name: "Custom Leather Jackets", id: "custom-leather-jackets" },
  ];

  const categories = [
    "About Us",
    "Blogs",
    "Collection",
    "Custom Leather Jackets",
  ];

  const sellingPoints = [
    { 
      icon: Compass, 
      title: "Customization Offer", 
      desc: "We offer a customization service that allows you to tailor your leather jackets to meet your unique style and specifications, ensuring a perfect fit for every customer.",
      color: "bg-white"
    },
    { 
      icon: Package, 
      title: "Low MOQ & Sampling", 
      desc: "We accept low minimum order quantities (MOQs) and provide sampling, ensuring flexibility, quality, and satisfaction for businesses seeking premium leather jackets with customized options.",
      color: "bg-gray-50"
    },
    { 
      icon: ShieldCheck, 
      title: "Trade Assurance & Third-Party Inspection", 
      desc: "We ensure trade assurance and third-party inspection services, guaranteeing secure transactions, quality assurance, and peace of mind for customers requiring reliable leather jacket manufacturing.",
      color: "bg-white"
    },
    { 
      icon: CreditCard, 
      title: "Money Back Warranty", 
      desc: "We offer a Money Back Warranty, ensuring a full refund if any leather jacket does not meet the provided description or your expectations.",
      color: "bg-gray-50"
    },
    { 
      icon: Headphones, 
      title: "24/7 Customer Support", 
      desc: "Our dedicated 24/7 customer support team is always available to assist you with any inquiries or concerns, ensuring a seamless shopping experience.",
      color: "bg-white"
    },
  ];

  const products = [
    {
      id: 1,
      name: "Detachable Hooded Biker Genuine Leather Jacket for Men",
      category: "Men's Jackets",
      image: "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&q=80&w=1000",
      price: "$299.00",
      rating: 5,
      sku: "MJ-BIKER-001",
      description: "A versatile biker jacket crafted from premium full-grain leather, featuring a detachable hood for adaptable styling. Engineered for durability and timeless appeal.",
      specifications: "100% Genuine Sheepskin Leather, YKK Zippers, Polyester Lining, Detachable Cotton Hood.",
      features: ["Detachable Hood", "Adjustable Waist Tabs", "Multiple Internal Pockets", "Reinforced Stitching"],
      attributes: "Slim Fit, Mid-Weight, Weather Resistant",
      tags: ["Biker", "Men's Fashion", "Genuine Leather", "Handcrafted"],
      colors: ["Black", "Brown", "Custom"],
      isNewArrival: true
    },
    {
      id: 2,
      name: "Best Selling Men's Hybrid Varsity Jacket – Leather & Wool",
      category: "Men's Jackets",
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=1000",
      price: "$249.00",
      rating: 5,
      sku: "MJ-VARSITY-002",
      description: "The ultimate fusion of classic varsity aesthetics and modern luxury. Premium wool body paired with genuine leather sleeves.",
      specifications: "Premium Wool Blend, Genuine Cowhide Leather Sleeves, Quilted Lining.",
      features: ["Rib-knit Cuffs", "Snap Button Closure", "Leather Welt Pockets", "Internal Chest Pocket"],
      attributes: "Regular Fit, Heavy-Weight, Classic Style",
      tags: ["Varsity", "Hybrid", "College Style", "Premium"],
      colors: ["Black", "Brown", "Custom"],
      isNewArrival: true
    },
    {
      id: 3,
      name: "100% Leather Biker Motorcycle Jacket for Men",
      category: "Men's Jackets",
      image: "https://images.unsplash.com/photo-1520975916090-3105956dac50?auto=format&fit=crop&q=80&w=1000",
      price: "$349.00",
      rating: 5,
      sku: "MJ-MOTOR-003",
      description: "Authentic motorcycle jacket designed for the road. Thick, protective leather with a classic asymmetrical zip.",
      specifications: "1.2mm Cowhide Leather, CE Armored Pockets, Heavy Duty Hardware.",
      features: ["Asymmetrical Zip", "Shoulder Epaulettes", "Zippered Cuffs", "Belted Waist"],
      attributes: "Regular Fit, Heavy-Weight, Protective",
      tags: ["Motorcycle", "Road Ready", "Classic Biker", "Heavy Duty"],
      colors: ["Black", "Brown", "Custom"],
      isNewArrival: true
    },
    {
      id: 4,
      name: "Black & White Shearling Leather Bomber Jacket for Women",
      category: "Women's Jackets",
      image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&q=80&w=1000",
      price: "$399.00",
      rating: 5,
      sku: "WJ-BOMBER-004",
      description: "Luxurious shearling bomber jacket offering exceptional warmth and a bold monochrome aesthetic.",
      specifications: "Genuine Sheepskin with Shearling Fur, Contrast Leather Trims.",
      features: ["Shearling Collar", "Buckled Neck Strap", "Oversized Fit", "Hand-warmer Pockets"],
      attributes: "Oversized Fit, Ultra-Warm, Luxury",
      tags: ["Shearling", "Winter", "Bomber", "High Fashion"],
      colors: ["Black", "Brown", "Custom"],
      isNewArrival: true
    },
    {
      id: 5,
      name: "Brown Shearling Leather Bomber Jacket for Women – Fur Lined",
      category: "Women's Jackets",
      image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&q=80&w=1000",
      price: "$379.00",
      rating: 5,
      sku: "WJ-BOMBER-005",
      description: "Classic aviator-inspired bomber jacket with a rich brown finish and plush cream shearling lining.",
      specifications: "Premium Suede Leather, Faux Fur Lining, Antique Brass Hardware.",
      features: ["Fold-over Collar", "Ribbed Hem", "Twin Needle Stitching", "Soft Touch Finish"],
      attributes: "Regular Fit, Warm, Vintage Look",
      tags: ["Aviator", "Brown Leather", "Cozy", "Women's Style"],
      colors: ["Black", "Brown", "Custom"],
      isNewArrival: true
    },
    {
      id: 6,
      name: "Premium Leather Travel Duffle Bag",
      category: "Leather Bags",
      image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&q=80&w=1000",
      price: "$349.00",
      rating: 5,
      sku: "ACC-BAG-006",
      description: "The perfect companion for weekend getaways. Spacious, durable, and elegantly crafted from full-grain leather.",
      specifications: "Full Grain Buffalo Leather, Reinforced Bottom, Detachable Shoulder Strap.",
      features: ["Large Main Compartment", "Shoe Compartment", "Internal Organizer", "Metal Feet"],
      attributes: "Large Capacity, Durable, Travel Ready",
      tags: ["Travel", "Duffle", "Weekend Bag", "Luxury Travel"],
      colors: ["Black", "Brown", "Custom"],
      isNewArrival: true
    },
    {
      id: 7,
      name: "Handcrafted Leather Messenger Bag",
      category: "Leather Bags",
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=1000",
      price: "$189.00",
      rating: 5,
      sku: "ACC-BAG-007",
      description: "A sophisticated messenger bag for the modern professional. Fits up to a 15-inch laptop with ease.",
      specifications: "Vegetable Tanned Leather, Magnetic Closures, Padded Laptop Sleeve.",
      features: ["Adjustable Strap", "Quick Access Rear Pocket", "Pen Holders", "Slim Profile"],
      attributes: "Professional, Slim, Tech Friendly",
      tags: ["Office", "Messenger", "Laptop Bag", "Daily Carry"],
      colors: ["Black", "Brown", "Custom"],
      isNewArrival: true
    },
    {
      id: 8,
      name: "Elite Leather Driving Gloves",
      category: "Leather Gloves & Mittens",
      image: "https://images.unsplash.com/photo-1542332606-b3d2706eb06a?auto=format&fit=crop&q=80&w=1000",
      price: "$79.00",
      rating: 5,
      sku: "ACC-GLV-008",
      description: "Precision-engineered driving gloves for ultimate grip and comfort. Perforated for breathability.",
      specifications: "Soft Goat Leather, Elasticated Wrist, Unlined for Maximum Feel.",
      features: ["Perforated Knuckles", "Snap Button Closure", "Touchscreen Compatible", "Reinforced Palm"],
      attributes: "Breathable, Lightweight, High Grip",
      tags: ["Driving", "Gloves", "Racing", "Accessories"],
      colors: ["Black", "Brown", "Custom"],
      isNewArrival: true
    },
    {
      id: 9,
      name: "Shearling Lined Leather Mittens",
      category: "Leather Gloves & Mittens",
      image: "https://images.unsplash.com/photo-1605902711622-cfb43c443ffb?auto=format&fit=crop&q=80&w=1000",
      price: "$95.00",
      rating: 5,
      sku: "ACC-GLV-009",
      description: "Keep your hands exceptionally warm in the harshest winters with our shearling-lined leather mittens.",
      specifications: "Suede Outer, 100% Natural Shearling Lining.",
      features: ["Extra Long Cuff", "Natural Insulation", "Soft Texture", "Hand-stitched Details"],
      attributes: "Ultra-Warm, Soft, Winter Essential",
      tags: ["Winter", "Mittens", "Shearling", "Cold Weather"],
      colors: ["Black", "Brown", "Custom"]
    },
    {
      id: 10,
      name: "Classic Full Grain Leather Belt",
      category: "Belts & Wallets",
      image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&q=80&w=1000",
      price: "$55.00",
      rating: 5,
      sku: "ACC-BLT-010",
      description: "A timeless accessory that completes any outfit. Crafted from a single piece of thick full-grain leather.",
      specifications: "3.5mm Full Grain Leather, Solid Brass Buckle.",
      features: ["Hand-burnished Edges", "Five Adjustment Holes", "Removable Buckle", "Lifetime Warranty"],
      attributes: "Durable, Classic, Versatile",
      tags: ["Belt", "Classic", "Everyday", "Full Grain"],
      colors: ["Black", "Brown", "Custom"]
    },
    {
      id: 11,
      name: "Slim Bifold Leather Wallet",
      category: "Belts & Wallets",
      image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=1000",
      price: "$45.00",
      rating: 5,
      sku: "ACC-WLT-011",
      description: "Minimalist bifold wallet designed to hold your essentials without the bulk.",
      specifications: "Italian Calfskin Leather, RFID Blocking Lining.",
      features: ["6 Card Slots", "Bill Compartment", "2 Hidden Pockets", "Ultra-Slim Design"],
      attributes: "Minimalist, RFID Protected, Slim",
      tags: ["Wallet", "Minimalist", "Slim", "Daily Carry"],
      colors: ["Black", "Brown", "Custom"]
    },
    {
      id: 12,
      name: "Women's Slim Fit Leather Blazer",
      category: "Women's Jackets",
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=1000",
      price: "$289.00",
      rating: 5,
      sku: "WJ-BLAZER-012",
      description: "Elevate your professional wardrobe with this sharp, slim-fit leather blazer. Perfect for day-to-night transitions.",
      specifications: "Soft Nappa Leather, Notched Lapels, Single Button Closure.",
      features: ["Flap Pockets", "Internal Shoulder Pads", "Satin Lining", "Tailored Silhouette"],
      attributes: "Slim Fit, Lightweight, Professional",
      tags: ["Blazer", "Office Wear", "Chic", "Nappa Leather"],
      colors: ["Black", "Brown", "Custom"]
    }
  ];

  const testimonials = [
    {
      name: "Julie Jack",
      text: "I highly recommend Energetic Wears. Their product is amazing and their service is great. I certainly would recommend them.",
      rating: 5
    },
    {
      name: "Tracy Middleton",
      text: "The product is top quality. The jacket and material is beautiful, with a stylishly unique elegance and mixture of roughed ease that makes for versatile wear. Definitely one of my better coat/ jackets.",
      rating: 5
    },
    {
      name: "Carolyn Pledger",
      text: "Absolutely stunning. A perfect surprise for a hard working man. Excellent quality and even richer and more luxurious than expected. Exceeded my expectations! So delighted I picked your company!",
      rating: 5
    }
  ];

  const faqs = [
    { q: "Which leather is best for jackets?", a: "Full-grain leather is widely considered the best for jackets due to its durability, natural texture, and ability to develop a beautiful patina over time. Lambskin is also a popular choice for its softness and lightweight feel." },
    { q: "Can I tailor my leather jacket?", a: "Yes, we offer professional customization and tailoring services. You can provide your specific measurements and style preferences to ensure a perfect fit." },
    { q: "Where to buy vintage leather jackets?", a: "While we specialize in new, high-quality leather garments, our 'Collection' section often features classic designs inspired by vintage silhouettes, crafted with modern durability." },
    { q: "How to customize leather jacket?", a: "Simply click the 'Customize Now' button on our banner or navigate to 'Custom Leather Jackets'. You can choose your leather type, color, hardware, and provide custom measurements." }
  ];

  const blogPosts = [
    {
      id: 1,
      title: "The Art of Selecting Premium Leather",
      excerpt: "Discover the secrets behind our rigorous 5-stage inspection protocol and how we source the finest hides.",
      date: "March 15, 2026",
      author: "Zain Ahmed",
      image: "https://images.unsplash.com/photo-1520975916090-3105956dac50?auto=format&fit=crop&q=80&w=600",
      category: "Craftsmanship"
    },
    {
      id: 2,
      title: "2026 Leather Trends: What's New in B2B Fashion",
      excerpt: "A deep dive into the upcoming trends for leather jackets and accessories in the global retail market.",
      date: "March 10, 2026",
      author: "Hamza Ahmed",
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=600",
      category: "Trends"
    },
    {
      id: 3,
      title: "Sustainable Manufacturing in the Leather Industry",
      excerpt: "How Energetic Wears is leading the way in ethical sourcing and eco-friendly production methods.",
      date: "March 05, 2026",
      author: "Bilal Ahmed",
      image: "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&q=80&w=600",
      category: "Sustainability"
    },
    {
      id: 4,
      title: "Customization: The Future of Retail",
      excerpt: "Why offering bespoke leather options is the key to customer loyalty in the modern fashion landscape.",
      date: "February 28, 2026",
      author: "Zain Ahmed",
      image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&q=80&w=600",
      category: "Business"
    },
    {
      id: 5,
      title: "The Science of Tanning: Chrome vs. Vegetable",
      excerpt: "Understanding the chemical processes that turn raw hides into durable, beautiful leather garments.",
      date: "February 20, 2026",
      author: "Hamza Ahmed",
      image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&q=80&w=600",
      category: "Craftsmanship"
    },
    {
      id: 6,
      title: "Global Logistics for Fashion Brands",
      excerpt: "Navigating the complexities of international shipping and supply chain management for leather goods.",
      date: "February 15, 2026",
      author: "Bilal Ahmed",
      image: "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&q=80&w=600",
      category: "Business"
    },
    {
      id: 7,
      title: "Caring for Your Leather: A Professional Guide",
      excerpt: "Expert tips on maintaining the longevity and appearance of high-end leather jackets and accessories.",
      date: "February 10, 2026",
      author: "Zain Ahmed",
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=600",
      category: "Craftsmanship"
    },
    {
      id: 8,
      title: "The Rise of Minimalist Leather Design",
      excerpt: "Exploring the shift towards clean lines and understated luxury in contemporary leatherwear collections.",
      date: "February 05, 2026",
      author: "Hamza Ahmed",
      image: "https://images.unsplash.com/photo-1520975916090-3105956dac50?auto=format&fit=crop&q=80&w=600",
      category: "Trends"
    },
    {
      id: 9,
      title: "Scaling Your Fashion Startup with Energetic Wears",
      excerpt: "How our low MOQ and sampling services help emerging brands enter the premium leather market.",
      date: "January 30, 2026",
      author: "Bilal Ahmed",
      image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&q=80&w=600",
      category: "Business"
    },
    {
      id: 10,
      title: "The History of the Iconic Biker Jacket",
      excerpt: "From military utility to cultural rebellion: tracing the evolution of the world's most famous leather garment.",
      date: "January 25, 2026",
      author: "Zain Ahmed",
      image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&q=80&w=600",
      category: "Craftsmanship"
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-black selection:text-white overflow-x-hidden">
      <div className="fixed top-0 left-0 right-0 z-[100] pointer-events-none">
        {/* Top Header */}
        <motion.header 
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
          className="border-b border-gray-100 bg-white pointer-events-auto"
        >
          <div className="container mx-auto px-4 py-6 grid grid-cols-3 items-center">
            {/* Left: Search */}
            <div className="hidden md:flex items-center">
              <div className="relative w-full max-w-[200px] group">
                <div className="flex items-center border-b border-gray-300 focus-within:border-black transition-colors pb-1">
                  <Search size={16} className="text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="Search for Products"
                    className="w-full bg-transparent text-sm focus:outline-none placeholder:text-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Center: Logo */}
            <div 
              className="flex flex-col items-center cursor-pointer"
              onClick={() => setCurrentPage('home')}
            >
              <h1 className="text-2xl font-display font-bold tracking-tighter text-black leading-none">
                ENERGETIC
              </h1>
              <span className="text-[10px] font-medium tracking-[0.2em] text-gray-500 uppercase mt-1">
                #beenergetic
              </span>
            </div>

            {/* Right: Navigation */}
            <div className="flex items-center justify-end space-x-10">
              <nav className="hidden lg:flex items-center space-x-10">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => setCurrentPage(link.id)}
                    className={`text-[11px] font-bold uppercase tracking-[0.25em] transition-colors relative group ${currentPage === link.id ? 'text-black' : 'text-gray-500 hover:text-black'}`}
                  >
                    {link.name}
                    <span className={`absolute -bottom-2 left-0 h-[1px] bg-black transition-all ${currentPage === link.id ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                  </button>
                ))}
              </nav>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="hidden sm:block bg-black text-white px-8 py-3 rounded-none text-[11px] font-bold tracking-[0.2em] uppercase hover:shadow-2xl hover:shadow-black/20 transition-all"
              >
                GET STARTED
              </motion.button>
              <button 
                className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                onClick={() => setIsMenuOpen(true)}
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </motion.header>

        {/* Secondary Navigation Bar */}
        <motion.nav 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.2 }}
          className="hidden lg:flex border-b border-gray-100 bg-white py-4 pointer-events-auto"
        >
          <div className="container mx-auto px-4 flex items-center justify-center space-x-12">
            {secondaryNavLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => setCurrentPage(link.id)}
                className={`text-[11px] font-bold uppercase tracking-[0.15em] transition-colors relative group ${currentPage === link.id ? 'text-black' : 'text-gray-600 hover:text-black'}`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-[2px] bg-black transition-all ${currentPage === link.id ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </button>
            ))}
          </div>
        </motion.nav>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setIsMenuOpen(false)}
          >
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-[80%] max-w-sm bg-white shadow-2xl p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-12">
                <div className="flex flex-col">
                  <h1 className="text-xl font-display font-bold tracking-tighter text-black leading-none">
                    ENERGETIC
                  </h1>
                  <span className="text-[10px] font-medium tracking-[0.2em] text-gray-500 uppercase">
                    #beenergetic
                  </span>
                </div>
                <button 
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col space-y-8">
                <div className="relative w-full group">
                  <div className="flex items-center border-b border-gray-300 focus-within:border-black transition-colors pb-2">
                    <Search size={18} className="text-gray-400 mr-3" />
                    <input
                      type="text"
                      placeholder="Search for Products"
                      className="w-full bg-transparent text-sm focus:outline-none placeholder:text-gray-400"
                    />
                  </div>
                </div>
                
                <div className="flex flex-col space-y-4">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Navigation</p>
                  {secondaryNavLinks.map((link) => (
                    <button 
                      key={link.id} 
                      onClick={() => { setCurrentPage(link.id); setIsMenuOpen(false); }}
                      className="text-xl font-bold uppercase tracking-wide hover:text-gray-500 transition-colors text-left"
                    >
                      {link.name}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-0">
        {currentPage === 'home' && (
          <>
            {/* Hero Section */}
            <section className="relative h-screen flex items-center overflow-hidden bg-black">
              {/* Full Width Hero Image */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
                className="absolute inset-0"
              >
                <img
                  src="https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&q=80&w=1920"
                  alt="B2B Leather Manufacturing"
                  className="w-full h-full object-cover brightness-50"
                  referrerPolicy="no-referrer"
                />
              </motion.div>

              <div className="container mx-auto px-4 relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 1.5 }}
                  className="max-w-4xl"
                >
                  <span className="inline-block px-4 py-1.5 rounded-none bg-white text-black text-[10px] font-bold tracking-[0.3em] uppercase mb-8">
                    B2B MANUFACTURING EXCELLENCE
                  </span>
                  <h1 className="text-4xl md:text-7xl font-display font-bold leading-[0.9] tracking-tighter mb-10 uppercase text-white">
                    PREMIUM <br />
                    <span className="text-gray-400 italic">LEATHER</span> <br />
                    CRAFTSMANSHIP
                  </h1>
                  <p className="text-xl text-gray-300 mb-12 max-w-lg leading-relaxed font-light">
                    Direct-from-factory wholesale manufacturing for global fashion brands. 
                    Uncompromising quality, custom-tailored for your business needs.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-6">
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setCurrentPage('shop')}
                      className="bg-white text-black px-12 py-6 rounded-none font-bold text-xs uppercase tracking-[0.3em] shadow-2xl transition-all"
                    >
                      Explore Collections
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </section>

      {/* Stats Section */}
      <section className="py-20 bg-black text-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { label: "Years of Manufacturing", value: "15+" },
              { label: "Global Retail Partners", value: "500+" },
              { label: "Annual Production Capacity", value: "50k+" },
              { label: "Compliance Rating", value: "99%" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <span className="block text-3xl md:text-4xl font-display font-bold mb-2">
                  <Counter value={stat.value} />
                </span>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em]">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stacked USP Section - Refined Stacking */}
      <section className="relative py-32 bg-gray-50">
        <div className="container mx-auto px-4 mb-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-xs font-bold text-gray-400 uppercase tracking-[0.4em] mb-4 block"
              >
                Our Competitive Edge
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-3xl md:text-5xl font-display font-bold leading-none uppercase tracking-tighter"
              >
                Why We Stand <br />
                <span className="text-gray-300 italic">Out From The Rest</span>
              </motion.h2>
            </div>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-gray-500 max-w-xs text-lg leading-relaxed"
            >
              We don't just make jackets; we craft legacies using the finest materials and ethical practices.
            </motion.p>
          </div>
        </div>

        <div className="container mx-auto px-4">
          <div className="relative max-w-5xl mx-auto">
            {sellingPoints.map((point, idx) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`sticky p-12 md:p-24 rounded-none shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border border-gray-100 flex flex-col md:flex-row items-center gap-16 mb-24 ${point.color}`}
                style={{ 
                  top: `${120 + idx * 40}px`,
                  zIndex: idx + 1,
                  transform: `scale(${1 - (sellingPoints.length - idx) * 0.02})`
                }}
              >
                <div className="w-24 h-24 md:w-40 md:h-40 rounded-none bg-black text-white flex items-center justify-center shrink-0 shadow-2xl shadow-black/20 group-hover:rotate-6 transition-transform">
                  <point.icon size={56} className="md:w-20 md:h-20" />
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-2xl md:text-3xl font-display font-bold mb-8 leading-tight tracking-tighter uppercase">{point.title}</h3>
                  <p className="text-xl text-gray-600 leading-relaxed font-medium">{point.desc}</p>
                  <motion.button
                    whileHover={{ x: 10 }}
                    className="mt-10 flex items-center text-black font-bold tracking-[0.3em] text-xs uppercase group"
                  >
                    Learn More 
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Selling Products */}
      {/* Featured Products / Clearance Section */}
      <section className="bg-white overflow-hidden border-y border-gray-100">
        <div className="grid lg:grid-cols-2 min-h-[800px]">
          {/* Left Panel: Featured / Sale */}
          <div className="relative h-[600px] lg:h-auto overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=1200"
              alt="Clearance Sale"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-500" />
            <div className="absolute bottom-16 left-16 right-16 text-white">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 leading-tight tracking-tight uppercase">
                  CLEARANCE SALE <br />
                  UP TO 50% OFF
                </h2>
                <p className="text-lg text-white/80 mb-10 max-w-md font-light leading-relaxed">
                  Massive price drops on select puffers, leather jackets, bags & more.
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white text-black px-10 py-5 rounded-none font-bold text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-gray-100 transition-all"
                >
                  Explore Collection Items
                </motion.button>
              </motion.div>
            </div>
          </div>

          {/* Right Panel: Product Scroll */}
          <div className="bg-gray-100 p-8 lg:p-16 flex flex-col">
            <div className="flex items-center justify-between mb-12">
              <h3 className="text-xs font-bold uppercase tracking-[0.4em] text-gray-400">New Arrivals</h3>
              <button 
                onClick={() => setCurrentPage('shop')}
                className="text-[10px] font-bold uppercase tracking-[0.2em] border-b border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-all"
              >
                View All
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-6 overflow-y-auto max-h-[700px] pr-4 custom-scrollbar">
              {products.filter(p => p.isNewArrival).slice(0, 8).map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className="relative aspect-[4/5] bg-white mb-6 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-[11px] font-bold uppercase tracking-widest leading-tight line-clamp-2 group-hover:text-gray-600 transition-colors">
                      {product.name}
                    </h4>
                    <p className="text-sm font-bold text-[#b91c1c]">{product.price}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Custom Jacket Banner */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative h-[300px] md:h-[400px] rounded-none overflow-hidden group"
          >
            <img
              src="https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=1920"
              alt="Custom Jacket Banner"
              className="w-full h-full object-cover brightness-[0.4] transition-transform duration-1000 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
              <motion.h2 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="text-2xl md:text-4xl font-display font-bold text-white mb-8 tracking-tighter uppercase"
              >
                DESIGN YOUR <span className="text-gray-400 italic">OWN</span>
              </motion.h2>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white text-black px-12 py-5 rounded-none font-bold text-xs uppercase tracking-[0.3em] hover:shadow-2xl hover:shadow-white/20 transition-all"
              >
                Customize Now
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Energetic Wears (About) */}
      <section id="about" className="py-32 bg-black text-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative aspect-square rounded-none overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1520975916090-3105956dac50?auto=format&fit=crop&q=80&w=1000"
                  alt="Craftsmanship"
                  className="w-full h-full object-cover transition-all duration-1000"
                  referrerPolicy="no-referrer"
                />
              </div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-12 -right-12 bg-white text-black p-12 rounded-none shadow-2xl max-w-xs hidden md:block"
              >
                <h4 className="text-xl font-display font-bold mb-4 tracking-tighter">Family Owned Heritage</h4>
                <p className="text-sm text-gray-500 leading-relaxed">Based in Sialkot, Pakistan, we bridge the gap between traditional handcrafted artistry and modern industrial standards.</p>
              </motion.div>
            </motion.div>

            <div className="relative">
              <motion.span 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-xs font-bold text-gray-500 uppercase tracking-[0.4em] mb-6 block"
              >
                Est. 2011
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-3xl md:text-5xl font-display font-bold mb-12 leading-none"
              >
                Energetic <br />
                <span className="text-gray-600 italic">Wears</span>
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl text-gray-400 leading-relaxed mb-16 font-medium"
              >
                Energetic Wears is a premier manufacturer and global exporter of high quality leather garments, technical gear, and accessories. We provide a seamless, end-to-end production experience for international retail brands.
              </motion.p>

              <div className="grid md:grid-cols-2 gap-12">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-xl font-bold mb-6 text-white flex items-center">
                    <span className="w-6 h-6 bg-white text-black rounded-none flex items-center justify-center mr-3 text-[10px] font-bold">01</span>
                    Expertise
                  </h3>
                  <ul className="space-y-4 text-sm text-gray-500">
                    <li>Fashion & Outerwear</li>
                    <li>Technical & Protective Gear</li>
                    <li>Premium Goods & Accessories</li>
                  </ul>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-xl font-bold mb-6 text-white flex items-center">
                    <span className="w-6 h-6 bg-white text-black rounded-none flex items-center justify-center mr-3 text-[10px] font-bold">02</span>
                    Partnership
                  </h3>
                  <ul className="space-y-4 text-sm text-gray-500">
                    <li>End-to-End OEM/ODM</li>
                    <li>Flexible MOQs</li>
                    <li>Global Export Reliability</li>
                  </ul>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-3xl font-display font-bold text-center mb-20 uppercase tracking-tight"
          >
            TRUSTED BY <span className="text-gray-400 italic">GLOBAL BRANDS</span>
          </motion.h2>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                whileHover={{ y: -10 }}
                className="bg-white p-12 rounded-none shadow-sm hover:shadow-2xl transition-all relative group border border-gray-100"
              >
                <div className="absolute -top-6 left-12 w-12 h-12 bg-black text-white rounded-none flex items-center justify-center text-2xl font-serif italic shadow-xl">
                  "
                </div>
                <p className="text-gray-600 mb-10 italic leading-relaxed text-lg font-light">
                  {t.text}
                </p>
                <div className="flex flex-col">
                  <h4 className="font-bold text-sm uppercase tracking-[0.2em]">{t.name}</h4>
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Verified Partner</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-24">
            <div className="lg:col-span-5">
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-xs font-bold text-gray-400 uppercase tracking-[0.4em] mb-6 block"
              >
                Inquiries
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-3xl md:text-5xl font-display font-bold mb-10 leading-[0.9] tracking-tighter"
              >
                Curious <br />
                <span className="text-gray-300">About Us?</span>
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-xl text-gray-500 leading-relaxed mb-12"
              >
                Find answers to common questions about our materials, customization, and global shipping.
              </motion.p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-black text-white px-10 py-5 rounded-none font-bold text-xs uppercase tracking-[0.3em] shadow-xl"
              >
                CONTACT SUPPORT
              </motion.button>
            </div>

            <div className="lg:col-span-7">
              <div className="space-y-2">
                {faqs.map((faq, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className={`rounded-none transition-all duration-500 border-b border-gray-100 ${activeFaq === idx ? 'bg-gray-50 p-8' : 'bg-white p-8 hover:bg-gray-50'}`}
                  >
                    <button
                      onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                      className="w-full flex items-center justify-between text-left group"
                    >
                      <span className="text-lg font-bold uppercase tracking-tight">{faq.q}</span>
                      <motion.div
                        animate={{ rotate: activeFaq === idx ? 180 : 0 }}
                        className={`shrink-0 ml-4 w-10 h-10 rounded-none flex items-center justify-center transition-colors ${activeFaq === idx ? 'bg-black text-white' : 'bg-gray-100 text-black group-hover:bg-black group-hover:text-white'}`}
                      >
                        <ChevronDown size={20} />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {activeFaq === idx && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="pt-6 text-gray-500 leading-relaxed text-lg">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-32 bg-black text-white overflow-hidden relative">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute -top-1/2 -left-1/4 w-full aspect-square border border-white/10 rounded-full" />
          <div className="absolute -bottom-1/2 -right-1/4 w-full aspect-square border border-white/10 rounded-full" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              className="mb-12 inline-flex w-24 h-24 bg-white/10 backdrop-blur-md rounded-none items-center justify-center text-white border border-white/10"
            >
              <Package size={48} />
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-2xl md:text-4xl font-display font-bold mb-8 tracking-tighter"
            >
              STAY <span className="text-gray-600 italic">ENERGETIC.</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-400 mb-16 max-w-2xl mx-auto leading-relaxed"
            >
              Join our inner circle for exclusive access to new collections, 
              limited drops, and the artistry behind every stitch.
            </motion.p>
            
            <motion.form 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col md:flex-row gap-6 max-w-2xl mx-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Your Email Address"
                required
                className="flex-1 bg-white/5 border border-white/10 rounded-none py-6 px-10 text-lg focus:outline-none focus:ring-2 focus:ring-white/20 transition-all placeholder:text-gray-600"
              />
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white text-black px-12 py-6 rounded-none font-bold text-xs uppercase tracking-[0.3em] hover:bg-gray-100 transition-all shadow-[0_20px_50px_rgba(255,255,255,0.1)]"
              >
                SUBSCRIBE
              </motion.button>
            </motion.form>
          </div>
        </div>
      </section>
    </>
  )}

        {currentPage === 'about' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white"
        >
          {/* About Hero */}
          <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-gray-50 border-b border-gray-100">
            <div className="container mx-auto px-4 relative z-10">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="lg:col-span-1">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <span className="inline-block px-4 py-1.5 rounded-none bg-black text-white text-[10px] font-bold tracking-[0.3em] uppercase mb-8">
                      Our Story
                    </span>
                    <h1 className="text-2xl md:text-4xl font-display font-bold leading-[0.9] tracking-tighter mb-10 uppercase">
                      CRAFTING <br />
                      <span className="text-gray-300 italic">EXCELLENCE</span>
                    </h1>
                    <p className="text-xl text-gray-500 mb-12 max-w-lg leading-relaxed font-light">
                      Every fashion brand has a story—and at Energetic Wears, 
                      we help you tell yours through exceptional leather products.
                    </p>
                  </motion.div>
                </div>

                <div className="lg:col-span-1 relative">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, x: 50 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="relative z-20"
                  >
                    <div className="relative aspect-[4/5] rounded-none overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] group">
                      <img
                        src="https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=1000"
                        alt="Leather Craftsmanship"
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>

          {/* Brand Story */}
          <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-24 items-start">
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="space-y-8 text-xl text-gray-600 leading-relaxed font-light"
                >
                  <p>
                    Every fashion brand has a story—and at Energetic Wears, we help you tell yours through exceptional leather products. As a family-owned manufacturer and exporter of leather goods, garments, apparel, and accessories—including leather jackets, bags, gloves, and more—we combine craftsmanship, passion, and precision to create pieces that inspire.
                  </p>
                  <p>
                    Founded by three brothers united by a love for leather and design, Energetic Wears was built on trust, dedication, and excellence. With our parents’ blessings, we turned a shared dream into a global business, helping boutiques, fashion retailers, wholesalers, and startups bring their own premium leatherwear collections to life.
                  </p>
                  <p>
                    From timeless wholesale leather jackets to carefully crafted accessories, every product reflects our commitment to quality, style, and durability. We work closely with our clients to ensure custom-made solutions that align with their brand identity and business goals. Every stitch, finish, and detail tells a story of passion and precision.
                  </p>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-black text-white p-12 md:p-16 rounded-none shadow-2xl relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                  <h3 className="text-2xl font-display font-bold mb-12 tracking-tight relative z-10 uppercase">Why Fashion Brands Choose Energetic Wears</h3>
                  <ul className="space-y-8 relative z-10">
                    {[
                      { icon: Star, title: "Artisan Craftsmanship", desc: "Family-owned expertise with uncompromising quality." },
                      { icon: Package, title: "Diverse Product Range", desc: "Leather jackets, bags, gloves, belts, wallets, garments, apparel, and accessories for every market need." },
                      { icon: CheckCircle2, title: "Tailored Solutions", desc: "Custom designs that elevate your brand and delight your customers." },
                      { icon: Compass, title: "Global Reliability", desc: "On-time delivery and dedicated support worldwide." }
                    ].map((item, i) => (
                      <li key={i} className="flex gap-6">
                        <div className="w-10 h-10 bg-white/10 flex items-center justify-center rounded-none shrink-0">
                          <item.icon size={18} className="text-gray-400" />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg mb-2 uppercase tracking-tight">{item.title}</h4>
                          <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Visual Gallery */}
          <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=600",
                  "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&q=80&w=600",
                  "https://images.unsplash.com/photo-1520975916090-3105956dac50?auto=format&fit=crop&q=80&w=600",
                  "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&q=80&w=600",
                  "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&q=80&w=600",
                  "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&q=80&w=600",
                  "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=600",
                  "https://images.unsplash.com/photo-1520975916090-3105956dac50?auto=format&fit=crop&q=80&w=600"
                ].map((img, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="aspect-[3/4] overflow-hidden"
                  >
                    <img 
                      src={img} 
                      alt="Leather Craftsmanship" 
                      className="w-full h-full object-cover transition-all duration-700 hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Mission & Vision */}
          <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-2 gap-12">
                <motion.div 
                  whileHover={{ y: -10 }}
                  className="bg-white p-12 md:p-16 rounded-none border border-gray-100 shadow-sm transition-all duration-500"
                >
                  <div className="w-16 h-16 bg-black text-white flex items-center justify-center mb-8">
                    <Target size={32} />
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-8 tracking-tight uppercase">Mission Statement</h3>
                  <div className="space-y-6 text-gray-600 leading-relaxed text-lg font-light">
                    <p>
                      At Energetic Wears, our mission is to craft high-quality, custom-made wholesale leather jackets that exceed the expectations of fashion boutiques, retailers, wholesalers, and startups worldwide. We are dedicated to creating leather products that combine timeless craftsmanship with modern design, building lasting partnerships with our customers through exceptional customer service, reliability, and personalized attention.
                    </p>
                    <p>
                      Moreover, we provide a pleasant, fair and diverse environment, allowing our associates to develop in their careers and experience continuous improvements in their lifestyles. Our goal is to offer innovative solutions that help grow businesses, enhance fashion collections, and deliver unique leather products that resonate with customers across the globe.
                    </p>
                  </div>
                </motion.div>
                <motion.div 
                  whileHover={{ y: -10 }}
                  className="bg-white p-12 md:p-16 rounded-none border border-gray-100 shadow-sm transition-all duration-500"
                >
                  <div className="w-16 h-16 bg-black text-white flex items-center justify-center mb-8">
                    <Eye size={32} />
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-8 tracking-tight uppercase">Vision Statement</h3>
                  <p className="text-gray-600 leading-relaxed text-lg font-light">
                    Our vision is to be a global leader in the leather jacket manufacturing industry, renowned for our commitment to quality, innovation, and customer satisfaction. We aim to empower fashion businesses, from established boutiques to emerging startups, by providing premium leather jackets that reflect our passion for craftsmanship and excellence. We aspire to build a lasting legacy as a family-owned company that is trusted by customers worldwide for its integrity, creativity, and dedication to the art of leather craftsmanship.
                  </p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Quality Promise */}
          <section className="py-32 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center mb-24">
                <motion.span 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="text-xs font-bold text-gray-400 uppercase tracking-[0.4em] mb-6 block"
                >
                  Our Commitment
                </motion.span>
                <h2 className="text-3xl md:text-5xl font-display font-bold mb-8 tracking-tighter uppercase">QUALITY <span className="text-gray-300 italic">PROMISE</span></h2>
                <p className="text-xl text-gray-500 leading-relaxed font-light">
                  At Energetic Wears, we believe that a premium leather product is only as good as the standards behind it. As a direct manufacturer, we take full accountability for every stitch, hide, and hardware component that leaves our facility.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { 
                    title: "Precision Sourcing", 
                    desc: "We utilize a rigorous 5-stage inspection protocol, beginning with the selection of premium REACH-compliant leathers. Every hide is audited for grain consistency, tensile strength, and thickness before it reaches the cutting table." 
                  },
                  { 
                    title: "Technical Excellence", 
                    desc: "Whether we are crafting a luxury fashion garment or high-performance technical gear, our production follows strict international tolerances. From YKK hardware integration to high-density safety stitching, we ensure our products meet the durability demands of the USA, EU, UK and global markets." 
                  },
                  { 
                    title: "Total Transparency", 
                    desc: "Quality is not just a final check; it is a continuous process. We provide our partners with full visibility into our QC Checklists and production milestones, ensuring that the “Made in Pakistan” label on our products stands for world-class craftsmanship and reliability." 
                  }
                ].map((pillar, i) => (
                  <div key={i} className="p-12 bg-gray-50 rounded-none border border-gray-100 hover:bg-black hover:text-white transition-all duration-500 group">
                    <span className="text-2xl font-display font-bold mb-8 block text-gray-200 group-hover:text-gray-800 transition-colors">0{i+1}</span>
                    <h4 className="text-2xl font-bold mb-6 tracking-tight uppercase">{pillar.title}</h4>
                    <p className="text-gray-500 group-hover:text-gray-400 leading-relaxed font-light">{pillar.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </motion.div>
      )}

      {currentPage === 'contact' && (
        <ComingSoon title="Contact Us" />
      )}

      {secondaryNavLinks.some(link => link.id === currentPage) && !['about', 'blogs', 'custom-leather-jackets', 'shop'].includes(currentPage) && (
        <ComingSoon title={secondaryNavLinks.find(link => link.id === currentPage)?.name || ""} />
      )}

      {currentPage === 'shop' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white min-h-screen"
        >
          {/* Shop Header */}
          <section className="py-24 bg-gray-50 border-b border-gray-100">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-[0.4em] mb-6 block">
                  Premium Leather Goods
                </span>
                <h1 className="text-6xl md:text-8xl font-display font-bold leading-none tracking-tighter uppercase">
                  OUR <br />
                  <span className="text-gray-300 italic">COLLECTION</span>
                </h1>
              </div>
            </div>
          </section>

          <section className="py-24">
            <div className="container mx-auto px-4">
              <div className="flex flex-col lg:flex-row gap-16">
                {/* Sidebar Filter */}
                <aside className="lg:w-64 flex-shrink-0">
                  <div className="sticky top-32">
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-8 pb-4 border-b border-gray-100">Filter By</h3>
                    <div className="space-y-6">
                      {[
                        'All',
                        'New Arrivals',
                        "Men's Jackets",
                        "Women's Jackets",
                        'Leather Bags',
                        'Leather Gloves & Mittens',
                        'Belts & Wallets'
                      ].map((cat) => (
                        <button
                          key={cat}
                          onClick={() => {
                            if (cat === 'All') {
                              setSelectedFilters(['All']);
                            } else {
                              const newFilters = selectedFilters.includes('All') 
                                ? [cat] 
                                : selectedFilters.includes(cat)
                                  ? selectedFilters.filter(f => f !== cat)
                                  : [...selectedFilters, cat];
                              setSelectedFilters(newFilters.length === 0 ? ['All'] : newFilters);
                            }
                          }}
                          className={`flex items-center w-full text-sm font-medium transition-colors hover:text-black ${selectedFilters.includes(cat) ? 'text-black' : 'text-gray-400'}`}
                        >
                          <div className={`w-4 h-4 border mr-3 flex items-center justify-center transition-colors ${selectedFilters.includes(cat) ? 'bg-black border-black' : 'border-gray-300'}`}>
                            {selectedFilters.includes(cat) && <Check size={10} className="text-white" />}
                          </div>
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                </aside>

                {/* Product Grid */}
                <div className="flex-1">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                    {products
                      .filter(p => {
                        if (selectedFilters.includes('All')) return true;
                        return selectedFilters.some(filter => {
                          if (filter === 'New Arrivals') return p.isNewArrival;
                          return p.category === filter;
                        });
                      })
                      .map((product) => (
                        <motion.div 
                          key={product.id}
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="group cursor-pointer"
                          onClick={() => setSelectedProduct(product)}
                        >
                          <div className="relative aspect-[4/5] bg-gray-100 mb-6 overflow-hidden">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <motion.button 
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedProduct(product);
                              }}
                              className="absolute bottom-6 left-6 right-6 bg-white text-black py-4 text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                            >
                              Quick View
                            </motion.button>
                          </div>
                          <div className="space-y-2">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{product.category}</span>
                            <h3 className="text-sm font-bold uppercase tracking-tight group-hover:text-gray-600 transition-colors leading-tight">
                              {product.name}
                            </h3>
                            <div className="flex items-center justify-between pt-2">
                              <span className="text-sm font-medium">{product.price}</span>
                              <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} size={10} className="fill-black text-black" />
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </motion.div>
      )}

      {currentPage === 'blogs' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white min-h-screen"
        >
          {/* Blog Header */}
          <section className="py-24 bg-gray-50 border-b border-gray-100">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="max-w-2xl">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-[0.4em] mb-6 block">
                    The Energetic Journal
                  </span>
                  <h1 className="text-3xl md:text-5xl font-display font-bold leading-none tracking-tighter uppercase">
                    INSIGHTS & <br />
                    <span className="text-gray-300 italic">INNOVATION</span>
                  </h1>
                </div>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setBlogView('grid')}
                    className={`p-3 transition-colors ${blogView === 'grid' ? 'bg-black text-white' : 'bg-white text-black border border-gray-200 hover:bg-gray-50'}`}
                  >
                    <Grid size={20} />
                  </button>
                  <button 
                    onClick={() => setBlogView('list')}
                    className={`p-3 transition-colors ${blogView === 'list' ? 'bg-black text-white' : 'bg-white text-black border border-gray-200 hover:bg-gray-50'}`}
                  >
                    <List size={20} />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Blog Filters */}
          <section className="py-8 border-b border-gray-100 sticky top-20 bg-white/80 backdrop-blur-md z-40">
            <div className="container mx-auto px-4">
              <div className="flex items-center gap-4 overflow-x-auto no-scrollbar pb-2 md:pb-0">
                {['All', 'Craftsmanship', 'Trends', 'Sustainability', 'Business'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setBlogFilter(filter)}
                    className={`px-8 py-2 text-[11px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${blogFilter === filter ? 'bg-black text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Blog Posts */}
          <section className="py-24">
            <div className="container mx-auto px-4">
              <div className={blogView === 'grid' ? "grid md:grid-cols-2 lg:grid-cols-3 gap-12" : "flex flex-col gap-12"}>
                {blogPosts
                  .filter(post => blogFilter === 'All' || post.category === blogFilter)
                  .map((post, i) => (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className={`group cursor-pointer ${blogView === 'list' ? 'flex flex-col md:flex-row gap-8 items-center border-b border-gray-100 pb-12 last:border-0' : ''}`}
                    >
                      <div className={`overflow-hidden relative ${blogView === 'list' ? 'w-full md:w-1/3 aspect-video' : 'aspect-[16/10] mb-8'}`}>
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-4 left-4 bg-white px-4 py-1 text-[10px] font-bold uppercase tracking-widest">
                          {post.category}
                        </div>
                      </div>
                      <div className={blogView === 'list' ? 'flex-1' : ''}>
                        <div className="flex items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                          <span>{post.date}</span>
                          <span className="w-1 h-1 bg-gray-300 rounded-full" />
                          <span>{post.author}</span>
                        </div>
                        <h3 className={`${blogView === 'list' ? 'text-3xl' : 'text-2xl'} font-display font-bold mb-4 uppercase tracking-tight group-hover:text-gray-600 transition-colors`}>
                          {post.title}
                        </h3>
                        <p className="text-gray-500 leading-relaxed mb-8 font-light">
                          {post.excerpt}
                        </p>
                        <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] group/btn">
                          Read Story 
                          <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-2" />
                        </button>
                      </div>
                    </motion.article>
                  ))}
              </div>
            </div>
          </section>
        </motion.div>
      )}

      {currentPage === 'custom-leather-jackets' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white min-h-screen relative"
        >
          {/* Custom Hero */}
          <section className="py-24 bg-gray-50 border-b border-gray-100">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-[0.4em] mb-6 block">
                  Bespoke Manufacturing
                </span>
                <h1 className="text-6xl md:text-8xl font-display font-bold leading-none tracking-tighter uppercase">
                  YOUR VISION, <br />
                  <span className="text-gray-300 italic">OUR CRAFT</span>
                </h1>
                <p className="text-xl text-gray-500 mt-12 max-w-2xl leading-relaxed font-light">
                  From individual pieces to full collections, we bring your unique leather designs to life with unparalleled precision and artistry.
                </p>
              </div>
            </div>
          </section>

          {/* Sticky Button */}
          <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50">
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const element = document.getElementById('request-form');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-black text-white px-12 py-6 rounded-none font-bold text-xs uppercase tracking-[0.3em] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] flex items-center gap-4"
            >
              Request Custom Jacket
              <ArrowRight size={16} />
            </motion.button>
          </div>

          {/* The Process */}
          <section className="py-32">
            <div className="container mx-auto px-4">
              <div className="text-center mb-24">
                <h2 className="text-2xl md:text-4xl font-display font-bold uppercase tracking-tighter mb-6">The Bespoke Process</h2>
                <div className="w-24 h-1 bg-black mx-auto" />
              </div>

              <div className="grid md:grid-cols-4 gap-12">
                {[
                  { step: "01", title: "Consultation", desc: "We discuss your vision, sketches, and specific requirements to define the project scope." },
                  { step: "02", title: "Material Selection", desc: "Choose from our curated library of premium leathers, custom linings, and high-grade hardware." },
                  { step: "03", title: "Prototyping", desc: "Our master tailors create a sample to perfect the fit, silhouette, and design details." },
                  { step: "04", title: "Production", desc: "Handcrafted perfection delivered with rigorous quality control at every stage." }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="text-center group"
                  >
                    <div className="text-4xl font-display font-bold text-gray-100 mb-6 group-hover:text-black transition-colors duration-500">{item.step}</div>
                    <h4 className="text-xl font-bold uppercase tracking-tight mb-4">{item.title}</h4>
                    <p className="text-gray-500 font-light leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Case Studies */}
          <section className="py-32 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-[0.4em] mb-4 block">Portfolio</span>
                  <h2 className="text-2xl md:text-4xl font-display font-bold uppercase tracking-tighter">Case Studies</h2>
                </div>
                <p className="max-w-md text-gray-500 font-light">Explore how we've helped brands and individuals realize their most ambitious leather projects.</p>
              </div>

              <div className="grid lg:grid-cols-2 gap-16">
                {[
                  {
                    title: "The Urban Maverick",
                    client: "London Boutique Brand",
                    image: "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&q=80&w=1000",
                    desc: "A limited run of 50 hand-distressed biker jackets featuring custom-embossed hardware and silk-screened linings."
                  },
                  {
                    title: "Vintage Revival",
                    client: "Private Collector",
                    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=1000",
                    desc: "Recreating a 1970s archive piece using vegetable-tanned horsehide and period-correct construction techniques."
                  }
                ].map((study, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="group cursor-pointer"
                  >
                    <div className="aspect-[16/10] overflow-hidden mb-8">
                      <img 
                        src={study.image} 
                        alt={study.title} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                      <span>{study.client}</span>
                    </div>
                    <h3 className="text-2xl font-display font-bold uppercase tracking-tight mb-4">{study.title}</h3>
                    <p className="text-gray-500 font-light leading-relaxed mb-8">{study.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Request Form Section */}
          <section id="request-form" className="py-32 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto bg-gray-50 overflow-hidden flex flex-col md:flex-row shadow-2xl">
                <div className="md:w-1/3 bg-black text-white p-12 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-display font-bold uppercase tracking-tighter mb-6">Start Your Project</h3>
                    <p className="text-gray-400 font-light leading-relaxed">Fill out the form and our bespoke team will contact you within 24 hours to discuss your requirements.</p>
                  </div>
                  <div className="space-y-4 text-sm font-bold uppercase tracking-widest text-gray-500 mt-12">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-white" />
                      Direct Manufacturing
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-white" />
                      Global Shipping
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-white" />
                      Master Craftsmanship
                    </div>
                  </div>
                </div>

                <div className="flex-1 p-12">
                  <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); alert('Request Sent Successfully!'); }}>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Full Name</label>
                        <input type="text" required className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-black transition-colors bg-transparent" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Email Address</label>
                        <input type="email" required className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-black transition-colors bg-transparent" />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Company (Optional)</label>
                        <input type="text" className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-black transition-colors bg-transparent" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Project Type</label>
                        <select className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-black transition-colors bg-transparent">
                          <option>Individual Custom Piece</option>
                          <option>Small Batch (10-50 units)</option>
                          <option>Wholesale/Bulk Production</option>
                          <option>Brand Prototype</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Project Details</label>
                      <textarea rows={4} required className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-black transition-colors resize-none bg-transparent" placeholder="Tell us about your design, materials, and quantity..."></textarea>
                    </div>
                    <button type="submit" className="w-full bg-black text-white py-6 font-bold text-xs uppercase tracking-[0.3em] hover:bg-gray-900 transition-colors">
                      Submit Request
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </motion.div>
      )}

    </main>

    {/* Footer */}
    <footer className="py-32 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-12 gap-16 mb-24">
            <div className="md:col-span-4">
              <div className="flex flex-col mb-8">
                <h1 className="text-2xl font-display font-bold tracking-tighter text-black leading-none">
                  ENERGETIC
                </h1>
                <span className="text-xs font-medium tracking-[0.4em] text-gray-400 uppercase mt-2">
                  #beenergetic
                </span>
              </div>
              <p className="text-gray-500 leading-relaxed mb-8 max-w-xs">
                Global exporters of premium leather garments. Crafting excellence since 2011.
              </p>
              <div className="flex gap-4">
                {['FB', 'IG', 'TW', 'LI'].map(social => (
                  <motion.a 
                    key={social}
                    whileHover={{ y: -5 }}
                    href="#" 
                    className="w-10 h-10 rounded-none bg-gray-50 flex items-center justify-center text-[10px] font-bold hover:bg-black hover:text-white transition-all"
                  >
                    {social}
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="md:col-span-4">
              <h4 className="font-bold uppercase tracking-widest text-xs mb-8">Navigation</h4>
              <ul className="grid grid-cols-2 gap-4">
                {secondaryNavLinks.map(link => (
                  <li key={link.name}>
                    <button 
                      onClick={() => setCurrentPage(link.id)} 
                      className="text-gray-500 hover:text-black transition-colors text-sm font-medium text-left"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
                <li>
                  <button 
                    onClick={() => setCurrentPage('contact')} 
                    className="text-gray-500 hover:text-black transition-colors text-sm font-medium text-left"
                  >
                    Contact Us
                  </button>
                </li>
              </ul>
            </div>

            <div className="md:col-span-4">
              <h4 className="font-bold uppercase tracking-widest text-xs mb-8">Contact</h4>
              <ul className="space-y-4 text-gray-500 text-sm font-medium">
                <li>Sialkot, Pakistan</li>
                <li>support@energeticwears.com</li>
                <li>+92 300 1234567</li>
              </ul>
            </div>
          </div>
          
          <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              &copy; 2026 Energetic Leather. All rights reserved.
            </p>
            <div className="flex gap-8">
              <a href="#" className="text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-black transition-colors">Privacy Policy</a>
              <a href="#" className="text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-black transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductDetail 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
            onSelectProduct={(p) => setSelectedProduct(p)}
          />
        )}
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 z-[150] w-14 h-14 bg-black text-white rounded-none shadow-2xl flex items-center justify-center hover:bg-gray-800 transition-colors active:scale-90"
          >
            <ChevronUp size={28} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
