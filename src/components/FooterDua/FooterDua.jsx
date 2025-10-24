import { Link } from "react-router-dom";
import logocoklat from "../../assets/logocoklat.png";
import tiktokIcon2 from "../../assets/tiktok2.png";
import instagramIcon2 from "../../assets/instagram2.png";
import shopeeIcon2 from "../../assets/shopee2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faMapLocation, faMapMarked, faMapMarkedAlt, faMapMarker, faMapPin, faUser } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faTiktok, faShopify, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

export default function FooterDua() {
  return (
    <footer className="bg-[#F6E2C4] text-[#A95C18] py-12 px-8">
      <div className="max-w-6xl mx-auto px-6 md:px-12 grid md:grid-cols-3 gap-12 items-start">
        
        {/* === LEFT SECTION === */}
        <div >
          <img src={logocoklat} alt="Logo Coklat" className="w-36 mb-5" />
          <p className="text-sm">Perfect fit for petite,<br />we fit ourfit!</p>
          <div className="flex items-center gap-3 mt-4">
            <a href="#" target="_blank" rel="noreferrer">
              <img src={tiktokIcon2} alt="TikTok" className="w-5 h-5" />
            </a>
            <a href="#" target="_blank" rel="noreferrer">
              <img src={instagramIcon2} alt="Instagram" className="w-5 h-5" />
            </a>
            <a href="#" target="_blank" rel="noreferrer">
              <img src={shopeeIcon2} alt="Shopee" className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* === MIDDLE SECTION === */}
        <div className="text-center md:text-left">
          <p className="text-sm leading-relaxed">
            Lorem ipsum dolor sit amet, 
            consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua.
            <br />
            (kata-kata atau pesan dari ourfit)
          </p>
        </div>

        {/* === RIGHT SECTION === */}
        <div className="text-center md:text-left ml-24">
          <h3 className="text-xl font-bold mb-3 uppercase">Contact</h3>
          <div>
            <>
                                  <Link to="whatsapp" className="block mt-2 text-sm text-[#A95C18] dark:text-[#A95C18] hover:underline">
                                  <FontAwesomeIcon icon={faWhatsapp} className="mr-1 text-xl" />
                                   085126451462
                                  </Link>
                                  <Link to="email" className="block mt-2 text-sm text-[#A95C18] dark:text-[#A95C18] hover:underline">
                                  <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-xl" />
                                  ourfitstore.id@gmail.com
                                  </Link>
                                  <Link to="location" className="block mt-2 text-sm text-[#A95C18] dark:text-[#A95C18]">
                                  <FontAwesomeIcon icon={faMapPin} className="mr-1 text-xl" />
                                   Bandung, Jawa Barat
                                  </Link>
                                </>
          </div>
        </div>
      </div>
    </footer>
  );
}
