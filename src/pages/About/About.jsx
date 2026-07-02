import TeamSection from '../../components/TeamSection/TeamSection';
import IntroductionSection from '../../components/IntroductionSection/IntroductionSection';
import VisiMisiSection from '../../components/VisiMisiSection/VisiMisiSection';
import StrengthSection from '../../components/StrengthSection/StrengthSection';
import MeetTeamSection from '../../components/MeetTeamSection/MeetTeamSection';
import MessageSection from '../../components/MessageSection/MessageSection';

import MusicPlayer from "../../components/MusicPlayer/MusicPlayer";
import aboutMusic from "../../assets/music/about.mp3";

export default function About() {

  return (
    <>
      <MusicPlayer music={aboutMusic} />
      <TeamSection />
      <IntroductionSection />
      <VisiMisiSection />
      <StrengthSection />
      <MeetTeamSection />
      <MessageSection />
    </>
  );
}
