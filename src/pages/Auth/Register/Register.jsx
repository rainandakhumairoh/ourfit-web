import { useState } from "react";
import { useNavigate } from "react-router-dom";
import karakter from "../../../assets/welcomingkarakter.png";
import api from "../../../api/api";

export default function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // VALIDASI
    if (password !== confirmPassword) {
      setError("Password tidak sama!");
      return;
    }

    if (password.length < 6) {
      setError("Password minimal 6 karakter!");
      return;
    }

    setIsLoading(true);

    try {
      // KIRIM KE BACKEND
      const response = await api.post("/auth/register", {
        username,
        password,
      });

      const data = response.data;

      // REGISTER BERHASIL
      if (data.success) {
        setSuccess("Registrasi berhasil! Redirecting ke login...");

        setTimeout(() => {
          navigate("/login-user");
        }, 1500);
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.log(err);

      setError("Server error!");
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
                <h1 className="text-3xl lg:text-4xl font-bold text-pink1 mb-3">SIGN UP FOR AN ACCOUNT?</h1>

                <p className="text-sm lg:text-base text-[#8B5A4A]">Buat akun dan nikmati pengalaman yang lebih personal, dari rekomendasi ukuran hingga gaya yang paling cocok untukmu.</p>
              </div>

              {/* ERROR */}
              {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded">{error}</div>}

              {/* SUCCESS */}
              {success && <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-3 rounded">{success}</div>}

              {/* FORM */}
              <form onSubmit={handleRegister} className="space-y-4">
                {/* USERNAME */}
                <div>
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-6 py-3 rounded-full border-2 border-[#D4A896] bg-white/60 placeholder-[#B8956A] text-[#5A4A3A] focus:outline-none focus:border-pink1 focus:bg-white transition"
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
                    className="w-full px-6 py-3 rounded-full border-2 border-[#D4A896] bg-white/60 placeholder-[#B8956A] text-[#5A4A3A] focus:outline-none focus:border-pink1 focus:bg-white transition"
                    required
                  />
                </div>

                {/* CONFIRM PASSWORD */}
                <div>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-6 py-3 rounded-full border-2 border-[#D4A896] bg-white/60 placeholder-[#B8956A] text-[#5A4A3A] focus:outline-none focus:border-pink1 focus:bg-white transition"
                    required
                  />
                </div>

                {/* BUTTON */}
                <button type="submit" disabled={isLoading} className="w-full py-3 rounded-full bg-pink1 text-white font-medium hover:bg-[#B23D2E] transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg">
                  {isLoading ? "Creating account..." : "Sign Up"}
                </button>
              </form>

              {/* LOGIN LINK */}
              <p className="text-center text-sm text-coklat">
                Sudah punya akun?{" "}
                <a href="/login-user" className="text-pink1 font-semibold hover:underline">
                  Log in
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
