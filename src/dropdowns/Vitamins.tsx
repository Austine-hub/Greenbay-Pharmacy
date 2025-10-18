// File: src/components/Products2.tsx
import { useRef, useState, useEffect } from "react";
import styles from "./Vitamins.module.css";

// === Import local images (replace with your actual vitamin/supplement images) ===
import image1 from "../assets/vitamins/vitamin_d.png";
import image2 from "../assets/vitamins/vitamin_c.png";
import image3 from "../assets/vitamins/omega3.png";
import image4 from "../assets/vitamins/multivitamin.png";
import image5 from "../assets/vitamins/zinc.png";
import image6 from "../assets/vitamins/magnesium.png";
import image7 from "../assets/vitamins/probiotics.png";
import image8 from "../assets/vitamins/collagen.png";
import image9 from "../assets/vitamins/calcium.png";
import image10 from "../assets/vitamins/iron.png";
import image11 from "../assets/vitamins/vitamin_b12.png";
import image12 from "../assets/vitamins/turmeric.png";

interface Product {
  id: string;
  name: string;
  category: string;
  packSize: string;
  currentPrice: number;
  originalPrice: number;
  discount?: string;
  image: string;
}

const WHATSAPP_NUMBER = "254796787207"; // Replace with your real business number

const productsSeed: Product[] = [
  { id: "1", name: "Vitamin D3 1000 IU Softgels", category: "Bone & Immunity Support", packSize: "100 Softgels", currentPrice: 950, originalPrice: 1150, discount: "17% Off", image: image1 },
  { id: "2", name: "Vitamin C 1000mg Tablets", category: "Antioxidant & Immune Health", packSize: "60 Tablets", currentPrice: 720, originalPrice: 880, discount: "18% Off", image: image2 },
  { id: "3", name: "Omega-3 Fish Oil 1000mg", category: "Heart & Brain Health", packSize: "120 Softgels", currentPrice: 1450, originalPrice: 1650, discount: "12% Off", image: image3 },
  { id: "4", name: "Daily Multivitamin", category: "Overall Wellness", packSize: "90 Tablets", currentPrice: 980, originalPrice: 1200, discount: "18% Off", image: image4 },
  { id: "5", name: "Zinc 50mg Tablets", category: "Immune & Skin Health", packSize: "100 Tablets", currentPrice: 550, originalPrice: 650, discount: "15% Off", image: image5 },
  { id: "6", name: "Magnesium Citrate 200mg", category: "Muscle & Nerve Support", packSize: "100 Tablets", currentPrice: 830, originalPrice: 950, discount: "13% Off", image: image6 },
  { id: "7", name: "Probiotic Complex", category: "Digestive Health", packSize: "60 Capsules", currentPrice: 1250, originalPrice: 1450, discount: "14% Off", image: image7 },
  { id: "8", name: "Collagen Peptides Powder", category: "Skin, Hair & Joint Support", packSize: "300g", currentPrice: 2100, originalPrice: 2500, discount: "16% Off", image: image8 },
  { id: "9", name: "Calcium + Vitamin D3 Tablets", category: "Bone Strength", packSize: "60 Tablets", currentPrice: 970, originalPrice: 1100, discount: "12% Off", image: image9 },
  { id: "10", name: "Iron (Ferrous Sulfate) 65mg", category: "Energy & Blood Health", packSize: "100 Tablets", currentPrice: 690, originalPrice: 780, discount: "11% Off", image: image10 },
  { id: "11", name: "Vitamin B12 1000mcg", category: "Energy & Nerve Support", packSize: "100 Tablets", currentPrice: 640, originalPrice: 750, discount: "15% Off", image: image11 },
  { id: "12", name: "Turmeric Curcumin 1500mg", category: "Joint & Inflammation Support", packSize: "90 Capsules", currentPrice: 1350, originalPrice: 1550, discount: "13% Off", image: image12 },
];

export default function Vitamins() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);
  const [products] = useState<Product[]>(productsSeed);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleResize = () => {
      setTimeout(() => {
        setCanLeft(el.scrollLeft > 0);
        setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
      }, 50);
    };

    handleResize();
    el.addEventListener("scroll", handleResize, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      el.removeEventListener("scroll", handleResize);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = Math.max(el.clientWidth * 0.7, 300);
    el.scrollTo({
      left: dir === "left" ? el.scrollLeft - amount : el.scrollLeft + amount,
      behavior: "smooth",
    });
  };

  const formatPrice = (value: number) =>
    new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
      .format(value)
      .replace("Ksh", "KSH");

  const orderViaWhatsApp = (p: Product) => {
    const text = encodeURIComponent(
      `Hello, I'd like to order: ${p.name} (${p.packSize}) - ${formatPrice(
        p.currentPrice
      )}. Product ID: ${p.id}`
    );
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <section
      className={styles.productsSection}
      aria-labelledby="popular-products-title"
    >
      <div className={styles.header}>
        <h2 id="popular-products-title" className={styles.title}>
          Top Vitamins & Supplements
        </h2>

        <div
          className={styles.navigation}
          role="group"
          aria-label="Scroll products"
        >
          <button
            className={`${styles.navButton} ${!canLeft ? styles.disabled : ""}`}
            onClick={() => scroll("left")}
            disabled={!canLeft}
            aria-label="Scroll left"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18l-6-6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            className={`${styles.navButton} ${!canRight ? styles.disabled : ""}`}
            onClick={() => scroll("right")}
            disabled={!canRight}
            aria-label="Scroll right"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 18l6-6-6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className={styles.productsContainer} ref={scrollRef} role="list">
        {products.map((p) => (
          <article
            key={p.id}
            className={styles.productCard}
            role="listitem"
            aria-label={p.name}
          >
            {p.discount && (
              <div className={styles.discountBadge} aria-hidden>
                {p.discount}
              </div>
            )}

            <div className={styles.imageContainer}>
              <img
                src={p.image}
                alt={p.name}
                className={styles.productImage}
                loading="lazy"
              />
            </div>

            <div className={styles.productInfo}>
              <h3 className={styles.productName}>{p.name}</h3>
              <div className={styles.productMeta}>
                <span className={styles.category}>{p.category}</span>
                <span className={styles.packSize}>Pack Size: {p.packSize}</span>
              </div>

              <div className={styles.priceContainer}>
                <span className={styles.currentPrice}>
                  {formatPrice(p.currentPrice)}
                </span>
                {p.originalPrice > p.currentPrice && (
                  <span className={styles.originalPrice}>
                    {formatPrice(p.originalPrice)}
                  </span>
                )}
              </div>

              <div className={styles.actions}>
                <button
                  className={styles.whatsappButton}
                  onClick={() => orderViaWhatsApp(p)}
                  aria-label={`Order ${p.name} via WhatsApp`}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    aria-hidden
                    focusable="false"
                  >
                    <path
                      fill="currentColor"
                      d="M20.52 3.48A11.93 11.93 0 0012 .5C6.21.5 1.5 5.2 1.5 11c0 1.94.5 3.82 1.45 5.47L.5 23.5l7.2-1.88A11.5 11.5 0 0012 22.5c5.79 0 10.5-4.7 10.5-10.5 0-3-1.17-5.78-3.98-7.52z"
                    />
                    <path
                      fill="#fff"
                      d="M17.2 14.1c-.3-.1-1.8-.9-2-.9s-.4 0-.6.3c-.2.3-.7.9-.9 1-.2.1-.4.1-.7 0-1.2-.6-2.3-1.9-3.1-3.4-.2-.4 0-.6.2-.8.2-.2.4-.5.6-.8.2-.3.2-.6.3-.9 0-.3-.2-.6-.4-.8-.3-.2-.7-.4-1.2-.3-.5.1-.9.3-1.4.8-.5.5-.6 1.1-.2 1.9.4.8 1.1 1.9 2.1 3.2 1 1.2 1.9 2 3.1 2.6 1.1.6 1.8.7 2.4.7.4 0 .9 0 1.1-.1s.9-.4 1.1-.8c.2-.4.2-.8.1-.9-.1-.1-.2-.2-.5-.3z"
                    />
                  </svg>
                  <span className={styles.whatsappText}>Order</span>
                </button>

                <button
                  className={styles.infoButton}
                  aria-label={`More info about ${p.name}`}
                  onClick={() =>
                    alert(`${p.name} — ${formatPrice(p.currentPrice)}`)
                  }
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2a10 10 0 110 20 10 10 0 010-20zM11 10h2v6h-2v-6zm0-4h2v2h-2V6z"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
