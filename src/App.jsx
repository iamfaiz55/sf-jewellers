/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react';
import { Toaster } from 'sonner';
import { Route, RouterProvider, Routes, createBrowserRouter } from 'react-router-dom';
import Dashboard from './admin/Dashboard';
import Home from './components/Home';
import AdminRegister from './components/AdminRegister';
import AdminLogin from './components/AdminLogin';
import UserRegister from './user/UserRegister';
import UserLogin from './user/UserLogin';
import AdminProtected from './share/AdminProtected';
import UserProtected from './share/UserProtected';
import Details from './components/Details';
import Profile from './user/Profile';
import CheckOut from './components/checkOut';
import Cart from './components/Cart';
import CartCheckOut from './components/CartCheckOut';
import PaymentPage from './components/PaymentPage';
import AllOrders from './user/AllOrders';
import AdminAllOrders from './admin/AdminAllOrders';
// import AllUsers from './admin/AllUsers';
import AddCarousel from './admin/AddCarousel';
import About from './admin/About';
import OurMission from './admin/OurMission';
import Vision from './admin/Vision';
import Team from './admin/Team';
import Liked from './components/Liked';
import Categories from './admin/Categories';
import Contact from './admin/Contact';
import GetContacts from './admin/GetContacts';
import PaymentMethod from './admin/PaymentMethod';
import CompanyAddress from './admin/CompanyAddress';
import AdminScrollCards from './admin/AdminScrollCards';
import Navmenu from './admin/Navmenu';
import AdminLayout from './admin/AdminLayout';
import UserNavbar from './user/UserNavbar';
import AdminAddImages from './admin/AdminAddImages';
import { ThemeProvider } from './admin/Theme';
import History from './admin/History';
import Schedule from './admin/Schedule';
import AvgIncome from './admin/AvgIncome';
// import MostViewed from './admin/MostViewed';

// Create Contexts
export const CartContext = createContext();
// eslint-disable-next-line react-refresh/only-export-components
export const filterContext = createContext();
export const sectionContext = createContext();
export const selectedProductContext = createContext();
export const useCart = () => useContext(CartContext);
export const useSection = () => useContext(sectionContext);
// eslint-disable-next-line react-hooks/rules-of-hooks
export const usefilter = () => useContext(filterContext);
export const useProduct = () => useContext(selectedProductContext);

const App = () => {
  const [selectedProd, setselectedProd] = useState();
  const [selectedType, setSelectedType] = useState();
  const [currentSection, setCurrentSection] = useState();
  const [cartData, setCartData] = useState(() => {
    const savedCartData = localStorage.getItem('cartData');
    return savedCartData ? JSON.parse(savedCartData) : { cartItems: [], subtotal: 0 };
  });

  useEffect(() => {
    localStorage.setItem('cartData', JSON.stringify(cartData));
  }, [cartData]);

  // Define routes using createBrowserRouter
  const router = createBrowserRouter([
    {
      path: "/",
      element: <><UserNavbar /><Home /></>,
    },
    {
      path: "admin/*",
      element: <AdminLayout />,
      children: [
        { index: true, element: <AdminProtected compo={<Dashboard />} /> }, // Default Admin Dashboard
        { path: "register", element: <AdminRegister /> },
        { path: "login", element: <AdminLogin /> },
        { path: "categories", element: <AdminProtected compo={<Categories />} /> },
        { path: "dashboard", element: <AdminProtected compo={<Dashboard />} /> },
        // { path: "most-viewed", element: <AdminProtected compo={<MostViewed />} /> },

        { path: "avg-income", element: <AdminProtected compo={<AvgIncome />} /> },
        { path: "schedule", element: <AdminProtected compo={<Schedule />} /> },
        { path: "get-contacts", element: <AdminProtected compo={<GetContacts />} /> },
        { path: "get-history/:id", element: <AdminProtected compo={<History />} /> },
        { path: "addsImage", element: <AdminProtected compo={<AdminAddImages />} /> },
        // { path: "allUsers", element: <AdminProtected compo={<AllUsers />} /> },
        { path: "admin-scroll-card", element: <AdminProtected compo={<AdminScrollCards />} /> },
        { path: "navmenu", element: <AdminProtected compo={<Navmenu />} /> },
        { path: "addresses", element: <AdminProtected compo={<CompanyAddress />} /> },
        { path: "paymentMethod", element: <AdminProtected compo={<PaymentMethod />} /> },
        { path: "addCarousel", element: <AdminProtected compo={<AddCarousel />} /> },
        { path: "allOrders", element: <AdminProtected compo={<AdminAllOrders />} /> },
      ],
    },
    {
      path: "user/*",
      element: <>
        <UserNavbar />
        <Routes>
          <Route path="register" element={<UserRegister />} />
          <Route path="login" element={<UserLogin />} />
          <Route path="about" element={<About />} />
          <Route path="mission" element={<OurMission />} />
          <Route path="vision" element={<Vision />} />
          <Route path="contact" element={<Contact />} />
          <Route path="team" element={<Team />} />
          <Route path="cart" element={<UserProtected compo={<Cart />} />} />
          <Route path="cartCheckout" element={<UserProtected compo={<CartCheckOut />} />} />
          <Route path="liked" element={<UserProtected compo={<Liked />} />} />
          <Route path="allOrders" element={<UserProtected compo={<AllOrders />} />} />
          <Route path="checkout/:id" element={<CheckOut />} />
          <Route path="profile" element={<UserProtected compo={<Profile />} />} />
          <Route path="payment" element={<UserProtected compo={<PaymentPage />} />} />
        </Routes>
      </>,
    },
    { path: "/details/:id", element: <><UserNavbar /><Details /></> },
    { path: "*", element: <h1>Page Not Found</h1> },
  ]);

  return (
    <filterContext.Provider value={{ selectedType, setSelectedType }}>
      <sectionContext.Provider value={{ setCurrentSection, currentSection }}>
        <selectedProductContext.Provider value={{ selectedProd, setselectedProd }}>
          <CartContext.Provider value={{ cartData, setCartData }}>
            <Toaster richColors position="top-right" />
            <ThemeProvider>
              <RouterProvider router={router} />
            </ThemeProvider>
          </CartContext.Provider>
        </selectedProductContext.Provider>
      </sectionContext.Provider>
    </filterContext.Provider>
  );
};

export default App;
