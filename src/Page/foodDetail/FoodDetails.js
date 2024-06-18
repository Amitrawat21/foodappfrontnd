import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { addProduct } from '../../Redux/cartSlice';
import axios from "axios";
import "./FoodDetail.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FoodDetails = () => {
  const [foodDetails, setFoodDetails] = useState({});
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { token, user } = useSelector((state) => state.auth);
  const [email, setEmail] = useState(user?.email);


  useEffect(() => {
    const fetchFoodDetails = async () => {
      try {
        const response = await axios.get(`https://foodappbackend-rjtx.onrender.com/product/find/${id}`, {
          headers: {
            Accept: 'application/json',
            auth: `${token}`  // Common header format
          },
        });
        console.log(response , "ressss")
        setFoodDetails(response.data.catProduct);
      } catch (error) {
        console.error("Error fetching food details:", error);
      }
    };
    fetchFoodDetails();
  }, [id, token]);

  const changeQuantity = (command) => {
    if (command === 'dec') {
      if (quantity === 1) return;
      setQuantity((prev) => prev - 1);
    } else if (command === 'inc') {
      setQuantity((prev) => prev + 1);
    }
  };

  const addToCart = () => {
    dispatch(addProduct({ ...foodDetails, quantity, email }));
    toast.success("Added to cart!", {
      position: "top-right",
     
      className: 'my-toast-class-fooddetail',
     
    });

    setTimeout(()=>{

    }, 1000)
  };

  return (
    <div className="foodDetail_container">
      <div className="foodDetail_wrapper">
        <div className="left">
          <img src={foodDetails?.image} alt="food" />
        </div>
        <div className="fooddetail_right">
          <h2 className="titlee">{foodDetails?.title}</h2>
          <div className="price">
            Price: <span>$</span> {foodDetails?.price}
          </div>
          <div className="quantity">
            <button disabled={quantity === 1} onClick={() => changeQuantity('dec')}>-</button>
            <span className="quantityNumber">{quantity}</span>
            <button onClick={() => changeQuantity('inc')}>+</button>
          </div>
          <div className="category">
            <h3>Category: </h3>
            <span className="categoryName">{foodDetails?.category}</span>
          </div>
          <div className="productDesc">
            <div>Description: </div>
            <p>
              {foodDetails?.desc?.length > 50 ? `${foodDetails?.desc.slice(0, 50)}...` : foodDetails?.desc}
            </p>
          </div>
          <button onClick={addToCart} className="addToCart">Add To Cart <AiOutlineShoppingCart /></button>
        </div>
      </div>
      <ToastContainer autoClose={1500} />
    </div>
  );
};

export default FoodDetails;
