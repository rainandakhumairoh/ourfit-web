import { Link } from "react-router-dom";
import logo2 from "../../assets/logotextputih.png";
import shopeeIcon from "../../assets/shopee.png";
import tiktokIcon from "../../assets/tiktok.png";
import instagramIcon from "../../assets/instagram.png";
import { useContext, useState } from "react";
import { faInstagram, faTiktok, faShopify } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { authContext } from "../../context/Auth/Auth";

export default function Footer() {
  const { userToken } = useState(false);

  return (
    <>
      <footer className="bg-primary border border-t-1 mt-6 dark:bg-pink1">
        <div className="p-6 mx-auto max-w-screen-xl">
          <div className="lg:flex">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="px-6">
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
            <div className="mt-6 lg:mt-0 lg:flex-1">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                <div>
                  <h3 className="text-white uppercase dark:text-white">CONTACT</h3>
                  {userToken ? (
                    <>
                      <Link to="/" className="block mt-2 text-sm text-white dark:text-white hover:underline">
                        <i className="fa-fw  fas fa-home"></i> Home
                      </Link>
                      <Link to="/wishlist" className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">
                        <i className="fa-fw  fas fa-heart"></i> Wishlist
                      </Link>
                      <Link to="/cart" className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">
                        <i className="fa-fw  fas fa-shopping-cart"></i> Cart
                      </Link>
                      <Link to="/brands" className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">
                        <i className="fa-fw  fas fas fa-tags"></i> Brands
                      </Link>
                      <Link to="/categories" className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">
                        <i className="fa-fw  fas fa-list"></i> Categories
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link to="login" className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">
                        <i className="fas fa-sign-in-alt"></i> Login
                      </Link>
                      <Link to="register" className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">
                        <i className="fas fa-user-plus fa-fw"></i> Register
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <hr className="h-px my-4 bg-white border-none dark:bg-white" />
          <div>
            <div className="text-center text-white dark:text-white">
              &quot;It does not matter how slowly you go as long as you do not stop.&quot; - <span className="italic text-md">Confucius</span>
            </div>
          </div>
          <div>
            <div className="text-center italic py-3 text-white dark:text-white">Made with love and passion by Mohamed Emary</div>
          </div>
        </div>
      </footer>
    </>
  );
}
