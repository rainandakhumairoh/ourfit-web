import logo from '../../assets/logohorizontal.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { initFlowbite } from 'flowbite';

export default function Navbar() {
  
    const getLinkClass = (path) => {
    return location.pathname === path
      ? 'block py-2 px-3 text-coklat bg-coklat-700 rounded lg:bg-transparent lg:text-coklat-700 lg:p-0 lg:dark:text-coklat-500'
      : 'block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-coklat lg:p-0 dark:text-pink1 lg:dark:hover:text-coklat dark:hover:bg-gray-700 dark:hover:text-pink1 lg:dark:hover:bg-transparent dark:border-gray-700';
  };
  
return (
    <nav className="bg-primary shadow-md fixed top-0 w-full z-50">
      <div className="max-w-screen-xl mx-auto flex items-center p-4">
        {/* Logo kiri */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Ourfit Logo" className="h-10" />
        </Link>

        {/* Menu tengah */}
        <div className="flex-1 flex justify-center space-x-4">
          <Link to="/" className={getLinkClass('/')}>Home</Link>
          <Link to="/personalization" className={getLinkClass('/personalization')}>Personalization</Link>
          <Link to="/wardrobe" className={getLinkClass('/wardrobe')}>Wardrobe</Link>
          <Link to="/mixmatch" className={getLinkClass('/mixmatch')}>Mix & Match</Link>
          <Link to="/about" className={getLinkClass('/about')}>About Us</Link>
        </div>

        {/* Profile kanan */}
        <div>
          <Link to="/profile" className={getLinkClass('/profile')}>
            Profile
          </Link>
        </div>
      </div>
    </nav>
  );
}
