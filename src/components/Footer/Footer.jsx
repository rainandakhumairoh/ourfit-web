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
    <footer className="hidden lg:block relative text-white pt-[12rem] lg:pt-[18rem] pb-10 min-h-[300px] flex flex-col justify-end"
    style={{
    backgroundImage: `url(${bgFooter})`,
    backgroundColor: '#DB9F9F',
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
        <div className="p-6 mx-auto max-w-screen-xl justify-between">
          <div className="lg:flex">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-[12rem]">
              <div className="absolute inset-0 bg-pink3 -z-10 bottom-0 h-full -top-[6rem]"></div>
              <div className="px-6 mt-[12rem]">
                <a href="#">
                  <img className="w-auto h-[6rem]" src={logo2} alt="Site Logo" />
                </a>
                <div className="max-w-sm mt-2 text-white">Perfect fit for petite, we fit ourfit!</div>
                <span className="block space-x-2 mt-2 text-sm text-white dark:text-white hover:underline flex items-center space-x-3">
                  <a href="https://www.tiktok.com/@by.ourfit" target="_blank" rel="noopener noreferrer">
                    <img src={tiktokIcon} alt="Tiktok" className="w-[1.2rem] h-[1.2rem] object-contain inline-block" />
                  </a>
                  <a href="https://www.instagram.com/by.ourfit" target="_blank" rel="noopener noreferrer">
                    <img src={instagramIcon} alt="Instagram" className="w-[1.2rem] h-[1.2rem] object-contain inline-block" />
                  </a>
                  <a href="https://www.shopee.co.id/by.ourfit"  target="_blank" rel="noopener noreferrer">
                    <img src={shopeeIcon} alt="Shopee" className="w-[1.2rem] h-[1.2rem] object-contain inline-block" />
                  </a>
                </span>
              </div>
            </div>
            <div className="mt-6 lg:mt-[12rem] lg:flex-1">
              <div className="grid grid-cols-1 gap-6">
                <div className="ml-10">
                  <h3 className="text-2xl font-bold text-white uppercase dark:text-white">CONTACT</h3>

                  <a 
                    href="https://wa.me/6285126451462" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block mt-2 text-sm text-white dark:text-white hover:underline"
                  >
                    <FontAwesomeIcon icon={faWhatsapp} className="mr-1 text-xl" />
                     085126451462
                  </a>

                  <a 
                    href="mailto:ourfitstore.id@gmail.com"
                    className="block mt-2 text-sm text-white dark:text-white hover:underline"
                  >
                    <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-xl" />
                    ourfitstore.id@gmail.com
                  </a>

                  <a 
                    href="https://maps.google.com/?q=Bandung,+Jawa+Barat"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-2 text-sm text-white dark:text-white hover:underline"
                  >
                    <FontAwesomeIcon icon={faMapPin} className="mr-1 text-xl" />
                    Bandung, Jawa Barat
                  </a>
                </div>
              </div>
            </div>
          </div> 
        </div>
      </footer>

      <footer className="relative overflow-hidden bg-pink3">
        {/* MOBILE */}
        <div className="block lg:hidden">
          {/* Gambar atas */}
          <div className="w-full">
            <img
              src={bgFooter}
              alt="Footer Decoration"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Box Pink */}
          <div className="bg-pink1 text-white px-6 py-10">
            <div className="flex flex-col items-center text-center">
              <img
                src={logo2}
                alt="Logo"
                className="h-20 w-auto mb-4"
              />

              <p className="max-w-xs text-sm mb-5">
                Perfect fit for petite, we fit ourfit!
              </p>

              {/* Social Media */}
              <div className="flex gap-4 mb-12">
                <a
                  href="https://www.tiktok.com/@by.ourfit"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={tiktokIcon} alt="" className="w-6 h-6" />
                </a>

                <a
                  href="https://www.instagram.com/by.ourfit"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={instagramIcon} alt="" className="w-6 h-6" />
                </a>

                <a
                  href="https://www.shopee.co.id/by.ourfit"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={shopeeIcon} alt="" className="w-6 h-6" />
                </a>
              </div>

              {/* Contact */}
              <h3 className="font-bold text-xl mb-4">
                CONTACT
              </h3>

              <div className="space-y-3 text-sm">
                  <a 
                    href="https://wa.me/6285126451462" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block mt-2 text-sm text-white dark:text-white hover:underline"
                  >
                    <FontAwesomeIcon icon={faWhatsapp} className="mr-1 text-xl" />
                     085126451462
                  </a>

                  <a 
                    href="mailto:ourfitstore.id@gmail.com"
                    className="block mt-2 text-sm text-white dark:text-white hover:underline"
                  >
                    <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-xl" />
                    ourfitstore.id@gmail.com
                  </a>

                  <a 
                    href="https://maps.google.com/?q=Bandung,+Jawa+Barat"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-2 text-sm text-white dark:text-white hover:underline"
                  >
                    <FontAwesomeIcon icon={faMapPin} className="mr-1 text-xl" />
                    Bandung, Jawa Barat
                  </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
