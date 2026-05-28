import renda from "../../assets/renda.png";
import bgteam from "../../assets/bgaboutteam.png";
import cardteam from "../../assets/cardteam.png";
import fotoacil from "../../assets/fotoacil.jpg";
import fotouli from "../../assets/fotouli.jpg";
import fotonara from "../../assets/fotoacil.jpg";
import fotoulil from "../../assets/fotoulil.jpg";
import fotorai from "../../assets/fotorai.jpg";

export default function MeetOurTeamSection() {
  const teamMembers = [
    {
      id: 1,
      name: "Ashila Najyya P",
      role: "Chief Executive Officer",
      instagram: "@username0",
      nickname: "Acil",
      about: "3 Things About Me: Cute, Kind, Care",
      emojiVibe: "🎀😊🎂",
      photo: fotoacil, // ganti dengan import foto
    },
    {
      id: 2,
      name: "Risya Maulida N",
      role: "Chief Financial Officer",
      instagram: "@username0",
      nickname: "Uli",
      about: "3 Things About Me: Cute, Kind, Care",
      emojiVibe: "🎀😊🎂",
      photo: fotouli,
    },
    {
      id: 3,
      name: "Nadia R. Aisy",
      role: "Chief Marketing Officer",
      instagram: "@username0",
      nickname: "Nara",
      about: "3 Things About Me: Cute, Kind, Care",
      emojiVibe: "🎀😊🎂",
      photo: fotonara,
    },
    {
      id: 4,
      name: "F. Mauril Ranindya",
      role: "Chief Creative Officer",
      instagram: "@username0",
      nickname: "Ulil",
      about: "3 Things About Me: Cute, Kind, Care",
      emojiVibe: "🎀😊🎂",
      photo: fotoulil,
    },
    {
      id: 5,
      name: "Rai Nanda K",
      role: "Chief Technology Officer",
      instagram: "@username0",
      nickname: "Rai",
      about: "3 Things About Me: Cute, Kind, Care",
      emojiVibe: "🎀😊🎂",
      photo: fotorai,
    },
  ];

  return (
    <>
     <div className="w-full bg-primary flex flex-col items-center justify-center">
     <img 
            src={renda} 
            alt="renda" 
            className="relative w-full flex flex-col items-center justify-center text-center"
        />
    </div>
      {/* SECTION - Background dengan pattern */}
      <div
        className="relative w-full min-h-screen flex flex-col items-center justify-center py-16 md:py-24"
        style={{
          backgroundColor: "#FFEBC8",
          backgroundImage: `url(${bgteam})`,
        }}
      >
        {/* Title */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#C7752E] font-[Poppins] uppercase tracking-widest" 
          style={{
            textShadow: `
              -4px -4px 0 #ffffff,
              4px -4px 0 #ffffff,
              -4px  4px 0 #ffffff,
              4px  4px 0 #ffffff,
              0px -4px 0 #ffffff,
              0px  4px 0 #ffffff,
              -4px  0px 0 #ffffff,
              4px  0px 0 #ffffff
            `,
          }}>
            Meet Our Team
          </h2>
        </div>

        {/* Team Cards Grid */}
        <div className="w-full px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 justify-items-center">
            
            {teamMembers.map((member) => (
            <div key={member.id} className="relative w-[320px]">
                
                {/* Card Image */}
                <img
                src={cardteam}
                alt="Team Card"
                className="w-full h-auto object-contain"
                />

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col items-center px-6 py-8">
                  
                  {/* Photo Area */}
                  <div className="w-full aspect-square flex-1 overflow-hidden items-center justify-center rounded-lg border-2 border-white">
                    <img 
                    src={member.photo} 
                    alt="member" 
                    className="w-full h-full object-cover"
                    />
                  </div>
 
                  {/* Role Banner */}
                  <div className="bg-coklat px-12 py-2 rounded-xl -mx-12 -mt-14 border-2 border-white relative z-10">
                    <p className="text-white font-[Poppins] font-bold text-sm text-center">
                      {member.name}
                    </p>
                    <p className="text-white/90 font-[Poppins] text-xs text-center">
                      {member.role}
                    </p>
                    <p className="text-primary font-[Poppins] text-xs text-center mt-0.5">
                      {member.instagram}
                    </p>
                  </div>
 
                  {/* Main Content Area - Pink Section */}
                  <div className="bg-transparant px-1 py-2 mt-1">
                    {/* Nickname Section */}
                    <div className="border-2 border-white rounded-full px-4 py-2 mb-4 bg-white/20">
                      <p className="text-center font-[Poppins] font-normal text-primary text-sm">
                        Nickname: <br /><span className="font-semibold text-white">{member.nickname}</span>
                      </p>
                    </div>
 
                    {/* About Section */}
                    <div className="border-2 border-white rounded-full px-4 py-2 mb-4 bg-white/20">
                      <p className="text-center font-[Poppins] font-normal text-primary text-xs leading-relaxed">
                        3 Things About Me: <br /><span className="font-semibold text-white">{member.about}</span>
                      </p>
                    </div>
 
                    {/* Emoji Vibe */}
                    <div className="text-center">
                      <p className="text-center font-[Poppins] text-white text-xs mb-2">Emoji Vibes:</p>
                      <p className="text-center text-xl tracking-wider">
                        {member.emojiVibe}
                      </p>
                    </div>
                    </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
      <div className="w-full bg-pink2 flex flex-col items-center justify-center">
     <img 
            src={renda} 
            alt="renda" 
            className="relative w-full flex flex-col items-center justify-center text-center scale-y-[-1]"
        />
    </div>
    </>
  );
}