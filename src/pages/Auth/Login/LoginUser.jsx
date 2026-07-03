import { useState, useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import karakter from "../../../assets/welcomingkarakter.png";

export default function LoginUser() {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setError("");

    try {
      // REQUEST LOGIN KE BACKEND
      const response = await fetch("/auth/login", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      // LOGIN BERHASIL
      if (data.success) {
        // simpan user ke Context + localStorage
        login(data.user);

        // Cek apakah ada halaman tujuan setelah login
        const redirect = sessionStorage.getItem("redirectAfterLogin");

        if (redirect) {
          sessionStorage.removeItem("redirectAfterLogin");
          navigate(redirect);
        } else {
          navigate("/profile");
        }
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.log(err);

      setError("User tidak ditemukan, silakan registrasi dahulu");
    }

    setIsLoading(false);
  };

  const handleClose = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4 font-['Poppins']">
      <div className="w-full max-w-5xl">
        {/* CLOSE BUTTON */}
        <button onClick={handleClose} className="absolute top-6 right-6 bg-pink1 text-white w-8 h-8 flex items-center justify-center rounded-full text-xl font-bold shadow-md hover:bg-oren2 transition-all active:scale-95" aria-label="Close">
          ✕
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
          {/* LEFT SIDE */}
          <div className="relative">
            <div className="space-y-6">
              {/* HEADER */}
              <div className="text-center lg:text-center">
                <h1 className="text-4xl lg:text-5xl font-bold text-pink1 mb-3">WELCOME BACK!</h1>

                <p className="text-sm lg:text-base text-[#8B5A4A]">Masuk untuk melanjutkan perjalanan gaya personalmu bersama Ourfit.</p>
              </div>

              {/* ERROR MESSAGE */}
              {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded">{error}</div>}

              {/* FORM */}
              <form onSubmit={handleLogin} className="space-y-4">
                {/* USERNAME */}
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

                {/* PASSWORD */}
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

                {/* LOGIN BUTTON */}
                <button type="submit" disabled={isLoading} className="w-full py-3 rounded-full bg-pink1 text-white font-medium hover:bg-oren2 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md">
                  {isLoading ? "Logging in..." : "Log In"}
                </button>
              </form>

              {/* SIGN UP LINK */}
              <p className="text-center text-sm text-coklat">
                Don't have an account?{" "}
                <a href="/register" className="text-pink1 font-semibold hover:underline">
                  Sign up
                </a>
              </p>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="hidden lg:flex justify-center items-center">
            <img src={karakter} alt="Karakter Ourfit" className="w-[200px] md:w-[350px] lg:w-[400px] scale-110 md:scale-125 lg:scale-150 mb-6 transition-transform duration-300 ease-in-out" />
          </div>
        </div>
      </div>
    </div>
  );
}
