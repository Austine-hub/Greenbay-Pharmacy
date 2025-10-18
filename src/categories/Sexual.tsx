// src/components/offers/Offers.tsx
import React, { useState, memo } from "react";
import { Link } from "react-router-dom";
import styles from "./Sexual.module.css";

// === Import images ===
import pic1 from "../assets/shop2/Personal/Condoms (variety pack).png";
import pic2 from "../assets/shop2/Personal/Contraceptive.png";
import pic3 from "../assets/products/Contraception.png";
import pic4 from "../assets/shop2/Personal/Lubricant.png";
import pic5 from "../assets/shop2/Personal/Pegnancy test kits.png";
import pic6 from "../assets/shop2/Personal/Rough Rider Condom.png";
import pic7 from "../assets/shop2/Personal/Injectable Contraceptives – Depo-Provera.png";
import pic8 from "../assets/shop2/Personal/Oral Contraceptives (Daily).png";

type Offer = {
  id: string;
  name: string;
  image: string;
  discount: number;
  price: number;
  oldPrice: number;
};

const offersData: Offer[] = [
  { id: "1", name: "Durex Condoms", image: pic1, discount: 12, price: 350, oldPrice: 490 },
  { id: "2", name: "Lydia Postpill", image: pic2, discount: 12, price: 830, oldPrice: 980 },
  { id: "3", name: "Emergency Contraception", image: pic3, discount: 11, price: 1700, oldPrice: 2035 },
  { id: "4", name: "Cheeky Cherry Sex Lubricants ", image: pic4, discount: 15, price: 989, oldPrice: 1075 },
  { id: "5", name: "Recare Pregnancy Kit", image: pic5, discount: 15, price: 84, oldPrice: 95 },
  { id: "6", name: "Rough Rider Condoms", image: pic6, discount: 11, price: 50, oldPrice: 75 },
  { id: "7", name: "Depo-Provera-Injectable Contraceptives", image: pic7, discount: 15, price: 159, oldPrice: 175 },
  { id: "8", name: "Microgynon 30 Oral Contraceptives (Daily)", image: pic8, discount: 15, price: 214, oldPrice: 305 },
];

const WHATSAPP_NUMBER = "254796787207";
const WHATSAPP_MESSAGE = encodeURIComponent("Hello, I’d like to order this product:");

const Sexual: React.FC = memo(() => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleWhatsAppOrder = (productName: string) => {
    const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}%20${encodeURIComponent(
      productName
    )}`;
    window.open(whatsappLink, "_blank");
  };

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  const closeModal = () => setSelectedImage(null);

  return (
    <section className={styles.offersSection}>
      {/* === Header === */}
      <div className={styles.header}>
        <h2 className={styles.title}>Sexual & Reproductive Health Section</h2>
        <Link to="/buy-medicines" className={styles.viewAll}>
          View all offers →
        </Link>
      </div>

      {/* === Offers Grid === */}
      <div className={styles.offersGrid}>
        {offersData.map((offer) => (
          <div key={offer.id} className={styles.card}>
            <div className={styles.discountTag}>-{offer.discount}%</div>

            <div className={styles.imageWrapper}>
              <img
                src={offer.image}
                alt={offer.name}
                className={styles.productImage}
                loading="lazy"
                onClick={() => handleImageClick(offer.image)}
              />
              <button
                className={styles.quickViewBtn}
                onClick={() => handleImageClick(offer.image)}
              >
                Quick View
              </button>
            </div>

            <div className={styles.info}>
              <p className={styles.name}>{offer.name}</p>
              <div className={styles.prices}>
                <span className={styles.newPrice}>
                  KSh {offer.price.toLocaleString()}
                </span>
                <span className={styles.oldPrice}>
                  KSh {offer.oldPrice.toLocaleString()}
                </span>
              </div>
            </div>

            <div className={styles.actions}>
              <button
                className={styles.addToCart}
                onClick={() => handleWhatsAppOrder(offer.name)}
              >
                Order via WhatsApp
              </button>

              <button
                className={styles.viewProduct}
                onClick={() => handleImageClick(offer.image)}
              >
                View Product
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* === Image Modal === */}
      {selectedImage && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage} alt="Product Preview" className={styles.modalImage} />
            <button className={styles.closeBtn} onClick={closeModal}>
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
});

export default Sexual;
