import { Link } from "react-router-dom";

export default function MessageSection() {
  
    const handleContactUs = () => {
    navigate("/ContactUs");
  };

  return (
    <>
      {/* SECTION - Background Cream dengan Gradient */}
      <div
        className="relative w-full min-h-full flex flex-col items-center justify-center py-12 md:py-24"
        style={{
          backgroundColor: "#D98282",
        }}
      >
        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-4xl md:text-5xl font-bold text-white font-[Poppins] uppercase" style={{
                textShadow: `
                  -2px -2px 0 #CB5252,
                  2px -2px 0 #CB5252,
                  -2px  2px 0 #CB5252,
                  2px  2px 0 #CB5252,
                  0px -2px 0 #CB5252,
                  0px  2px 0 #CB5252,
                  -2px  0px 0 #CB5252,
                  2px  0px 0 #CB5252
                `,
              }}>
            Want to Send a Message?
          </h2>
        </div>
      {/* ======== TOMBOL di atas bordir ======== */}
      <div className="relative flex justify-center mt-0">
        <Link
          to="/contactus"
          className="text-white hover:text-pink1 bg-pink1 hover:bg-white rounded-full px-48 py-3 text-sm flex items-center gap-2 transition-all duration-300 shadow-md"
        >
          Contact Us
        </Link>
      </div>
      </div>
    </>
  );
}