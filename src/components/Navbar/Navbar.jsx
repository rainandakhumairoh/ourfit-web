import logo from '../../assets/logohorizontal.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { faUser, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext); // ambil status login
  const [showLoginChoice, setShowLoginChoice] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getLinkClass = (path) => {
    return location.pathname === path
      ? 'block py-2 px-3 text-coklat bg-coklat-700 rounded lg:bg-transparent lg:text-coklat-700 lg:p-0 lg:dark:text-coklat-500'
      : 'block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-coklat lg:p-0 dark:text-pink1 lg:dark:hover:text-coklat dark:hover:bg-gray-700 dark:hover:text-pink1 lg:dark:hover:bg-transparent dark:border-gray-700';
  };

  const handleProfileClick = () => {
    if (currentUser) {
      // user sudah login
      navigate(currentUser.role === "admin" ? "/admin" : "/profile");
    } else {
      // user belum login → tampilkan modal pilihan
      setShowLoginChoice(true);
    }
  };

  const handleChoice = (role) => {
    setShowLoginChoice(false); // tutup modal
    if (role === "admin") {
      navigate("/login-admin"); // navigasi ke login admin
    } else {
      navigate("/login-user"); // navigasi ke login user
    }
  };

  return (
  <nav className="bg-primary shadow-md fixed top-0 w-full z-50">
    <div className="max-w-screen-xl mx-auto flex items-center justify-between p-2">

      {/* Logo */}
      <Link to="/" className="flex items-center">
        <img src={logo} alt="Ourfit Logo" className="h-12" />
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex flex-1 justify-center space-x-5">
        <Link to="/" className={getLinkClass('/')}>Home</Link>
        <Link to="/smart-fit" className={getLinkClass('/smart-fit')}>
          Personalization
        </Link>
        <Link to="/wardrobe" className={getLinkClass('/wardrobe')}>
          Wardrobe
        </Link>
        <Link to="/mixmatch" className={getLinkClass('/mixmatch')}>
          Mix & Match
        </Link>
        <Link to="/about" className={getLinkClass('/about')}>
          About Us
        </Link>
      </div>

      {/* Desktop Profile */}
      <div className="hidden md:block">
        <button
          onClick={handleProfileClick}
          className={getLinkClass('/profile')}
        >
          <FontAwesomeIcon
            icon={faUser}
            className="mr-1 text-xl"
          />
        </button>
      </div>

      {/* Modal Pilihan Login */}
      {showLoginChoice && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full text-center">
            <h2 className="text-lg font-semibold mb-4">Login/Daftar sebagai?</h2>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => handleChoice("user")}
                className="py-2 px-4 bg-coklat text-white rounded-full bg-oren3 hover:bg-coklat"
              >
                User
              </button>
              <button
                onClick={() => handleChoice("admin")}
                className="py-2 px-4 bg-[#C75E58] text-white rounded-full bg-pink2 hover:bg-pink1"
              >
                Admin
              </button>
              <button
                onClick={() => setShowLoginChoice(false)}
                className="py-2 px-4 bg-gray-200 rounded-full bg-gray-350 hover:bg-gray-300"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu Button */}
      <button
        className="text-pink1 md:hidden text-2xl"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <FontAwesomeIcon
          icon={isMenuOpen ? faTimes : faBars}
        />
      </button>

    </div>

    {/* Mobile Menu */}
    {isMenuOpen && (
      <div className="md:hidden bg-primary shadow-lg border-t">

        <div className="flex flex-col p-4 space-y-3">

          <Link
            to="/"
            className={getLinkClass('/')}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>

          <Link
            to="/smart-fit"
            className={getLinkClass('/smart-fit')}
            onClick={() => setIsMenuOpen(false)}
          >
            Personalization
          </Link>

          <Link
            to="/wardrobe"
            className={getLinkClass('/wardrobe')}
            onClick={() => setIsMenuOpen(false)}
          >
            Wardrobe
          </Link>

          <Link
            to="/mixmatch"
            className={getLinkClass('/mixmatch')}
            onClick={() => setIsMenuOpen(false)}
          >
            Mix & Match
          </Link>

          <Link
            to="/about"
            className={getLinkClass('/about')}
            onClick={() => setIsMenuOpen(false)}
          >
            About Us
          </Link>

          <button
            onClick={() => {
              handleProfileClick();
              setIsMenuOpen(false);
            }}
            className="flex items-center gap-2 py-2 text-pink1 bg-oren1/40 hover:bg-oren2 p-2"
          >
            <FontAwesomeIcon icon={faUser} />
            Profile
          </button>

        </div>

      </div>
    )}
  </nav>
  );
}
