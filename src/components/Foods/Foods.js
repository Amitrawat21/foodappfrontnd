import React from 'react';
import { foodTypes } from '../../data/data';
import { Link } from 'react-router-dom';
import "./Foods.css";

const Foods = () => {
  return (
    <section id="foods" className="food_container">
      <div className="food_wrapper">
        <h4 className="subtitle">What we offer</h4>
        <h2 className="title">Best meals in the city</h2>
        <div className="foods">
          {foodTypes.map((foodType) => (
            <Link to={`/foods/${foodType.name}`} key={foodType.id} className="food">
              <div className="imgContainer">
                <img src={foodType.img} alt={foodType.name} />
              </div>
              <h4 style={{ marginTop: "15px" }}>{foodType.name}</h4>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Foods;
