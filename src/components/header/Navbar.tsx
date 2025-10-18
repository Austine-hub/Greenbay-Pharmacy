// ===============================================================
// Navbar.tsx — Modern, Accessible, Responsive Navbar (2025 Optimized)
// ===============================================================
import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  FaEnvelope,
  FaPhone,
  FaWhatsapp,
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaInstagram,
  FaLinkedinIn,
  FaSearch,
  FaBars,
  FaChevronDown,
  FaTimes,
} from "react-icons/fa";
import styles from "./Navbar.module.css";

/* ---------------- Types ---------------- */
interface DropdownItem {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href: string;
  dropdownItems?: DropdownItem[];
}

/* ---------------- Constants ---------------- */
const NAV_BREAKPOINT = 1024;

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Our Products",
    href: "",
    dropdownItems: [
      { label: "Prescription Medicines", href: "/products/prescription" },
      { label: "Over-the-Counter (OTC)", href: "/products/otc" },
      { label: "Supplements & Vitamins", href: "/products/supplements" },
      { label: "Medical Equipment", href: "/products/equipment" },
    ],
  },
  {
    label: "Shop By Condition",
    href: "",
    dropdownItems: [
      { label: "Diabetes Care", href: "/condition/diabetes" },
      { label: "Heart Health", href: "/condition/heart" },
      { label: "Women's Health", href: "/condition/women" },
      { label: "Men's Health", href: "/condition/men" },
    ],
  },
  {
    label: "Prescription Assistance",
    href: "",
    dropdownItems: [
      { label: "Upload Prescription", href: "/prescription/upload" },
      { label: "Request Refill", href: "/prescription/refill" },
      { label: "Talk to a Pharmacist", href: "/prescription/support" },
    ],
  },
  {
    label: "About Us",
    href: "",
    dropdownItems: [
      { label: "Our Story", href: "/about/story" },
      { label: "Our Doctors", href: "/about/team" },
      { label: "Vision & Mission", href: "/about/vision" },
    ],
  },
  { label: "Contact Us", href: "/contact-us" },
];

/* ---------------- Component ---------------- */
const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= NAV_BREAKPOINT);
  const menuRef = useRef<HTMLUListElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  /* ---------- Auto-close on route change ---------- */
  useEffect(() => {
    if (!isMobile) {
      setIsMobileMenuOpen(false);
      setOpenDropdown(null);
    }
  }, [location.pathname, isMobile]);

  /* ---------- Responsive detection ---------- */
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= NAV_BREAKPOINT;
      setIsMobile(mobile);
      if (!mobile) {
        setIsMobileMenuOpen(false);
        setOpenDropdown(null);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ---------- Prevent background scroll on mobile menu ---------- */
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  /* ---------- Close on outside click or Esc ---------- */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };

    const handleClick = (e: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        overlayRef.current &&
        overlayRef.current.contains(e.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKey);
    window.addEventListener("mousedown", handleClick);
    return () => {
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("mousedown", handleClick);
    };
  }, [isMobileMenuOpen]);

  /* ---------- Dropdown handling ---------- */
  // FIXED: Replace NodeJS.Timeout with generic browser type
  let hoverTimeout: ReturnType<typeof setTimeout>;

  const handleDropdownToggle = (label: string) =>
    setOpenDropdown((prev) => (prev === label ? null : label));

  const handleHoverDropdown = (label: string) => {
    if (!isMobile) {
      clearTimeout(hoverTimeout);
      setOpenDropdown(label);
    }
  };

  const handleLeaveDropdown = (label: string) => {
    if (!isMobile) {
      hoverTimeout = setTimeout(() => {
        const dropdown = document.querySelector(`[data-dropdown="${label}"]`);
        if (dropdown && !dropdown.matches(":hover")) setOpenDropdown(null);
      }, 220);
    }
  };

  /* ---------- Render ---------- */
  return (
    <header className={styles.header}>
      {/* ---- Top Bar ---- */}
      {!isMobile && (
        <div className={styles.topBar}>
          <div className={styles.topBarContainer}>
            <div className={styles.contactInfo}>
              <a href="mailto:hosp@nbihosp.org" className={styles.contactItem}>
                <FaEnvelope className={styles.icon} />
                <span>hosp@nbihosp.org</span>
              </a>
              <a href="tel:+254703082000" className={styles.contactItem}>
                <FaPhone className={styles.icon} />
                <span>(+254) 703 082 000</span>
              </a>
            </div>

            <div className={styles.topBarRight}>
              <div className={styles.socialIcons}>
                <a href="https://wa.me/254703082000" aria-label="WhatsApp" className={styles.socialIcon}>
                  <FaWhatsapp />
                </a>
                <a href="https://facebook.com" aria-label="Facebook" className={styles.socialIcon}>
                  <FaFacebookF />
                </a>
                <a href="https://twitter.com" aria-label="Twitter" className={styles.socialIcon}>
                  <FaTwitter />
                </a>
                <a href="https://youtube.com" aria-label="YouTube" className={styles.socialIcon}>
                  <FaYoutube />
                </a>
                <a href="https://instagram.com" aria-label="Instagram" className={styles.socialIcon}>
                  <FaInstagram />
                </a>
                <a href="https://linkedin.com" aria-label="LinkedIn" className={styles.socialIcon}>
                  <FaLinkedinIn />
                </a>
              </div>

              <button className={styles.searchBtn} aria-label="Search site">
                <FaSearch className={styles.icon} />
                <span className={styles.searchText}>Search</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---- Main Navbar ---- */}
      <nav className={styles.navBar} aria-label="Main navigation">
        <div className={styles.navContainer}>
          {/* ✅ Clicking the logo now routes correctly to home */}
          <Link to="/" className={styles.brand} aria-label="Go to Home">
            <img
              src="/logo.png"
              alt="Greenbay Pharmacy Juja Logo"
              className={styles.logo}
              style={{ cursor: "pointer" }}
            />
          </Link>

          {/* Menu Toggle */}
          <button
            className={styles.menuToggle}
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            aria-controls="primary-navigation"
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? "Close main menu" : "Open main menu"}
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Navigation Links */}
          <ul
            ref={menuRef}
            id="primary-navigation"
            className={`${styles.navLinks} ${isMobileMenuOpen ? styles.open : ""}`}
            role="menubar"
          >
            {/* Mobile Close Button */}
            {isMobile && (
              <li className={styles.navItem}>
                <button
                  className={styles.closeMenuBtn}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FaTimes /> Close Menu
                </button>
              </li>
            )}

            {/* Main Nav Items */}
            {navItems.map((item) => {
              const isDropdownOpen = openDropdown === item.label;
              const hasDropdown = !!item.dropdownItems;

              return (
                <li
                  key={item.label}
                  className={`${styles.navItem} ${isDropdownOpen ? styles.dropdownOpen : ""}`}
                  onMouseEnter={() => handleHoverDropdown(item.label)}
                  onMouseLeave={() => handleLeaveDropdown(item.label)}
                  data-dropdown={item.label}
                >
                  <div
                    className={styles.navLinkWrapper}
                    onClick={() => isMobile && hasDropdown && handleDropdownToggle(item.label)}
                  >
                    <NavLink
                      to={item.href}
                      className={({ isActive }) =>
                        `${styles.navLink} ${isActive ? styles.active : ""}`
                      }
                      onClick={() => {
                        if (!isMobile) return;
                        if (!item.dropdownItems) setIsMobileMenuOpen(false);
                      }}
                    >
                      {item.label}
                      {hasDropdown && <FaChevronDown className={styles.dropdownIcon} aria-hidden="true" />}
                    </NavLink>
                  </div>

                  {hasDropdown && (
                    <ul
                      className={`${styles.dropdownMenu} ${isDropdownOpen ? styles.show : ""}`}
                      role="menu"
                      onMouseEnter={() => handleHoverDropdown(item.label)}
                      onMouseLeave={() => handleLeaveDropdown(item.label)}
                    >
                      {item.dropdownItems!.map((drop) => (
                        <li key={drop.label} role="none">
                          <Link
                            to={drop.href}
                            className={styles.dropdownItem}
                            role="menuitem"
                            onClick={() => {
                              if (!isMobile) return;
                              setIsMobileMenuOpen(false);
                            }}
                          >
                            {drop.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {isMobileMenuOpen && <div ref={overlayRef} className={styles.overlay} />}
      </nav>
    </header>
  );
};

export default Navbar;
