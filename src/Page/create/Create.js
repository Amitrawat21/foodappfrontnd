import React, { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Create.css";

const Create = () => {
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  console.log(token, "token");
  const [productDetails, setProductDetails] = useState({
    title: "",
    desc: "",
    category: "",
    review: "",
    price: "",
  });
  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProductDetails({
      ...productDetails,
      [e.target.name]: e.target.value,
    });
  };

  console.log(productDetails);

  const handleCloseImg = () => {
    setImage("");
  };
  const handleValidation = async (e) => {
    e.preventDefault();

    let product = { ...productDetails };

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post(
        "https://foodappbackend-rjtx.onrender.com/upload",
        formData,
        {
          headers: {
            Accept: "application/json",
            auth: `${token}`,
          },
        }
      );
      console.log(response.data.image, "this is data");

      if (response.data.success) {
        // Construct the full image URL

        product.image = `https://foodappbackend-rjtx.onrender.com/images/${response.data.image}`;
        console.log(product, "productssssss");

        const addProductResponse = await axios.post(
          "https://foodappbackend-rjtx.onrender.com/product/addProduct",
          product,
          {
            headers: {
              Accept: "application/json",
              auth: `${token}`,
            },
          }
        );

        if (addProductResponse.data.success) {
          toast.success("product create successfully!", {
            position: "top-right",
           
            className: 'my-toast-class-create',
           
          });
          setTimeout(()=>{
            navigate(`/`);

          }, 1500)
          setImage(null);
          setProductDetails({
            title: "",
            category: "",
            desc: "",
            price: "",
            review: "",
          });
        } else {
          toast.success("product create successfully!", {
            position: "top-right",
           
            className: 'my-toast-class-create',
           
          });
        }
      } else {
        toast.error("something is missing", {
          position: "top-right",
         
          className: 'my-toast-class-create',
         
        });
      }
    } catch (error) {
      toast.error("somthing is missing", {
        position: "top-right",
       
        className: 'my-toast-class-create',
       
      });
    }
  };

  return (
    <div className="Create_containe">
      <div className="Create_wrapper">
        <h2 className="titles">Create food</h2>
        <form onSubmit={handleValidation} encType="multipart/form-data">
          <div className="inputWrapper">
            <label>Title: </label>
            <input
              type="text"
              placeholder="Title..."
              className="input"
              name="title"
              value={productDetails.title}
              onChange={changeHandler}
            />
          </div>
          <div className="inputWrapper">
            <label>Description: </label>
            <input
              type="text"
              placeholder="Description..."
              className="input"
              name="desc"
              value={productDetails.desc}
              onChange={changeHandler}
            />
          </div>
          <div className="inputWrapper">
            <label>Category: </label>
            <input
              type="text"
              placeholder="Category..."
              className="input"
              name="category"
              value={productDetails.category}
              onChange={changeHandler}
            />
          </div>
          <div className="inputWrapperImage">
            <label htmlFor="image" className="labelFileInput">
              Image: {image ? <span style={{backgroundColor : "red"}}>Uploaded </span>  :  <span>Upload here</span> } 
            </label>
            <input
              type="file"
              id="image"
              placeholder="Image..."
              className="input"
              onChange={imageHandler}
              name="image"
              style={{ display: "none" }}
            />
            {image && (
              <p className="imageName">
                {image.name}{" "}
                <AiOutlineCloseCircle
                  onClick={handleCloseImg}
                  className="closeIcon"
                />
              </p>
            )}
          </div>
          <div className="inputWrapper">
            <label>Price: </label>
            <input
              type="number"
              step={0.01}
              placeholder="Price..."
              className="input"
              name="price"
              value={productDetails.price}
              onChange={changeHandler}
            />
          </div>
          <div className="inputWrapper">
            <label>Review: </label>
            <input
              type="number"
              step={0.1}
              min={1}
              max={5}
              placeholder="Review..."
              className="input"
              name="review"
              value={productDetails.review}
              onChange={changeHandler}
            />
          </div>
          <div className="buttonWrapper">
            <button type="submit" className="submitBtn">
              Submit
            </button>
          </div>
        </form>
      </div>
      <ToastContainer autoClose={1000} />
    </div>
  );
};

export default Create;
