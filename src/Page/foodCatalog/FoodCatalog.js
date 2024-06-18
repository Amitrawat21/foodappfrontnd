import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";

import "./FoodCatalog.css";

const FoodCatalog = () => {
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false); // Add showContent state
  const location = useLocation();
  const foodEndpoint = location.pathname.split("/")[2];
  console.log(foodEndpoint , "hhhhh")
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchFoodType = async () => {
      try {
        setLoading(true); // Start loading
        const res = await axios.get( `https://foodappbackend-rjtx.onrender.com/product?category=${foodEndpoint}`
        );
        setFilteredFoods(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setTimeout(() => {
          setLoading(false); // End loading
          setShowContent(true); // Show content after delay
        }, 500); // 0.5 second delay
      }
    };
    fetchFoodType();
  }, [foodEndpoint, token]);

  return (
    <div className="foodCatalog-container">
      <div className="foodCatalog-wrapper">
        {loading ? (
          <div className="loader-container">
            <TailSpin
              visible={true}
              height="80"
              width="80"
              color="#4fa94d"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        ) : (
          showContent && (
            <>
              {filteredFoods.length !== 0 && (
                <h2 className="catalog_title">
                  The best {foodEndpoint} in the region
                </h2>
              )}
              <div className="Catalog_foods">
                {filteredFoods.length !== 0 ? (
                  filteredFoods.map((ele) => (
                    <div className="catalog_food" key={ele._id}>
                      {user && !user.isAdmin ? (
                        <Link to={`/food/${ele._id}`}>
                          <div className="imgContainer">
                            <img
                              src={ele.image}
                              alt={ele.title}
                              className="foodImg"
                            />
                          </div>
                        </Link>
                      ) : (
                        <div className="imgContainer">
                          <img
                            src={ele.image}
                            alt={ele.title}
                            className="foodImg"
                          />
                        </div>
                      )}
                      <div className="foodDetails">
                        <h4 className="foodTitle">{ele.title}</h4>
                        <span className="catalog_price">
                          <span>$</span> {ele.price}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <h1 className="noQuantity">No {foodEndpoint} right now</h1>
                )}
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
};

export default FoodCatalog;
