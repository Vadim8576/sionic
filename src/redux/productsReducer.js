import { orm } from '../orm/orm';
import { productsAPI } from '../api/api';
import store from './store';


// const FETCHING_PRODUCTS = 'FETCHING_PRODUCTS';




// export const fetchingProductsActionCreator = (payload) => ( {type: FETCHING_PRODUCTS, payload} );




export const fetchingCategories = (params) => async (dispatch) => {
    console.log('getCategories')
    await productsAPI.getCategories(params)
    .then(response => {
        console.log(response);
        // dispatch(fetchingProductsActionCreator(response))
        return response
    })
    
}

// export default productReducer;