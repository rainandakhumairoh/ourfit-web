import { Link } from "react-router-dom";
import logo2 from "../../assets/logoputih.png";
import shopeeIcon from "../../assets/shopee.png";
import tiktokIcon from "../../assets/tiktok.png";
import instagramIcon from "../../assets/instagram.png";
import bgFooter from "../../assets/bgfooter.png";
import { faEnvelope, faMapLocation, faMapMarked, faMapMarkedAlt, faMapMarker, faMapPin, faUser } from '@fortawesome/free-solid-svg-icons';
import { useContext, useState } from "react";
import { faInstagram, faTiktok, faShopify, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons/faMapMarkerAlt";
// import { authContext } from "../../context/Auth/Auth";

export default function Footer() {
  const { userToken } = useState(false);

  return (
    <>
      <footer className="relative text-white pt-[12rem] pb-10 min-h-[300px] flex flex-col justify-end"
    style={{
    backgroundImage: `url(${bgFooter})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
        <div className="p-6 mx-auto max-w-screen-xl justify-between">
          <div className="lg:flex">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-36">
              <div className="px-6 mt-12">
                <a href="#">
                  <img className="w-auto h-[6rem]" src={logo2} alt="Site Logo" />
                </a>
                <div className="max-w-sm mt-2 text-white">Perfect fit for petite, we fit ourfit!</div>
                <span className="block space-x-2 mt-2 text-sm text-white dark:text-white hover:underline flex items-center space-x-3">
                  <a href="https://linkedin.com/in/mohamedemary" target="_blank" rel="noopener noreferrer">
                    <img src={tiktokIcon} alt="Shopee" className="w-[1.2rem] h-[1.2rem] object-contain inline-block" />
                  </a>
                  <a href="https://github.com/mohamedemary" target="_blank" rel="noopener noreferrer">
                    <img src={instagramIcon} alt="Shopee" className="w-[1.2rem] h-[1.2rem] object-contain inline-block" />
                  </a>
                  <a href="https://leetcode.com/Spark71"  target="_blank" rel="noopener noreferrer">
                    <img src={shopeeIcon} alt="Shopee" className="w-[1.2rem] h-[1.2rem] object-contain inline-block" />
                  </a>
                </span>
              </div>
            </div>
            <div className="mt-6 lg:mt-24 lg:flex-1">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <h3 className="text-2xl font-bold text-white uppercase dark:text-white">CONTACT</h3>

                    <>
                      <Link to="whatsapp" className="block mt-2 text-sm text-white dark:text-white hover:underline">
                      <FontAwesomeIcon icon={faWhatsapp} className="mr-1 text-xl" />
                       085126451462
                      </Link>
                      <Link to="email" className="block mt-2 text-sm text-white dark:text-white hover:underline">
                      <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-xl" />
                      ourfitstore.id@gmail.com
                      </Link>
                      <Link to="location" className="block mt-2 text-sm text-white dark:text-white">
                      <FontAwesomeIcon icon={faMapPin} className="mr-1 text-xl" />
                       Bandung, Jawa Barat
                      </Link>
                    </>
                </div>
              </div>
            </div>
          </div> 
        </div>
      </footer>
    </>
  );
}
