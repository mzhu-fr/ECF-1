import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./component/navbar/Navbar";
import { Sidebar } from "./component/navbar/Sidebar";

function App() {
  return (
    <BrowserRouter>

      {/* NAVBAR */}
      < Navbar />
      <Sidebar />

      <Routes>
        <Route path="/" />

      </Routes>

      {/* FOOTER */}

    </BrowserRouter>
  );
}

export default App;
