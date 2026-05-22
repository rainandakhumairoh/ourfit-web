import { useState, useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import karakter from "../../../assets/welcomingkarakter.png";

export default function LoginUser() {
  const { login, registeredUsers } = useContext(UserContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    setTimeout(() => {
      // Cek apakah username ada di registered users
      const userExists = registeredUsers.some(u => u.username === username);
      
      if (!userExists) {
        // User belum terdaftar, arahkan ke register
        setError("Akun tidak ditemukan. Silakan daftar terlebih dahulu.");
        setTimeout(() => {
          navigate("/register");
        }, 1500);
        setIsLoading(false);
        return;
      }

      // Coba login
      const success = login(username, password, "user");
      if (success) {
        navigate("/profile");
      } else {
        setError("Password salah, coba lagi.");
      }
      setIsLoading(false);
    }, 500);
  };

  const handleClose = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4 font-['Poppins']">
      <div className="w-full max-w-5xl">
        {/* Close Button */}
        <button onClick={handleClose} className="absolute top-6 right-6 bg-pink1 text-white w-8 h-8 flex items-center justify-center rounded-full text-xl font-bold shadow-md hover:bg-oren2 transition-all active:scale-95" aria-label="Close">
          ✕
        </button>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
          {/* LEFT SIDE - FORM */}
          <div className="relative">
            <div className="space-y-6">
              {/* Header */}
              <div className="text-center lg:text-center">
                <h1 className="text-4xl lg:text-5xl font-bold text-pink1 mb-3">WELCOME BACK!</h1>
                <p className="text-sm lg:text-base text-[#8B5A4A]">Masuk untuk melanjutkan perjalanan gaya personalmu bersama Ourfit.</p>
              </div>

              {/* Error Message */}
              {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded">{error}</div>}

              {/* Form */}
              <form onSubmit={handleLogin} className="space-y-4">
                {/* Username Input */}
                <div>
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-6 py-3 rounded-full border-2 border-[#D4A896] bg-white/60 placeholder-[#B8956A] text-[#5A4A3A] focus:outline-none focus:border-[#C84C3C] focus:bg-white transition"
                    required
                  />
                </div>

                {/* Password Input */}
                <div>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-6 py-3 rounded-full border-2 border-[#D4A896] bg-white/60 placeholder-[#B8956A] text-[#5A4A3A] focus:outline-none focus:border-[#C84C3C] focus:bg-white transition"
                    required
                  />
                </div>

                {/* Forgot Password Link */}
                <div className="text-right">
                  <a href="#" className="text-sm text-pink1 hover:underline font-medium">
                    Forgot password?
                  </a>
                </div>

                {/* Login Button */}
                <button type="submit" disabled={isLoading} className="w-full py-3 rounded-full bg-pink1 text-white font-medium hover:bg-[#B23D2E] transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg">
                  {isLoading ? "Logging in..." : "Log In"}
                </button>
              </form>

              {/* Social Login */}
              <div className="space-y-3">
                <p className="text-center text-sm text-[#8B5A4A] font-medium">or log in with</p>
                <div className="flex justify-center gap-4">
                  <button className="w-10 h-10 rounded-full bg-white hover:bg-gray-100 transition flex items-center justify-center shadow-md" aria-label="Login with Google">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                  </button>
                  <button className="w-10 h-10 rounded-full bg-white hover:bg-gray-100 transition flex items-center justify-center shadow-md" aria-label="Login with Facebook">
                    <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Sign Up Link */}
              <p className="text-center text-sm text-coklat">
                Don't have an account?{" "}
                <a href="/register" className="text-pink1 font-semibold hover:underline">
                  Sign up
                </a>
              </p>
            </div>
          </div>

          {/* RIGHT SIDE - CHARACTER ILLUSTRATION */}
          <div className="hidden lg:flex justify-center items-center">
            <img src={karakter} alt="Karakter Ourfit" className="w-[200px] md:w-[350px] lg:w-[400px] scale-110 md:scale-125 lg:scale-150 mb-6 transition-transform duration-300 ease-in-out" />
          </div>
        </div>
      </div>
    </div>
  );
}
