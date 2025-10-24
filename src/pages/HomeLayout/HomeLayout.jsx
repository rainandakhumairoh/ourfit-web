import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { Outlet } from 'react-router-dom';

export default function HomeLayout() {
  return (
    <div className="flex flex-col min-h-screen ">
      <Navbar />
      <main className="flex-grow p-4 pt-[87px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
