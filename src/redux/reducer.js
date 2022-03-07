import { productsAPI } from '../api/api';
import { calcTotalItems, getIdsOfProducts } from '../helpFunctions/helpFunctions';


const SET_CATEGORIES = 'FETCHING_CATEGORIES';
const SET_PRODUCTS = 'FETCHING_PRODUCTS';
const SET_NEW_PRODUCTS = 'SET_NEW_PRODUCTS';
const SET_IMAGES = 'FETCHING_IMAGES';
const CLEAR_IMAGES = 'CLEAR_IMAGES';
const SET_PRODUCTS_VARIATIONS = 'FETCHING_PRODUCT_VARIATIONS';
const CLEAR_PRODUCTS_VARIATIONS = 'CLEAR_PRODUCTS_VARIATIONS';
const SET_PRODUCT_TOTAL = 'SET_PRODUCT_TOTAL';
const SET_CURRENT_CATEGORY = 'SET_CURRENT_CATEGORY';
const SET_CURRENT_RANGE = 'SET_CURRENT_RANGE';



let initialState = {
    categories: [],
    products: [],
    images: [],
    variations: [],
    productTotal: null,
    currentCategory: null,
    currentRange: 50
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
                products: [...state.products, ...action.payload]    
            };
        case SET_NEW_PRODUCTS:
            return {
                ...state,
                products:  [...action.payload]
            };
        case SET_IMAGES:
            return {
                ...state,
                images: [...state.images, ...action.payload]
            };
        case CLEAR_IMAGES:
            return {
                ...state,
                images: [...action.payload]
            };
        case SET_PRODUCTS_VARIATIONS:
            return {
                ...state,
                variations: [...state.variations, ...action.payload]
            };
            case CLEAR_PRODUCTS_VARIATIONS:
            return {
                ...state,
                variations: [...action.payload]
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
        case SET_CURRENT_RANGE:
            return {
                ...state,
                currentRange: action.payload
            };
        default:
            return state;
    }
}




const setCategoriesActionCreator = (payload) => ({ type: SET_CATEGORIES, payload });
const setProductsActionCreator = (payload) => ({ type: SET_PRODUCTS, payload });
const setNewProductsActionCreator = (payload) => ({ type: SET_NEW_PRODUCTS, payload });
const setImagesActionCreator = (payload) => ({ type: SET_IMAGES, payload });
const clearImagesActionCreator = (payload) => ({ type: CLEAR_IMAGES, payload });
const setProductsVariationsActionCreator = (payload) => ({ type: SET_PRODUCTS_VARIATIONS, payload });
const clearProductsVariationsActionCreator = (payload) => ({ type: CLEAR_PRODUCTS_VARIATIONS, payload });

export const setProductTotalActionCreator = (payload) => ({ type: SET_PRODUCT_TOTAL, payload });
export const setCurrentCategoryActionCreator = (payload) => ({ type: SET_CURRENT_CATEGORY, payload });
export const setCurrentRangeActionCreator = (payload) => ({ type: SET_CURRENT_RANGE, payload });







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

    
    // dispatch(fetchingProducts(currentCategoriesId));
}




export const fetchingProducts = (currentCategory, currentRange) => async (dispatch) => {

    console.log('!!!', currentCategory)
    console.log('!!!', currentRange)
   
    let products;

    await productsAPI.getProducts(currentCategory, currentRange)
        .then(response => {
            products = response;
            dispatch(setProductsActionCreator(products.data));
        })

    dispatch(setProductTotalActionCreator(calcTotalItems(products)));

    dispatch(fetchingImages(getIdsOfProducts(products.data)));

    dispatch(fetchingProductsVariations(getIdsOfProducts(products.data)));

}



export const fetchingNewProducts = (currentCategory, currentRange) => async (dispatch) => {

    console.log('!!!2', currentCategory)
    console.log('!!!2', currentRange)
    let products;
    await productsAPI.getProducts(currentCategory, currentRange)
        .then(response => {
            products = response;
            dispatch(setNewProductsActionCreator(products.data));
        })

    dispatch(setProductTotalActionCreator(calcTotalItems(products)));

    dispatch(clearImagesActionCreator([]))
    clearProductsVariationsActionCreator([])

    dispatch(fetchingImages(getIdsOfProducts(products.data)));

    dispatch(fetchingProductsVariations(getIdsOfProducts(products.data)));

}







export const fetchingImages = (params) => async (dispatch) => {

    let dataIsFetching = true;
    let range = 0;
    let arr = [];

    while (dataIsFetching) {
        let rangeQuery = `range=[${range},${range + 49}]`
        await productsAPI.getProductsImages(params, rangeQuery)
            .then(response => {
                let count = calcTotalItems(response)
                arr.push(...response.data)
                
                if(arr.length >= count) dataIsFetching = false;
            })
            .catch(e => {
                dataIsFetching = false;
                console.log('Ошибка получения изображений', e)
            })
            range += 50;
    }
    // console.log(arr)
    if(!dataIsFetching) {
        dispatch(setImagesActionCreator(arr));
    }
}

export const fetchingProductsVariations = (params) => async (dispatch) => {
    let dataIsFetching = true;
    let range = 0;
    let arr = [];

    while (dataIsFetching) {
        let rangeQuery = `range=[${range},${range + 49}]`
        await productsAPI.getProductVariations(params, rangeQuery)
        .then(response => {          
            let count = calcTotalItems(response)
            console.log(count)
                arr.push(...response.data)
                
                if(arr.length >= count) dataIsFetching = false;
        }).catch(e => {
            dataIsFetching = false;
            console.log('Ошибка получения вариаций', e)
        })
        range += 50;   
    }
    !dataIsFetching && dispatch(setProductsVariationsActionCreator(arr));
}


export default reducer;