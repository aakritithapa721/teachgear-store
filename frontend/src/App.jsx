import React from 'react'
import { Route, BrowserRouter as Router, Routes } from "react-router"
import Homepage from './pages/Homepage'
import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'
import Navbar from './pages/components/Navbar'
import Register from './pages/Register'
import FormData from './pages/Form'
import Login from './pages/Login'
import { Toaster } from 'react-hot-toast'
import { ListandKeys} from './pages/components/Button'
import Products from './pages/Products'



const App = () => {
  return (
    <Router>
      <Toaster/>
      <Navbar />
      <Routes>
        <Route path='' 
        element={<Homepage> </Homepage>}>
        </Route>

        <Route path='/about' 
        element={<AboutUs></AboutUs>}>
        </Route>

      
        <Route path='/ContactUs' 
        element={<ContactUs></ContactUs>}>
        </Route>

        <Route path='/Register' 
        element={<Register></Register>}>
        </Route>

        <Route path='/FormData'
        element={<FormData></FormData>}>

        </Route>

        <Route path='/ListandKeys'
          element={<ListandKeys></ListandKeys>}>

          </Route>
          <Route path='/Login'
          element={<Login></Login>}>

          </Route>
          <Route path='/Products'
          element={<Products></Products>}>

          </Route>

      
      </Routes>
    </Router>
  )
}

export default App
