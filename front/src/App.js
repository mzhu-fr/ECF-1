import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./component/navbar/Navbar";
import { Sidebar } from "./component/navbar/Sidebar";
import { LoginRegister } from "./component/connexion/Login-Register";
import { AdminLogin } from "./component/connexion/AdminLogin";
import { Profil } from "./component/profile/Profil";
import { UpdateReview } from "./component/profile/UpdateReview";
import { AboutUs } from "./component/about/About";
import { Admin } from "./component/admin/Admin";
import { EmployeeUpdate, ProductUpdate, UserUpdate } from "./component/admin/Update-CRUD";
import { Home } from "./component/home/Home";
import { Car } from "./component/home/Car";
import { Footer } from "./component/footer/Footer";

function App() {
  return (
    <BrowserRouter>

      {/* NAVBAR */}
      < Navbar />
      <Sidebar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Home />} />
        <Route path="/cars/:id" element={<Car />} />
        <Route path="/register-login" element={<LoginRegister />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/profile" element={<Profil />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/employee-update/:id" element={<EmployeeUpdate />} />
        <Route path="/admin/user-update/:id" element={< UserUpdate />} />
        <Route path="/admin/products-update/:id" element={<ProductUpdate />} />
        <Route path="/user-review/:id" element={<UpdateReview />} />
      </Routes>

      <Footer />

    </BrowserRouter>
  );
}

export default App;
