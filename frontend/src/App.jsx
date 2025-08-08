import "./App.css";
import Hero from "./Landing/Hero";
import Footer from "./Landing/Footer";
import SignedIn from "./components/SignedIn";
import { Routes, Route } from "react-router-dom";
import Login from "./Authentication/Login";
import Register from "./Authentication/Register";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Routes>
          <Route path="/main" element={<SignedIn />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Hero />} />
        </Routes>
      </main>
      {/* <Footer /> */}
      <Toaster />
    </div>
  );
}

export default App;
