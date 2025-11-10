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
import HomeLayout from "./pages/HomeLayout/HomeLayout";
import MainLayout from "./pages/Mainlayout/Mainlayout";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Wardrobe from "./pages/Wardrobe/Wardrobe";
import Personalization from "./pages/Personalization/Personalization";
import MixMatch from "./pages/MixMatch/MixMatch";
import Profile from "./pages/Profile/Profile";
import ProductsProvider from "./context/Products/Products";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import MixMatchDetails from "./pages/MixMatchDetails/MixMatchDetails";


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,  // pakai layout dengan FooterHome
      children: [
        { index: true, element: <Home /> },
      ],
    },
    {
      path: "/",  // layout umum untuk halaman lain
      element: <MainLayout />,
      children: [
        { path: "personalization", element: <Personalization /> },
        { path: "wardrobe", element: <Wardrobe /> },
        { path: "wardrobe/:id", element: <ProductDetails /> }, // 🔹 route detail produk
        { path: "mixmatch", element: <MixMatch /> },
        { path: "mixmatch/:id", element: <MixMatchDetails /> },
        { path: "about", element: <About /> },
        { path: "profile", element: <Profile /> },
      ],
    },
  ]);

   return (
    <ProductsProvider>
      <RouterProvider router={router} />
    </ProductsProvider>
  );
}

export default App;