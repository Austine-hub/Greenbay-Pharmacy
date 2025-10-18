import { Suspense, lazy, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";


import Topbar from "./components/header/Topbar";
import Navbar from "./components/header/Navbar";
import Hero from "./components/header/Hero";
import Footer from "./components/footer/Footer";
import AboutStats from "./components/AboutStats";
import Shop from "./components/Shop";
import ShopByCategory from "./pages/ShopByCategory";
import DM from "./dropdowns/Diabetes";
import CVS from "./categories/Cadiovascular";
import WomenHealthShop from "./dropdowns/Women";
import PrescriptionUpload from "./dropdowns/PrescriptionUpload";
import RequestPrescription from "./dropdowns/RequestPrescription";
import TalkToExpert from "./dropdowns/TalkToExpert";
import Vitamins from "./dropdowns/Vitamins";
import Equipment from "./dropdowns/Equipment";
import MensHealth from "./dropdowns/Men";





// === Lazy-loaded pages for performance ===
const ProductsWrapper = lazy(() => import("./components/ProductsWrapper"));
const OTC = lazy(() => import("./dropdowns/OTC"));
const OurStory = lazy(() => import("./outer/OurStory"));
const OurTeam = lazy(() => import("./outer/OurTeam"));
const OurMissionVision = lazy(() => import("./outer/OurMissionVision"));
const ContactUs = lazy(() => import("./outer/ContactUs"));
const Offers = lazy(() => import("./pages/Offers"));



/* ==========================================================
   SMOOTH SCROLL TO TOP ON ROUTE CHANGE
   - Keeps UX consistent across page transitions
   ========================================================== */
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
};

/* ==========================================================
   APP ROOT COMPONENT — MODERNIZED STRUCTURE
   ========================================================== */
const App: React.FC = () => {
 
  return (
    <>
      {/* === Persistent Global Elements === */}
      <Topbar />
      <Navbar />
      <ScrollToTop />

      {/* === Main Content === */}
      <main role="main" aria-live="polite">
        <Suspense
          fallback={
            <div style={{ textAlign: "center", padding: "3rem" }}>
              <p>Loading...</p>
            </div>
          }
        >
          <Routes>
            {/* === Homepage === */}
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <ShopByCategory />
                  <Offers />
                  <Shop />
                  <AboutStats />
                </>
              }
            />

            {/* === Product Routes === */}
            <Route path="/products/prescription" element={<ProductsWrapper/>} />
            <Route path="/products/otc" element={<OTC/>} />
             <Route path="/products/supplements" element={<Vitamins/>} />
             <Route path="/products/equipment" element={<Equipment/>} />
             

            {/* === Condition === */}
            <Route path="/condition/heart" element={<CVS />} />
            <Route path="/condition/diabetes" element={<DM />} />
            <Route path="/condition/women" element={<WomenHealthShop/>} />
            <Route path="/condition/men" element={<MensHealth/>} />
          

            {/* === Product Routes === */}
            <Route path="/prescription/upload" element={<PrescriptionUpload/>} />
            <Route path="/prescription/refill" element={<RequestPrescription/>} />
            <Route path="/prescription/support" element={<TalkToExpert/>} />



           

            {/* === About Routes === */}
            <Route path="/about/story" element={<OurStory/>} />
            <Route path="/about/team" element={<OurTeam/>} />
            <Route path="/about/vision" element={<OurMissionVision/>} />
            <Route path="/about/careers" element={<Shop/>} />

            {/* === Contact Route === */}
            <Route path="/contact-us" element={<ContactUs/>} />

            {/* === Optional Shop Page === */}
            <Route path="/shop" element={<Shop/>} />

            {/* === 404 Not Found === */}
            <Route
              path="*"
              element={
                <div
                  style={{
                    textAlign: "center",
                    padding: "4rem 1rem",
                    maxWidth: "600px",
                    margin: "0 auto",
                  }}
                >
                  <h2 style={{ marginBottom: "1rem", color: "#7a0c2e" }}>
                    404 — Page Not Found
                  </h2>
                  <p style={{ color: "#6b7280" }}>
                    The page you’re looking for doesn’t exist or has been moved.
                  </p>
                </div>
              }
            />
          </Routes>
        </Suspense>
      </main>

      {/* === Persistent Footer === */}
      <Footer />
    </>
  );
};

export default App;
