import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import karakter from "../../../assets/welcomingkarakter.png";

export default function LoginAdmin() {
  const { adminLogin } = useContext(UserContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    setTimeout(() => {
      const result = adminLogin(username, password);
      if (result.success) {
        navigate("/admin");
      } else {
        setError(result.message);
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
                <h1 className="text-4xl lg:text-5xl font-bold text-pink1 mb-3">HELLO, ADMIN!</h1>
                <p className="text-sm lg:text-base text-[#8B5A4A]">Masuk untuk melanjutkan pengelolaan produk dan pengalaman terbaik di Ourfit!</p>
              </div>

              {/* Error Message */}
              {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded">{error}</div>}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
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

                {/* Login Button */}
                <button type="submit" disabled={isLoading} className="w-full py-3 rounded-full bg-pink1 text-white font-medium hover:bg-oren2 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md">
                  {isLoading ? "Logging in..." : "Log In"}
                </button>
              </form>
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