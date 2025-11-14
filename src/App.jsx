import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css';
import HomeLayout from "./pages/HomeLayout/HomeLayout";
import MainLayout from "./pages/Mainlayout/Mainlayout";
import SecondaryLayout from "./pages/SecondaryLayout/SecondaryLayout";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Wardrobe from "./pages/Wardrobe/Wardrobe";
import Personalization from "./pages/Personalization/Personalization";
import MixMatch from "./pages/MixMatch/MixMatch";
import Profile from "./pages/Profile/Profile";
import ProductsProvider from "./context/Products/Products";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import MixMatchDetails from "./pages/MixMatchDetails/MixMatchDetails";
import SmartFit from "./pages/SmartFit/SmartFit";
import SmartFitQuiz from "./pages/SmartFit/SmartFitQuiz"; 
import StyleQuiz from "./pages/StyleQuiz/StyleQuiz";
import StyleQuizQuestion from "./pages/StyleQuiz/StyleQuizQuestion";
import SmartFitDone from "./pages/SmartFit/SmartFitDone";


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

    // 💥 LAYOUT TANPA NAVBAR & FOOTER
    {
      path: "/",
      element: <SecondaryLayout />,
      children: [
        { path: "smart-fit", element: <SmartFit /> },
        { path: "smart-fit/question", element: <SmartFitQuiz /> },
        { path: "smart-fit/done", element: <SmartFitDone />},
        { path: "style-quiz", element: <StyleQuiz /> },
        { path: "style-quiz/question", element: <StyleQuizQuestion /> },
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