import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";

export default function LoginAdmin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(UserContext);
  const navigate = useNavigate(); // ✅ navigate ada di sini

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(username, password, "admin"); // panggil context
    if (success) {
      navigate("/admin"); // navigasi setelah login berhasil
    } else {
      alert("Username atau password salah");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-20 flex flex-col gap-4">
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        className="border p-2 rounded"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
        className="border p-2 rounded"
      />
      <button type="submit" className="bg-coklat text-white py-2 rounded">Login Admin</button>
    </form>
  );
}
