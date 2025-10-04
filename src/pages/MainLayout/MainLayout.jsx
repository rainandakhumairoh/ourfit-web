import Navbar from '../../components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen ">
      <Navbar />
      <main className="flex-grow p-4 pt-[87px]">
        <Outlet />
      </main>
    </div>
  );
}
