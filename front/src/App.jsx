import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Home from "./pages/home"
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import About from "./pages/about";
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from "./pages/signUp";
import SignIn from "./pages/signIn";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const HeaderLayout = () => {
    return (
      <>
        <Header />
        <Outlet />
        <Footer />
      </>
    )
  }

  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route element = {<HeaderLayout/>}>
          <Route path="/about" element ={<About/>}/>
          <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
        </Route>
      </Routes>
      <ToastContainer
            position="top-center"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
      />
    </Router>
    
    
  )
}

export default App
