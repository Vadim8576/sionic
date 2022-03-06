import { productsAPI } from '../api/api';
import { calcTotalItems, getIdsOfProducts, setProductImages, setProductVariations } from '../helpFunctions/helpFunctions';


const SET_CATEGORIES = 'FETCHING_CATEGORIES';
const SET_PRODUCTS = 'FETCHING_PRODUCTS';
const SET_IMAGES = 'FETCHING_IMAGES';
const SET_PRODUCTS_VARIATIONS = 'FETCHING_PRODUCT_VARIATIONS';
const SET_PRODUCT_TOTAL = 'SET_PRODUCT_TOTAL';
const SET_CURRENT_CATEGORY = 'SET_CURRENT_CATEGORY';



let initialState = {
    categories: [],
    products: [],
    productTotal: null,
    currentCategory: null
};





const reducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_CATEGORIES:
            return {
                ...state,
                categories: [...action.payload]
            };
        case SET_PRODUCTS:
            return {
                ...state,
                products: [...action.payload]
            };
        case SET_IMAGES:
            return {
                ...state,
                products: [...setProductImages(state.products, action.payload)]
            };
        case SET_PRODUCTS_VARIATIONS:
            return {
                ...state,
                products: [...setProductVariations(state.products, action.payload)]
            };
        case SET_PRODUCT_TOTAL:
            return {
                ...state,
                productTotal: action.payload
            };
        case SET_CURRENT_CATEGORY:
            return {
                ...state,
                currentCategory: action.payload
            };
        default:
            return state;
    }
}




const setCategoriesActionCreator = (payload) => ({ type: SET_CATEGORIES, payload });
const setProductsActionCreator = (payload) => ({ type: SET_PRODUCTS, payload });
const setImagesActionCreator = (payload) => ({ type: SET_IMAGES, payload });
const setProductsVariationsActionCreator = (payload) => ({ type: SET_PRODUCTS_VARIATIONS, payload });

export const setProductTotalActionCreator = (payload) => ({ type: SET_PRODUCT_TOTAL, payload });
export const setCurrentCategoryActionCreator = (payload) => ({ type: SET_CURRENT_CATEGORY, payload });







export const fetchingCategories = (params) => async (dispatch) => {

    let categories;

    await productsAPI.getCategories(params)
    .then(response => {

            categories = response;
            // console.log('categories ', categories);
            dispatch(setCategoriesActionCreator(categories));
    })

    let currentCategoriesId;
    // Если категория еще не установлена (первый запуск)
    if(!params) {
        currentCategoriesId = categories[0].id
        dispatch(setCurrentCategoryActionCreator(currentCategoriesId));
    } else {
        currentCategoriesId = params
    }

    
    dispatch(fetchingProducts(currentCategoriesId));
}




export const fetchingProducts = (params) => async (dispatch) => {

    let products;
    console.log('fetchingProducts', params)

    await productsAPI.getProducts(params)
        .then(response => {
            products = response;
            // console.log('products ', products);
            // console.log('products ', response.headers);
            dispatch(setProductsActionCreator(products.data));

        })

    dispatch(setProductTotalActionCreator(calcTotalItems(products)));






    dispatch(fetchingImages(getIdsOfProducts(products.data)));

    dispatch(fetchingProductsVariations(getIdsOfProducts(products.data)));

}







export const fetchingImages = (params) => async (dispatch) => {

    let dataIsFetching = true;
    let count = 0;
    let ids = params;
    let arr = [];

    while (dataIsFetching) {
        await productsAPI.getProductsImages(params)
            .then(response => {
                const getMoreData = () => {
                    // console.log('getMoreData')
                    ids.forEach(id => {
                        let tmp = response.filter(resp => resp.product_id === id);
                        if (tmp.length) {
                            count++;
                            arr.push(tmp);
                        }
                    })

                    if (count >= ids.length) {
                        dataIsFetching = false;
                    }
                }
                getMoreData();
            })
    }
    !dataIsFetching && dispatch(setImagesActionCreator(arr));
}

export const fetchingProductsVariations = (params) => async (dispatch) => {
    let dataIsFetching = true;
    let count = 0;
    let ids = params;
    let arr = [];

    while (dataIsFetching) {
    await productsAPI.getProductVariations(params)
        .then(response => {
           
            const getMoreData = () => {
                // console.log('getMoreData2')
                ids.forEach(id => {
                    let tmp = response.filter(resp => resp.product_id === id);
                    if (tmp.length) {
                        count++;
                        arr.push(tmp);
                    }
                })

                if (count >= ids.length) {
                    dataIsFetching = false;
                }
            }
            getMoreData();
  
        })
        
    }
    !dataIsFetching && dispatch(setProductsVariationsActionCreator(arr));
}


export default reducer;