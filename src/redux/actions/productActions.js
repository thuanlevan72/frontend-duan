import ProductApi from "../../api/product/ProductApi";

export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";

const fetchProductsSuccess = products => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products
});

// fetch products
export const fetchProducts =  (products) =>  {
  return async dispatch => {
    try {
      const response = await ProductApi.getAllNoPagition(); 
      dispatch(fetchProductsSuccess(response)); 
  } catch (error) {
      console.error(error);
  }
  };
};
