import React, { useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import styles from "./ShopByCategory.module.css";

// === ASSET IMPORTS ===
import pic1 from "../assets/shop1/cough.png";
import pic2 from "../assets/shop1/accessories.png";
import pic3 from "../assets/shop1/Vitamins.png";
import pic5 from "../assets/shop1/reproductive.png";
import pic6 from "../assets/shop1/chronic.png";
import pic7 from "../assets/shop1/Allergy.png";
import pic8 from "../assets/shop1/Heartburn.png";
import pic9 from "../assets/products/Headache2.png";
import pic10 from "../assets/products/Cramps.png";
import pic11 from "../assets/products/Acne.png";
import pic12 from "../assets/products/UTI.png";

// === CATEGORY DATA ===
interface Category {
  id: string;
  title: string;
  image: string;
}

const categories: Category[] = [
  { id: "general", title: "General Wellness & Support", image: pic1 },
  { id: "personal", title: "Personal & Lifestyle", image: pic7 },
  { id: "private", title: "Discreet / Private Purchases", image: pic8 },
  { id: "sexual", title: "Sexual & Reproductive Health", image: pic5 },
  { id: "sti", title: "STI Management", image: pic7 },
  { id: "vaginal", title: "Vaginal & Genital Hygiene", image: pic8 },
  { id: "cough", title: "Cough & Cold", image: pic1 },
  { id: "allergy", title: "Allergy", image: pic7 },
  { id: "heartburn", title: "Heartburn", image: pic8 },
  { id: "chronic", title: "Chronic Diseases", image: pic6 },
  { id: "vitamins", title: "Vitamins & Supplements", image: pic3 },
  { id: "reproductive", title: "Reproductive Health", image: pic5 },
  { id: "accessories", title: "Medical Accessories", image: pic2 },
  { id: "other", title: "Other Ailments", image: pic9 },
  { id: "cramps", title: "Menstrual Cramps", image: pic10 },
  { id: "acne", title: "Acne / Pimples", image: pic11 },
  { id: "uti", title: "UTI", image: pic12 },
];

// === COMPONENT ===
const ShopByCategory: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleScroll = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollWidth = container.clientWidth;
    const scrollAmount = direction === "left" ? -scrollWidth * 0.8 : scrollWidth * 0.8;

    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const handleImageClick = (image: string) => {
    // Open modal only for large screens
    if (window.innerWidth >= 1024) {
      setSelectedImage(image);
    }
  };

  const closeModal = () => setSelectedImage(null);

  return (
    <section className={styles.section} aria-labelledby="shop-category-title">
      <div className={styles.header}>
        <h2 id="shop-category-title" className={styles.title}>
          Shop by Category
        </h2>
      </div>

      <div className={styles.carouselWrapper}>
        <button
          className={`${styles.arrowBtn} ${styles.leftArrow}`}
          aria-label="Scroll left"
          onClick={() => handleScroll("left")}
        >
          <FaChevronLeft />
        </button>

        <div ref={scrollRef} className={styles.carousel}>
          {categories.map((cat) => (
            <article key={cat.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <img
                  src={cat.image}
                  alt={cat.title}
                  className={styles.image}
                  loading="lazy"
                />
                <button
                  className={styles.quickViewBtn}
                  onClick={() => handleImageClick(cat.image)}
                >
                  Quick View
                </button>
              </div>
              <h3 className={styles.cardTitle}>{cat.title}</h3>
            </article>
          ))}
        </div>

        <button
          className={`${styles.arrowBtn} ${styles.rightArrow}`}
          aria-label="Scroll right"
          onClick={() => handleScroll("right")}
        >
          <FaChevronRight />
        </button>
      </div>

      {/* === MODAL FOR QUICK VIEW === */}
      {selectedImage && (
        <div className={styles.modalBackdrop} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.closeBtn}
              onClick={closeModal}
              aria-label="Close preview"
            >
              <FaTimes />
            </button>
            <img src={selectedImage} alt="Quick View" className={styles.modalImage} />
          </div>
        </div>
      )}
    </section>
  );
};

export default ShopByCategory;
