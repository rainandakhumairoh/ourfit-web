import WelcomeSection from '../../components/WelcomeSection/WelcomeSection';
import PersonalizationSection from '../../components/PersonalizationSection/PersonalizationSection';
import WardrobeItem from '../../components/WardrobeItem/WardrobeItem';
import MixMatchItem from '../../components/MixMatchItem/MixMatchItem';

export default function Home() {
  return (
    <>
      <WelcomeSection />
      <PersonalizationSection/>
      <WardrobeItem/>
      <MixMatchItem/>
    </>
  );
}
