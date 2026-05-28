import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, AlertCircle } from "lucide-react";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    messageType: "Feedback/Suggestions (Saran)",
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const messageTypes = [
    "Feedback/Suggestions (Saran)",
    "Report Bug (Laporkan Kesalahan)",
    "Feature Request (Request Fitur)",
    "General Inquiry (Pertanyaan Umum)",
    "Other (Lainnya)",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzsKfamX_3ErpYq4EvZT-7QK4bODjCsIBpO4Esgwr5Zsy5TaHpssXcsfkjT-R2Owrgu/exec";

const handleSubmit = async (e) => {
  e.preventDefault();

  setError("");
  setSuccess(false);

  // Validasi
  if (!formData.name || !formData.email || !formData.message) {
    setError("Please fill all required fields.");
    return;
  }

  setLoading(true);

  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify({
        messageType: formData.messageType,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      }),
    });

    const result = await response.json();

    if (result.result === "success") {
      setSuccess(true);

      setFormData({
        messageType: "Feedback/Suggestions (Saran)",
        name: "",
        email: "",
        phone: "",
        message: "",
      });

      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } else {
      setError("Failed to send message.");
    }
  } catch (err) {
    setError("Error: " + err.message);
  } finally {
    setLoading(false);
  }
};

    const handleClose = () => {
    navigate("/about");
    };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-pink3 p-6">
        {/* Close */}
        <button onClick={handleClose} className="absolute top-6 right-6 bg-pink1 text-white w-8 h-8 flex items-center justify-center rounded-full text-xl font-bold shadow-md hover:bg-oren2 transition-all active:scale-95" aria-label="Close">
            ✕
        </button>
      <div className="relative w-full px-32 md:px-52">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
        >
          {/* Select */}
          <div>
            <div className="relative">
              <select
                name="messageType"
                value={formData.messageType}
                onChange={handleChange}
                className="w-full appearance-none rounded-full bg-primary border border-coklat px-4 py-3 text-coklat outline-none"
              >
                {messageTypes.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>

              <ChevronDown
                size={20}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-coklat"
              />
            </div>
          </div>

          {/* Name */}
          <div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-full bg-primary border border-coklat px-4 py-3 text-coklat placeholder:text-oren2 outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="yourname@gmail.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-full bg-primary border border-coklat px-4 py-3 text-coklat placeholder:text-oren2 outline-none"
            />
          </div>

          {/* Phone */}
          <div>
            <input
              type="text"
              name="phone"
              placeholder="Contoh: 08123456789"
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded-full bg-primary border border-coklat px-4 py-4 text-coklat placeholder:text-oren2 outline-none"
            />
          </div>

          {/* Message */}
          <div>
            <textarea
              name="message"
              placeholder="Your message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className="w-full rounded-2xl bg-primary border border-coklat px-4 py-4 text-coklat placeholder:text-oren2 outline-none"
            />
          </div>

          {/* Alert */}
          {error && (
            <div className="flex items-center gap-2 text-red text-sm">
              <AlertCircle size={14} />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="text-green text-sm">
              Message sent successfully!
            </div>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-1 py-3 rounded-full bg-pink1 text-white hover:text-pink1 text-sm hover:bg-white transition-all active:scale-95 shadow-md"
          >
            {loading ? "Loading..." : "Send Now"}
          </button>
        </form>
      </div>
    </div>
  );
}