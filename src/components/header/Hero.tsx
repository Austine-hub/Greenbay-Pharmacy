import React, { useState, useEffect } from 'react';
import styles from './Hero.module.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // ✅ add this import

//hero banner images
import pic1 from '../../assets/photos/photo1.jpg';
import pic2 from '../../assets/photos/photo2.jpg';
import pic3 from '../../assets/photos/photo3.jpg';
import pic4 from '../../assets/photos/photo4.jpg';
import pic5 from '../../assets/photos/photo5.jpg';

const images = [
  pic1,
  pic2,
  pic3,
  pic4,
  pic5,
];

const Hero: React.FC = () => {
  const [current, setCurrent] = useState(0);

  // Auto-slide every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % images.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);

  return (
    <section className={styles.hero} aria-label="Pharmacy promotions and offers">
      <div className={styles.carousel}>
        {images.map((image, index) => (
          <div
            key={index}
            className={`${styles.slide} ${index === current ? styles.active : ''}`}
            style={{ backgroundImage: `url(${image})` }}
            role="img"
            aria-hidden={index !== current}
          />
        ))}

        {/* Navigation Arrows */}
        <button
          className={`${styles.arrow} ${styles.prev}`}
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <FaArrowLeft />
        </button>
        <button
          className={`${styles.arrow} ${styles.next}`}
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <FaArrowRight />
        </button>
      </div>

      {/* Overlay Content */}
      <div className={styles.overlay}>
        <div className={styles.content}>
          <h1 className={styles.head}>GREENBAY PHARMACEUTICALS</h1>
          <h1>Your Trusted Online Pharmacy</h1>
          <p>Affordable medicines, quality healthcare, and expert support—anytime, anywhere.</p>
              <div className={styles.buttons}>
                <Link to="/products/prescription" className={styles.primaryBtn}>
                  Shop Now
                </Link>
                <Link to="/contact-us" className={styles.secondaryBtn}>
                  Contact Us
                </Link>
              </div>
        </div>
      </div>         

    </section>
  );
};

export default Hero;
