// import { useLocation, useNavigate } from "react-router-dom";
// import { useContext, useState, useEffect } from "react";
// import { UserContext } from "../../../context/UserContext";

// export default function Login() {
//   const { login } = useContext(UserContext);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [role, setRole] = useState("user"); // default user
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   useEffect(() => {
//     // ambil role dari Navbar
//     if (location.state && location.state.role) {
//       setRole(location.state.role);
//     }
//   }, [location]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const success = login(username, password, role);
//     if (!success) {
//       setError("Username / Password salah");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-xl shadow-md w-80">
//         <h2 className="text-xl font-semibold mb-6">Login {role === "admin" ? "Admin" : "User"}</h2>
//         {error && <p className="text-red-500 mb-2">{error}</p>}
//         <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//           <input
//             type="text"
//             placeholder="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             className="border p-2 rounded"
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="border p-2 rounded"
//             required
//           />
//           <button type="submit" className="bg-coklat text-white py-2 rounded hover:bg-[#804000]">
//             Login
//           </button>
//         </form>
//         {role === "user" && (
//           <p className="mt-4 text-sm text-center">
//             Belum punya akun? <span onClick={() => navigate("/register")} className="text-blue-500 cursor-pointer">Daftar</span>
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }
