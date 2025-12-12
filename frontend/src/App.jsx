import { Router, Routes, Route } from "react-router-dom";
import './App.css'
import Board from './pages/Board'
import LandingPage from './pages/LandingPage'
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/board/:difficulty" element={<Board />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App
