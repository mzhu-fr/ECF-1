import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./component/navbar/Navbar";
import { Sidebar } from "./component/navbar/Sidebar";
import { LoginRegister } from "./component/connexion/Login-Register";
import { AdminLogin } from "./component/connexion/AdminLogin";
import { Profil } from "./component/profile/Profil";
import { UpdateReview } from "./component/profile/UpdateReview";
import { AboutUs } from "./component/about/about";

function App() {
  return (
    <BrowserRouter>

      {/* NAVBAR */}
      < Navbar />
      <Sidebar />

      <Routes>
        <Route path="/" />
        <Route path="/register-login" element={<LoginRegister />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/profile" element={<Profil />} />
        <Route path="/admin">
          <Route path="/admin/create" />
        </Route>
        <Route path="/user-review/:id" element={<UpdateReview />} />
      </Routes>

      {/* FOOTER */}

    </BrowserRouter>
  );
}

export default App;
