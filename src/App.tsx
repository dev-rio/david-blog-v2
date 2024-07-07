import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./styles/global.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Create from "./components/Create";
import BlogDetails from "./components/BlogDetails";
import NotFound from "./components/NotFound";
import EditBlog from "./components/BlogEdit";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div className="text-2xl font-bold">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/blogs/:id" element={<BlogDetails />} />
            <Route path="/edit/:id" element={<EditBlog />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
