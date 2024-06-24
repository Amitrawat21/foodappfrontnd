import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, removeProduct, deleteAllCart } from "../../Redux/cartSlice";
import StripeCheckout from "react-stripe-checkout";
import nocart  from "../../assets/nocart.png"
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./cart.css";

  const Cart = () => {
  const KEY = "pk_test_51LvdGASGXtUoYRLzUHg0K0Vo4XcpgyFaW2YTBQEpBnfkcAhSgavP54nB53cGCPIZUyNoPntPmwmE73FJbHyAxlqq00UW0KQyqb";
  const { products } = useSelector((state) => state.cart);
  const{ID} = useSelector((state)=>state.cart)
  const { user } = useSelector((state) => state.auth);
  const [stripeToken, setStripeToken] = useState(null);
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);
  const[loading , setLoading] = useState(false)
  const dispatch = useDispatch();

  const onToken = (token) => {
    setStripeToken(token);
  };

  let totalPrice = 0;
  products?.map((product) => (totalPrice += product.quantity * product.price));

  const handleRemoveProduct = (id) => {
    dispatch(removeProduct({ id, email: user?.email }))
      .then(() => {
        dispatch(fetchCart(user?.email));
        toast.success("remove from cart  successfully!", {
          position: "top-right",
          className: 'my-toast-class-cart'
        });
      })
      .catch((error) => {
        console.error("Failed to remove product:", error);
      });
  };



  useEffect(() => {
    const makeRequest = async () => {
      try {
       
        const paymentRes = await axios.post("https://foodappbackend-rjtx.onrender.com/payment", {
          tokenId: stripeToken?.id,
          amount: totalPrice,
        });
        
        console.log(paymentRes, "payyyyyy");

        if (paymentRes.data.success) {
          setPaymentSuccessful(true);
          
          toast.success("thank you for order!!", {
            position: "top-right",
            className: 'my-toast-class-cart'
          });
        } else {
          console.log("Payment unsuccessful:", paymentRes.data.message);
        }
      } catch (error) {
        console.error("Error making request:", error);
      }
    };

    if (stripeToken && !paymentSuccessful) {
      makeRequest();
    }
  }, [stripeToken, totalPrice]);

  useEffect(() => {
    if (paymentSuccessful) {
      const addOrder = async () => {
        try {
          const res = await axios.post("https://foodappbackend-rjtx.onrender.com/addOrder", {
            email: user?.email,
            orderList: products,
          });
          if(res.data.success){
            dispatch(deleteAllCart({id : ID}))
          }
          // Optionally, clear the cart or perform other actions
        } catch (error) {
          console.error("Failed to add order:", error);
        }
      };
      addOrder();
    }
  }, [paymentSuccessful]);

  useEffect(() => {
    if (user?.email) {
      dispatch(fetchCart(user?.email));
    }
  }, [dispatch, user?.email]);

 

  return (
    <div className="cart_container">
      <div className="cart_wrapper">
        <div className="cart_left">
          {products?.length > 0 ? (
            products.map((product) => (
              <div key={product._id} className="cart_product">
                <img src={product.image} className="img" alt="product" />
                <div className="productData">
                  <h3 className="titleh">{product.title}</h3>
                  <div className="productAndQuantity">
                    <div className="cart_price">${product.price}</div>
                    <div className="cart_quantity">{product.quantity} x </div>
                  </div>
                </div>
                <div
                  className="delete_product"
                  onClick={() => handleRemoveProduct(product._id)}
                >
                  remove from cart
                </div>
              </div>
            ))
          ) : (
       
            <div className="noCart">
              <img src= {nocart}/>
                <h1 className="noProducts">No products in the cart. Go shopping!</h1>
                
            </div>
          
          )}
        </div>
        {
          products?.length && (
            <div className="cart_right">
            <div className="totalProductMsg">
              Total products: {products?.length}
            </div>
            <div className="subtotalCheckoutBtns">
              <span className="subtotal">Subtotal: ${totalPrice}</span>
              <StripeCheckout
                name="Lama Shop"
                image="https://avatars.githubusercontent.com/u/1486366?v=4"
                billingAddress
                shippingAddress
                description={`Your total is $${totalPrice}`}
                token={onToken}
                amount={totalPrice * 100}
                stripeKey={KEY}
                 disabled={products.length == 0 ?true : false}
              >
                <span className="orderNowBtn">
                  Order now
                </span>
              </StripeCheckout>
            </div>
          </div>

          )
        }
       
      </div>
      <ToastContainer autoClose={1500} />
    </div>
  );
};

export default Cart;
