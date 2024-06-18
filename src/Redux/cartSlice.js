import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  products: [],
  ID : null,
  loading: false,
  error: null,

};


export const addProduct = createAsyncThunk(
  'cart/addProduct',
  async (productData, thunkAPI) => {
    try {
      const response = await axios.post('https://foodappbackend-rjtx.onrender.com/cart/addToCart', productData);
      return response.data.cartdata; 
    } catch (error) {
      console.error('Error adding product:', error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchCart = createAsyncThunk(
    'cart/fetchCart',
    async (userEmail, thunkAPI) => {
      try {
        const response = await axios.get(`https://foodappbackend-rjtx.onrender.com/cart/getData/${userEmail}`);
        return response.data.cartdata.orders; // Assuming the response from the server includes the cart data
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );

  export const removeProduct = createAsyncThunk(
    "cart/removeProduct",
    async ({ id, email }, thunkAPI) => {
      try {
        const response = await axios.post(`https://foodappbackend-rjtx.onrender.com/cart/${id}`, {
         email , // Send email as part of the request body
        });
    
        return response.data.id; // Assuming the response indicates success or some updated cart data
      } catch (error) {
        console.error("Error removing product:", error);
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );



  export const deleteAllCart = createAsyncThunk(
    "cart/deleteAllCart",
    async ({id}, thunkAPI) => {
      console.log(id , "this is id")
      try {
        const response = await axios.delete(`https://foodappbackend-rjtx.onrender.com/cart/deleteAllCart/${id}`)

    
        return response.data.result; // Assuming the response indicates success or some updated cart data
      } catch (error) {
        console.error("Error removing product:", error);
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );
  




export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    resetCart: () => initialState
    
  },
  extraReducers: (builder) => {
    builder

    ///// add data 
      .addCase(addProduct.pending, (state, action) => {
        state.loading = true;
        state.error = null; // Reset error state on pending
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products = action.payload.orders; 
        state.ID = action.payload._id
        state.loading = false;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.error = action.error.message; 
        state.loading = false;
      })

      //// fetch data 
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })

       /// for removing
      .addCase(removeProduct.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((ele)=>ele._id!==action.payload.id); 
        state.loading = false;
      })
      .addCase(removeProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })


  // delete all cart
      .addCase(deleteAllCart.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAllCart.fulfilled, (state, action) => {
        state.products = action.payload
        state.loading = false;
      })
      .addCase(deleteAllCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });



  },
});

export const { resetCart } = cartSlice.actions;

export default cartSlice.reducer;
