import React, { useEffect, useState } from "react";
import "./Checkout.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Checkout = () => {
  const [allOrder, setAllOrder] = useState([]);
  const { user, token } = useSelector((state) => state.auth);

  const orderCancel = async (id) => {
    try {
      console.log(id, "idddd");
      const response = await axios.delete(`https://foodappbackend-rjtx.onrender.com/delete/${id}`);
      if (response.data.success) {
        toast.success("Order cancelled successfully!", {
          position: "top-right",
            className: 'my-toast-class'
        });
        // Update the state to remove the canceled order
        setAllOrder((prevOrders) => prevOrders.filter((order) => order._id !== id));
      } else {
        toast.error("Order not deleted");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`https://foodappbackend-rjtx.onrender.com/${user.email}`);
        if (response.data.success) {
          setAllOrder(response.data.orderData);
        } else {
          console.log("data not found ");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrder();
  }, [token, user?.email]);

  return (
    <div className="Checkout_container">
      <h2>My Orders</h2>

      <div className="allOrderProduct">
        {allOrder.length === 0 ? (
          <p>No Orders Right Now</p>
        ) : (
          allOrder.map((ele) => {
            const totalPrice = ele.orderList.reduce(
              (acc, item) => acc + item.quantity * item.price,
              0
            );

            return (
              <div key={ele._id} className="singleOrderProduct">
                <div className="uppar_wrapper">
                  <div className="uppar_wrapper_left">
                    <span style={{ color: "black", fontWeight: "500" }}>
                      Order Id{" "}
                    </span>
                    <span style={{ color: "blue", fontWeight: "500" }}>
                      {ele._id}
                    </span>
                  </div>
                  <p className="trackorder">TRACK ORDER</p>
                </div>
                
                {ele.orderList.map((item, index) => (
                  <div key={item._id}>
                    <div className="product_desc">
                      <div className="productdechLeft">
                        <div className="full_desc">
                          <img src={item.image} alt={item.title} />
                          <div className="details">
                            <div className="uppar_detail">
                              <h3>{item.title}</h3>
                              <p>{item.desc}</p>
                            </div>
                            <div className="other_detail">
                              <h3>
                                Qty <span>{item.quantity}</span>
                              </h3>
                              <p>
                                Rs <span>{item.price}</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="productdechRight">
                        <p>Delivery expected</p>
                        <p>24 December 2024</p>
                      </div>
                    </div>
                    {index < ele.orderList.length - 1 && <hr />}
                  </div>
                ))}
                <div className="lower">
                  <button onClick={() => orderCancel(ele._id)}>
                    Cancel Order
                  </button>
                  <h3>Total Price: Rs {totalPrice}</h3>
                </div>
              </div>
            );
          })
        )}
      </div>
      <ToastContainer autoClose={1500} />
    </div>
  );
};

export default Checkout;
