import { AxiosResponse } from 'axios';
import { Dispatch } from 'redux';
import { productsAPI } from '../api/api';
import { calcTotalItems, getIdsOfProducts } from '../helpFunctions/helpFunctions';
import { setCategoriesActionCreator, setCurrentCategoryActionCreator, setImagesActionCreator, setNewProductsActionCreator, setProductsActionCreator, setProductsVariationsActionCreator, setProductTotalActionCreator } from './actionCreators';
import { ProductActionTypes, ProductsAction, ProductsState, Query } from '../types/types';



let initialState: ProductsState = {
    categories: [],
    products: [],
    images: [],
    variations: [],
    productTotal: null,
    currentCategory: null,
    currentRange: 50,
    isLoading: true
};



const reducer = (state: ProductsState = initialState, action: ProductsAction): ProductsState => {

    switch (action.type) {
        case ProductActionTypes.SET_CATEGORIES:
            return {
                ...state,
                categories: [...state.categories, ...action.payload]
            };
        case ProductActionTypes.SET_PRODUCTS:
            return {
                ...state,
                products: [...state.products, ...action.payload]
            };
        case ProductActionTypes.SET_NEW_PRODUCTS:
            return {
                ...state,
                products: [...action.payload]
            };
        case ProductActionTypes.SET_IMAGES:
            return {
                ...state,
                images: [...state.images, ...action.payload]
            };
        case ProductActionTypes.SET_PRODUCTS_VARIATIONS:
            return {
                ...state,
                variations: [...state.variations, ...action.payload]
            };
        case ProductActionTypes.SET_PRODUCT_TOTAL:
            return {
                ...state,
                productTotal: action.payload
            };
        case ProductActionTypes.SET_CURRENT_CATEGORY:
            return {
                ...state,
                currentCategory: action.payload
            };
        case ProductActionTypes.SET_CURRENT_RANGE:
            return {
                ...state,
                currentRange: action.payload
            };

        case ProductActionTypes.SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.payload
            };
        default:
            return state;
    }
}















export default reducer;