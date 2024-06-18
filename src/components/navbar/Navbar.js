import React, { useEffect, useState } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import "./Navbar.css";
import { AiOutlineUser, AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/authSlice";
import { fetchCart, resetCart } from "../../Redux/cartSlice";
import choman from "../../assets/choman.jpg";
import Avatar from "@mui/material/Avatar";
import Dehaze from "@mui/icons-material/Dehaze";
import ClearIcon from "@mui/icons-material/Clear";
import HomeIcon from "@mui/icons-material/Home";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from '@mui/icons-material/Logout';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [notAdmin, setNotAdmin] = useState(false);
  const [sidebar, setSideBar] = useState(false);
  const { products } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetCart());
    navigate("/login");
    setSideBar(false); // Close sidebar on logout
  };

  const showSideBar = () => {
    setSideBar(true);
  };

  const hideSideBar = () => {
    setSideBar(false);
  };

  useEffect(() => {
    if (user) {
      setNotAdmin(!user.isAdmin);
      if (user.email) {
        dispatch(fetchCart(user.email)); // Fetch cart data
      }
    } else {
      setNotAdmin(false);
    }
  }, [user, dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.pageYOffset !== 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    if (window.location.pathname !== "/") {
      navigate(`/?section=${sectionId}`);
    } else {
      document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" });
    }
    setSideBar(false); // Close sidebar on navigating
  };

  return (
    <div className={`navcontainer ${isScrolled ? "scrolled" : ""}`}>
      <div className="nav_wrapper">
        <div className="left">
          <Link to="/" className="nav_title">
            <img src={choman} />
          </Link>
        </div>
        <div className="center">
          <ul className="list">
            <li className="listItem">
              <Link to="/" onClick={() => scrollToSection("home")}>
                Home
              </Link>
            </li>
            <li className="listItem">
              <Link to="/" onClick={() => scrollToSection("foods")}>
                Foods
              </Link>
            </li>
            <li className="listItem">
              <Link to="/" onClick={() => scrollToSection("contacts")}>
                Contact
              </Link>
            </li>

            {user && user.isAdmin && (
              <li className="listItem">
                <Link to="/create">Create</Link>
              </li>
            )}

            {user && !user.isAdmin && (
              <li className="listItem">
                <Link to="/checkout">My Orders</Link>
              </li>
            )}
          </ul>
        </div>
        <div className="right">
          {notAdmin && (
            <Link to="/cart" className="cartContainer">
              <AiOutlineShoppingCart className="cartIcon" />
              <div className="cartQuantity">{products?.length}</div>
              </Link>
          )}
          <button
            onClick={user ? handleLogout : () => navigate("/login")}
            className="logout"
          >
            {user ? "Logout" : "Login"}
          </button>
          {user && (
            <Avatar style={{ height: "30px", width: "30px" }}>
           {user?.isAdmin ? "AD" : user?.username[0].toUpperCase()}
            </Avatar>
          )}
        </div>
        <div className="amit">
          <div>
            {notAdmin && (
              <Link to="/cart" className="cartContainer">
                <AiOutlineShoppingCart className="cartIcon" />
                <div className="cartQuantity">{products?.length}</div>
              </Link>
            )}
          </div>
          <Dehaze style={{ height: "50px", width: "40px" }} onClick={showSideBar} />
        </div>

        <div className={`sidebar ${sidebar ? "active" : ""}`}>
          <div className="sidebaricon" onClick={hideSideBar}>
            <ClearIcon style={{ width: "50px", height: "50px" }} />
          </div>
          <div className="sidebar_option">
            <NavLink to="/" onClick={() => scrollToSection("home")}>
              <div className="option_bar">
                <HomeIcon style={{ width: "50px", height: "45px", color: "black" }} />
                <h1>HOME</h1>
              </div>
            </NavLink>

            {user && user.isAdmin && (
              <NavLink to="/create" onClick={hideSideBar}>
                <div className="option_bar">
                  <AddCircleOutlineIcon style={{ width: "50px", height: "45px", color: "black" }} />
                  <h1>Create</h1>
                </div>
              </NavLink>
            )}

            {user && !user.isAdmin && (
              <NavLink to="/checkout" onClick={hideSideBar}>
                <div className="option_bar">
                  <ShoppingCartIcon style={{ width: "50px", height: "45px", color: "black" }} />
                  <h1>My orders</h1>
                </div>
              </NavLink>
            )}

            <div className="option_bar" onClick={user ? handleLogout : () => navigate("/login")}>
              <LogoutIcon style={{ width: "50px", height: "45px", color: "black" }} />
              <h1>{user ? "Logout" : "Login"}</h1>
            </div>
          </div>
        </div>

        {sidebar && <div className="sidebar-overlay" onClick={hideSideBar}></div>}
      </div>
    </div>
  );
};

export default Navbar;

