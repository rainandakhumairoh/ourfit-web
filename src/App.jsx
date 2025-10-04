// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import './App.css';
// import MainLayout from './pages/MainLayout/MainLayout';


// function App() {
//   const queryClient = new QueryClient();

//   const router = createBrowserRouter([
//     {
//       path: '/',
//       element: <MainLayout />,
//       children: [
//         {
//           index: true,
//           element: (
//             <ProtectedRoute>
//               <Home />
//             </ProtectedRoute>
//           ),
//         },
//       ],
//     },
//   ]);

//   return (
//     <QueryClientProvider client={queryClient}>
//         <Toaster />
//         <RouterProvider router={router} />
//     </QueryClientProvider>
//   );
// }

// export default App;


import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css';
import MainLayout from "./pages/MainLayout/MainLayout";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Wardrobe from "./pages/Wardrobe/Wardrobe";
import Personalization from "./pages/Personalization/Personalization";
import MixMatch from "./pages/MixMatch/MixMatch";
import Profile from "./pages/Profile/Profile";


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />, // layout utama
      children: [
        { index: true, element: <Home /> },  // halaman home
        { path: "personalization", element: <Personalization /> },
        { path: "wardrobe", element: <Wardrobe /> },
        { path: "mixmatch", element: <MixMatch /> },
        { path: "about", element: <About /> }, 
        { path: "profile", element: <Profile /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;