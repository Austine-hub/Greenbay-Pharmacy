import React from "react";
import styles from "./Topbar.module.css";
import { FaPhoneAlt, FaWhatsapp, FaCapsules } from "react-icons/fa";

const Topbar: React.FC = () => {
  return (
    <header className={styles.topbar}>
      <div className={styles.container}>
        {/* Pharmacy Name + Icon */}
        <div className={styles.brand}>
          <FaCapsules className={styles.logoIcon} />
          <span className={styles.brandName}>Greenbay Pharmacy Juja</span>
        </div>

        {/* Tagline */}
        <p className={styles.tagline}>Our Clients, Our Priority — Trusted Healthcare Near You</p>

        {/* Contact Actions */}
        <div className={styles.actions}>
          <a href="tel:+254700000000" className={styles.callBtn}>
            <FaPhoneAlt className={styles.icon} /> Call to Order
          </a>
          <a
            href="https://wa.me/254700000000"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.whatsappBtn}
          >
            <FaWhatsapp className={styles.icon} /> WhatsApp Order
          </a>
        </div>
      </div>
    </header>
  );
};

export default Topbar;

