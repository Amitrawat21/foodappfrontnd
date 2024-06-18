import {BrowserRouter ,useLocation ,  Routes , Route} from "react-router-dom"
import { useEffect } from "react";
import './App.css';

import Navbar from "./components/navbar/Navbar";
import Login from "./Page/login/Login";
import Signup from "./Page/Signup/Signup";
import Create from "./Page/create/Create";
import FoodCatalog from "./Page/foodCatalog/FoodCatalog";
import FoodDetails from "./Page/foodDetail/FoodDetails";
import Cart from "./Page/cart/Cart";
import Checkout from "./Page/checkout/Checkout";
import Home from "./Page/Home/Home";


function App() {


  const location = useLocation()
 
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])
 
  return (
<div>

<Navbar/>
    <Routes>
    <Route path='/' element={<Home />} />
         <Route path='/login' element={<Login />} />
         <Route path='/signup' element={<Signup />} />
         <Route path='/create' element={<Create />} />
         <Route path='/food/:id' element={<FoodDetails />} />
         <Route path='/foods/:name' element={<FoodCatalog />} />
         <Route path='/cart' element={<Cart />} />
         <Route path='/checkout' element={<Checkout />} />

    </Routes>

</div>
    
    
    
 
  );
}

export default App;
