import logo from '../../assets/logohorizontal.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(UserContext); // ambil status login
  const [showLoginChoice, setShowLoginChoice] = useState(false);

  const getLinkClass = (path) => {
    return location.pathname === path
      ? 'block py-2 px-3 text-coklat bg-coklat-700 rounded lg:bg-transparent lg:text-coklat-700 lg:p-0 lg:dark:text-coklat-500'
      : 'block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-coklat lg:p-0 dark:text-pink1 lg:dark:hover:text-coklat dark:hover:bg-gray-700 dark:hover:text-pink1 lg:dark:hover:bg-transparent dark:border-gray-700';
  };

  const handleProfileClick = () => {
    if (user) {
      // user sudah login
      navigate(user.role === "admin" ? "/admin" : "/profile");
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
    <nav className="bg-primary shadow-md fixed top-0 w-full z-50 h-16">
      <div className="max-w-screen-xl mx-auto flex items-center p-4">
        {/* Logo kiri */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Ourfit Logo" className="h-10" />
        </Link>

        {/* Menu tengah */}
        <div className="flex-1 flex justify-center space-x-5">
          <Link to="/" className={getLinkClass('/')}>Home</Link>
          <Link to="/smart-fit" className={getLinkClass('/smart-fit')}>Personalization</Link>
          <Link to="/wardrobe" className={getLinkClass('/wardrobe')}>Wardrobe</Link>
          <Link to="/mixmatch" className={getLinkClass('/mixmatch')}>Mix & Match</Link>
          <Link to="/about" className={getLinkClass('/about')}>About Us</Link>
        </div>

        {/* Profile kanan */}
        <div>
          <button onClick={handleProfileClick} className={getLinkClass('/profile')}>
            <FontAwesomeIcon icon={faUser} className="mr-1 text-xl" />
          </button>
        </div>
      </div>

      {/* Modal Pilihan Login */}
      {showLoginChoice && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full text-center">
            <h2 className="text-lg font-semibold mb-4">Login/Daftar sebagai?</h2>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => handleChoice("user")}
                className="py-2 px-4 bg-coklat text-white rounded hover:bg-[#804000]"
              >
                User
              </button>
              <button
                onClick={() => handleChoice("admin")}
                className="py-2 px-4 bg-[#C75E58] text-white rounded hover:bg-[#a34747]"
              >
                Admin
              </button>
              <button
                onClick={() => setShowLoginChoice(false)}
                className="py-2 px-4 bg-gray-200 rounded hover:bg-gray-300"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
