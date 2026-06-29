import renda from "../../assets/renda.png";
import bgteam from "../../assets/bgaboutteam.png";
import cardteam from "../../assets/cardteam.png";
import fotoacil from "../../assets/fotoacil.jpg";
import fotouli from "../../assets/fotouli.jpg";
import fotonara from "../../assets/fotonara.jpg";
import fotoulil from "../../assets/fotoulil.jpg";
import fotorai from "../../assets/fotorai.jpg";
import { motion } from "framer-motion";

export default function MeetOurTeamSection() {
  const teamMembers = [
    {
      id: 1,
      name: "Ashila Najyya P",
      role: "Chief Executive Officer",
      instagram: "@ashilaanp",
      nickname: "Acil",
      about: "3 Things About Me: Cute, Kind, Care",
      emojiVibe: "🎀😊🎂",
      photo: fotoacil, // ganti dengan import foto
    },
    {
      id: 2,
      name: "Risya Maulida N",
      role: "Chief Financial Officer",
      instagram: "@risyamaulidaa",
      nickname: "Uli",
      about: "3 Things About Me: Cute, Kind, Care",
      emojiVibe: "🎀😊🎂",
      photo: fotouli,
    },
    {
      id: 3,
      name: "Nadia R. Aisy",
      role: "Chief Marketing Officer",
      instagram: "@nadiaraisy",
      nickname: "Nara",
      about: "3 Things About Me: Cute, Kind, Care",
      emojiVibe: "🎀😊🎂",
      photo: fotonara,
    },
    {
      id: 4,
      name: "F. Mauril Ranindya",
      role: "Chief Creative Officer",
      instagram: "@maurielranindya",
      nickname: "Ulil",
      about: "3 Things About Me: Cute, Kind, Care",
      emojiVibe: "🎀😊🎂",
      photo: fotoulil,
    },
    {
      id: 5,
      name: "Rai Nanda K",
      role: "Chief Technology Officer",
      instagram: "@raiinndkh",
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
        <div 
        className="w-full px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 justify-items-center"> 
            {teamMembers.map((member) => (
            <motion.div
            key={member.id}
            className="relative w-[320px]"
            initial={{
              opacity: 0,
              scale: 0,
              y: 100,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            transition={{
            type: "spring",
            stiffness: 80,
            damping: 10,
            delay: member.id * 0.2,
          }}
            viewport={{ once: true }}
          >
                
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
                  <div className="bg-coklat px-10 py-6 rounded-xl -mx-12 -mt-14 border-2 border-white relative z-10">
                    <p className="text-white font-[Poppins] font-bold text-sm text-center">
                      {member.name}
                    </p>
                    <p className="text-white/90 font-[Poppins] text-sm text-center">
                      {member.role}
                    </p>
                  </div>
 
                  {/* Main Content Area - Pink Section */}
                  <div className="w-full bg-transparant px-1 py-8">
                    {/* Nickname Section */}
                    <div className="border-2 border-white rounded-full px-4 py-2 mb-4 bg-white/20">
                      <p className="text-center font-[Poppins] font-normal text-primary text-sm">
                        Nickname: <br /><span className="font-semibold text-white">{member.nickname}</span>
                      </p>
                    </div>
 
                    {/* About Section */}
                    <div className="border-2 border-white rounded-full px-4 py-2 mb-4 bg-white/20">
                      <p className="text-center font-[Poppins] font-normal text-primary text-sm leading-relaxed">
                        Instagram: <br /><span className="font-semibold text-white">{member.instagram}</span>
                      </p>
                    </div>
 
                    {/* Emoji Vibe */}
                    {/* <div className="text-center">
                      <p className="text-center font-[Poppins] text-white text-xs mb-2">Emoji Vibes:</p>
                      <p className="text-center text-xl tracking-wider">
                        {member.emojiVibe}
                      </p>
                    </div> */}
                  </div>
                </div>
              </motion.div>
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